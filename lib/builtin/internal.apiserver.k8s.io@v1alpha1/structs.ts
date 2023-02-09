// Autogenerated Schema file for InternalApiserverV1alpha1
import * as c from "../../common.ts";

import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** An API server instance reports the version it can decode and the version it encodes objects to when persisting objects in the backend. */
export interface ServerStorageVersion {
  apiServerID?: string | null;
  decodableVersions?: Array<string> | null;
  encodingVersion?: string | null;
}
export function toServerStorageVersion(input: c.JSONValue): ServerStorageVersion {
  const obj = c.checkObj(input);
  return {
    apiServerID: c.readOpt(obj["apiServerID"], c.checkStr),
    decodableVersions: c.readOpt(obj["decodableVersions"], x => c.readList(x, c.checkStr)),
    encodingVersion: c.readOpt(obj["encodingVersion"], c.checkStr),
  }}
export function fromServerStorageVersion(input: ServerStorageVersion): c.JSONValue {
  return {
    ...input,
  }}

/** Storage version of a specific resource. */
export interface StorageVersion {
  apiVersion?: "internal.apiserver.k8s.io/v1alpha1";
  kind?: "StorageVersion";
  metadata?: MetaV1.ObjectMeta | null;
  spec: StorageVersionSpec;
  status: StorageVersionStatus;
}
export function toStorageVersion(input: c.JSONValue): StorageVersion & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "internal.apiserver.k8s.io/v1alpha1", "StorageVersion"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toStorageVersionSpec(obj["spec"]),
    status: toStorageVersionStatus(obj["status"]),
  }}
export function fromStorageVersion(input: StorageVersion): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "internal.apiserver.k8s.io/v1alpha1", "StorageVersion"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromStorageVersionSpec(input.spec) : undefined,
    status: input.status != null ? fromStorageVersionStatus(input.status) : undefined,
  }}

/** StorageVersionSpec is an empty spec. */
export interface StorageVersionSpec {
}
export function toStorageVersionSpec(input: c.JSONValue): StorageVersionSpec {
  const obj = c.checkObj(input);
  return {
  }}
export function fromStorageVersionSpec(input: StorageVersionSpec): c.JSONValue {
  return {
    ...input,
  }}

/** API server instances report the versions they can decode and the version they encode objects to when persisting objects in the backend. */
export interface StorageVersionStatus {
  commonEncodingVersion?: string | null;
  conditions?: Array<StorageVersionCondition> | null;
  storageVersions?: Array<ServerStorageVersion> | null;
}
export function toStorageVersionStatus(input: c.JSONValue): StorageVersionStatus {
  const obj = c.checkObj(input);
  return {
    commonEncodingVersion: c.readOpt(obj["commonEncodingVersion"], c.checkStr),
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, toStorageVersionCondition)),
    storageVersions: c.readOpt(obj["storageVersions"], x => c.readList(x, toServerStorageVersion)),
  }}
export function fromStorageVersionStatus(input: StorageVersionStatus): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions?.map(fromStorageVersionCondition),
    storageVersions: input.storageVersions?.map(fromServerStorageVersion),
  }}

/** Describes the state of the storageVersion at a certain point. */
export interface StorageVersionCondition {
  lastTransitionTime?: c.Time | null;
  message?: string | null;
  observedGeneration?: number | null;
  reason: string;
  status: string;
  type: string;
}
export function toStorageVersionCondition(input: c.JSONValue): StorageVersionCondition {
  const obj = c.checkObj(input);
  return {
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    observedGeneration: c.readOpt(obj["observedGeneration"], c.checkNum),
    reason: c.checkStr(obj["reason"]),
    status: c.checkStr(obj["status"]),
    type: c.checkStr(obj["type"]),
  }}
export function fromStorageVersionCondition(input: StorageVersionCondition): c.JSONValue {
  return {
    ...input,
    lastTransitionTime: input.lastTransitionTime != null ? c.fromTime(input.lastTransitionTime) : undefined,
  }}

/** A list of StorageVersions. */
export interface StorageVersionList extends ListOf<StorageVersion> {
  apiVersion?: "internal.apiserver.k8s.io/v1alpha1";
  kind?: "StorageVersionList";
};
export function toStorageVersionList(input: c.JSONValue): StorageVersionList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "internal.apiserver.k8s.io/v1alpha1", "StorageVersionList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toStorageVersion),
  }}
