export * from "./structs.ts";

// Autogenerated API file for ResourceV1alpha2
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as ResourceV1alpha2 from "./structs.ts";

export class ResourceV1alpha2Api {
  #client: c.RestClient;
  #root = "/apis/resource.k8s.io/v1alpha2/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): ResourceV1alpha2NamespacedApi {
    return new ResourceV1alpha2NamespacedApi(this.#client, name);
  }
  myNamespace(): ResourceV1alpha2NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new ResourceV1alpha2NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getPodSchedulingContextListForAllNamespaces(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContextList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}podschedulingcontexts`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContextList(resp);
  }

  async watchPodSchedulingContextListForAllNamespaces(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.PodSchedulingContext & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}podschedulingcontexts`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toPodSchedulingContext, MetaV1.toStatus));
  }

  async getResourceClaimListForAllNamespaces(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.ResourceClaimList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaims`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimList(resp);
  }

  async watchResourceClaimListForAllNamespaces(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.ResourceClaim & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaims`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toResourceClaim, MetaV1.toStatus));
  }

  async getResourceClaimTemplateListForAllNamespaces(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplateList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaimtemplates`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplateList(resp);
  }

  async watchResourceClaimTemplateListForAllNamespaces(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.ResourceClaimTemplate & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaimtemplates`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toResourceClaimTemplate, MetaV1.toStatus));
  }

  async getResourceClassList(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.ResourceClassList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclasses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClassList(resp);
  }

  async watchResourceClassList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.ResourceClass & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclasses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toResourceClass, MetaV1.toStatus));
  }

  async createResourceClass(body: ResourceV1alpha2.ResourceClass, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClass> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}resourceclasses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClass(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClass(resp);
  }

  async deleteResourceClassList(opts: operations.DeleteListOpts = {}): Promise<ResourceV1alpha2.ResourceClassList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}resourceclasses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClassList(resp);
  }

  async getResourceClass(name: string, opts: operations.NoOpts = {}): Promise<ResourceV1alpha2.ResourceClass> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclasses/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClass(resp);
  }

  async deleteResourceClass(name: string, opts: operations.DeleteOpts = {}): Promise<ResourceV1alpha2.ResourceClass | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}resourceclasses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ResourceV1alpha2.toResourceClass(resp);
  }

  async replaceResourceClass(name: string, body: ResourceV1alpha2.ResourceClass, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClass> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}resourceclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClass(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClass(resp);
  }

  async patchResourceClass(name: string, type: c.PatchType, body: ResourceV1alpha2.ResourceClass | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ResourceV1alpha2.ResourceClass> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}resourceclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ResourceV1alpha2.fromResourceClass(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClass(resp);
  }

}

