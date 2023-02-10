export * from "./structs.ts";

// Autogenerated API file for AdmissionregistrationV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as AdmissionregistrationV1alpha1 from "./structs.ts";

export class AdmissionregistrationV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/admissionregistration.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  async getValidatingAdmissionPolicyList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}validatingadmissionpolicies`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyList(resp);
  }

  async watchValidatingAdmissionPolicyList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}validatingadmissionpolicies`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AdmissionregistrationV1alpha1.toValidatingAdmissionPolicy, MetaV1.toStatus));
  }

  async createValidatingAdmissionPolicy(body: AdmissionregistrationV1alpha1.ValidatingAdmissionPolicy, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}validatingadmissionpolicies`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AdmissionregistrationV1alpha1.fromValidatingAdmissionPolicy(body),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicy(resp);
  }

  async deleteValidatingAdmissionPolicyList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}validatingadmissionpolicies`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyList(resp);
  }

  async getValidatingAdmissionPolicy(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}validatingadmissionpolicies/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicy(resp);
  }

  async deleteValidatingAdmissionPolicy(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}validatingadmissionpolicies/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicy(resp);
  }

  async replaceValidatingAdmissionPolicy(name: string, body: AdmissionregistrationV1alpha1.ValidatingAdmissionPolicy, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}validatingadmissionpolicies/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AdmissionregistrationV1alpha1.fromValidatingAdmissionPolicy(body),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicy(resp);
  }

  async patchValidatingAdmissionPolicy(name: string, type: c.PatchType, body: AdmissionregistrationV1alpha1.ValidatingAdmissionPolicy | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}validatingadmissionpolicies/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AdmissionregistrationV1alpha1.fromValidatingAdmissionPolicy(body),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicy(resp);
  }

  async getValidatingAdmissionPolicyBindingList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}validatingadmissionpolicybindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBindingList(resp);
  }

  async watchValidatingAdmissionPolicyBindingList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}validatingadmissionpolicybindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBinding, MetaV1.toStatus));
  }

  async createValidatingAdmissionPolicyBinding(body: AdmissionregistrationV1alpha1.ValidatingAdmissionPolicyBinding, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}validatingadmissionpolicybindings`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AdmissionregistrationV1alpha1.fromValidatingAdmissionPolicyBinding(body),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBinding(resp);
  }

  async deleteValidatingAdmissionPolicyBindingList(opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}validatingadmissionpolicybindings`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBindingList(resp);
  }

  async getValidatingAdmissionPolicyBinding(name: string, opts: operations.NoOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}validatingadmissionpolicybindings/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBinding(resp);
  }

  async deleteValidatingAdmissionPolicyBinding(name: string, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}validatingadmissionpolicybindings/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBinding(resp);
  }

  async replaceValidatingAdmissionPolicyBinding(name: string, body: AdmissionregistrationV1alpha1.ValidatingAdmissionPolicyBinding, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}validatingadmissionpolicybindings/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: AdmissionregistrationV1alpha1.fromValidatingAdmissionPolicyBinding(body),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBinding(resp);
  }

  async patchValidatingAdmissionPolicyBinding(name: string, type: c.PatchType, body: AdmissionregistrationV1alpha1.ValidatingAdmissionPolicyBinding | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}validatingadmissionpolicybindings/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : AdmissionregistrationV1alpha1.fromValidatingAdmissionPolicyBinding(body),
      abortSignal: opts.abortSignal,
    });
    return AdmissionregistrationV1alpha1.toValidatingAdmissionPolicyBinding(resp);
  }

}
