export * from "./structs.ts";

// Autogenerated API file for AcmeCertManagerIoV1alpha3
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../../builtin/meta@v1/structs.ts";
import * as AcmeCertManagerIoV1alpha3 from "./structs.ts";

export class AcmeCertManagerIoV1alpha3Api {
  #client: c.RestClient;
  #root = "/apis/acme.cert-manager.io/v1alpha3/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new AcmeCertManagerIoV1alpha3NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new AcmeCertManagerIoV1alpha3NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getChallengeListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}challenges`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallengeList(resp);
  }

  async watchChallengeListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}challenges`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AcmeCertManagerIoV1alpha3.toChallenge, MetaV1.toStatus));
  }

  async getOrderListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}orders`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrderList(resp);
  }

  async watchOrderListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}orders`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AcmeCertManagerIoV1alpha3.toOrder, MetaV1.toStatus));
  }

}

export class AcmeCertManagerIoV1alpha3NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/acme.cert-manager.io/v1alpha3/namespaces/${namespace}/`;
  }

  async getChallengeList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}challenges`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallengeList(resp);
  }

  async watchChallengeList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}challenges`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AcmeCertManagerIoV1alpha3.toChallenge, MetaV1.toStatus));
  }

  async createChallenge(body: AcmeCertManagerIoV1alpha3.Challenge, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}challenges`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AcmeCertManagerIoV1alpha3.fromChallenge(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async deleteChallengeList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}challenges`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallengeList(resp);
  }

  async getChallenge(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}challenges/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async deleteChallenge(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}challenges/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return MetaV1.toStatus(resp);
  }

  async replaceChallenge(name: string, body: AcmeCertManagerIoV1alpha3.Challenge, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}challenges/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AcmeCertManagerIoV1alpha3.fromChallenge(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async patchChallenge(name: string, type: c.PatchType, body: AcmeCertManagerIoV1alpha3.Challenge | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}challenges/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AcmeCertManagerIoV1alpha3.fromChallenge(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async getChallengeStatus(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}challenges/${name}/status`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async replaceChallengeStatus(name: string, body: AcmeCertManagerIoV1alpha3.Challenge, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}challenges/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AcmeCertManagerIoV1alpha3.fromChallenge(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async patchChallengeStatus(name: string, type: c.PatchType, body: AcmeCertManagerIoV1alpha3.Challenge | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}challenges/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AcmeCertManagerIoV1alpha3.fromChallenge(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toChallenge(resp);
  }

  async getOrderList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}orders`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrderList(resp);
  }

  async watchOrderList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}orders`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AcmeCertManagerIoV1alpha3.toOrder, MetaV1.toStatus));
  }

  async createOrder(body: AcmeCertManagerIoV1alpha3.Order, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}orders`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AcmeCertManagerIoV1alpha3.fromOrder(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

  async deleteOrderList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}orders`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrderList(resp);
  }

  async getOrder(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}orders/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

  async deleteOrder(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}orders/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return MetaV1.toStatus(resp);
  }

  async replaceOrder(name: string, body: AcmeCertManagerIoV1alpha3.Order, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}orders/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AcmeCertManagerIoV1alpha3.fromOrder(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

  async patchOrder(name: string, type: c.PatchType, body: AcmeCertManagerIoV1alpha3.Order | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}orders/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AcmeCertManagerIoV1alpha3.fromOrder(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

  async getOrderStatus(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}orders/${name}/status`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

  async replaceOrderStatus(name: string, body: AcmeCertManagerIoV1alpha3.Order, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}orders/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AcmeCertManagerIoV1alpha3.fromOrder(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

  async patchOrderStatus(name: string, type: c.PatchType, body: AcmeCertManagerIoV1alpha3.Order | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}orders/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AcmeCertManagerIoV1alpha3.fromOrder(body),
      abortSignal: opts.abortSignal,
    });
    return AcmeCertManagerIoV1alpha3.toOrder(resp);
  }

}
