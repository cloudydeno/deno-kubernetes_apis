// Autogenerated Schema file for ApiextensionsV1
import * as c from "../../common.ts";

import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** CustomResourceColumnDefinition specifies a column for server side printing. */
export interface CustomResourceColumnDefinition {
  description?: string | null;
  format?: string | null;
  jsonPath: string;
  name: string;
  priority?: number | null;
  type: string;
}
export function toCustomResourceColumnDefinition(input: c.JSONValue): CustomResourceColumnDefinition {
  const obj = c.checkObj(input);
  return {
    description: c.readOpt(obj["description"], c.checkStr),
    format: c.readOpt(obj["format"], c.checkStr),
    jsonPath: c.checkStr(obj["jsonPath"]),
    name: c.checkStr(obj["name"]),
    priority: c.readOpt(obj["priority"], c.checkNum),
    type: c.checkStr(obj["type"]),
  }}
export function fromCustomResourceColumnDefinition(input: CustomResourceColumnDefinition): c.JSONValue {
  return {
    ...input,
  }}

/** CustomResourceConversion describes how to convert different versions of a CR. */
export interface CustomResourceConversion {
  strategy: string;
  webhook?: WebhookConversion | null;
}
export function toCustomResourceConversion(input: c.JSONValue): CustomResourceConversion {
  const obj = c.checkObj(input);
  return {
    strategy: c.checkStr(obj["strategy"]),
    webhook: c.readOpt(obj["webhook"], toWebhookConversion),
  }}
export function fromCustomResourceConversion(input: CustomResourceConversion): c.JSONValue {
  return {
    ...input,
    webhook: input.webhook != null ? fromWebhookConversion(input.webhook) : undefined,
  }}

/** WebhookConversion describes how to call a conversion webhook */
export interface WebhookConversion {
  clientConfig?: WebhookClientConfig | null;
  conversionReviewVersions: Array<string>;
}
export function toWebhookConversion(input: c.JSONValue): WebhookConversion {
  const obj = c.checkObj(input);
  return {
    clientConfig: c.readOpt(obj["clientConfig"], toWebhookClientConfig),
    conversionReviewVersions: c.readList(obj["conversionReviewVersions"], c.checkStr),
  }}
export function fromWebhookConversion(input: WebhookConversion): c.JSONValue {
  return {
    ...input,
    clientConfig: input.clientConfig != null ? fromWebhookClientConfig(input.clientConfig) : undefined,
  }}

/** WebhookClientConfig contains the information to make a TLS connection with the webhook. */
export interface WebhookClientConfig {
  caBundle?: string | null;
  service?: ServiceReference | null;
  url?: string | null;
}
export function toWebhookClientConfig(input: c.JSONValue): WebhookClientConfig {
  const obj = c.checkObj(input);
  return {
    caBundle: c.readOpt(obj["caBundle"], c.checkStr),
    service: c.readOpt(obj["service"], toServiceReference),
    url: c.readOpt(obj["url"], c.checkStr),
  }}
export function fromWebhookClientConfig(input: WebhookClientConfig): c.JSONValue {
  return {
    ...input,
    service: input.service != null ? fromServiceReference(input.service) : undefined,
  }}

/** ServiceReference holds a reference to Service.legacy.k8s.io */
export interface ServiceReference {
  name: string;
  namespace: string;
  path?: string | null;
  port?: number | null;
}
export function toServiceReference(input: c.JSONValue): ServiceReference {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
    namespace: c.checkStr(obj["namespace"]),
    path: c.readOpt(obj["path"], c.checkStr),
    port: c.readOpt(obj["port"], c.checkNum),
  }}
export function fromServiceReference(input: ServiceReference): c.JSONValue {
  return {
    ...input,
  }}

/** CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>. */
export interface CustomResourceDefinition {
  apiVersion?: "apiextensions.k8s.io/v1";
  kind?: "CustomResourceDefinition";
  metadata?: MetaV1.ObjectMeta | null;
  spec: CustomResourceDefinitionSpec;
  status?: CustomResourceDefinitionStatus | null;
}
export function toCustomResourceDefinition(input: c.JSONValue): CustomResourceDefinition & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "apiextensions.k8s.io/v1", "CustomResourceDefinition"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toCustomResourceDefinitionSpec(obj["spec"]),
    status: c.readOpt(obj["status"], toCustomResourceDefinitionStatus),
  }}
export function fromCustomResourceDefinition(input: CustomResourceDefinition): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "apiextensions.k8s.io/v1", "CustomResourceDefinition"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromCustomResourceDefinitionSpec(input.spec) : undefined,
    status: input.status != null ? fromCustomResourceDefinitionStatus(input.status) : undefined,
  }}

