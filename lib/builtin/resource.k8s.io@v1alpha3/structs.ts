// Autogenerated Schema file for ResourceV1alpha3
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** AllocatedDeviceStatus contains the status of an allocated device, if the driver chooses to report it. This may include driver-specific information. */
export interface AllocatedDeviceStatus {
  conditions?: Array<MetaV1.Condition> | null;
  data?: c.JSONValue | null;
  device: string;
  driver: string;
  networkData?: NetworkDeviceData | null;
  pool: string;
}
export function toAllocatedDeviceStatus(input: c.JSONValue): AllocatedDeviceStatus {
  const obj = c.checkObj(input);
  return {
    conditions: c.readOpt(obj["conditions"], x => c.readList(x, MetaV1.toCondition)),
    data: c.readOpt(obj["data"], c.identity),
    device: c.checkStr(obj["device"]),
    driver: c.checkStr(obj["driver"]),
    networkData: c.readOpt(obj["networkData"], toNetworkDeviceData),
    pool: c.checkStr(obj["pool"]),
  }}
export function fromAllocatedDeviceStatus(input: AllocatedDeviceStatus): c.JSONValue {
  return {
    ...input,
    conditions: input.conditions?.map(MetaV1.fromCondition),
    networkData: input.networkData != null ? fromNetworkDeviceData(input.networkData) : undefined,
  }}

/** NetworkDeviceData provides network-related details for the allocated device. This information may be filled by drivers or other components to configure or identify the device within a network context. */
export interface NetworkDeviceData {
  hardwareAddress?: string | null;
  interfaceName?: string | null;
  ips?: Array<string> | null;
}
export function toNetworkDeviceData(input: c.JSONValue): NetworkDeviceData {
  const obj = c.checkObj(input);
  return {
    hardwareAddress: c.readOpt(obj["hardwareAddress"], c.checkStr),
    interfaceName: c.readOpt(obj["interfaceName"], c.checkStr),
    ips: c.readOpt(obj["ips"], x => c.readList(x, c.checkStr)),
  }}
export function fromNetworkDeviceData(input: NetworkDeviceData): c.JSONValue {
  return {
    ...input,
  }}

/** AllocationResult contains attributes of an allocated resource. */
export interface AllocationResult {
  devices?: DeviceAllocationResult | null;
  nodeSelector?: CoreV1.NodeSelector | null;
}
export function toAllocationResult(input: c.JSONValue): AllocationResult {
  const obj = c.checkObj(input);
  return {
    devices: c.readOpt(obj["devices"], toDeviceAllocationResult),
    nodeSelector: c.readOpt(obj["nodeSelector"], CoreV1.toNodeSelector),
  }}
export function fromAllocationResult(input: AllocationResult): c.JSONValue {
  return {
    ...input,
    devices: input.devices != null ? fromDeviceAllocationResult(input.devices) : undefined,
    nodeSelector: input.nodeSelector != null ? CoreV1.fromNodeSelector(input.nodeSelector) : undefined,
  }}

/** DeviceAllocationResult is the result of allocating devices. */
export interface DeviceAllocationResult {
  config?: Array<DeviceAllocationConfiguration> | null;
  results?: Array<DeviceRequestAllocationResult> | null;
}
export function toDeviceAllocationResult(input: c.JSONValue): DeviceAllocationResult {
  const obj = c.checkObj(input);
  return {
    config: c.readOpt(obj["config"], x => c.readList(x, toDeviceAllocationConfiguration)),
    results: c.readOpt(obj["results"], x => c.readList(x, toDeviceRequestAllocationResult)),
  }}
export function fromDeviceAllocationResult(input: DeviceAllocationResult): c.JSONValue {
  return {
    ...input,
    config: input.config?.map(fromDeviceAllocationConfiguration),
    results: input.results?.map(fromDeviceRequestAllocationResult),
  }}

/** DeviceAllocationConfiguration gets embedded in an AllocationResult. */
export interface DeviceAllocationConfiguration {
  opaque?: OpaqueDeviceConfiguration | null;
  requests?: Array<string> | null;
  source: string;
}
export function toDeviceAllocationConfiguration(input: c.JSONValue): DeviceAllocationConfiguration {
  const obj = c.checkObj(input);
  return {
    opaque: c.readOpt(obj["opaque"], toOpaqueDeviceConfiguration),
    requests: c.readOpt(obj["requests"], x => c.readList(x, c.checkStr)),
    source: c.checkStr(obj["source"]),
  }}
