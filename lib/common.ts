// The API contract that all generated code expects

export type HttpMethods =
  | "get"
  | "post"
  | "delete"
  | "put"
  | "patch"
  | "options"
  | "head";

export interface RequestOptions {
  querystring?: URLSearchParams,
  accept?: string,
  path?: string,
  body?: JSONValue,
}

export interface RestClient {
  performRequest(method: HttpMethods, opts?: RequestOptions & {accept: 'application/json'}): Promise<JSONValue>;
  performRequest(method: HttpMethods, opts?: RequestOptions): Promise<Uint8Array>;
  // subPath(strings: TemplateStringsArray, ...params: string[]): RestClient;
}


// Helper function for users (maybe could live elsewhere)

export async function* readAllPages<T>(pageFunc: (token?: string) => Promise<{metadata: {continue?: string | null}, items: T[]}>) {
  let pageToken: string | undefined;
  do {
    const page = await pageFunc(pageToken ?? undefined);
    yield* page.items;
    pageToken = page.metadata.continue ?? undefined;
  } while (pageToken);
}


// Small routines used by the actual APIs


// Things that JSON can encode directly
export type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = {[key: string]: JSONValue};
export type JSONArray = JSONValue[];

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

// export function serializeBlob(input: string | Uint8Array | null | undefined): JSONValue {
//   if (!input) return input;
//   if (typeof input === 'string') {
//     input = new TextEncoder().encode(input);
//   }
//   return Base64.fromUint8Array(input);
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

// export function serializeMap<T,U extends JSONValue>(input: {[key: string]: T} | null | undefined, encoder: (x: T) => U): JSONValue {
//   if (input == null) return input;
//   const map: {[key: string]: U} = Object.create(null);
//   for (const [key, val] of Object.entries(input)) {
//     map[key] = encoder(val);
//   }
//   return map;
// }

// export function readMap<K extends string,V>(keyEncoder: (x: string) => K, valEncoder: (x: JSONValue) => V, input: JSONValue): Record<K,V> | null {
//   if (input == null) return null;
//   const map: Record<K,V> = Object.create(null);
//   for (const [key, val] of Object.entries(input)) {
//     map[keyEncoder(key)] = valEncoder(val);
//   }
//   return map;
// }



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



export class MicroTime {
  constructor() {
    throw new Error("TODO: MicroTime");
  }
}
export function toMicroTime(raw: JSONValue): MicroTime {
  const str = checkStr(raw);
  throw new Error("TODO: toMicroTime for "+str);
}
export function fromMicroTime(val: MicroTime): JSONValue {
  // const str = c.checkStr(raw);
  throw new Error("TODO: fromMicroTime for "+JSON.stringify(val));
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

export type IntOrString = number | string;
export function toIntOrString(input: JSONValue): string | number {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input === 'string' || typeof input === 'number') return input;
  throw new Error(`Type sdgssdf`);
}
export function fromIntOrString(val: string | number): JSONValue {
  return val;
}
