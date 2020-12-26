// Import the API contract and several utilities from kubernetes_client
// All the generated code uses this centralized API contract,
//   while users are free to pass in a different compatible client to actually call

import {JSONObject, JSONValue, RequestOptions, Reflector} from "https://deno.land/x/kubernetes_client@v0.1.2/mod.ts";
export * from "https://deno.land/x/kubernetes_client@v0.1.2/mod.ts";

// Helpers used to validate/transform structures from or for the wire
// And some other stuff :)

export function assertOrAddApiVersionAndKind<
  T extends string,
  U extends string,
>(input: JSONObject | {
  apiVersion?: JSONValue;
  kind?: JSONValue;
}, expectedVersion: T, expectedKind: U, required = false) {
  const output = { apiVersion: expectedVersion, kind: expectedKind };

  // If nothing is given, we might return the expected data
  if (!('apiVersion' in input && 'kind' in input)) {
    // Decents on what the caller thinks of course:
    if (!required) return output;

    // Caller wanted the fields so build up an error.
    const expected = JSON.stringify(`${output.apiVersion}/${output.kind}`);
    throw new Error(`Kubernetes Resource Mistype: `+
      `Expected ${expected}, but the given object didn't have any API metadata.`);

  // Given and matching, all good!
  } else if (input.apiVersion === expectedVersion && input.kind === expectedKind) {
    return output;
  }

  // Otherwise we're going to build up an error
  const given = JSON.stringify(`${input.apiVersion}/${input.kind}`);
  const expected = JSON.stringify(`${output.apiVersion}/${output.kind}`);
  throw new Error(`Kubernetes Resource Mistype: `+
    `Expected ${expected}, but was given ${given}.`);
}


export function identity(input: JSONValue) {
  return input;
}

export function readOpt<T>(input: JSONValue, mapper: (raw: JSONValue) => T): T | null | undefined {
  if (input == null) return input;
  return mapper(input);
}
export function checkStr(input: JSONValue): string {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input !== 'string') throw new Error(`Type asdfsgs`);
  return input;
}
export function checkNum(input: JSONValue): number {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input !== 'number') throw new Error(`Type asdfsgs`);
  return input;
}
export function checkBool(input: JSONValue): boolean {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input !== 'boolean') throw new Error(`Type asdfsgs`);
  return input;
}
export function readList<V>(input: JSONValue, encoder: (x: JSONValue) => V): Array<V> {
  if (input == null) throw new Error(`Type zxvdef`);
  if (!Array.isArray(input)) throw new Error(`Type werwer`);
  return input.map(encoder);
}
export function readMap<V>(input: JSONValue, valEncoder: (x: JSONValue) => V): Record<string,V> {
  const obj = checkObj(input);
  const map: Record<string,V> = Object.create(null);
  for (const [key, val] of Object.entries(obj)) {
    map[key] = valEncoder(val);
  }
  return map;
}

export function checkObj(input: JSONValue): JSONObject {
  if (input == null) throw new Error("Type structInitA");
  if (typeof input !== 'object') throw new Error("Type structInitB");
  if (Array.isArray(input)) throw new Error("Type structInitC");
  return input;
}

// function throwMissingKeys(missingKeys: Iterable<string>, hadKeys: Iterable<string>): never {
//   throw new Error(`BUG: JSON object `+
//     `missing required keys ${JSON.stringify(Array.from(missingKeys))
//     } - had keys ${JSON.stringify(Array.from(hadKeys))}`);
// }

export function writeMap<T,U extends JSONValue>(input: Record<string,T> | null | undefined, valEncoder: (x: T) => U): JSONValue {
  if (input == null) return input;
  // const obj = checkObj(input);
  const map: Record<string,U> = Object.create(null);
  for (const [key, val] of Object.entries(input)) {
    if (val != null) map[key] = valEncoder(val);
  }
  return map;
}


// Semi-questionable method of expressing an "open string union" in Typescript
export type UnexpectedEnumValue = string & {unexpected: never};
export function readEnum<T extends string>(raw: unknown): T {
  if (typeof raw === "string") return raw as T;
  throw new Error(`Required enum value wasn't given`);
}


// Some schemas don't actually belong to any proper versioned API so I'm just putting them here.

