import { openingsDataUrl } from "./data-source";
import { fetchJson } from "./fetch-json";
import { isValidOpportunityItem } from "./static-artifact-validation";
import { asRecord, readNonEmptyString } from "./unknown-values";

const SNAPSHOT_FETCH_BATCH_SIZE = 12;

interface SnapshotDataset {
  items: unknown[];
  generatedAt: string | null;
}

interface SnapshotCountryDescriptor {
  country: string;
  countryCode: string;
  region: string;
  opportunities: number;
  indexUrl: string;
}

interface SnapshotShardDescriptor {
  country: string;
  countryCode: string;
  region: string;
  repository: string;
  issues: number;
  openIssues: number;
  closedIssues: number;
  hash: string;
  url: string;
}

let snapshotDatasetPromise: Promise<SnapshotDataset> | null = null;

function readNonNegativeInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0
    ? value
    : null;
}

function requireNonEmptyString(value: unknown, context: string): string {
  const result = readNonEmptyString(value);
  if (!result) throw new Error(`Missing ${context}`);
  return result;
}

function requireNonNegativeInteger(value: unknown, context: string): number {
  const result = readNonNegativeInteger(value);
  if (result === null) throw new Error(`Invalid ${context}`);
  return result;
}

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

function snapshotDirectoryUrl(snapshotUrl: string): string {
  const parsed = new URL(snapshotUrl);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`Unsupported snapshot URL protocol at ${snapshotUrl}`);
  }
  return new URL(".", parsed).toString();
}

function resolveSnapshotArtifactUrl(reference: string, snapshotUrl: string): string {
  const allowedPrefix = snapshotDirectoryUrl(snapshotUrl);
  const resolved = new URL(reference, allowedPrefix);
  const allowed = new URL(allowedPrefix);
  if (
    resolved.origin !== allowed.origin ||
    !resolved.pathname.startsWith(allowed.pathname)
  ) {
    throw new Error(`Snapshot artifact path leaves its configured data directory: ${reference}`);
  }
  return resolved.toString();
}

async function fetchJsonInBatches(urls: string[], allowedUrlPrefix: string) {
  const payloads: unknown[] = [];

  for (let start = 0; start < urls.length; start += SNAPSHOT_FETCH_BATCH_SIZE) {
    const batch = urls.slice(start, start + SNAPSHOT_FETCH_BATCH_SIZE);
    payloads.push(...(await Promise.all(
      batch.map((url) => fetchJson(url, { allowedUrlPrefix })),
    )));
  }

  return payloads;
}

