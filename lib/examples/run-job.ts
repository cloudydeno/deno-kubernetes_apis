import { autoDetectClient } from '../clients/mod.ts';
import { CoreV1Api } from "../apis/core@v1/mod.ts";
import { BatchV1Api } from "../apis/batch@v1/mod.ts";

const restClient = await autoDetectClient();
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
