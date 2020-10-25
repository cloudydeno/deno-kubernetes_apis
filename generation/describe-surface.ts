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

    // console.log([apiGroupPath, apiVersion, subPath]);
    // [ "/apis/apps", "v1", "namespaces/{namespace}/daemonsets" ]

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
type OpScope = 'Cluster' | 'AllNamespaces' | 'Namespaced';

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

  // for (const [defId, schema] of Object.entries(wholeSpec.definitions)) {
  //   console.log(defId);
  // }

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
          // operationSuffix = operationSuffix.replace('ForAllNamespaces', 'Globally');
          scope = 'AllNamespaces';
        }

        let opName = '';
        if (operationSuffix.includes(kind)) {
          let [opMidA, opMidB] = operationSuffix.split(kind);
          opName = [operationPrefix, kind, opMidA, opMidB].join('');
        } else {
          opName = [operationPrefix, operationSuffix].join('');
        }
        // console.log(this.scope, opName);

        api.operations.push({
          ...methodObj,
          parameters: new Array<OpenAPI2RequestParameter>()
            .concat(methodObj.parameters ?? [], pathObj.parameters ?? []),
          subPath: subPath,
          method: method,
          operationName: opName,
          scope: scope,
        });

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

    // if (!path.startsWith(apiRoot+'/')) continue;
    // for (const method of methods) {
    //   if (!(method in pathObj)) continue;
    //   const methodObj = pathObj[method];
    //   if (!methodObj["x-kubernetes-group-version-kind"]) continue;
    //   const {group, version, kind} = methodObj["x-kubernetes-group-version-kind"];
    //   if (group != apiGroupInner) continue;
    //   if (version != apiVersion) continue;
    //   const subPath = path.slice(apiRoot.length+1);
    //   if (subPath.startsWith('watch/')) continue; // deprecated anyway
    //   if (methodObj.operationId.endsWith('WithPath')) continue; // TODO: special proxy routes

    //   if (!api.kinds.has(kind)) {
    //     api.kinds.set(kind, new ApiKind(kind));
    //   }
    //   const kindObj = api.kinds.get(kind)!;

    //   const operationNames = methodObj.operationId.split(apiName);
    //   // console.log(operationNames)
    //   // console.log()

    //   // let CoreV1GetNamespaced/
    //   if (subPath.startsWith('namespaces/{namespace}/')) {
    //     kindObj.isNamespaced = true;
    //   }

    //   const op = new ApiOperation(apiName, subPath, method, methodObj, pathObj.parameters, shapes);

    //   kindObj.operations.push(op);
    //   // console.log(method, subPath, methodObj, pathObj.parameters);
    //   // relevantActions.push(new ApiAction(method, subPath, methodObj, pathObj.parameters));
    //   // break;
    // }
  }

  for (const api of surface.allApis) {
    const defs = new Map<string, OpenAPI2SchemaObject>();
    for (const [defId, schema] of Object.entries(wholeSpec.definitions)) {
      if (!defId.startsWith(api.shapePrefix)) continue;
      const defName = defId.slice(api.shapePrefix.length);
      // console.log(defName)
      defs.set(defName, schema);
    }
    // console.log(api.shapes, defs)
    api.shapes.loadShapes(defs);
  }

  // for (const [defId, schema] of Object.entries(wholeSpec.definitions)) {
  //   const defPrefix = defId.slice(0, defId.lastIndexOf('.')+1);
  //   const api = surface.byDefPrefix.get(defPrefix);
  //   if (api) {
  //     api.definitions.set(defId.slice(defPrefix.length), schema);
  //   }
  // }

  // console.log(Array.from(shapes.shapes.keys()).sort())
  // console.log(Array.from(shapes.localShapes.keys()).sort())
  // console.log(Array.from(shapes.remoteShapes.keys()).sort())

  return surface;
}

// export class ApiDescription {
//   apiGroup: string;
//   apiVersion: string;
//   shapes: ShapeLibrary;
//   constructor(apiGroup: string, apiVersion: string, shapes: ShapeLibrary) {
//     this.apiGroup = apiGroup;
//     this.apiVersion = apiVersion;
//     this.shapes = shapes;
//   }

//   kinds = new Map<string, ApiKind>();

