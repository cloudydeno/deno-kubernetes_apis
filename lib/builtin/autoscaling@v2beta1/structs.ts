// Autogenerated Schema file for AutoscalingV2beta1
import * as c from "../../common.ts";

import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** CrossVersionObjectReference contains enough information to let you identify the referred resource. */
export interface CrossVersionObjectReference {
  apiVersion?: string | null;
  kind: string;
  name: string;
}
export function toCrossVersionObjectReference(input: c.JSONValue): CrossVersionObjectReference {
  const obj = c.checkObj(input);
  return {
    apiVersion: c.readOpt(obj["apiVersion"], c.checkStr),
    kind: c.checkStr(obj["kind"]),
    name: c.checkStr(obj["name"]),
  }}
export function fromCrossVersionObjectReference(input: CrossVersionObjectReference): c.JSONValue {
  return {
    ...input,
  }}

/** ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster). Exactly one "target" type should be set. */
export interface ExternalMetricSource {
  metricName: string;
  metricSelector?: MetaV1.LabelSelector | null;
  targetAverageValue?: c.Quantity | null;
  targetValue?: c.Quantity | null;
}
export function toExternalMetricSource(input: c.JSONValue): ExternalMetricSource {
  const obj = c.checkObj(input);
  return {
    metricName: c.checkStr(obj["metricName"]),
    metricSelector: c.readOpt(obj["metricSelector"], MetaV1.toLabelSelector),
    targetAverageValue: c.readOpt(obj["targetAverageValue"], c.toQuantity),
    targetValue: c.readOpt(obj["targetValue"], c.toQuantity),
  }}
export function fromExternalMetricSource(input: ExternalMetricSource): c.JSONValue {
  return {
    ...input,
    metricSelector: input.metricSelector != null ? MetaV1.fromLabelSelector(input.metricSelector) : undefined,
    targetAverageValue: input.targetAverageValue != null ? c.fromQuantity(input.targetAverageValue) : undefined,
    targetValue: input.targetValue != null ? c.fromQuantity(input.targetValue) : undefined,
  }}

/** ExternalMetricStatus indicates the current value of a global metric not associated with any Kubernetes object. */
export interface ExternalMetricStatus {
  currentAverageValue?: c.Quantity | null;
  currentValue: c.Quantity;
  metricName: string;
  metricSelector?: MetaV1.LabelSelector | null;
}
export function toExternalMetricStatus(input: c.JSONValue): ExternalMetricStatus {
  const obj = c.checkObj(input);
  return {
    currentAverageValue: c.readOpt(obj["currentAverageValue"], c.toQuantity),
    currentValue: c.toQuantity(obj["currentValue"]),
    metricName: c.checkStr(obj["metricName"]),
    metricSelector: c.readOpt(obj["metricSelector"], MetaV1.toLabelSelector),
  }}
export function fromExternalMetricStatus(input: ExternalMetricStatus): c.JSONValue {
  return {
    ...input,
    currentAverageValue: input.currentAverageValue != null ? c.fromQuantity(input.currentAverageValue) : undefined,
    currentValue: input.currentValue != null ? c.fromQuantity(input.currentValue) : undefined,
    metricSelector: input.metricSelector != null ? MetaV1.fromLabelSelector(input.metricSelector) : undefined,
  }}

/** HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified. */
export interface HorizontalPodAutoscaler {
  apiVersion?: "autoscaling/v2beta1";
  kind?: "HorizontalPodAutoscaler";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: HorizontalPodAutoscalerSpec | null;
  status?: HorizontalPodAutoscalerStatus | null;
}
export function toHorizontalPodAutoscaler(input: c.JSONValue): HorizontalPodAutoscaler & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "autoscaling/v2beta1", "HorizontalPodAutoscaler"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toHorizontalPodAutoscalerSpec),
    status: c.readOpt(obj["status"], toHorizontalPodAutoscalerStatus),
  }}
export function fromHorizontalPodAutoscaler(input: HorizontalPodAutoscaler): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "autoscaling/v2beta1", "HorizontalPodAutoscaler"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromHorizontalPodAutoscalerSpec(input.spec) : undefined,
    status: input.status != null ? fromHorizontalPodAutoscalerStatus(input.status) : undefined,
  }}