// https://github.com/kubernetes/apimachinery/blob/master/pkg/api/resource/quantity.go
const binarySuffixes  = ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei'];
const decimalSuffixes = ['k',  'M',  'G',  'T',  'P',  'E'];
export class Quantity {
  number: number;
  suffix: string;
  constructor(number: number, suffix: string) {
    this.number = number;
    this.suffix = suffix;
  }
  serialize(): string {
    return `${this.number}${this.suffix}`;
  }
}
export function toQuantity(raw: JSONValue): Quantity {
  const str = checkStr(raw);
  const [suffix] = str.match(/(?:[KMGTPE]i|[mkMGTPE]|[eE][-+]?[0-9.]+)$/) ?? [''];
  const number = str.slice(0, str.length-suffix.length);
  return new Quantity(parseInt(number, 10), suffix);
}
export function fromQuantity(val: Quantity): JSONValue {
  return val?.serialize();
}

export type Time = Date;
export function toTime(input: JSONValue): Time {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input !== 'string') throw new Error(`Type asdfsgs`);
  if (!input.includes('T')) throw new Error(`Type dateasdf`);
  const d = new Date(input);
  if (isNaN(d.valueOf())) throw new Error(`Type date nan`);
  return d;
}
export function fromTime(input: Time | number | null | undefined): JSONValue {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return date.toISOString();
}


export class MicroTime {
  baseDate: Date;
  micros: number;
  constructor(baseDate: Date, micros: number) {
    this.baseDate = baseDate;
    this.micros = micros;
  }
  toISOString(): string {
    const suffix = '.' + this.micros.toString(10).padStart(6, '0') + 'Z';
    return this.baseDate.toISOString().replace(/\.(\d+)Z$/, suffix);
  }
}
export function toMicroTime(raw: JSONValue): MicroTime {
  const str = checkStr(raw);
  const microsMatch = str.match(/\.(\d+)Z$/);
  if (!microsMatch) throw new Error("TODO: toMicroTime for "+str);
  const date = new Date(str.slice(0, microsMatch.index)+'Z');
  if (isNaN(date.valueOf())) throw new Error("BUG: toMicroTime NaN for "+str);
  const micros = parseInt(microsMatch[1]);
  return new MicroTime(date, micros);
}
export function fromMicroTime(val: MicroTime): JSONValue {
  if (val == null) return val;
  return val.toISOString();
}


export class Duration {
  constructor() {
    throw new Error("TODO: Duration");
  }
}
export function toDuration(raw: JSONValue): Duration {
  const str = checkStr(raw);
  throw new Error("TODO: toDuration for "+str);
}
export function fromDuration(val: Duration): JSONValue {
  // const str = c.checkStr(raw);
  throw new Error("TODO: fromDuration for "+JSON.stringify(val));
}


export type IntOrString = number | string;
export function toIntOrString(input: JSONValue): string | number {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input === 'string' || typeof input === 'number') return input;
  throw new Error(`Type sdgssdf`);
}


// Resource patching. Some patches are more sketchy than others...
// strategic-merge adds extra 'directive' fields, but doesn't work on CRDs.
// json-merge adds no extra fields, but always replaces any array you touch.
// json-patch is a surgical tool that escapes types and, indeed, sanity.
// apply-patch is an up-and-coming feature "Server-Side Apply" and not enabled by default yet.

export type PatchType = 'strategic-merge' | 'json-merge' | 'json-patch' | 'apply-patch';
export function getPatchContentType(type: PatchType) {
  switch (type) {
    case 'strategic-merge': return 'application/strategic-merge-patch+json';
    case 'json-merge': return 'application/merge-patch+json';
    case 'json-patch': return 'application/json-patch+json';
    case 'apply-patch': return 'application/apply-patch+yaml'; // All JSON documents are valid YAML.
  }
  throw new Error(`Unknown Kubernetes patch type: ${JSON.stringify(type)}`);
}

// TODO: figure out how to do this properly
// https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript
// export type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends Array<infer I>
//     ? Array<DeepPartial<I>>
//     : DeepPartial<T[P]>;
// };
// export type StrategicPatch<T> = {
//   [P in keyof T]?: T[P] extends Array<infer I>
//     ? Array<StrategicPatch<I> & StrategicDirectives>
//     : (StrategicPatch<T[P]> & StrategicDirectives);
// };
// export interface StrategicDirectives {
//   $patch?: "replace" | "delete";
//   // $deleteFromPrimitiveList/<field>: T[]
//   // $setElementOrder/<field>: (T | {<mergekey>: string})[]
//   $retainKeys?: string[];
// }

export type JsonPatch = JsonPatchOp[];
export type JsonPatchOp =
| { op: 'add',     path: string, value: JSONValue }
| { op: 'remove',  path: string                   }
| { op: 'replace', path: string, value: JSONValue }
| { op: 'move',    from: string, path: string     }
| { op: 'copy',    from: string, path: string     }
| { op: 'test',    path: string, value: JSONValue };

// used for API Server's 'connect to' endpoints
export type ProxyOptions = RequestOptions & { port?: string | number; };
