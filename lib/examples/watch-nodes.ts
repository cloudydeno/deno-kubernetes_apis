import { autoDetectClient, Reflector } from "../common.ts";
// import { CoreV1Api } from "../builtin/core@v1/mod.ts";
import { Status } from "../builtin/meta@v1/structs.ts";
import { CoordinationV1Api, Lease } from "../builtin/coordination.k8s.io@v1/mod.ts";

const restClient = await autoDetectClient();
// const coreApi = new CoreV1Api(restClient);
const coordApi = new CoordinationV1Api(restClient).namespace("kube-node-lease");

// TODO: what's up with the explicit generic here? should not be necesary.
const leaseWatcher = new Reflector<Lease, Status>(
// const leaseWatcher = new Reflector(
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
