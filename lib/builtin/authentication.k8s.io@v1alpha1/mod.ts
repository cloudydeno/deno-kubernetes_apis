export * from "./structs.ts";

// Autogenerated API file for AuthenticationV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as AuthenticationV1alpha1 from "./structs.ts";

export class AuthenticationV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/authentication.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async createSelfSubjectReview(
    body: AuthenticationV1alpha1.SelfSubjectReview,
    opts: operations.PutOpts = {},
  ): Promise<AuthenticationV1alpha1.SelfSubjectReview> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}selfsubjectreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthenticationV1alpha1.fromSelfSubjectReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthenticationV1alpha1.toSelfSubjectReview(resp);
  }

}
