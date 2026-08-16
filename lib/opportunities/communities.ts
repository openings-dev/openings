import { loadSnapshotItems } from "./snapshot";
import { dateToMs } from "./summary-helpers";
import { OpportunityIssueState } from "./enums";

type UnknownRecord = Record<string, unknown>;

export interface CommunitySummary {
  repository: string;
  repositoryUrl: string;
  name: string;
  avatarUrl: string;
  region: string;
  country: string;
  opportunitiesCount: number;
  lastPostedAt: string | null;
}

interface MutableCommunitySummary extends CommunitySummary {
  lastPostedMs: number;
}

function asRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" ? (value as UnknownRecord) : null;
}

function stringOrNull(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
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
      if (right.lastPostedMs !== left.lastPostedMs) {
        return right.lastPostedMs - left.lastPostedMs;
      }
      return left.repository.localeCompare(right.repository);
    })
    .map(({ lastPostedMs, ...community }) => ({
      ...community,
      lastPostedAt: lastPostedMs > 0 ? new Date(lastPostedMs).toISOString() : null,
    }));
}

export async function listSnapshotCommunities() {
  const items = await loadSnapshotItems();
  const map = new Map<string, MutableCommunitySummary>();

  for (const item of items) {
    const record = asRecord(item);
    const repository = stringOrNull(record?.repository);
    if (!repository) continue;

    const issueState = stringOrNull(record?.issueState) ?? OpportunityIssueState.Open;
    const openOpportunity = issueState !== OpportunityIssueState.Closed ? 1 : 0;
    const createdAtMs = dateToMs(record?.createdAt);
    const communityRecord = asRecord(record?.community);
    const existing = map.get(repository);

    if (!existing) {
      map.set(repository, {
        repository,
        repositoryUrl: stringOrNull(record?.repositoryUrl) ?? `https://github.com/${repository}`,
        name: stringOrNull(communityRecord?.name) ?? repositoryLabel(repository),
        avatarUrl: stringOrNull(communityRecord?.avatarUrl) ?? "",
        region: stringOrNull(record?.region) ?? "Unknown",
        country: stringOrNull(record?.country) ?? "Unknown",
        opportunitiesCount: openOpportunity,
        lastPostedAt: null,
        lastPostedMs: createdAtMs,
      });
      continue;
    }

    existing.opportunitiesCount += openOpportunity;
    if (createdAtMs > existing.lastPostedMs) existing.lastPostedMs = createdAtMs;
    if (existing.region === "Unknown") existing.region = stringOrNull(record?.region) ?? existing.region;
    if (existing.country === "Unknown") existing.country = stringOrNull(record?.country) ?? existing.country;
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
