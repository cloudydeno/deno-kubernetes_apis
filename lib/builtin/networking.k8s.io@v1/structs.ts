// Autogenerated Schema file for NetworkingV1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type Kind<T extends string> = {
  apiVersion: "networking.k8s.io/v1";
  kind: T;
};
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
  service?: IngressServiceBackend | null;
}
export function toIngressBackend(input: c.JSONValue): IngressBackend {
  const obj = c.checkObj(input);
  return {
    resource: c.readOpt(obj["resource"], CoreV1.toTypedLocalObjectReference),
    service: c.readOpt(obj["service"], toIngressServiceBackend),
  }}
export function fromIngressBackend(input: IngressBackend): c.JSONValue {
  return {
    ...input,
    resource: input.resource != null ? CoreV1.fromTypedLocalObjectReference(input.resource) : undefined,
    service: input.service != null ? fromIngressServiceBackend(input.service) : undefined,
  }}

/** IngressServiceBackend references a Kubernetes Service as a Backend. */
export interface IngressServiceBackend {
  name: string;
  port?: ServiceBackendPort | null;
}
export function toIngressServiceBackend(input: c.JSONValue): IngressServiceBackend {
  const obj = c.checkObj(input);
  return {
    name: c.checkStr(obj["name"]),
    port: c.readOpt(obj["port"], toServiceBackendPort),
  }}
export function fromIngressServiceBackend(input: IngressServiceBackend): c.JSONValue {
  return {
    ...input,
    port: input.port != null ? fromServiceBackendPort(input.port) : undefined,
  }}

/** ServiceBackendPort is the service port being referenced. */
export interface ServiceBackendPort {
  name?: string | null;
  number?: number | null;
}
export function toServiceBackendPort(input: c.JSONValue): ServiceBackendPort {
  const obj = c.checkObj(input);
  return {
    name: c.readOpt(obj["name"], c.checkStr),
    number: c.readOpt(obj["number"], c.checkNum),
  }}
export function fromServiceBackendPort(input: ServiceBackendPort): c.JSONValue {
  return {
    ...input,
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

/** IPBlock describes a particular CIDR (Ex. "192.168.1.1/24","2001:db9::/64") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule. */
export interface IPBlock {
  cidr: string;
  except?: Array<string> | null;
}
export function toIPBlock(input: c.JSONValue): IPBlock {
  const obj = c.checkObj(input);
  return {
    cidr: c.checkStr(obj["cidr"]),
    except: c.readOpt(obj["except"], x => c.readList(x, c.checkStr)),
  }}
export function fromIPBlock(input: IPBlock): c.JSONValue {
  return {
    ...input,
  }}

/** Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc. */
export type Ingress = Kind<"Ingress"> & IngressFields;
export interface IngressFields {
  metadata?: MetaV1.ObjectMeta | null;
  spec?: IngressSpec | null;
  status?: IngressStatus | null;
}
export function toIngressFields(input: c.JSONValue): IngressFields {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toIngressSpec),
    status: c.readOpt(obj["status"], toIngressStatus),
  }}
export function toIngress(input: c.JSONValue): Ingress {
  const {apiVersion, kind, ...fields} = c.checkObj(input);
  if (apiVersion !== "networking.k8s.io/v1") throw new Error("Type apiv mis 2");
  if (kind !== "Ingress") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    ...toIngressFields(fields),
  }}
export function fromIngress(input: Ingress): c.JSONValue {
  return {
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromIngressSpec(input.spec) : undefined,
    status: input.status != null ? fromIngressStatus(input.status) : undefined,
  }}

/** IngressSpec describes the Ingress the user wishes to exist. */
export interface IngressSpec {
  defaultBackend?: IngressBackend | null;
  ingressClassName?: string | null;
  rules?: Array<IngressRule> | null;
  tls?: Array<IngressTLS> | null;
}
export function toIngressSpec(input: c.JSONValue): IngressSpec {
  const obj = c.checkObj(input);
  return {
    defaultBackend: c.readOpt(obj["defaultBackend"], toIngressBackend),
    ingressClassName: c.readOpt(obj["ingressClassName"], c.checkStr),
    rules: c.readOpt(obj["rules"], x => c.readList(x, toIngressRule)),
    tls: c.readOpt(obj["tls"], x => c.readList(x, toIngressTLS)),
  }}
