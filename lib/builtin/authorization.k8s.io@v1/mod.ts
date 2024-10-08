export * from "./structs.ts";

// Autogenerated API file for AuthorizationV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as AuthorizationV1 from "./structs.ts";

export class AuthorizationV1Api {
  #client: c.RestClient;
  #root = "/apis/authorization.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): AuthorizationV1NamespacedApi {
    return new AuthorizationV1NamespacedApi(this.#client, name);
  }
  myNamespace(): AuthorizationV1NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new AuthorizationV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async createSelfSubjectAccessReview(
    body: AuthorizationV1.SelfSubjectAccessReview,
    opts: operations.PutOpts = {},
  ): Promise<AuthorizationV1.SelfSubjectAccessReview> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}selfsubjectaccessreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1.fromSelfSubjectAccessReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1.toSelfSubjectAccessReview(resp);
  }

  async createSelfSubjectRulesReview(
    body: AuthorizationV1.SelfSubjectRulesReview,
    opts: operations.PutOpts = {},
  ): Promise<AuthorizationV1.SelfSubjectRulesReview> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}selfsubjectrulesreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1.fromSelfSubjectRulesReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1.toSelfSubjectRulesReview(resp);
  }

  async createSubjectAccessReview(
    body: AuthorizationV1.SubjectAccessReview,
    opts: operations.PutOpts = {},
  ): Promise<AuthorizationV1.SubjectAccessReview> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}subjectaccessreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1.fromSubjectAccessReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1.toSubjectAccessReview(resp);
  }

}

export class AuthorizationV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/authorization.k8s.io/v1/namespaces/${namespace}/`;
  }

  async createLocalSubjectAccessReview(
    body: AuthorizationV1.LocalSubjectAccessReview,
    opts: operations.PutOpts = {},
  ): Promise<AuthorizationV1.LocalSubjectAccessReview> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}localsubjectaccessreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthorizationV1.fromLocalSubjectAccessReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthorizationV1.toLocalSubjectAccessReview(resp);
  }

}
