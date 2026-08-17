import * as React from "react";
import {
  fetchOpportunitiesPage,
  type OpportunityServerFilters,
} from "@/lib/opportunities/api";
import { dedupeOpportunities, matchesSearch } from "./filtering";
import { INITIAL_BATCH_SIZE, LOAD_MORE_BATCH_SIZE } from "./defaults";
import { canonicalTagValue } from "./tag-normalization";
import {
  OpportunityIssueState,
  type OpportunityFilterFacets,
  type OpportunityItem,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface UseRemoteOpportunitiesParams {
  serverFilters: OpportunityServerFilters;
  enabled: boolean;
  onBeforeReload: () => void;
}

interface InFlightLoadMoreRequest {
  id: number;
  cursor: string;
  filtersKey: string;
  controller: AbortController;
}

function itemMatchesServerFilters(
  item: OpportunityItem,
  filters: OpportunityServerFilters,
) {
  const selectedTags = filters.tags.length > 0 ? new Set(filters.tags) : null;
  const selectedAuthors = filters.authors.length > 0 ? new Set(filters.authors) : null;
  const matchesRepository = filters.repository === "all" || item.repository === filters.repository;
  const matchesRegion = filters.region === "all" || item.region === filters.region;
  const matchesCountry = filters.country === "all" || item.country === filters.country;
  const matchesTags =
    !selectedTags ||
    item.tags.some((tag) => selectedTags.has(canonicalTagValue(tag)));
  const matchesAuthors = !selectedAuthors || selectedAuthors.has(item.author.handle);

  return (
    item.issueState === OpportunityIssueState.Open &&
    matchesRepository &&
    matchesRegion &&
    matchesCountry &&
    matchesTags &&
    matchesAuthors &&
    matchesSearch(item, filters.searchText)
  );
}

function resolveRemoteFilteredCount(
  items: OpportunityItem[],
  filters: OpportunityServerFilters,
  filteredCount: number,
) {
  return items.every((item) => itemMatchesServerFilters(item, filters))
    ? filteredCount
    : null;
}

export function useRemoteOpportunities({
  serverFilters,
  enabled,
  onBeforeReload,
}: UseRemoteOpportunitiesParams) {
  const [opportunities, setOpportunities] = React.useState<OpportunityItem[]>([]);
  const [facetCounts, setFacetCounts] = React.useState<OpportunityFilterFacets | null>(null);
  const [filteredCount, setFilteredCount] = React.useState<number | null>(null);
  const [totalCount, setTotalCount] = React.useState<number | null>(null);
  const [snapshotGeneratedAt, setSnapshotGeneratedAt] = React.useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string | null>(null);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [hasMoreRemote, setHasMoreRemote] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [settledFiltersKey, setSettledFiltersKey] = React.useState<string | null>(null);
  const [failedFiltersKey, setFailedFiltersKey] = React.useState<string | null>(null);
  const [hasLoadMoreError, setHasLoadMoreError] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const opportunitiesRef = React.useRef<OpportunityItem[]>([]);
  const fetchAbortRef = React.useRef<AbortController | null>(null);
  const loadMoreRequestRef = React.useRef<InFlightLoadMoreRequest | null>(null);
  const loadMoreRequestSequenceRef = React.useRef(0);
  const exhaustedCursorsRef = React.useRef(new Set<string>());
  const previousFiltersKeyRef = React.useRef<string | null>(null);
  const activeFiltersKeyRef = React.useRef<string | null>(null);
  const serverFiltersKey = React.useMemo(
    () => JSON.stringify(serverFilters),
    [serverFilters],
  );

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();
    const previousFiltersKey = previousFiltersKeyRef.current;
    const shouldRunBeforeReload =
      previousFiltersKey !== null && previousFiltersKey !== serverFiltersKey;

    previousFiltersKeyRef.current = serverFiltersKey;
    activeFiltersKeyRef.current = serverFiltersKey;
    fetchAbortRef.current?.abort();
    fetchAbortRef.current = controller;
    loadMoreRequestRef.current?.controller.abort();
    loadMoreRequestRef.current = null;

    queueMicrotask(() => {
      if (controller.signal.aborted) return;
      setIsLoading(true);
      setIsFetchingMore(false);
      setHasLoadMoreError(false);
      setHasMoreRemote(true);
      setNextCursor(null);
      opportunitiesRef.current = [];
      setOpportunities([]);
      setFacetCounts(null);
      setFilteredCount(null);
      setTotalCount(null);
      setSnapshotGeneratedAt(null);
      setLastUpdatedAt(null);
      exhaustedCursorsRef.current.clear();

      if (shouldRunBeforeReload) {
        onBeforeReload();
      }
    });

    fetchOpportunitiesPage(serverFilters, {
      cursor: null,
      limit: INITIAL_BATCH_SIZE,
      signal: controller.signal,
    })
      .then((payload) => {
        if (controller.signal.aborted) return;
        opportunitiesRef.current = payload.items;
        setOpportunities(payload.items);
        setFacetCounts(payload.meta.facets);
        setFilteredCount(
          resolveRemoteFilteredCount(
            payload.items,
            serverFilters,
            payload.meta.filteredCount,
          ),
        );
        setTotalCount(payload.meta.totalCount);
        setSnapshotGeneratedAt(payload.meta.snapshotGeneratedAt);
        setLastUpdatedAt(payload.meta.lastUpdatedAt);
        const missingNextCursor = payload.hasMore && !payload.nextCursor;
        const hasPartialLoadError = payload.rateLimited || missingNextCursor;
        setNextCursor(hasPartialLoadError ? null : payload.nextCursor);
        setHasMoreRemote(hasPartialLoadError ? false : payload.hasMore);
        setHasLoadMoreError(hasPartialLoadError);
        setFailedFiltersKey(null);
        setSettledFiltersKey(serverFiltersKey);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setHasMoreRemote(false);
        setFailedFiltersKey(serverFiltersKey);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [
    enabled,
    onBeforeReload,
    serverFilters,
    serverFiltersKey,
  ]);

  const loadMoreFromApi = React.useCallback(async () => {
    if (!nextCursor || !hasMoreRemote) return false;
    const requestedCursor = nextCursor;
    if (loadMoreRequestRef.current) return false;
    if (exhaustedCursorsRef.current.has(requestedCursor)) return false;

    const requestFiltersKey = serverFiltersKey;
    const controller = new AbortController();
    const request: InFlightLoadMoreRequest = {
      id: ++loadMoreRequestSequenceRef.current,
      cursor: requestedCursor,
      filtersKey: requestFiltersKey,
      controller,
    };
    loadMoreRequestRef.current = request;
    setIsFetchingMore(true);

    try {
      const payload = await fetchOpportunitiesPage(serverFilters, {
        cursor: requestedCursor,
        limit: LOAD_MORE_BATCH_SIZE,
        signal: controller.signal,
      });
      if (
        controller.signal.aborted ||
        activeFiltersKeyRef.current !== requestFiltersKey
      ) return false;
      const previous = opportunitiesRef.current;
      const merged = dedupeOpportunities([...previous, ...payload.items]);
      const hasNewItems = merged.length > previous.length;
      opportunitiesRef.current = merged;
      setOpportunities(merged);
      setFacetCounts(payload.meta.facets);
      setFilteredCount(
        resolveRemoteFilteredCount(
          payload.items,
          serverFilters,
          payload.meta.filteredCount,
        ),
      );
      setTotalCount(payload.meta.totalCount);
      setSnapshotGeneratedAt(payload.meta.snapshotGeneratedAt);
      setLastUpdatedAt(payload.meta.lastUpdatedAt);
      const nextCursorValue = payload.rateLimited ? null : payload.nextCursor;
      const stalledCursor = nextCursorValue !== null && nextCursorValue === requestedCursor;
      const missingNextCursor = payload.hasMore && !nextCursorValue;
      const hasPartialLoadError =
        payload.rateLimited || stalledCursor || missingNextCursor;
      const canContinue = !payload.rateLimited &&
        payload.hasMore &&
        Boolean(nextCursorValue) &&
        !stalledCursor;
      setNextCursor(canContinue ? nextCursorValue : null);
      setHasMoreRemote(canContinue);
      setHasLoadMoreError(hasPartialLoadError);
      if (!canContinue && !hasPartialLoadError) {
        exhaustedCursorsRef.current.add(requestedCursor);
      }
      return hasNewItems;
    } catch {
      if (
        controller.signal.aborted ||
        activeFiltersKeyRef.current !== requestFiltersKey
      ) return false;
      setHasMoreRemote(false);
      setNextCursor(null);
      setHasLoadMoreError(true);
      return false;
    } finally {
      if (loadMoreRequestRef.current?.id === request.id) {
        loadMoreRequestRef.current = null;
        setIsFetchingMore(false);
      }
    }
  }, [
    hasMoreRemote,
    nextCursor,
    serverFilters,
    serverFiltersKey,
  ]);

  return {
    opportunities,
    facetCounts,
    filteredCount,
    totalCount,
    snapshotGeneratedAt,
    lastUpdatedAt,
    nextCursor,
    hasMoreRemote,
    isLoading:
      !enabled ||
      (settledFiltersKey !== serverFiltersKey &&
        failedFiltersKey !== serverFiltersKey) ||
      isLoading,
    hasLoadError: failedFiltersKey === serverFiltersKey,
    hasLoadMoreError,
    isFetchingMore,
    loadMoreFromApi,
  };
}
