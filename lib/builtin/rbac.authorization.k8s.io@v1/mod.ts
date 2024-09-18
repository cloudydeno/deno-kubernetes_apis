export * from "./structs.ts";

// Autogenerated API file for RbacAuthorizationV1
import * as c from "../../common.ts";
import * as operations from "../../operations.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
import * as RbacAuthorizationV1 from "./structs.ts";

export class RbacAuthorizationV1Api {
  #client: c.RestClient;
  #root = "/apis/rbac.authorization.k8s.io/v1/";
  constructor(client: c.RestClient) {
    this.#client = client;
  }

  namespace(name: string): RbacAuthorizationV1NamespacedApi {
    return new RbacAuthorizationV1NamespacedApi(this.#client, name);
  }
  myNamespace(): RbacAuthorizationV1NamespacedApi {
    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");
    return new RbacAuthorizationV1NamespacedApi(this.#client, this.#client.defaultNamespace);
  }

  async getClusterRoleBindingList(opts: operations.GetListOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBindingList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleBindingList(resp);
  }

  async watchClusterRoleBindingList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<RbacAuthorizationV1.ClusterRoleBinding & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1.toClusterRoleBinding, MetaV1.toStatus));
  }

  async createClusterRoleBinding(body: RbacAuthorizationV1.ClusterRoleBinding, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBinding> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromClusterRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleBinding(resp);
  }

  async deleteClusterRoleBindingList(opts: operations.DeleteListOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBindingList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterrolebindings`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleBindingList(resp);
  }

  async getClusterRoleBinding(name: string, opts: operations.NoOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBinding> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleBinding(resp);
  }

  async deleteClusterRoleBinding(name: string, opts: operations.DeleteOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBinding | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return RbacAuthorizationV1.toClusterRoleBinding(resp);
  }

  async replaceClusterRoleBinding(name: string, body: RbacAuthorizationV1.ClusterRoleBinding, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBinding> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromClusterRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleBinding(resp);
  }

  async patchClusterRoleBinding(name: string, type: c.PatchType, body: RbacAuthorizationV1.ClusterRoleBinding | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleBinding> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}clusterrolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1.fromClusterRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleBinding(resp);
  }

  async getClusterRoleList(opts: operations.GetListOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleList(resp);
  }

  async watchClusterRoleList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<RbacAuthorizationV1.ClusterRole & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1.toClusterRole, MetaV1.toStatus));
  }

  async createClusterRole(body: RbacAuthorizationV1.ClusterRole, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.ClusterRole> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromClusterRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRole(resp);
  }

  async deleteClusterRoleList(opts: operations.DeleteListOpts = {}): Promise<RbacAuthorizationV1.ClusterRoleList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterroles`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRoleList(resp);
  }

  async getClusterRole(name: string, opts: operations.NoOpts = {}): Promise<RbacAuthorizationV1.ClusterRole> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRole(resp);
  }

  async deleteClusterRole(name: string, opts: operations.DeleteOpts = {}): Promise<RbacAuthorizationV1.ClusterRole | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return RbacAuthorizationV1.toClusterRole(resp);
  }

  async replaceClusterRole(name: string, body: RbacAuthorizationV1.ClusterRole, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.ClusterRole> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromClusterRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRole(resp);
  }

  async patchClusterRole(name: string, type: c.PatchType, body: RbacAuthorizationV1.ClusterRole | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<RbacAuthorizationV1.ClusterRole> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}clusterroles/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1.fromClusterRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toClusterRole(resp);
  }

  async getRoleBindingListForAllNamespaces(opts: operations.GetListOpts = {}): Promise<RbacAuthorizationV1.RoleBindingList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBindingList(resp);
  }

  async watchRoleBindingListForAllNamespaces(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<RbacAuthorizationV1.RoleBinding & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1.toRoleBinding, MetaV1.toStatus));
  }

  async getRoleListForAllNamespaces(opts: operations.GetListOpts = {}): Promise<RbacAuthorizationV1.RoleList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleList(resp);
  }

  async watchRoleListForAllNamespaces(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<RbacAuthorizationV1.Role & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1.toRole, MetaV1.toStatus));
  }

}

