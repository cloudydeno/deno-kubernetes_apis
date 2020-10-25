import { KubectlRestClient } from './clients/via-kubectl.ts';
import { JSONValue, RestClient } from "./common.ts";
import { toBlockDeviceList } from "./apis/pet.wg69.net@v1/structs.ts";
import { toPodList } from "./apis/core@v1/structs.ts";
import { PetWg69NetV1Api } from "./apis/pet.wg69.net@v1/mod.ts";

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
console.log(blks)
