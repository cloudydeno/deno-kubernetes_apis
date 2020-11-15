import type { RestClient } from '../common.ts';

/**
 * There are three very different types of HTTP client here!
 * Each one has its own usecase, upsides, problems, and flags.
 * Check each file to understand what flags you'll need to pass.
 *
 * This file exports only the clients that don't require --unstable.
 * So it's a pretty sane entrypoint into the client world,
 * especially if you are writing a script locally that
 * you will want to run within a cluster pretty soon.
 */

import { InClusterRestClient } from './via-incluster.ts';
import { KubectlRawRestClient } from './via-kubectl-raw.ts';
export { InClusterRestClient, KubectlRawRestClient };

// Feeble attempt at automatically deciding how to talk to Kubernetes
// You'll still need to set the correct permissions for where you are running.
// You can probably be more specific and secure with app-specific Deno.args flags
export async function autoDetectClient(): Promise<RestClient> {

  // try reading the incluster service account files
  try {
    return new InClusterRestClient();
  } catch (err) {
    console.log('InCluster client failed:', err.name);
  }

  // TODO: try hitting localhost:9001 (for KubectlProxyRestClient)

  // fall back to execing kubectl
  return new KubectlRawRestClient();
}
