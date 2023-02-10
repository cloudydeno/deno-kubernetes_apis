// Autogenerated Schema file for AutoscalingV1
import * as c from "../../common.ts";

import * as MetaV1 from "../../builtin/meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** VerticalPodAutoscalerCheckpoint is the checkpoint of the internal state of VPA that is used for recovery after recommender's restart. */
export interface VerticalPodAutoscalerCheckpoint {
  apiVersion?: "autoscaling.k8s.io/v1";
  kind?: "VerticalPodAutoscalerCheckpoint";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: {
    containerName?: string | null;
    vpaObjectName?: string | null;
  } | null;
  status?: {
    cpuHistogram?: {
      bucketWeights?: {
      } | null;
      referenceTimestamp?: c.Time | null;
      totalWeight?: number | null;
    } | null;
    firstSampleStart?: c.Time | null;
    lastSampleStart?: c.Time | null;
    lastUpdateTime?: c.Time | null;
    memoryHistogram?: {
      bucketWeights?: {
      } | null;
      referenceTimestamp?: c.Time | null;
      totalWeight?: number | null;
    } | null;
    totalSamplesCount?: number | null;
    version?: string | null;
  } | null;
}
export function toVerticalPodAutoscalerCheckpoint(input: c.JSONValue): VerticalPodAutoscalerCheckpoint & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "autoscaling.k8s.io/v1", "VerticalPodAutoscalerCheckpoint"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toVerticalPodAutoscalerCheckpoint_spec),
    status: c.readOpt(obj["status"], toVerticalPodAutoscalerCheckpoint_status),
  }}
export function fromVerticalPodAutoscalerCheckpoint(input: VerticalPodAutoscalerCheckpoint): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "autoscaling.k8s.io/v1", "VerticalPodAutoscalerCheckpoint"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    status: input.status != null ? {
      ...input.status,
      cpuHistogram: input.status.cpuHistogram != null ? {
        ...input.status.cpuHistogram,
        referenceTimestamp: input.status.cpuHistogram.referenceTimestamp != null ? c.fromTime(input.status.cpuHistogram.referenceTimestamp) : undefined,
      } : undefined,
      firstSampleStart: input.status.firstSampleStart != null ? c.fromTime(input.status.firstSampleStart) : undefined,
      lastSampleStart: input.status.lastSampleStart != null ? c.fromTime(input.status.lastSampleStart) : undefined,
      lastUpdateTime: input.status.lastUpdateTime != null ? c.fromTime(input.status.lastUpdateTime) : undefined,
      memoryHistogram: input.status.memoryHistogram != null ? {
        ...input.status.memoryHistogram,
        referenceTimestamp: input.status.memoryHistogram.referenceTimestamp != null ? c.fromTime(input.status.memoryHistogram.referenceTimestamp) : undefined,
      } : undefined,
    } : undefined,
  }}
export function toVerticalPodAutoscalerCheckpoint_spec(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    containerName: c.readOpt(obj["containerName"], c.checkStr),
    vpaObjectName: c.readOpt(obj["vpaObjectName"], c.checkStr),
  }}
export function toVerticalPodAutoscalerCheckpoint_status(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    cpuHistogram: c.readOpt(obj["cpuHistogram"], toVerticalPodAutoscalerCheckpoint_status_cpuHistogram),
    firstSampleStart: c.readOpt(obj["firstSampleStart"], c.toTime),
    lastSampleStart: c.readOpt(obj["lastSampleStart"], c.toTime),
    lastUpdateTime: c.readOpt(obj["lastUpdateTime"], c.toTime),
    memoryHistogram: c.readOpt(obj["memoryHistogram"], toVerticalPodAutoscalerCheckpoint_status_memoryHistogram),
    totalSamplesCount: c.readOpt(obj["totalSamplesCount"], c.checkNum),
    version: c.readOpt(obj["version"], c.checkStr),
  }}
