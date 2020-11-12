
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
}
