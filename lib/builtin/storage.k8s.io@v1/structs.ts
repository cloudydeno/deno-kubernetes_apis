// Autogenerated Schema file for StorageV1
import * as c from "../../common.ts";

import * as CoreV1 from "../core@v1/structs.ts";
import * as MetaV1 from "../meta@v1/structs.ts";
type ListOf<T> = {
  metadata: MetaV1.ListMeta;
  items: Array<T>;
};

/** CSIDriver captures information about a Container Storage Interface (CSI) volume driver deployed on the cluster. Kubernetes attach detach controller uses this object to determine whether attach is required. Kubelet uses this object to determine whether pod information needs to be passed on mount. CSIDriver objects are non-namespaced. */
export interface CSIDriver {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "CSIDriver";
  metadata?: MetaV1.ObjectMeta | null;
  spec: CSIDriverSpec;
}
export function toCSIDriver(input: c.JSONValue): CSIDriver & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "CSIDriver"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toCSIDriverSpec(obj["spec"]),
  }}
export function fromCSIDriver(input: CSIDriver): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "storage.k8s.io/v1", "CSIDriver"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromCSIDriverSpec(input.spec) : undefined,
  }}

/** CSIDriverSpec is the specification of a CSIDriver. */
export interface CSIDriverSpec {
  attachRequired?: boolean | null;
  fsGroupPolicy?: string | null;
  podInfoOnMount?: boolean | null;
  requiresRepublish?: boolean | null;
  seLinuxMount?: boolean | null;
  storageCapacity?: boolean | null;
  tokenRequests?: Array<TokenRequest> | null;
  volumeLifecycleModes?: Array<string> | null;
}
export function toCSIDriverSpec(input: c.JSONValue): CSIDriverSpec {
  const obj = c.checkObj(input);
  return {
    attachRequired: c.readOpt(obj["attachRequired"], c.checkBool),
    fsGroupPolicy: c.readOpt(obj["fsGroupPolicy"], c.checkStr),
    podInfoOnMount: c.readOpt(obj["podInfoOnMount"], c.checkBool),
    requiresRepublish: c.readOpt(obj["requiresRepublish"], c.checkBool),
    seLinuxMount: c.readOpt(obj["seLinuxMount"], c.checkBool),
    storageCapacity: c.readOpt(obj["storageCapacity"], c.checkBool),
    tokenRequests: c.readOpt(obj["tokenRequests"], x => c.readList(x, toTokenRequest)),
    volumeLifecycleModes: c.readOpt(obj["volumeLifecycleModes"], x => c.readList(x, c.checkStr)),
  }}
export function fromCSIDriverSpec(input: CSIDriverSpec): c.JSONValue {
  return {
    ...input,
    tokenRequests: input.tokenRequests?.map(fromTokenRequest),
  }}

/** TokenRequest contains parameters of a service account token. */
export interface TokenRequest {
  audience: string;
  expirationSeconds?: number | null;
}
export function toTokenRequest(input: c.JSONValue): TokenRequest {
  const obj = c.checkObj(input);
  return {
    audience: c.checkStr(obj["audience"]),
    expirationSeconds: c.readOpt(obj["expirationSeconds"], c.checkNum),
  }}
export function fromTokenRequest(input: TokenRequest): c.JSONValue {
  return {
    ...input,
  }}

/** CSIDriverList is a collection of CSIDriver objects. */
export interface CSIDriverList extends ListOf<CSIDriver> {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "CSIDriverList";
};
export function toCSIDriverList(input: c.JSONValue): CSIDriverList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "CSIDriverList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toCSIDriver),
  }}

/** CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object. */
export interface CSINode {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "CSINode";
  metadata?: MetaV1.ObjectMeta | null;
  spec: CSINodeSpec;
}
export function toCSINode(input: c.JSONValue): CSINode & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "CSINode"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toCSINodeSpec(obj["spec"]),
  }}
export function fromCSINode(input: CSINode): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "storage.k8s.io/v1", "CSINode"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromCSINodeSpec(input.spec) : undefined,
  }}

