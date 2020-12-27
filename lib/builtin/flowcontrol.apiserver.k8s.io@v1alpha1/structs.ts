// Autogenerated Schema file for FlowcontrolApiserverV1alpha1
import * as c from "../../common.ts";

import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** FlowDistinguisherMethod specifies the method of a flow distinguisher. */
export interface FlowDistinguisherMethod {
  type: string;
}
export function toFlowDistinguisherMethod(input: c.JSONValue): FlowDistinguisherMethod {
  const obj = c.checkObj(input);
  return {
    type: c.checkStr(obj["type"]),
  }}
export function fromFlowDistinguisherMethod(input: FlowDistinguisherMethod): c.JSONValue {
  return {
    ...input,
  }}

/** FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher". */
export interface FlowSchema {
  apiVersion?: "flowcontrol.apiserver.k8s.io/v1alpha1";
  kind?: "FlowSchema";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: FlowSchemaSpec | null;
  status?: FlowSchemaStatus | null;
}
export function toFlowSchema(input: c.JSONValue): FlowSchema & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "flowcontrol.apiserver.k8s.io/v1alpha1", "FlowSchema"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toFlowSchemaSpec),
    status: c.readOpt(obj["status"], toFlowSchemaStatus),
  }}
export function fromFlowSchema(input: FlowSchema): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "flowcontrol.apiserver.k8s.io/v1alpha1", "FlowSchema"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromFlowSchemaSpec(input.spec) : undefined,
    status: input.status != null ? fromFlowSchemaStatus(input.status) : undefined,
  }}

/** FlowSchemaSpec describes how the FlowSchema's specification looks like. */
export interface FlowSchemaSpec {
  distinguisherMethod?: FlowDistinguisherMethod | null;
  matchingPrecedence?: number | null;
  priorityLevelConfiguration: PriorityLevelConfigurationReference;
  rules?: Array<PolicyRulesWithSubjects> | null;
}
export function toFlowSchemaSpec(input: c.JSONValue): FlowSchemaSpec {
  const obj = c.checkObj(input);
  return {
    distinguisherMethod: c.readOpt(obj["distinguisherMethod"], toFlowDistinguisherMethod),
    matchingPrecedence: c.readOpt(obj["matchingPrecedence"], c.checkNum),
    priorityLevelConfiguration: toPriorityLevelConfigurationReference(obj["priorityLevelConfiguration"]),
    rules: c.readOpt(obj["rules"], x => c.readList(x, toPolicyRulesWithSubjects)),
  }}
export function fromFlowSchemaSpec(input: FlowSchemaSpec): c.JSONValue {
  return {
    ...input,
    distinguisherMethod: input.distinguisherMethod != null ? fromFlowDistinguisherMethod(input.distinguisherMethod) : undefined,
    priorityLevelConfiguration: input.priorityLevelConfiguration != null ? fromPriorityLevelConfigurationReference(input.priorityLevelConfiguration) : undefined,
    rules: input.rules?.map(fromPolicyRulesWithSubjects),
  }}

/** PriorityLevelConfigurationReference contains information that points to the "request-priority" being used. */
export interface PriorityLevelConfigurationReference {
  name: string;
}
export function toPriorityLevelConfigurationReference(input: c.JSONValue): PriorityLevelConfigurationReference {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
  }}
export function fromPriorityLevelConfigurationReference(input: PriorityLevelConfigurationReference): c.JSONValue {
  return {
    ...input,
  }}

/** PolicyRulesWithSubjects prescribes a test that applies to a request to an apiserver. The test considers the subject making the request, the verb being requested, and the resource to be acted upon. This PolicyRulesWithSubjects matches a request if and only if both (a) at least one member of subjects matches the request and (b) at least one member of resourceRules or nonResourceRules matches the request. */
export interface PolicyRulesWithSubjects {
  nonResourceRules?: Array<NonResourcePolicyRule> | null;
  resourceRules?: Array<ResourcePolicyRule> | null;
  subjects: Array<Subject>;
}
export function toPolicyRulesWithSubjects(input: c.JSONValue): PolicyRulesWithSubjects {
  const obj = c.checkObj(input);
  return {
    nonResourceRules: c.readOpt(obj["nonResourceRules"], x => c.readList(x, toNonResourcePolicyRule)),
    resourceRules: c.readOpt(obj["resourceRules"], x => c.readList(x, toResourcePolicyRule)),
    subjects: c.readList(obj["subjects"], toSubject),
  }}
