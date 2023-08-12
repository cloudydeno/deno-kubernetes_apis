import { SurfaceMap, SurfaceApi, SurfaceOperation } from "./describe-surface.ts";
import { OpenAPI2RequestParameter } from "./openapi.ts";
import { ApiShape } from "./describe-shapes.ts";

const knownOpts: Record<string,string|undefined> = {
  '': 'NoOpts',
  'continue,fieldSelector,labelSelector,limit,resourceVersion,resourceVersionMatch,sendInitialEvents,timeoutSeconds': 'GetListOpts',
  'allowWatchBookmarks,fieldSelector,labelSelector,resourceVersion,resourceVersionMatch,sendInitialEvents,timeoutSeconds': 'WatchListOpts',
  'dryRun,fieldManager,fieldValidation': 'PutOpts', // both CreateOpts and ReplaceOpts
  'continue,dryRun,fieldSelector,gracePeriodSeconds,labelSelector,limit,orphanDependents,propagationPolicy,resourceVersion,resourceVersionMatch,sendInitialEvents,timeoutSeconds': 'DeleteListOpts',
  'dryRun,fieldManager,fieldValidation,force': 'PatchOpts',
  'exact,export': 'GetOpts',
  'dryRun,gracePeriodSeconds,orphanDependents,propagationPolicy': 'DeleteOpts',
};

