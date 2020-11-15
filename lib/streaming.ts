import { JSONObject } from "./common.ts";
import * as MetaV1 from "./apis/meta@v1/structs.ts";

export async function* readAllPages<T>(pageFunc: (token?: string) => Promise<{metadata: {continue?: string | null}, items: T[]}>) {
  let pageToken: string | undefined;
  do {
    const page = await pageFunc(pageToken ?? undefined);
    yield* page.items;
    pageToken = page.metadata.continue ?? undefined;
  } while (pageToken);
}

class TextLineReader {
  decoder: TextDecoder;
  buffers = new Array<Uint8Array>();
  constructor(decoder: TextDecoder) {
    this.decoder = decoder;
  }
  processChunk(chunk: Uint8Array, controller: TransformStreamDefaultController<string>) {
    // If we reached the end of a line that spans chunks, join them all together
    if (chunk.includes(10) && this.buffers.length > 0) {
      const indexOfNl = chunk.indexOf(10);
      const fullBuf = this.concatWaitingBuffersWith(chunk.subarray(0, indexOfNl));
      controller.enqueue(this.decoder.decode(fullBuf));
      chunk = chunk.subarray(indexOfNl + 1);
    }

    // process all remaining lines fully contained within this chunk
    let indexOfNl = 0;
    while ((indexOfNl = chunk.indexOf(10)) >= 0) {
      controller.enqueue(this.decoder.decode(chunk.subarray(0, indexOfNl)));
      chunk = chunk.subarray(indexOfNl + 1);
    }

    // keep any leftover for next time
    if (chunk.length > 0) {
      // make a copy because Deno.iter reuses its buffer
      this.buffers.push(new Uint8Array(chunk));
    }
  }
  concatWaitingBuffersWith(latest: Uint8Array): Uint8Array {
    const fullLength = this.buffers.reduce((len, buf) => len+buf.byteLength, latest.byteLength);
    // force preventative maintanence on growing line usecases
    if (fullLength > 5*1024*1024) {
      throw new Error(`Received a single streamed line longer than 5MiB, selfishly giving up`);
    }

    // build a concatted buffer
    const fullBuf = new Uint8Array(fullLength);
    let idx = 0;
    for (const buf of this.buffers) {
      fullBuf.set(buf, idx);
      idx += buf.byteLength;
    }
    fullBuf.set(latest, idx);

    // finish up
    this.buffers.length = 0;
    return fullBuf;
  }
}
/** Reassembles newline-deliminited data from byte chunks into decoded text strings */
export class ReadLineTransformer extends TransformStream<Uint8Array, string> {
  constructor(encoding = 'utf-8') {
    const reader = new TextLineReader(new TextDecoder(encoding));
    super({ transform: reader.processChunk.bind(reader) });
  }
}

function parseJsonLine(line: string, controller: TransformStreamDefaultController<JSONObject>) {
  if (!line.startsWith('{')) {
    throw new Error(`JSON line doesn't start with {: `+line.slice(0, 256));
  }
  controller.enqueue(JSON.parse(line));
}
/** Parses individual JSON objects from individual strings, 1:1 */
export class JsonParsingTransformer extends TransformStream<string, JSONObject> {
  constructor() {
    super({ transform: parseJsonLine });
  }
}

// https://github.com/kubernetes/apimachinery/blob/master/pkg/watch/watch.go

class WatchEventReader<T> {
  validator: (val: JSONObject) => T;
  constructor(validator: (val: JSONObject) => T) {
    this.validator = validator;
  }
  processObject(raw: JSONObject, controller: TransformStreamDefaultController<WatchEvent<T>>) {
    const {type, object} = raw;
    if (typeof type !== 'string') {
      throw new Error(`BUG: watch record 'type' field was ${typeof type}`);
    }
    if (object == null) {
      throw new Error(`BUG: watch record 'object' field was null`);
    }
    if (typeof object !== 'object') {
      throw new Error(`BUG: watch record 'object' field was ${typeof object}`);
    }
    if (Array.isArray(object)) {
      throw new Error(`BUG: watch record 'object' field was Array`);
    }

    switch (type) {
      case 'ERROR':
        try {
          controller.enqueue({type, object: MetaV1.toStatus(object)});
        } catch (err) {
          console.error('TODO: watch error failed to read as Status:', object);
          controller.enqueue({type, object: {
            apiVersion: 'v1',
            kind: 'Status',
            status: "Unexpected",
            reason: "ObjectError",
            message: JSON.stringify(object),
            code: 569,
          }});
        }
        break;
      case 'ADDED':
      case 'MODIFIED':
      case 'DELETED':
        controller.enqueue({type, object: this.validator(object)});
        break;
      case 'BOOKMARK':
        if (object.metadata && typeof object.metadata === 'object' && !Array.isArray(object.metadata)) {
          if (typeof object.metadata.resourceVersion === 'string') {
            controller.enqueue({type, object: {
              metadata: { resourceVersion: object.metadata.resourceVersion },
            }});
            break;
          }
        }
        throw new Error(`BUG: BOOKMARK event wasn't recognizable: ${JSON.stringify(object)}`);
      default:
        throw new Error(`BUG: watch record got unknown event type ${type}`);
    }
  }
}
/** Validates JSON objects belonging to a watch stream */
export class WatchEventTransformer<T> extends TransformStream<JSONObject, WatchEvent<T>> {
  constructor(validator: (val: JSONObject) => T) {
    const reader = new WatchEventReader(validator);
    super({ transform: reader.processObject.bind(reader) });
  }
}

