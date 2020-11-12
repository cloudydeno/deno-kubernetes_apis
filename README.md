## Kubernetes compatability

APIs are generated from Kubernetes OpenAPI specs, which are large JSON files.

You can pull your cluster's OpenAPI spec easily:

`kubectl get --raw /openapi/v2 > openapi.json`

API specs from Kubernetes v1.14.0 and later should work fine.
Earlier releases would need some codegen changes to be compatible.

## Module Layout

Versioning is tricky with Kubernetes APIs because every cluster can have a different surface.

When referring to Kubernetes API surfaces, an exhuastive module path might look like this:

* `//k8s_apigen@v0.2.1/kubernetes@v1.17.8/core@v1/mod.ts`
* `//k8s_apigen@v0.2.1/kubernetes@v1.18.3/apps@v1beta1/mod.ts`
* `//k8s_apigen@v0.2.1/kubernetes@v1.19.1/networking.k8s.io@v1/mod.ts`

There's also third-party projects that register CRDs, such as cert-manager.
It's unfortunate that OpenAPI specs aren't published by these projects,
so generation will depend on access to a live cluster,
or extending the codegen to accept CRD YAML files as input in place of OpenAPI JSON.

Several examples of addressing third party APIs might be:

* `//k8s_apigen@v0.2.1/cert-manager@v1.0.4/acme.cert-manager.io@v1alpha2/mod.ts`
* `//k8s_apigen@v0.2.1/external-dns@v0.7.4/externaldns.k8s.io@v1alpha1/mod.ts`
* `//k8s_apigen@v0.2.1/velero@v1.5.2/velero.io@v1/mod.ts`

There's not really any, like, directory of CRDs, so we'll need to make the list ourselves..

Finally, for generating code within a cluster, it's pretty likely that a cluster's apis
will be generated as one unit and stored in S3 or similar, and the paths are more straightforward:

* `//k8s_api_surface/batch@v1/mod.ts`

In any case, the actual API client that works with authentication/transport
will be served authoratatively from a normal deno repo:

* `https://deno.land/x/kubernetes_client@0.2.1/mod.ts`
