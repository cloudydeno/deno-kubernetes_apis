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
 *      And there are no limitations on possible requests.
 * Con: You're expected to bring your own `kubectl proxy`, and thus:
 *   - Your kubernetes API will be available to anything else on localhost
 *   - Extra resources used constantly by the `kubectl proxy` program
 *   - If you don't have `kubectl proxy` running, all requests will fail
 */

// export default class KubectlProxyRestClient implements RestClient {
//   TODO!!!
// }