/** CSINodeSpec holds information about the specification of all CSI drivers installed on a node */
export interface CSINodeSpec {
  drivers: Array<CSINodeDriver>;
}
export function toCSINodeSpec(input: c.JSONValue): CSINodeSpec {
  const obj = c.checkObj(input);
  return {
    drivers: c.readList(obj["drivers"], toCSINodeDriver),
  }}
export function fromCSINodeSpec(input: CSINodeSpec): c.JSONValue {
  return {
    ...input,
    drivers: input.drivers?.map(fromCSINodeDriver),
  }}

/** CSINodeDriver holds information about the specification of one CSI driver installed on a node */
export interface CSINodeDriver {
  allocatable?: VolumeNodeResources | null;
  name: string;
  nodeID: string;
  topologyKeys?: Array<string> | null;
}
export function toCSINodeDriver(input: c.JSONValue): CSINodeDriver {
  const obj = c.checkObj(input);
  return {
    allocatable: c.readOpt(obj["allocatable"], toVolumeNodeResources),
    name: c.checkStr(obj["name"]),
    nodeID: c.checkStr(obj["nodeID"]),
    topologyKeys: c.readOpt(obj["topologyKeys"], x => c.readList(x, c.checkStr)),
  }}
export function fromCSINodeDriver(input: CSINodeDriver): c.JSONValue {
  return {
    ...input,
    allocatable: input.allocatable != null ? fromVolumeNodeResources(input.allocatable) : undefined,
  }}

/** VolumeNodeResources is a set of resource limits for scheduling of volumes. */
export interface VolumeNodeResources {
  count?: number | null;
}
export function toVolumeNodeResources(input: c.JSONValue): VolumeNodeResources {
  const obj = c.checkObj(input);
  return {
    count: c.readOpt(obj["count"], c.checkNum),
  }}
export function fromVolumeNodeResources(input: VolumeNodeResources): c.JSONValue {
  return {
    ...input,
  }}

/** CSINodeList is a collection of CSINode objects. */
export interface CSINodeList extends ListOf<CSINode> {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "CSINodeList";
};
export function toCSINodeList(input: c.JSONValue): CSINodeList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "CSINodeList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toCSINode),
  }}

/** CSIStorageCapacity stores the result of one CSI GetCapacity call. For a given StorageClass, this describes the available capacity in a particular topology segment.  This can be used when considering where to instantiate new PersistentVolumes.

For example this can express things like: - StorageClass "standard" has "1234 GiB" available in "topology.kubernetes.io/zone=us-east1" - StorageClass "localssd" has "10 GiB" available in "kubernetes.io/hostname=knode-abc123"

The following three cases all imply that no capacity is available for a certain combination: - no object exists with suitable topology and storage class name - such an object exists, but the capacity is unset - such an object exists, but the capacity is zero

The producer of these objects can decide which approach is more suitable.

They are consumed by the kube-scheduler when a CSI driver opts into capacity-aware scheduling with CSIDriverSpec.StorageCapacity. The scheduler compares the MaximumVolumeSize against the requested size of pending volumes to filter out unsuitable nodes. If MaximumVolumeSize is unset, it falls back to a comparison against the less precise Capacity. If that is also unset, the scheduler assumes that capacity is insufficient and tries some other node. */
export interface CSIStorageCapacity {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "CSIStorageCapacity";
  capacity?: c.Quantity | null;
  maximumVolumeSize?: c.Quantity | null;
  metadata?: MetaV1.ObjectMeta | null;
  nodeTopology?: MetaV1.LabelSelector | null;
  storageClassName: string;
}
export function toCSIStorageCapacity(input: c.JSONValue): CSIStorageCapacity & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "CSIStorageCapacity"),
    capacity: c.readOpt(obj["capacity"], c.toQuantity),
    maximumVolumeSize: c.readOpt(obj["maximumVolumeSize"], c.toQuantity),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    nodeTopology: c.readOpt(obj["nodeTopology"], MetaV1.toLabelSelector),
    storageClassName: c.checkStr(obj["storageClassName"]),
  }}
