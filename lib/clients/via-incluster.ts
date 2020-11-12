import { RestClient, HttpMethods, RequestOptions } from './common.ts';
import { join } from "https://deno.land/std@0.70.0/path/mod.ts";

/**
 * A RestClient for code which is running within a Kubernetes pod and would like to
 * access the local cluster's control plane using its Service Account (likely the default SA).
 *
 * Deno flags to use this client:
 * Strict: --unstable --allow-read=/var/run/secrets/kubernetes.io/ --allow-net=kubernetes.default.svc
 * Lazy: --unstable --allow-read --allow-net
 *
 * Unstable features:
 * - using a caFile when fetching
 *
 * Note that Deno (as of 1.4.1) can't fetch HTTPS IP addresses (denoland/deno#7660)
 * so KUBERNETES_SERVER_HOST can't be used at this time, and would need --allow-env anyway.
 */

export default InClusterRestClient;
export class InClusterRestClient implements RestClient {
  readonly baseUrl: string;
  readonly secretsPath: string;
  readonly namespace: string;
  readonly #httpClient: Deno.HttpClient;
  readonly #token: string;

  constructor({
    baseUrl = 'https://kubernetes.default.svc',
    secretsPath = '/var/run/secrets/kubernetes.io/serviceaccount',
  }={}) {
    this.baseUrl = baseUrl;
    this.secretsPath = secretsPath;

    this.namespace = Deno.readTextFileSync(join(secretsPath, 'namespace'));
    this.#httpClient = Deno.createHttpClient({
      caFile: join(secretsPath, `ca.crt`),
    });
    this.#token = Deno.readTextFileSync(join(secretsPath, 'token'));
  }

  async performRequest(method: HttpMethods, opts: RequestOptions={}): Promise<Object> {
    let path = opts.path || '/';
    if (opts.querystring) {
      path += `?${opts.querystring}`;
    }
    console.log(method.toUpperCase(), path);

    const resp = await fetch(this.baseUrl + path, {
      method: method,
      body: opts.body,
      redirect: 'error',
      headers: {
        'Authorization': `Bearer ${this.#token}`,
      },
      client: this.#httpClient,
    })

    return resp.json();
  }
}
