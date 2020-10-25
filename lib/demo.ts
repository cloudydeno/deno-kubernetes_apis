import { KubectlRestClient } from './clients/via-kubectl.ts';
import { RestClient, readAllPages } from "./common.ts";
import { PetWg69NetV1Api } from "./apis/pet.wg69.net@v1/mod.ts";
import { AppsV1Api } from "./apis/apps@v1/mod.ts";
import { CoreV1Api } from "./apis/core@v1/mod.ts";

const restClient: RestClient = new KubectlRestClient();

// const blkJson = await restClient.performRequest("get", {
//   path: '/apis/pet.wg69.net/v1/blockdevices',
//   accept: 'application/json',
// });
// const blkList = toBlockDeviceList(blkJson);
// console.log(blkList.items[0].status);

// const blkJson = await restClient.performRequest("get", {
//   path: '/api/v1/pods',
//   accept: 'application/json',
//   querystring: new URLSearchParams([['limit', '1']])
// });
// const blkList = toPodList(blkJson);
// console.log(blkList);

const petApi = new PetWg69NetV1Api(restClient);
const blks = await petApi.listBlockDevice();
console.log(blks);

const appsApi = new AppsV1Api(restClient);
for await (const deploy of readAllPages(t => appsApi.listDeploymentForAllNamespaces({
  limit: 5,
  continue: t,
}))) {
  console.log(deploy.metadata?.namespace, deploy.metadata?.name);
}

const coreApi = new CoreV1Api(restClient);
const nodes = await coreApi.readNode('pet-ausbox');
console.log(nodes.status);
