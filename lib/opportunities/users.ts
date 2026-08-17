import { normalizeAuthorHandle } from "./routing";
import { loadSnapshotItems } from "./snapshot";
import {
  dateToMs,
  locationKey,
  mostFrequentLocation,
  normalizeLocationValue,
  validDateToMs,
} from "./summary-helpers";
import { OpportunityIssueState } from "./enums";
import { asRecord, readNonEmptyString } from "./unknown-values";
import type { UserProfileSummary } from "./types";

export interface UserSummary extends UserProfileSummary {
  avatarUrl: string;
  region: string;
  country: string;
}

interface MutableUserSummary extends UserSummary {
  lastPostedMs: number | null;
  locations: Map<string, number>;
}

function toSortedUsers(users: Iterable<MutableUserSummary>) {
  return [...users]
    .filter((entry) => entry.opportunitiesCount > 0)
    .map(({ locations, lastPostedMs, ...user }) => ({
      ...user,
      ...mostFrequentLocation(locations),
      lastPostedAt:
        lastPostedMs === null ? null : new Date(lastPostedMs).toISOString(),
    }))
    .sort((left, right) => {
      if (right.opportunitiesCount !== left.opportunitiesCount) {
        return right.opportunitiesCount - left.opportunitiesCount;
      }
      const leftMs = validDateToMs(left.lastPostedAt);
      const rightMs = validDateToMs(right.lastPostedAt);
      if (leftMs === null && rightMs !== null) return 1;
      if (rightMs === null && leftMs !== null) return -1;
      if (leftMs !== null && rightMs !== null && rightMs !== leftMs) {
        return rightMs - leftMs;
      }
      return left.handle < right.handle ? -1 : left.handle > right.handle ? 1 : 0;
    });
}

export async function listSnapshotUsers() {
  const items = await loadSnapshotItems();
  const users = new Map<string, MutableUserSummary>();

  for (const item of items) {
    const record = asRecord(item);
    const issueState = readNonEmptyString(record?.issueState);
    if (issueState !== OpportunityIssueState.Open) continue;

    const author = asRecord(record?.author);
    const rawHandle = readNonEmptyString(author?.handle) ?? "";
    const handle = normalizeAuthorHandle(rawHandle);
    if (!handle) continue;

    const existing = users.get(handle);
    const country = normalizeLocationValue(readNonEmptyString(record?.country));
    const region = normalizeLocationValue(readNonEmptyString(record?.region));
    const location = locationKey(country, region);
    const postedAtMs = dateToMs(record?.createdAt);

    if (!existing) {
      users.set(handle, {
        handle,
        name: readNonEmptyString(author?.name) ?? handle,
        avatarUrl: readNonEmptyString(author?.avatarUrl) ?? "",
        region: "",
        country: "",
        opportunitiesCount: 1,
        lastPostedAt: null,
        lastPostedMs: postedAtMs,
        locations: new Map(location ? [[location, 1]] : []),
      });
      continue;
    }

    existing.opportunitiesCount += 1;
    if (location) {
      existing.locations.set(location, (existing.locations.get(location) ?? 0) + 1);
    }
    if (
      postedAtMs !== null &&
      (existing.lastPostedMs === null || postedAtMs > existing.lastPostedMs)
    ) {
      existing.lastPostedMs = postedAtMs;
    }
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
