import type { OpenAPI2, OpenAPI2SchemaObject } from './openapi.ts';
import { writeApiModule } from "./codegen.ts";
import { SurfaceMap, SurfaceApi } from "./describe-surface.ts";
import { ShapeLibrary } from "./describe-shapes.ts";

import {
  CustomResourceDefinition as CRDv1,
  toCustomResourceDefinition as toCRDv1,
} from "../lib/builtin/apiextensions.k8s.io@v1/structs.ts";
import {
  CustomResourceDefinition as CRDv1beta1,
  toCustomResourceDefinition as toCRDv1beta1,
} from "../lib/builtin/apiextensions.k8s.io@v1beta1/structs.ts";

import { ApiKind, JSONValue } from "https://deno.land/x/kubernetes_client@v0.1.2/mod.ts";

import * as YAML from "https://deno.land/std@0.82.0/encoding/yaml.ts";

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
  throw new Error(`TODO`);

} else if (v1beta1CRDs.length > 0) {

  for (const crd of v1beta1CRDs) {
    for (const version of crd.spec.versions ?? []) {
      if (version.subresources) throw new Error(`TODO: subresources`);

      const [api, defs] = recognizeGroupVersion(crd.spec.group, version.name);
      const schema = version.schema?.openAPIV3Schema;
      if (!schema) throw new Error(
        `TODO: No schema given for ${crd.spec.names.kind}`);

      // operations: Array<SurfaceOperation>,
      // definitions: Map<string,OpenAPI2SchemaObject>,
      // kinds: Map<string,SurfaceKind>,
      // shapes: ShapeLibrary,

      // seems like additionalProperties gives type problems
      // api.definitions.set(crd.spec.names.kind, schema as OpenAPI2SchemaObject);
      const schemaObj = schema as OpenAPI2SchemaObject;
      schemaObj["x-kubernetes-group-version-kind"] = [{
        group: api.apiGroup,
        version: api.apiVersion,
        kind: crd.spec.names.kind,
      }];
      schemaObj.properties!["metadata"] = {
        "$ref": "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta"
      };
      defs.set(crd.spec.names.kind, schemaObj);

      defs.set(crd.spec.names.kind+'List', {
        "type": "object",
        "required": [ "items" ],
        "properties": {
          "apiVersion": { "type": "string" },
          "items": {
            "items": {
              "$ref": `#/definitions/${api.shapePrefix}${crd.spec.names.kind}`
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
          kind: crd.spec.names.kind,
        }]
      });

      api.kinds.set(crd.spec.names.kind, {
        name: crd.spec.names.kind,
        plural: crd.spec.names.plural,
        singular: crd.spec.names.singular ?? crd.spec.names.kind,
        listName: crd.spec.names.listKind ?? `${crd.spec.names.kind}List`,
        isNamespaced: crd.spec.scope === 'Namespaced',
      });


// const knownOpts: Record<string,string|undefined> = {
//   'continue,fieldSelector,labelSelector,limit,resourceVersion,resourceVersionMatch,timeoutSeconds': 'GetListOpts',
//   'allowWatchBookmarks,fieldSelector,labelSelector,resourceVersion,resourceVersionMatch,timeoutSeconds': 'WatchListOpts',
//   'dryRun,fieldManager': 'PutOpts', // both CreateOpts and ReplaceOpts
//   'continue,dryRun,fieldSelector,gracePeriodSeconds,labelSelector,limit,orphanDependents,propagationPolicy,resourceVersion,resourceVersionMatch,timeoutSeconds': 'DeleteListOpts',
//   'dryRun,fieldManager,force': 'PatchOpts',
//   'exact,export': 'GetOpts',
//   'dryRun,gracePeriodSeconds,orphanDependents,propagationPolicy': 'DeleteOpts',
// };


      if (crd.spec.scope === 'Namespaced') {

        api.operations.push({
          consumes: ['application/json'],
          produces: ['application/json'],
          schemes: ['https'],
          operationId: 'none',
          responses: {},
          parameters: 'continue,fieldSelector,labelSelector,limit,resourceVersion,resourceVersionMatch,timeoutSeconds'.split(',').map(x => ({name: x, in: 'query', type: 'string'})),
          subPath: crd.spec.names.plural ?? '',
          method: 'get',
          operationName: `get${crd.spec.names.kind}ListForAllNamespaces`,
          scope: 'AllNamespaces',
        });

        api.operations.push({
          consumes: ['application/json'],
          produces: ['application/json'],
          schemes: ['https'],
          operationId: 'none',
          responses: {},
          parameters: 'continue,fieldSelector,labelSelector,limit,resourceVersion,resourceVersionMatch,timeoutSeconds'.split(',').map(x => ({name: x, in: 'query', type: 'string'})),
          subPath: crd.spec.names.plural ?? '',
          method: 'get',
          operationName: `get${crd.spec.names.kind}List`,
          scope: 'Namespaced',
        });
      }

    }
  }

} else {
  throw new Error(`No CRDs found! Whoops?`);
}

for (const [api, defs] of apis.values()) {
  api.shapes.loadShapes(defs);
}

// const data = await Deno.readTextFile(Deno.args[0] ?? 'openapi.json');
// const wholeSpec: OpenAPI2 = JSON.parse(data);
// const surface = describeSurface(wholeSpec);

for (const api of apiMap.allApis) {
  try {
    await writeApiModule(apiMap, api, Deno.args[1]);
  } catch (err) {
    console.error(`Error writing`, api.apiGroupVersion);
    console.error(err);
  }
}
