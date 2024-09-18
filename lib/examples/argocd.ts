#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

import { autoDetectClient, readAllItems } from '../deps.ts';
import { ArgoprojIoV1alpha1NamespacedApi } from "../argo-cd/argoproj.io@v1alpha1/mod.ts";

const restClient = await autoDetectClient();

const argoApi = new ArgoprojIoV1alpha1NamespacedApi(restClient, 'argocd');
for await (const app of readAllItems(t => argoApi.getApplicationList({ limit: 25, continue: t }))) {
  console.log(app.status?.sync?.status, '/', app.status?.health?.status, '-', app.metadata?.name);
}
