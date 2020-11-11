import { KubectlRestClient } from '../clients/via-kubectl.ts';
import { RestClient, readAllPages } from "../common.ts";
// import { PetWg69NetV1Api } from "../apis/pet.wg69.net@v1/mod.ts";
// import { AppsV1Api } from "../apis/apps@v1/mod.ts";
import { CoreV1Api } from "../apis/core@v1/mod.ts";
import { BatchV1Api } from "../apis/batch@v1/mod.ts";

const restClient: RestClient = new KubectlRestClient();

// const appsApi = new AppsV1Api(restClient);
// for await (const deploy of readAllPages(t => appsApi.listDeploymentForAllNamespaces({
//   limit: 5,
//   continue: t,
// }))) {
//   console.log(deploy.metadata?.namespace, deploy.metadata?.name);
// }

// const coreApi = new CoreV1Api(restClient);
// const nodes = await coreApi.readNode('pet-ausbox');
// console.log(nodes.status);

const batchApi = new BatchV1Api(restClient).namespace("dust-poc");
const coreApi = new CoreV1Api(restClient).namespace("dust-poc");
// console.log(await batchApi.listJob());

const job = await batchApi.createJob({
  apiVersion: "batch/v1",
  kind: "Job",
  metadata: {
    generateName: 'deno-example-',
  },
  spec: {
    parallelism: 1,
    completions: 1,
    template: {
      spec: {
        restartPolicy: 'OnFailure',
        containers: [{
          name: 'job',
          image: 'busybox',
          args: [
            'sh',
            '-euxc',
            'date',
          ],
        }],
      },
    },
  },
});
console.log(`Created job`, job.metadata?.name);

while (true) {
  const {status} = await batchApi.readJobStatus(job.metadata?.name ?? '');
  console.log('active pods:', status?.active);
  if (status?.completionTime) break;
  await new Promise(ok => setTimeout(ok, 2000));
}

const pods = await coreApi.listPod({
  labelSelector: Object.entries(job.spec?.selector?.matchLabels ?? {}).map(p => `${p[0]}=${p[1]}`).join(','),
  limit: 5,
});

for (const pod of pods.items) {
  console.log('Logs for', pod.metadata?.name);
  const logs = await coreApi.readPodLog(pod.metadata?.name ?? '');
  console.log(logs);
}

const {status} = await batchApi.deleteJob(job.metadata?.name ?? '', {});
console.log(status);