async function loadSegmentedSnapshotItems(
  snapshotUrl: string,
  payload: unknown,
): Promise<SnapshotDataset> {
  const record = asRecord(payload);

  if (
    !record ||
    record.schemaVersion !== 2 ||
    !readNonEmptyString(record.generatedAt) ||
    !readNonEmptyString(record.dataHash) ||
    !Array.isArray(record.countries)
  ) {
    throw new Error(`Invalid snapshot payload at ${snapshotUrl}`);
  }

  const allowedUrlPrefix = snapshotDirectoryUrl(snapshotUrl);
  const countryDescriptors: SnapshotCountryDescriptor[] = record.countries.map(
    (entry, index) => {
      const entryRecord = asRecord(entry);
      if (!entryRecord) {
        throw new Error(`Invalid country descriptor ${index} at ${snapshotUrl}`);
      }
      return {
        country: requireNonEmptyString(entryRecord.country, `country ${index}`),
        countryCode: requireNonEmptyString(
          entryRecord.countryCode,
          `country code ${index}`,
        ),
        region: requireNonEmptyString(entryRecord.region, `region ${index}`),
        opportunities: requireNonNegativeInteger(
          entryRecord.opportunities,
          `opportunity count for country ${index}`,
        ),
        indexUrl: resolveSnapshotArtifactUrl(
          requireNonEmptyString(entryRecord.indexFile, `country index ${index}`),
          snapshotUrl,
        ),
      };
    },
  );

  const countryIndexes = await fetchJsonInBatches(
    countryDescriptors.map((descriptor) => descriptor.indexUrl),
    allowedUrlPrefix,
  );
  const shardDescriptors = countryIndexes.flatMap(
    (countryIndex, countryIndexPosition): SnapshotShardDescriptor[] => {
      const countryDescriptor = countryDescriptors[countryIndexPosition];
      const countryRecord = asRecord(countryIndex);
      const repositories = countryRecord?.byRepository;
      if (!countryDescriptor || !countryRecord || !Array.isArray(repositories)) {
        throw new Error(
          `Invalid repository index ${countryIndexPosition} referenced by ${snapshotUrl}`,
        );
      }
      if (
        countryRecord.country !== countryDescriptor.country ||
        countryRecord.countryCode !== countryDescriptor.countryCode ||
        countryRecord.region !== countryDescriptor.region
      ) {
        throw new Error(`Country index ${countryIndexPosition} does not match its descriptor`);
      }

      const descriptors = repositories.map((repository, repositoryPosition) => {
        const repositoryRecord = asRecord(repository);
        if (!repositoryRecord) {
          throw new Error(
            `Invalid repository artifact ${repositoryPosition} in index ${countryIndexPosition}`,
          );
        }
        return {
          country: countryDescriptor.country,
          countryCode: countryDescriptor.countryCode,
          region: countryDescriptor.region,
          repository: requireNonEmptyString(
            repositoryRecord.repository,
            `repository ${repositoryPosition} in index ${countryIndexPosition}`,
          ),
          issues: requireNonNegativeInteger(
            repositoryRecord.issues,
            `issue count for repository ${repositoryPosition}`,
          ),
          openIssues: requireNonNegativeInteger(
            repositoryRecord.openIssues,
            `open issue count for repository ${repositoryPosition}`,
          ),
          closedIssues: requireNonNegativeInteger(
            repositoryRecord.closedIssues,
            `closed issue count for repository ${repositoryPosition}`,
          ),
          hash: requireNonEmptyString(
            repositoryRecord.hash,
            `hash for repository ${repositoryPosition}`,
          ),
          url: resolveSnapshotArtifactUrl(
            requireNonEmptyString(
              repositoryRecord.file,
              `file for repository ${repositoryPosition}`,
            ),
            snapshotUrl,
          ),
        } satisfies SnapshotShardDescriptor;
      });
      const describedOpportunityCount = descriptors.reduce(
        (total, descriptor) => total + descriptor.issues,
        0,
      );
      if (describedOpportunityCount !== countryDescriptor.opportunities) {
        throw new Error(
          `Country index ${countryIndexPosition} count does not match its descriptor`,
        );
      }
      return descriptors;
    },
  );

  const shardPayloads = await fetchJsonInBatches(
    shardDescriptors.map((descriptor) => descriptor.url),
    allowedUrlPrefix,
  );
  const items = shardPayloads.flatMap((shard, shardPosition) => {
    const descriptor = shardDescriptors[shardPosition];
    const shardRecord = asRecord(shard);
    const shardItems = shardRecord?.items;
    const shardTotals = asRecord(shardRecord?.totals);
    if (!descriptor || !shardRecord || !Array.isArray(shardItems) || !shardTotals) {
      throw new Error(`Invalid snapshot artifact ${shardPosition} referenced by ${snapshotUrl}`);
    }
    if (
      shardRecord.repository !== descriptor.repository ||
      shardRecord.country !== descriptor.country ||
      shardRecord.countryCode !== descriptor.countryCode ||
      shardRecord.region !== descriptor.region ||
      shardRecord.dataHash !== descriptor.hash ||
      shardItems.length !== descriptor.issues ||
      shardTotals.opportunities !== descriptor.issues ||
      shardTotals.openIssues !== descriptor.openIssues ||
      shardTotals.closedIssues !== descriptor.closedIssues
    ) {
      throw new Error(`Snapshot artifact ${shardPosition} does not match its descriptor`);
    }

    let openIssues = 0;
    let closedIssues = 0;
    for (const [itemPosition, item] of shardItems.entries()) {
      if (
        !isValidOpportunityItem(item) ||
        item.repository !== descriptor.repository ||
        item.country !== descriptor.country
      ) {
        throw new Error(
          `Invalid opportunity ${itemPosition} in snapshot artifact ${shardPosition}`,
        );
      }
      if (item.issueState === "open") openIssues += 1;
      if (item.issueState === "closed") closedIssues += 1;
    }
    if (
      openIssues !== descriptor.openIssues ||
      closedIssues !== descriptor.closedIssues
    ) {
      throw new Error(`Snapshot artifact ${shardPosition} state totals do not match`);
    }
    return shardItems;
  });

  const topLevelOpportunityCount = requireNonNegativeInteger(
    asRecord(record.totals)?.opportunities,
    "snapshot opportunity total",
  );
  if (items.length !== topLevelOpportunityCount) {
    throw new Error("Snapshot artifact counts do not match the top-level total");
  }

  return {
    items: sortAndDedupeSnapshotItems(items),
    generatedAt: readNonEmptyString(record.generatedAt),
  };
}

async function loadSnapshotDatasetUncached(): Promise<SnapshotDataset> {
  const snapshotUrl = resolveSnapshotUrl();
  const payload = await fetchJson(snapshotUrl, {
    allowedUrlPrefix: snapshotDirectoryUrl(snapshotUrl),
  });

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