export function generateModuleTypescript(surface: SurfaceMap, api: SurfaceApi): string {
  const chunks = new Array<string>();
  chunks.push(`export * from "./structs.ts";`);
  chunks.push('');
  chunks.push(`// Autogenerated API file for ${api.friendlyName}`);
  chunks.push(`import * as c from "../../common.ts";`);
  chunks.push(`import * as operations from "../../operations.ts";`);
  chunks.push(`import * as ${api.friendlyName} from "./structs.ts";`);
  chunks.push('');

  const foreignApis = new Set<SurfaceApi>();
  foreignApis.add(surface.allApis.find(x => x.friendlyName === 'MetaV1')!);

  const hasNamespaced = Array.from(api.kinds.values()).some(x => x.isNamespaced);

  chunks.push(`export class ${api.friendlyName}Api {`);
  chunks.push(`  #client: c.RestClient;`);
  chunks.push(`  #root = ${JSON.stringify(api.apiRoot)};`);
  chunks.push(`  constructor(client: c.RestClient) {`);
  chunks.push(`    this.#client = client;`);
  chunks.push(`  }\n`);

  if (hasNamespaced) {
    chunks.push(`  namespace(name: string) {`);
    chunks.push(`    return new ${api.friendlyName}NamespacedApi(this.#client, name);`);
    chunks.push(`  }`);
    chunks.push(`  myNamespace() {`);
    chunks.push(`    if (!this.#client.defaultNamespace) throw new Error("No current namespace is set");`);
    chunks.push(`    return new ${api.friendlyName}NamespacedApi(this.#client, this.#client.defaultNamespace);`);
    chunks.push(`  }\n`);
  }

  for (const op of api.operations) {
    if (op.scope === 'Namespaced') continue;
    writeOperation(op);
  }

  chunks.push(`}\n`);

  if (hasNamespaced) {
    chunks.push(`export class ${api.friendlyName}NamespacedApi {`);
    chunks.push(`  #client: c.RestClient`);
    chunks.push(`  #root: string`);
    chunks.push(`  constructor(client: c.RestClient, namespace: string) {`);
    chunks.push(`    this.#client = client;`);
    chunks.push(`    this.#root = \`${JSON.stringify(api.apiRoot+'namespaces/').slice(1,-1)}\${namespace}/\`;`);
    chunks.push(`  }\n`);

    for (const op of api.operations) {
      if (op.scope !== 'Namespaced') continue;
      writeOperation(op);
    }

    chunks.push(`}\n`);
  }

  for (const foreignApi of foreignApis) {
    chunks.splice(5, 0, `import * as ${foreignApi.friendlyName} from "../${foreignApi.moduleName}/structs.ts";`);
  }

  return chunks.join('\n');


  function writeOperation(op: SurfaceOperation) {

    const outShape = Object.values(op.responses)
      .filter(resp => resp.schema?.$ref)
      .map(resp => api.shapes.readSchema(resp!.schema!, null))[0];

    let opPath = op.subPath;
    const args = new Array<[OpenAPI2RequestParameter, ApiShape]>();
    const opts = new Array<[OpenAPI2RequestParameter, ApiShape]>();
    for (const param of op.parameters) {
      // if (!param.schema) throw new Error(`param ${param.name} missing schema`);
      const shape = api.shapes.readSchema(param.schema ?? {type: param.type}, null);
      if (param.name == 'namespace') {
        opPath = opPath.replace('namespaces/{namespace}/', '');
        continue;
      }
      if (param.in === 'path') {
        args.splice(0, 0, [param, shape]);
      } else if (param.in === 'body') {

        // for PATCH, We're going to be more specific than just MetaV1.Patch
        if (shape.type === 'foreign' &&
            shape.api.apiGroup === 'meta' &&
            shape.name === 'Patch' &&
            op.method === 'patch') {
          args.push([param, outShape]);

        } else if (op.method === 'delete') {
          // for DELETE, the body isn't useful; the options will handle everything

        } else {
          args.push([param, shape]);
        }
      } else if (param.in === 'query') {
        opts.push([param, shape]);
      } else throw new Error(`Unknown param.in ${param.in}`);
    }

    // Entirely specialcase and collapse each method's proxy functions into one
    if (op['x-kubernetes-action'] === 'connect' && op.operationName.endsWith('Proxy')) {
      if (op.method !== 'get') return; // only emit the GET function, and make it generic
      const middleName = op.operationName.slice('connectGet'.length, -'Proxy'.length);
      const nameArgName = `${middleName[0].toLowerCase()}${middleName.slice(1)}Name`;
      const funcName = `proxy${middleName}Request`;

      args.push([{name: 'opts', in: 'path'}, {type: 'special', name: 'ProxyOptions'}]);
      const baseSignature = `${funcName}(${writeSig(args, false, '  ')}`.replace('(name:', `(${nameArgName}:`);

      chunks.push(`  ${baseSignature} & {expectStream: true; expectJson: true}): Promise<ReadableStream<c.JSONValue>>;`);
      chunks.push(`  ${baseSignature} & {expectStream: true}): Promise<ReadableStream<Uint8Array>>;`);
      chunks.push(`  ${baseSignature} & {expectJson: true}): Promise<c.JSONValue>;`);
      chunks.push(`  ${baseSignature}): Promise<Uint8Array>;`);
      chunks.push(`  async ${baseSignature}): Promise<unknown> {`);
      chunks.push(`    if (opts.path && !opts.path.startsWith('/')) throw new Error("Proxy path cannot be relative");`);
      chunks.push(`    const name = (opts.port != null) ? \`\${${nameArgName}}:\${opts.port}\` : ${nameArgName};`);
      chunks.push(`    const path = \`\${this.#root}${JSON.stringify(opPath).slice(1,-1).replace(/{/g, '${')}\${opts.path || ''}\`;`);
      chunks.push(`    return await this.#client.performRequest({ ...opts, path });`);
      chunks.push(`  }\n`);
      return;
    }

    let accept = 'application/json';
    if (op.produces.includes('text/plain')) {
      accept = 'text/plain'; // container logs
    }

    // TODO: combine 'replace' and 'patch' into 'update'
    // async updateOrderStatus(name: string, type: c.PatchType | 'replace', body: AcmeCertManagerIoV1.Order | c.JsonPatch, opts: operations.PatchOpts = {}) {
    //   if (Array.isArray(body) && type !== 'json-patch') throw new Error(
    //     `JSON-Patch bodies must be used with the "json-patch" update type`);
    //   const resp = await this.#client.performRequest({
    //     method: type === 'replace' ? "PUT" : "PATCH",
    //     path: `${this.#root}orders/${name}/status`,
    //     expectJson: true,
    //     querystring: operations.formatPatchOpts(opts),
    //     contentType: type === 'replace' ? undefined : c.getPatchContentType(type),
    //     bodyJson: Array.isArray(body) ? body : AcmeCertManagerIoV1.fromOrder(body),
    //     abortSignal: opts.abortSignal,
    //   });
    //   return AcmeCertManagerIoV1.toOrder(resp);
    // }

    chunks.push(`  async ${op.operationName}(${writeSig(args, opts, '  ')}) {`);
    const isWatch = op.operationName.startsWith('watch');
    const isStream = op.operationName.startsWith('stream');

    const allOptKeys = opts.map(x => x[0].name).sort().join(',');
    const knownOptShape = knownOpts[allOptKeys];
    if (!knownOptShape) {

      if (isWatch) {
        chunks.push(`    const query = new URLSearchParams([['watch', '1']]);`);
      } else {
        chunks.push(`    const query = new URLSearchParams;`);
      }

      for (const opt of opts) {
        const idStr = JSON.stringify(opt[0].name);
        const maybeIf = opt[0].required ? '' : `if (opts[${idStr}] != null) `;
        if (opt[0].in !== 'query') throw new Error(`TODO: non-query opt ${idStr}`);
        switch (opt[1].type) {
          case 'boolean':
            chunks.push(`    ${maybeIf}query.append(${idStr}, opts[${idStr}] ? '1' : '0');`);
            break;
          case 'string':
            chunks.push(`    ${maybeIf}query.append(${idStr}, opts[${idStr}]);`);
            break;
          case 'number':
            chunks.push(`    ${maybeIf}query.append(${idStr}, String(opts[${idStr}]));`);
            break;
          case 'list':
            if (opt[1].inner.type == 'string') {
              chunks.push(`    for (const item of opts[${idStr}]${opt[0].required ? '' : ' ?? []'}) {`);
              chunks.push(`      query.append(${idStr}, item);`);
              chunks.push(`    }`);
              break;
            }
            /* falls through */
          default:
            chunks.push(`    // TODO: ${opt[0].in} ${opt[0].name} ${opt[0].required} ${opt[0].type} ${JSON.stringify(opt[1])}`);
        }
      }
    }

    chunks.push(`    const resp = await this.#client.performRequest({`);
    chunks.push(`      method: ${JSON.stringify(op.method.toUpperCase())},`);
    chunks.push(`      path: \`\${this.#root}${JSON.stringify(opPath).slice(1,-1).replace(/{/g, '${')}\`,`);
    if (accept === 'application/json') {
      chunks.push(`      expectJson: true,`);
    }
    if (isWatch || isStream) {
      chunks.push(`      expectStream: true,`);
    }
    if (knownOptShape !== 'NoOpts') {
      chunks.push(`      querystring: ${knownOptShape ? `operations.format${knownOptShape}(opts)` : 'query'},`);
    }
    const bodyArg = args.find(x => x[0].in === 'body');
    if (bodyArg) {
      if (bodyArg[1].type === 'foreign') foreignApis.add(bodyArg[1].api);
      const bodyApi = bodyArg[1].type === 'foreign' ? bodyArg[1].api : api;
      const bodyName = bodyArg[1].type === 'foreign' ? bodyArg[1].name : bodyArg[1].reference;
      let bodyConversion = `${bodyApi.friendlyName}.from${bodyName}(body)`;
      if (op.method === 'patch') {
        chunks.push(`      contentType: c.getPatchContentType(type),`);
        bodyConversion = `Array.isArray(body) ? body : ${bodyConversion}`;
      }
      chunks.push(`      bodyJson: ${bodyConversion},`);
    }
    chunks.push(`      abortSignal: opts.abortSignal,`);
    chunks.push(`    });`);

    if (isStream) {
      if (accept === 'text/plain') {
        chunks.push(`    return resp.pipeThrough(new TextDecoderStream('utf-8'));`);
      } else {
        chunks.push(`    return resp;`);
      }
      chunks.push(`  }\n`);
      return;
    }
    if (accept === 'text/plain') {
      chunks.push(`    return new TextDecoder('utf-8').decode(resp);`);
      chunks.push(`  }\n`);
      return;
    }

    if (outShape) {
      let shape = outShape;

      // QUIRK: individual deletes can either return a Status or the 'lastExisting' resource
      // (also depends on which API, some _always_ return a Status)
      // We workaround by telling the codegen to always return the resource,
      //   and then adding a conditional to allow MetaV1.Status as well.
      // https://github.com/kubernetes/kubernetes/issues/59501
      // https://github.com/cloudydeno/deno-kubernetes_apis/issues/4
      // Note that "delete collection" functions are not involved. They _always_ return a resource list.
      if (shape.type === 'foreign' &&
          shape.api.apiGroup === 'meta' &&
          shape.name === 'Status' &&
          op.method === 'delete') {
        shape = api.shapes.shapes.get(op.operationName.replace(/^delete/, ''))!;
      }

      if (op["x-kubernetes-action"] == 'delete') {
        chunks.push(`    if (c.isStatusKind(resp)) return MetaV1.toStatus(resp);`);
      }

      if (shape.type === 'foreign') {
        foreignApis.add(shape.api);
        chunks.push(`    return ${shape.api.friendlyName}.to${shape.name}(resp);`);
      } else if (shape.reference) {
        if (isWatch) {
          chunks.push(`    return resp.pipeThrough(new c.WatchEventTransformer(${api.friendlyName}.to${shape.reference.slice(0, -4)}, MetaV1.toStatus));`);
          // chunks.push(`    return c.transformWatchStream(resp, ${api.friendlyName}.to${shape.reference.slice(0, -4)});`);
        } else {
          chunks.push(`    return ${api.friendlyName}.to${shape.reference}(resp);`);
        }
      } else throw new Error(`TODO: weird output shape on ${op.operationId}`);
    }

    chunks.push(`  }\n`);
  }


  function writeType(shape: ApiShape): string {
    switch (shape.type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'structure':
        if (!shape.reference) break;
        return `${api.friendlyName}.${shape.reference}`;
      case 'foreign':
        return `${shape.api.friendlyName}.${shape.name}`;
      case 'list':
        return `Array<${writeType(shape.inner)}>`;
      case 'special':
        return `c.${shape.name}`;
    }
    throw new Error(`TODO ${shape.type}`);
  }

  function writeSig(args: [OpenAPI2RequestParameter, ApiShape][], opts: [OpenAPI2RequestParameter, ApiShape][] | false, indent=''): string {
    let sigs = new Array<string>();
    for (const arg of args) {
      sigs.push(`${arg[0].name}: ${writeType(arg[1])}`);
    }
    if (opts) {
      const allAreOpt = opts.every(x => !x[0].required);
      const allOptKeys = opts.map(x => x[0].name).sort().join(',');
      const knownOptShape = knownOpts[allOptKeys];
      if (knownOptShape) {
        if (knownOptShape === 'PatchOpts') {
          // If this is a Patch endpoint, fix up types for proper patching
          const bodySig = sigs.pop();
          sigs.push('type: c.PatchType');
          sigs.push(bodySig + ' | c.JsonPatch');
        }
        sigs.push(`opts: operations.${knownOptShape}${allAreOpt ? ' = {}' : ''}`);
      } else {
        const lines = new Array<string>();
        for (const opt of opts) {
          lines.push(`  ${opt[0].name}${opt[0].required ? '' : '?'}: ${writeType(opt[1])};`)
        }
        lines.push(`  abortSignal?: AbortSignal;`);
        sigs.push(`opts: {\n${lines.join('\n')}\n}${allAreOpt ? ' = {}' : ''}`);
      }
    }
    return sigs.join(', ').replace(/\n/g, '\n'+indent);
  }

}
