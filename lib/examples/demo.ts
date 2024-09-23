#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

import { autoDetectClient, readAllItems } from '../deps.ts';
import { AppsV1Api } from "../builtin/apps@v1/mod.ts";
import { CoreV1Api } from "../builtin/core@v1/mod.ts";

const restClient = await autoDetectClient();


// Set up a client for the apps/v1 API
const appsApi = new AppsV1Api(restClient);

// Iterate thru all deployments with pagination (to handle large lists effectively)
for await (const deploy of readAllItems(t => appsApi.getDeploymentListForAllNamespaces({
  limit: 5, // note: tiny page size for demonstration purposes, 100-500 is common in practice
  continue: t,
}))) {
  console.log(deploy.metadata?.namespace, deploy.metadata?.name);
}


// Set up a client for the core v1 API
const coreApi = new CoreV1Api(restClient);

// Get the first node from the cluster node list
const {items: [node]} = await coreApi.getNodeList({limit: 1});
console.log(node.status);
