#!/bin/sh -eux

kubectl get --raw /openapi/v2 \
| jq . \
> generation/api-specs/from-cluster.json

deno run \
  --allow-read="generation/api-specs" \
  --allow-write="lib/builtin" \
  generation/mod.ts \
  "generation/api-specs/from-cluster.json" \
  "builtin"

# deno cache lib/builtin/*/structs.ts

git status lib/builtin