export function fromCSIStorageCapacity(input: CSIStorageCapacity): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "storage.k8s.io/v1", "CSIStorageCapacity"),
    ...input,
    capacity: input.capacity != null ? c.fromQuantity(input.capacity) : undefined,
    maximumVolumeSize: input.maximumVolumeSize != null ? c.fromQuantity(input.maximumVolumeSize) : undefined,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    nodeTopology: input.nodeTopology != null ? MetaV1.fromLabelSelector(input.nodeTopology) : undefined,
  }}

/** CSIStorageCapacityList is a collection of CSIStorageCapacity objects. */
export interface CSIStorageCapacityList extends ListOf<CSIStorageCapacity> {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "CSIStorageCapacityList";
};
export function toCSIStorageCapacityList(input: c.JSONValue): CSIStorageCapacityList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "CSIStorageCapacityList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toCSIStorageCapacity),
  }}

/** StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.

StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name. */
export interface StorageClass {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "StorageClass";
  allowVolumeExpansion?: boolean | null;
  allowedTopologies?: Array<CoreV1.TopologySelectorTerm> | null;
  metadata?: MetaV1.ObjectMeta | null;
  mountOptions?: Array<string> | null;
  parameters?: Record<string,string> | null;
  provisioner: string;
  reclaimPolicy?: string | null;
  volumeBindingMode?: string | null;
}
export function toStorageClass(input: c.JSONValue): StorageClass & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "StorageClass"),
    allowVolumeExpansion: c.readOpt(obj["allowVolumeExpansion"], c.checkBool),
    allowedTopologies: c.readOpt(obj["allowedTopologies"], x => c.readList(x, CoreV1.toTopologySelectorTerm)),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    mountOptions: c.readOpt(obj["mountOptions"], x => c.readList(x, c.checkStr)),
    parameters: c.readOpt(obj["parameters"], x => c.readMap(x, c.checkStr)),
    provisioner: c.checkStr(obj["provisioner"]),
    reclaimPolicy: c.readOpt(obj["reclaimPolicy"], c.checkStr),
    volumeBindingMode: c.readOpt(obj["volumeBindingMode"], c.checkStr),
  }}
export function fromStorageClass(input: StorageClass): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "storage.k8s.io/v1", "StorageClass"),
    ...input,
    allowedTopologies: input.allowedTopologies?.map(CoreV1.fromTopologySelectorTerm),
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
  }}

/** StorageClassList is a collection of storage classes. */
export interface StorageClassList extends ListOf<StorageClass> {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "StorageClassList";
};
export function toStorageClassList(input: c.JSONValue): StorageClassList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "StorageClassList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toStorageClass),
  }}

/** VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node.

VolumeAttachment objects are non-namespaced. */
export interface VolumeAttachment {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "VolumeAttachment";
  metadata?: MetaV1.ObjectMeta | null;
  spec: VolumeAttachmentSpec;
  status?: VolumeAttachmentStatus | null;
}
export function toVolumeAttachment(input: c.JSONValue): VolumeAttachment & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "VolumeAttachment"),
    metadata: c.readOpt(obj["metadata"], MetaV1.toObjectMeta),
    spec: toVolumeAttachmentSpec(obj["spec"]),
    status: c.readOpt(obj["status"], toVolumeAttachmentStatus),
  }}
export function fromVolumeAttachment(input: VolumeAttachment): c.JSONValue {
  return {
    ...c.assertOrAddApiVersionAndKind(input, "storage.k8s.io/v1", "VolumeAttachment"),
    ...input,
    metadata: input.metadata != null ? MetaV1.fromObjectMeta(input.metadata) : undefined,
    spec: input.spec != null ? fromVolumeAttachmentSpec(input.spec) : undefined,
    status: input.status != null ? fromVolumeAttachmentStatus(input.status) : undefined,
  }}

