![Deno CI](https://github.com/danopia/deno-kubernetes_apis/workflows/Deno%20CI/badge.svg?branch=main)

# `/x/kubernetes_apis`

## Purpose

Generated, typed interfaces to make every possible Kubernetes API request and work with richer data structures.

Actual request transports implemented in `/x/kubernetes_client`.

S

## Usage

Here's a basic request, listing all Pods in the `default` namespace.
It uses the `autoDetectClient()` entrypoint which returns the first usable client.

```ts
import { autoDetectClient } from 'https://deno.land/x/kubernetes_client/mod.ts';
import { CoreV1Api } from 'https://deno.land/x/kubernetes_apis/builtin/core@v1/mod.ts';

const kubernetes = await autoDetectClient();
const coreApi = new CoreV1Api(kubernetes).namespace("default");

const podList = await coreApi.getPodList();
console.log(podList);

// see files in examples/ for more API demos (watching , etc)
```

When running locally (with `kubectl` set up), you probably just to add `--allow-run` to run this.
For a container being deployed onto a cluster, there's more flags to provide instead;
see `/x/kubernetes_client` for more information.

## Changelog

* `v0.1.0` on `2020-11-17`: Initial release, with 'builtin' APIs generated from K8s v1.19.
    There's still a fair amount of TODOs for particular resources, and structure types.
    A workable Reflector implementation is included.
    cert-manager's CRDs have a generated client as well, as an experiment.

## TODO

* [ ] PATCH requests
* [ ] Solidify Quantity, Duration, etc
* [ ] Story for generating API clients directly from CRD specifications
* [ ] Story for generating the whole API surface of a specific cluster
* [ ] Add filtering to Reflector implementation (e.g. by annotation)
