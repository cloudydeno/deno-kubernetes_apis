import { RestClient, HttpMethods, RequestOptions } from '../common.ts';
import { PathedRestClient } from './common.ts';

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
 * Note that Deno (as of 1.4.1) can't curl IP addresses (denoland/deno#7660)
 * so KUBERNETES_SERVER_HOST can't be used at this time, and would need --allow-env anyway.
 */

export class KubectlRestClient implements RestClient {
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
    if (!command) throw new Error(`KubectlRestClient cannot perform HTTP ${method.toUpperCase()}`);

    let path = opts.path || '/';
    const query = opts.querystring?.toString() ?? '';
    if (query) {
      path += (path.includes('?') ? '&' : '?') + query;
    }
    console.log(method.toUpperCase(), path);

    const p = Deno.run({
      cmd: ["kubectl", command, ...(opts.body ? ['-f', '-'] : []), "--raw", path],
      stdin: opts.body ? 'piped' : undefined,
      stdout: "piped",
    });
    if (p.stdin) {
      await p.stdin.write(new TextEncoder().encode(JSON.stringify(opts.body)));
      p.stdin.close();
    }
    const rawOutput = await p.output();
    const { code } = await p.status();
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

  // subPath(strings: TemplateStringsArray, ...names: string[]): RestClient {
  //   const path = String.raw(strings, ...names.map(encodeURIComponent));
  //   if (!path.startsWith('/')) throw new Error(
  //     `BUG: must use absolute paths when pathing a RestClient`);
  //   return new PathedRestClient(this, path);
  // }
}