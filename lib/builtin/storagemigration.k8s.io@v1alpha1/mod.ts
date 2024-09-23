export * from "./structs.ts";

// Autogenerated API file for StoragemigrationV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as StoragemigrationV1alpha1 from "./structs.ts";

export class StoragemigrationV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/storagemigration.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getStorageVersionMigrationList(
    opts: operations.GetListOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigrationList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversionmigrations`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigrationList(resp);
  }

  async watchStorageVersionMigrationList(
    opts: operations.WatchListOpts = {},
  ): Promise<c.WatchEventStream<StoragemigrationV1alpha1.StorageVersionMigration>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversionmigrations`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(StoragemigrationV1alpha1.toStorageVersionMigration, MetaV1.toStatus));
  }

  async createStorageVersionMigration(
    body: StoragemigrationV1alpha1.StorageVersionMigration,
    opts: operations.PutOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}storageversionmigrations`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StoragemigrationV1alpha1.fromStorageVersionMigration(body),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async deleteStorageVersionMigrationList(
    opts: operations.DeleteListOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigrationList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}storageversionmigrations`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigrationList(resp);
  }

  async getStorageVersionMigration(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversionmigrations/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async deleteStorageVersionMigration(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}storageversionmigrations/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async replaceStorageVersionMigration(
    name: string,
    body: StoragemigrationV1alpha1.StorageVersionMigration,
    opts: operations.PutOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}storageversionmigrations/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StoragemigrationV1alpha1.fromStorageVersionMigration(body),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async patchStorageVersionMigration(
    name: string,
    type: c.PatchType,
    body: StoragemigrationV1alpha1.StorageVersionMigration | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}storageversionmigrations/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : StoragemigrationV1alpha1.fromStorageVersionMigration(body),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async getStorageVersionMigrationStatus(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}storageversionmigrations/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async replaceStorageVersionMigrationStatus(
    name: string,
    body: StoragemigrationV1alpha1.StorageVersionMigration,
    opts: operations.PutOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}storageversionmigrations/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: StoragemigrationV1alpha1.fromStorageVersionMigration(body),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

  async patchStorageVersionMigrationStatus(
    name: string,
    type: c.PatchType,
    body: StoragemigrationV1alpha1.StorageVersionMigration | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<StoragemigrationV1alpha1.StorageVersionMigration> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}storageversionmigrations/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : StoragemigrationV1alpha1.fromStorageVersionMigration(body),
      abortSignal: opts.abortSignal,
    });
    return StoragemigrationV1alpha1.toStorageVersionMigration(resp);
  }

}
