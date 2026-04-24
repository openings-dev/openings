import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useResponsiveFilterPanel } from "@/app/_hooks/use-responsive-filter-panel";
import { useI18n } from "@/components/providers/i18n-provider";
import { buildCommunityPath, buildUserPath } from "@/lib/opportunities/routing";
import { buildServerFilters } from "./server-filters";
import { normalizeFilterDependencies } from "./filter-dependencies";
import { normalizeForcedAuthor } from "./normalize-forced-author";
import { useRepositoryFilterRegistry } from "./repository-filter-registry";
import { useDerivedOpportunities } from "./use-derived-opportunities";
import { useEnsurePageLoaded } from "./use-ensure-page-loaded";
import { useFiltersState } from "./use-filters-state";
import { useForcedAuthorAutoload } from "./use-forced-author-autoload";
import { useLoadMoreHandler } from "./use-load-more-handler";
import { useRemoteOpportunities } from "./use-remote-opportunities";
import { useUrlSync } from "./use-url-sync";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type {
  CommunityProfileSummary,
  OpportunitiesScreenProps,
  OpportunityItem,
  UserProfileSummary,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface ProfileHeaderData {
  title: string;
  subtitle: string;
  avatarUrl: string;
  opportunitiesSummary: string;
  locationSummary: string;
  lastPostedSummary: string;
}

function resolveMostFrequentLocation(opportunities: OpportunityItem[]) {
  const locationCounts = new Map<string, number>();

  for (const opportunity of opportunities) {
    const country = opportunity.country || "Unknown";
    const region = opportunity.region || "Unknown";
    const key = `${country}::${region}`;
    locationCounts.set(key, (locationCounts.get(key) ?? 0) + 1);
  }

  const [topLocation = "Unknown::Unknown"] = [...locationCounts.entries()].sort(
    (left, right) => right[1] - left[1],
  )[0] ?? [];
  const [country = "Unknown", region = "Unknown"] = topLocation.split("::");

  return { country, region };
}

function resolveLatestPostedAt(opportunities: OpportunityItem[]) {
  const latestPostedMs = opportunities.reduce((highest, opportunity) => {
    const current = Date.parse(opportunity.createdAt);
    return Number.isFinite(current) && current > highest ? current : highest;
  }, 0);

  return latestPostedMs > 0 ? new Date(latestPostedMs).toISOString() : null;
}

function buildFallbackUserProfile(handle: string, opportunities: OpportunityItem[]) {
  if (opportunities.length === 0) {
    return {
      handle,
      name: handle,
      avatarUrl: "",
      country: "Unknown",
      region: "Unknown",
      opportunitiesCount: 0,
      lastPostedAt: null,
    } satisfies UserProfileSummary;
  }

  const { country, region } = resolveMostFrequentLocation(opportunities);

  return {
    handle,
    name: opportunities[0]?.author.name || handle,
    avatarUrl: opportunities[0]?.author.avatarUrl || "",
    country,
    region,
    opportunitiesCount: opportunities.length,
    lastPostedAt: resolveLatestPostedAt(opportunities),
  } satisfies UserProfileSummary;
}

function resolveUserProfileSummary(params: {
  forcedAuthor: string | null;
  forcedAuthorProfile?: UserProfileSummary | null;
  opportunities: OpportunityItem[];
}) {
  const { forcedAuthor, forcedAuthorProfile, opportunities } = params;

  if (!forcedAuthor) {
    return null;
  }

  if (
    forcedAuthorProfile &&
    normalizeForcedAuthor(forcedAuthorProfile.handle) === forcedAuthor
  ) {
    return forcedAuthorProfile;
  }

  const authoredOpportunities = opportunities.filter(
    (item) =>
      item.issueState === "open" &&
      normalizeForcedAuthor(item.author.handle) === forcedAuthor,
  );

  return buildFallbackUserProfile(forcedAuthor, authoredOpportunities);
}

function buildFallbackCommunityProfile(
  repository: string,
  opportunities: OpportunityItem[],
) {
  if (opportunities.length === 0) {
    return {
      repository,
      name: repository.split("/")[0] ?? repository,
      avatarUrl: "",
      country: "Unknown",
      region: "Unknown",
      opportunitiesCount: 0,
      lastPostedAt: null,
    } satisfies CommunityProfileSummary;
  }

  const { country, region } = resolveMostFrequentLocation(opportunities);

  return {
    repository,
    name: opportunities[0]?.community.name || repository.split("/")[0] || repository,
    avatarUrl: opportunities[0]?.community.avatarUrl || "",
    country,
    region,
    opportunitiesCount: opportunities.length,
    lastPostedAt: resolveLatestPostedAt(opportunities),
  } satisfies CommunityProfileSummary;
}

function resolveCommunityProfileSummary(params: {
  forcedRepository: string | null;
  forcedRepositoryProfile?: CommunityProfileSummary | null;
  opportunities: OpportunityItem[];
}) {
  const { forcedRepository, forcedRepositoryProfile, opportunities } = params;

  if (!forcedRepository) {
    return null;
  }

  if (
    forcedRepositoryProfile &&
    forcedRepositoryProfile.repository.trim() === forcedRepository
  ) {
    return forcedRepositoryProfile;
  }

  const communityOpportunities = opportunities.filter(
    (item) => item.issueState === "open" && item.repository === forcedRepository,
  );

  return buildFallbackCommunityProfile(forcedRepository, communityOpportunities);
}

export function useOpportunitiesScreenController({
  forcedRepository,
  forcedAuthor,
  forcedAuthorProfile,
  forcedRepositoryProfile,
}: OpportunitiesScreenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, messages } = useI18n();
  const opportunitiesMessages = messages.opportunities;
  const normalizedForcedRepository = forcedRepository?.trim() || null;
  const normalizedForcedAuthor = normalizeForcedAuthor(forcedAuthor);
  const repositoryRegistry = useRepositoryFilterRegistry();
  const [selectedOpportunityId, setSelectedOpportunityId] = React.useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = useResponsiveFilterPanel({
    desktopQuery: "(min-width: 1024px)",
  });
  const { filters, setFilters, handleFieldChange, handleToggleTag, handleToggleAuthor, handleClearFilters } = useFiltersState({
    searchParamsValue: searchParams.toString(),
    forcedRepository: normalizedForcedRepository,
    forcedAuthor: normalizedForcedAuthor,
    registry: repositoryRegistry.registry,
    resetSuccessMessage: opportunitiesMessages.feedback.filtersReset,
  });
  const serverFilters = React.useMemo(
    () =>
      buildServerFilters(
        {
          repository: filters.repository,
          region: filters.region,
          country: filters.country,
          sortOrder: filters.sortOrder,
          searchText: filters.searchText,
          tags: filters.tags,
          authors: filters.authors,
        },
        normalizedForcedRepository,
        normalizedForcedAuthor,
        repositoryRegistry.registry,
      ),
    [
      filters.authors,
      filters.country,
      filters.region,
      filters.repository,
      filters.searchText,
      filters.sortOrder,
      filters.tags,
      normalizedForcedAuthor,
      normalizedForcedRepository,
      repositoryRegistry.registry,
    ],
  );
  const handleBeforeReload = React.useCallback(() => {
    setSelectedOpportunityId(null);
    setFilters((previous) => (previous.page === 1 ? previous : { ...previous, page: 1 }));
  }, [setFilters]);
  const remote = useRemoteOpportunities({
    serverFilters,
    enabled: !repositoryRegistry.isLoading,
    onBeforeReload: handleBeforeReload,
    messages: opportunitiesMessages.feedback,
  });
  const derived = useDerivedOpportunities({
    opportunities: remote.opportunities,
    facetCounts: remote.facetCounts,
    filters,
    selectedOpportunityId,
    forcedRepository: normalizedForcedRepository,
    forcedAuthor: normalizedForcedAuthor,
    registry: repositoryRegistry.registry,
    remoteFilteredCount: remote.filteredCount,
    locale,
    rangeMessages: opportunitiesMessages.range,
  });
  const userProfileSummary = React.useMemo(
    () =>
      resolveUserProfileSummary({
        forcedAuthor: normalizedForcedAuthor,
        forcedAuthorProfile,
        opportunities: remote.opportunities,
      }),
    [forcedAuthorProfile, normalizedForcedAuthor, remote.opportunities],
  );
  const communityProfileSummary = React.useMemo(
    () =>
      resolveCommunityProfileSummary({
        forcedRepository: normalizedForcedRepository,
        forcedRepositoryProfile,
        opportunities: remote.opportunities,
      }),
    [forcedRepositoryProfile, normalizedForcedRepository, remote.opportunities],
  );
  const isUserProfileScope = Boolean(normalizedForcedAuthor);
  const isCommunityProfileScope = !isUserProfileScope && Boolean(normalizedForcedRepository);
  const headerKicker = isUserProfileScope
    ? messages.users.header.kicker
    : isCommunityProfileScope
      ? messages.communities.header.kicker
      : opportunitiesMessages.header.kicker;
  const headerTitle = isUserProfileScope
    ? (userProfileSummary?.name || normalizedForcedAuthor || opportunitiesMessages.header.title)
    : isCommunityProfileScope
      ? (communityProfileSummary?.name ||
        normalizedForcedRepository ||
        opportunitiesMessages.header.title)
      : opportunitiesMessages.header.title;
  const headerDescription = isUserProfileScope
    ? `@${userProfileSummary?.handle || normalizedForcedAuthor}`
    : isCommunityProfileScope
      ? communityProfileSummary?.repository || normalizedForcedRepository || ""
      : opportunitiesMessages.header.description;
  const profileHeader = React.useMemo<ProfileHeaderData | null>(() => {
    if (isUserProfileScope && userProfileSummary) {
      const lastPostedSummary = userProfileSummary.lastPostedAt
        ? formatTemplate(opportunitiesMessages.card.postedAt, {
            date: new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
            }).format(new Date(userProfileSummary.lastPostedAt)),
          })
        : opportunitiesMessages.status.updatedUnavailable;

      return {
        title: userProfileSummary.name,
        subtitle: `@${userProfileSummary.handle}`,
        avatarUrl: userProfileSummary.avatarUrl,
        opportunitiesSummary: formatTemplate(messages.users.list.opportunitiesCount, {
          count: userProfileSummary.opportunitiesCount.toLocaleString(locale),
        }),
        locationSummary: `${messages.users.list.countryLabel}: ${userProfileSummary.country} • ${messages.users.list.regionLabel}: ${userProfileSummary.region}`,
        lastPostedSummary,
      };
    }

    if (isCommunityProfileScope && communityProfileSummary) {
      const lastPostedSummary = communityProfileSummary.lastPostedAt
        ? formatTemplate(opportunitiesMessages.card.postedAt, {
            date: new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
            }).format(new Date(communityProfileSummary.lastPostedAt)),
          })
        : opportunitiesMessages.status.updatedUnavailable;

      return {
        title: communityProfileSummary.name,
        subtitle: communityProfileSummary.repository,
        avatarUrl: communityProfileSummary.avatarUrl,
        opportunitiesSummary: formatTemplate(messages.communities.list.opportunitiesCount, {
          count: communityProfileSummary.opportunitiesCount.toLocaleString(locale),
        }),
        locationSummary: `${messages.communities.list.countryLabel}: ${communityProfileSummary.country} • ${messages.communities.list.regionLabel}: ${communityProfileSummary.region}`,
        lastPostedSummary,
      };
    }

    return null;
  }, [
    communityProfileSummary,
    isCommunityProfileScope,
    isUserProfileScope,
    locale,
    messages.communities.list,
    messages.users.list,
    opportunitiesMessages.card.postedAt,
    opportunitiesMessages.status.updatedUnavailable,
    userProfileSummary,
  ]);
  const filtersForUrl = React.useMemo(
    () =>
      normalizeFilterDependencies(
        { ...filters, page: derived.currentPage },
        repositoryRegistry.registry,
      ),
    [derived.currentPage, filters, repositoryRegistry.registry],
  );
  useUrlSync({ pathname, router, currentSearch: searchParams.toString(), filtersForUrl });
  const hasMore = derived.currentPage < derived.totalPages || remote.hasMoreRemote;
  useEnsurePageLoaded({
    currentPage: derived.currentPage,
    itemsPerPage: derived.normalizedFilters.itemsPerPage,
    loadedCount: derived.loadedCount,
    totalCount: derived.totalCount,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    hasMoreRemote: remote.hasMoreRemote,
    nextCursor: remote.nextCursor,
    setIsFetchingMore: remote.setIsFetchingMore,
    loadMoreFromApi: remote.loadMoreFromApi,
  });
  const handleLoadMore = useLoadMoreHandler({
    currentPage: derived.currentPage,
    totalPages: derived.totalPages,
    loadedCount: derived.loadedCount,
    totalCount: derived.totalCount,
    itemsPerPage: derived.normalizedFilters.itemsPerPage,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    hasMoreRemote: remote.hasMoreRemote,
    nextCursor: remote.nextCursor,
    setIsFetchingMore: remote.setIsFetchingMore,
    setFilters,
    loadMoreFromApi: remote.loadMoreFromApi,
  });
  useForcedAuthorAutoload({
    forcedAuthor: normalizedForcedAuthor,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    hasMoreRemote: remote.hasMoreRemote,
    nextCursor: remote.nextCursor,
    filteredCount: derived.filteredOpportunities.length,
    onLoadMore: handleLoadMore,
  });
  return {
    opportunitiesMessages,
    headerKicker,
    headerTitle,
    headerDescription,
    profileHeader,
    hideCommunityIdentity: Boolean(normalizedForcedRepository),
    hideAuthorIdentity: Boolean(normalizedForcedAuthor),
    lastUpdatedAt: remote.lastUpdatedAt ?? remote.snapshotGeneratedAt,
    filtersExpanded,
    setFiltersExpanded,
    handleFieldChange,
    handleToggleTag,
    handleToggleAuthor,
    handleClearFilters,
    handleLoadMore,
    hasMore,
    selectedOpportunity: derived.selectedOpportunity,
    isDetailsOpen: derived.isDetailsOpen,
    selectedOpportunityId: derived.selectedOpportunity?.id ?? null,
    options: derived.options,
    normalizedFilters: derived.normalizedFilters,
    rangeLabel: derived.rangeLabel,
    totalCount: derived.totalCount,
    currentPage: derived.currentPage,
    totalPages: derived.totalPages,
    activeFiltersCount: derived.activeFiltersCount,
    hasActiveFilters: derived.hasActiveFilters,
    visibleOpportunities: derived.visibleOpportunities,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    setSelectedOpportunityId,
    onCommunitySelect: (repository: string) => router.push(buildCommunityPath(repository)),
    onAuthorSelect: (authorHandle: string) => router.push(buildUserPath(authorHandle)),
  };
}