/** CustomResourceDefinitionSpec describes how a user wants their resource to appear */
export interface CustomResourceDefinitionSpec {
  conversion?: CustomResourceConversion | null;
  group: string;
  names: CustomResourceDefinitionNames;
  preserveUnknownFields?: boolean | null;
  scope: string;
  versions: Array<CustomResourceDefinitionVersion>;
}
export function toCustomResourceDefinitionSpec(input: c.JSONValue): CustomResourceDefinitionSpec {
  const obj = c.checkObj(input);
  return {
    conversion: c.readOpt(obj["conversion"], toCustomResourceConversion),
    group: c.checkStr(obj["group"]),
    names: toCustomResourceDefinitionNames(obj["names"]),
    preserveUnknownFields: c.readOpt(obj["preserveUnknownFields"], c.checkBool),
    scope: c.checkStr(obj["scope"]),
    versions: c.readList(obj["versions"], toCustomResourceDefinitionVersion),
  }}
export function fromCustomResourceDefinitionSpec(input: CustomResourceDefinitionSpec): c.JSONValue {
  return {
    ...input,
    conversion: input.conversion != null ? fromCustomResourceConversion(input.conversion) : undefined,
    names: input.names != null ? fromCustomResourceDefinitionNames(input.names) : undefined,
    versions: input.versions?.map(fromCustomResourceDefinitionVersion),
  }}

/** CustomResourceDefinitionNames indicates the names to serve this CustomResourceDefinition */
export interface CustomResourceDefinitionNames {
  categories?: Array<string> | null;
  kind: string;
  listKind?: string | null;
  plural: string;
  shortNames?: Array<string> | null;
  singular?: string | null;
}
export function toCustomResourceDefinitionNames(input: c.JSONValue): CustomResourceDefinitionNames {
  const obj = c.checkObj(input);
  return {
    categories: c.readOpt(obj["categories"], x => c.readList(x, c.checkStr)),
    kind: c.checkStr(obj["kind"]),
    listKind: c.readOpt(obj["listKind"], c.checkStr),
    plural: c.checkStr(obj["plural"]),
    shortNames: c.readOpt(obj["shortNames"], x => c.readList(x, c.checkStr)),
    singular: c.readOpt(obj["singular"], c.checkStr),
  }}
export function fromCustomResourceDefinitionNames(input: CustomResourceDefinitionNames): c.JSONValue {
  return {
    ...input,
  }}

/** CustomResourceDefinitionVersion describes a version for CRD. */
export interface CustomResourceDefinitionVersion {
  additionalPrinterColumns?: Array<CustomResourceColumnDefinition> | null;
  deprecated?: boolean | null;
  deprecationWarning?: string | null;
  name: string;
  schema?: CustomResourceValidation | null;
  served: boolean;
  storage: boolean;
  subresources?: CustomResourceSubresources | null;
}
export function toCustomResourceDefinitionVersion(input: c.JSONValue): CustomResourceDefinitionVersion {
  const obj = c.checkObj(input);
  return {
    additionalPrinterColumns: c.readOpt(obj["additionalPrinterColumns"], x => c.readList(x, toCustomResourceColumnDefinition)),
    deprecated: c.readOpt(obj["deprecated"], c.checkBool),
    deprecationWarning: c.readOpt(obj["deprecationWarning"], c.checkStr),
    name: c.checkStr(obj["name"]),
    schema: c.readOpt(obj["schema"], toCustomResourceValidation),
    served: c.checkBool(obj["served"]),
    storage: c.checkBool(obj["storage"]),
    subresources: c.readOpt(obj["subresources"], toCustomResourceSubresources),
  }}
export function fromCustomResourceDefinitionVersion(input: CustomResourceDefinitionVersion): c.JSONValue {
  return {
    ...input,
    additionalPrinterColumns: input.additionalPrinterColumns?.map(fromCustomResourceColumnDefinition),
    schema: input.schema != null ? fromCustomResourceValidation(input.schema) : undefined,
    subresources: input.subresources != null ? fromCustomResourceSubresources(input.subresources) : undefined,
  }}

/** CustomResourceValidation is a list of validation methods for CustomResources. */
export interface CustomResourceValidation {
  openAPIV3Schema?: JSONSchemaProps | null;
}
export function toCustomResourceValidation(input: c.JSONValue): CustomResourceValidation {
  const obj = c.checkObj(input);
  return {
    openAPIV3Schema: c.readOpt(obj["openAPIV3Schema"], toJSONSchemaProps),
  }}
