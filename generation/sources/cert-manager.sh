#!/bin/sh -eux

gitapi="https://api.github.com"
upstream="jetstack/cert-manager"
crdpath="deploy/crds"
specdir="generation/api-specs/cert-manager-$1"

if [ ! -d "$specdir" ]
then {
  echo 'mkdir '"$specdir"
  echo 'cd '"$specdir"
  wget -O - "$gitapi/repos/$upstream/contents/$crdpath?ref=$1" \
  | jq -r '.[] | select(.name | startswith("crd-")) | "wget \(.download_url)"'
} | sh -eux
fi

rm -r lib/cert-manager/* \
|| true

deno run \
  --allow-read="generation/api-specs" \
  --allow-write="lib/cert-manager" \
  generation/run-on-crds.ts \
  "$specdir" \
  "cert-manager"

git status lib/cert-manager
