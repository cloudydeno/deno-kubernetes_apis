import {
  OpenAPI2Methods, MethodList,
  OpenAPI2, OpenAPI2SchemaObject,
  OpenAPI2PathMethod, OpenAPI2RequestParameter,
} from './openapi.ts';
import { ShapeLibrary } from "./describe-shapes.ts";

export class SurfaceMap {
  wholeSpec: OpenAPI2;
  constructor(wholeSpec: OpenAPI2) {
    this.wholeSpec = wholeSpec;

    this.registerApi({
      apiRoot: '/meta/v1/', // not real (no apis)
      shapePrefix: 'io.k8s.apimachinery.pkg.apis.meta.v1.', // real

      apiGroup: 'meta',
      apiVersion: 'v1',
      apiGroupVersion: 'meta/v1',
      friendlyName: 'MetaV1',
      moduleName: `meta@v1`,

      operations: new Array,
      definitions: new Map,
      kinds: new Map,
      shapes: new ShapeLibrary('io.k8s.apimachinery.pkg.apis.meta.v1.', this.byDefPrefix),
    });
  }

  allApis = new Array<SurfaceApi>();
  byPathPrefix = new Map<string,SurfaceApi>();
  byDefPrefix = new Map<string,SurfaceApi>();

  recognizePath(path: string): (SurfaceApi & {
    operations: Array<SurfaceOperation>;
  }) | null {
    const [apiGroupPath, subPath] = path.split(/\/v[0-9]+[^\/]*\//);
    if (!subPath) return null;

    const apiVersion = path.slice(apiGroupPath.length+1, -subPath.length-1);
    const apiRoot = `${apiGroupPath}/${apiVersion}/`;

    const existing = this.byPathPrefix.get(apiRoot);
    if (existing) return existing;

    const apiGroup = apiGroupPath === '/api' ? 'core' : apiGroupPath.slice(6);
    const apiGroupMaybe = apiGroupPath === '/api' ? '' : apiGroupPath.slice(6);

    const groupName = apiGroup
      .replace(/\.k8s\.io$/, '')
      .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
    const versionName = apiVersion
      .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());

    const shapePrefix = Object
      .entries(this.wholeSpec.definitions)
      .filter(([_, x]) => x["x-kubernetes-group-version-kind"]?.every(y => y.group === apiGroupMaybe && y.version === apiVersion))
      .map(([x]) => x.slice(0, x.lastIndexOf('.')+1))[0] ?? 'BUG';

    const api: SurfaceApi = {
      apiRoot: apiRoot,
      apiGroup: apiGroup,
      apiVersion: apiVersion,
      apiGroupVersion: [...(apiGroupMaybe ? [apiGroup] : []), apiVersion].join('/'),
      friendlyName: groupName + versionName,
      moduleName: `${apiGroup}@${apiVersion}`,
      shapePrefix: shapePrefix,
      operations: new Array,
      definitions: new Map,
      kinds: new Map,
      shapes: new ShapeLibrary(shapePrefix, this.byDefPrefix),
    };
    this.registerApi(api);

    return api;
  }

  registerApi(api: SurfaceApi) {
    this.byPathPrefix.set(api.apiRoot, api);
    this.byDefPrefix.set(api.shapePrefix, api);
    this.allApis.push(api);
    return api;
  }
}

export interface SurfaceApi {
  apiRoot: string;
  apiGroup: string;
  apiVersion: string;
  apiGroupVersion: string;
  moduleName: string;
  friendlyName: string;
  shapePrefix: string;

  operations: Array<SurfaceOperation>,
  definitions: Map<string,OpenAPI2SchemaObject>,
  kinds: Map<string,SurfaceKind>,
  shapes: ShapeLibrary,
}

export type SurfaceOperation = OpenAPI2PathMethod & {
  parameters: OpenAPI2RequestParameter[],
  subPath: string;
  method: OpenAPI2Methods;
  scope: OpScope;
  operationName: string;
}
export type OpScope = 'Cluster' | 'AllNamespaces' | 'Namespaced';

export interface SurfaceKind {
  name: string;
  listName: string | null;
  plural: string | null;
  singular: string | null;
  isNamespaced: boolean;
  // subresources: Record<string,unknown>;
  // operations: Array<ApiOperation>;
}

