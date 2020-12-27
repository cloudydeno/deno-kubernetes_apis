// Autogenerated Schema file for NetworkingV1beta1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** HTTPIngressPath associates a path with a backend. Incoming urls matching the path are forwarded to the backend. */
export interface HTTPIngressPath {
  backend: IngressBackend;
  path?: string | null;
  pathType?: string | null;
}
export function toHTTPIngressPath(input: c.JSONValue): HTTPIngressPath {
  const obj = c.checkObj(input);
  return {
    backend: toIngressBackend(obj["backend"]),
    path: c.readOpt(obj["path"], c.checkStr),
    pathType: c.readOpt(obj["pathType"], c.checkStr),
  }}
export function fromHTTPIngressPath(input: HTTPIngressPath): c.JSONValue {
  return {
    ...input,
    backend: input.backend != null ? fromIngressBackend(input.backend) : undefined,
  }}

/** IngressBackend describes all endpoints for a given service and port. */
export interface IngressBackend {
  resource?: CoreV1.TypedLocalObjectReference | null;
  serviceName?: string | null;
  servicePort?: c.IntOrString | null;
}
export function toIngressBackend(input: c.JSONValue): IngressBackend {
  const obj = c.checkObj(input);
  return {
    resource: c.readOpt(obj["resource"], CoreV1.toTypedLocalObjectReference),
    serviceName: c.readOpt(obj["serviceName"], c.checkStr),
    servicePort: c.readOpt(obj["servicePort"], c.toIntOrString),
  }}
export function fromIngressBackend(input: IngressBackend): c.JSONValue {
  return {
    ...input,
    resource: input.resource != null ? CoreV1.fromTypedLocalObjectReference(input.resource) : undefined,
  }}

/** HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'. */
export interface HTTPIngressRuleValue {
  paths: Array<HTTPIngressPath>;
}
export function toHTTPIngressRuleValue(input: c.JSONValue): HTTPIngressRuleValue {
  const obj = c.checkObj(input);
  return {
    paths: c.readList(obj["paths"], toHTTPIngressPath),
  }}
export function fromHTTPIngressRuleValue(input: HTTPIngressRuleValue): c.JSONValue {
  return {
    ...input,
    paths: input.paths?.map(fromHTTPIngressPath),
  }}

/** Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc. */
export interface Ingress {
  apiVersion?: "networking.k8s.io/v1beta1";
  kind?: "Ingress";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: IngressSpec | null;
  status?: IngressStatus | null;
}
export function toIngress(input: c.JSONValue): Ingress & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1beta1", "Ingress"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toIngressSpec),
    status: c.readOpt(obj["status"], toIngressStatus),
  }}
export function fromIngress(input: Ingress): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "networking.k8s.io/v1beta1", "Ingress"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromIngressSpec(input.spec) : undefined,
    status: input.status != null ? fromIngressStatus(input.status) : undefined,
  }}

/** IngressSpec describes the Ingress the user wishes to exist. */
export interface IngressSpec {
  backend?: IngressBackend | null;
  ingressClassName?: string | null;
  rules?: Array<IngressRule> | null;
  tls?: Array<IngressTLS> | null;
}
export function toIngressSpec(input: c.JSONValue): IngressSpec {
  const obj = c.checkObj(input);
  return {
    backend: c.readOpt(obj["backend"], toIngressBackend),
    ingressClassName: c.readOpt(obj["ingressClassName"], c.checkStr),
    rules: c.readOpt(obj["rules"], x => c.readList(x, toIngressRule)),
    tls: c.readOpt(obj["tls"], x => c.readList(x, toIngressTLS)),
  }}
export function fromIngressSpec(input: IngressSpec): c.JSONValue {
  return {
    ...input,
    backend: input.backend != null ? fromIngressBackend(input.backend) : undefined,
    rules: input.rules?.map(fromIngressRule),
    tls: input.tls?.map(fromIngressTLS),
  }}

/** IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue. */
export interface IngressRule {
  host?: string | null;
  http?: HTTPIngressRuleValue | null;
}
export function toIngressRule(input: c.JSONValue): IngressRule {
  const obj = c.checkObj(input);
  return {
    host: c.readOpt(obj["host"], c.checkStr),
    http: c.readOpt(obj["http"], toHTTPIngressRuleValue),
  }}
export function fromIngressRule(input: IngressRule): c.JSONValue {
  return {
    ...input,
    http: input.http != null ? fromHTTPIngressRuleValue(input.http) : undefined,
  }}

/** IngressTLS describes the transport layer security associated with an Ingress. */
export interface IngressTLS {
  hosts?: Array<string> | null;
  secretName?: string | null;
}
export function toIngressTLS(input: c.JSONValue): IngressTLS {
  const obj = c.checkObj(input);
  return {
    hosts: c.readOpt(obj["hosts"], x => c.readList(x, c.checkStr)),
    secretName: c.readOpt(obj["secretName"], c.checkStr),
  }}
export function fromIngressTLS(input: IngressTLS): c.JSONValue {
  return {
    ...input,
  }}

/** IngressStatus describe the current state of the Ingress. */
export interface IngressStatus {
  loadBalancer?: CoreV1.LoadBalancerStatus | null;
}
export function toIngressStatus(input: c.JSONValue): IngressStatus {
  const obj = c.checkObj(input);
  return {
    loadBalancer: c.readOpt(obj["loadBalancer"], CoreV1.toLoadBalancerStatus),
  }}
export function fromIngressStatus(input: IngressStatus): c.JSONValue {
  return {
    ...input,
    loadBalancer: input.loadBalancer != null ? CoreV1.fromLoadBalancerStatus(input.loadBalancer) : undefined,
  }}

/** IngressClass represents the class of the Ingress, referenced by the Ingress Spec. The `ingressclass.kubernetes.io/is-default-class` annotation can be used to indicate that an IngressClass should be considered default. When a single IngressClass resource has this annotation set to true, new Ingress resources without a class specified will be assigned this default class. */
export interface IngressClass {
  apiVersion?: "networking.k8s.io/v1beta1";
  kind?: "IngressClass";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: IngressClassSpec | null;
}
export function toIngressClass(input: c.JSONValue): IngressClass & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1beta1", "IngressClass"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toIngressClassSpec),
  }}
export function fromIngressClass(input: IngressClass): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "networking.k8s.io/v1beta1", "IngressClass"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromIngressClassSpec(input.spec) : undefined,
  }}

/** IngressClassSpec provides information about the class of an Ingress. */
export interface IngressClassSpec {
  controller?: string | null;
  parameters?: CoreV1.TypedLocalObjectReference | null;
}
export function toIngressClassSpec(input: c.JSONValue): IngressClassSpec {
  const obj = c.checkObj(input);
  return {
    controller: c.readOpt(obj["controller"], c.checkStr),
    parameters: c.readOpt(obj["parameters"], CoreV1.toTypedLocalObjectReference),
  }}
export function fromIngressClassSpec(input: IngressClassSpec): c.JSONValue {
  return {
    ...input,
    parameters: input.parameters != null ? CoreV1.fromTypedLocalObjectReference(input.parameters) : undefined,
  }}

/** IngressClassList is a collection of IngressClasses. */
export interface IngressClassList extends ListOf<IngressClass> {
  apiVersion?: "networking.k8s.io/v1beta1";
  kind?: "IngressClassList";
};
export function toIngressClassList(input: c.JSONValue): IngressClassList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1beta1", "IngressClassList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toIngressClass),
  }}

/** IngressList is a collection of Ingress. */
export interface IngressList extends ListOf<Ingress> {
  apiVersion?: "networking.k8s.io/v1beta1";
  kind?: "IngressList";
};
export function toIngressList(input: c.JSONValue): IngressList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1beta1", "IngressList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toIngress),
  }}
