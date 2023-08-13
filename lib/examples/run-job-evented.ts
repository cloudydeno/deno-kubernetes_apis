#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

import { Reflector, autoDetectClient } from "../client.ts";
import { CoreV1Api } from "../builtin/core@v1/mod.ts";
import { BatchV1Api } from "../builtin/batch@v1/mod.ts";
import { TextLineStream } from "https://deno.land/std@0.177.0/streams/text_line_stream.ts";

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
            'sleep 10s; date',
          ],
        }],
      },
    },
  },
});
console.log(`Created job`, job.metadata?.name);

// Set up concurrency-limited background log streaming
const streamedPods = new Set<string>();
async function streamPodsLogsIfNotAlready(podName: string) {
  if (streamedPods.has(podName)) return;
  streamedPods.add(podName);
  console.log(podName, 'log'.padStart(10), '\\', 'Starting stream...');
  const stream = await coreApi.streamPodLog(podName, {
    follow: true,
  });
  try {
    await stream
      .pipeThrough(new TextLineStream())
      .pipeTo(new WritableStream({
        write(line) {
          console.log(podName, 'log'.padStart(10), '|', line);
        },
        close() {
          console.log(podName, 'log'.padStart(10), '/', 'EOF');
        },
      }));
  } finally {
    streamedPods.delete(podName);
  }
}

// Set up an event-based Pod watcher so we can efficiently know as soon as any pod completes
const podWatcher = new Reflector(
  opts => coreApi.getPodList({ ...opts, labelSelector: `job-name=${job.metadata?.name}` }),
  opts => coreApi.watchPodList({ ...opts, labelSelector: `job-name=${job.metadata?.name}` }));
podWatcher.run();
for await (const x of podWatcher.observeAll()) {
  if (x.type == 'ERROR') throw new Error(x.object.message ?? 'Watch Error');
  if (x.type == 'ADDED' || x.type == 'MODIFIED' || x.type == 'DELETED') {
    const pod = x.object;
    const containerState = pod.status?.containerStatuses?.[0].state;
    console.log(pod.metadata?.name, x.type.toLowerCase().padStart(10),
      (containerState?.waiting ?? containerState?.terminated)?.reason ?? pod.status?.phase);

    // Possibly up a log tail if the container is running
    if (containerState?.running) {
      streamPodsLogsIfNotAlready(pod.metadata.name);
    }

    // End the event-based loop when we see a succeeded Pod
    if (pod.status?.phase == 'Succeeded') {
      break;
    }
  }
}

// Delete our Job and print the final status (if we get one)
const deletion = await batchApi.deleteJob(job.metadata?.name ?? '', {
  propagationPolicy: 'Background', // Remove child pods as well
});
if (deletion.kind == 'Job') {
  console.log('Final job status:', deletion.status);
}

// Note: the "Reflector" implementation is not yet capable of shutting down cleanly.
// We terminate the process as a work-around.
Deno.exit();