export function describeSurface(wholeSpec: OpenAPI2) {
  const surface = new SurfaceMap(wholeSpec);

  for (const [path, pathObj] of Object.entries(wholeSpec.paths)) {
    if (path.endsWith('/')) continue;

    const api = surface.recognizePath(path);
    if (api) {

      const subPath = path.slice(api.apiRoot.length);
      if (subPath.startsWith('watch/')) continue; // deprecated anyway

      for (const method of MethodList) {
        if (!(method in pathObj)) continue;
        const methodObj = pathObj[method];

        if (methodObj.operationId.endsWith('WithPath')) continue; // TODO: special proxy routes

        const kind = methodObj['x-kubernetes-group-version-kind']?.kind ?? 'Bug';
        let [operationPrefix, operationSuffix] = methodObj.operationId.split(api.friendlyName);

        let scope: OpScope = 'Cluster';
        if (operationSuffix.includes('Namespaced')) {
          operationSuffix = operationSuffix.replace('Namespaced', '');
          scope = 'Namespaced';
        } else if (operationSuffix.includes('ForAllNamespaces')) {
          scope = 'AllNamespaces';
        }

        let opName = '';
        let isListOp = false;
        if (operationSuffix.includes(kind)) {
          let [opMidA, opMidB] = operationSuffix.split(kind);

          if (operationPrefix === 'list') {
            isListOp = true;
            opName = ['get', kind, 'List', opMidB].join('');
          } else if (opMidA === 'Collection') {
            isListOp = true;
            opName = [operationPrefix, kind, 'List', opMidB].join('');
          } else if (operationPrefix === 'read') {
            opName = ['get', opMidA, kind, opMidB].join('');
          } else {
            opName = [operationPrefix, opMidA, kind, opMidB].join('');
          }
        } else {
          opName = [operationPrefix, operationSuffix].join('');
        }
        // console.log(this.scope, opName);

        const allParams = new Array<OpenAPI2RequestParameter>()
          .concat(methodObj.parameters ?? [], pathObj.parameters ?? []);

        api.operations.push({
          ...methodObj,
          parameters: allParams.filter(x => !['allowWatchBookmarks', 'watch', 'pretty'].includes(x.name)),
          subPath: subPath,
          method: method,
          operationName: opName,
          scope: scope,
        });

        if (allParams.some(x => x.name === 'watch')
            && opName.startsWith('get')
            && !['ComponentStatus', 'NodeMetrics', 'PodMetrics'].includes(kind)
        ) {
          api.operations.push({
            ...methodObj,
            parameters: allParams.filter(x => !['continue', 'limit', 'watch', 'pretty'].includes(x.name)),
            subPath: subPath,
            method: method,
            operationName: opName.replace(/^get/, 'watch'),
            scope: scope,
          });
        }

        const kindTuple = methodObj['x-kubernetes-group-version-kind'];
        if (kindTuple) {
          let kindObj = api.kinds.get(kindTuple.kind);
          if (!kindObj) {
            kindObj = {
              name: kindTuple.kind,
              plural: kindTuple.kind+'s',
              singular: kindTuple.kind,
              listName: kindTuple.kind+'List',
              isNamespaced: false,
            };
            api.kinds.set(kindTuple.kind, kindObj);
          }
          if (subPath.startsWith('namespaces/{namespace}/')) {
            kindObj.isNamespaced = true;
          }
        }
      }
    }
  }

  for (const api of surface.allApis) {
    const defs = new Map<string, OpenAPI2SchemaObject>();
    for (const [defId, schema] of Object.entries(wholeSpec.definitions)) {
      if (!defId.startsWith(api.shapePrefix)) continue;
      const defName = defId.slice(api.shapePrefix.length);
      defs.set(defName, schema);
    }
    api.shapes.loadShapes(defs);

    for (const op of api.operations) {
      for (const param of op.parameters) {
        api.shapes.readSchema(param.schema ?? {type: param.type}, null);
      }
      for (const resp of Object.values(op.responses)) {
        if (resp.schema?.$ref) {
          api.shapes.readSchema(resp.schema, null);
        }
      }
    }
  }

  return surface;
}
