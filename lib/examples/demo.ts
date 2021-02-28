#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run

import { autoDetectClient, readAllItems } from '../client.ts';
import { AppsV1Api } from "../builtin/apps@v1/mod.ts";
import { CoreV1Api } from "../builtin/core@v1/mod.ts";

const restClient = await autoDetectClient();

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
