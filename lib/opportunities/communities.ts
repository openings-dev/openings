import { loadSnapshotItems } from "./snapshot";
import { dateToMs } from "./summary-helpers";
import { OpportunityIssueState } from "./enums";
import { asRecord, readNonEmptyString } from "./unknown-values";

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
    const repository = readNonEmptyString(record?.repository);
    if (!repository) continue;

    const issueState = readNonEmptyString(record?.issueState) ?? OpportunityIssueState.Open;
    const openOpportunity = issueState !== OpportunityIssueState.Closed ? 1 : 0;
    const createdAtMs = dateToMs(record?.createdAt);
    const communityRecord = asRecord(record?.community);
    const existing = map.get(repository);

    if (!existing) {
      map.set(repository, {
        repository,
        repositoryUrl: readNonEmptyString(record?.repositoryUrl) ?? `https://github.com/${repository}`,
        name: readNonEmptyString(communityRecord?.name) ?? repositoryLabel(repository),
        avatarUrl: readNonEmptyString(communityRecord?.avatarUrl) ?? "",
        region: readNonEmptyString(record?.region) ?? "Unknown",
        country: readNonEmptyString(record?.country) ?? "Unknown",
        opportunitiesCount: openOpportunity,
        lastPostedAt: null,
        lastPostedMs: createdAtMs,
      });
      continue;
    }

    existing.opportunitiesCount += openOpportunity;
    if (createdAtMs > existing.lastPostedMs) existing.lastPostedMs = createdAtMs;
    if (existing.region === "Unknown") existing.region = readNonEmptyString(record?.region) ?? existing.region;
    if (existing.country === "Unknown") existing.country = readNonEmptyString(record?.country) ?? existing.country;
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
