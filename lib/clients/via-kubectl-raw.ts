import { RestClient, HttpMethods, RequestOptions } from '../common.ts';

/**
 * A RestClient for easily running on a developer's local machine.
 * Your existing kubectl is called to do all the actual authentication and network stuff.
 * This is pretty reliable but mot all types of requests can be performed this way.
 *
 * Deno flags to use this client:
 *   --allow-run
 *
 * Pro: Any valid kubeconfig will be supported automatically :)
 * Con: In particular, these features aren't available:
 *   - Setting or receiving HTTP headers
 *   - HTTP methods such as PATCH and HEAD
 */

export class KubectlRawRestClient implements RestClient {
  namespace = undefined; // TODO: read from `kubectl config view --output=json`

  async performRequest(method: HttpMethods, opts: RequestOptions={}): Promise<any> {
    const command = {
      get: 'get',
      post: 'create',
      delete: 'delete',
      put: 'replace',
      patch: '',
      options: '',
      head: '',
    }[method];
    if (!command) throw new Error(`KubectlRawRestClient cannot perform HTTP ${method.toUpperCase()}`);

    if (opts.abortSignal?.aborted) throw new Error(`Given AbortSignal is already aborted`);

    let path = opts.path || '/';
    const query = opts.querystring?.toString() ?? '';
    if (query) {
      path += (path.includes('?') ? '&' : '?') + query;
    }

    const hasReqBody = !!opts.body || !!opts.bodyStream;
    console.error(method.toUpperCase(), path, hasReqBody ? '(w/ body)' : '');

    const p = Deno.run({
      cmd: ["kubectl", command, ...(hasReqBody ? ['-f', '-'] : []), "--raw", path],
      stdin: hasReqBody ? 'piped' : undefined,
      stdout: "piped",
      stderr: "inherit",
    });
    const status = p.status();

    if (opts.abortSignal) {
      const abortHandler = () => {
        console.error('processing kubectl abort');
        p.stdout.close();
      };
      opts.abortSignal.addEventListener("abort", abortHandler);
      status.finally(() => {
        console.error('cleaning up abort handler');
        opts.abortSignal?.removeEventListener("abort", abortHandler);
      });
    }

    if (p.stdin) {
      if (opts.bodyStream) {
        const {stdin} = p;
        opts.bodyStream.pipeTo(new WritableStream({
          async write(chunk, controller) {
            await stdin.write(chunk).catch(err => controller.error(err));
          },
          close() {
            stdin.close();
          },
        }));
      } else {
        await p.stdin.write(new TextEncoder().encode(JSON.stringify(opts.body)));
        p.stdin.close();
      }
    }

    if (opts.streaming) {
      status.then(status => {
        if (status.code !== 0) {
          console.error(`WARN: Failed to call kubectl streaming: code ${status.code}`);
        }
      });

      // with kubectl --raw, we don't really know if the stream is working or not
      //   until it exits (maybe bad) or prints to stdout (always good)
      // so let's wait to return the stream until the first read returns
      return new Promise((ok, err) => {
        let isFirstRead = true;

        // Convert Deno.Reader|Deno.Closer into a ReadableStream (like 'fetch' gives)
        const stream = readableStreamFromReaderCloser({
          close: p.stdout.close.bind(p.stdout),
          // Intercept reads to try doing some error handling/mgmt
          read: async buf => {
            // do the read
            const num = await p.stdout.read(buf);

            // if we EOFd, check the process status
            if (num === null) {
              const stat = await status;
              // TODO: some way of passing an error through the ReadableStream?
              if (stat.code !== 0) {
                // might not be too late to fail the call more properly
                err(new Error(`kubectl stream ended with code ${stat.code}`));
                return num;
              }
              // if exit code was 0, let the EOF happen normally, below
            }

            // if we got our first data, resolve the original promise
            if (isFirstRead) {
              isFirstRead = false;
              ok(stream);
            }

            return num;
          },
        }, {bufSize: 8*1024}); // watch events tend to be pretty small I guess?
        // 'stream' gets passed to ok() to be returned
      });
    }

    // not streaming, so download the whole response body
    const rawOutput = await p.output();
    const { code } = await status;
    if (code !== 0) {
      throw new Error(`Failed to call kubectl: code ${code}`);
    }

    if (opts.accept === 'application/json') {
      const data = new TextDecoder("utf-8").decode(rawOutput);
      return JSON.parse(data);
    } else {
      return rawOutput;
    }
  }

}
export default KubectlRawRestClient;




// context: https://github.com/denoland/deno/pull/8378

export function readableStreamFromAsyncIterator<T>(
  iterator: AsyncIterableIterator<T>,
  cancel?: ReadableStreamErrorCallback,
): ReadableStream<T> {
  return new ReadableStream({
    cancel,
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export function readableStreamFromReaderCloser(
  source: Deno.Reader & Deno.Closer,
  options?: {
    bufSize?: number;
  },
): ReadableStream<Uint8Array> {
  return readableStreamFromAsyncIterator(
    Deno.iter(source, options),
    () => source.close(),
  );
}
