export * from "./structs.ts";

// Autogenerated API file for DiscoveryV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as DiscoveryV1 from "./structs.ts";

export class DiscoveryV1Api {
  #client: c.RestClient;
  #root = "/apis/discovery.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): DiscoveryV1NamespacedApi {
    return new DiscoveryV1NamespacedApi(this.#client, name);
  }
  myNamespace(): DiscoveryV1NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new DiscoveryV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getEndpointSliceListForAllNamespaces(
    opts: operations.GetListOpts = {},
  ): Promise<DiscoveryV1.EndpointSliceList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}endpointslices`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSliceList(resp);
  }

  async watchEndpointSliceListForAllNamespaces(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<DiscoveryV1.EndpointSlice & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}endpointslices`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(DiscoveryV1.toEndpointSlice, MetaV1.toStatus));
  }

}

export class DiscoveryV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/discovery.k8s.io/v1/namespaces/${namespace}/`;
  }

  async getEndpointSliceList(
    opts: operations.GetListOpts = {},
  ): Promise<DiscoveryV1.EndpointSliceList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}endpointslices`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSliceList(resp);
  }

  async watchEndpointSliceList(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<DiscoveryV1.EndpointSlice & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}endpointslices`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(DiscoveryV1.toEndpointSlice, MetaV1.toStatus));
  }

  async createEndpointSlice(
    body: DiscoveryV1.EndpointSlice,
    opts: operations.PutOpts = {},
  ): Promise<DiscoveryV1.EndpointSlice> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}endpointslices`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: DiscoveryV1.fromEndpointSlice(body),
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSlice(resp);
  }

  async deleteEndpointSliceList(
    opts: operations.DeleteListOpts = {},
  ): Promise<DiscoveryV1.EndpointSliceList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}endpointslices`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSliceList(resp);
  }

  async getEndpointSlice(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<DiscoveryV1.EndpointSlice> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}endpointslices/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSlice(resp);
  }

  async deleteEndpointSlice(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<DiscoveryV1.EndpointSlice | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}endpointslices/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return DiscoveryV1.toEndpointSlice(resp);
  }

  async replaceEndpointSlice(
    name: string,
    body: DiscoveryV1.EndpointSlice,
    opts: operations.PutOpts = {},
  ): Promise<DiscoveryV1.EndpointSlice> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}endpointslices/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: DiscoveryV1.fromEndpointSlice(body),
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSlice(resp);
  }

  async patchEndpointSlice(
    name: string,
    type: c.PatchType,
    body: DiscoveryV1.EndpointSlice | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<DiscoveryV1.EndpointSlice> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}endpointslices/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : DiscoveryV1.fromEndpointSlice(body),
      abortSignal: opts.abortSignal,
    });
    return DiscoveryV1.toEndpointSlice(resp);
  }

}