//   get isCoreApi(): boolean {
//     return this.apiGroup === 'core';
//   }
//   /** Empty string for 'core' APIs */
//   get apiGroupInner(): string {
//     return this.isCoreApi ? '' : this.apiGroup;
//   }
//   /** CamelCased version of the first part of the apiGroup */
//   get apiName(): string {
//     const groupName = this.apiGroup
//       .replace(/\.k8s\.io$/, '')
//       .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
//     const versionName = this.apiVersion
//       .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
//     return groupName + versionName;
//   }
//   get apiRoot(): string {
//     return `/${this.isCoreApi ? 'api' : `apis/${this.apiGroup}`}/${this.apiVersion}`;
//   }
//   get apiRootParts(): string[] {
//     return [...(this.isCoreApi ? ['api'] : ['apis', this.apiGroup]), this.apiVersion];
//   }
// }

// export class ApiKind {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }

//   isNamespaced = false;
//   operations = new Array<ApiOperation>();
// }

// export class ApiOperation {
//   path: string;
//   method: OpenAPI2Methods;
//   scope: 'Cluster' | 'AllNamespaces' | 'Namespaced'
//   description?: string;
//   consumes: string[];
//   produces: string[];
//   operationId: string;
//   operationName: string;
//   responses: Record<number, {
//     description?: string;
//     shape: ApiShape | null;
//   }>;
//   params: OpenAPI2RequestParameter[];
//   action?: string;

//   constructor(apiName: string, subPath: string, method: OpenAPI2Methods, methodObj: OpenAPI2PathMethod, extraParams: OpenAPI2RequestParameter[], shapes: ShapeLibrary) {
//     this.path = subPath;
//     this.method = method;
//     this.description = methodObj.description;
//     this.consumes = methodObj.consumes;
//     this.produces = methodObj.produces;
//     this.operationId = methodObj.operationId;
//     this.params = new Array().concat(methodObj.parameters ?? [], extraParams);
//     this.action = methodObj['x-kubernetes-action'];

//     this.responses = Object.create(null);
//     for (const [status, resp] of Object.entries(methodObj.responses)) {
//       this.responses[parseInt(status)] = {
//         description: resp.description,
//         shape: resp.schema?.$ref ? shapes.readSchema(resp.schema) : null,
//       };
//     }

//     const kind = methodObj['x-kubernetes-group-version-kind']?.kind ?? 'Bug';
//     let [operationPrefix, operationSuffix] = methodObj.operationId.split(apiName);

//     if (operationSuffix.includes('Namespaced')) {
//       operationSuffix = operationSuffix.replace('Namespaced', '');
//       this.scope = 'Namespaced';
//     } else if (operationSuffix.includes('ForAllNamespaces')) {
//       // operationSuffix = operationSuffix.replace('ForAllNamespaces', 'Globally');
//       this.scope = 'AllNamespaces';
//     } else {
//       this.scope = 'Cluster';
//     }

//     if (operationSuffix.includes(kind)) {
//       let [opMidA, opMidB] = operationSuffix.split(kind);
//       this.operationName = [operationPrefix, kind, opMidA, opMidB].join('');
//     } else {
//       this.operationName = [operationPrefix, operationSuffix].join('');
//     }
//     // console.log(this.scope, this.operationName);
//   }
// }





// class ApiContext {
//   baseName: string;
//   pathParts: string[];
//   actions: Map<string, ApiAction> = new Map;
//   subContexts: Map<string, ApiContext> = new Map;
//   constructor(baseName: string, pathParts: string[]) {
//     this.baseName = baseName;
//     this.pathParts = pathParts;
//   }
//   get hasDynamicPath(): boolean {
//     return this.pathParts.some(x => x[0] === '{');
//   }

//   upsertSubContext(name: string, pathParts: string[]) {
//     let ctx = this.subContexts.get(name);
//     if (ctx) {
//       if (JSON.stringify(ctx.pathParts) !== JSON.stringify(pathParts)) {
//         throw new Error(`upsertSubContext encountered inconsistency`);
//       }
//       return ctx;
//     } else {
//       ctx = new ApiContext(this.baseName+name, pathParts);
//       this.subContexts.set(name, ctx);
//       return ctx;
//     }
//   }
// }

// class ApiAction {
//   method: string;
//   path: string;
//   methodObj: OpenAPI2PathMethod;
//   extraParams: OpenAPI2RequestParameter[];
//   constructor(method: string, path: string, methodObj: OpenAPI2PathMethod, extraParams: OpenAPI2RequestParameter[]) {
//     this.method = method;
//     this.path = path;
//     this.methodObj = methodObj;
//     this.extraParams = extraParams;
//     // console.error('TODO ApiAction', method, path);
//   }

//   get pathParts(): string[] {
//     return this.path.split('/');
//   }
// }

// class ApiResource {
//   name: string = '' // poddisruptionbudgets (can include subresource)
//   singularName: string = '' // poddisruptionbudget (?)
//   namespaced: boolean = false
//   kind: string = '' // PodDisruptionBudget
//   verbs: string[] = new Array()
//   shortNames?: string[]
//   subResources: Set<string> = new Set()
// }


