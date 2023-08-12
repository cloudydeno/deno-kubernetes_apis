// Autogenerated Schema file for AdmissionregistrationV1
import * as c from "../../common.ts";

import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** MatchCondition represents a condition which must by fulfilled for a request to be sent to a webhook. */
export interface MatchCondition {
  expression: string;
  name: string;
}
export function toMatchCondition(input: c.JSONValue): MatchCondition {
  const obj = c.checkObj(input);
  return {
    expression: c.checkStr(obj["expression"]),
    name: c.checkStr(obj["name"]),
  }}
export function fromMatchCondition(input: MatchCondition): c.JSONValue {
  return {
    ...input,
  }}

/** MutatingWebhook describes an admission webhook and the resources and operations it applies to. */
export interface MutatingWebhook {
  admissionReviewVersions: Array<string>;
  clientConfig: WebhookClientConfig;
  failurePolicy?: string | null;
  matchConditions?: Array<MatchCondition> | null;
  matchPolicy?: string | null;
  name: string;
  namespaceSelector?: MetaV1.LabelSelector | null;
  objectSelector?: MetaV1.LabelSelector | null;
  reinvocationPolicy?: string | null;
  rules?: Array<RuleWithOperations> | null;
  sideEffects: string;
  timeoutSeconds?: number | null;
}
export function toMutatingWebhook(input: c.JSONValue): MutatingWebhook {
  const obj = c.checkObj(input);
  return {
    admissionReviewVersions: c.readList(obj["admissionReviewVersions"], c.checkStr),
    clientConfig: toWebhookClientConfig(obj["clientConfig"]),
    failurePolicy: c.readOpt(obj["failurePolicy"], c.checkStr),
    matchConditions: c.readOpt(obj["matchConditions"], x => c.readList(x, toMatchCondition)),
    matchPolicy: c.readOpt(obj["matchPolicy"], c.checkStr),
    name: c.checkStr(obj["name"]),
    namespaceSelector: c.readOpt(obj["namespaceSelector"], MetaV1.toLabelSelector),
    objectSelector: c.readOpt(obj["objectSelector"], MetaV1.toLabelSelector),
    reinvocationPolicy: c.readOpt(obj["reinvocationPolicy"], c.checkStr),
    rules: c.readOpt(obj["rules"], x => c.readList(x, toRuleWithOperations)),
    sideEffects: c.checkStr(obj["sideEffects"]),
    timeoutSeconds: c.readOpt(obj["timeoutSeconds"], c.checkNum),
  }}
export function fromMutatingWebhook(input: MutatingWebhook): c.JSONValue {
  return {
    ...input,
    clientConfig: input.clientConfig != null ? fromWebhookClientConfig(input.clientConfig) : undefined,
    matchConditions: input.matchConditions?.map(fromMatchCondition),
    namespaceSelector: input.namespaceSelector != null ? MetaV1.fromLabelSelector(input.namespaceSelector) : undefined,
    objectSelector: input.objectSelector != null ? MetaV1.fromLabelSelector(input.objectSelector) : undefined,
    rules: input.rules?.map(fromRuleWithOperations),
  }}

/** WebhookClientConfig contains the information to make a TLS connection with the webhook */
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

/** RuleWithOperations is a tuple of Operations and Resources. It is recommended to make sure that all the tuple expansions are valid. */
export interface RuleWithOperations {
  apiGroups?: Array<string> | null;
  apiVersions?: Array<string> | null;
  operations?: Array<string> | null;
  resources?: Array<string> | null;
  scope?: string | null;
}
export function toRuleWithOperations(input: c.JSONValue): RuleWithOperations {
  const obj = c.checkObj(input);
  return {
    apiGroups: c.readOpt(obj["apiGroups"], x => c.readList(x, c.checkStr)),
    apiVersions: c.readOpt(obj["apiVersions"], x => c.readList(x, c.checkStr)),
    operations: c.readOpt(obj["operations"], x => c.readList(x, c.checkStr)),
    resources: c.readOpt(obj["resources"], x => c.readList(x, c.checkStr)),
    scope: c.readOpt(obj["scope"], c.checkStr),
  }}
export function fromRuleWithOperations(input: RuleWithOperations): c.JSONValue {
  return {
    ...input,
  }}

/** MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object. */
export interface MutatingWebhookConfiguration {
  apiVersion?: "admissionregistration.k8s.io/v1";
  kind?: "MutatingWebhookConfiguration";
  metadata?: MetaV1.ObjectMeta | null;
  webhooks?: Array<MutatingWebhook> | null;
}
export function toMutatingWebhookConfiguration(input: c.JSONValue): MutatingWebhookConfiguration & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "admissionregistration.k8s.io/v1", "MutatingWebhookConfiguration"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    webhooks: c.readOpt(obj["webhooks"], x => c.readList(x, toMutatingWebhook)),
  }}
