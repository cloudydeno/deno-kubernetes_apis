![Deno CI](https://github.com/danopia/deno-kubernetes_apis/workflows/CI/badge.svg?branch=main)

# `/x/kubernetes_apis`

## Purpose

Generated, typed interfaces to make every possible Kubernetes API request and work with richer data structures.

The actual request transports are implemented in `/x/kubernetes_client`.

## Usage

Here's a basic request, listing all Pods in the `default` namespace.
It uses the `autoDetectClient()` entrypoint which returns the first usable client.

```ts
import { autoDetectClient } from 'https://deno.land/x/kubernetes_client@v0.7.0/mod.ts';
import { CoreV1Api } from 'https://deno.land/x/kubernetes_apis/builtin/core@v1/mod.ts';

const kubernetes = await autoDetectClient();
const coreApi = new CoreV1Api(kubernetes).namespace("default");

const podList = await coreApi.getPodList();
console.log(podList);

// see files in examples/ for more API demos (watching, creation, etc)
```

When running locally (with `kubectl` set up), you probably just to add `--allow-run=kubectl` to run this.
For a container being deployed onto a cluster, there's more flags to provide instead;
see `/x/kubernetes_client` for more information.

## Changelog

* `v0.5.1` on `2024-09-18`:
  * Updating `/x/kubernetes_client` API contract to `v0.7.3`.
  * Add [JSR publication](https://jsr.io/@cloudydeno/kubernetes-apis) of the module.
  * Exposed API surface has been adjusted to satisfy JSR "slow types" checks. Shouldn't affect most code.

* `v0.5.0` on `2023-08-19`:
  * Updating `/x/kubernetes_client` API contract to `v0.7.0`.
  * Actually implement PodExec, PodAttach, PodPortForward APIs with a new tunnel implementation.
  * Includes 'builtin' APIs generated from K8s `v1.28.0`.
    * New APIs: `admissionregistration.k8s.io/v1beta1`, `certificates.k8s.io/v1alpha1`.
    * Also, API additions for sidecar containers and `SelfSubjectReview`.
  * Fix several structures incorrectly typed as `{}` instead of `JSONValue`.

* `v0.4.0` on `2023-02-10`:
  * Updating `/x/kubernetes_client` API contract to `v0.5.0`.
  * Breaking change: The return type of delete functions has been widened to a union.
    * If you were using a deletion response, you can use type narrowing to detect which Kind was returned.
    * See [#4](https://github.com/cloudydeno/deno-kubernetes_apis/issues/4) for more information.
  * Includes 'builtin' APIs generated from K8s `v1.26.1`.
    * Numerous alpha and beta APIs removed, including autoscaling, batch, and policy
    * Further API changes are detailed in Github Releases.
  * `cert-manager` CRDs have been updated. Removes v1beta1, v1alpha3, and v1alpha2 APIs.
  * `argo-cd` CRDs have been updated. Adds a new `ApplicationSet` CRD.
    * Some nested structures were deduplicated to reduce code size.
  * Added CRDs for [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler).
  * Add `streamPodLogs` to allow fetching pod logs as a `ReadableStream<string>`.

* `v0.3.2` on `2021-12-02`:
  * Updating `/x/kubernetes_client` API contract to `v0.3.2`.
  * Includes 'builtin' APIs generated from K8s `v1.22.4`.
    * Numerous `v1beta1` API versions were removed in favor of stable `v1` APIs.
    * Further API changes are detailed in Github Releases.
  * `cert-manager` and `external-dns` CRDs have been updated from the latest releases.
  * Added CRDs for `argo-cd`.

* `v0.3.1` on `2021-05-09`:
  * Updating `/x/kubernetes_client` API contract to `v0.2.4`.
  * Includes 'builtin' APIs generated from K8s `v1.21.0`.
    * `get` functions no longer accept `export` or `exact`.
  * `cert-manager` and `external-dns` CRDs have been updated from the latest releases.

* `v0.3.0` on `2021-02-28`:
  * Updating `/x/kubernetes_client` API contract to `v0.2.0`.
    * Breaking change!
    * If you import `autoDetectClient` and other client APIs from this `common.ts`,
      those now come from `client.ts` instead
      (or just import `/x/kubernetes_client` yourself).
    * This upstream release vastly improves cluster client detection logic.
  * Now handles v1.Status error payloads when processing any response body.
  * Added shebang and execute bit to every script in `examples/`.
  * Optimized redundencies out of cert-manager structures (half the file size now)

* `v0.2.0` on `2020-12-29`:
  * Includes 'builtin' APIs generated from K8s `v1.20`.
  * Patching and deletion is more stable; mistype error messages are vastly improved.
  * ApiExtensions and ApiRegistration groups are now included.
  * Updating `/x/kubernetes_client` API contract to `v0.1.2`.
  * Reflector implementation has been moved up to `/x/kubernetes_client`.
  * Core's proxy endpoints (Node/Pod/Service) are now implemented and usable.
  * CRDs are now generated from original YAML instead of from a cluster's generated APIs.
  * cert-manager's CRDs have been updated to `v1` and external-dns's CRDs also added.

* `v0.1.0` on `2020-11-17`:
  * Initial release, with 'builtin' APIs generated from K8s `v1.19`.
  * There's still a fair amount of TODOs for particular resources, and structure types.
  * A workable Reflector implementation is included.
  * cert-manager's CRDs have a generated client as well, as an experiment.

## TODO

* [x] PATCH requests
* [ ] Solidify Quantity, Duration, etc
* [x] Reconcile deletion response kinds (might still be fallout)
* [x] Story for generating API clients directly from CRD specifications
* [ ] Story for generating the whole API surface of a specific cluster
* [x] Move Reflector implementation upstream to `/x/kubernetes_client`
