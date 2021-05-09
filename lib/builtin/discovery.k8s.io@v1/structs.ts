// Autogenerated Schema file for DiscoveryV1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** Endpoint represents a single logical "backend" implementing a service. */
export interface Endpoint {
  addresses: Array<string>;
  conditions?: EndpointConditions | null;
  deprecatedTopology?: Record<string,string> | null;
  hints?: EndpointHints | null;
  hostname?: string | null;
  nodeName?: string | null;
  targetRef?: CoreV1.ObjectReference | null;
  zone?: string | null;
}
export function toEndpoint(input: c.JSONValue): Endpoint {
  const obj = c.checkObj(input);
  return {
    addresses: c.readList(obj["addresses"], c.checkStr),
    conditions: c.readOpt(obj["conditions"], toEndpointConditions),
    deprecatedTopology: c.readOpt(obj["deprecatedTopology"], x => c.readMap(x, c.checkStr)),
    hints: c.readOpt(obj["hints"], toEndpointHints),
    hostname: c.readOpt(obj["hostname"], c.checkStr),
    nodeName: c.readOpt(obj["nodeName"], c.checkStr),
    targetRef: c.readOpt(obj["targetRef"], CoreV1.toObjectReference),
    zone: c.readOpt(obj["zone"], c.checkStr),
  }}
export function fromEndpoint(input: Endpoint): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions != null ? fromEndpointConditions(input.conditions) : undefined,
    hints: input.hints != null ? fromEndpointHints(input.hints) : undefined,
    targetRef: input.targetRef != null ? CoreV1.fromObjectReference(input.targetRef) : undefined,
  }}

/** EndpointConditions represents the current condition of an endpoint. */
export interface EndpointConditions {
  ready?: boolean | null;
  serving?: boolean | null;
  terminating?: boolean | null;
}
export function toEndpointConditions(input: c.JSONValue): EndpointConditions {
  const obj = c.checkObj(input);
  return {
    ready: c.readOpt(obj["ready"], c.checkBool),
    serving: c.readOpt(obj["serving"], c.checkBool),
    terminating: c.readOpt(obj["terminating"], c.checkBool),
  }}
export function fromEndpointConditions(input: EndpointConditions): c.JSONValue {
  return {
    ...input,
  }}

/** EndpointHints provides hints describing how an endpoint should be consumed. */
export interface EndpointHints {
  forZones?: Array<ForZone> | null;
}
export function toEndpointHints(input: c.JSONValue): EndpointHints {
  const obj = c.checkObj(input);
  return {
    forZones: c.readOpt(obj["forZones"], x => c.readList(x, toForZone)),
  }}
export function fromEndpointHints(input: EndpointHints): c.JSONValue {
  return {
    ...input,
    forZones: input.forZones?.map(fromForZone),
  }}

/** ForZone provides information about which zones should consume this endpoint. */
export interface ForZone {
  name: string;
}
export function toForZone(input: c.JSONValue): ForZone {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
  }}
export function fromForZone(input: ForZone): c.JSONValue {
  return {
    ...input,
  }}

/** EndpointPort represents a Port used by an EndpointSlice */
export interface EndpointPort {
  appProtocol?: string | null;
  name?: string | null;
  port?: number | null;
  protocol?: string | null;
}
export function toEndpointPort(input: c.JSONValue): EndpointPort {
  const obj = c.checkObj(input);
  return {
    appProtocol: c.readOpt(obj["appProtocol"], c.checkStr),
    name: c.readOpt(obj["name"], c.checkStr),
    port: c.readOpt(obj["port"], c.checkNum),
    protocol: c.readOpt(obj["protocol"], c.checkStr),
  }}
export function fromEndpointPort(input: EndpointPort): c.JSONValue {
  return {
    ...input,
  }}

/** EndpointSlice represents a subset of the endpoints that implement a service. For a given service there may be multiple EndpointSlice objects, selected by labels, which must be joined to produce the full set of endpoints. */
export interface EndpointSlice {
  apiVersion?: "discovery.k8s.io/v1";
  kind?: "EndpointSlice";
  addressType: string;
  endpoints: Array<Endpoint>;
  metadata?: MetaV1.ObjectMeta | null;
  ports?: Array<EndpointPort> | null;
}
export function toEndpointSlice(input: c.JSONValue): EndpointSlice & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "discovery.k8s.io/v1", "EndpointSlice"),
    addressType: c.checkStr(obj["addressType"]),
    endpoints: c.readList(obj["endpoints"], toEndpoint),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    ports: c.readOpt(obj["ports"], x => c.readList(x, toEndpointPort)),
  }}
export function fromEndpointSlice(input: EndpointSlice): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "discovery.k8s.io/v1", "EndpointSlice"),
    ...input,
    endpoints: input.endpoints?.map(fromEndpoint),
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    ports: input.ports?.map(fromEndpointPort),
  }}

/** EndpointSliceList represents a list of endpoint slices */
export interface EndpointSliceList extends ListOf<EndpointSlice> {
  apiVersion?: "discovery.k8s.io/v1";
  kind?: "EndpointSliceList";
};
export function toEndpointSliceList(input: c.JSONValue): EndpointSliceList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "discovery.k8s.io/v1", "EndpointSliceList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toEndpointSlice),
  }}
