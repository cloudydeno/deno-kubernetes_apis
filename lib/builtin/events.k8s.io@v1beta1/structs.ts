// Autogenerated Schema file for EventsV1beta1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data. */
export interface Event {
  apiVersion?: "events.k8s.io/v1beta1";
  kind?: "Event";
  action?: string | null;
  deprecatedCount?: number | null;
  deprecatedFirstTimestamp?: c.Time | null;
  deprecatedLastTimestamp?: c.Time | null;
  deprecatedSource?: CoreV1.EventSource | null;
  eventTime: c.MicroTime;
  metadata?: MetaV1.ObjectMeta | null;
  note?: string | null;
  reason?: string | null;
  regarding?: CoreV1.ObjectReference | null;
  related?: CoreV1.ObjectReference | null;
  reportingController?: string | null;
  reportingInstance?: string | null;
  series?: EventSeries | null;
  type?: string | null;
}
export function toEvent(input: c.JSONValue): Event & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "events.k8s.io/v1beta1", "Event"),
    action: c.readOpt(obj["action"], c.checkStr),
    deprecatedCount: c.readOpt(obj["deprecatedCount"], c.checkNum),
    deprecatedFirstTimestamp: c.readOpt(obj["deprecatedFirstTimestamp"], c.toTime),
    deprecatedLastTimestamp: c.readOpt(obj["deprecatedLastTimestamp"], c.toTime),
    deprecatedSource: c.readOpt(obj["deprecatedSource"], CoreV1.toEventSource),
    eventTime: c.toMicroTime(obj["eventTime"]),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    note: c.readOpt(obj["note"], c.checkStr),
    reason: c.readOpt(obj["reason"], c.checkStr),
    regarding: c.readOpt(obj["regarding"], CoreV1.toObjectReference),
    related: c.readOpt(obj["related"], CoreV1.toObjectReference),
    reportingController: c.readOpt(obj["reportingController"], c.checkStr),
    reportingInstance: c.readOpt(obj["reportingInstance"], c.checkStr),
    series: c.readOpt(obj["series"], toEventSeries),
    type: c.readOpt(obj["type"], c.checkStr),
  }}
export function fromEvent(input: Event): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "events.k8s.io/v1beta1", "Event"),
    ...input,
    deprecatedFirstTimestamp: input.deprecatedFirstTimestamp != null ? c.fromTime(input.deprecatedFirstTimestamp) : undefined,
    deprecatedLastTimestamp: input.deprecatedLastTimestamp != null ? c.fromTime(input.deprecatedLastTimestamp) : undefined,
    deprecatedSource: input.deprecatedSource != null ? CoreV1.fromEventSource(input.deprecatedSource) : undefined,
    eventTime: input.eventTime != null ? c.fromMicroTime(input.eventTime) : undefined,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    regarding: input.regarding != null ? CoreV1.fromObjectReference(input.regarding) : undefined,
    related: input.related != null ? CoreV1.fromObjectReference(input.related) : undefined,
    series: input.series != null ? fromEventSeries(input.series) : undefined,
  }}

/** EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time. */
export interface EventSeries {
  count: number;
  lastObservedTime: c.MicroTime;
}
export function toEventSeries(input: c.JSONValue): EventSeries {
  const obj = c.checkObj(input);
  return {
    count: c.checkNum(obj["count"]),
    lastObservedTime: c.toMicroTime(obj["lastObservedTime"]),
  }}
export function fromEventSeries(input: EventSeries): c.JSONValue {
  return {
    ...input,
    lastObservedTime: input.lastObservedTime != null ? c.fromMicroTime(input.lastObservedTime) : undefined,
  }}

/** EventList is a list of Event objects. */
export interface EventList extends ListOf<Event> {
  apiVersion?: "events.k8s.io/v1beta1";
  kind?: "EventList";
};
export function toEventList(input: c.JSONValue): EventList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "events.k8s.io/v1beta1", "EventList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toEvent),
  }}