/** HorizontalPodAutoscalerSpec describes the desired functionality of the HorizontalPodAutoscaler. */
export interface HorizontalPodAutoscalerSpec {
  maxReplicas: number;
  metrics?: Array<MetricSpec> | null;
  minReplicas?: number | null;
  scaleTargetRef: CrossVersionObjectReference;
}
export function toHorizontalPodAutoscalerSpec(input: c.JSONValue): HorizontalPodAutoscalerSpec {
  const obj = c.checkObj(input);
  return {
    maxReplicas: c.checkNum(obj["maxReplicas"]),
    metrics: c.readOpt(obj["metrics"], x => c.readList(x, toMetricSpec)),
    minReplicas: c.readOpt(obj["minReplicas"], c.checkNum),
    scaleTargetRef: toCrossVersionObjectReference(obj["scaleTargetRef"]),
  }}
export function fromHorizontalPodAutoscalerSpec(input: HorizontalPodAutoscalerSpec): c.JSONValue {
  return {
    ...input,
    metrics: input.metrics?.map(fromMetricSpec),
    scaleTargetRef: input.scaleTargetRef != null ? fromCrossVersionObjectReference(input.scaleTargetRef) : undefined,
  }}

/** MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once). */
export interface MetricSpec {
  external?: ExternalMetricSource | null;
  object?: ObjectMetricSource | null;
  pods?: PodsMetricSource | null;
  resource?: ResourceMetricSource | null;
  type: string;
}
export function toMetricSpec(input: c.JSONValue): MetricSpec {
  const obj = c.checkObj(input);
  return {
    external: c.readOpt(obj["external"], toExternalMetricSource),
    object: c.readOpt(obj["object"], toObjectMetricSource),
    pods: c.readOpt(obj["pods"], toPodsMetricSource),
    resource: c.readOpt(obj["resource"], toResourceMetricSource),
    type: c.checkStr(obj["type"]),
  }}
export function fromMetricSpec(input: MetricSpec): c.JSONValue {
  return {
    ...input,
    external: input.external != null ? fromExternalMetricSource(input.external) : undefined,
    object: input.object != null ? fromObjectMetricSource(input.object) : undefined,
    pods: input.pods != null ? fromPodsMetricSource(input.pods) : undefined,
    resource: input.resource != null ? fromResourceMetricSource(input.resource) : undefined,
  }}

/** ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object). */
export interface ObjectMetricSource {
  averageValue?: c.Quantity | null;
  metricName: string;
  selector?: MetaV1.LabelSelector | null;
  target: CrossVersionObjectReference;
  targetValue: c.Quantity;
}
export function toObjectMetricSource(input: c.JSONValue): ObjectMetricSource {
  const obj = c.checkObj(input);
  return {
    averageValue: c.readOpt(obj["averageValue"], c.toQuantity),
    metricName: c.checkStr(obj["metricName"]),
    selector: c.readOpt(obj["selector"], MetaV1.toLabelSelector),
    target: toCrossVersionObjectReference(obj["target"]),
    targetValue: c.toQuantity(obj["targetValue"]),
  }}
export function fromObjectMetricSource(input: ObjectMetricSource): c.JSONValue {
  return {
    ...input,
    averageValue: input.averageValue != null ? c.fromQuantity(input.averageValue) : undefined,
    selector: input.selector != null ? MetaV1.fromLabelSelector(input.selector) : undefined,
    target: input.target != null ? fromCrossVersionObjectReference(input.target) : undefined,
    targetValue: input.targetValue != null ? c.fromQuantity(input.targetValue) : undefined,
  }}

/** PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value. */
export interface PodsMetricSource {
  metricName: string;
  selector?: MetaV1.LabelSelector | null;
  targetAverageValue: c.Quantity;
}
export function toPodsMetricSource(input: c.JSONValue): PodsMetricSource {
  const obj = c.checkObj(input);
  return {
    metricName: c.checkStr(obj["metricName"]),
    selector: c.readOpt(obj["selector"], MetaV1.toLabelSelector),
    targetAverageValue: c.toQuantity(obj["targetAverageValue"]),
  }}
