export * from "./structs.ts";

// Autogenerated API file for BatchV1beta1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as BatchV1beta1 from "./structs.ts";

export class BatchV1beta1Api {
  #client: c.RestClient;
  #root = "/apis/batch/v1beta1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new BatchV1beta1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new BatchV1beta1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getCronJobListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}cronjobs`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJobList(resp);
  }

  async watchCronJobListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}cronjobs`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(BatchV1beta1.toCronJob, MetaV1.toStatus));
  }

}

export class BatchV1beta1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/batch/v1beta1/namespaces/${namespace}/`;
  }

  async getCronJobList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}cronjobs`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJobList(resp);
  }

  async watchCronJobList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}cronjobs`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(BatchV1beta1.toCronJob, MetaV1.toStatus));
  }

  async createCronJob(body: BatchV1beta1.CronJob, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}cronjobs`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: BatchV1beta1.fromCronJob(body),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

  async deleteCronJobList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}cronjobs`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJobList(resp);
  }

  async getCronJob(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}cronjobs/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

  async deleteCronJob(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}cronjobs/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return MetaV1.toStatus(resp);
  }

  async replaceCronJob(name: string, body: BatchV1beta1.CronJob, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}cronjobs/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: BatchV1beta1.fromCronJob(body),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

  async patchCronJob(name: string, type: c.PatchType, body: BatchV1beta1.CronJob | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}cronjobs/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : BatchV1beta1.fromCronJob(body),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

  async getCronJobStatus(name: string, opts: {
    abortSignal?: AbortSignal;
  } = {}) {
    const query = new URLSearchParams;
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}cronjobs/${name}/status`,
      expectJson: true,
      querystring: query,
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

  async replaceCronJobStatus(name: string, body: BatchV1beta1.CronJob, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}cronjobs/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: BatchV1beta1.fromCronJob(body),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

  async patchCronJobStatus(name: string, type: c.PatchType, body: BatchV1beta1.CronJob | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}cronjobs/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : BatchV1beta1.fromCronJob(body),
      abortSignal: opts.abortSignal,
    });
    return BatchV1beta1.toCronJob(resp);
  }

}