export class ResourceV1alpha2NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/resource.k8s.io/v1alpha2/namespaces/${namespace}/`;
  }

  async getPodSchedulingContextList(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContextList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}podschedulingcontexts`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContextList(resp);
  }

  async watchPodSchedulingContextList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.PodSchedulingContext & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}podschedulingcontexts`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toPodSchedulingContext, MetaV1.toStatus));
  }

  async createPodSchedulingContext(body: ResourceV1alpha2.PodSchedulingContext, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}podschedulingcontexts`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromPodSchedulingContext(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async deletePodSchedulingContextList(opts: operations.DeleteListOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContextList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}podschedulingcontexts`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContextList(resp);
  }

  async getPodSchedulingContext(name: string, opts: operations.NoOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}podschedulingcontexts/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async deletePodSchedulingContext(name: string, opts: operations.DeleteOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}podschedulingcontexts/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async replacePodSchedulingContext(name: string, body: ResourceV1alpha2.PodSchedulingContext, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}podschedulingcontexts/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromPodSchedulingContext(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async patchPodSchedulingContext(name: string, type: c.PatchType, body: ResourceV1alpha2.PodSchedulingContext | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}podschedulingcontexts/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ResourceV1alpha2.fromPodSchedulingContext(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async getPodSchedulingContextStatus(name: string, opts: operations.NoOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}podschedulingcontexts/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async replacePodSchedulingContextStatus(name: string, body: ResourceV1alpha2.PodSchedulingContext, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}podschedulingcontexts/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromPodSchedulingContext(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async patchPodSchedulingContextStatus(name: string, type: c.PatchType, body: ResourceV1alpha2.PodSchedulingContext | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ResourceV1alpha2.PodSchedulingContext> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}podschedulingcontexts/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ResourceV1alpha2.fromPodSchedulingContext(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toPodSchedulingContext(resp);
  }

  async getResourceClaimList(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.ResourceClaimList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaims`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimList(resp);
  }

  async watchResourceClaimList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.ResourceClaim & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaims`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toResourceClaim, MetaV1.toStatus));
  }

  async createResourceClaim(body: ResourceV1alpha2.ResourceClaim, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}resourceclaims`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClaim(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async deleteResourceClaimList(opts: operations.DeleteListOpts = {}): Promise<ResourceV1alpha2.ResourceClaimList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}resourceclaims`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimList(resp);
  }

  async getResourceClaim(name: string, opts: operations.NoOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaims/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async deleteResourceClaim(name: string, opts: operations.DeleteOpts = {}): Promise<ResourceV1alpha2.ResourceClaim | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}resourceclaims/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async replaceResourceClaim(name: string, body: ResourceV1alpha2.ResourceClaim, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}resourceclaims/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClaim(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async patchResourceClaim(name: string, type: c.PatchType, body: ResourceV1alpha2.ResourceClaim | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}resourceclaims/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ResourceV1alpha2.fromResourceClaim(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async getResourceClaimStatus(name: string, opts: operations.NoOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaims/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async replaceResourceClaimStatus(name: string, body: ResourceV1alpha2.ResourceClaim, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}resourceclaims/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClaim(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async patchResourceClaimStatus(name: string, type: c.PatchType, body: ResourceV1alpha2.ResourceClaim | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ResourceV1alpha2.ResourceClaim> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}resourceclaims/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ResourceV1alpha2.fromResourceClaim(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaim(resp);
  }

  async getResourceClaimTemplateList(opts: operations.GetListOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplateList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaimtemplates`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplateList(resp);
  }

  async watchResourceClaimTemplateList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ResourceV1alpha2.ResourceClaimTemplate & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaimtemplates`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ResourceV1alpha2.toResourceClaimTemplate, MetaV1.toStatus));
  }

  async createResourceClaimTemplate(body: ResourceV1alpha2.ResourceClaimTemplate, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplate> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}resourceclaimtemplates`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClaimTemplate(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplate(resp);
  }

  async deleteResourceClaimTemplateList(opts: operations.DeleteListOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplateList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}resourceclaimtemplates`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplateList(resp);
  }

  async getResourceClaimTemplate(name: string, opts: operations.NoOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplate> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}resourceclaimtemplates/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplate(resp);
  }

  async deleteResourceClaimTemplate(name: string, opts: operations.DeleteOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplate | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}resourceclaimtemplates/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ResourceV1alpha2.toResourceClaimTemplate(resp);
  }

  async replaceResourceClaimTemplate(name: string, body: ResourceV1alpha2.ResourceClaimTemplate, opts: operations.PutOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplate> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}resourceclaimtemplates/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ResourceV1alpha2.fromResourceClaimTemplate(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplate(resp);
  }

  async patchResourceClaimTemplate(name: string, type: c.PatchType, body: ResourceV1alpha2.ResourceClaimTemplate | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ResourceV1alpha2.ResourceClaimTemplate> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}resourceclaimtemplates/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ResourceV1alpha2.fromResourceClaimTemplate(body),
      abortSignal: opts.abortSignal,
    });
    return ResourceV1alpha2.toResourceClaimTemplate(resp);
  }

}
