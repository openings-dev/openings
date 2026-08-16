import { openingsDataUrl } from "./static-api";
import { fetchJson } from "./fetch-json";
import { asRecord, readNonEmptyString } from "./unknown-values";

const SNAPSHOT_FETCH_BATCH_SIZE = 12;

interface SnapshotDataset {
  items: unknown[];
  generatedAt: string | null;
}

let snapshotDatasetPromise: Promise<SnapshotDataset> | null = null;

function normalizeAuthorHandle(handle: string) {
  return handle.trim().replace(/^@+/, "");
}

function resolveSnapshotUrl() {
  return (
    process.env.OPENINGS_DATA_SNAPSHOT_URL ||
    process.env.NEXT_PUBLIC_OPENINGS_DATA_SNAPSHOT_URL ||
    openingsDataUrl("index.json")
  );
}

function sortAndDedupeSnapshotItems(items: unknown[]) {
  const byId = new Map<string, unknown>();

  for (const item of items) {
    const id = readNonEmptyString(asRecord(item)?.id);

    if (id) {
      byId.set(id, item);
    }
  }

  return Array.from(byId.values()).sort((left, right) => {
    const leftUpdatedAt = Date.parse(readNonEmptyString(asRecord(left)?.updatedAt) ?? "");
    const rightUpdatedAt = Date.parse(readNonEmptyString(asRecord(right)?.updatedAt) ?? "");
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

async function loadSegmentedSnapshotItems(
  snapshotUrl: string,
  payload: unknown,
): Promise<SnapshotDataset> {
  const record = asRecord(payload);

  if (!record || !Array.isArray(record.countries)) {
    throw new Error(`Invalid snapshot payload at ${snapshotUrl}`);
  }

  const countryIndexUrls = record.countries
    .map((entry) => readNonEmptyString(asRecord(entry)?.indexFile))
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
        .map((repository) => readNonEmptyString(asRecord(repository)?.file))
        .filter((file): file is string => Boolean(file));
    })
    .map((file) => new URL(file, snapshotUrl).toString());

  const shardPayloads = await fetchJsonInBatches(shardUrls);
  const items = shardPayloads.flatMap((shard) => {
    const shardItems = asRecord(shard)?.items;
    return Array.isArray(shardItems) ? shardItems : [];
  });

  return {
    items: sortAndDedupeSnapshotItems(items),
    generatedAt: readNonEmptyString(record.generatedAt),
  };
}

async function loadSnapshotDatasetUncached(): Promise<SnapshotDataset> {
  const snapshotUrl = resolveSnapshotUrl();
  const payload = await fetchJson(snapshotUrl);

  return loadSegmentedSnapshotItems(snapshotUrl, payload);
}

function loadSnapshotDataset() {
  if (!snapshotDatasetPromise) {
    snapshotDatasetPromise = loadSnapshotDatasetUncached();
  }

  return snapshotDatasetPromise;
}

export function loadSnapshotItems() {
  return loadSnapshotDataset().then((dataset) => dataset.items);
}

export async function listSnapshotRepositories() {
  const items = await loadSnapshotItems();
  const repositories = new Set<string>();

  for (const item of items) {
    const repository = readNonEmptyString(asRecord(item)?.repository);

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
    const rawHandle = readNonEmptyString(authorRecord?.handle);

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
