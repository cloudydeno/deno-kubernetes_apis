
// The API contract that all generated code expects

export type HttpMethods =
  | "get"
  | "post"
  | "delete"
  | "put"
  | "patch"
  | "options"
  | "head";

export interface RequestOptions {
  querystring?: URLSearchParams,
  accept?: string,
  path?: string,
  body?: string | Uint8Array,
}

export interface RestClient {
  performRequest(method: HttpMethods, opts?: RequestOptions): Promise<any>;
  subPath(strings: TemplateStringsArray, ...params: string[]): RestClient;
}

// Subpathed client for creating pathed clients
// This isn't ideal and I'll probably remove it, just flexing on tagged templates for now

export class PathedRestClient implements RestClient {
  #parent: RestClient;
  #path: string;
  constructor(parent: RestClient, path: string) {
    this.#parent = parent;
    this.#path = path;
  }

  async performRequest(method: HttpMethods, opts: RequestOptions={}): Promise<Object> {
    return this.#parent.performRequest(method, {...opts, path: `${this.#path}${opts.path || ''}`});
  }

  subPath(strings: TemplateStringsArray, ...names: string[]): RestClient {
    const path = String.raw(strings, ...names.map(encodeURIComponent));
    if (!path.startsWith('/')) throw new Error(
      `BUG: must use absolute paths when pathing a RestClient`);
    return new PathedRestClient(this.#parent, this.#path + path);
  }
}