// export type WatchEventType =
// | "ADDED"
// | "MODIFIED"
// | "DELETED"
// | "BOOKMARK"
// | "ERROR"
// ;
export type WatchEvent<T> = WatchEventObject<T> | WatchEventError | WatchEventBookmark;
export type WatchEventObject<T> = {
  'type': "ADDED" | "MODIFIED" | "DELETED";
  'object': T;
};
export type WatchEventBookmark = {
  'type': "BOOKMARK";
  'object': { metadata: { resourceVersion: string }};
};
export type WatchEventError = {
  'type': "ERROR";
  'object': MetaV1.Status;
};


export function transformWatchStream<T>(resp: ReadableStream<Uint8Array>, validator: (val: JSONObject) => T) {
  return resp
    .pipeThrough(new ReadLineTransformer('utf-8'))
    .pipeThrough(new JsonParsingTransformer())
    .pipeThrough(new WatchEventTransformer(validator));
}


// some of this should be centralized...
type KindIds = { metadata?: {
  name?: string | null;
  namespace?: string | null;
  uid?: string | null;
  resourceVersion?: string | null;
} | null };
// inside our database, make sure we have the IDs
type KindIdsReq = { metadata: {
  name: string;
  namespace?: string | null;
  uid: string;
  resourceVersion: string;
} };
type ListOf<T> = { metadata: MetaV1.ListMeta; items: Array<T> };
type ListOpts = { abortSignal?: AbortSignal, resourceVersion?: string; limit?: number; continue?: string };
type WatchOpts = { abortSignal?: AbortSignal, resourceVersion?: string; timeoutSeconds?: number; };

type VersionRef = { metadata: { resourceVersion: string | null }}; // WeakMap key

// synthetic event to indicate that we have emitted a complete picture
export type WatchEventSynced = {
  'type': "SYNCED";
  'object': VersionRef;
} | {
  'type': "DESYNCED";
  'object': {metadata: {}};
};

type ReflectorEvent<T> = WatchEvent<T> | WatchEventSynced;
type NextEvent<T> = {evt: ReflectorEvent<T>, ref: VersionRef};

export class Reflector<T extends KindIds> {
  #lister: (opts: ListOpts) => Promise<ListOf<T>>;
  #watcher: (opts: WatchOpts) => Promise<ReadableStream<WatchEvent<T>>>;
  constructor(lister: (opts: ListOpts) => Promise<ListOf<T>>, watcher: (opts: WatchOpts) => Promise<ReadableStream<WatchEvent<T>>>) {
    this.#lister = lister;
    this.#watcher = watcher;
  }

  #resources = new Map<string, T & KindIdsReq>();
  #latestVersion?: string;
  // #latestEvent?: ReflectorEvent<T>;

  #cancelled = false;
  // #cancel?: () => void;

  // #eventHistory = new WeakMap<VersionRef, ReflectorEvent<T> & {next?: VersionRef}>(); // linked list i guess...
  #nextEvents = new WeakMap<VersionRef, NextEvent<T>>(); // linked list i guess...
  #latestRef: VersionRef = {metadata: {resourceVersion: null}};

  #waitingCbs = new Array<() => void>();

  // startLiveFeed(): AsyncIterableIterator<ReflectorEvent<T>> {
  //   const iter = new Async
  // }

  stop() {
    if (this.#cancelled) throw new Error(`BUG: double-cancel`);
    this.#cancelled = true;
    // if (this.#cancel) this.#cancel();

    this._emit({
      type: 'ERROR',
      object: {kind: "ReflectorStopped"},
    }, null);

    throw new Error(`TODO: a ton of cleanup`);
  }

  _emit(evt: ReflectorEvent<T>, refVersion: string | null): void {
    // console.log('emitting', evt.type);
    const ref: VersionRef = {metadata: {resourceVersion: refVersion}};

    this.#nextEvents.set(this.#latestRef, {
      evt: evt,
      ref: ref,
    });
    this.#latestRef = ref;
    if (refVersion != null) {
      this.#latestVersion = refVersion;
    }