/** VolumeAttachmentSpec is the specification of a VolumeAttachment request. */
export interface VolumeAttachmentSpec {
  attacher: string;
  nodeName: string;
  source: VolumeAttachmentSource;
}
export function toVolumeAttachmentSpec(input: c.JSONValue): VolumeAttachmentSpec {
  const obj = c.checkObj(input);
  return {
    attacher: c.checkStr(obj["attacher"]),
    nodeName: c.checkStr(obj["nodeName"]),
    source: toVolumeAttachmentSource(obj["source"]),
  }}
export function fromVolumeAttachmentSpec(input: VolumeAttachmentSpec): c.JSONValue {
  return {
    ...input,
    source: input.source != null ? fromVolumeAttachmentSource(input.source) : undefined,
  }}

/** VolumeAttachmentSource represents a volume that should be attached. Right now only PersistentVolumes can be attached via external attacher, in the future we may allow also inline volumes in pods. Exactly one member can be set. */
export interface VolumeAttachmentSource {
  inlineVolumeSpec?: CoreV1.PersistentVolumeSpec | null;
  persistentVolumeName?: string | null;
}
export function toVolumeAttachmentSource(input: c.JSONValue): VolumeAttachmentSource {
  const obj = c.checkObj(input);
  return {
    inlineVolumeSpec: c.readOpt(obj["inlineVolumeSpec"], CoreV1.toPersistentVolumeSpec),
    persistentVolumeName: c.readOpt(obj["persistentVolumeName"], c.checkStr),
  }}
export function fromVolumeAttachmentSource(input: VolumeAttachmentSource): c.JSONValue {
  return {
    ...input,
    inlineVolumeSpec: input.inlineVolumeSpec != null ? CoreV1.fromPersistentVolumeSpec(input.inlineVolumeSpec) : undefined,
  }}

/** VolumeAttachmentStatus is the status of a VolumeAttachment request. */
export interface VolumeAttachmentStatus {
  attachError?: VolumeError | null;
  attached: boolean;
  attachmentMetadata?: Record<string,string> | null;
  detachError?: VolumeError | null;
}
export function toVolumeAttachmentStatus(input: c.JSONValue): VolumeAttachmentStatus {
  const obj = c.checkObj(input);
  return {
    attachError: c.readOpt(obj["attachError"], toVolumeError),
    attached: c.checkBool(obj["attached"]),
    attachmentMetadata: c.readOpt(obj["attachmentMetadata"], x => c.readMap(x, c.checkStr)),
    detachError: c.readOpt(obj["detachError"], toVolumeError),
  }}
export function fromVolumeAttachmentStatus(input: VolumeAttachmentStatus): c.JSONValue {
  return {
    ...input,
    attachError: input.attachError != null ? fromVolumeError(input.attachError) : undefined,
    detachError: input.detachError != null ? fromVolumeError(input.detachError) : undefined,
  }}

/** VolumeError captures an error encountered during a volume operation. */
export interface VolumeError {
  message?: string | null;
  time?: c.Time | null;
}
export function toVolumeError(input: c.JSONValue): VolumeError {
  const obj = c.checkObj(input);
  return {
    message: c.readOpt(obj["message"], c.checkStr),
    time: c.readOpt(obj["time"], c.toTime),
  }}
export function fromVolumeError(input: VolumeError): c.JSONValue {
  return {
    ...input,
    time: input.time != null ? c.fromTime(input.time) : undefined,
  }}

/** VolumeAttachmentList is a collection of VolumeAttachment objects. */
export interface VolumeAttachmentList extends ListOf<VolumeAttachment> {
  apiVersion?: "storage.k8s.io/v1";
  kind?: "VolumeAttachmentList";
};
export function toVolumeAttachmentList(input: c.JSONValue): VolumeAttachmentList & c.ApiKind {
  const obj = c.checkObj(input);
  return {
    ...c.assertOrAddApiVersionAndKind(obj, "storage.k8s.io/v1", "VolumeAttachmentList"),
    metadata: MetaV1.toListMeta(obj.metadata),
    items: c.readList(obj.items, toVolumeAttachment),
  }}
