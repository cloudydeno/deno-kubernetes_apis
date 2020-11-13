import { RestClient, HttpMethods, RequestOptions } from '../common.ts';
import { join } from "https://deno.land/std@0.70.0/path/mod.ts";

/**
 * A RestClient for code which is running within a Kubernetes pod and would like to
 * access the local cluster's control plane using its Service Account (likely the default SA).
 *
 * Deno flags to use this client:
 * Strict: --allow-read=/var/run/secrets/kubernetes.io/ --allow-net=kubernetes.default.svc.cluster.local --cert=/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
 * Lazy: --allow-read --allow-net --cert=/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
 *
 * As opposed to InClusterUnstableRestClient, this class does not register CA trust.
 * So you need to register the cluster's CA using --cert, as shown above.
 */

export default InClusterRestClient;
export class InClusterRestClient implements RestClient {
  readonly baseUrl: string;
  readonly secretsPath: string;
  readonly namespace: string;
  readonly #token: string;

  constructor({
    baseUrl = 'https://kubernetes.default.svc.cluster.local',
    secretsPath = '/var/run/secrets/kubernetes.io/serviceaccount',
  }={}) {
    this.baseUrl = baseUrl;
    this.secretsPath = secretsPath;

    this.namespace = Deno.readTextFileSync(join(secretsPath, 'namespace'));
    this.#token = Deno.readTextFileSync(join(secretsPath, 'token'));
  }

  async performRequest(method: HttpMethods, opts: RequestOptions={}): Promise<any> {
    let path = opts.path || '/';
    if (opts.querystring) {
      path += `?${opts.querystring}`;
    }
    console.log(method.toUpperCase(), path);

    const resp = await fetch(this.baseUrl + path, {
      method: method,
      body: JSON.stringify(opts.body),
      redirect: 'error',
      headers: {
        'Authorization': `Bearer ${this.#token}`,
      },
    })

    return resp.json();
  }
}
