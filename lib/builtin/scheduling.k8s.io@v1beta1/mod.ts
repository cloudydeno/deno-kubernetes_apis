export * from "./structs.ts";

// Autogenerated API file for SchedulingV1beta1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as SchedulingV1beta1 from "./structs.ts";

export class SchedulingV1beta1Api {
  #client: c.RestClient;
  #root = "/apis/scheduling.k8s.io/v1beta1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getPriorityClassList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}priorityclasses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1beta1.toPriorityClassList(resp);
  }

  async watchPriorityClassList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}priorityclasses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(SchedulingV1beta1.toPriorityClass, MetaV1.toStatus));
  }

  async createPriorityClass(body: SchedulingV1beta1.PriorityClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}priorityclasses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: SchedulingV1beta1.fromPriorityClass(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1beta1.toPriorityClass(resp);
  }

  async deletePriorityClassList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}priorityclasses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1beta1.toPriorityClassList(resp);
  }

  async getPriorityClass(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1beta1.toPriorityClass(resp);
  }

  async deletePriorityClass(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return MetaV1.toStatus(resp);
  }

  async replacePriorityClass(name: string, body: SchedulingV1beta1.PriorityClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: SchedulingV1beta1.fromPriorityClass(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1beta1.toPriorityClass(resp);
  }

  async patchPriorityClass(name: string, type: c.PatchType, body: SchedulingV1beta1.PriorityClass | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : SchedulingV1beta1.fromPriorityClass(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1beta1.toPriorityClass(resp);
  }

}
