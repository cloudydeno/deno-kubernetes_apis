// This file is just the entire matching kubernetes_client version.
// kubernetes_apis itself only depends on specific files,
// so this is provided an optional utility (as opposed to deps.ts)

export * from "https://deno.land/x/kubernetes_client@v0.7.0/mod.ts";
export * as tunnelBeta from "https://deno.land/x/kubernetes_client@v0.7.0/tunnel-beta/via-websocket.ts";