export function fromDeviceAllocationConfiguration(input: DeviceAllocationConfiguration): c.JSONValue {
  return {
    ...input,
    opaque: input.opaque != null ? fromOpaqueDeviceConfiguration(input.opaque) : undefined,
  }}

/** OpaqueDeviceConfiguration contains configuration parameters for a driver in a format defined by the driver vendor. */
export interface OpaqueDeviceConfiguration {
  driver: string;
  parameters: c.JSONValue;
}
export function toOpaqueDeviceConfiguration(input: c.JSONValue): OpaqueDeviceConfiguration {
  const obj = c.checkObj(input);
  return {
    driver: c.checkStr(obj["driver"]),
    parameters: c.identity(obj["parameters"]),
  }}
export function fromOpaqueDeviceConfiguration(input: OpaqueDeviceConfiguration): c.JSONValue {
  return {
    ...input,
  }}

/** DeviceRequestAllocationResult contains the allocation result for one request. */
export interface DeviceRequestAllocationResult {
  adminAccess?: boolean | null;
  device: string;
  driver: string;
  pool: string;
  request: string;
}
export function toDeviceRequestAllocationResult(input: c.JSONValue): DeviceRequestAllocationResult {
  const obj = c.checkObj(input);
  return {
    adminAccess: c.readOpt(obj["adminAccess"], c.checkBool),
    device: c.checkStr(obj["device"]),
    driver: c.checkStr(obj["driver"]),
    pool: c.checkStr(obj["pool"]),
    request: c.checkStr(obj["request"]),
  }}
export function fromDeviceRequestAllocationResult(input: DeviceRequestAllocationResult): c.JSONValue {
  return {
    ...input,
  }}

/** BasicDevice defines one device instance. */
export interface BasicDevice {
  attributes?: Record<string,DeviceAttribute> | null;
  capacity?: Record<string,c.Quantity> | null;
}
export function toBasicDevice(input: c.JSONValue): BasicDevice {
  const obj = c.checkObj(input);
  return {
    attributes: c.readOpt(obj["attributes"], x => c.readMap(x, toDeviceAttribute)),
    capacity: c.readOpt(obj["capacity"], x => c.readMap(x, c.toQuantity)),
  }}
export function fromBasicDevice(input: BasicDevice): c.JSONValue {
  return {
    ...input,
    attributes: c.writeMap(input.attributes, fromDeviceAttribute),
    capacity: c.writeMap(input.capacity, c.fromQuantity),
  }}

/** DeviceAttribute must have exactly one field set. */
export interface DeviceAttribute {
  bool?: boolean | null;
  int?: number | null;
  string?: string | null;
  version?: string | null;
}
export function toDeviceAttribute(input: c.JSONValue): DeviceAttribute {
  const obj = c.checkObj(input);
  return {
    bool: c.readOpt(obj["bool"], c.checkBool),
    int: c.readOpt(obj["int"], c.checkNum),
    string: c.readOpt(obj["string"], c.checkStr),
    version: c.readOpt(obj["version"], c.checkStr),
  }}
export function fromDeviceAttribute(input: DeviceAttribute): c.JSONValue {
  return {
    ...input,
  }}

/** CELDeviceSelector contains a CEL expression for selecting a device. */
export interface CELDeviceSelector {
  expression: string;
}
export function toCELDeviceSelector(input: c.JSONValue): CELDeviceSelector {
  const obj = c.checkObj(input);
  return {
    expression: c.checkStr(obj["expression"]),
  }}
export function fromCELDeviceSelector(input: CELDeviceSelector): c.JSONValue {
  return {
    ...input,
  }}

/** Device represents one individual hardware instance that can be selected based on its attributes. Besides the name, exactly one field must be set. */
export interface Device {
  basic?: BasicDevice | null;
  name: string;
}
export function toDevice(input: c.JSONValue): Device {
  const obj = c.checkObj(input);
  return {
    basic: c.readOpt(obj["basic"], toBasicDevice),
    name: c.checkStr(obj["name"]),
  }}
