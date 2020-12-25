export * from "./structs.ts";

// Autogenerated API file for StorageV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as StorageV1alpha1 from "./structs.ts";

export class StorageV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/storage.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getVolumeAttachmentList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}volumeattachments`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachmentList(resp);
  }

  async watchVolumeAttachmentList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}volumeattachments`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(StorageV1alpha1.toVolumeAttachment, MetaV1.toStatus));
  }

  async createVolumeAttachment(body: StorageV1alpha1.VolumeAttachment, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}volumeattachments`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1alpha1.fromVolumeAttachment(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachment(resp);
  }

  async deleteVolumeAttachmentList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}volumeattachments`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachmentList(resp);
  }

  async getVolumeAttachment(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachment(resp);
  }

  async deleteVolumeAttachment(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachment(resp);
  }

  async replaceVolumeAttachment(name: string, body: StorageV1alpha1.VolumeAttachment, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1alpha1.fromVolumeAttachment(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachment(resp);
  }

  async patchVolumeAttachment(name: string, type: c.PatchType, body: StorageV1alpha1.VolumeAttachment | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : StorageV1alpha1.fromVolumeAttachment(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1alpha1.toVolumeAttachment(resp);
  }

}
