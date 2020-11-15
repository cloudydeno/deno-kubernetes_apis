import { autoDetectClient } from '../clients/mod.ts';
import { CoreV1Api } from "../apis/core@v1/mod.ts";
import { CoordinationV1Api } from "../apis/coordination.k8s.io@v1/mod.ts";
import { Reflector } from "../streaming.ts";

const restClient = await autoDetectClient();
// const coreApi = new CoreV1Api(restClient);
const coordApi = new CoordinationV1Api(restClient).namespace("kube-node-lease");

// console.log(await coordApi.listLease({resourceVersion: '0'}))

const leaseWatcher = new Reflector(opts => coordApi.listLease(opts), opts => coordApi.watchLease(opts));
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

// await leaseWatcher.waitForSynced();

// console.log(await coordApi.listLease().then(x => x.items.map(y => y.spec?.holderIdentity)));

// const ctr = new AbortController();
// // setTimeout(() => ctr.abort(), 2000);

// for await (const evt of await coordApi.watchLease({
//   timeoutSeconds: 10,
//   // abortSignal: ctr.signal,
//   // resourceVersion: '39429352',
// })) {
//   switch (evt.type) {
//     case 'ADDED':
//       console.log('added:', evt.object.spec);
//       break;
//     case 'MODIFIED':
//       console.log('modified:', evt.object.spec);
//       break;
//     case 'DELETED':
//       console.log('deleted:', evt.object.spec);
//       break;
//     case 'ERROR':
//       console.log('error:', evt.object);
//       break;
//   }
// }
// console.log('done');

// const proc = Deno.run({ cmd: ["sleep", "20"] });
// setTimeout(() => {
//   console.log('closing subprocess');
//   proc.close();
// }, 2000);
// console.log('Waiting for status...');
// await proc.status(); // never resolves
// console.log('Done!');