export function fromDevice(input: Device): c.JSONValue {
  return {
    ...input,
    basic: input.basic != null ? fromBasicDevice(input.basic) : undefined,
  }}

/** DeviceClaim defines how to request devices with a ResourceClaim. */
export interface DeviceClaim {
  config?: Array<DeviceClaimConfiguration> | null;
  constraints?: Array<DeviceConstraint> | null;
  requests?: Array<DeviceRequest> | null;
}
export function toDeviceClaim(input: c.JSONValue): DeviceClaim {
  const obj = c.checkObj(input);
  return {
    config: c.readOpt(obj["config"], x => c.readList(x, toDeviceClaimConfiguration)),
    constraints: c.readOpt(obj["constraints"], x => c.readList(x, toDeviceConstraint)),
    requests: c.readOpt(obj["requests"], x => c.readList(x, toDeviceRequest)),
  }}
export function fromDeviceClaim(input: DeviceClaim): c.JSONValue {
  return {
    ...input,
    config: input.config?.map(fromDeviceClaimConfiguration),
    constraints: input.constraints?.map(fromDeviceConstraint),
    requests: input.requests?.map(fromDeviceRequest),
  }}

/** DeviceClaimConfiguration is used for configuration parameters in DeviceClaim. */
export interface DeviceClaimConfiguration {
  opaque?: OpaqueDeviceConfiguration | null;
  requests?: Array<string> | null;
}
export function toDeviceClaimConfiguration(input: c.JSONValue): DeviceClaimConfiguration {
  const obj = c.checkObj(input);
  return {
    opaque: c.readOpt(obj["opaque"], toOpaqueDeviceConfiguration),
    requests: c.readOpt(obj["requests"], x => c.readList(x, c.checkStr)),
  }}
export function fromDeviceClaimConfiguration(input: DeviceClaimConfiguration): c.JSONValue {
  return {
    ...input,
    opaque: input.opaque != null ? fromOpaqueDeviceConfiguration(input.opaque) : undefined,
  }}

/** DeviceConstraint must have exactly one field set besides Requests. */
export interface DeviceConstraint {
  matchAttribute?: string | null;
  requests?: Array<string> | null;
}
export function toDeviceConstraint(input: c.JSONValue): DeviceConstraint {
  const obj = c.checkObj(input);
  return {
    matchAttribute: c.readOpt(obj["matchAttribute"], c.checkStr),
    requests: c.readOpt(obj["requests"], x => c.readList(x, c.checkStr)),
  }}
export function fromDeviceConstraint(input: DeviceConstraint): c.JSONValue {
  return {
    ...input,
  }}

/** DeviceRequest is a request for devices required for a claim. This is typically a request for a single resource like a device, but can also ask for several identical devices.

A DeviceClassName is currently required. Clients must check that it is indeed set. It's absence indicates that something changed in a way that is not supported by the client yet, in which case it must refuse to handle the request. */
export interface DeviceRequest {
  adminAccess?: boolean | null;
  allocationMode?: string | null;
  count?: number | null;
  deviceClassName: string;
  name: string;
  selectors?: Array<DeviceSelector> | null;
}
export function toDeviceRequest(input: c.JSONValue): DeviceRequest {
  const obj = c.checkObj(input);
  return {
    adminAccess: c.readOpt(obj["adminAccess"], c.checkBool),
    allocationMode: c.readOpt(obj["allocationMode"], c.checkStr),
    count: c.readOpt(obj["count"], c.checkNum),
    deviceClassName: c.checkStr(obj["deviceClassName"]),
    name: c.checkStr(obj["name"]),
    selectors: c.readOpt(obj["selectors"], x => c.readList(x, toDeviceSelector)),
  }}
export function fromDeviceRequest(input: DeviceRequest): c.JSONValue {
  return {
    ...input,
    selectors: input.selectors?.map(fromDeviceSelector),
  }}

