export * from "./structs.ts";

// Autogenerated API file for RbacAuthorizationV1alpha1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as RbacAuthorizationV1alpha1 from "./structs.ts";

export class RbacAuthorizationV1alpha1Api {
  #client: c.RestClient;
  #root = "/apis/rbac.authorization.k8s.io/v1alpha1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string) {
    return new RbacAuthorizationV1alpha1NamespacedApi(this.#client, name);
  }
  myNamespace() {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new RbacAuthorizationV1alpha1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getClusterRoleBindingList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBindingList(resp);
  }

  async watchClusterRoleBindingList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1alpha1.toClusterRoleBinding, MetaV1.toStatus));
  }

  async createClusterRoleBinding(body: RbacAuthorizationV1alpha1.ClusterRoleBinding, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromClusterRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBinding(resp);
  }

  async deleteClusterRoleBindingList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBindingList(resp);
  }

  async getClusterRoleBinding(name: string, opts: {
    abortSignal?: AbortSignal;
  } = {}) {
    const query = new URLSearchParams;
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: query,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBinding(resp);
  }

  async deleteClusterRoleBinding(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBinding(resp);
  }

  async replaceClusterRoleBinding(name: string, body: RbacAuthorizationV1alpha1.ClusterRoleBinding, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromClusterRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBinding(resp);
  }

  async patchClusterRoleBinding(name: string, type: c.PatchType, body: RbacAuthorizationV1alpha1.ClusterRoleBinding | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1alpha1.fromClusterRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleBinding(resp);
  }

  async getClusterRoleList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleList(resp);
  }

  async watchClusterRoleList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1alpha1.toClusterRole, MetaV1.toStatus));
  }

  async createClusterRole(body: RbacAuthorizationV1alpha1.ClusterRole, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromClusterRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRole(resp);
  }

  async deleteClusterRoleList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRoleList(resp);
  }

  async getClusterRole(name: string, opts: {
    abortSignal?: AbortSignal;
  } = {}) {
    const query = new URLSearchParams;
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: query,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRole(resp);
  }

  async deleteClusterRole(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRole(resp);
  }

  async replaceClusterRole(name: string, body: RbacAuthorizationV1alpha1.ClusterRole, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromClusterRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRole(resp);
  }

  async patchClusterRole(name: string, type: c.PatchType, body: RbacAuthorizationV1alpha1.ClusterRole | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1alpha1.fromClusterRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toClusterRole(resp);
  }

  async getRoleBindingListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBindingList(resp);
  }

  async watchRoleBindingListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1alpha1.toRoleBinding, MetaV1.toStatus));
  }

  async getRoleListForAllNamespaces(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleList(resp);
  }

  async watchRoleListForAllNamespaces(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1alpha1.toRole, MetaV1.toStatus));
  }

}

export class RbacAuthorizationV1alpha1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/rbac.authorization.k8s.io/v1alpha1/namespaces/${namespace}/`;
  }

  async getRoleBindingList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBindingList(resp);
  }

  async watchRoleBindingList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1alpha1.toRoleBinding, MetaV1.toStatus));
  }

  async createRoleBinding(body: RbacAuthorizationV1alpha1.RoleBinding, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBinding(resp);
  }

  async deleteRoleBindingList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBindingList(resp);
  }

  async getRoleBinding(name: string, opts: {
    abortSignal?: AbortSignal;
  } = {}) {
    const query = new URLSearchParams;
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: query,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBinding(resp);
  }

  async deleteRoleBinding(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBinding(resp);
  }

  async replaceRoleBinding(name: string, body: RbacAuthorizationV1alpha1.RoleBinding, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBinding(resp);
  }

  async patchRoleBinding(name: string, type: c.PatchType, body: RbacAuthorizationV1alpha1.RoleBinding | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1alpha1.fromRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleBinding(resp);
  }

  async getRoleList(opts: operations.GetListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleList(resp);
  }

  async watchRoleList(opts: operations.WatchListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1alpha1.toRole, MetaV1.toStatus));
  }

  async createRole(body: RbacAuthorizationV1alpha1.Role, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRole(resp);
  }

  async deleteRoleList(body: MetaV1.DeleteOptions, opts: operations.DeleteListOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRoleList(resp);
  }

  async getRole(name: string, opts: {
    abortSignal?: AbortSignal;
  } = {}) {
    const query = new URLSearchParams;
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: query,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRole(resp);
  }

  async deleteRole(name: string, body: MetaV1.DeleteOptions, opts: operations.DeleteOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      bodyJson: MetaV1.fromDeleteOptions(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRole(resp);
  }

  async replaceRole(name: string, body: RbacAuthorizationV1alpha1.Role, opts: operations.PutOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1alpha1.fromRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRole(resp);
  }

  async patchRole(name: string, type: c.PatchType, body: RbacAuthorizationV1alpha1.Role | c.JsonPatch, opts: operations.PatchOpts = {}) {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1alpha1.fromRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1alpha1.toRole(resp);
  }

}