export function fromIngressSpec(input: IngressSpec): c.JSONValue {
  return {
    ...input,
    defaultBackend: input.defaultBackend != null ? fromIngressBackend(input.defaultBackend) : undefined,
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
export type IngressClass = Kind<"IngressClass"> & IngressClassFields;
export interface IngressClassFields {
  metadata?: MetaV1.ObjectMeta | null;
  spec?: IngressClassSpec | null;
}
export function toIngressClassFields(input: c.JSONValue): IngressClassFields {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toIngressClassSpec),
  }}
export function toIngressClass(input: c.JSONValue): IngressClass {
  const {apiVersion, kind, ...fields} = c.checkObj(input);
  if (apiVersion !== "networking.k8s.io/v1") throw new Error("Type apiv mis 2");
  if (kind !== "IngressClass") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    ...toIngressClassFields(fields),
  }}
export function fromIngressClass(input: IngressClass): c.JSONValue {
  return {
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
export type IngressClassList = Kind<"IngressClassList"> & ListOf<IngressClassFields>;
export function toIngressClassList(input: c.JSONValue): IngressClassList {
  const {apiVersion, kind, metadata, items} = c.checkObj(input);
  if (apiVersion !== "networking.k8s.io/v1") throw new Error("Type apiv mis 2");
  if (kind !== "IngressClassList") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    metadata: MetaV1.toListMeta(metadata),
    items: c.readList(items, toIngressClassFields),
  }}

/** IngressList is a collection of Ingress. */
export type IngressList = Kind<"IngressList"> & ListOf<IngressFields>;
export function toIngressList(input: c.JSONValue): IngressList {
  const {apiVersion, kind, metadata, items} = c.checkObj(input);
  if (apiVersion !== "networking.k8s.io/v1") throw new Error("Type apiv mis 2");
  if (kind !== "IngressList") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    metadata: MetaV1.toListMeta(metadata),
    items: c.readList(items, toIngressFields),
  }}

/** NetworkPolicy describes what network traffic is allowed for a set of Pods */
export type NetworkPolicy = Kind<"NetworkPolicy"> & NetworkPolicyFields;
export interface NetworkPolicyFields {
  metadata?: MetaV1.ObjectMeta | null;
  spec?: NetworkPolicySpec | null;
}
export function toNetworkPolicyFields(input: c.JSONValue): NetworkPolicyFields {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toNetworkPolicySpec),
  }}
export function toNetworkPolicy(input: c.JSONValue): NetworkPolicy {
  const {apiVersion, kind, ...fields} = c.checkObj(input);
  if (apiVersion !== "networking.k8s.io/v1") throw new Error("Type apiv mis 2");
  if (kind !== "NetworkPolicy") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    ...toNetworkPolicyFields(fields),
  }}
export function fromNetworkPolicy(input: NetworkPolicy): c.JSONValue {
  return {
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromNetworkPolicySpec(input.spec) : undefined,
  }}

/** NetworkPolicySpec provides the specification of a NetworkPolicy */
export interface NetworkPolicySpec {
  egress?: Array<NetworkPolicyEgressRule> | null;
  ingress?: Array<NetworkPolicyIngressRule> | null;
  podSelector: MetaV1.LabelSelector;
  policyTypes?: Array<string> | null;
}
export function toNetworkPolicySpec(input: c.JSONValue): NetworkPolicySpec {
  const obj = c.checkObj(input);
  return {
    egress: c.readOpt(obj["egress"], x => c.readList(x, toNetworkPolicyEgressRule)),
    ingress: c.readOpt(obj["ingress"], x => c.readList(x, toNetworkPolicyIngressRule)),
    podSelector: MetaV1.toLabelSelector(obj["podSelector"]),
    policyTypes: c.readOpt(obj["policyTypes"], x => c.readList(x, c.checkStr)),
  }}
export function fromNetworkPolicySpec(input: NetworkPolicySpec): c.JSONValue {
  return {
    ...input,
    egress: input.egress?.map(fromNetworkPolicyEgressRule),
    ingress: input.ingress?.map(fromNetworkPolicyIngressRule),
    podSelector: input.podSelector != null ? MetaV1.fromLabelSelector(input.podSelector) : undefined,
  }}