export function fromPolicyRulesWithSubjects(input: PolicyRulesWithSubjects): c.JSONValue {
  return {
    ...input,
    nonResourceRules: input.nonResourceRules?.map(fromNonResourcePolicyRule),
    resourceRules: input.resourceRules?.map(fromResourcePolicyRule),
    subjects: input.subjects?.map(fromSubject),
  }}

/** NonResourcePolicyRule is a predicate that matches non-resource requests according to their verb and the target non-resource URL. A NonResourcePolicyRule matches a request if and only if both (a) at least one member of verbs matches the request and (b) at least one member of nonResourceURLs matches the request. */
export interface NonResourcePolicyRule {
  nonResourceURLs: Array<string>;
  verbs: Array<string>;
}
export function toNonResourcePolicyRule(input: c.JSONValue): NonResourcePolicyRule {
  const obj = c.checkObj(input);
  return {
    nonResourceURLs: c.readList(obj["nonResourceURLs"], c.checkStr),
    verbs: c.readList(obj["verbs"], c.checkStr),
  }}
export function fromNonResourcePolicyRule(input: NonResourcePolicyRule): c.JSONValue {
  return {
    ...input,
  }}

/** ResourcePolicyRule is a predicate that matches some resource requests, testing the request's verb and the target resource. A ResourcePolicyRule matches a resource request if and only if: (a) at least one member of verbs matches the request, (b) at least one member of apiGroups matches the request, (c) at least one member of resources matches the request, and (d) least one member of namespaces matches the request. */
export interface ResourcePolicyRule {
  apiGroups: Array<string>;
  clusterScope?: boolean | null;
  namespaces?: Array<string> | null;
  resources: Array<string>;
  verbs: Array<string>;
}
export function toResourcePolicyRule(input: c.JSONValue): ResourcePolicyRule {
  const obj = c.checkObj(input);
  return {
    apiGroups: c.readList(obj["apiGroups"], c.checkStr),
    clusterScope: c.readOpt(obj["clusterScope"], c.checkBool),
    namespaces: c.readOpt(obj["namespaces"], x => c.readList(x, c.checkStr)),
    resources: c.readList(obj["resources"], c.checkStr),
    verbs: c.readList(obj["verbs"], c.checkStr),
  }}
export function fromResourcePolicyRule(input: ResourcePolicyRule): c.JSONValue {
  return {
    ...input,
  }}

/** Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account. */
export interface Subject {
  group?: GroupSubject | null;
  kind: string;
  serviceAccount?: ServiceAccountSubject | null;
  user?: UserSubject | null;
}
export function toSubject(input: c.JSONValue): Subject {
  const obj = c.checkObj(input);
  return {
    group: c.readOpt(obj["group"], toGroupSubject),
    kind: c.checkStr(obj["kind"]),
    serviceAccount: c.readOpt(obj["serviceAccount"], toServiceAccountSubject),
    user: c.readOpt(obj["user"], toUserSubject),
  }}
export function fromSubject(input: Subject): c.JSONValue {
  return {
    ...input,
    group: input.group != null ? fromGroupSubject(input.group) : undefined,
    serviceAccount: input.serviceAccount != null ? fromServiceAccountSubject(input.serviceAccount) : undefined,
    user: input.user != null ? fromUserSubject(input.user) : undefined,
  }}

/** GroupSubject holds detailed information for group-kind subject. */
export interface GroupSubject {
  name: string;
}
export function toGroupSubject(input: c.JSONValue): GroupSubject {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
  }}
export function fromGroupSubject(input: GroupSubject): c.JSONValue {
  return {
    ...input,
  }}

/** ServiceAccountSubject holds detailed information for service-account-kind subject. */
export interface ServiceAccountSubject {
  name: string;
  namespace: string;
}
export function toServiceAccountSubject(input: c.JSONValue): ServiceAccountSubject {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
    namespace: c.checkStr(obj["namespace"]),
  }}