/** DeviceSelector must have exactly one field set. */
export interface DeviceSelector {
  cel?: CELDeviceSelector | null;
}
export function toDeviceSelector(input: c.JSONValue): DeviceSelector {
  const obj = c.checkObj(input);
  return {
    cel: c.readOpt(obj["cel"], toCELDeviceSelector),
  }}
export function fromDeviceSelector(input: DeviceSelector): c.JSONValue {
  return {
    ...input,
    cel: input.cel != null ? fromCELDeviceSelector(input.cel) : undefined,
  }}

/** DeviceClass is a vendor- or admin-provided resource that contains device configuration and selectors. It can be referenced in the device requests of a claim to apply these presets. Cluster scoped.

This is an alpha type and requires enabling the DynamicResourceAllocation feature gate. */
export interface DeviceClass {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "DeviceClass";
  metadata?: MetaV1.ObjectMeta | null;
  spec: DeviceClassSpec;
}
export function toDeviceClass(input: c.JSONValue): DeviceClass & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "DeviceClass"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toDeviceClassSpec(obj["spec"]),
  }}
export function fromDeviceClass(input: DeviceClass): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "resource.k8s.io/v1alpha3", "DeviceClass"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromDeviceClassSpec(input.spec) : undefined,
  }}

/** DeviceClassSpec is used in a [DeviceClass] to define what can be allocated and how to configure it. */
export interface DeviceClassSpec {
  config?: Array<DeviceClassConfiguration> | null;
  selectors?: Array<DeviceSelector> | null;
}
export function toDeviceClassSpec(input: c.JSONValue): DeviceClassSpec {
  const obj = c.checkObj(input);
  return {
    config: c.readOpt(obj["config"], x => c.readList(x, toDeviceClassConfiguration)),
    selectors: c.readOpt(obj["selectors"], x => c.readList(x, toDeviceSelector)),
  }}
export function fromDeviceClassSpec(input: DeviceClassSpec): c.JSONValue {
  return {
    ...input,
    config: input.config?.map(fromDeviceClassConfiguration),
    selectors: input.selectors?.map(fromDeviceSelector),
  }}

/** DeviceClassConfiguration is used in DeviceClass. */
export interface DeviceClassConfiguration {
  opaque?: OpaqueDeviceConfiguration | null;
}
export function toDeviceClassConfiguration(input: c.JSONValue): DeviceClassConfiguration {
  const obj = c.checkObj(input);
  return {
    opaque: c.readOpt(obj["opaque"], toOpaqueDeviceConfiguration),
  }}
export function fromDeviceClassConfiguration(input: DeviceClassConfiguration): c.JSONValue {
  return {
    ...input,
    opaque: input.opaque != null ? fromOpaqueDeviceConfiguration(input.opaque) : undefined,
  }}

/** DeviceClassList is a collection of classes. */
export interface DeviceClassList extends ListOf<DeviceClass> {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "DeviceClassList";
};
export function toDeviceClassList(input: c.JSONValue): DeviceClassList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "DeviceClassList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toDeviceClass),
  }}

/** ResourceClaim describes a request for access to resources in the cluster, for use by workloads. For example, if a workload needs an accelerator device with specific properties, this is how that request is expressed. The status stanza tracks whether this claim has been satisfied and what specific resources have been allocated.

This is an alpha type and requires enabling the DynamicResourceAllocation feature gate. */
export interface ResourceClaim {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "ResourceClaim";
  metadata?: MetaV1.ObjectMeta | null;
  spec: ResourceClaimSpec;
  status?: ResourceClaimStatus | null;
}
export function toResourceClaim(input: c.JSONValue): ResourceClaim & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "ResourceClaim"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toResourceClaimSpec(obj["spec"]),
    status: c.readOpt(obj["status"], toResourceClaimStatus),
  }}
export function fromResourceClaim(input: ResourceClaim): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "resource.k8s.io/v1alpha3", "ResourceClaim"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromResourceClaimSpec(input.spec) : undefined,
    status: input.status != null ? fromResourceClaimStatus(input.status) : undefined,
  }}

/** ResourceClaimSpec defines what is being requested in a ResourceClaim and how to configure it. */
export interface ResourceClaimSpec {
  devices?: DeviceClaim | null;
}
export function toResourceClaimSpec(input: c.JSONValue): ResourceClaimSpec {
  const obj = c.checkObj(input);
  return {
    devices: c.readOpt(obj["devices"], toDeviceClaim),
  }}
