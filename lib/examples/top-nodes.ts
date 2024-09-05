#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

/*
 * Pulls the latest metrics from every node and prints some high-level metrics.
 * This uses a 'proxy...Request' function which tunnels an HTTP request
 * to a Kubernetes Node's internal API, even from outside the cluster!
 * This API is also available for Pods and Services.
 *
 *  $ deno run --allow-run lib/examples/top-nodes.ts 2>/dev/null
 *  gke-dust-persist3-190b8935-6tf2 :
 *    - CPU: 10 %
 *    - Memory: 1919 Mi used, 1780 Mi avail
 *    - Network: 35224 Mi received / 20365 Mi sent on eth0
 *    - FS: 11334 Mi used, 4563 Mi avail of 15912 Mi capacity
 *    - inodes: 169 k used, 868 k avail of 1037 k capacity
 *    - pods: 22
 *  gke-dust-volatile1-b331c9e9-wh9p :
 *    - CPU: 7.1 %
 *    - Memory: 949 Mi used, 2749 Mi avail
 *    - Network: 2748 Mi received / 3457 Mi sent on eth0
 *    - FS: 3356 Mi used, 12541 Mi avail of 15912 Mi capacity
 *    - inodes: 68 k used, 970 k avail of 1037 k capacity
 *    - pods: 18
 */

import { autoDetectClient } from "../client.ts";
import { CoreV1Api } from "../builtin/core@v1/mod.ts";

const restClient = await autoDetectClient();
const coreApi = new CoreV1Api(restClient);

// Loop over every registered node
const nodeList = await coreApi.getNodeList();
for (const node of nodeList.items) {
  const nodeName = node.metadata?.name;
  if (!nodeName) continue;

  try {
    // Fetch metrics from the actual node, via the Kubernetes APIServer
    const summary = await coreApi.proxyNodeRequest(nodeName, {
      port: 10250,
      method: 'GET',
      path: '/stats/summary',
      expectJson: true, // runs JSON.parse on the response body
    }) as unknown as StatsSummary; // 'unsafe' cast :/

    printStats(summary);

  } catch (err: unknown) {
    console.log(nodeName, ':');
    console.log('  -', 'Failed:', (err as Error).message);
  }
}

// Process and print a retrieve stats summary
function printStats(summary: StatsSummary) {
  const {nodeName, cpu, memory, network, fs} = summary.node;
  console.log(nodeName, ':');

  if (cpu) console.log('  -', 'CPU:',
    Math.ceil(cpu.usageNanoCores / 1000 / 1000) / 10, '%');

  if (memory) console.log('  -', 'Memory:',
    Math.ceil(memory.workingSetBytes / 1024 / 1024), 'Mi used,',
    Math.ceil(memory.availableBytes / 1024 / 1024), 'Mi avail');

  if (network) console.log('  -', 'Network:',
    Math.ceil(network.rxBytes / 1024 / 1024), 'Mi received /',
    Math.ceil(network.txBytes / 1024 / 1024), 'Mi sent',
    'on', network.name);

  if (fs) console.log('  -', 'FS:',
    Math.ceil(fs.usedBytes / 1024 / 1024), 'Mi used,',
    Math.ceil(fs.availableBytes / 1024 / 1024), 'Mi avail',
    'of', Math.ceil(fs.capacityBytes / 1024 / 1024), 'Mi capacity');

  if (fs?.inodes) console.log('  -', 'inodes:',
    Math.ceil(fs.inodesUsed / 1000), 'k used,',
    Math.ceil(fs.inodesFree / 1000), 'k avail',
    'of', Math.ceil(fs.inodes / 1000), 'k capacity');

  console.log('  -', 'pods:', summary.pods.length);
}

// This is a subset of the Kubelet API
interface StatsSummary {
  node: {
    nodeName: string;
    startTime: string;
    cpu?: {
      time: string;
      usageNanoCores: number;
      usageCoreNanoSeconds: number;
    };
    memory?: {
      time: string;
      availableBytes: number;
      workingSetBytes: number;
    };
    network?: {
      time: string;
      name: string;
      rxBytes: number;
      rxErrors: number;
      txBytes: number;
      txErrors: number;
    };
    fs?: {
      time: string;
      availableBytes: number;
      capacityBytes: number;
      usedBytes: number;
      inodesFree: number;
      inodes: number;
      inodesUsed: number;
    };
  };
  pods: unknown[]; // We only care about the list's size for this demo
}
