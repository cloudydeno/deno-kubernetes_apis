#!/bin/sh -eux

# https://github.com/kubernetes/kubernetes/releases
./generation/sources/builtin.sh v1.26.1

# https://github.com/argoproj/argo-cd/releases
./generation/sources/argo-cd.sh v2.6.1

# https://github.com/cert-manager/cert-manager/releases
./generation/sources/cert-manager.sh v1.11.0

# https://github.com/kubernetes-sigs/external-dns/releases
./generation/sources/external-dns.sh v0.13.2
