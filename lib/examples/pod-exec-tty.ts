#!/usr/bin/env -S deno run --unstable --allow-env --allow-read --allow-net
// Note: We can't use autoDetectClient until it supports tunnel-capable clients
// import { autoDetectClient } from '../client.ts';
// const restClient = await autoDetectClient();

import { WebsocketRestClient } from "https://deno.land/x/kubernetes_client@v0.6.0/tunnel-beta/via-websocket.ts";
import { CoreV1Api } from '../builtin/core@v1/mod.ts';

import { merge } from "https://deno.land/x/stream_observables@v1.3/combiners/merge.ts"

// Set up a client which can use Websockets
const client = await WebsocketRestClient.forInCluster();
const coreApi = new CoreV1Api(client);

console.time('Process exec');
// Launch a process into a particular container
const tunnel = await coreApi
  .namespace('media')
  .podExec('sabnzbd-srv-0', {
    command: ['sh', '-i'],
    stdin: true,
    stdout: true,
    tty: true, // TIL: tty=true implies stderr=false in Kubernetes
  });

// TODO: detect terminal size changes, probably
const termSize = Deno.consoleSize();
const sizeWriter = tunnel.ttyResize.getWriter();
sizeWriter.write({
  Width: termSize.columns,
  Height: termSize.rows,
});
sizeWriter.close();

// set up the parent tty for passthru
Deno.stdin.setRaw(true, { cbreak: true });

// handle Ctrl-C
const interruptBuffer = new Uint8Array([0x03]);
const ctrlC = new TransformStream<void,Uint8Array>({
  transform: (_, ctlr) => ctlr.enqueue(interruptBuffer),
});
const ctrlCwriter = ctrlC.writable.getWriter();
let signalCount = 0;
const signalHandler = () => {
  ctrlCwriter.write();
  // Escape hatch: terminate our process if used again
  if (signalCount++) Deno.exit(127);
}
Deno.addSignalListener('SIGINT', signalHandler);
tunnel.status.finally(() => {
  Deno.removeSignalListener('SIGINT', signalHandler);
  ctrlCwriter.close();
  Deno.stdin.setRaw(false);
});

await Promise.race([
  tunnel.status,
  merge(ctrlC.readable, Deno.stdin.readable).pipeTo(tunnel.stdin),
  tunnel.stdout.pipeTo(Deno.stdout.writable, { preventClose: true }),
]);

const status = await tunnel.status;
if (typeof status.exitCode == 'number') {
  Deno.exit(status.exitCode);
} else {
  console.error(status.message);
  Deno.exit(1);
}