export class RbacAuthorizationV1NamespacedApi {
  #client: c.RestClient
  #root: string
  constructor(client: c.RestClient, namespace: string) {
    this.#client = client;
    this.#root = `/apis/rbac.authorization.k8s.io/v1/namespaces/${namespace}/`;
  }

  async getRoleBindingList(opts: operations.GetListOpts = {}): Promise<RbacAuthorizationV1.RoleBindingList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBindingList(resp);
  }

  async watchRoleBindingList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<RbacAuthorizationV1.RoleBinding & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1.toRoleBinding, MetaV1.toStatus));
  }

  async createRoleBinding(body: RbacAuthorizationV1.RoleBinding, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.RoleBinding> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBinding(resp);
  }

  async deleteRoleBindingList(opts: operations.DeleteListOpts = {}): Promise<RbacAuthorizationV1.RoleBindingList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}rolebindings`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBindingList(resp);
  }

  async getRoleBinding(name: string, opts: operations.NoOpts = {}): Promise<RbacAuthorizationV1.RoleBinding> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBinding(resp);
  }

  async deleteRoleBinding(name: string, opts: operations.DeleteOpts = {}): Promise<RbacAuthorizationV1.RoleBinding | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return RbacAuthorizationV1.toRoleBinding(resp);
  }

  async replaceRoleBinding(name: string, body: RbacAuthorizationV1.RoleBinding, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.RoleBinding> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBinding(resp);
  }

  async patchRoleBinding(name: string, type: c.PatchType, body: RbacAuthorizationV1.RoleBinding | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<RbacAuthorizationV1.RoleBinding> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}rolebindings/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1.fromRoleBinding(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleBinding(resp);
  }

  async getRoleList(opts: operations.GetListOpts = {}): Promise<RbacAuthorizationV1.RoleList> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatGetListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleList(resp);
  }

  async watchRoleList(opts: operations.WatchListOpts = {}): Promise<ReadableStream<c.WatchEvent<RbacAuthorizationV1.Role & c.ApiKind, MetaV1.Status & c.ApiKind>>> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles`,
      expectJson: true,
      expectStream: true,
      querystring: operations.formatWatchListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return resp.pipeThrough(new c.WatchEventTransformer(RbacAuthorizationV1.toRole, MetaV1.toStatus));
  }

  async createRole(body: RbacAuthorizationV1.Role, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.Role> {
    const resp = await this.#client.performRequest({
      method: "POST",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRole(resp);
  }

  async deleteRoleList(opts: operations.DeleteListOpts = {}): Promise<RbacAuthorizationV1.RoleList> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}roles`,
      expectJson: true,
      querystring: operations.formatDeleteListOpts(opts),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRoleList(resp);
  }

  async getRole(name: string, opts: operations.NoOpts = {}): Promise<RbacAuthorizationV1.Role> {
    const resp = await this.#client.performRequest({
      method: "GET",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRole(resp);
  }

  async deleteRole(name: string, opts: operations.DeleteOpts = {}): Promise<RbacAuthorizationV1.Role | MetaV1.Status> {
    const resp = await this.#client.performRequest({
      method: "DELETE",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: operations.formatDeleteOpts(opts),
      abortSignal: opts.abortSignal,
    });
    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);
    return RbacAuthorizationV1.toRole(resp);
  }

  async replaceRole(name: string, body: RbacAuthorizationV1.Role, opts: operations.PutOpts = {}): Promise<RbacAuthorizationV1.Role> {
    const resp = await this.#client.performRequest({
      method: "PUT",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: operations.formatPutOpts(opts),
      bodyJson: RbacAuthorizationV1.fromRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRole(resp);
  }

  async patchRole(name: string, type: c.PatchType, body: RbacAuthorizationV1.Role | c.JsonPatch, opts: operations.PatchOpts = {}): Promise<RbacAuthorizationV1.Role> {
    const resp = await this.#client.performRequest({
      method: "PATCH",
      path: `${this.#root}roles/${name}`,
      expectJson: true,
      querystring: operations.formatPatchOpts(opts),
      contentType: c.getPatchContentType(type),
      bodyJson: Array.isArray(body) ? body : RbacAuthorizationV1.fromRole(body),
      abortSignal: opts.abortSignal,
    });
    return RbacAuthorizationV1.toRole(resp);
  }

}
