import { RestClient, HttpMethods, RequestOptions, PathedRestClient } from './common.ts';

/**
 * A RestClient for easily running on a developer's local machine.
 * Your existing kubectl is called to do all the actual authentication and network stuff.
 * This is pretty reliable but mot all types of requests can be performed this way.
 *
 * Deno flags to use this client:
 *   --allow-run
 *
 * Pro: Any valid kubeconfig will be supported automatically :)
 * Con: In particular, these features aren't available:
 *   - Setting or receiving HTTP headers
 *   - HTTP methods such as PATCH and HEAD
 * Note that Deno (as of 1.4.1) can't curl IP addresses (denoland/deno#7660)
 * so KUBERNETES_SERVER_HOST can't be used at this time, and would need --allow-env anyway.
 */

export class KubectlRestClient implements RestClient {
  async performRequest(method: HttpMethods, opts: RequestOptions={}): Promise<Object> {
    const command = {
      get: 'get',
      post: 'create',
      delete: 'delete',
      put: 'replace',
      patch: '',
      options: '',
      head: '',
    }[method];
    if (!command) throw new Error(`KubectlRestClient cannot perform HTTP ${method.toUpperCase()}`);

    let path = opts.path || '/';
    if (opts.querystring) {
      path += `?${opts.querystring}`;
    }
    console.log(method.toUpperCase(), path);

    // TODO: request bodies

    const p = Deno.run({
      cmd: ["kubectl", command, "--raw", path],
      stdout: "piped",
    });
    const { code } = await p.status();
    if (code !== 0) {
      throw new Error(`Failed to call kubectl: code ${code}`);
    }
    const rawOutput = await p.output();
    const data = new TextDecoder("utf-8").decode(rawOutput);
    return JSON.parse(data);
  }

  subPath(strings: TemplateStringsArray, ...names: string[]): RestClient {
    const path = String.raw(strings, ...names.map(encodeURIComponent));
    if (!path.startsWith('/')) throw new Error(
      `BUG: must use absolute paths when pathing a RestClient`);
    return new PathedRestClient(this, path);
  }
}
