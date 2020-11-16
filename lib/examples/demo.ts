import { autoDetectClient, readAllItems } from '../common.ts';
import { PetWg69NetV1Api } from "../kube-pet-node/pet.wg69.net@v1/mod.ts";
import { AppsV1Api } from "../builtin/apps@v1/mod.ts";
import { CoreV1Api } from "../builtin/core@v1/mod.ts";

const restClient = await autoDetectClient();
const petApi = new PetWg69NetV1Api(restClient);

const blks = await petApi.getBlockDeviceList();
console.log(blks);

const appsApi = new AppsV1Api(restClient);
for await (const deploy of readAllItems(t => appsApi.getDeploymentListForAllNamespaces({
  limit: 5,
  continue: t,
}))) {
  console.log(deploy.metadata?.namespace, deploy.metadata?.name);
}

const coreApi = new CoreV1Api(restClient);
const nodes = await coreApi.getNode('pet-ausbox');
console.log(nodes.status);
