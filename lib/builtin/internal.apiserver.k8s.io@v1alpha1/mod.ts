export * from "./structs.ts";

// Autogenerated API file for InternalApiserverV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as InternalApiserverV1alpha1 from "./structs.ts";

export class InternalApiserverV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/internal.apiserver.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getStorageVersionList(opts: operations.GetListOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersionList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversions`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersionList(resp);
  }

  async watchStorageVersionList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<InternalApiserverV1alpha1.StorageVersion & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversions`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(InternalApiserverV1alpha1.toStorageVersion, MetaV1.toStatus));
  }

  async createStorageVersion(body: InternalApiserverV1alpha1.StorageVersion, opts: operations.PutOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}storageversions`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: InternalApiserverV1alpha1.fromStorageVersion(body),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async deleteStorageVersionList(opts: operations.DeleteListOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersionList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}storageversions`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersionList(resp);
  }

  async getStorageVersion(name: string, opts: operations.NoOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversions/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async deleteStorageVersion(name: string, opts: operations.DeleteOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}storageversions/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async replaceStorageVersion(name: string, body: InternalApiserverV1alpha1.StorageVersion, opts: operations.PutOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}storageversions/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: InternalApiserverV1alpha1.fromStorageVersion(body),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async patchStorageVersion(name: string, type: c.PatchType, body: InternalApiserverV1alpha1.StorageVersion | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}storageversions/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : InternalApiserverV1alpha1.fromStorageVersion(body),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async getStorageVersionStatus(name: string, opts: operations.NoOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversions/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async replaceStorageVersionStatus(name: string, body: InternalApiserverV1alpha1.StorageVersion, opts: operations.PutOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}storageversions/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: InternalApiserverV1alpha1.fromStorageVersion(body),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

  async patchStorageVersionStatus(name: string, type: c.PatchType, body: InternalApiserverV1alpha1.StorageVersion | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<InternalApiserverV1alpha1.StorageVersion> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}storageversions/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : InternalApiserverV1alpha1.fromStorageVersion(body),
      abortSignal: opts.abortSignal,
    });
    return InternalApiserverV1alpha1.toStorageVersion(resp);
  }

}
