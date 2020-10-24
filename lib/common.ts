// Things that JSON can encode directly
export type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = {[key: string]: JSONValue};
export type JSONArray = JSONValue[];

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
export function readDate(input: JSONValue): Date {
  if (input == null) throw new Error(`Type a3sf`);
  if (typeof input !== 'string') throw new Error(`Type asdfsgs`);
  if (!input.includes('T')) throw new Error(`Type dateasdf`);
  const d = new Date(input);
  if (isNaN(d.valueOf())) throw new Error(`Type date nan`);
  return d;
}
export function readList<V>(input: JSONValue, encoder: (x: JSONValue) => V): Array<V> {
  if (input == null) throw new Error(`Type zxvdef`);
  if (!Array.isArray(input)) throw new Error(`Type werwer`);
  return input.map(encoder);
}
export function readMap<V>(input: JSONValue, valEncoder: (x: JSONValue) => V): Record<string,V> {
  if (input == null) throw new Error(`Type zxvdef`);
  if (typeof input !== 'object') throw new Error("Type structInitB");
  if (Array.isArray(input)) throw new Error("Type structInitC");
  const map: Record<string,V> = Object.create(null);
  for (const [key, val] of Object.entries(input)) {
    map[key] = valEncoder(val);
  }
  return map;
}


// function throwMissingKeys(missingKeys: Iterable<string>, hadKeys: Iterable<string>): never {
//   throw new Error(`BUG: JSON object `+
//     `missing required keys ${JSON.stringify(Array.from(missingKeys))
//     } - had keys ${JSON.stringify(Array.from(hadKeys))}`);
// }

// export function serializeDate_unixTimestamp(input: Date | number | null | undefined): JSONValue {
//   if (input == null) return input;
//   const date = typeof input === 'number' ? new Date(input*1000) : input;
//   return Math.floor(date.valueOf() / 1000);
// }
// export function serializeDate_iso8601(input: Date | number | null | undefined): JSONValue {
//   if (input == null) return input;
//   const date = typeof input === 'number' ? new Date(input*1000) : input;
//   return date.toISOString();
// }
// export function serializeDate_rfc822(input: Date | number | null | undefined): JSONValue {
//   if (input == null) return input;
//   const date = typeof input === 'number' ? new Date(input*1000) : input;
//   return date.toUTCString();
// }

// export function serializeBlob(input: string | Uint8Array | null | undefined): JSONValue {
//   if (!input) return input;
//   if (typeof input === 'string') {
//     input = new TextEncoder().encode(input);
//   }
//   return Base64.fromUint8Array(input);
// }

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


export class Quantity {
  number: number;
  suffix: string;
  constructor(number: number, suffix: string) {
    this.number = number;
    this.suffix = suffix;
  }
}
export function toQuantity(raw: JSONValue): Quantity {
  const str = checkStr(raw);
  throw new Error("TODO: toQuantity for "+str);
}
