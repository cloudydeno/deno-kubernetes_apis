// Autogenerated Schema file for NetworkingV1alpha1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** ClusterCIDR represents a single configuration for per-Node Pod CIDR allocations when the MultiCIDRRangeAllocator is enabled (see the config for kube-controller-manager).  A cluster may have any number of ClusterCIDR resources, all of which will be considered when allocating a CIDR for a Node.  A ClusterCIDR is eligible to be used for a given Node when the node selector matches the node in question and has free CIDRs to allocate.  In case of multiple matching ClusterCIDR resources, the allocator will attempt to break ties using internal heuristics, but any ClusterCIDR whose node selector matches the Node may be used. */
export interface ClusterCIDR {
  apiVersion?: "networking.k8s.io/v1alpha1";
  kind?: "ClusterCIDR";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: ClusterCIDRSpec | null;
}
export function toClusterCIDR(input: c.JSONValue): ClusterCIDR & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1alpha1", "ClusterCIDR"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toClusterCIDRSpec),
  }}
export function fromClusterCIDR(input: ClusterCIDR): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "networking.k8s.io/v1alpha1", "ClusterCIDR"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromClusterCIDRSpec(input.spec) : undefined,
  }}

/** ClusterCIDRSpec defines the desired state of ClusterCIDR. */
export interface ClusterCIDRSpec {
  ipv4?: string | null;
  ipv6?: string | null;
  nodeSelector?: CoreV1.NodeSelector | null;
  perNodeHostBits: number;
}
export function toClusterCIDRSpec(input: c.JSONValue): ClusterCIDRSpec {
  const obj = c.checkObj(input);
  return {
    ipv4: c.readOpt(obj["ipv4"], c.checkStr),
    ipv6: c.readOpt(obj["ipv6"], c.checkStr),
    nodeSelector: c.readOpt(obj["nodeSelector"], CoreV1.toNodeSelector),
    perNodeHostBits: c.checkNum(obj["perNodeHostBits"]),
  }}
export function fromClusterCIDRSpec(input: ClusterCIDRSpec): c.JSONValue {
  return {
    ...input,
    nodeSelector: input.nodeSelector != null ? CoreV1.fromNodeSelector(input.nodeSelector) : undefined,
  }}

/** ClusterCIDRList contains a list of ClusterCIDR. */
export interface ClusterCIDRList extends ListOf<ClusterCIDR> {
  apiVersion?: "networking.k8s.io/v1alpha1";
  kind?: "ClusterCIDRList";
};
export function toClusterCIDRList(input: c.JSONValue): ClusterCIDRList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1alpha1", "ClusterCIDRList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toClusterCIDR),
  }}

/** IPAddress represents a single IP of a single IP Family. The object is designed to be used by APIs that operate on IP addresses. The object is used by the Service core API for allocation of IP addresses. An IP address can be represented in different formats, to guarantee the uniqueness of the IP, the name of the object is the IP address in canonical format, four decimal digits separated by dots suppressing leading zeros for IPv4 and the representation defined by RFC 5952 for IPv6. Valid: 192.168.1.5 or 2001:db8::1 or 2001:db8:aaaa:bbbb:cccc:dddd:eeee:1 Invalid: 10.01.2.3 or 2001:db8:0:0:0::1 */
export interface IPAddress {
  apiVersion?: "networking.k8s.io/v1alpha1";
  kind?: "IPAddress";
  metadata?: MetaV1.ObjectMeta | null;
  spec?: IPAddressSpec | null;
}
export function toIPAddress(input: c.JSONValue): IPAddress & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1alpha1", "IPAddress"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: c.readOpt(obj["spec"], toIPAddressSpec),
  }}
export function fromIPAddress(input: IPAddress): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "networking.k8s.io/v1alpha1", "IPAddress"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromIPAddressSpec(input.spec) : undefined,
  }}

/** IPAddressSpec describe the attributes in an IP Address. */
export interface IPAddressSpec {
  parentRef?: ParentReference | null;
}
export function toIPAddressSpec(input: c.JSONValue): IPAddressSpec {
  const obj = c.checkObj(input);
  return {
    parentRef: c.readOpt(obj["parentRef"], toParentReference),
  }}
export function fromIPAddressSpec(input: IPAddressSpec): c.JSONValue {
  return {
    ...input,
    parentRef: input.parentRef != null ? fromParentReference(input.parentRef) : undefined,
  }}

/** ParentReference describes a reference to a parent object. */
export interface ParentReference {
  group?: string | null;
  name?: string | null;
  namespace?: string | null;
  resource?: string | null;
  uid?: string | null;
}
export function toParentReference(input: c.JSONValue): ParentReference {
  const obj = c.checkObj(input);
  return {
    group: c.readOpt(obj["group"], c.checkStr),
    name: c.readOpt(obj["name"], c.checkStr),
    namespace: c.readOpt(obj["namespace"], c.checkStr),
    resource: c.readOpt(obj["resource"], c.checkStr),
    uid: c.readOpt(obj["uid"], c.checkStr),
  }}
export function fromParentReference(input: ParentReference): c.JSONValue {
  return {
    ...input,
  }}

/** IPAddressList contains a list of IPAddress. */
export interface IPAddressList extends ListOf<IPAddress> {
  apiVersion?: "networking.k8s.io/v1alpha1";
  kind?: "IPAddressList";
};
export function toIPAddressList(input: c.JSONValue): IPAddressList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "networking.k8s.io/v1alpha1", "IPAddressList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toIPAddress),
  }}