export function fromServiceAccountSubject(input: ServiceAccountSubject): c.JSONValue {
  return {
    ...input,
  }}

/** UserSubject holds detailed information for user-kind subject. */
export interface UserSubject {
  name: string;
}
export function toUserSubject(input: c.JSONValue): UserSubject {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
  }}
export function fromUserSubject(input: UserSubject): c.JSONValue {
  return {
    ...input,
  }}

/** FlowSchemaStatus represents the current state of a FlowSchema. */
export interface FlowSchemaStatus {
  conditions?: Array<FlowSchemaCondition> | null;
}
export function toFlowSchemaStatus(input: c.JSONValue): FlowSchemaStatus {
  const obj = c.checkObj(input);
  return {
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, toFlowSchemaCondition)),
  }}
export function fromFlowSchemaStatus(input: FlowSchemaStatus): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions?.map(fromFlowSchemaCondition),
  }}

/** FlowSchemaCondition describes conditions for a FlowSchema. */
export interface FlowSchemaCondition {
  lastTransitionTime?: c.Time | null;
  message?: string | null;
  reason?: string | null;
  status?: string | null;
  type?: string | null;
}
export function toFlowSchemaCondition(input: c.JSONValue): FlowSchemaCondition {
  const obj = c.checkObj(input);
  return {
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    status: c.readOpt(obj["status"], c.checkStr),
    type: c.readOpt(obj["type"], c.checkStr),
  }}
export function fromFlowSchemaCondition(input: FlowSchemaCondition): c.JSONValue {
  return {
    ...input,
    lastTransitionTime: input.lastTransitionTime != null ? c.fromTime(input.lastTransitionTime) : undefined,
  }}

/** FlowSchemaList is a list of FlowSchema objects. */
export interface FlowSchemaList extends ListOf<FlowSchema> {
  apiVersion?: "flowcontrol.apiserver.k8s.io/v1alpha1";
  kind?: "FlowSchemaList";
};
export function toFlowSchemaList(input: c.JSONValue): FlowSchemaList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "flowcontrol.apiserver.k8s.io/v1alpha1", "FlowSchemaList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toFlowSchema),
  }}

/** LimitResponse defines how to handle requests that can not be executed right now. */
export interface LimitResponse {
  queuing?: QueuingConfiguration | null;
  type: string;
}
export function toLimitResponse(input: c.JSONValue): LimitResponse {
  const obj = c.checkObj(input);
  return {
    queuing: c.readOpt(obj["queuing"], toQueuingConfiguration),
    type: c.checkStr(obj["type"]),
  }}
export function fromLimitResponse(input: LimitResponse): c.JSONValue {
  return {
    ...input,
    queuing: input.queuing != null ? fromQueuingConfiguration(input.queuing) : undefined,
  }}

/** QueuingConfiguration holds the configuration parameters for queuing */
export interface QueuingConfiguration {
  handSize?: number | null;
  queueLengthLimit?: number | null;
  queues?: number | null;
}
export function toQueuingConfiguration(input: c.JSONValue): QueuingConfiguration {
  const obj = c.checkObj(input);
  return {
    handSize: c.readOpt(obj["handSize"], c.checkNum),
    queueLengthLimit: c.readOpt(obj["queueLengthLimit"], c.checkNum),
    queues: c.readOpt(obj["queues"], c.checkNum),
  }}
export function fromQueuingConfiguration(input: QueuingConfiguration): c.JSONValue {
  return {
    ...input,
  }}

/** LimitedPriorityLevelConfiguration specifies how to handle requests that are subject to limits. It addresses two issues:
 * How are requests for this priority level limited?
 * What should be done with requests that exceed the limit? */
export interface LimitedPriorityLevelConfiguration {
  assuredConcurrencyShares?: number | null;
  limitResponse?: LimitResponse | null;
}
export function toLimitedPriorityLevelConfiguration(input: c.JSONValue): LimitedPriorityLevelConfiguration {
  const obj = c.checkObj(input);
  return {
    assuredConcurrencyShares: c.readOpt(obj["assuredConcurrencyShares"], c.checkNum),
    limitResponse: c.readOpt(obj["limitResponse"], toLimitResponse),
  }}
