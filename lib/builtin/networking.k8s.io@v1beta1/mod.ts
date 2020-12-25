export * from "./structs.ts";

// Autogenerated API file for NetworkingV1beta1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as NetworkingV1beta1 from "./structs.ts";

export class NetworkingV1beta1Api {
  #client: c.RestClient;
  #root = "/apis/networking.k8s.io/v1beta1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new NetworkingV1beta1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new NetworkingV1beta1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getIngressClassList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClassList(resp);
  }

  async watchIngressClassList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1beta1.toIngressClass, MetaV1.toStatus));
  }

  async createIngressClass(body: NetworkingV1beta1.IngressClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1beta1.fromIngressClass(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClass(resp);
  }

  async deleteIngressClassList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClassList(resp);
  }

  async getIngressClass(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClass(resp);
  }

  async deleteIngressClass(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClass(resp);
  }

  async replaceIngressClass(name: string, body: NetworkingV1beta1.IngressClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1beta1.fromIngressClass(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClass(resp);
  }

  async patchIngressClass(name: string, type: c.PatchType, body: NetworkingV1beta1.IngressClass | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1beta1.fromIngressClass(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressClass(resp);
  }

  async getIngressListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressList(resp);
  }

  async watchIngressListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1beta1.toIngress, MetaV1.toStatus));
  }

}

export class NetworkingV1beta1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/networking.k8s.io/v1beta1/namespaces/${namespace}/`;
  }

  async getIngressList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressList(resp);
  }

  async watchIngressList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1beta1.toIngress, MetaV1.toStatus));
  }

  async createIngress(body: NetworkingV1beta1.Ingress, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1beta1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async deleteIngressList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngressList(resp);
  }

  async getIngress(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async deleteIngress(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async replaceIngress(name: string, body: NetworkingV1beta1.Ingress, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1beta1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async patchIngress(name: string, type: c.PatchType, body: NetworkingV1beta1.Ingress | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1beta1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async getIngressStatus(name: string, opts: {
    abortSignal?: AbortSignal;
  } = {}) {
    const query = new URLSearchParams;
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses/${name}/status`,
      expectJson: true,
      querystring: query,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async replaceIngressStatus(name: string, body: NetworkingV1beta1.Ingress, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ingresses/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1beta1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

  async patchIngressStatus(name: string, type: c.PatchType, body: NetworkingV1beta1.Ingress | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ingresses/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1beta1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1beta1.toIngress(resp);
  }

}
