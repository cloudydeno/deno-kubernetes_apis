import * as MetaV1 from "./builtin/meta@v1/structs.ts";
import { JSONObject, WatchEvent } from "./common.ts";

// export function transformWatchStream<T>(resp: ReadableStream<Uint8Array>, validator: (val: JSONObject) => T) {
//   return resp
//     .pipeThrough(new ReadLineTransformer('utf-8'))
//     .pipeThrough(new JsonParsingTransformer())
//     .pipeThrough(new WatchEventTransformer(validator));
// }


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
type WatchOpts = { abortSignal?: AbortSignal, resourceVersion?: string; timeoutSeconds?: number; allowWatchBookmarks?: boolean };

type VersionRef = { metadata: { resourceVersion: string | null }}; // WeakMap key

// synthetic event to indicate that we have emitted a complete picture
export type WatchEventSynced = {
  'type': "SYNCED";
  'object': VersionRef;
} | {
  'type': "DESYNCED";
  'object': {metadata: {}};
};

type ReflectorEvent<T> = WatchEvent<T & KindIdsReq, MetaV1.Status> | WatchEventSynced;
type NextEvent<T> = {evt: ReflectorEvent<T>, ref: VersionRef};

export class Reflector<T extends KindIds> {
  #lister: (opts: ListOpts) => Promise<ListOf<T>>;
  #watcher: (opts: WatchOpts) => Promise<ReadableStream<WatchEvent<T,MetaV1.Status>>>;
  constructor(lister: (opts: ListOpts) => Promise<ListOf<T>>, watcher: (opts: WatchOpts) => Promise<ReadableStream<WatchEvent<T,MetaV1.Status>>>) {
    this.#lister = lister;
    this.#watcher = watcher;
  }

  #resources = new Map<string, T & KindIdsReq>();
  #latestVersion?: string;

  getCached(namespace: string, name: string): (T & KindIdsReq) | undefined {
    return this.#resources.get(`${namespace||''}/${name}`);
  }
  listCached(): Iterable<T & KindIdsReq> {
    return this.#resources.values();
  }

  #cancelled = false;

  #nextEvents = new WeakMap<VersionRef, NextEvent<T>>(); // linked list i guess...
  #latestRef: VersionRef = {metadata: {resourceVersion: null}};

  #waitingCbs = new Array<() => void>();

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

      // loop watching as long as our resourceVersion is valid
loop: while (!this.#cancelled) {
        const watch = await this.#watcher({
          resourceVersion: this.#latestVersion,
          allowWatchBookmarks: true,
          abortSignal,
        });
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
            this._emit({type: evt.type, object: evt.object}, evt.object.metadata.resourceVersion);
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

  async *observeAll(): AsyncIterableIterator<ReflectorEvent<T>> {
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