export function fromResourceClaimSpec(input: ResourceClaimSpec): c.JSONValue {
  return {
    ...input,
    devices: input.devices != null ? fromDeviceClaim(input.devices) : undefined,
  }}

/** ResourceClaimStatus tracks whether the resource has been allocated and what the result of that was. */
export interface ResourceClaimStatus {
  allocation?: AllocationResult | null;
  devices?: Array<AllocatedDeviceStatus> | null;
  reservedFor?: Array<ResourceClaimConsumerReference> | null;
}
export function toResourceClaimStatus(input: c.JSONValue): ResourceClaimStatus {
  const obj = c.checkObj(input);
  return {
    allocation: c.readOpt(obj["allocation"], toAllocationResult),
    devices: c.readOpt(obj["devices"], x => c.readList(x, toAllocatedDeviceStatus)),
    reservedFor: c.readOpt(obj["reservedFor"], x => c.readList(x, toResourceClaimConsumerReference)),
  }}
export function fromResourceClaimStatus(input: ResourceClaimStatus): c.JSONValue {
  return {
    ...input,
    allocation: input.allocation != null ? fromAllocationResult(input.allocation) : undefined,
    devices: input.devices?.map(fromAllocatedDeviceStatus),
    reservedFor: input.reservedFor?.map(fromResourceClaimConsumerReference),
  }}

/** ResourceClaimConsumerReference contains enough information to let you locate the consumer of a ResourceClaim. The user must be a resource in the same namespace as the ResourceClaim. */
export interface ResourceClaimConsumerReference {
  apiGroup?: string | null;
  name: string;
  resource: string;
  uid: string;
}
export function toResourceClaimConsumerReference(input: c.JSONValue): ResourceClaimConsumerReference {
  const obj = c.checkObj(input);
  return {
    apiGroup: c.readOpt(obj["apiGroup"], c.checkStr),
    name: c.checkStr(obj["name"]),
    resource: c.checkStr(obj["resource"]),
    uid: c.checkStr(obj["uid"]),
  }}
export function fromResourceClaimConsumerReference(input: ResourceClaimConsumerReference): c.JSONValue {
  return {
    ...input,
  }}

/** ResourceClaimList is a collection of claims. */
export interface ResourceClaimList extends ListOf<ResourceClaim> {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "ResourceClaimList";
};
export function toResourceClaimList(input: c.JSONValue): ResourceClaimList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "ResourceClaimList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toResourceClaim),
  }}

/** ResourceClaimTemplate is used to produce ResourceClaim objects.

This is an alpha type and requires enabling the DynamicResourceAllocation feature gate. */
export interface ResourceClaimTemplate {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "ResourceClaimTemplate";
  metadata?: MetaV1.ObjectMeta | null;
  spec: ResourceClaimTemplateSpec;
}
export function toResourceClaimTemplate(input: c.JSONValue): ResourceClaimTemplate & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "ResourceClaimTemplate"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toResourceClaimTemplateSpec(obj["spec"]),
  }}
export function fromResourceClaimTemplate(input: ResourceClaimTemplate): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "resource.k8s.io/v1alpha3", "ResourceClaimTemplate"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromResourceClaimTemplateSpec(input.spec) : undefined,
  }}

/** ResourceClaimTemplateSpec contains the metadata and fields for a ResourceClaim. */
export interface ResourceClaimTemplateSpec {
  metadata?: MetaV1.ObjectMeta | null;
  spec: ResourceClaimSpec;
}
export function toResourceClaimTemplateSpec(input: c.JSONValue): ResourceClaimTemplateSpec {
  const obj = c.checkObj(input);
  return {
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toResourceClaimSpec(obj["spec"]),
  }}
export function fromResourceClaimTemplateSpec(input: ResourceClaimTemplateSpec): c.JSONValue {
  return {
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromResourceClaimSpec(input.spec) : undefined,
  }}

