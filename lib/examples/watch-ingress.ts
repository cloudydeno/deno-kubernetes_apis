import { autoDetectClient } from '../clients/mod.ts';
import { NetworkingV1beta1Api } from "../apis/networking.k8s.io@v1beta1/mod.ts";
import { Reflector } from "../streaming.ts";

const restClient = await autoDetectClient();
const netApi = new NetworkingV1beta1Api(restClient);

// Set up a client-side cache of cluster-wide Ingresses matching a specific label
const reflector = new Reflector(
  opts => netApi.getIngressListForAllNamespaces({ ...opts }),
  opts => netApi.watchIngressListForAllNamespaces({ ...opts }));

function printRouteTable() {

  console.log('Routing Table :)');
  for (const ingress of reflector.listCached()) {
    console.log(ingress.metadata.namespace, ingress.metadata.name);
  }

}
const printTableSoon = debounce(printRouteTable, 2000);

reflector.goObserveAll(async iter => {
  console.log('observing...');
  let inSync = false;
  for await (const evt of iter) {
    switch (evt.type) {
      case 'SYNCED':
        printRouteTable(); // sneak in rising-edge run
        inSync = true; // start allowing falling-edge runs
        break;
      case 'DESYNCED':
        inSync = false; // block runs during resync inconsistencies
        break;
      case 'ADDED':
      case 'MODIFIED':
      case 'DELETED':
        if (inSync) printTableSoon();
        break;
    }
  }
  console.log('observer done');
});

reflector.run();


function debounce<T extends unknown[]>(fn: (...args: T) => void, time: number) {
  let timeout: number | undefined;
  return function(...args: T) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), time);
  }
}
