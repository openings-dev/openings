import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { DEFAULT_FILTERS } from "./defaults";
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
import { useSelectedOpportunity } from "./use-selected-opportunity";
import { formatTemplate } from "@/lib/utils/format-template";
import type { OpportunitiesScreenProps } from "@/app/opportunities/_components/opportunities-screen/types";
import {
  normalizeSelectedOpportunityId,
  resolveCommunityProfileSummary,
  resolveUserProfileSummary,
} from "./profile-summary";
import {
  buildCommunityProfileHeader,
  buildUserProfileHeader,
  type ProfileHeaderData,
} from "./profile-header";

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
  const selectedOpportunityIdFromUrl = normalizeSelectedOpportunityId(searchParams.get("job"));
  const repositoryRegistry = useRepositoryFilterRegistry();
  const [filtersModalOpen, setFiltersModalOpen] = React.useState(false);
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
  const {
    selectedOpportunity,
    selectedOpportunityId,
    setSelectedOpportunityId,
  } = useSelectedOpportunity({
    loadedOpportunity: null,
    selectedIdFromUrl: selectedOpportunityIdFromUrl,
  });
  const handleBeforeReload = React.useCallback(() => {
    setSelectedOpportunityId(null);
    setFilters((previous) => (previous.page === 1 ? previous : { ...previous, page: 1 }));
  }, [setFilters, setSelectedOpportunityId]);
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
    ? messages.users.header.profileKicker
    : isCommunityProfileScope
      ? messages.communities.header.profileKicker
      : opportunitiesMessages.header.kicker;
  const headerTitle = isUserProfileScope
    ? formatTemplate(messages.users.header.profileTitle, {
      name: userProfileSummary?.name || normalizedForcedAuthor || "",
    })
    : isCommunityProfileScope
      ? formatTemplate(messages.communities.header.profileTitle, {
        name: communityProfileSummary?.name || normalizedForcedRepository || "",
      })
      : opportunitiesMessages.header.title;
  const headerDescription = isUserProfileScope
    ? formatTemplate(messages.users.header.profileDescription, {
      handle: userProfileSummary?.handle || normalizedForcedAuthor || "",
    })
    : isCommunityProfileScope
      ? formatTemplate(messages.communities.header.profileDescription, {
        name: communityProfileSummary?.name || normalizedForcedRepository || "",
      })
      : opportunitiesMessages.header.description;
  const profileHeader = React.useMemo<ProfileHeaderData | null>(() => {
    if (isUserProfileScope && userProfileSummary) {
      return buildUserProfileHeader(userProfileSummary, locale, {
        opportunitiesCount: messages.users.list.opportunitiesCount,
        country: messages.users.list.countryLabel,
        region: messages.users.list.regionLabel,
        postedAt: opportunitiesMessages.card.postedAt,
        updatedUnavailable: opportunitiesMessages.status.updatedUnavailable,
      });
    }

    if (isCommunityProfileScope && communityProfileSummary) {
      return buildCommunityProfileHeader(communityProfileSummary, locale, {
        opportunitiesCount: messages.communities.list.opportunitiesCount,
        country: messages.communities.list.countryLabel,
        region: messages.communities.list.regionLabel,
        postedAt: opportunitiesMessages.card.postedAt,
        updatedUnavailable: opportunitiesMessages.status.updatedUnavailable,
      });
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
  const preservedParamsForUrl = React.useMemo(
    () => ({ job: selectedOpportunityId }),
    [selectedOpportunityId],
  );
  useUrlSync({
    pathname,
    router,
    currentSearch: searchParams.toString(),
    filtersForUrl,
    preservedParams: preservedParamsForUrl,
  });
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
    filtersModalOpen,
    setFiltersModalOpen,
    handleFieldChange,
    handleToggleTag,
    handleToggleAuthor,
    handleClearFilters,
    handleLoadMore,
    hasMore,
    selectedOpportunity,
    isDetailsOpen: Boolean(selectedOpportunity),
    selectedOpportunityId,
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
    onCommunitySelect: (repository: string) => {
      setSelectedOpportunityId(null);
      setFilters((previous) =>
        normalizeFilterDependencies(
          {
            ...DEFAULT_FILTERS,
            repository,
            viewMode: previous.viewMode,
          },
          repositoryRegistry.registry,
        ),
      );
    },
    onAuthorSelect: (authorHandle: string) => {
      const normalizedAuthorHandle = normalizeForcedAuthor(authorHandle);

      setSelectedOpportunityId(null);
      setFilters((previous) =>
        normalizeFilterDependencies(
          {
            ...DEFAULT_FILTERS,
            authors: normalizedAuthorHandle ? [normalizedAuthorHandle] : [],
            viewMode: previous.viewMode,
          },
          repositoryRegistry.registry,
        ),
      );
    },
  };
}
