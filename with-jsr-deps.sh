#!/usr/bin/env sh
set -ux

mv deps.ts deps_https.ts
mv deps_jsr.ts deps.ts
undo () {
  ARG=$?
  mv deps.ts deps_jsr.ts
  mv deps_https.ts deps.ts
  exit $ARG
}
trap undo EXIT

"$@"
