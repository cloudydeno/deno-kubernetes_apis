#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --unstable

// Note: We can't use autoDetectClient until it supports tunnel-capable clients
// import { autoDetectClient } from '../client.ts';
// const restClient = await autoDetectClient();

import { WebsocketRestClient } from "https://deno.land/x/kubernetes_client@v0.6.0/tunnel-beta/via-websocket.ts";
import { CoreV1Api } from '../builtin/core@v1/mod.ts';

// Set up a client which can use Websockets
const client = await WebsocketRestClient.forInCluster();
const coreApi = new CoreV1Api(client);

// Launch a process into a particular container
const tunnel = await coreApi
  .namespace('media')
  .podExec('sabnzbd-srv-0', {
    command: ['uname', '-a'],
    stdout: true,
    stderr: true,
  });

// Wait for & print the output
const output = await tunnel.output();
console.log(new TextDecoder().decode(output.stdout).trimEnd());

// Let's print any error too
if (output.status !== 'Success') {
  console.error(output.message);
}
