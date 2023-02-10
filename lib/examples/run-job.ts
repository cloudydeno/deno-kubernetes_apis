#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

import { autoDetectClient } from "../client.ts";
import { CoreV1Api } from "../builtin/core@v1/mod.ts";
import { BatchV1Api } from "../builtin/batch@v1/mod.ts";

const restClient = await autoDetectClient();
const namespace = restClient.defaultNamespace ?? 'default';
const batchApi = new BatchV1Api(restClient).namespace(namespace);
const coreApi = new CoreV1Api(restClient).namespace(namespace);

const job = await batchApi.createJob({
  metadata: {
    generateName: 'deno-example-',
  },
  spec: {
    ttlSecondsAfterFinished: 60 * 60,
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
  const {status} = await batchApi.getJobStatus(job.metadata?.name ?? '');
  console.log('active pods:', status?.active);
  if (status?.completionTime) break;
  await new Promise(ok => setTimeout(ok, 2000));
}

const pods = await coreApi.getPodList({
  labelSelector: Object.entries(job.spec?.selector?.matchLabels ?? {}).map(p => `${p[0]}=${p[1]}`).join(','),
  limit: 5,
});

for (const pod of pods.items) {
  console.log('Logs for', pod.metadata?.name);
  const logs = await coreApi.getPodLog(pod.metadata?.name ?? '');
  console.log(logs);
}

const {status} = await batchApi.deleteJob(job.metadata?.name ?? '', {});
console.log(status);
