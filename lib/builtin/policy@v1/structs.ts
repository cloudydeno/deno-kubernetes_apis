// Autogenerated Schema file for PolicyV1
import * as c from "../../common.ts";

import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions. */
export interface Eviction {
  apiVersion?: string | null;
  deleteOptions?: MetaV1.DeleteOptions | null;
  kind?: string | null;
  metadata?: MetaV1.ObjectMeta | null;
}
export function toEviction(input: c.JSONValue): Eviction {
  const obj = c.checkObj(input);
  return {
    apiVersion: c.readOpt(obj["apiVersion"], c.checkStr),
    deleteOptions: c.readOpt(obj["deleteOptions"], MetaV1.toDeleteOptions),
    kind: c.readOpt(obj["kind"], c.checkStr),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
  }}
export function fromEviction(input: Eviction): c.JSONValue {
  return {
    ...input,
    deleteOptions: input.deleteOptions != null ? MetaV1.fromDeleteOptions(input.deleteOptions) : undefined,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
  }}

/** PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods */
export interface PodDisruptionBudget {
  apiVersion?: "policy/v1";
  kind?: "PodDisruptionBudget";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: PodDisruptionBudgetSpec | null;
  status?: PodDisruptionBudgetStatus | null;
}
export function toPodDisruptionBudget(input: c.JSONValue): PodDisruptionBudget & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "policy/v1", "PodDisruptionBudget"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toPodDisruptionBudgetSpec),
    status: c.readOpt(obj["status"], toPodDisruptionBudgetStatus),
  }}
export function fromPodDisruptionBudget(input: PodDisruptionBudget): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "policy/v1", "PodDisruptionBudget"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromPodDisruptionBudgetSpec(input.spec) : undefined,
    status: input.status != null ? fromPodDisruptionBudgetStatus(input.status) : undefined,
  }}

/** PodDisruptionBudgetSpec is a description of a PodDisruptionBudget. */
export interface PodDisruptionBudgetSpec {
  maxUnavailable?: c.IntOrString | null;
  minAvailable?: c.IntOrString | null;
  selector?: MetaV1.LabelSelector | null;
  unhealthyPodEvictionPolicy?: string | null;
}
export function toPodDisruptionBudgetSpec(input: c.JSONValue): PodDisruptionBudgetSpec {
  const obj = c.checkObj(input);
  return {
    maxUnavailable: c.readOpt(obj["maxUnavailable"], c.toIntOrString),
    minAvailable: c.readOpt(obj["minAvailable"], c.toIntOrString),
    selector: c.readOpt(obj["selector"], MetaV1.toLabelSelector),
    unhealthyPodEvictionPolicy: c.readOpt(obj["unhealthyPodEvictionPolicy"], c.checkStr),
  }}
export function fromPodDisruptionBudgetSpec(input: PodDisruptionBudgetSpec): c.JSONValue {
  return {
    ...input,
    selector: input.selector != null ? MetaV1.fromLabelSelector(input.selector) : undefined,
  }}

/** PodDisruptionBudgetStatus represents information about the status of a PodDisruptionBudget. Status may trail the actual state of a system. */
export interface PodDisruptionBudgetStatus {
  conditions?: Array<MetaV1.Condition> | null;
  currentHealthy: number;
  desiredHealthy: number;
  disruptedPods?: Record<string,c.Time> | null;
  disruptionsAllowed: number;
  expectedPods: number;
  observedGeneration?: number | null;
}
export function toPodDisruptionBudgetStatus(input: c.JSONValue): PodDisruptionBudgetStatus {
  const obj = c.checkObj(input);
  return {
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, MetaV1.toCondition)),
    currentHealthy: c.checkNum(obj["currentHealthy"]),
    desiredHealthy: c.checkNum(obj["desiredHealthy"]),
    disruptedPods: c.readOpt(obj["disruptedPods"], x => c.readMap(x, c.toTime)),
    disruptionsAllowed: c.checkNum(obj["disruptionsAllowed"]),
    expectedPods: c.checkNum(obj["expectedPods"]),
    observedGeneration: c.readOpt(obj["observedGeneration"], c.checkNum),
  }}
export function fromPodDisruptionBudgetStatus(input: PodDisruptionBudgetStatus): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions?.map(MetaV1.fromCondition),
    disruptedPods: c.writeMap(input.disruptedPods, c.fromTime),
  }}

/** PodDisruptionBudgetList is a collection of PodDisruptionBudgets. */
export interface PodDisruptionBudgetList extends ListOf<PodDisruptionBudget> {
  apiVersion?: "policy/v1";
  kind?: "PodDisruptionBudgetList";
};
export function toPodDisruptionBudgetList(input: c.JSONValue): PodDisruptionBudgetList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "policy/v1", "PodDisruptionBudgetList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toPodDisruptionBudget),
  }}