export function fromLimitedPriorityLevelConfiguration(input: LimitedPriorityLevelConfiguration): c.JSONValue {
  return {
    ...input,
    limitResponse: input.limitResponse != null ? fromLimitResponse(input.limitResponse) : undefined,
  }}

/** PriorityLevelConfiguration represents the configuration of a priority level. */
export interface PriorityLevelConfiguration {
  apiVersion?: "flowcontrol.apiserver.k8s.io/v1alpha1";
  kind?: "PriorityLevelConfiguration";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: PriorityLevelConfigurationSpec | null;
  status?: PriorityLevelConfigurationStatus | null;
}
export function toPriorityLevelConfiguration(input: c.JSONValue): PriorityLevelConfiguration & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "flowcontrol.apiserver.k8s.io/v1alpha1", "PriorityLevelConfiguration"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toPriorityLevelConfigurationSpec),
    status: c.readOpt(obj["status"], toPriorityLevelConfigurationStatus),
  }}
export function fromPriorityLevelConfiguration(input: PriorityLevelConfiguration): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "flowcontrol.apiserver.k8s.io/v1alpha1", "PriorityLevelConfiguration"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromPriorityLevelConfigurationSpec(input.spec) : undefined,
    status: input.status != null ? fromPriorityLevelConfigurationStatus(input.status) : undefined,
  }}

/** PriorityLevelConfigurationSpec specifies the configuration of a priority level. */
export interface PriorityLevelConfigurationSpec {
  limited?: LimitedPriorityLevelConfiguration | null;
  type: string;
}
export function toPriorityLevelConfigurationSpec(input: c.JSONValue): PriorityLevelConfigurationSpec {
  const obj = c.checkObj(input);
  return {
    limited: c.readOpt(obj["limited"], toLimitedPriorityLevelConfiguration),
    type: c.checkStr(obj["type"]),
  }}
export function fromPriorityLevelConfigurationSpec(input: PriorityLevelConfigurationSpec): c.JSONValue {
  return {
    ...input,
    limited: input.limited != null ? fromLimitedPriorityLevelConfiguration(input.limited) : undefined,
  }}

/** PriorityLevelConfigurationStatus represents the current state of a "request-priority". */
export interface PriorityLevelConfigurationStatus {
  conditions?: Array<PriorityLevelConfigurationCondition> | null;
}
export function toPriorityLevelConfigurationStatus(input: c.JSONValue): PriorityLevelConfigurationStatus {
  const obj = c.checkObj(input);
  return {
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, toPriorityLevelConfigurationCondition)),
  }}
export function fromPriorityLevelConfigurationStatus(input: PriorityLevelConfigurationStatus): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions?.map(fromPriorityLevelConfigurationCondition),
  }}

/** PriorityLevelConfigurationCondition defines the condition of priority level. */
export interface PriorityLevelConfigurationCondition {
  lastTransitionTime?: c.Time | null;
  message?: string | null;
  reason?: string | null;
  status?: string | null;
  type?: string | null;
}
export function toPriorityLevelConfigurationCondition(input: c.JSONValue): PriorityLevelConfigurationCondition {
  const obj = c.checkObj(input);
  return {
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    status: c.readOpt(obj["status"], c.checkStr),
    type: c.readOpt(obj["type"], c.checkStr),
  }}
export function fromPriorityLevelConfigurationCondition(input: PriorityLevelConfigurationCondition): c.JSONValue {
  return {
    ...input,
    lastTransitionTime: input.lastTransitionTime != null ? c.fromTime(input.lastTransitionTime) : undefined,
  }}

/** PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects. */
export interface PriorityLevelConfigurationList extends ListOf<PriorityLevelConfiguration> {
  apiVersion?: "flowcontrol.apiserver.k8s.io/v1alpha1";
  kind?: "PriorityLevelConfigurationList";
};
export function toPriorityLevelConfigurationList(input: c.JSONValue): PriorityLevelConfigurationList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "flowcontrol.apiserver.k8s.io/v1alpha1", "PriorityLevelConfigurationList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toPriorityLevelConfiguration),
  }}