export function fromCustomResourceValidation(input: CustomResourceValidation): c.JSONValue {
  return {
    ...input,
    openAPIV3Schema: input.openAPIV3Schema != null ? fromJSONSchemaProps(input.openAPIV3Schema) : undefined,
  }}

/** JSONSchemaProps is a JSON-Schema following Specification Draft 4 (http://json-schema.org/). */
export interface JSONSchemaProps {
  $ref?: string | null;
  $schema?: string | null;
  additionalItems?: JSONSchemaPropsOrBool | null;
  additionalProperties?: JSONSchemaPropsOrBool | null;
  allOf?: Array<JSONSchemaProps> | null;
  anyOf?: Array<JSONSchemaProps> | null;
  default?: JSON | null;
  definitions?: Record<string,JSONSchemaProps> | null;
  dependencies?: Record<string,JSONSchemaPropsOrStringArray> | null;
  description?: string | null;
  enum?: Array<JSON> | null;
  example?: JSON | null;
  exclusiveMaximum?: boolean | null;
  exclusiveMinimum?: boolean | null;
  externalDocs?: ExternalDocumentation | null;
  format?: string | null;
  id?: string | null;
  items?: JSONSchemaPropsOrArray | null;
  maxItems?: number | null;
  maxLength?: number | null;
  maxProperties?: number | null;
  maximum?: number | null;
  minItems?: number | null;
  minLength?: number | null;
  minProperties?: number | null;
  minimum?: number | null;
  multipleOf?: number | null;
  not?: JSONSchemaProps | null;
  nullable?: boolean | null;
  oneOf?: Array<JSONSchemaProps> | null;
  pattern?: string | null;
  patternProperties?: Record<string,JSONSchemaProps> | null;
  properties?: Record<string,JSONSchemaProps> | null;
  required?: Array<string> | null;
  title?: string | null;
  type?: string | null;
  uniqueItems?: boolean | null;
  'x-kubernetes-embedded-resource'?: boolean | null;
  'x-kubernetes-int-or-string'?: boolean | null;
  'x-kubernetes-list-map-keys'?: Array<string> | null;
  'x-kubernetes-list-type'?: string | null;
  'x-kubernetes-map-type'?: string | null;
  'x-kubernetes-preserve-unknown-fields'?: boolean | null;
  'x-kubernetes-validations'?: Array<ValidationRule> | null;
}
export function toJSONSchemaProps(input: c.JSONValue): JSONSchemaProps {
  const obj = c.checkObj(input);
  return {
    $ref: c.readOpt(obj["$ref"], c.checkStr),
    $schema: c.readOpt(obj["$schema"], c.checkStr),
    additionalItems: c.readOpt(obj["additionalItems"], c.identity),
    additionalProperties: c.readOpt(obj["additionalProperties"], c.identity),
    allOf: c.readOpt(obj["allOf"], x => c.readList(x, toJSONSchemaProps)),
    anyOf: c.readOpt(obj["anyOf"], x => c.readList(x, toJSONSchemaProps)),
    default: c.readOpt(obj["default"], c.identity),
    definitions: c.readOpt(obj["definitions"], x => c.readMap(x, toJSONSchemaProps)),
    dependencies: c.readOpt(obj["dependencies"], x => c.readMap(x, c.identity)),
    description: c.readOpt(obj["description"], c.checkStr),
    enum: c.readOpt(obj["enum"], x => c.readList(x, c.identity)),
    example: c.readOpt(obj["example"], c.identity),
    exclusiveMaximum: c.readOpt(obj["exclusiveMaximum"], c.checkBool),
    exclusiveMinimum: c.readOpt(obj["exclusiveMinimum"], c.checkBool),
    externalDocs: c.readOpt(obj["externalDocs"], toExternalDocumentation),
    format: c.readOpt(obj["format"], c.checkStr),
    id: c.readOpt(obj["id"], c.checkStr),
    items: c.readOpt(obj["items"], c.identity),
    maxItems: c.readOpt(obj["maxItems"], c.checkNum),
    maxLength: c.readOpt(obj["maxLength"], c.checkNum),
    maxProperties: c.readOpt(obj["maxProperties"], c.checkNum),
    maximum: c.readOpt(obj["maximum"], c.checkNum),
    minItems: c.readOpt(obj["minItems"], c.checkNum),
    minLength: c.readOpt(obj["minLength"], c.checkNum),
    minProperties: c.readOpt(obj["minProperties"], c.checkNum),
    minimum: c.readOpt(obj["minimum"], c.checkNum),
    multipleOf: c.readOpt(obj["multipleOf"], c.checkNum),
    not: c.readOpt(obj["not"], toJSONSchemaProps),
    nullable: c.readOpt(obj["nullable"], c.checkBool),
    oneOf: c.readOpt(obj["oneOf"], x => c.readList(x, toJSONSchemaProps)),
    pattern: c.readOpt(obj["pattern"], c.checkStr),
    patternProperties: c.readOpt(obj["patternProperties"], x => c.readMap(x, toJSONSchemaProps)),
    properties: c.readOpt(obj["properties"], x => c.readMap(x, toJSONSchemaProps)),
    required: c.readOpt(obj["required"], x => c.readList(x, c.checkStr)),
    title: c.readOpt(obj["title"], c.checkStr),
    type: c.readOpt(obj["type"], c.checkStr),
    uniqueItems: c.readOpt(obj["uniqueItems"], c.checkBool),
    'x-kubernetes-embedded-resource': c.readOpt(obj["x-kubernetes-embedded-resource"], c.checkBool),
    'x-kubernetes-int-or-string': c.readOpt(obj["x-kubernetes-int-or-string"], c.checkBool),
    'x-kubernetes-list-map-keys': c.readOpt(obj["x-kubernetes-list-map-keys"], x => c.readList(x, c.checkStr)),
    'x-kubernetes-list-type': c.readOpt(obj["x-kubernetes-list-type"], c.checkStr),
    'x-kubernetes-map-type': c.readOpt(obj["x-kubernetes-map-type"], c.checkStr),
    'x-kubernetes-preserve-unknown-fields': c.readOpt(obj["x-kubernetes-preserve-unknown-fields"], c.checkBool),
    'x-kubernetes-validations': c.readOpt(obj["x-kubernetes-validations"], x => c.readList(x, toValidationRule)),
  }}
