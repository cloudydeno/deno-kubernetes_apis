import { RestClient, HttpMethods, RequestOptions } from '../common.ts';

/**
 * A RestClient for access Kubernetes APIs through a `kubectl proxy` server.
 * kubectl should already be running to do all the actual authentication and network stuff.
 * This client works pretty well but depends on running a kubectl proxy server on your machine.
 *
 * Deno flags to use this client:
 *   --allow-net=localhost:8001
 *
 * Pro: Any valid kubeconfig will be supported automatically :)
 * Con: You're expected to bring your own kubectl proxy:
 *   - Your kubernetes API will be available to anything else on localhost
 *   - Extra resources used constantly if running in-cluster
 *   - If you don't have `kubectl proxy` running, all requests will fail
 */

// export default class KubectlProxyRestClient implements RestClient {
//   TODO!!!
// }
