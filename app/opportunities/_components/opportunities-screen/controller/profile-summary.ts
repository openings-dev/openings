import {
  OpportunityIssueState,
  type CommunityProfileSummary,
  type OpportunityItem,
  type UserProfileSummary,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { normalizeForcedAuthor } from "./normalize-forced-author";

function resolveMostFrequentLocation(opportunities: OpportunityItem[]) {
  const counts = new Map<string, number>();
  for (const opportunity of opportunities) {
    const key = `${opportunity.country || "Unknown"}::${opportunity.region || "Unknown"}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const [key = "Unknown::Unknown"] = [...counts.entries()].sort(
    (left, right) => right[1] - left[1],
  )[0] ?? [];
  const [country = "Unknown", region = "Unknown"] = key.split("::");
  return { country, region };
}

function resolveLatestPostedAt(opportunities: OpportunityItem[]) {
  const latest = opportunities.reduce((highest, opportunity) => {
    const current = Date.parse(opportunity.createdAt);
    return Number.isFinite(current) && current > highest ? current : highest;
  }, 0);
  return latest > 0 ? new Date(latest).toISOString() : null;
}

export function resolveUserProfileSummary(params: {
  forcedAuthor: string | null;
  forcedAuthorProfile?: UserProfileSummary | null;
  opportunities: OpportunityItem[];
}): UserProfileSummary | null {
  const { forcedAuthor, forcedAuthorProfile, opportunities } = params;
  if (!forcedAuthor) return null;
  if (forcedAuthorProfile && normalizeForcedAuthor(forcedAuthorProfile.handle) === forcedAuthor) {
    return forcedAuthorProfile;
  }
  const items = opportunities.filter(
    (item) => item.issueState === OpportunityIssueState.Open &&
      normalizeForcedAuthor(item.author.handle) === forcedAuthor,
  );
  if (items.length === 0) {
    return { handle: forcedAuthor, name: forcedAuthor, avatarUrl: "", country: "Unknown", region: "Unknown", opportunitiesCount: 0, lastPostedAt: null };
  }
  return {
    handle: forcedAuthor,
    name: items[0]?.author.name || forcedAuthor,
    avatarUrl: items[0]?.author.avatarUrl || "",
    ...resolveMostFrequentLocation(items),
    opportunitiesCount: items.length,
    lastPostedAt: resolveLatestPostedAt(items),
  };
}

export function resolveCommunityProfileSummary(params: {
  forcedRepository: string | null;
  forcedRepositoryProfile?: CommunityProfileSummary | null;
  opportunities: OpportunityItem[];
}): CommunityProfileSummary | null {
  const { forcedRepository, forcedRepositoryProfile, opportunities } = params;
  if (!forcedRepository) return null;
  if (forcedRepositoryProfile?.repository.trim() === forcedRepository) return forcedRepositoryProfile;
  const items = opportunities.filter(
    (item) => item.issueState === OpportunityIssueState.Open && item.repository === forcedRepository,
  );
  if (items.length === 0) {
    return { repository: forcedRepository, name: forcedRepository.split("/")[0] ?? forcedRepository, avatarUrl: "", country: "Unknown", region: "Unknown", opportunitiesCount: 0, lastPostedAt: null };
  }
  return {
    repository: forcedRepository,
    name: items[0]?.community.name || forcedRepository.split("/")[0] || forcedRepository,
    avatarUrl: items[0]?.community.avatarUrl || "",
    ...resolveMostFrequentLocation(items),
    opportunitiesCount: items.length,
    lastPostedAt: resolveLatestPostedAt(items),
  };
}

export function normalizeSelectedOpportunityId(id: string | null): string | null {
  return id?.trim() || null;
}