// const methods: Array<OpenAPI2Methods> = ['get', 'post', 'delete', 'put', 'patch', 'options', 'head'];
// const relevantActions = new Array<ApiAction>();
// const knownResources = new Map<string, ApiResource>();
// for (const [path, pathObj] of Object.entries(wholeSpec.paths)) {
//   if (!path.startsWith(apiRoot+'/')) continue;
//   for (const method of methods) {
//     if (!(method in pathObj)) continue;
//     const methodObj = pathObj[method];
//     if (!methodObj["x-kubernetes-group-version-kind"]) continue;
//     if (methodObj["x-kubernetes-group-version-kind"].group != apiGroupInner) continue;
//     if (methodObj["x-kubernetes-group-version-kind"].version != apiVersion) continue;
//     const subPath = path.slice(apiRoot.length+1);
//     if (subPath.startsWith('watch/')) continue; // deprecated anyway
//     if (methodObj.operationId.endsWith('WithPath')) continue; // TODO: special proxy routes
//     relevantActions.push(new ApiAction(method, subPath, methodObj, pathObj.parameters));
//   }
// }

// // console.error(relevantActions.filter(x => !x.path.startsWith('namespaces/') && !x.path.startsWith('watch/')).map(x => x.path))
// console.error(relevantActions.filter(x => x.pathParts.length === 1).map(x => x.path))

// // deleteExtensionsV1beta1CollectionNamespacedIngress

// // const allKinds = new Set;

// const topLevelActions = relevantActions.filter(x => x.pathParts.length === 1);

// const topLevelKinds: string[] = Array.from(new Set(topLevelActions
//   // .filter(x => x.methodObj['x-kubernetes-action'] != 'connect')
//   .map(x => x.methodObj["x-kubernetes-group-version-kind"]?.kind || '')
//   .filter(x => x)));
// // console.error('Discovered kinds:', topLevelKinds);

// console.log(`

// // The HTTP contract put forth by kubernetes-rest-client/core/mod.ts
// export type HttpMethods = "get" | "post" | "delete" | "put" | "patch"; // | "options" | "head"
// export interface RequestOptions {
//   querystring?: URLSearchParams,
//   accept?: string,
//   path?: string,
//   body?: string | Uint8Array,
// }
// export interface RestClient {
//   performRequest(method: HttpMethods, opts?: RequestOptions): Promise<Object>;
//   subPath(strings: TemplateStringsArray, ...params: string[]): RestClient;
// }
// `);

// console.log(`\n// All relevant actions:\n`);
// console.log(relevantActions.map(x => '// '+JSON.stringify([x.pathParts, x.method/*, x.methodObj, x.pathParams*/])).join('\n'));

// const rootContext = new ApiContext(apiVersion.toUpperCase(), apiRootParts);
// for (const action of relevantActions) {
//   let currentCtx = rootContext;
//   let remainingParts = action.pathParts.slice(0);
//   if (remainingParts[0] === 'namespaces' && remainingParts[1] === '{namespace}') {
//     currentCtx = currentCtx.upsertSubContext('Namespaced', remainingParts.splice(0, 2));
//   }

//   // const resourceName = remainingParts.filter(x => x[0] !== '{').join('/');
//   let res = knownResources.get(remainingParts[0]);
//   if (!res) {
//     res = new ApiResource();
//     res.name = remainingParts[0];
//     if (action.methodObj.operationId.includes(apiName)) {
//       const strictApiName = apiName.toLowerCase().replace(/[^a-z0-9]/g, '');
//       res.kind = action.methodObj.operationId
//         .slice(action.methodObj.operationId.toLowerCase()
//           .indexOf(strictApiName)+strictApiName.length+apiVersion.length)
//         .replace(/(^Namespaced|ForAllNamespaces$)/, '');
//     }
//     knownResources.set(remainingParts[0], res);
//   }
//   if (remainingParts.length > 1) {
//     res.subResources.add(remainingParts.slice(1).join('/'))
//   }
//   res.verbs.push(action.methodObj["x-kubernetes-action"] || 'missing');
//   if (currentCtx.pathParts.includes('{namespace}')) {
//     res.namespaced = true;
//   }

