FROM hayd/alpine-deno

RUN apk add --no-cache smartmontools
ARG kubectl_version=v1.19.3
RUN wget -O /bin/kubectl \
  "https://storage.googleapis.com/kubernetes-release/release/$kubectl_version/bin/linux/amd64/kubectl" \
 && chmod +x /bin/kubectl

ADD lib /src/lib/
ADD pet-loops /src/pet-loops/

RUN deno cache /src/pet-loops/blockdevice/mod.ts
