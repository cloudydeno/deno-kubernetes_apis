# kubernetes_client

This module implements several ways of sending authenticated requests
to the Kubernetes API from deno scripts.

This module contains three different ways of talking to a Kubernetes control plane.
Kubernetes is a complex architechure which likes using sophisticated networking concepts,
while Deno is a relatively young runtime, so there's some mismatch in capabilities.
Therefor each included client has different notes and required flags in order to operate.

To get started on local development, the easiest method is to call out to your `kubectl`
installation to make all the network calls. See `demo.ts` for a brief example.
The only flag necesary for using `KubectlRestClient` is `--allow-run`.

## API Typings

One of the more ambitious parts of this project is to generate sophisicated Typescript
packages for each Kubernetes API and community CRD for arbitrary project revisions.
When they are ready, these generated modules will likely be served from another URL
and merely accept a client constructed by this package in order to actually reach the network.

It will also be possible to run the generation process within your cluster
and serve the customized sources from e.g. S3 or on the fly via a Service.

One big question here is how the Typescript API feel to use.
If you have opinions, please send them in so I know how
real people feel about their Kubernetes API typing.