export function toVerticalPodAutoscalerCheckpoint_status_cpuHistogram(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    bucketWeights: c.readOpt(obj["bucketWeights"], toVerticalPodAutoscalerCheckpoint_status_cpuHistogram_bucketWeights),
    referenceTimestamp: c.readOpt(obj["referenceTimestamp"], c.toTime),
    totalWeight: c.readOpt(obj["totalWeight"], c.checkNum),
  }}
export function toVerticalPodAutoscalerCheckpoint_status_memoryHistogram(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    bucketWeights: c.readOpt(obj["bucketWeights"], toVerticalPodAutoscalerCheckpoint_status_memoryHistogram_bucketWeights),
    referenceTimestamp: c.readOpt(obj["referenceTimestamp"], c.toTime),
    totalWeight: c.readOpt(obj["totalWeight"], c.checkNum),
  }}
export function toVerticalPodAutoscalerCheckpoint_status_cpuHistogram_bucketWeights(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
  }}
export function toVerticalPodAutoscalerCheckpoint_status_memoryHistogram_bucketWeights(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
  }}

export interface VerticalPodAutoscalerCheckpointList extends ListOf<VerticalPodAutoscalerCheckpoint> {
  apiVersion?: "autoscaling.k8s.io/v1";
  kind?: "VerticalPodAutoscalerCheckpointList";
};
export function toVerticalPodAutoscalerCheckpointList(input: c.JSONValue): VerticalPodAutoscalerCheckpointList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "autoscaling.k8s.io/v1", "VerticalPodAutoscalerCheckpointList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toVerticalPodAutoscalerCheckpoint),
  }}

/** VerticalPodAutoscaler is the configuration for a vertical pod autoscaler, which automatically manages pod resources based on historical and real time resource utilization. */
export interface VerticalPodAutoscaler {
  apiVersion?: "autoscaling.k8s.io/v1";
  kind?: "VerticalPodAutoscaler";
  metadata?: MetaV1.ObjectMeta | null;
  spec: {
    recommenders?: Array<{
      name: string;
    }> | null;
    resourcePolicy?: {
      containerPolicies?: Array<{
        containerName?: string | null;
        controlledResources?: Array<string> | null;
        controlledValues?: "RequestsAndLimits" | "RequestsOnly" | c.UnexpectedEnumValue | null;
        maxAllowed?: Record<string,c.IntOrString> | null;
        minAllowed?: Record<string,c.IntOrString> | null;
        mode?: "Auto" | "Off" | c.UnexpectedEnumValue | null;
      }> | null;
    } | null;
    targetRef: {
      apiVersion?: string | null;
      kind: string;
      name: string;
    };
    updatePolicy?: {
      minReplicas?: number | null;
      updateMode?: "Off" | "Initial" | "Recreate" | "Auto" | c.UnexpectedEnumValue | null;
    } | null;
  };
  status?: {
    conditions?: Array<{
      lastTransitionTime?: c.Time | null;
      message?: string | null;
      reason?: string | null;
      status: string;
      type: string;
    }> | null;
    recommendation?: {
      containerRecommendations?: Array<{
        containerName?: string | null;
        lowerBound?: Record<string,c.IntOrString> | null;
        target: Record<string,c.IntOrString>;
        uncappedTarget?: Record<string,c.IntOrString> | null;
        upperBound?: Record<string,c.IntOrString> | null;
      }> | null;
    } | null;
  } | null;
}
export function toVerticalPodAutoscaler(input: c.JSONValue): VerticalPodAutoscaler & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "autoscaling.k8s.io/v1", "VerticalPodAutoscaler"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toVerticalPodAutoscaler_spec(obj["spec"]),
    status: c.readOpt(obj["status"], toVerticalPodAutoscaler_status),
  }}
export function fromVerticalPodAutoscaler(input: VerticalPodAutoscaler): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "autoscaling.k8s.io/v1", "VerticalPodAutoscaler"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    status: input.status != null ? {
      ...input.status,
      conditions: input.status.conditions?.map(x => ({
        ...x,
        lastTransitionTime: x.lastTransitionTime != null ? c.fromTime(x.lastTransitionTime) : undefined,
      })),
    } : undefined,
  }}