export function fromJSONSchemaProps(input: JSONSchemaProps): c.JSONValue {
  return {
    ...input,
    allOf: input.allOf?.map(fromJSONSchemaProps),
    anyOf: input.anyOf?.map(fromJSONSchemaProps),
    definitions: c.writeMap(input.definitions, fromJSONSchemaProps),
    externalDocs: input.externalDocs != null ? fromExternalDocumentation(input.externalDocs) : undefined,
    not: input.not != null ? fromJSONSchemaProps(input.not) : undefined,
    oneOf: input.oneOf?.map(fromJSONSchemaProps),
    patternProperties: c.writeMap(input.patternProperties, fromJSONSchemaProps),
    properties: c.writeMap(input.properties, fromJSONSchemaProps),
    'x-kubernetes-validations': input['x-kubernetes-validations']?.map(fromValidationRule),
  }}

/** JSONSchemaPropsOrBool represents JSONSchemaProps or a boolean value. Defaults to true for the boolean property. */
export type JSONSchemaPropsOrBool = c.JSONValue;

/** JSON represents any valid JSON value. These types are supported: bool, int64, float64, string, []interface{}, map[string]interface{} and nil. */
export type JSON = c.JSONValue;

/** JSONSchemaPropsOrStringArray represents a JSONSchemaProps or a string array. */
export type JSONSchemaPropsOrStringArray = c.JSONValue;

/** ExternalDocumentation allows referencing an external resource for extended documentation. */
export interface ExternalDocumentation {
  description?: string | null;
  url?: string | null;
}
export function toExternalDocumentation(input: c.JSONValue): ExternalDocumentation {
  const obj = c.checkObj(input);
  return {
    description: c.readOpt(obj["description"], c.checkStr),
    url: c.readOpt(obj["url"], c.checkStr),
  }}
export function fromExternalDocumentation(input: ExternalDocumentation): c.JSONValue {
  return {
    ...input,
  }}

/** JSONSchemaPropsOrArray represents a value that can either be a JSONSchemaProps or an array of JSONSchemaProps. Mainly here for serialization purposes. */
export type JSONSchemaPropsOrArray = c.JSONValue;

/** ValidationRule describes a validation rule written in the CEL expression language. */
export interface ValidationRule {
  message?: string | null;
  messageExpression?: string | null;
  rule: string;
}
export function toValidationRule(input: c.JSONValue): ValidationRule {
  const obj = c.checkObj(input);
  return {
    message: c.readOpt(obj["message"], c.checkStr),
    messageExpression: c.readOpt(obj["messageExpression"], c.checkStr),
    rule: c.checkStr(obj["rule"]),
  }}
export function fromValidationRule(input: ValidationRule): c.JSONValue {
  return {
    ...input,
  }}

