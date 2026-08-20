import type { StaticCommunity } from "./api-types";
import {
  loadOpportunityCommunities,
  loadOpportunityManifest,
  withStaticArtifactRecovery,
} from "./static-artifacts";
import type { CommunityProfileSummary } from "./types";

export interface CommunitySummary extends CommunityProfileSummary {
  avatarUrl: string;
  region: string;
  country: string;
}

function toSortedList(values: StaticCommunity[]): CommunitySummary[] {
  return [...values].sort((left, right) => {
    if (right.opportunitiesCount !== left.opportunitiesCount) {
      return right.opportunitiesCount - left.opportunitiesCount;
    }
    const leftPostedAt = Date.parse(left.lastPostedAt ?? "");
    const rightPostedAt = Date.parse(right.lastPostedAt ?? "");
    if (Number.isFinite(leftPostedAt) && Number.isFinite(rightPostedAt)) {
      if (rightPostedAt !== leftPostedAt) return rightPostedAt - leftPostedAt;
    } else if (Number.isFinite(leftPostedAt)) {
      return -1;
    } else if (Number.isFinite(rightPostedAt)) {
      return 1;
    }
    return left.repository.localeCompare(right.repository);
  });
}

export async function listSnapshotCommunities(): Promise<CommunitySummary[]> {
  return withStaticArtifactRecovery(async () => {
    const manifest = await loadOpportunityManifest();
    const communities = await loadOpportunityCommunities(manifest);
    return toSortedList(communities.items);
  });
}

export async function getSnapshotCommunityByRepository(repository: string) {
  const normalizedRepository = repository.trim();
  if (!normalizedRepository) return null;

  const communities = await listSnapshotCommunities();
  return communities.find(
    (community) => community.repository === normalizedRepository,
  ) ?? null;
}
