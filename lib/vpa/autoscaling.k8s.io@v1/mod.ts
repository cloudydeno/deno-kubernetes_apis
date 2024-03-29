export * from "./structs.ts";

// Autogenerated API file for AutoscalingV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../../builtin/meta@v1/structs.ts";
import * as AutoscalingV1 from "./structs.ts";

export class AutoscalingV1Api {
  #client: c.RestClient;
  #root = "/apis/autoscaling.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new AutoscalingV1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new AutoscalingV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getVerticalPodAutoscalerCheckpointListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalercheckpoints`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpointList(resp);
  }

  async watchVerticalPodAutoscalerCheckpointListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalercheckpoints`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AutoscalingV1.toVerticalPodAutoscalerCheckpoint, MetaV1.toStatus));
  }

  async getVerticalPodAutoscalerListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalers`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerList(resp);
  }

  async watchVerticalPodAutoscalerListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalers`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AutoscalingV1.toVerticalPodAutoscaler, MetaV1.toStatus));
  }

}

export class AutoscalingV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/autoscaling.k8s.io/v1/namespaces/${namespace}/`;
  }

  async getVerticalPodAutoscalerCheckpointList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalercheckpoints`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpointList(resp);
  }

  async watchVerticalPodAutoscalerCheckpointList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalercheckpoints`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AutoscalingV1.toVerticalPodAutoscalerCheckpoint, MetaV1.toStatus));
  }

  async createVerticalPodAutoscalerCheckpoint(body: AutoscalingV1.VerticalPodAutoscalerCheckpoint, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}verticalpodautoscalercheckpoints`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AutoscalingV1.fromVerticalPodAutoscalerCheckpoint(body),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpoint(resp);
  }

  async deleteVerticalPodAutoscalerCheckpointList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}verticalpodautoscalercheckpoints`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpointList(resp);
  }

  async getVerticalPodAutoscalerCheckpoint(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalercheckpoints/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpoint(resp);
  }

  async deleteVerticalPodAutoscalerCheckpoint(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}verticalpodautoscalercheckpoints/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return AutoscalingV1.toVerticalPodAutoscalerCheckpoint(resp);
  }

  async replaceVerticalPodAutoscalerCheckpoint(name: string, body: AutoscalingV1.VerticalPodAutoscalerCheckpoint, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}verticalpodautoscalercheckpoints/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AutoscalingV1.fromVerticalPodAutoscalerCheckpoint(body),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpoint(resp);
  }

  async patchVerticalPodAutoscalerCheckpoint(name: string, type: c.PatchType, body: AutoscalingV1.VerticalPodAutoscalerCheckpoint | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}verticalpodautoscalercheckpoints/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AutoscalingV1.fromVerticalPodAutoscalerCheckpoint(body),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerCheckpoint(resp);
  }

  async getVerticalPodAutoscalerList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalers`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerList(resp);
  }

  async watchVerticalPodAutoscalerList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalers`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AutoscalingV1.toVerticalPodAutoscaler, MetaV1.toStatus));
  }

  async createVerticalPodAutoscaler(body: AutoscalingV1.VerticalPodAutoscaler, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}verticalpodautoscalers`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AutoscalingV1.fromVerticalPodAutoscaler(body),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscaler(resp);
  }

  async deleteVerticalPodAutoscalerList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}verticalpodautoscalers`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscalerList(resp);
  }

  async getVerticalPodAutoscaler(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}verticalpodautoscalers/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscaler(resp);
  }

  async deleteVerticalPodAutoscaler(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}verticalpodautoscalers/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return AutoscalingV1.toVerticalPodAutoscaler(resp);
  }

  async replaceVerticalPodAutoscaler(name: string, body: AutoscalingV1.VerticalPodAutoscaler, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}verticalpodautoscalers/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AutoscalingV1.fromVerticalPodAutoscaler(body),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscaler(resp);
  }

  async patchVerticalPodAutoscaler(name: string, type: c.PatchType, body: AutoscalingV1.VerticalPodAutoscaler | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}verticalpodautoscalers/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AutoscalingV1.fromVerticalPodAutoscaler(body),
      abortSignal: opts.abortSignal,
    });
    return AutoscalingV1.toVerticalPodAutoscaler(resp);
  }

}
