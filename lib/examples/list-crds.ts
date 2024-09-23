#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run --unstable

import { autoDetectClient, readAllItems } from '../deps.ts';
import { ApiextensionsV1Api } from "../builtin/apiextensions.k8s.io@v1/mod.ts";

const restClient = await autoDetectClient();

const appsApi = new ApiextensionsV1Api(restClient);
for await (const crd of readAllItems(t => appsApi
    .getCustomResourceDefinitionList({ limit: 25, continue: t }))) {

  console.log(crd.metadata?.name,
      crd.spec.versions.map(x => x.name));
}
