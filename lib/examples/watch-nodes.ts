#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

import { autoDetectClient, Reflector } from "../deps.ts";
// import { CoreV1Api } from "../builtin/core@v1/mod.ts";
import { CoordinationV1Api } from "../builtin/coordination.k8s.io@v1/mod.ts";

const restClient = await autoDetectClient();
// const coreApi = new CoreV1Api(restClient);
const coordApi = new CoordinationV1Api(restClient).namespace("kube-node-lease");

const leaseWatcher = new Reflector(
  opts => coordApi.getLeaseList(opts),
  opts => coordApi.watchLeaseList(opts));
leaseWatcher.run();

await new Promise(ok => setTimeout(ok, 2000));

leaseWatcher.goObserveAll(async iter => {
  console.log('observing...');
  for await (const evt of iter) {
    switch (evt.type) {
      case 'ADDED':
        console.log('observer added:', evt.object.spec?.holderIdentity);
        break;
      case 'MODIFIED':
        console.log('observer modified:', evt.object.spec?.holderIdentity);
        break;
      case 'DELETED':
        console.log('observer deleted:', evt.object.spec?.holderIdentity);
        break;
      default:
        console.log(`observer ${evt.type}:`, evt.object);
        break;
    }
  }
  console.log('observer done');
});
