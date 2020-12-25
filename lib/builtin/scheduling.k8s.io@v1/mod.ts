export * from "./structs.ts";

// Autogenerated API file for SchedulingV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as SchedulingV1 from "./structs.ts";

export class SchedulingV1Api {
  #client: c.RestClient;
  #root = "/apis/scheduling.k8s.io/v1/";
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
    return SchedulingV1.toPriorityClassList(resp);
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
    return resp.pipeThrough(new c.WatchEventTransformer(SchedulingV1.toPriorityClass, MetaV1.toStatus));
  }

  async createPriorityClass(body: SchedulingV1.PriorityClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}priorityclasses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: SchedulingV1.fromPriorityClass(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1.toPriorityClass(resp);
  }

  async deletePriorityClassList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}priorityclasses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1.toPriorityClassList(resp);
  }

  async getPriorityClass(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1.toPriorityClass(resp);
  }

  async deletePriorityClass(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1.toPriorityClass(resp);
  }

  async replacePriorityClass(name: string, body: SchedulingV1.PriorityClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: SchedulingV1.fromPriorityClass(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1.toPriorityClass(resp);
  }

  async patchPriorityClass(name: string, type: c.PatchType, body: SchedulingV1.PriorityClass | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}priorityclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : SchedulingV1.fromPriorityClass(body),
      abortSignal: opts.abortSignal,
    });
    return SchedulingV1.toPriorityClass(resp);
  }

}