export function fromPodsMetricSource(input: PodsMetricSource): c.JSONValue {
  return {
    ...input,
    selector: input.selector != null ? MetaV1.fromLabelSelector(input.selector) : undefined,
    targetAverageValue: input.targetAverageValue != null ? c.fromQuantity(input.targetAverageValue) : undefined,
  }}

/** ResourceMetricSource indicates how to scale on a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  The values will be averaged together before being compared to the target.  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.  Only one "target" type should be set. */
export interface ResourceMetricSource {
  name: string;
  targetAverageUtilization?: number | null;
  targetAverageValue?: c.Quantity | null;
}
export function toResourceMetricSource(input: c.JSONValue): ResourceMetricSource {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
    targetAverageUtilization: c.readOpt(obj["targetAverageUtilization"], c.checkNum),
    targetAverageValue: c.readOpt(obj["targetAverageValue"], c.toQuantity),
  }}
export function fromResourceMetricSource(input: ResourceMetricSource): c.JSONValue {
  return {
    ...input,
    targetAverageValue: input.targetAverageValue != null ? c.fromQuantity(input.targetAverageValue) : undefined,
  }}

/** HorizontalPodAutoscalerStatus describes the current status of a horizontal pod autoscaler. */
export interface HorizontalPodAutoscalerStatus {
  conditions: Array<HorizontalPodAutoscalerCondition>;
  currentMetrics?: Array<MetricStatus> | null;
  currentReplicas: number;
  desiredReplicas: number;
  lastScaleTime?: c.Time | null;
  observedGeneration?: number | null;
}
export function toHorizontalPodAutoscalerStatus(input: c.JSONValue): HorizontalPodAutoscalerStatus {
  const obj = c.checkObj(input);
  return {
    conditions: c.readList(obj["conditions"], toHorizontalPodAutoscalerCondition),
    currentMetrics: c.readOpt(obj["currentMetrics"], x => c.readList(x, toMetricStatus)),
    currentReplicas: c.checkNum(obj["currentReplicas"]),
    desiredReplicas: c.checkNum(obj["desiredReplicas"]),
    lastScaleTime: c.readOpt(obj["lastScaleTime"], c.toTime),
    observedGeneration: c.readOpt(obj["observedGeneration"], c.checkNum),
  }}
export function fromHorizontalPodAutoscalerStatus(input: HorizontalPodAutoscalerStatus): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions?.map(fromHorizontalPodAutoscalerCondition),
    currentMetrics: input.currentMetrics?.map(fromMetricStatus),
    lastScaleTime: input.lastScaleTime != null ? c.fromTime(input.lastScaleTime) : undefined,
  }}

/** HorizontalPodAutoscalerCondition describes the state of a HorizontalPodAutoscaler at a certain point. */
export interface HorizontalPodAutoscalerCondition {
  lastTransitionTime?: c.Time | null;
  message?: string | null;
  reason?: string | null;
  status: string;
  type: string;
}
export function toHorizontalPodAutoscalerCondition(input: c.JSONValue): HorizontalPodAutoscalerCondition {
  const obj = c.checkObj(input);
  return {
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    status: c.checkStr(obj["status"]),
    type: c.checkStr(obj["type"]),
  }}
export function fromHorizontalPodAutoscalerCondition(input: HorizontalPodAutoscalerCondition): c.JSONValue {
  return {
    ...input,
    lastTransitionTime: input.lastTransitionTime != null ? c.fromTime(input.lastTransitionTime) : undefined,
  }}

/** MetricStatus describes the last-read state of a single metric. */
export interface MetricStatus {
  external?: ExternalMetricStatus | null;
  object?: ObjectMetricStatus | null;
  pods?: PodsMetricStatus | null;
  resource?: ResourceMetricStatus | null;
  type: string;
}
export function toMetricStatus(input: c.JSONValue): MetricStatus {
  const obj = c.checkObj(input);
  return {
    external: c.readOpt(obj["external"], toExternalMetricStatus),
    object: c.readOpt(obj["object"], toObjectMetricStatus),
    pods: c.readOpt(obj["pods"], toPodsMetricStatus),
    resource: c.readOpt(obj["resource"], toResourceMetricStatus),
    type: c.checkStr(obj["type"]),
  }}