/** CustomResourceSubresources defines the status and scale subresources for CustomResources. */
export interface CustomResourceSubresources {
  scale?: CustomResourceSubresourceScale | null;
  status?: CustomResourceSubresourceStatus | null;
}
export function toCustomResourceSubresources(input: c.JSONValue): CustomResourceSubresources {
  const obj = c.checkObj(input);
  return {
    scale: c.readOpt(obj["scale"], toCustomResourceSubresourceScale),
    status: c.readOpt(obj["status"], toCustomResourceSubresourceStatus),
  }}
export function fromCustomResourceSubresources(input: CustomResourceSubresources): c.JSONValue {
  return {
    ...input,
    scale: input.scale != null ? fromCustomResourceSubresourceScale(input.scale) : undefined,
    status: input.status != null ? fromCustomResourceSubresourceStatus(input.status) : undefined,
  }}

/** CustomResourceSubresourceScale defines how to serve the scale subresource for CustomResources. */
export interface CustomResourceSubresourceScale {
  labelSelectorPath?: string | null;
  specReplicasPath: string;
  statusReplicasPath: string;
}
export function toCustomResourceSubresourceScale(input: c.JSONValue): CustomResourceSubresourceScale {
  const obj = c.checkObj(input);
  return {
    labelSelectorPath: c.readOpt(obj["labelSelectorPath"], c.checkStr),
    specReplicasPath: c.checkStr(obj["specReplicasPath"]),
    statusReplicasPath: c.checkStr(obj["statusReplicasPath"]),
  }}
export function fromCustomResourceSubresourceScale(input: CustomResourceSubresourceScale): c.JSONValue {
  return {
    ...input,
  }}

/** CustomResourceSubresourceStatus defines how to serve the status subresource for CustomResources. Status is represented by the `.status` JSON path inside of a CustomResource. When set, * exposes a /status subresource for the custom resource * PUT requests to the /status subresource take a custom resource object, and ignore changes to anything except the status stanza * PUT/POST/PATCH requests to the custom resource ignore changes to the status stanza */
export interface CustomResourceSubresourceStatus {
}
export function toCustomResourceSubresourceStatus(input: c.JSONValue): CustomResourceSubresourceStatus {
  const obj = c.checkObj(input);
  return {
  }}
export function fromCustomResourceSubresourceStatus(input: CustomResourceSubresourceStatus): c.JSONValue {
  return {
    ...input,
  }}

/** CustomResourceDefinitionStatus indicates the state of the CustomResourceDefinition */
export interface CustomResourceDefinitionStatus {
  acceptedNames?: CustomResourceDefinitionNames | null;
  conditions?: Array<CustomResourceDefinitionCondition> | null;
  storedVersions?: Array<string> | null;
}
export function toCustomResourceDefinitionStatus(input: c.JSONValue): CustomResourceDefinitionStatus {
  const obj = c.checkObj(input);
  return {
    acceptedNames: c.readOpt(obj["acceptedNames"], toCustomResourceDefinitionNames),
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, toCustomResourceDefinitionCondition)),
    storedVersions: c.readOpt(obj["storedVersions"], x => c.readList(x, c.checkStr)),
  }}
export function fromCustomResourceDefinitionStatus(input: CustomResourceDefinitionStatus): c.JSONValue {
  return {
    ...input,
    acceptedNames: input.acceptedNames != null ? fromCustomResourceDefinitionNames(input.acceptedNames) : undefined,
    conditions: input.conditions?.map(fromCustomResourceDefinitionCondition),
  }}

/** CustomResourceDefinitionCondition contains details for the current condition of this pod. */
export interface CustomResourceDefinitionCondition {
  lastTransitionTime?: c.Time | null;
  message?: string | null;
  reason?: string | null;
  status: string;
  type: string;
}
export function toCustomResourceDefinitionCondition(input: c.JSONValue): CustomResourceDefinitionCondition {
  const obj = c.checkObj(input);
  return {
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    status: c.checkStr(obj["status"]),
    type: c.checkStr(obj["type"]),
  }}
export function fromCustomResourceDefinitionCondition(input: CustomResourceDefinitionCondition): c.JSONValue {
  return {
    ...input,
    lastTransitionTime: input.lastTransitionTime != null ? c.fromTime(input.lastTransitionTime) : undefined,
  }}

/** CustomResourceDefinitionList is a list of CustomResourceDefinition objects. */
export interface CustomResourceDefinitionList extends ListOf<CustomResourceDefinition> {
  apiVersion?: "apiextensions.k8s.io/v1";
  kind?: "CustomResourceDefinitionList";
};
export function toCustomResourceDefinitionList(input: c.JSONValue): CustomResourceDefinitionList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "apiextensions.k8s.io/v1", "CustomResourceDefinitionList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toCustomResourceDefinition),
  }}
