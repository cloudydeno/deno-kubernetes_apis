#!/bin/sh -eux

./generation/sources/builtin.sh v1.22.4

./generation/sources/argo-cd.sh v2.1.7
./generation/sources/cert-manager.sh v1.6.1
./generation/sources/external-dns.sh v0.10.1
