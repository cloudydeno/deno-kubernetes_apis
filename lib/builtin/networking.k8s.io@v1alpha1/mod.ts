export * from "./structs.ts";

// Autogenerated API file for NetworkingV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as NetworkingV1alpha1 from "./structs.ts";

export class NetworkingV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/networking.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getClusterCIDRList(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDRList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clustercidrs`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toClusterCIDRList(resp);
  }

  async watchClusterCIDRList(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<NetworkingV1alpha1.ClusterCIDR>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clustercidrs`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1alpha1.toClusterCIDR, MetaV1.toStatus));
  }

  async createClusterCIDR(
    body: NetworkingV1alpha1.ClusterCIDR,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDR> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}clustercidrs`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1alpha1.fromClusterCIDR(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toClusterCIDR(resp);
  }

  async deleteClusterCIDRList(
    opts: operations.DeleteListOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDRList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clustercidrs`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toClusterCIDRList(resp);
  }

  async getClusterCIDR(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDR> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clustercidrs/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toClusterCIDR(resp);
  }

  async deleteClusterCIDR(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDR | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clustercidrs/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return NetworkingV1alpha1.toClusterCIDR(resp);
  }

  async replaceClusterCIDR(
    name: string,
    body: NetworkingV1alpha1.ClusterCIDR,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDR> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}clustercidrs/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1alpha1.fromClusterCIDR(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toClusterCIDR(resp);
  }

  async patchClusterCIDR(
    name: string,
    type: c.PatchType,
    body: NetworkingV1alpha1.ClusterCIDR | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<NetworkingV1alpha1.ClusterCIDR> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}clustercidrs/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1alpha1.fromClusterCIDR(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toClusterCIDR(resp);
  }

  async getIPAddressList(
    opts: operations.GetListOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddressList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ipaddresses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toIPAddressList(resp);
  }

  async watchIPAddressList(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<NetworkingV1alpha1.IPAddress>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ipaddresses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(NetworkingV1alpha1.toIPAddress, MetaV1.toStatus));
  }

  async createIPAddress(
    body: NetworkingV1alpha1.IPAddress,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddress> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}ipaddresses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1alpha1.fromIPAddress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toIPAddress(resp);
  }

  async deleteIPAddressList(
    opts: operations.DeleteListOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddressList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ipaddresses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toIPAddressList(resp);
  }

  async getIPAddress(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddress> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}ipaddresses/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toIPAddress(resp);
  }

  async deleteIPAddress(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddress | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}ipaddresses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return NetworkingV1alpha1.toIPAddress(resp);
  }

  async replaceIPAddress(
    name: string,
    body: NetworkingV1alpha1.IPAddress,
    opts: operations.PutOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddress> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}ipaddresses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: NetworkingV1alpha1.fromIPAddress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toIPAddress(resp);
  }

  async patchIPAddress(
    name: string,
    type: c.PatchType,
    body: NetworkingV1alpha1.IPAddress | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<NetworkingV1alpha1.IPAddress> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}ipaddresses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : NetworkingV1alpha1.fromIPAddress(body),
      abortSignal: opts.abortSignal,
    });
    return NetworkingV1alpha1.toIPAddress(resp);
  }

}
