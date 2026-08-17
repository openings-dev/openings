import { loadSnapshotItems } from "./snapshot";
import { dateToMs, normalizeLocationValue } from "./summary-helpers";
import { OpportunityIssueState } from "./enums";
import { buildGitHubRepositoryUrl } from "./routing";
import { asRecord, readNonEmptyString } from "./unknown-values";
import type { CommunityProfileSummary } from "./types";

export interface CommunitySummary extends CommunityProfileSummary {
  avatarUrl: string;
  region: string;
  country: string;
}

interface MutableCommunitySummary extends CommunitySummary {
  lastPostedMs: number | null;
}

function repositoryLabel(repository: string) {
  return repository.split("/")[0] ?? repository;
}

function toSortedList(values: Iterable<MutableCommunitySummary>) {
  return [...values]
    .filter((entry) => entry.opportunitiesCount > 0)
    .sort((left, right) => {
      if (right.opportunitiesCount !== left.opportunitiesCount) {
        return right.opportunitiesCount - left.opportunitiesCount;
      }
      if (left.lastPostedMs === null && right.lastPostedMs !== null) return 1;
      if (right.lastPostedMs === null && left.lastPostedMs !== null) return -1;
      if (
        left.lastPostedMs !== null &&
        right.lastPostedMs !== null &&
        right.lastPostedMs !== left.lastPostedMs
      ) {
        return right.lastPostedMs - left.lastPostedMs;
      }
      return left.repository < right.repository
        ? -1
        : left.repository > right.repository
          ? 1
          : 0;
    })
    .map(({ lastPostedMs, ...community }) => ({
      ...community,
      lastPostedAt:
        lastPostedMs === null ? null : new Date(lastPostedMs).toISOString(),
    }));
}

export async function listSnapshotCommunities() {
  const items = await loadSnapshotItems();
  const map = new Map<string, MutableCommunitySummary>();

  for (const item of items) {
    const record = asRecord(item);
    const repository = readNonEmptyString(record?.repository);
    if (!repository) continue;

    const issueState = readNonEmptyString(record?.issueState);
    if (issueState !== OpportunityIssueState.Open) continue;

    const createdAtMs = dateToMs(record?.createdAt);
    const communityRecord = asRecord(record?.community);
    const existing = map.get(repository);

    if (!existing) {
      map.set(repository, {
        repository,
        repositoryUrl: buildGitHubRepositoryUrl(repository),
        name: readNonEmptyString(communityRecord?.name) ?? repositoryLabel(repository),
        avatarUrl: readNonEmptyString(communityRecord?.avatarUrl) ?? "",
        region: normalizeLocationValue(readNonEmptyString(record?.region)),
        country: normalizeLocationValue(readNonEmptyString(record?.country)),
        opportunitiesCount: 1,
        lastPostedAt: null,
        lastPostedMs: createdAtMs,
      });
      continue;
    }

    existing.opportunitiesCount += 1;
    if (
      createdAtMs !== null &&
      (existing.lastPostedMs === null || createdAtMs > existing.lastPostedMs)
    ) {
      existing.lastPostedMs = createdAtMs;
    }
    if (!existing.region) {
      existing.region = normalizeLocationValue(readNonEmptyString(record?.region));
    }
    if (!existing.country) {
      existing.country = normalizeLocationValue(readNonEmptyString(record?.country));
    }
  }

  return toSortedList(map.values());
}

export async function getSnapshotCommunityByRepository(repository: string) {
  const normalizedRepository = repository.trim();
  if (!normalizedRepository) {
    return null;
  }

  const communities = await listSnapshotCommunities();
  return (
    communities.find((community) => community.repository === normalizedRepository) ??
    null
  );
}
