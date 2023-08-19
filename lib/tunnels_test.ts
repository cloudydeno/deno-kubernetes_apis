import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { StdioTunnel, ExecStatus, PortforwardTunnel } from "./tunnels.ts";

Deno.test('stdiotunnel output buffering', async () => {
  const intendedStdout = 'hello world';

  const tunnel = new StdioTunnel({
    async getChannel(opts) {
      return await {
        readable: new ReadableStream({
          start(ctlr) {
            if (opts.streamIndex == 1) {
              ctlr.enqueue(intendedStdout);
            }
            if (opts.streamIndex == 3) {
              ctlr.enqueue(JSON.stringify({
                status: 'Success',
              } satisfies ExecStatus));
            }
            ctlr.close();
          },
        }).pipeThrough(new TextEncoderStream()) as any,
        writable: new WritableStream() as any,
      };
    },
    ready: () => Promise.resolve(),
    stop: () => Promise.resolve(),
    subProtocol: 'v4.tunnel.k8s.io',
    transportProtocol: 'Opaque',
  }, new URLSearchParams([
    ['stdout', '1'],
  ]));
  await tunnel.ready;

  const output = await tunnel.output();
  console.log(new TextDecoder().decode(output.stdout));

  assertEquals(new TextDecoder().decode(output.stdout), intendedStdout);
});

Deno.test('portforwardtunnel echo pipe', async () => {
  const tunnel = new PortforwardTunnel({
    async getChannel(opts) {
      if (opts.streamIndex == 0) return new TransformStream({
        start(ctlr) {
          ctlr.enqueue(new Uint8Array([0,70])); // TODO: this should fail due to mismatch
        },
      }) as any;
      return await {
        readable: new ReadableStream({
          start(ctlr) {
            ctlr.close();
          },
        }).pipeThrough(new TextEncoderStream()) as any,
        writable: new WritableStream() as any,
      };
    },
    ready: () => Promise.resolve(),
    stop: () => Promise.resolve(),
    subProtocol: 'v4.tunnel.k8s.io',
    transportProtocol: 'Opaque',
  }, new URLSearchParams([
    ['ports', '80'],
  ]));
  await tunnel.ready;

  const intendedText = 'asdf pickel';

  const socket = await tunnel.connectToPort(80);
  const [output] = await Promise.all([
    new Response(socket.readable).text(),
    (async () => {
      const writer = socket.writable.getWriter();
      await writer.write(new TextEncoder().encode(intendedText));
      writer.close();
    })(),
  ]);

  assertEquals(output, intendedText);
});
