// This file is just the entire matching kubernetes_client version.
// kubernetes_apis itself only depends on specific files,
// so this is provided an optional utility

export * from "https://deno.land/x/kubernetes_client@v0.7.0/mod.ts";
export * as tunnelBeta from "https://deno.land/x/kubernetes_client@v0.7.0/tunnel-beta/via-websocket.ts";

export { toStatus } from './builtin/meta@v1/structs.ts';

export * from "https://deno.land/x/kubernetes_client@v0.7.0/lib/contract.ts";
export {
  WatchEventTransformer
} from "https://deno.land/x/kubernetes_client@v0.7.0/lib/stream-transformers.ts";
