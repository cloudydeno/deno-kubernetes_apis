// Autogenerated Schema file for BatchV1beta1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as BatchV1 from "../batch@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type Kind<T extends string> = {
  apiVersion: "batch/v1beta1";
  kind: T;
};
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** CronJob represents the configuration of a single cron job. */
export type CronJob = Kind<"CronJob"> & CronJobFields;
export interface CronJobFields {
  metadata?: MetaV1.ObjectMeta | null;
  spec?: CronJobSpec | null;
  status?: CronJobStatus | null;
}
export function toCronJobFields(input: c.JSONValue): CronJobFields {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toCronJobSpec),
    status: c.readOpt(obj["status"], toCronJobStatus),
  }}
export function toCronJob(input: c.JSONValue): CronJob {
  const {apiVersion, kind, ...fields} = c.checkObj(input);
  if (apiVersion !== "batch/v1beta1") throw new Error("Type apiv mis 2");
  if (kind !== "CronJob") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    ...toCronJobFields(fields),
  }}
export function fromCronJob(input: CronJob): c.JSONValue {
  return {
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromCronJobSpec(input.spec) : undefined,
    status: input.status != null ? fromCronJobStatus(input.status) : undefined,
  }}

/** CronJobSpec describes how the job execution will look like and when it will actually run. */
export interface CronJobSpec {
  concurrencyPolicy?: string | null;
  failedJobsHistoryLimit?: number | null;
  jobTemplate: JobTemplateSpec;
  schedule: string;
  startingDeadlineSeconds?: number | null;
  successfulJobsHistoryLimit?: number | null;
  suspend?: boolean | null;
}
export function toCronJobSpec(input: c.JSONValue): CronJobSpec {
  const obj = c.checkObj(input);
  return {
    concurrencyPolicy: c.readOpt(obj["concurrencyPolicy"], c.checkStr),
    failedJobsHistoryLimit: c.readOpt(obj["failedJobsHistoryLimit"], c.checkNum),
    jobTemplate: toJobTemplateSpec(obj["jobTemplate"]),
    schedule: c.checkStr(obj["schedule"]),
    startingDeadlineSeconds: c.readOpt(obj["startingDeadlineSeconds"], c.checkNum),
    successfulJobsHistoryLimit: c.readOpt(obj["successfulJobsHistoryLimit"], c.checkNum),
    suspend: c.readOpt(obj["suspend"], c.checkBool),
  }}
export function fromCronJobSpec(input: CronJobSpec): c.JSONValue {
  return {
    ...input,
    jobTemplate: input.jobTemplate != null ? fromJobTemplateSpec(input.jobTemplate) : undefined,
  }}

/** JobTemplateSpec describes the data a Job should have when created from a template */
export interface JobTemplateSpec {
  metadata?: MetaV1.ObjectMeta | null;
  spec?: BatchV1.JobSpec | null;
}
export function toJobTemplateSpec(input: c.JSONValue): JobTemplateSpec {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], BatchV1.toJobSpec),
  }}
export function fromJobTemplateSpec(input: JobTemplateSpec): c.JSONValue {
  return {
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? BatchV1.fromJobSpec(input.spec) : undefined,
  }}

/** CronJobStatus represents the current state of a cron job. */
export interface CronJobStatus {
  active?: Array<CoreV1.ObjectReference> | null;
  lastScheduleTime?: c.Time | null;
}
export function toCronJobStatus(input: c.JSONValue): CronJobStatus {
  const obj = c.checkObj(input);
  return {
    active: c.readOpt(obj["active"], x => c.readList(x, CoreV1.toObjectReference)),
    lastScheduleTime: c.readOpt(obj["lastScheduleTime"], c.toTime),
  }}
export function fromCronJobStatus(input: CronJobStatus): c.JSONValue {
  return {
    ...input,
    active: input.active?.map(CoreV1.fromObjectReference),
    lastScheduleTime: input.lastScheduleTime != null ? c.fromTime(input.lastScheduleTime) : undefined,
  }}

/** CronJobList is a collection of cron jobs. */
export type CronJobList = Kind<"CronJobList"> & ListOf<CronJobFields>;
export function toCronJobList(input: c.JSONValue): CronJobList {
  const {apiVersion, kind, metadata, items} = c.checkObj(input);
  if (apiVersion !== "batch/v1beta1") throw new Error("Type apiv mis 2");
  if (kind !== "CronJobList") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    metadata: MetaV1.toListMeta(metadata),
    items: c.readList(items, toCronJobFields),
  }}
