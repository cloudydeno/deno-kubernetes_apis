import type { OpenAPI2SchemaObject, OpenAPI2Methods, OpenAPI2RequestParameter } from './openapi.ts';
import { writeApiModule } from "./codegen.ts";
import { SurfaceMap, SurfaceApi, OpScope } from "./describe-surface.ts";
import { ShapeLibrary } from "./describe-shapes.ts";

import {
  CustomResourceDefinition as CRDv1,
  toCustomResourceDefinition as toCRDv1,
} from "../lib/builtin/apiextensions.k8s.io@v1/structs.ts";
import {
  CustomResourceDefinition as CRDv1beta1,
  toCustomResourceDefinition as toCRDv1beta1,
  CustomResourceSubresources,
  CustomResourceDefinitionNames,
  CustomResourceDefinitionVersion,
} from "../lib/builtin/apiextensions.k8s.io@v1beta1/structs.ts";

import { ApiKind, JSONValue } from "https://deno.land/x/kubernetes_client@v0.1.2/mod.ts";

import * as YAML from "https://deno.land/std@0.82.0/encoding/yaml.ts";

const knownOpts = {
  GetListOpts: 'continue,fieldSelector,labelSelector,limit,resourceVersion,resourceVersionMatch,timeoutSeconds',
  WatchListOpts: 'allowWatchBookmarks,fieldSelector,labelSelector,resourceVersion,resourceVersionMatch,timeoutSeconds',
  PutOpts: 'dryRun,fieldManager', // both CreateOpts and ReplaceOpts
  DeleteListOpts: 'continue,dryRun,fieldSelector,gracePeriodSeconds,labelSelector,limit,orphanDependents,propagationPolicy,resourceVersion,resourceVersionMatch,timeoutSeconds',
  PatchOpts: 'dryRun,fieldManager,force',
  GetOpts: 'exact,export',
  DeleteOpts: 'dryRun,gracePeriodSeconds,orphanDependents,propagationPolicy',
};

const v1CRDs = new Array<CRDv1>();
const v1beta1CRDs = new Array<CRDv1beta1>();

for await (const dirEntry of Deno.readDir(Deno.args[0])) {
  if (!dirEntry.isFile) continue;
  if (!dirEntry.name.endsWith('.yaml')) continue;

  const raw = await Deno.readFile(Deno.args[0]+'/'+dirEntry.name);
  const doc = YAML.parse(new TextDecoder('utf-8').decode(raw));

  const typing = doc as ApiKind;
  if (typing.kind !== "CustomResourceDefinition") throw new Error(
    `I didn't see a CRD in ${dirEntry.name}`);
  switch (typing.apiVersion) {
    case 'apiextensions.k8s.io/v1beta1':
      v1beta1CRDs.push(toCRDv1beta1(doc as JSONValue));
      break;
    case 'apiextensions.k8s.io/v1':
      v1CRDs.push(toCRDv1(doc as JSONValue));
      break;
    default: throw new Error(
    `The CRD in ${dirEntry.name} uses an unsupported apiVersion`);
  }
}

const apiMap = new SurfaceMap({
  paths: {},
  definitions: {},
  swagger: 'faked'
});
apiMap.allApis[0].moduleName = '../builtin/meta@v1';

type DefMap = Map<string, OpenAPI2SchemaObject>;
const apis = new Map<string, [SurfaceApi, DefMap]>();
function recognizeGroupVersion(apiGroup: string, apiVersion: string) {
  const key = JSON.stringify([apiGroup, apiVersion]);
  const existing = apis.get(key);
  if (existing) return existing;

  const groupName = apiGroup
    .replace(/\.k8s\.io$/, '')
    .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
  const versionName = apiVersion
    .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
  // const shapePrefix = `#/definitions/io.k8s.api.certificates.v1beta1.`;
  const shapePrefix = `${apiGroup}.${apiVersion}.`;

  const api = apiMap.registerApi({
    apiRoot: `/apis/${apiGroup}/${apiVersion}/`,
    apiGroup: apiGroup,
    apiVersion: apiVersion,
    apiGroupVersion: [apiGroup, apiVersion].join('/'),
    friendlyName: groupName + versionName,
    moduleName: `${apiGroup}@${apiVersion}`,
    shapePrefix: shapePrefix,
    operations: new Array,
    definitions: new Map,
    kinds: new Map,
    shapes: new ShapeLibrary(shapePrefix, apiMap.byDefPrefix),
  });

  const map: DefMap = new Map();
  apis.set(key, [api, map]);
  return [api, map] as const;
}