/** NetworkPolicyEgressRule describes a particular set of traffic that is allowed out of pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and to. This type is beta-level in 1.8 */
export interface NetworkPolicyEgressRule {
  ports?: Array<NetworkPolicyPort> | null;
  to?: Array<NetworkPolicyPeer> | null;
}
export function toNetworkPolicyEgressRule(input: c.JSONValue): NetworkPolicyEgressRule {
  const obj = c.checkObj(input);
  return {
    ports: c.readOpt(obj["ports"], x => c.readList(x, toNetworkPolicyPort)),
    to: c.readOpt(obj["to"], x => c.readList(x, toNetworkPolicyPeer)),
  }}
export function fromNetworkPolicyEgressRule(input: NetworkPolicyEgressRule): c.JSONValue {
  return {
    ...input,
    ports: input.ports?.map(fromNetworkPolicyPort),
    to: input.to?.map(fromNetworkPolicyPeer),
  }}

/** NetworkPolicyPort describes a port to allow traffic on */
export interface NetworkPolicyPort {
  port?: c.IntOrString | null;
  protocol?: string | null;
}
export function toNetworkPolicyPort(input: c.JSONValue): NetworkPolicyPort {
  const obj = c.checkObj(input);
  return {
    port: c.readOpt(obj["port"], c.toIntOrString),
    protocol: c.readOpt(obj["protocol"], c.checkStr),
  }}
export function fromNetworkPolicyPort(input: NetworkPolicyPort): c.JSONValue {
  return {
    ...input,
  }}

/** NetworkPolicyPeer describes a peer to allow traffic to/from. Only certain combinations of fields are allowed */
export interface NetworkPolicyPeer {
  ipBlock?: IPBlock | null;
  namespaceSelector?: MetaV1.LabelSelector | null;
  podSelector?: MetaV1.LabelSelector | null;
}
export function toNetworkPolicyPeer(input: c.JSONValue): NetworkPolicyPeer {
  const obj = c.checkObj(input);
  return {
    ipBlock: c.readOpt(obj["ipBlock"], toIPBlock),
    namespaceSelector: c.readOpt(obj["namespaceSelector"], MetaV1.toLabelSelector),
    podSelector: c.readOpt(obj["podSelector"], MetaV1.toLabelSelector),
  }}
export function fromNetworkPolicyPeer(input: NetworkPolicyPeer): c.JSONValue {
  return {
    ...input,
    ipBlock: input.ipBlock != null ? fromIPBlock(input.ipBlock) : undefined,
    namespaceSelector: input.namespaceSelector != null ? MetaV1.fromLabelSelector(input.namespaceSelector) : undefined,
    podSelector: input.podSelector != null ? MetaV1.fromLabelSelector(input.podSelector) : undefined,
  }}

/** NetworkPolicyIngressRule describes a particular set of traffic that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and from. */
export interface NetworkPolicyIngressRule {
  from?: Array<NetworkPolicyPeer> | null;
  ports?: Array<NetworkPolicyPort> | null;
}
export function toNetworkPolicyIngressRule(input: c.JSONValue): NetworkPolicyIngressRule {
  const obj = c.checkObj(input);
  return {
    from: c.readOpt(obj["from"], x => c.readList(x, toNetworkPolicyPeer)),
    ports: c.readOpt(obj["ports"], x => c.readList(x, toNetworkPolicyPort)),
  }}
export function fromNetworkPolicyIngressRule(input: NetworkPolicyIngressRule): c.JSONValue {
  return {
    ...input,
    from: input.from?.map(fromNetworkPolicyPeer),
    ports: input.ports?.map(fromNetworkPolicyPort),
  }}

/** NetworkPolicyList is a list of NetworkPolicy objects. */
export type NetworkPolicyList = Kind<"NetworkPolicyList"> & ListOf<NetworkPolicyFields>;
export function toNetworkPolicyList(input: c.JSONValue): NetworkPolicyList {
  const {apiVersion, kind, metadata, items} = c.checkObj(input);
  if (apiVersion !== "networking.k8s.io/v1") throw new Error("Type apiv mis 2");
  if (kind !== "NetworkPolicyList") throw new Error("Type kind mis 2");
  return {
    apiVersion, kind,
    metadata: MetaV1.toListMeta(metadata),
    items: c.readList(items, toNetworkPolicyFields),
  }}