export function toVerticalPodAutoscaler_spec(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    recommenders: c.readOpt(obj["recommenders"], x => c.readList(x, toVerticalPodAutoscaler_spec_recommenders)),
    resourcePolicy: c.readOpt(obj["resourcePolicy"], toVerticalPodAutoscaler_spec_resourcePolicy),
    targetRef: toVerticalPodAutoscaler_spec_targetRef(obj["targetRef"]),
    updatePolicy: c.readOpt(obj["updatePolicy"], toVerticalPodAutoscaler_spec_updatePolicy),
  }}
export function toVerticalPodAutoscaler_status(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, toVerticalPodAutoscaler_status_conditions)),
    recommendation: c.readOpt(obj["recommendation"], toVerticalPodAutoscaler_status_recommendation),
  }}
export function toVerticalPodAutoscaler_spec_recommenders(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
  }}
export function toVerticalPodAutoscaler_spec_resourcePolicy(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    containerPolicies: c.readOpt(obj["containerPolicies"], x => c.readList(x, toVerticalPodAutoscaler_spec_resourcePolicy_containerPolicies)),
  }}
export function toVerticalPodAutoscaler_spec_targetRef(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    apiVersion: c.readOpt(obj["apiVersion"], c.checkStr),
    kind: c.checkStr(obj["kind"]),
    name: c.checkStr(obj["name"]),
  }}
export function toVerticalPodAutoscaler_spec_updatePolicy(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    minReplicas: c.readOpt(obj["minReplicas"], c.checkNum),
    updateMode: c.readOpt(obj["updateMode"], (x => c.readEnum<"Off" | "Initial" | "Recreate" | "Auto" | c.UnexpectedEnumValue>(x))),
  }}
export function toVerticalPodAutoscaler_status_conditions(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    status: c.checkStr(obj["status"]),
    type: c.checkStr(obj["type"]),
  }}
export function toVerticalPodAutoscaler_status_recommendation(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    containerRecommendations: c.readOpt(obj["containerRecommendations"], x => c.readList(x, toVerticalPodAutoscaler_status_recommendation_containerRecommendations)),
  }}
export function toVerticalPodAutoscaler_spec_resourcePolicy_containerPolicies(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    containerName: c.readOpt(obj["containerName"], c.checkStr),
    controlledResources: c.readOpt(obj["controlledResources"], x => c.readList(x, c.checkStr)),
    controlledValues: c.readOpt(obj["controlledValues"], (x => c.readEnum<"RequestsAndLimits" | "RequestsOnly" | c.UnexpectedEnumValue>(x))),
    maxAllowed: c.readOpt(obj["maxAllowed"], x => c.readMap(x, c.toIntOrString)),
    minAllowed: c.readOpt(obj["minAllowed"], x => c.readMap(x, c.toIntOrString)),
    mode: c.readOpt(obj["mode"], (x => c.readEnum<"Auto" | "Off" | c.UnexpectedEnumValue>(x))),
  }}
export function toVerticalPodAutoscaler_status_recommendation_containerRecommendations(input: c.JSONValue) {
  const obj = c.checkObj(input);
  return {
    containerName: c.readOpt(obj["containerName"], c.checkStr),
    lowerBound: c.readOpt(obj["lowerBound"], x => c.readMap(x, c.toIntOrString)),
    target: c.readMap(obj["target"], c.toIntOrString),
    uncappedTarget: c.readOpt(obj["uncappedTarget"], x => c.readMap(x, c.toIntOrString)),
    upperBound: c.readOpt(obj["upperBound"], x => c.readMap(x, c.toIntOrString)),
  }}

export interface VerticalPodAutoscalerList extends ListOf<VerticalPodAutoscaler> {
  apiVersion?: "autoscaling.k8s.io/v1";
  kind?: "VerticalPodAutoscalerList";
};
export function toVerticalPodAutoscalerList(input: c.JSONValue): VerticalPodAutoscalerList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "autoscaling.k8s.io/v1", "VerticalPodAutoscalerList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toVerticalPodAutoscaler),
  }}
