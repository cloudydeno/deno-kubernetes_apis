export * from "./structs.ts";

// Autogenerated API file for NetworkingV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as NetworkingV1 from "./structs.ts";

export class NetworkingV1Api {
  #client: c.RestClient;
  #root = "/apis/networking.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): NetworkingV1NamespacedApi {
    return new NetworkingV1NamespacedApi(this.#client, name);
  }
  myNamespace(): NetworkingV1NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new NetworkingV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getIngressClassList(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1.IngressClassList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressClassList(resp);
  }

  async watchIngressClassList(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<NetworkingV1.IngressClass & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1.toIngressClass, MetaV1.toStatus));
  }

  async createIngressClass(
    body: NetworkingV1.IngressClass,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.IngressClass> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromIngressClass(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressClass(resp);
  }

  async deleteIngressClassList(
    opts: operations.DeleteListOpts = {},
  ): Promise<NetworkingV1.IngressClassList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingressclasses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressClassList(resp);
  }

  async getIngressClass(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<NetworkingV1.IngressClass> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressClass(resp);
  }

  async deleteIngressClass(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<NetworkingV1.IngressClass | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return NetworkingV1.toIngressClass(resp);
  }

  async replaceIngressClass(
    name: string,
    body: NetworkingV1.IngressClass,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.IngressClass> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromIngressClass(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressClass(resp);
  }

  async patchIngressClass(
    name: string,
    type: c.PatchType,
    body: NetworkingV1.IngressClass | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<NetworkingV1.IngressClass> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ingressclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1.fromIngressClass(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressClass(resp);
  }

  async getIngressListForAllNamespaces(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1.IngressList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressList(resp);
  }

  async watchIngressListForAllNamespaces(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<NetworkingV1.Ingress & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1.toIngress, MetaV1.toStatus));
  }

  async getNetworkPolicyListForAllNamespaces(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1.NetworkPolicyList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}networkpolicies`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicyList(resp);
  }

  async watchNetworkPolicyListForAllNamespaces(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<NetworkingV1.NetworkPolicy & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}networkpolicies`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1.toNetworkPolicy, MetaV1.toStatus));
  }

}

export class NetworkingV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/networking.k8s.io/v1/namespaces/${namespace}/`;
  }

  async getIngressList(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1.IngressList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressList(resp);
  }

  async watchIngressList(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<NetworkingV1.Ingress & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1.toIngress, MetaV1.toStatus));
  }

  async createIngress(
    body: NetworkingV1.Ingress,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async deleteIngressList(
    opts: operations.DeleteListOpts = {},
  ): Promise<NetworkingV1.IngressList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingresses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngressList(resp);
  }

  async getIngress(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async deleteIngress(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<NetworkingV1.Ingress | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return NetworkingV1.toIngress(resp);
  }

  async replaceIngress(
    name: string,
    body: NetworkingV1.Ingress,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async patchIngress(
    name: string,
    type: c.PatchType,
    body: NetworkingV1.Ingress | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ingresses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async getIngressStatus(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ingresses/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async replaceIngressStatus(
    name: string,
    body: NetworkingV1.Ingress,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ingresses/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async patchIngressStatus(
    name: string,
    type: c.PatchType,
    body: NetworkingV1.Ingress | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<NetworkingV1.Ingress> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ingresses/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1.fromIngress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toIngress(resp);
  }

  async getNetworkPolicyList(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1.NetworkPolicyList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}networkpolicies`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicyList(resp);
  }

  async watchNetworkPolicyList(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<NetworkingV1.NetworkPolicy & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}networkpolicies`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1.toNetworkPolicy, MetaV1.toStatus));
  }

  async createNetworkPolicy(
    body: NetworkingV1.NetworkPolicy,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.NetworkPolicy> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}networkpolicies`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromNetworkPolicy(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicy(resp);
  }

  async deleteNetworkPolicyList(
    opts: operations.DeleteListOpts = {},
  ): Promise<NetworkingV1.NetworkPolicyList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}networkpolicies`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicyList(resp);
  }

  async getNetworkPolicy(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<NetworkingV1.NetworkPolicy> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}networkpolicies/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicy(resp);
  }

  async deleteNetworkPolicy(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<NetworkingV1.NetworkPolicy | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}networkpolicies/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return NetworkingV1.toNetworkPolicy(resp);
  }

  async replaceNetworkPolicy(
    name: string,
    body: NetworkingV1.NetworkPolicy,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1.NetworkPolicy> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}networkpolicies/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1.fromNetworkPolicy(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicy(resp);
  }

  async patchNetworkPolicy(
    name: string,
    type: c.PatchType,
    body: NetworkingV1.NetworkPolicy | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<NetworkingV1.NetworkPolicy> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}networkpolicies/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1.fromNetworkPolicy(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1.toNetworkPolicy(resp);
  }

}
