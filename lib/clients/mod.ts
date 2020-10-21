import type { RestClient } from './common.ts';
export * from './common.ts';

/**
 * There are three very different HTTP clients here!
 * Each one has its own usecase, upsides, problems, and flags.
 * Check each file to understand what flags you'll need to pass.
 *
 * This file exports all three clients so you need --unstable to load it.
 * If you just want one client, you should probably import it directly.
 *
 * If you want every client to 'just work' then consider --unstable --allow-all
 */

import { InClusterRestClient } from './via-incluster.ts';
import { KubeConfigRestClient } from './via-kubeconfig.ts';
import { KubectlRestClient } from './via-kubectl.ts';
export { InClusterRestClient, KubeConfigRestClient, KubectlRestClient };

// Feeble attempt at automatically deciding how to talk to Kubernetes
// Most seful with permissive flags: --unstable --allow-all
// You can probably be more specific and secure with app-specific Deno.args flags
export async function autoDetectClient(): Promise<RestClient> {
  // TODO: 
  let val: string | undefined;
  if (val = Deno.env.get('KUBERNETES_SERVER_HOST')) {
    return new InClusterRestClient();
  } else if (val = Deno.env.get('KUBECONFIG')) {
    return KubeConfigRestClient.fromKubeConfig(val);
  } else {
    return new KubectlRestClient();
  }
}
