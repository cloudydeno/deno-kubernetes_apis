#!/bin/sh -eux

upstream="https://github.com/kubernetes/kubernetes"
if [ ! -f generation/api-specs/builtin-"$1".json ]
then wget \
  "$upstream/raw/$1/api/openapi-spec/swagger.json" \
  -O "generation/api-specs/builtin-$1.json"
fi

deno run \
  --allow-read="generation/api-specs" \
  --allow-write="lib/builtin" \
  generation/mod.ts \
  "generation/api-specs/builtin-$1.json"

git status lib/builtin
