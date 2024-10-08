export * from "./structs.ts";

// Autogenerated API file for CoordinationV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as CoordinationV1 from "./structs.ts";

export class CoordinationV1Api {
  #client: c.RestClient;
  #root = "/apis/coordination.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): CoordinationV1NamespacedApi {
    return new CoordinationV1NamespacedApi(this.#client, name);
  }
  myNamespace(): CoordinationV1NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new CoordinationV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getLeaseListForAllNamespaces(
    opts: operations.GetListOpts = {},
  ): Promise<CoordinationV1.LeaseList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}leases`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLeaseList(resp);
  }

  async watchLeaseListForAllNamespaces(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<CoordinationV1.Lease>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}leases`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(CoordinationV1.toLease, MetaV1.toStatus));
  }

}

export class CoordinationV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/coordination.k8s.io/v1/namespaces/${namespace}/`;
  }

  async getLeaseList(
    opts: operations.GetListOpts = {},
  ): Promise<CoordinationV1.LeaseList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}leases`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLeaseList(resp);
  }

  async watchLeaseList(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<CoordinationV1.Lease>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}leases`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(CoordinationV1.toLease, MetaV1.toStatus));
  }

  async createLease(
    body: CoordinationV1.Lease,
    opts: operations.PutOpts = {},
  ): Promise<CoordinationV1.Lease> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}leases`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: CoordinationV1.fromLease(body),
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLease(resp);
  }

  async deleteLeaseList(
    opts: operations.DeleteListOpts = {},
  ): Promise<CoordinationV1.LeaseList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}leases`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLeaseList(resp);
  }

  async getLease(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<CoordinationV1.Lease> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}leases/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLease(resp);
  }

  async deleteLease(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<CoordinationV1.Lease | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}leases/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return CoordinationV1.toLease(resp);
  }

  async replaceLease(
    name: string,
    body: CoordinationV1.Lease,
    opts: operations.PutOpts = {},
  ): Promise<CoordinationV1.Lease> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}leases/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: CoordinationV1.fromLease(body),
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLease(resp);
  }

  async patchLease(
    name: string,
    type: c.PatchType,
    body: CoordinationV1.Lease | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<CoordinationV1.Lease> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}leases/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : CoordinationV1.fromLease(body),
      abortSignal: opts.abortSignal,
    });
    return CoordinationV1.toLease(resp);
  }

}
