export * from "./structs.ts";

// Autogenerated API file for CertificatesV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as CertificatesV1alpha1 from "./structs.ts";

export class CertificatesV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/certificates.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getClusterTrustBundleList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clustertrustbundles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return CertificatesV1alpha1.toClusterTrustBundleList(resp);
  }

  async watchClusterTrustBundleList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clustertrustbundles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(CertificatesV1alpha1.toClusterTrustBundle, MetaV1.toStatus));
  }

  async createClusterTrustBundle(body: CertificatesV1alpha1.ClusterTrustBundle, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}clustertrustbundles`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: CertificatesV1alpha1.fromClusterTrustBundle(body),
      abortSignal: opts.abortSignal,
    });
    return CertificatesV1alpha1.toClusterTrustBundle(resp);
  }

  async deleteClusterTrustBundleList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clustertrustbundles`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return CertificatesV1alpha1.toClusterTrustBundleList(resp);
  }

  async getClusterTrustBundle(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clustertrustbundles/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return CertificatesV1alpha1.toClusterTrustBundle(resp);
  }

  async deleteClusterTrustBundle(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clustertrustbundles/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return CertificatesV1alpha1.toClusterTrustBundle(resp);
  }

  async replaceClusterTrustBundle(name: string, body: CertificatesV1alpha1.ClusterTrustBundle, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}clustertrustbundles/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: CertificatesV1alpha1.fromClusterTrustBundle(body),
      abortSignal: opts.abortSignal,
    });
    return CertificatesV1alpha1.toClusterTrustBundle(resp);
  }

  async patchClusterTrustBundle(name: string, type: c.PatchType, body: CertificatesV1alpha1.ClusterTrustBundle | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}clustertrustbundles/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : CertificatesV1alpha1.fromClusterTrustBundle(body),
      abortSignal: opts.abortSignal,
    });
    return CertificatesV1alpha1.toClusterTrustBundle(resp);
  }

}