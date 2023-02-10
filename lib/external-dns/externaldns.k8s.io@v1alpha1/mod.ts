export * from "./structs.ts";

// Autogenerated API file for ExternaldnsV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../../builtin/meta@v1/structs.ts";
import * as ExternaldnsV1alpha1 from "./structs.ts";

export class ExternaldnsV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/externaldns.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new ExternaldnsV1alpha1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new ExternaldnsV1alpha1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getDNSEndpointListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}dnsendpoints`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpointList(resp);
  }

  async watchDNSEndpointListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}dnsendpoints`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ExternaldnsV1alpha1.toDNSEndpoint, MetaV1.toStatus));
  }

}

export class ExternaldnsV1alpha1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/externaldns.k8s.io/v1alpha1/namespaces/${namespace}/`;
  }

  async getDNSEndpointList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}dnsendpoints`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpointList(resp);
  }

  async watchDNSEndpointList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}dnsendpoints`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ExternaldnsV1alpha1.toDNSEndpoint, MetaV1.toStatus));
  }

  async createDNSEndpoint(body: ExternaldnsV1alpha1.DNSEndpoint, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}dnsendpoints`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ExternaldnsV1alpha1.fromDNSEndpoint(body),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async deleteDNSEndpointList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}dnsendpoints`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpointList(resp);
  }

  async getDNSEndpoint(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}dnsendpoints/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async deleteDNSEndpoint(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}dnsendpoints/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async replaceDNSEndpoint(name: string, body: ExternaldnsV1alpha1.DNSEndpoint, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}dnsendpoints/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ExternaldnsV1alpha1.fromDNSEndpoint(body),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async patchDNSEndpoint(name: string, type: c.PatchType, body: ExternaldnsV1alpha1.DNSEndpoint | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}dnsendpoints/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ExternaldnsV1alpha1.fromDNSEndpoint(body),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async getDNSEndpointStatus(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}dnsendpoints/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async replaceDNSEndpointStatus(name: string, body: ExternaldnsV1alpha1.DNSEndpoint, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}dnsendpoints/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ExternaldnsV1alpha1.fromDNSEndpoint(body),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

  async patchDNSEndpointStatus(name: string, type: c.PatchType, body: ExternaldnsV1alpha1.DNSEndpoint | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}dnsendpoints/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ExternaldnsV1alpha1.fromDNSEndpoint(body),
      abortSignal: opts.abortSignal,
    });
    return ExternaldnsV1alpha1.toDNSEndpoint(resp);
  }

}
