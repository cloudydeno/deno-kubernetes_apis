export * from "./structs.ts";

// Autogenerated API file for StorageV1beta1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as StorageV1beta1 from "./structs.ts";

export class StorageV1beta1Api {
  #client: c.RestClient;
  #root = "/apis/storage.k8s.io/v1beta1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getCSIDriverList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}csidrivers`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriverList(resp);
  }

  async watchCSIDriverList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}csidrivers`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(StorageV1beta1.toCSIDriver, MetaV1.toStatus));
  }

  async createCSIDriver(body: StorageV1beta1.CSIDriver, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}csidrivers`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromCSIDriver(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriver(resp);
  }

  async deleteCSIDriverList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}csidrivers`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriverList(resp);
  }

  async getCSIDriver(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}csidrivers/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriver(resp);
  }

  async deleteCSIDriver(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}csidrivers/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriver(resp);
  }

  async replaceCSIDriver(name: string, body: StorageV1beta1.CSIDriver, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}csidrivers/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromCSIDriver(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriver(resp);
  }

  async patchCSIDriver(name: string, body: MetaV1.Patch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}csidrivers/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      bodyJson: MetaV1.fromPatch(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSIDriver(resp);
  }

  async getCSINodeList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}csinodes`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINodeList(resp);
  }

  async watchCSINodeList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}csinodes`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(StorageV1beta1.toCSINode, MetaV1.toStatus));
  }

  async createCSINode(body: StorageV1beta1.CSINode, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}csinodes`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromCSINode(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINode(resp);
  }

  async deleteCSINodeList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}csinodes`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINodeList(resp);
  }

  async getCSINode(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}csinodes/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINode(resp);
  }

  async deleteCSINode(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}csinodes/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINode(resp);
  }

  async replaceCSINode(name: string, body: StorageV1beta1.CSINode, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}csinodes/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromCSINode(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINode(resp);
  }

  async patchCSINode(name: string, body: MetaV1.Patch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}csinodes/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      bodyJson: MetaV1.fromPatch(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toCSINode(resp);
  }

  async getStorageClassList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageclasses`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClassList(resp);
  }

  async watchStorageClassList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageclasses`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(StorageV1beta1.toStorageClass, MetaV1.toStatus));
  }

  async createStorageClass(body: StorageV1beta1.StorageClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}storageclasses`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromStorageClass(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClass(resp);
  }

  async deleteStorageClassList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}storageclasses`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClassList(resp);
  }

  async getStorageClass(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageclasses/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClass(resp);
  }

  async deleteStorageClass(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}storageclasses/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClass(resp);
  }

  async replaceStorageClass(name: string, body: StorageV1beta1.StorageClass, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}storageclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromStorageClass(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClass(resp);
  }

  async patchStorageClass(name: string, body: MetaV1.Patch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}storageclasses/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      bodyJson: MetaV1.fromPatch(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toStorageClass(resp);
  }

  async getVolumeAttachmentList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}volumeattachments`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toVolumeAttachmentList(resp);
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
    return resp.pipeThrough(new c.WatchEventTransformer(StorageV1beta1.toVolumeAttachment, MetaV1.toStatus));
  }

  async createVolumeAttachment(body: StorageV1beta1.VolumeAttachment, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}volumeattachments`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromVolumeAttachment(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toVolumeAttachment(resp);
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
    return StorageV1beta1.toVolumeAttachmentList(resp);
  }

  async getVolumeAttachment(name: string, opts: operations.GetOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatGetOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toVolumeAttachment(resp);
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
    return StorageV1beta1.toVolumeAttachment(resp);
  }

  async replaceVolumeAttachment(name: string, body: StorageV1beta1.VolumeAttachment, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StorageV1beta1.fromVolumeAttachment(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toVolumeAttachment(resp);
  }

  async patchVolumeAttachment(name: string, body: MetaV1.Patch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}volumeattachments/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      bodyJson: MetaV1.fromPatch(body),
      abortSignal: opts.abortSignal,
    });
    return StorageV1beta1.toVolumeAttachment(resp);
  }

}
