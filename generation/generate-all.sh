#!/bin/sh -eux

./generation/sources/builtin.sh v1.21.0

./generation/sources/cert-manager.sh v1.3.1
./generation/sources/external-dns.sh v0.8.0
