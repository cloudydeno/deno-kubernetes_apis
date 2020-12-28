#!/bin/sh -eux

upstream="https://github.com/kubernetes/kubernetes"
if [ ! -f generation/api-specs/builtin-"$1".json ]
then wget \
  "$upstream/raw/$1/api/openapi-spec/swagger.json" \
  -O "generation/api-specs/builtin-$1.json"
fi

rm -r lib/builtin/* \
|| true

deno run \
  --allow-read="generation/api-specs" \
  --allow-write="lib/builtin" \
  generation/mod.ts \
  "generation/api-specs/builtin-$1.json" \
  "builtin"

deno cache lib/builtin/*/structs.ts

git status lib/builtin
