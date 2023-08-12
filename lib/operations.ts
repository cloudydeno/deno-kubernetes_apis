export interface NoOpts {
  abortSignal?: AbortSignal;
};

export interface GetListOpts {
  continue?: string;
  fieldSelector?: string;
  labelSelector?: string;
  limit?: number;
  resourceVersion?: string;
  resourceVersionMatch?: "Exact" | "NotOlderThan";
  sendInitialEvents?: boolean;
  timeoutSeconds?: number;
  abortSignal?: AbortSignal;
};
export function formatGetListOpts(opts: GetListOpts): URLSearchParams {
  const query = new URLSearchParams;
  if (opts["continue"] != null) query.append("continue", opts["continue"]);
  if (opts["fieldSelector"] != null) query.append("fieldSelector", opts["fieldSelector"]);
  if (opts["labelSelector"] != null) query.append("labelSelector", opts["labelSelector"]);
  if (opts["limit"] != null) query.append("limit", String(opts["limit"]));
  if (opts["resourceVersion"] != null) query.append("resourceVersion", opts["resourceVersion"]);
  if (opts["resourceVersionMatch"] != null) query.append("resourceVersionMatch", opts["resourceVersionMatch"]);
  if (opts["sendInitialEvents"] != null) query.append("sendInitialEvents", opts["sendInitialEvents"] ? '1' : '0');
  if (opts["timeoutSeconds"] != null) query.append("timeoutSeconds", String(opts["timeoutSeconds"]));
  return query;
}

export interface WatchListOpts {
  allowWatchBookmarks?: boolean;
  fieldSelector?: string;
  labelSelector?: string;
  resourceVersion?: string;
  resourceVersionMatch?: "Exact" | "NotOlderThan";
  sendInitialEvents?: boolean;
  timeoutSeconds?: number;
  abortSignal?: AbortSignal;
};
export function formatWatchListOpts(opts: WatchListOpts): URLSearchParams {
  const query = new URLSearchParams([['watch', '1']]);
  if (opts["allowWatchBookmarks"] != null) query.append("allowWatchBookmarks", opts["allowWatchBookmarks"] ? '1' : '0');
  if (opts["fieldSelector"] != null) query.append("fieldSelector", opts["fieldSelector"]);
  if (opts["labelSelector"] != null) query.append("labelSelector", opts["labelSelector"]);
  if (opts["resourceVersion"] != null) query.append("resourceVersion", opts["resourceVersion"]);
  if (opts["resourceVersionMatch"] != null) query.append("resourceVersionMatch", opts["resourceVersionMatch"]);
  if (opts["sendInitialEvents"] != null) query.append("sendInitialEvents", opts["sendInitialEvents"] ? '1' : '0');
  if (opts["timeoutSeconds"] != null) query.append("timeoutSeconds", String(opts["timeoutSeconds"]));
  return query;
}

export interface PutOpts {
  dryRun?: string;
  fieldManager?: string;
  fieldValidation?: string;
  abortSignal?: AbortSignal;
};
export function formatPutOpts(opts: PutOpts): URLSearchParams {
  const query = new URLSearchParams;
  if (opts["dryRun"] != null) query.append("dryRun", opts["dryRun"]);
  if (opts["fieldManager"] != null) query.append("fieldManager", opts["fieldManager"]);
  if (opts["fieldValidation"] != null) query.append("fieldValidation", opts["fieldValidation"]);
  return query;
}

export interface DeleteListOpts {
  continue?: string;
  dryRun?: string;
  fieldSelector?: string;
  gracePeriodSeconds?: number;
  labelSelector?: string;
  limit?: number;
  orphanDependents?: boolean;
  propagationPolicy?: string;
  resourceVersion?: string;
  resourceVersionMatch?: "Exact" | "NotOlderThan";
  sendInitialEvents?: boolean;
  timeoutSeconds?: number;
  abortSignal?: AbortSignal;
};
export function formatDeleteListOpts(opts: DeleteListOpts): URLSearchParams {
  const query = new URLSearchParams;
  if (opts["continue"] != null) query.append("continue", opts["continue"]);
  if (opts["dryRun"] != null) query.append("dryRun", opts["dryRun"]);
  if (opts["fieldSelector"] != null) query.append("fieldSelector", opts["fieldSelector"]);
  if (opts["gracePeriodSeconds"] != null) query.append("gracePeriodSeconds", String(opts["gracePeriodSeconds"]));
  if (opts["labelSelector"] != null) query.append("labelSelector", opts["labelSelector"]);
  if (opts["limit"] != null) query.append("limit", String(opts["limit"]));
  if (opts["orphanDependents"] != null) query.append("orphanDependents", opts["orphanDependents"] ? '1' : '0');
  if (opts["propagationPolicy"] != null) query.append("propagationPolicy", opts["propagationPolicy"]);
  if (opts["resourceVersion"] != null) query.append("resourceVersion", opts["resourceVersion"]);
  if (opts["resourceVersionMatch"] != null) query.append("resourceVersionMatch", opts["resourceVersionMatch"]);
  if (opts["sendInitialEvents"] != null) query.append("sendInitialEvents", opts["sendInitialEvents"] ? '1' : '0');
  if (opts["timeoutSeconds"] != null) query.append("timeoutSeconds", String(opts["timeoutSeconds"]));
  return query;
}

export interface PatchOpts {
  dryRun?: string;
  fieldManager?: string;
  fieldValidation?: string;
  force?: boolean;
  abortSignal?: AbortSignal;
};
export function formatPatchOpts(opts: PatchOpts): URLSearchParams {
  const query = new URLSearchParams;
  if (opts["dryRun"] != null) query.append("dryRun", opts["dryRun"]);
  if (opts["fieldManager"] != null) query.append("fieldManager", opts["fieldManager"]);
  if (opts["fieldValidation"] != null) query.append("fieldValidation", opts["fieldValidation"]);
  if (opts["force"] != null) query.append("force", opts["force"] ? '1' : '0');
  return query;
}

// exact/export were fully gone in Kubernetes v1.21, so this struct isn't used anymore
export interface GetOpts {
  exact?: boolean;
  export?: boolean;
  abortSignal?: AbortSignal;
};
export function formatGetOpts(opts: GetOpts): URLSearchParams {
  const query = new URLSearchParams;
  if (opts["exact"] != null) query.append("exact", opts["exact"] ? '1' : '0');
  if (opts["export"] != null) query.append("export", opts["export"] ? '1' : '0');
  return query;
}

export interface DeleteOpts {
  dryRun?: string;
  gracePeriodSeconds?: number;
  orphanDependents?: boolean;
  propagationPolicy?: string;
  abortSignal?: AbortSignal;
};
export function formatDeleteOpts(opts: DeleteOpts): URLSearchParams {
  const query = new URLSearchParams;
  if (opts["dryRun"] != null) query.append("dryRun", opts["dryRun"]);
  if (opts["gracePeriodSeconds"] != null) query.append("gracePeriodSeconds", String(opts["gracePeriodSeconds"]));
  if (opts["orphanDependents"] != null) query.append("orphanDependents", opts["orphanDependents"] ? '1' : '0');
  if (opts["propagationPolicy"] != null) query.append("propagationPolicy", opts["propagationPolicy"]);
  return query;
}
