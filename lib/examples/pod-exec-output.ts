#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --unstable

import { tunnelBeta, makeClientProviderChain } from '../client.ts';
import { CoreV1Api } from '../builtin/core@v1/mod.ts';

// Set up an experimental client which can use Websockets
const client = await makeClientProviderChain(tunnelBeta.WebsocketRestClient).getClient();
const coreApi = new CoreV1Api(client);

// Launch a process into a particular container
const tunnel = await coreApi
  .namespace('media')
  .podExec('sabnzbd-srv-0', {
    command: ['uname', '-a'],
    stdout: true,
    stderr: true,
  });

// Buffer & print the contents of stdout
const output = await tunnel.output();
console.log(new TextDecoder().decode(output.stdout).trimEnd());

// Print any error that occurred
if (output.status !== 'Success') {
  console.error(output.message);
}