    // TODO: is this safe enough?
    for (const cb of this.#waitingCbs) {
      cb();
    }
    this.#waitingCbs.length = 0;
    // throw new Error(`TODO`);
    // console.log('emitted', evt.type, refVersion);
  }

  // main thread running the whole Reflector show
  // tries to return cleanly if reflector is cancelled
  // TODO: if this crashes, crash every consumer too
  async run(abortSignal?: AbortSignal) {
    if (abortSignal) {
      if (abortSignal.aborted) return;
      abortSignal.addEventListener('abort', () => this.stop());
    }

    while (!this.#cancelled) {
      const listFrom = this.#latestVersion || "0";
      const missingItems = new Map(this.#resources);

      const list = await this.#lister({resourceVersion: listFrom, abortSignal});
      if (!list.metadata.resourceVersion) throw new Error(`BUG: list had no version`);
      const listVer = list.metadata.resourceVersion;

      for (const item of list.items) {
        if (!isKeyed(item)) throw new Error(`BUG: got unkeyed item from list ${listVer}`);

        const key = `${item.metadata.namespace}/${item.metadata.name}`;
        const known = this.#resources.get(key);
        if (known) {
          missingItems.delete(key);
          if (known.metadata.resourceVersion !== item.metadata.resourceVersion) {
            this.#resources.set(key, item);
            this._emit({type: "MODIFIED", object: item}, null);
          }
        } else {
          this.#resources.set(key, item);
          this._emit({type: "ADDED", object: item}, null);
        }
      }

      for (const [key, item] of missingItems) {
        this.#resources.delete(key);
        this._emit({type: "DELETED", object: item}, null);
      }

      this._emit({type: "SYNCED", object: {
        metadata: {resourceVersion: listVer}},
      }, listVer); // finally set this.#latestVersion

      // TODO: watch in a loop
      // TODO: handle broken stream (disconnected, etc)
loop: while (!this.#cancelled) {
        const watch = await this.#watcher({resourceVersion: this.#latestVersion, abortSignal});
        for await (const evt of watch) {
          if (this.#cancelled) return;

          if (evt.type === 'ERROR') {
            // the only expected error is our resourceVersion being too old (might be others later)
            if (evt.object.reason === 'Expired') {
              console.log('Reflector watch expired, starting from clean resync');
              // don't even tell downstreams about the expiration
              // they'll be able to know via the DESYNCED event
              break loop;
            }

            this._emit(evt, null);
            console.log('TODO: reflector got error:', evt.object);
            // throw new Error(`TODO: handle reflector error`);
            this.stop(); // TODO: maybe stop WITH a status, always

          } else if (evt.type === 'BOOKMARK') {
            this._emit(evt, evt.object.metadata.resourceVersion);

          } else {
            if (!isKeyed(evt.object)) throw new Error(`BUG: got unkeyed item from watch ${evt.type}`);
            const key = `${evt.object.metadata.namespace}/${evt.object.metadata.name}`;
            if (evt.type === 'DELETED') {
              this.#resources.delete(key);
            } else {
              this.#resources.set(key, evt.object);
            }
            this._emit(evt, evt.object.metadata.resourceVersion);
          }

        }
      }
      if (this.#cancelled) return;

      // indicate that we're no longer contiguous
      this._emit({type: "DESYNCED", object: {
        metadata: {}},
      }, ""); // clear latest version
    }
  }

  async *observeAll(): AsyncIterableIterator<WatchEvent<T> | WatchEventSynced> {
    // take snapshots for consistent state
    const knownVer = this.#latestVersion;
    const knownRef = this.#latestRef;
    const startupBurst = Array.from(this.#resources.values());

    // send what we already knew
    // console.log('refobs startup burst:', startupBurst.length)
    for (const item of startupBurst) {
      yield {type: "ADDED", object: item};
    }

    if (knownVer) {
      yield {type: "SYNCED", object: {metadata: {resourceVersion: knownVer }}};
    }

    // cycle between catching up and being up-to-date/waiting forever

    let ref = knownRef;
    while (true) {
      // send all pending events
      // console.log('refobs flushing from', ref);
      let next: NextEvent<T> | undefined;
      while (next = this.#nextEvents.get(ref)) {
        // console.log('refobs got', next.evt.type, next.ref)
        yield next.evt;
        if (next.evt.type === 'ERROR') {
          throw new Error(`Reflector gave us an ERROR`);
        }
        ref = next.ref;
      }

      // wait for new events
      // console.log('refobs waiting from', ref);
      await new Promise(ok => this.#waitingCbs.push(ok));
    }
  }

  goObserveAll<U>(cb: (iter: AsyncIterableIterator<ReflectorEvent<T>>) => Promise<U>): Promise<U> {
    return cb(this.observeAll());
  }
}

function isKeyed<T>(item: T & KindIds): item is T & KindIdsReq {
  return !!item.metadata
    && item.metadata.name != null
    && item.metadata.resourceVersion != null
    && item.metadata.uid != null;
}