if (v1CRDs.length > 0) {

  for (const crd of v1CRDs) {
    for (const version of crd.spec.versions ?? []) {

      const schema = version.schema?.openAPIV3Schema;
      if (!schema) throw new Error(
        `TODO: No schema given for ${crd.spec.names.kind}`);

      processCRD({
        apiGroup: crd.spec.group,
        apiVersion: version.name,
        schema: schema as OpenAPI2SchemaObject,
        names: crd.spec.names,
        scope: crd.spec.scope,
        subResources: {...version.subresources},
      });
    }
  }

} else if (v1beta1CRDs.length > 0) {

  for (const crd of v1beta1CRDs) {
    for (const version of crd.spec.versions ?? []) {

      const schema = version.schema?.openAPIV3Schema;
      if (!schema) throw new Error(
        `TODO: No schema given for ${crd.spec.names.kind}`);

      processCRD({
        apiGroup: crd.spec.group,
        apiVersion: version.name,
        schema: schema as OpenAPI2SchemaObject,
        names: crd.spec.names,
        scope: crd.spec.scope,
        subResources: {...version.subresources, ...crd.spec.subresources},
      });

    }
    if (crd.spec.version) {

      const schema = crd.spec.validation?.openAPIV3Schema;
      if (!schema) throw new Error(
        `TODO: No schema given for ${crd.spec.names.kind}`);

      processCRD({
        apiGroup: crd.spec.group,
        apiVersion: crd.spec.version,
        schema: schema as OpenAPI2SchemaObject,
        names: crd.spec.names,
        scope: crd.spec.scope,
        subResources: {...crd.spec.subresources},
      });

    }
  }

} else {
  throw new Error(`No CRDs found! Whoops?`);
}

for (const [api, defs] of apis.values()) {
  api.shapes.loadShapes(defs);
}

for (const api of apiMap.allApis) {
  try {
    await writeApiModule(apiMap, api, Deno.args[1]);
  } catch (err) {
    console.error(`Error writing`, api.apiGroupVersion);
    console.error(err);
  }
}