/** ResourceClaimTemplateList is a collection of claim templates. */
export interface ResourceClaimTemplateList extends ListOf<ResourceClaimTemplate> {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "ResourceClaimTemplateList";
};
export function toResourceClaimTemplateList(input: c.JSONValue): ResourceClaimTemplateList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "ResourceClaimTemplateList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toResourceClaimTemplate),
  }}

/** ResourcePool describes the pool that ResourceSlices belong to. */
export interface ResourcePool {
  generation: number;
  name: string;
  resourceSliceCount: number;
}
export function toResourcePool(input: c.JSONValue): ResourcePool {
  const obj = c.checkObj(input);
  return {
    generation: c.checkNum(obj["generation"]),
    name: c.checkStr(obj["name"]),
    resourceSliceCount: c.checkNum(obj["resourceSliceCount"]),
  }}
export function fromResourcePool(input: ResourcePool): c.JSONValue {
  return {
    ...input,
  }}

/** ResourceSlice represents one or more resources in a pool of similar resources, managed by a common driver. A pool may span more than one ResourceSlice, and exactly how many ResourceSlices comprise a pool is determined by the driver.

At the moment, the only supported resources are devices with attributes and capacities. Each device in a given pool, regardless of how many ResourceSlices, must have a unique name. The ResourceSlice in which a device gets published may change over time. The unique identifier for a device is the tuple <driver name>, <pool name>, <device name>.

Whenever a driver needs to update a pool, it increments the pool.Spec.Pool.Generation number and updates all ResourceSlices with that new number and new resource definitions. A consumer must only use ResourceSlices with the highest generation number and ignore all others.

When allocating all resources in a pool matching certain criteria or when looking for the best solution among several different alternatives, a consumer should check the number of ResourceSlices in a pool (included in each ResourceSlice) to determine whether its view of a pool is complete and if not, should wait until the driver has completed updating the pool.

For resources that are not local to a node, the node name is not set. Instead, the driver may use a node selector to specify where the devices are available.

This is an alpha type and requires enabling the DynamicResourceAllocation feature gate. */
export interface ResourceSlice {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "ResourceSlice";
  metadata?: MetaV1.ObjectMeta | null;
  spec: ResourceSliceSpec;
}
export function toResourceSlice(input: c.JSONValue): ResourceSlice & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "ResourceSlice"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toResourceSliceSpec(obj["spec"]),
  }}
export function fromResourceSlice(input: ResourceSlice): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "resource.k8s.io/v1alpha3", "ResourceSlice"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromResourceSliceSpec(input.spec) : undefined,
  }}

/** ResourceSliceSpec contains the information published by the driver in one ResourceSlice. */
export interface ResourceSliceSpec {
  allNodes?: boolean | null;
  devices?: Array<Device> | null;
  driver: string;
  nodeName?: string | null;
  nodeSelector?: CoreV1.NodeSelector | null;
  pool: ResourcePool;
}
export function toResourceSliceSpec(input: c.JSONValue): ResourceSliceSpec {
  const obj = c.checkObj(input);
  return {
    allNodes: c.readOpt(obj["allNodes"], c.checkBool),
    devices: c.readOpt(obj["devices"], x => c.readList(x, toDevice)),
    driver: c.checkStr(obj["driver"]),
    nodeName: c.readOpt(obj["nodeName"], c.checkStr),
    nodeSelector: c.readOpt(obj["nodeSelector"], CoreV1.toNodeSelector),
    pool: toResourcePool(obj["pool"]),
  }}
export function fromResourceSliceSpec(input: ResourceSliceSpec): c.JSONValue {
  return {
    ...input,
    devices: input.devices?.map(fromDevice),
    nodeSelector: input.nodeSelector != null ? CoreV1.fromNodeSelector(input.nodeSelector) : undefined,
    pool: input.pool != null ? fromResourcePool(input.pool) : undefined,
  }}

/** ResourceSliceList is a collection of ResourceSlices. */
export interface ResourceSliceList extends ListOf<ResourceSlice> {
  apiVersion?: "resource.k8s.io/v1alpha3";
  kind?: "ResourceSliceList";
};
export function toResourceSliceList(input: c.JSONValue): ResourceSliceList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "resource.k8s.io/v1alpha3", "ResourceSliceList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toResourceSlice),
  }}
