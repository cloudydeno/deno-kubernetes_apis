import type { KubernetesTunnel } from "./common.ts";


export type TerminalSize = {
  Width: number;
  Height: number;
}

export type ExecStatus = {
  status: 'Success' | 'Failure';
  exitCode?: number; // We add this ourselves
  message?: string;
  reason?: string;
  code?: number;
  details?: { causes: Array<{
    reason: string;
    message: string;
  }> };
}

export class ChannelTunnel {
  static readonly supportedProtocols = [
    // proposed v5: adds stdin closing
    'v4.channel.k8s.io', // v4: switches error stream to JSON
    'v3.channel.k8s.io', // v3: adds terminal resizing
    // 'v2.channel.k8s.io',
    // 'channel.k8s.io',
  ];

  constructor(
    private readonly tunnel: KubernetesTunnel,
    originalParams: URLSearchParams,
  ) {
    if (this.tunnel.subProtocol.startsWith('v')) {
      this.channelVersion = parseInt(this.tunnel.subProtocol.slice(1));
    } else {
      this.channelVersion = 1;
    }

    function getWritable(streamIndex: number, streamType: string) {
      return tunnel.getChannel({
        streamIndex,
        spdyHeaders: { streamType },
        readable: false,
        writable: true,
      }).then(x => x.writable);
    }
    function getReadable(streamIndex: number, streamType: string) {
      return tunnel.getChannel({
        streamIndex,
        spdyHeaders: { streamType },
        readable: true,
        writable: false,
      }).then(x => x.readable);
    }

    this.ready = Promise.all([
      originalParams.get('stdin') == '1' ? getWritable(0, 'stdin') : null,
      originalParams.get('stdout') == '1' ? getReadable(1, 'stdout') : null,
      originalParams.get('stderr') == '1' ? getReadable(2, 'stderr') : null,
      getReadable(3, 'error'),
      originalParams.get('tty') == '1' ? getWritable(4, 'resize') : null,
    ]).then(streams => {
      this.#stdin = streams[0];
      this.#stdout = streams[1];
      this.#stderr = streams[2];
      this.status = new Response(streams[3]).text()
        .then<ExecStatus>(text => this.channelVersion >= 4
          ? addExitCode(JSON.parse(text))
          : { status: 'Failure', message: text });
      this.#resize = streams[4] ? wrapResizeStream(streams[4]) : null;
      return tunnel.ready();
    });
  }
  readonly channelVersion: number;
  #stdin: WritableStream<Uint8Array> | null = null;
  #stdout: ReadableStream<Uint8Array> | null = null;
  #stderr: ReadableStream<Uint8Array> | null = null;
  #resize: WritableStream<TerminalSize> | null = null;
  status!: Promise<ExecStatus>;
  ready: Promise<void>;

  // Take a cue from Deno.Command which presents the streams unconditionally
  // but throws if they are used when not configured
  get stdin() {
    if (!this.#stdin) throw new TypeError("stdin was not requested");
    return this.#stdin;
  }
  get stdout() {
    if (!this.#stdout) throw new TypeError("stdout was not requested");
    return this.#stdout;
  }
  get stderr() {
    if (!this.#stderr) throw new TypeError("stderr was not requested");
    return this.#stderr;
  }
  get ttyResize() {
    if (!this.#resize) throw new TypeError("tty was not requested");
    return this.#resize;
  }

  // Based on https://github.com/denoland/deno/blob/ca9ba87d9956e3f940e0116866e19461f008390b/runtime/js/40_process.js#L282C1-L319C1
  async output() {
    if (this.#stdout?.locked) {
      throw new TypeError(
        "Can't collect output because stdout is locked",
      );
    }
    if (this.#stderr?.locked) {
      throw new TypeError(
        "Can't collect output because stderr is locked",
      );
    }

    const [ status, stdout, stderr ] = await Promise.all([
      this.status,
      this.#stdout ? new Response(this.#stdout).arrayBuffer().then(x => new Uint8Array(x)) : null,
      this.#stderr ? new Response(this.#stderr).arrayBuffer().then(x => new Uint8Array(x)) : null,
    ]);

    return {
      ...status,
      get stdout() {
        if (!stdout) throw new TypeError("stdout was not requested");
        return stdout;
      },
      get stderr() {
        if (!stderr) throw new TypeError("stderr was not requested");
        return stderr;
      },
    };
  }

  kill() {
    this.tunnel.stop();
  }
}


function wrapResizeStream(byteStream: WritableStream<Uint8Array>) {
  const writer = byteStream.getWriter();
  return new WritableStream<TerminalSize>({
    async abort(reason) {
      await writer.abort(reason);
    },
    async close() {
      await writer.close();
    },
    async write(chunk) {
      const bytes = new TextEncoder().encode(JSON.stringify(chunk));
      await writer.write(bytes);
    },
  });
}

// Process exit code, if any, is given as a 'cause' for the non-success
function addExitCode(status: ExecStatus) {
  if (status.status == 'Success') {
    status.exitCode = 0;
  } else if (status.reason == 'NonZeroExitCode') {
    const cause = status.details?.causes.find(x => x.reason == 'ExitCode');
    if (cause) {
      status.exitCode = parseInt(cause.message);
    }
  }
  return status;
}


export class PortforwardTunnel {
  static readonly supportedProtocols = [
    'portforward.k8s.io',
  ];

  constructor(
    private tunnel: KubernetesTunnel,
    originalParams: URLSearchParams,
  ) {
    if (tunnel.transportProtocol == 'WebSocket') {
      // TODO: implement websocket - using originalParams to know which websocket ports we expect
      tunnel.stop();
      throw new Error(`Kubernetes PortForwarding is too limited on WebSocket and is not implemented here. Try SPDY instead.`);
    } else {
      tunnel.ready();
    }
  }
  private nextRequestId = 0;

  async connectToPort(port: number) {
    const requestID = this.nextRequestId++;
    const [errorStream, stream] = await Promise.all([
      this.tunnel.getChannel({
        spdyHeaders: {
          streamType: 'error',
          port,
          requestID,
        },
        writable: false,
        readable: true,
      }),
      this.tunnel.getChannel({
        spdyHeaders: {
          streamType: 'data',
          port,
          requestID,
        },
        readable: true,
        writable: true,
      }),
    ]);
    console.error('Got streams');

    const errorBody = new Response(errorStream.readable).text();
    errorBody.then(text => {
      if (text.length > 0) {
        console.error("Received portforward error response:", text);
      }
    });

    return {
      result: errorBody,
      stream,
    }
  }

  servePortforward(opts: Deno.ListenOptions & {
    targetPort: number;
  }) {
    const listener = Deno.listen(opts);
    (async () => {
      for await (const conn of listener) {
        const {stream, result} = await this.connectToPort(opts.targetPort);
        console.error('Client connection opened');
        Promise.all([
          result,
          conn.readable.pipeTo(stream.writable),
          stream.readable.pipeTo(conn.writable),
        ]).then(x => {
          console.error('Client connection closed.', x[0]);
        }).catch(err => {
          console.error('Client connection crashed:', err.stack);
        });
      }
    })();
    return listener;
  }

  disconnect() {
    this.tunnel.stop();
  }
}