function processCRD({apiGroup, apiVersion, schema, names, scope, subResources}: {
  apiGroup: string,
  apiVersion: string,
  schema: OpenAPI2SchemaObject,
  names: CustomResourceDefinitionNames,
  scope: string,
  subResources: CustomResourceSubresources,
}) {

  const [api, defs] = recognizeGroupVersion(apiGroup, apiVersion);

  // operations: Array<SurfaceOperation>,
  // definitions: Map<string,OpenAPI2SchemaObject>,
  // kinds: Map<string,SurfaceKind>,
  // shapes: ShapeLibrary,

  // seems like additionalProperties gives type problems
  // api.definitions.set(names.kind, schema as OpenAPI2SchemaObject);
  schema["x-kubernetes-group-version-kind"] = [{
    group: api.apiGroup,
    version: api.apiVersion,
    kind: names.kind,
  }];
  schema.properties!["metadata"] = {
    "$ref": "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta"
  };
  defs.set(names.kind, schema);

  defs.set(names.kind+'List', {
    "type": "object",
    "required": [ "items" ],
    "properties": {
      "apiVersion": { "type": "string" },
      "items": {
        "items": {
          "$ref": `#/definitions/${api.shapePrefix}${names.kind}`
        },
        "type": "array"
      },
      "kind": { "type": "string" },
      "metadata": {
        "$ref": "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta"
      }
    },
    ["x-kubernetes-group-version-kind"]: [{
      group: api.apiGroup,
      version: api.apiVersion,
      kind: names.kind,
    }]
  });

  api.kinds.set(names.kind, {
    name: names.kind,
    plural: names.plural,
    singular: names.singular ?? names.kind,
    listName: names.listKind ?? `${names.kind}List`,
    isNamespaced: scope === 'Namespaced',
  });

  const opBoilerPlate = {
    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['https'],
    operationId: 'faked',
  }
  function addOp(operationName: string, scope: OpScope, method: OpenAPI2Methods, opts: {
    subPath?: string
    reqKind?: string;
    respKind?: string;
    knownOpts?: string;
    // params?: OpenAPI2RequestParameter[];
  }) {
    api.operations.push({
      ...opBoilerPlate,
      method: method,
      operationName: operationName,
      scope: scope,
      subPath: (names.plural ?? '') + (opts.subPath ?? ''),
      parameters: [
        ...(opts.subPath?.startsWith('/{name}') ? [
          { name: 'name', in: 'path', schema: { type: 'string' } } as const
        ] : []),
        ...(opts.reqKind ? [
          { name: 'body', in: 'body', schema: { $ref: `#/definitions/${opts.reqKind}` }} as const
        ] : []),
        // ...(opts.params ?? []),
        ...(opts.knownOpts ? opts.knownOpts
          .split(',').map(x => ({name: x, in: 'query', type: 'string'} as const))
        : []),
      ],
      responses: opts.respKind ? { '200': {
        schema: { $ref: `#/definitions/${opts.respKind}` },
      }} : {},
    });
  }

  function addCrdOps(scope: OpScope) {
    addOp(`get${names.kind}List`, scope, 'get', {
      respKind: `${api.shapePrefix}${names.kind}List`,
      knownOpts: knownOpts.GetListOpts,
    });
    addOp(`watch${names.kind}List`, scope, 'get', {
      respKind: `${api.shapePrefix}${names.kind}List`,
      knownOpts: knownOpts.WatchListOpts,
    });
    addOp(`create${names.kind}`, scope, 'post', {
      reqKind: `${api.shapePrefix}${names.kind}`,
      respKind: `${api.shapePrefix}${names.kind}`,
      knownOpts: knownOpts.PutOpts,
    });
    addOp(`delete${names.kind}List`, scope, 'delete', {
      reqKind: `io.k8s.apimachinery.pkg.apis.meta.v1.DeleteOptions`,
      respKind: `${api.shapePrefix}${names.kind}List`, // TODO: check!
      knownOpts: knownOpts.DeleteListOpts,
    });

    addOp(`get${names.kind}`, scope, 'get', {
      respKind: `${api.shapePrefix}${names.kind}`,
      knownOpts: knownOpts.GetOpts,
      subPath: '/{name}',
    });
    addOp(`delete${names.kind}`, scope, 'delete', {
      reqKind: `io.k8s.apimachinery.pkg.apis.meta.v1.DeleteOptions`,
      respKind: `${api.shapePrefix}${names.kind}`, // TODO: check!
      knownOpts: knownOpts.DeleteOpts,
      subPath: '/{name}',
    });
    addOp(`replace${names.kind}`, scope, 'put', {
      reqKind: `${api.shapePrefix}${names.kind}`,
      respKind: `${api.shapePrefix}${names.kind}`,
      knownOpts: knownOpts.PutOpts,
      subPath: '/{name}',
    });
    addOp(`patch${names.kind}`, scope, 'patch', {
      reqKind: `${api.shapePrefix}${names.kind}`,
      respKind: `${api.shapePrefix}${names.kind}`,
      knownOpts: knownOpts.PatchOpts,
      subPath: '/{name}',
    });

    if (subResources.status) {

      addOp(`get${names.kind}Status`, scope, 'get', {
        respKind: `${api.shapePrefix}${names.kind}`,
        knownOpts: knownOpts.GetOpts,
        subPath: '/{name}/status',
      });
      addOp(`replace${names.kind}Status`, scope, 'put', {
        reqKind: `${api.shapePrefix}${names.kind}`,
        respKind: `${api.shapePrefix}${names.kind}`,
        knownOpts: knownOpts.PutOpts,
        subPath: '/{name}/status',
      });
      addOp(`patch${names.kind}Status`, scope, 'patch', {
        reqKind: `${api.shapePrefix}${names.kind}`,
        respKind: `${api.shapePrefix}${names.kind}`,
        knownOpts: knownOpts.PatchOpts,
        subPath: '/{name}/status',
      });

    }
    if (subResources.scale) {
      throw new Error(`TODO: scale subresource on ${names.kind}`);
    }
  }

  if (scope === 'Namespaced') {

    addOp(`get${names.kind}ListForAllNamespaces`, 'AllNamespaces', 'get', {
      respKind: `${api.shapePrefix}${names.kind}List`,
      knownOpts: knownOpts.GetListOpts,
    });
    addOp(`watch${names.kind}ListForAllNamespaces`, 'AllNamespaces', 'get', {
      respKind: `${api.shapePrefix}${names.kind}List`,
      knownOpts: knownOpts.WatchListOpts,
    });

    addCrdOps('Namespaced');

  } else {

    addCrdOps('Cluster');

  }

}