//   if (action.methodObj.operationId.endsWith('ForAllNamespaces')) {
//     currentCtx = currentCtx.upsertSubContext('AllNamespaces', []);
//     currentCtx.actions.set(`list${remainingParts[0]}`, action);
//   } else {
//     currentCtx = currentCtx.upsertSubContext(remainingParts[0], remainingParts.slice(0, 1))
//     // console.error('TODO:', remainingParts)
//     currentCtx.actions.set(action.methodObj.operationId, action);
//     // ["namespaces","{namespace}","scalingpolicies","{name}"]
//   }
// }

// console.log(`\n// All relevant API resources:\n`);
// console.log(Array.from(knownResources.values()).map(x => '// '+JSON.stringify(x)).join('\n'));

// console.log('/*\n// API Tree');
// function printTree(root: ApiContext, level=2) {
//   const indents = new Array(level).fill(' ').join('');
//   console.log(indents, '#', root.baseName);
//   for (const [name, api] of root.subContexts.entries()) {
//     console.log(indents, '  -', name);
//     printTree(api, level+4);
//   }
//   for (const [name, action] of root.actions.entries()) {
//     console.log(indents, '  -', name, '()');
//     // printTree(api, level+4);
//   }
// }
// printTree(rootContext, 2);
// console.log('*/');









// console.log(`

// export default class ${apiName}Api {
//   #client: RestClient
//   constructor(client: RestClient) {
//     this.#client = client.subPath\`${apiRoot}\`;
//   }
// ${topLevelKinds.map(kind => `
//   get ${kind[0].toLowerCase()}${kind.slice(1)}(): ${kind}Api {
//     return new ${kind}Api(this.#client);
//   }
// `).join('')}
// }

// `);

// const mentionedModels = new Set<string>();

// for (const kind of topLevelKinds) {
//   const actions = topLevelActions.filter(x => x.methodObj["x-kubernetes-group-version-kind"]?.kind === kind);
//   console.error(actions.map(x => x.method));

//   console.log(`
// class ${kind}Api {
//   #client: RestClient
//   constructor(client: RestClient) {
//     this.#client = client.subPath\`/${actions[0].pathParts[0]}\`;
//   }

//   `);

//   for (const action of actions) {
//     const responseRef = action.methodObj.responses['200']?.schema?.$ref;
//     if (responseRef) mentionedModels.add(responseRef.replace('#/definitions/', ''));
//     const responseType = responseRef ? responseRef.split('.').slice(-1)[0] : 'any';

//     console.log(`
//     // ${JSON.stringify([action.method, action.path, action.methodObj.operationId])}
//     async ${action.method}({...queryFields}: {
//       ${action.pathParams.map(p => `      ${p.name}?: ${p.type === 'integer' ? 'number' : p.type}`).join('\n')}
//       ${(action.methodObj.parameters||[]).map(p => `      ${p.name}?: ${p.type === 'integer' ? 'number' : p.type}`).join('\n')}
//     } = {}): Promise<${responseType}> {
//       const querystring = new URLSearchParams;
//       for (const [key, val] of Object.entries(queryFields)) {
//         if (val != null) querystring.set(key, \`\${val}\`);
//       }
//       const response = await this.#client.performRequest('${action.method}', {querystring});
//       return response as ${responseType};
//     }

//     `);
//   }
//   console.log(`
// }
//   `);
// }

// const fullApiVersion = [apiGroupInner, apiVersion].filter(x => x).join('/');
// console.log(`\n\n// Mentioned models: ${Array.from(mentionedModels).join(', ')}`);

// for (const modelPath of mentionedModels) {
//   const model = wholeSpec.definitions[modelPath];
//   const shortName = modelPath.split('.').slice(-1)[0];

//   const fields = {...model.properties};
//   delete fields.apiVersion;
//   delete fields.kind;

//   console.log(`

//   export interface ${shortName}Fields {
//     ${Object.entries(fields).map(([x,y]) => `${x}?: ${y.type || 'any'}\n`).join('')}
//   }
//   export interface ${shortName} extends ${shortName}Fields {
//     apiVersion: '${fullApiVersion}';
//     kind: '${shortName}';
//   }
//   export class ${shortName} implements ${shortName} {
//     apiVersion: '${fullApiVersion}' = '${fullApiVersion}';
//     kind: '${shortName}' = '${shortName}';
//     ${Object.entries(fields).map(([x,y]) => `${x}?: ${y.type || 'any'}\n`).join('')}
//     constructor({ ${Object.keys(fields).join(', ')} }: ${shortName}Fields) {
//       ${Object.entries(fields).map(([x,y]) => `if (${x} != null) this.${x} = ${x};\n`).join('')}
//     }
//   }


//   `);
// }

// // export namespace MetaV1 {

// //   export interface JobListFields {
// //     items?: Array<any>
// // metadata?: any

// //   }
// // }
