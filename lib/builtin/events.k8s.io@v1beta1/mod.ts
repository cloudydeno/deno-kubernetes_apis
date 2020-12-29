export * from "./structs.ts";

// Autogenerated API file for EventsV1beta1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as EventsV1beta1 from "./structs.ts";

export class EventsV1beta1Api {
  #client: c.RestClient;
  #root = "/apis/events.k8s.io/v1beta1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new EventsV1beta1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new EventsV1beta1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getEventListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEventList(resp);
  }

  async watchEventListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(EventsV1beta1.toEvent, MetaV1.toStatus));
  }

}

export class EventsV1beta1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/events.k8s.io/v1beta1/namespaces/${namespace}/`;
  }

  async getEventList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEventList(resp);
  }

  async watchEventList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(EventsV1beta1.toEvent, MetaV1.toStatus));
  }

  async createEvent(body: EventsV1beta1.Event, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: EventsV1beta1.fromEvent(body),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEvent(resp);
  }

  async deleteEventList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEventList(resp);
  }

  async getEvent(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEvent(resp);
  }

  async deleteEvent(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return MetaV1.toStatus(resp);
  }

  async replaceEvent(name: string, body: EventsV1beta1.Event, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: EventsV1beta1.fromEvent(body),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEvent(resp);
  }

  async patchEvent(name: string, type: c.PatchType, body: EventsV1beta1.Event | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : EventsV1beta1.fromEvent(body),
      abortSignal: opts.abortSignal,
    });
    return EventsV1beta1.toEvent(resp);
  }

}
