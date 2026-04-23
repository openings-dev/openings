const DEFAULT_SNAPSHOT_URL =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities/index.json";
const SNAPSHOT_FETCH_BATCH_SIZE = 12;

type UnknownRecord = Record<string, unknown>;

let snapshotItemsPromise: Promise<unknown[]> | null = null;

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  return value as UnknownRecord;
}

function stringOrNull(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function normalizeAuthorHandle(handle: string) {
  return handle.trim().replace(/^@+/, "");
}

function resolveSnapshotUrl() {
  return (
    process.env.OPENINGS_DATA_SNAPSHOT_URL ||
    process.env.NEXT_PUBLIC_OPENINGS_DATA_SNAPSHOT_URL ||
    DEFAULT_SNAPSHOT_URL
  );
}

async function fetchJson(url: string) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error(`Snapshot source unavailable (${response.status}) at ${url}`);
  }

  return response.json().catch(() => null);
}

function normalizeLegacySnapshotItems(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const record = asRecord(payload);

  if (!record || !Array.isArray(record.items)) {
    return null;
  }

  return record.items;
}

function sortAndDedupeSnapshotItems(items: unknown[]) {
  const byId = new Map<string, unknown>();

  for (const item of items) {
    const id = stringOrNull(asRecord(item)?.id);

    if (id) {
      byId.set(id, item);
    }
  }

  return Array.from(byId.values()).sort((left, right) => {
    const leftUpdatedAt = Date.parse(stringOrNull(asRecord(left)?.updatedAt) ?? "");
    const rightUpdatedAt = Date.parse(stringOrNull(asRecord(right)?.updatedAt) ?? "");
    return rightUpdatedAt - leftUpdatedAt;
  });
}

async function fetchJsonInBatches(urls: string[]) {
  const payloads: unknown[] = [];

  for (let start = 0; start < urls.length; start += SNAPSHOT_FETCH_BATCH_SIZE) {
    const batch = urls.slice(start, start + SNAPSHOT_FETCH_BATCH_SIZE);
    payloads.push(...(await Promise.all(batch.map((url) => fetchJson(url)))));
  }

  return payloads;
}

async function loadSegmentedSnapshotItems(snapshotUrl: string, payload: unknown) {
  const record = asRecord(payload);

  if (!record || !Array.isArray(record.countries)) {
    throw new Error(`Invalid snapshot payload at ${snapshotUrl}`);
  }

  const countryIndexUrls = record.countries
    .map((entry) => stringOrNull(asRecord(entry)?.indexFile))
    .filter((indexFile): indexFile is string => Boolean(indexFile))
    .map((indexFile) => new URL(indexFile, snapshotUrl).toString());

  const countryIndexes = await fetchJsonInBatches(countryIndexUrls);
  const shardUrls = countryIndexes
    .flatMap((countryIndex) => {
      const repositories = asRecord(countryIndex)?.byRepository;

      if (!Array.isArray(repositories)) {
        return [];
      }

      return repositories
        .map((repository) => stringOrNull(asRecord(repository)?.file))
        .filter((file): file is string => Boolean(file));
    })
    .map((file) => new URL(file, snapshotUrl).toString());

  const shardPayloads = await fetchJsonInBatches(shardUrls);
  const items = shardPayloads.flatMap((shard) => {
    const shardItems = asRecord(shard)?.items;
    return Array.isArray(shardItems) ? shardItems : [];
  });

  return sortAndDedupeSnapshotItems(items);
}

async function loadSnapshotItemsUncached() {
  const snapshotUrl = resolveSnapshotUrl();
  const payload = await fetchJson(snapshotUrl);
  const legacyItems = normalizeLegacySnapshotItems(payload);

  if (legacyItems) {
    return sortAndDedupeSnapshotItems(legacyItems);
  }

  return loadSegmentedSnapshotItems(snapshotUrl, payload);
}

export function loadSnapshotItems() {
  if (!snapshotItemsPromise) {
    snapshotItemsPromise = loadSnapshotItemsUncached();
  }

  return snapshotItemsPromise;
}

export async function listSnapshotRepositories() {
  const items = await loadSnapshotItems();
  const repositories = new Set<string>();

  for (const item of items) {
    const repository = stringOrNull(asRecord(item)?.repository);

    if (repository) {
      repositories.add(repository);
    }
  }

  return Array.from(repositories).sort((left, right) => left.localeCompare(right));
}

export async function listSnapshotAuthorHandles() {
  const items = await loadSnapshotItems();
  const handles = new Set<string>();

  for (const item of items) {
    const authorRecord = asRecord(asRecord(item)?.author);
    const rawHandle = stringOrNull(authorRecord?.handle);

    if (!rawHandle) {
      continue;
    }

    const normalized = normalizeAuthorHandle(rawHandle);

    if (normalized) {
      handles.add(normalized);
    }
  }

  return Array.from(handles).sort((left, right) => left.localeCompare(right));
}
