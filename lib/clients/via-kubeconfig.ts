import { RestClient, HttpMethods, RequestOptions } from './common.ts';

/**
 * A RestClient for code which is running within a Kubernetes pod and would like to
 * access the local cluster's control plane using its Service Account (likely the default SA).
 *
 * Deno flags to use this client:
 * Basic: --unstable --allow-read --allow-write --allow-net --allow-env
 * Strict: --unstable --allow-read=$HOME/.kube --allow-write=$HOME/.kube --allow-net
 * Lazy: --unstable --allow-all
 *
 * Unstable features:
 * - using a caFile when fetching
 * - inspecting permissions and prompting for further permissions
 *
 * --allow-env is purely to read the $HOME variable to find your kubeconfig
 *
 * Note that advanced kubeconfigs will need different permissions.
 * This client will prompt you if your config requires extra permissions.
 * Federated auth like AWS IAM or a Google Account are the largest offenders.
 *
 * Note that Deno (as of 1.4.1) can't fetch HTTPS IP addresses (denoland/deno#7660)
 * so KUBERNETES_SERVER_HOST can't be used at this time, and would need --allow-env anyway.
 *
 * Note that Deno (as of 1.4.1) can't provide a CA Certificate inline. (TODO: file an issuer)
 * This means that we need to write the CA out to a .pem file and then have Deno read it back in.
 * This requires more permissions; for the momen
 */

export default KubeConfigRestClient;
export class KubeConfigRestClient implements RestClient {
  constructor(kubeConfig: KubeConfig, httpClient: Deno.HttpClient) {
    throw new Error(`TODO: implement :)`);
  }

  static async fromKubeConfig(path?: string): Promise<KubeConfigRestClient> {

    const config = await readKubeConfig(path);
    const {context, cluster, user} = config.fetchCurrentContext();

    let caPath = cluster["certificate-authority"];
    if (!caPath && cluster["certificate-authority-data"]) {
      const caPath = `/tmp/ca-${context.cluster}.pem`;
      await Deno.writeTextFile(caPath, atob(cluster["certificate-authority-data"]));
    }

    const httpClient = Deno.createHttpClient({
      caFile: caPath,
    });

    return new KubeConfigRestClient(config, httpClient);
  }


  async performRequest(method: HttpMethods, opts: RequestOptions={}): Promise<Object> {
    let path = opts.path || '/';
    if (opts.querystring) {
      path += `?${opts.querystring}`;
    }
    console.log(method.toUpperCase(), path);

    throw new Error(`TODO: implement`);
  }
}


////////////////////////////////////////
// .kube/config parsing


import { join } from "https://deno.land/std@0.70.0/path/mod.ts";
import * as YAML from "https://deno.land/std@0.70.0/encoding/yaml.ts";


export async function readKubeConfig(path?: string): Promise<KubeConfig> {
  if (!path) {
    path = join(Deno.env.get("HOME") ?? '/root', ".kube", "config");
  }

  const decoder = new TextDecoder("utf-8");
  const file = await Deno.open(path, {read: true});
  const string = decoder.decode(await Deno.readAll(file));
  file.close();

  const data = YAML.parse(string);
  if (isKubeConfig(data)) return new KubeConfig(data);
  throw new Error(`KubeConfig didn't smell right`);
}

export interface KubeConfig {
  apiVersion: 'v1';
  kind: 'Config';

  'contexts': {name: string, context: ContextConfig}[];
  'clusters': {name: string, cluster: ClusterConfig}[];
  'users': {name: string, user: UserConfig}[];

  'current-context': string;
  'preferences': any; // TODO: what uses this?
}

export class KubeConfig implements KubeConfig {
  constructor(kubeconfig: KubeConfig) {
    Object.assign(this, kubeconfig);
  }

  fetchCurrentContext(): {context: ContextConfig, cluster: ClusterConfig, user: UserConfig} {
    const current = this.contexts.find(x => x.name === this["current-context"]);
    if (!current) throw new Error(`No context is selected in kubeconfig`);

    const cluster = this.clusters.find(x => x.name === current.context.cluster);
    if (!cluster) throw new Error(`No cluster is selected in kubeconfig`);

    const user = this.users.find(x => x.name === current.context.user);
    if (!user) throw new Error(`No user is selected in kubeconfig`);

    return { context: current.context, cluster: cluster.cluster, user: user.user };
  }
}
function isKubeConfig(data: any): data is KubeConfig {
  return data && data.apiVersion === 'v1' && data.kind === 'Config';
}

export interface ContextConfig {
  'cluster': string;
  'user': string;
}

export interface ClusterConfig {
  'server': string; // URL

  'certificate-authority'?: string; // path
  'certificate-authority-data'?: string; // base64
}

export interface UserConfig {
  // inline auth
  'token'?: string;
  'username'?: string;
  'password'?: string;

  // mTLS auth (--allow-read)
  'client-key'?: string; // path
  'client-key-data'?: string; // base64
  'client-certificate'?: string; // path
  'client-certificate-data'?: string; // base64

  // external auth (--allow-run)
  'auth-provider'?: {name: string, config: UserAuthProvider};
}

export interface UserAuthProvider {
  'access-token': string;
  'cmd-args': string;
  'cmd-path': string;
  'expiry': string;
  'expiry-key': string;
  'token-key': string;
}
