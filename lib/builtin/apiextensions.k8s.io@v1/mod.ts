export * from "./structs.ts";

// Autogenerated API file for ApiextensionsV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as ApiextensionsV1 from "./structs.ts";

export class ApiextensionsV1Api {
  #client: c.RestClient;
  #root = "/apis/apiextensions.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getCustomResourceDefinitionList(
    opts: operations.GetListOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinitionList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}customresourcedefinitions`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinitionList(resp);
  }

  async watchCustomResourceDefinitionList(
    opts: operations.WatchListOpts = {},
  ): Promise<ReadableStream<c.WatchEvent<ApiextensionsV1.CustomResourceDefinition & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}customresourcedefinitions`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ApiextensionsV1.toCustomResourceDefinition, MetaV1.toStatus));
  }

  async createCustomResourceDefinition(
    body: ApiextensionsV1.CustomResourceDefinition,
    opts: operations.PutOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}customresourcedefinitions`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ApiextensionsV1.fromCustomResourceDefinition(body),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async deleteCustomResourceDefinitionList(
    opts: operations.DeleteListOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinitionList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}customresourcedefinitions`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinitionList(resp);
  }

  async getCustomResourceDefinition(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}customresourcedefinitions/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async deleteCustomResourceDefinition(
    name: string,
    opts: operations.DeleteOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}customresourcedefinitions/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async replaceCustomResourceDefinition(
    name: string,
    body: ApiextensionsV1.CustomResourceDefinition,
    opts: operations.PutOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}customresourcedefinitions/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ApiextensionsV1.fromCustomResourceDefinition(body),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async patchCustomResourceDefinition(
    name: string,
    type: c.PatchType,
    body: ApiextensionsV1.CustomResourceDefinition | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}customresourcedefinitions/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ApiextensionsV1.fromCustomResourceDefinition(body),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async getCustomResourceDefinitionStatus(
    name: string,
    opts: operations.NoOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}customresourcedefinitions/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async replaceCustomResourceDefinitionStatus(
    name: string,
    body: ApiextensionsV1.CustomResourceDefinition,
    opts: operations.PutOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}customresourcedefinitions/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ApiextensionsV1.fromCustomResourceDefinition(body),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

  async patchCustomResourceDefinitionStatus(
    name: string,
    type: c.PatchType,
    body: ApiextensionsV1.CustomResourceDefinition | c.JsonPatch,
    opts: operations.PatchOpts = {},
  ): Promise<ApiextensionsV1.CustomResourceDefinition> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}customresourcedefinitions/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ApiextensionsV1.fromCustomResourceDefinition(body),
      abortSignal: opts.abortSignal,
    });
    return ApiextensionsV1.toCustomResourceDefinition(resp);
  }

}
