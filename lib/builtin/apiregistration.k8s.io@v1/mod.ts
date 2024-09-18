export * from "./structs.ts";

// Autogenerated API file for ApiregistrationV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as ApiregistrationV1 from "./structs.ts";

export class ApiregistrationV1Api {
  #client: c.RestClient;
  #root = "/apis/apiregistration.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getAPIServiceList(opts: operations.GetListOpts = {}): Promise<ApiregistrationV1.APIServiceList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}apiservices`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIServiceList(resp);
  }

  async watchAPIServiceList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<ApiregistrationV1.APIService & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}apiservices`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(ApiregistrationV1.toAPIService, MetaV1.toStatus));
  }

  async createAPIService(body: ApiregistrationV1.APIService, opts: operations.PutOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}apiservices`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ApiregistrationV1.fromAPIService(body),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

  async deleteAPIServiceList(opts: operations.DeleteListOpts = {}): Promise<ApiregistrationV1.APIServiceList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}apiservices`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIServiceList(resp);
  }

  async getAPIService(name: string, opts: operations.NoOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}apiservices/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

  async deleteAPIService(name: string, opts: operations.DeleteOpts = {}): Promise<ApiregistrationV1.APIService | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}apiservices/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return ApiregistrationV1.toAPIService(resp);
  }

  async replaceAPIService(name: string, body: ApiregistrationV1.APIService, opts: operations.PutOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}apiservices/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ApiregistrationV1.fromAPIService(body),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

  async patchAPIService(name: string, type: c.PatchType, body: ApiregistrationV1.APIService | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}apiservices/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ApiregistrationV1.fromAPIService(body),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

  async getAPIServiceStatus(name: string, opts: operations.NoOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}apiservices/${name}/status`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

  async replaceAPIServiceStatus(name: string, body: ApiregistrationV1.APIService, opts: operations.PutOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}apiservices/${name}/status`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: ApiregistrationV1.fromAPIService(body),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

  async patchAPIServiceStatus(name: string, type: c.PatchType, body: ApiregistrationV1.APIService | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<ApiregistrationV1.APIService> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}apiservices/${name}/status`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : ApiregistrationV1.fromAPIService(body),
      abortSignal: opts.abortSignal,
    });
    return ApiregistrationV1.toAPIService(resp);
  }

}
