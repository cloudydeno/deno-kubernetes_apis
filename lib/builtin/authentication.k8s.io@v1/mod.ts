export * from "./structs.ts";

// Autogenerated API file for AuthenticationV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as AuthenticationV1 from "./structs.ts";

export class AuthenticationV1Api {
  #client: c.RestClient;
  #root = "/apis/authentication.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async createTokenReview(body: AuthenticationV1.TokenReview, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}tokenreviews`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AuthenticationV1.fromTokenReview(body),
      abortSignal: opts.abortSignal,
    });
    return AuthenticationV1.toTokenReview(resp);
  }

}