export function fromMutatingWebhookConfiguration(input: MutatingWebhookConfiguration): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "admissionregistration.k8s.io/v1", "MutatingWebhookConfiguration"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    webhooks: input.webhooks?.map(fromMutatingWebhook),
  }}

/** MutatingWebhookConfigurationList is a list of MutatingWebhookConfiguration. */
export interface MutatingWebhookConfigurationList extends ListOf<MutatingWebhookConfiguration> {
  apiVersion?: "admissionregistration.k8s.io/v1";
  kind?: "MutatingWebhookConfigurationList";
};
export function toMutatingWebhookConfigurationList(input: c.JSONValue): MutatingWebhookConfigurationList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "admissionregistration.k8s.io/v1", "MutatingWebhookConfigurationList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toMutatingWebhookConfiguration),
  }}

/** ValidatingWebhook describes an admission webhook and the resources and operations it applies to. */
export interface ValidatingWebhook {
  admissionReviewVersions: Array<string>;
  clientConfig: WebhookClientConfig;
  failurePolicy?: string | null;
  matchConditions?: Array<MatchCondition> | null;
  matchPolicy?: string | null;
  name: string;
  namespaceSelector?: MetaV1.LabelSelector | null;
  objectSelector?: MetaV1.LabelSelector | null;
  rules?: Array<RuleWithOperations> | null;
  sideEffects: string;
  timeoutSeconds?: number | null;
}
export function toValidatingWebhook(input: c.JSONValue): ValidatingWebhook {
  const obj = c.checkObj(input);
  return {
    admissionReviewVersions: c.readList(obj["admissionReviewVersions"], c.checkStr),
    clientConfig: toWebhookClientConfig(obj["clientConfig"]),
    failurePolicy: c.readOpt(obj["failurePolicy"], c.checkStr),
    matchConditions: c.readOpt(obj["matchConditions"], x => c.readList(x, toMatchCondition)),
    matchPolicy: c.readOpt(obj["matchPolicy"], c.checkStr),
    name: c.checkStr(obj["name"]),
    namespaceSelector: c.readOpt(obj["namespaceSelector"], MetaV1.toLabelSelector),
    objectSelector: c.readOpt(obj["objectSelector"], MetaV1.toLabelSelector),
    rules: c.readOpt(obj["rules"], x => c.readList(x, toRuleWithOperations)),
    sideEffects: c.checkStr(obj["sideEffects"]),
    timeoutSeconds: c.readOpt(obj["timeoutSeconds"], c.checkNum),
  }}
export function fromValidatingWebhook(input: ValidatingWebhook): c.JSONValue {
  return {
    ...input,
    clientConfig: input.clientConfig != null ? fromWebhookClientConfig(input.clientConfig) : undefined,
    matchConditions: input.matchConditions?.map(fromMatchCondition),
    namespaceSelector: input.namespaceSelector != null ? MetaV1.fromLabelSelector(input.namespaceSelector) : undefined,
    objectSelector: input.objectSelector != null ? MetaV1.fromLabelSelector(input.objectSelector) : undefined,
    rules: input.rules?.map(fromRuleWithOperations),
  }}

/** ValidatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and object without changing it. */
export interface ValidatingWebhookConfiguration {
  apiVersion?: "admissionregistration.k8s.io/v1";
  kind?: "ValidatingWebhookConfiguration";
  metadata?: MetaV1.ObjectMeta | null;
  webhooks?: Array<ValidatingWebhook> | null;
}
export function toValidatingWebhookConfiguration(input: c.JSONValue): ValidatingWebhookConfiguration & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "admissionregistration.k8s.io/v1", "ValidatingWebhookConfiguration"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    webhooks: c.readOpt(obj["webhooks"], x => c.readList(x, toValidatingWebhook)),
  }}
export function fromValidatingWebhookConfiguration(input: ValidatingWebhookConfiguration): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "admissionregistration.k8s.io/v1", "ValidatingWebhookConfiguration"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    webhooks: input.webhooks?.map(fromValidatingWebhook),
  }}

/** ValidatingWebhookConfigurationList is a list of ValidatingWebhookConfiguration. */
export interface ValidatingWebhookConfigurationList extends ListOf<ValidatingWebhookConfiguration> {
  apiVersion?: "admissionregistration.k8s.io/v1";
  kind?: "ValidatingWebhookConfigurationList";
};
export function toValidatingWebhookConfigurationList(input: c.JSONValue): ValidatingWebhookConfigurationList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "admissionregistration.k8s.io/v1", "ValidatingWebhookConfigurationList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toValidatingWebhookConfiguration),
  }}
