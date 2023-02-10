#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

// Breaks up a text stream into lines
import { TextLineStream } from "https://deno.land/std@0.177.0/streams/text_line_stream.ts";

import { autoDetectClient } from '../client.ts';
import { CoreV1Api } from '../builtin/core@v1/mod.ts';

const restClient = await autoDetectClient();
const coreApi = new CoreV1Api(restClient);

// To run without cluster-specific info, we use the first pod we can find:
const podList = await coreApi.getPodListForAllNamespaces({ limit: 1 });
const firstPod = podList.items[0];

// Get a basic text stream
const logStream = await coreApi
  .namespace(firstPod.metadata?.namespace!)
  .streamPodLog(firstPod.metadata?.name!, {
    follow: true,
    tailLines: 10,
    timestamps: true, // prepended to each line
  });

// Split the stream up into lines and parse the timestamps out
for await (const line of logStream.pipeThrough(new TextLineStream())) {
  const firstSpace = line.indexOf(' ');
  const date = new Date(line.slice(0, firstSpace));
  const logLine = line.slice(firstSpace+1);
  console.log(date, logLine);
}