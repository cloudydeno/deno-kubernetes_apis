// Autogenerated Schema file for BatchV1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** CronJob represents the configuration of a single cron job. */
export interface CronJob {
  apiVersion?: "batch/v1";
  kind?: "CronJob";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: CronJobSpec | null;
  status?: CronJobStatus | null;
}
export function toCronJob(input: c.JSONValue): CronJob & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "batch/v1", "CronJob"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toCronJobSpec),
    status: c.readOpt(obj["status"], toCronJobStatus),
  }}
export function fromCronJob(input: CronJob): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "batch/v1", "CronJob"),
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
  spec?: JobSpec | null;
}
export function toJobTemplateSpec(input: c.JSONValue): JobTemplateSpec {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toJobSpec),
  }}
export function fromJobTemplateSpec(input: JobTemplateSpec): c.JSONValue {
  return {
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromJobSpec(input.spec) : undefined,
  }}

/** JobSpec describes how the job execution will look like. */
export interface JobSpec {
  activeDeadlineSeconds?: number | null;
  backoffLimit?: number | null;
  completionMode?: string | null;
  completions?: number | null;
  manualSelector?: boolean | null;
  parallelism?: number | null;
  selector?: MetaV1.LabelSelector | null;
  suspend?: boolean | null;
  template: CoreV1.PodTemplateSpec;
  ttlSecondsAfterFinished?: number | null;
}
export function toJobSpec(input: c.JSONValue): JobSpec {
  const obj = c.checkObj(input);
  return {
    activeDeadlineSeconds: c.readOpt(obj["activeDeadlineSeconds"], c.checkNum),
    backoffLimit: c.readOpt(obj["backoffLimit"], c.checkNum),
    completionMode: c.readOpt(obj["completionMode"], c.checkStr),
    completions: c.readOpt(obj["completions"], c.checkNum),
    manualSelector: c.readOpt(obj["manualSelector"], c.checkBool),
    parallelism: c.readOpt(obj["parallelism"], c.checkNum),
    selector: c.readOpt(obj["selector"], MetaV1.toLabelSelector),
    suspend: c.readOpt(obj["suspend"], c.checkBool),
    template: CoreV1.toPodTemplateSpec(obj["template"]),
    ttlSecondsAfterFinished: c.readOpt(obj["ttlSecondsAfterFinished"], c.checkNum),
  }}
export function fromJobSpec(input: JobSpec): c.JSONValue {
  return {
    ...input,
    selector: input.selector != null ? MetaV1.fromLabelSelector(input.selector) : undefined,
    template: input.template != null ? CoreV1.fromPodTemplateSpec(input.template) : undefined,
  }}

/** CronJobStatus represents the current state of a cron job. */
export interface CronJobStatus {
  active?: Array<CoreV1.ObjectReference> | null;
  lastScheduleTime?: c.Time | null;
  lastSuccessfulTime?: c.Time | null;
}
export function toCronJobStatus(input: c.JSONValue): CronJobStatus {
  const obj = c.checkObj(input);
  return {
    active: c.readOpt(obj["active"], x => c.readList(x, CoreV1.toObjectReference)),
    lastScheduleTime: c.readOpt(obj["lastScheduleTime"], c.toTime),
    lastSuccessfulTime: c.readOpt(obj["lastSuccessfulTime"], c.toTime),
  }}
export function fromCronJobStatus(input: CronJobStatus): c.JSONValue {
  return {
    ...input,
    active: input.active?.map(CoreV1.fromObjectReference),
    lastScheduleTime: input.lastScheduleTime != null ? c.fromTime(input.lastScheduleTime) : undefined,
    lastSuccessfulTime: input.lastSuccessfulTime != null ? c.fromTime(input.lastSuccessfulTime) : undefined,
  }}

/** CronJobList is a collection of cron jobs. */
export interface CronJobList extends ListOf<CronJob> {
  apiVersion?: "batch/v1";
  kind?: "CronJobList";
};
export function toCronJobList(input: c.JSONValue): CronJobList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "batch/v1", "CronJobList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toCronJob),
  }}

/** Job represents the configuration of a single job. */
export interface Job {
  apiVersion?: "batch/v1";
  kind?: "Job";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: JobSpec | null;
  status?: JobStatus | null;
}
export function toJob(input: c.JSONValue): Job & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "batch/v1", "Job"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toJobSpec),
    status: c.readOpt(obj["status"], toJobStatus),
  }}
export function fromJob(input: Job): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "batch/v1", "Job"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromJobSpec(input.spec) : undefined,
    status: input.status != null ? fromJobStatus(input.status) : undefined,
  }}

/** JobStatus represents the current state of a Job. */
export interface JobStatus {
  active?: number | null;
  completedIndexes?: string | null;
  completionTime?: c.Time | null;
  conditions?: Array<JobCondition> | null;
  failed?: number | null;
  startTime?: c.Time | null;
  succeeded?: number | null;
}
export function toJobStatus(input: c.JSONValue): JobStatus {
  const obj = c.checkObj(input);
  return {
    active: c.readOpt(obj["active"], c.checkNum),
    completedIndexes: c.readOpt(obj["completedIndexes"], c.checkStr),
    completionTime: c.readOpt(obj["completionTime"], c.toTime),
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, toJobCondition)),
    failed: c.readOpt(obj["failed"], c.checkNum),
    startTime: c.readOpt(obj["startTime"], c.toTime),
    succeeded: c.readOpt(obj["succeeded"], c.checkNum),
  }}
export function fromJobStatus(input: JobStatus): c.JSONValue {
  return {
    ...input,
    completionTime: input.completionTime != null ? c.fromTime(input.completionTime) : undefined,
    conditions: input.conditions?.map(fromJobCondition),
    startTime: input.startTime != null ? c.fromTime(input.startTime) : undefined,
  }}

/** JobCondition describes current state of a job. */
export interface JobCondition {
  lastProbeTime?: c.Time | null;
  lastTransitionTime?: c.Time | null;
  message?: string | null;
  reason?: string | null;
  status: string;
  type: string;
}
export function toJobCondition(input: c.JSONValue): JobCondition {
  const obj = c.checkObj(input);
  return {
    lastProbeTime: c.readOpt(obj["lastProbeTime"], c.toTime),
    lastTransitionTime: c.readOpt(obj["lastTransitionTime"], c.toTime),
    message: c.readOpt(obj["message"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    status: c.checkStr(obj["status"]),
    type: c.checkStr(obj["type"]),
  }}
export function fromJobCondition(input: JobCondition): c.JSONValue {
  return {
    ...input,
    lastProbeTime: input.lastProbeTime != null ? c.fromTime(input.lastProbeTime) : undefined,
    lastTransitionTime: input.lastTransitionTime != null ? c.fromTime(input.lastTransitionTime) : undefined,
  }}

/** JobList is a collection of jobs. */
export interface JobList extends ListOf<Job> {
  apiVersion?: "batch/v1";
  kind?: "JobList";
};
export function toJobList(input: c.JSONValue): JobList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "batch/v1", "JobList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toJob),
  }}
