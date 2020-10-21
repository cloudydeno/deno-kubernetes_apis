import {OpenAPI2, OpenAPI2Methods, OpenAPI2PathMethod, OpenAPI2RequestParameter, MethodList} from './openapi.ts';
import { ShapeLibrary, ApiShape } from "./describe-shapes.ts";
import { SurfaceMap, SurfaceApi } from './describe-surface.ts';

export function describeApi(surface: SurfaceMap, api: SurfaceApi) {
  const shapes = new ShapeLibrary(surface.wholeSpec.definitions, api.apiGroup === 'core' ? '' : api.apiGroup, api.apiVersion);

  const apiDesc = new ApiDescription(api.apiGroup, api.apiVersion, shapes);
  const {apiRoot, apiGroupInner, apiName} = apiDesc;

  console.error('API Base:', apiDesc.apiRootParts);
  console.error('API Name:', apiDesc.apiName);

  for (const [path, pathObj] of Object.entries(surface.wholeSpec.paths)) {
    if (!path.startsWith(apiRoot+'/')) continue;
    for (const method of MethodList) {
      if (!(method in pathObj)) continue;
      const methodObj = pathObj[method];
      if (!methodObj["x-kubernetes-group-version-kind"]) continue;
      const {group, version, kind} = methodObj["x-kubernetes-group-version-kind"];
      if (group != apiGroupInner) continue;
      if (version != api.apiVersion) continue;
      const subPath = path.slice(apiRoot.length+1);
      if (subPath.startsWith('watch/')) continue; // deprecated anyway
      if (methodObj.operationId.endsWith('WithPath')) continue; // TODO: special proxy routes

      if (!apiDesc.kinds.has(kind)) {
        apiDesc.kinds.set(kind, new ApiKind(kind));
      }
      const kindObj = apiDesc.kinds.get(kind)!;

      // const operationNames = methodObj.operationId.split(apiName);
      // console.log(operationNames)
      // console.log()

      // let CoreV1GetNamespaced/
      if (subPath.startsWith('namespaces/{namespace}/')) {
        kindObj.isNamespaced = true;
      }

      const op = new ApiOperation(apiName, subPath, method, methodObj, pathObj.parameters, shapes);

      kindObj.operations.push(op);
      // console.log(method, subPath, methodObj, pathObj.parameters);
      // relevantActions.push(new ApiAction(method, subPath, methodObj, pathObj.parameters));
      // break;
    }
  }

  // console.log(Array.from(shapes.shapes.keys()).sort())
  // console.log(Array.from(shapes.localShapes.keys()).sort())
  // console.log(Array.from(shapes.remoteShapes.keys()).sort())

  return apiDesc;
}

export class ApiDescription {
  apiGroup: string;
  apiVersion: string;
  shapes: ShapeLibrary;
  constructor(apiGroup: string, apiVersion: string, shapes: ShapeLibrary) {
    this.apiGroup = apiGroup;
    this.apiVersion = apiVersion;
    this.shapes = shapes;
  }

  kinds = new Map<string, ApiKind>();

  get isCoreApi(): boolean {
    return this.apiGroup === 'core';
  }
  /** Empty string for 'core' APIs */
  get apiGroupInner(): string {
    return this.isCoreApi ? '' : this.apiGroup;
  }
  /** CamelCased version of the first part of the apiGroup */
  get apiName(): string {
    const groupName = this.apiGroup
      .replace(/\.k8s\.io$/, '')
      .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
    const versionName = this.apiVersion
      .replace(/(^|[.-])[a-z]/g, x => x.slice(-1).toUpperCase());
    return groupName + versionName;
  }
  get apiRoot(): string {
    return `/${this.isCoreApi ? 'api' : `apis/${this.apiGroup}`}/${this.apiVersion}`;
  }
  get apiRootParts(): string[] {
    return [...(this.isCoreApi ? ['api'] : ['apis', this.apiGroup]), this.apiVersion];
  }
}

export class ApiKind {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  isNamespaced = false;
  operations = new Array<ApiOperation>();
}

export class ApiOperation {
  path: string;
  method: OpenAPI2Methods;
  scope: 'Cluster' | 'AllNamespaces' | 'Namespaced'
  description?: string;
  consumes: string[];
  produces: string[];
  operationId: string;
  operationName: string;
  responses: Record<number, {
    description?: string;
    shape: ApiShape | null;
  }>;
  params: OpenAPI2RequestParameter[];
  action?: string;

  constructor(apiName: string, subPath: string, method: OpenAPI2Methods, methodObj: OpenAPI2PathMethod, extraParams: OpenAPI2RequestParameter[], shapes: ShapeLibrary) {
    this.path = subPath;
    this.method = method;
    this.description = methodObj.description;
    this.consumes = methodObj.consumes;
    this.produces = methodObj.produces;
    this.operationId = methodObj.operationId;
    this.params = new Array().concat(methodObj.parameters ?? [], extraParams);
    this.action = methodObj['x-kubernetes-action'];

    this.responses = Object.create(null);
    for (const [status, resp] of Object.entries(methodObj.responses)) {
      this.responses[parseInt(status)] = {
        description: resp.description,
        shape: resp.schema?.$ref ? shapes.readSchema(resp.schema) : null,
      };
    }

    const kind = methodObj['x-kubernetes-group-version-kind']?.kind ?? 'Bug';
    let [operationPrefix, operationSuffix] = methodObj.operationId.split(apiName);

    if (operationSuffix.includes('Namespaced')) {
      operationSuffix = operationSuffix.replace('Namespaced', '');
      this.scope = 'Namespaced';
    } else if (operationSuffix.includes('ForAllNamespaces')) {
      // operationSuffix = operationSuffix.replace('ForAllNamespaces', 'Globally');
      this.scope = 'AllNamespaces';
    } else {
      this.scope = 'Cluster';
    }

    if (operationSuffix.includes(kind)) {
      let [opMidA, opMidB] = operationSuffix.split(kind);
      this.operationName = [operationPrefix, kind, opMidA, opMidB].join('');
    } else {
      this.operationName = [operationPrefix, operationSuffix].join('');
    }
    // console.log(this.scope, this.operationName);
  }
}





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
