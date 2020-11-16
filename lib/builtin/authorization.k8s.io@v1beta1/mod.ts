export * from "./structs.ts";

// Autogenerated API file for AuthorizationV1beta1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as AuthorizationV1beta1 from "./structs.ts";

export class AuthorizationV1beta1Api {
  #client: c.RestClient;
  #root = "/apis/authorization.k8s.io/v1beta1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new AuthorizationV1beta1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new AuthorizationV1beta1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async createSelfSubjectAccessReview(body: AuthorizationV1beta1.SelfSubjectAccessReview, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}selfsubjectaccessreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1beta1.fromSelfSubjectAccessReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1beta1.toSelfSubjectAccessReview(resp);
  }

  async createSelfSubjectRulesReview(body: AuthorizationV1beta1.SelfSubjectRulesReview, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}selfsubjectrulesreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1beta1.fromSelfSubjectRulesReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1beta1.toSelfSubjectRulesReview(resp);
  }

  async createSubjectAccessReview(body: AuthorizationV1beta1.SubjectAccessReview, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}subjectaccessreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1beta1.fromSubjectAccessReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1beta1.toSubjectAccessReview(resp);
  }

}

export class AuthorizationV1beta1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/authorization.k8s.io/v1beta1/namespaces/${namespace}/`;
  }

  async createLocalSubjectAccessReview(body: AuthorizationV1beta1.LocalSubjectAccessReview, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}localsubjectaccessreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1beta1.fromLocalSubjectAccessReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1beta1.toLocalSubjectAccessReview(resp);
  }

}
