export * from "./structs.ts";

// Autogenerated API file for EventsV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as EventsV1 from "./structs.ts";

export class EventsV1Api {
  #client: c.RestClient;
  #root = "/apis/events.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): EventsV1NamespacedApi {
    return new EventsV1NamespacedApi(this.#client, name);
  }
  myNamespace(): EventsV1NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new EventsV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getEventListForAllNamespaces(
    opts: operations.GetListOpts = {},
  ): Promise<EventsV1.EventList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEventList(resp);
  }

  async watchEventListForAllNamespaces(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<EventsV1.Event>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(EventsV1.toEvent, MetaV1.toStatus));
  }

}

export class EventsV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/events.k8s.io/v1/namespaces/${namespace}/`;
  }

  async getEventList(
    opts: operations.GetListOpts = {},
  ): Promise<EventsV1.EventList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEventList(resp);
  }

  async watchEventList(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<EventsV1.Event>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(EventsV1.toEvent, MetaV1.toStatus));
  }

  async createEvent(
    body: EventsV1.Event,
    opts: operations.PutOpts = {},
  ): Promise<EventsV1.Event> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: EventsV1.fromEvent(body),
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEvent(resp);
  }

  async deleteEventList(
    opts: operations.DeleteListOpts = {},
  ): Promise<EventsV1.EventList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}events`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEventList(resp);
  }

  async getEvent(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<EventsV1.Event> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEvent(resp);
  }

  async deleteEvent(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<EventsV1.Event | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return EventsV1.toEvent(resp);
  }

  async replaceEvent(
    name: string,
    body: EventsV1.Event,
    opts: operations.PutOpts = {},
  ): Promise<EventsV1.Event> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: EventsV1.fromEvent(body),
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEvent(resp);
  }

  async patchEvent(
    name: string,
    type: c.PatchType,
    body: EventsV1.Event | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<EventsV1.Event> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}events/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : EventsV1.fromEvent(body),
      abortSignal: opts.abortSignal,
    });
    return EventsV1.toEvent(resp);
  }

}
