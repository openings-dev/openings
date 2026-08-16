import { normalizeAuthorHandle } from "./routing";
import { loadSnapshotItems } from "./snapshot";
import {
  dateToMs,
  locationKey,
  mostFrequentLocation,
} from "./summary-helpers";
import { OpportunityIssueState } from "./enums";
import { asRecord, readNonEmptyString } from "./unknown-values";

export interface UserSummary {
  handle: string;
  name: string;
  avatarUrl: string;
  region: string;
  country: string;
  opportunitiesCount: number;
  lastPostedAt: string | null;
}

interface MutableUserSummary extends UserSummary {
  lastPostedMs: number;
  locations: Map<string, number>;
}

function toSortedUsers(users: Iterable<MutableUserSummary>) {
  return [...users]
    .filter((entry) => entry.opportunitiesCount > 0)
    .map(({ locations, lastPostedMs, ...user }) => ({
      ...user,
      ...mostFrequentLocation(locations),
      lastPostedAt: lastPostedMs > 0 ? new Date(lastPostedMs).toISOString() : null,
    }))
    .sort((left, right) => {
      if (right.opportunitiesCount !== left.opportunitiesCount) {
        return right.opportunitiesCount - left.opportunitiesCount;
      }
      const leftMs = Date.parse(left.lastPostedAt ?? "");
      const rightMs = Date.parse(right.lastPostedAt ?? "");
      return rightMs - leftMs || left.handle.localeCompare(right.handle);
    });
}

export async function listSnapshotUsers() {
  const items = await loadSnapshotItems();
  const users = new Map<string, MutableUserSummary>();

  for (const item of items) {
    const record = asRecord(item);
    const issueState = readNonEmptyString(record?.issueState) ?? OpportunityIssueState.Open;
    if (issueState === OpportunityIssueState.Closed) continue;

    const author = asRecord(record?.author);
    const rawHandle = readNonEmptyString(author?.handle) ?? readNonEmptyString(author?.name) ?? "";
    const handle = normalizeAuthorHandle(rawHandle);
    if (!handle) continue;

    const existing = users.get(handle);
    const country = readNonEmptyString(record?.country) ?? "Unknown";
    const region = readNonEmptyString(record?.region) ?? "Unknown";
    const location = locationKey(country, region);
    const postedAtMs = dateToMs(record?.createdAt);

    if (!existing) {
      users.set(handle, {
        handle,
        name: readNonEmptyString(author?.name) ?? handle,
        avatarUrl: readNonEmptyString(author?.avatarUrl) ?? "",
        region: "Unknown",
        country: "Unknown",
        opportunitiesCount: 1,
        lastPostedAt: null,
        lastPostedMs: postedAtMs,
        locations: new Map([[location, 1]]),
      });
      continue;
    }

    existing.opportunitiesCount += 1;
    existing.locations.set(location, (existing.locations.get(location) ?? 0) + 1);
    if (postedAtMs > existing.lastPostedMs) existing.lastPostedMs = postedAtMs;
    if (!existing.avatarUrl) existing.avatarUrl = readNonEmptyString(author?.avatarUrl) ?? "";
  }

  return toSortedUsers(users.values());
}

export async function getSnapshotUserByHandle(handle: string) {
  const normalizedHandle = normalizeAuthorHandle(handle);
  if (!normalizedHandle) {
    return null;
  }

  const users = await listSnapshotUsers();
  return users.find((user) => user.handle === normalizedHandle) ?? null;
}
