// partially from https://github.com/manifoldco/swagger-to-ts/blob/master/src/types/OpenAPI2.ts
/**
 * OpenAPI2 types
 * These aren’t exhaustive or complete by any means; they simply provide only
 * the parts that swagger-to-ts needs to know about.
 */

export interface OpenAPI2 {
  paths: { [path: string]: OpenAPI2PathObject };
  definitions: { [key: string]: OpenAPI2SchemaObject };
  swagger: string;
  [key: string]: any; // handle other properties beyond swagger-to-ts’ concern
}

export type OpenAPI2Type =
  | "array"
  | "binary"
  | "boolean"
  | "byte"
  | "date"
  | "dateTime"
  | "double"
  | "float"
  | "integer"
  | "long"
  | "number"
  | "object"
  | "password"
  | "string";

// export type OpenAPI2Reference = { $ref: string };

export interface OpenAPI2SchemaObject {
  $ref?: string;

  additionalProperties?: OpenAPI2SchemaObject | boolean;
  allOf?: OpenAPI2SchemaObject[];
  description?: string;
  enum?: string[];
  format?: "byte" | "date-time" | "double" | "int32" | "int64" | "int-or-string";
  items?: OpenAPI2SchemaObject;
  oneOf?: (OpenAPI2SchemaObject)[];
  properties?: { [index: string]: OpenAPI2SchemaObject };
  required?: string[];
  title?: string;
  type?: OpenAPI2Type; // allow this to be optional to cover cases when this is missing
  // [key: string]: any; // allow arbitrary x-something properties

  // Kubernetes CRD extensions
  "x-kubernetes-embedded-resource"?: boolean;
  "x-kubernetes-int-or-string"?: boolean;
  "x-kubernetes-list-map-keys"?: string[];
  "x-kubernetes-list-type"?: string;
  "x-kubernetes-preserve-unknown-fields"?: true;
  'x-kubernetes-group-version-kind'?: GroupVersionKind[];
}

export type OpenAPI2Methods =
| "get"
| "post"
| "delete"
| "put"
| "patch"
| "options"
| "head";
export const MethodList: Array<OpenAPI2Methods> = [
  "get",
  "post",
  "delete",
  "put",
  "patch",
  "options",
  "head",
];

export interface OpenAPI2PathObject {
  parameters: Array<OpenAPI2RequestParameter>;
  // [method: OpenAPI2Methods]: OpenAPI2PathMethod;
  get: OpenAPI2PathMethod;
  post: OpenAPI2PathMethod;
  delete: OpenAPI2PathMethod;
  put: OpenAPI2PathMethod;
  patch: OpenAPI2PathMethod;
  options: OpenAPI2PathMethod;
  head: OpenAPI2PathMethod;
}

export interface OpenAPI2RequestParameter {
  uniqueItems?: boolean; // set-like
  type?: OpenAPI2Type;
  schema?: OpenAPI2SchemaObject;
  description?: string;
  name: string;
  in: 'body' | 'header' | 'path' | 'query';
  required?: boolean;
}

export interface OpenAPI2PathMethod {
  description?: string;
  consumes: Array<string>;
  produces: Array<string>;
  schemes: Array<string>;
  tags?: Array<string>;
  operationId: string;
  parameters?: Array<OpenAPI2RequestParameter>;
  responses: { [status: string]: OpenAPI2PathResponse };
  'x-kubernetes-action'?: 'get' | "connect" | "delete" | "deletecollection" | "get" | "list" | "patch" | "post" | "put" | "watch" | "watchlist",
  'x-kubernetes-group-version-kind'?: GroupVersionKind;
}
export interface OpenAPI2PathResponse {
  description?: string;
  schema?: OpenAPI2SchemaObject;
}

export interface GroupVersionKind {
  group: string;
  kind: string;
  version: string;
}