export function fromMetricStatus(input: MetricStatus): c.JSONValue {
  return {
    ...input,
    external: input.external != null ? fromExternalMetricStatus(input.external) : undefined,
    object: input.object != null ? fromObjectMetricStatus(input.object) : undefined,
    pods: input.pods != null ? fromPodsMetricStatus(input.pods) : undefined,
    resource: input.resource != null ? fromResourceMetricStatus(input.resource) : undefined,
  }}

/** ObjectMetricStatus indicates the current value of a metric describing a kubernetes object (for example, hits-per-second on an Ingress object). */
export interface ObjectMetricStatus {
  averageValue?: c.Quantity | null;
  currentValue: c.Quantity;
  metricName: string;
  selector?: MetaV1.LabelSelector | null;
  target: CrossVersionObjectReference;
}
export function toObjectMetricStatus(input: c.JSONValue): ObjectMetricStatus {
  const obj = c.checkObj(input);
  return {
    averageValue: c.readOpt(obj["averageValue"], c.toQuantity),
    currentValue: c.toQuantity(obj["currentValue"]),
    metricName: c.checkStr(obj["metricName"]),
    selector: c.readOpt(obj["selector"], MetaV1.toLabelSelector),
    target: toCrossVersionObjectReference(obj["target"]),
  }}
export function fromObjectMetricStatus(input: ObjectMetricStatus): c.JSONValue {
  return {
    ...input,
    averageValue: input.averageValue != null ? c.fromQuantity(input.averageValue) : undefined,
    currentValue: input.currentValue != null ? c.fromQuantity(input.currentValue) : undefined,
    selector: input.selector != null ? MetaV1.fromLabelSelector(input.selector) : undefined,
    target: input.target != null ? fromCrossVersionObjectReference(input.target) : undefined,
  }}

/** PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second). */
export interface PodsMetricStatus {
  currentAverageValue: c.Quantity;
  metricName: string;
  selector?: MetaV1.LabelSelector | null;
}
export function toPodsMetricStatus(input: c.JSONValue): PodsMetricStatus {
  const obj = c.checkObj(input);
  return {
    currentAverageValue: c.toQuantity(obj["currentAverageValue"]),
    metricName: c.checkStr(obj["metricName"]),
    selector: c.readOpt(obj["selector"], MetaV1.toLabelSelector),
  }}
export function fromPodsMetricStatus(input: PodsMetricStatus): c.JSONValue {
  return {
    ...input,
    currentAverageValue: input.currentAverageValue != null ? c.fromQuantity(input.currentAverageValue) : undefined,
    selector: input.selector != null ? MetaV1.fromLabelSelector(input.selector) : undefined,
  }}

/** ResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source. */
export interface ResourceMetricStatus {
  currentAverageUtilization?: number | null;
  currentAverageValue: c.Quantity;
  name: string;
}
export function toResourceMetricStatus(input: c.JSONValue): ResourceMetricStatus {
  const obj = c.checkObj(input);
  return {
    currentAverageUtilization: c.readOpt(obj["currentAverageUtilization"], c.checkNum),
    currentAverageValue: c.toQuantity(obj["currentAverageValue"]),
    name: c.checkStr(obj["name"]),
  }}
export function fromResourceMetricStatus(input: ResourceMetricStatus): c.JSONValue {
  return {
    ...input,
    currentAverageValue: input.currentAverageValue != null ? c.fromQuantity(input.currentAverageValue) : undefined,
  }}

/** HorizontalPodAutoscaler is a list of horizontal pod autoscaler objects. */
export interface HorizontalPodAutoscalerList extends ListOf<HorizontalPodAutoscaler> {
  apiVersion?: "autoscaling/v2beta1";
  kind?: "HorizontalPodAutoscalerList";
};
export function toHorizontalPodAutoscalerList(input: c.JSONValue): HorizontalPodAutoscalerList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "autoscaling/v2beta1", "HorizontalPodAutoscalerList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toHorizontalPodAutoscaler),
  }}
