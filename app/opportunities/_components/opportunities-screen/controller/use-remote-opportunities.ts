import * as React from "react";
import { toast } from "sonner";
import { fetchOpportunitiesPage } from "./api";
import { dedupeOpportunities, matchesSearch } from "./filtering";
import { INITIAL_BATCH_SIZE, LOAD_MORE_BATCH_SIZE } from "./defaults";
import { canonicalTagValue } from "./tag-normalization";
import type {
  OpportunityFilterFacets,
  OpportunityItem,
} from "@/app/opportunities/_components/opportunities-screen/types";
import type { OpportunityServerFilters } from "./server-filters";

interface UseRemoteOpportunitiesParams {
  serverFilters: OpportunityServerFilters;
  messages: { loadError: string; rateLimited: string; loadMoreError: string };
  onBeforeReload: () => void;
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
    item.issueState === "open" &&
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
  messages,
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
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const fetchAbortRef = React.useRef<AbortController | null>(null);
  const inFlightCursorRef = React.useRef<string | null>(null);
  const exhaustedCursorsRef = React.useRef(new Set<string>());
  const previousFiltersKeyRef = React.useRef<string | null>(null);
  const serverFiltersKey = React.useMemo(
    () => JSON.stringify(serverFilters),
    [serverFilters],
  );

  React.useEffect(() => {
    const controller = new AbortController();
    const previousFiltersKey = previousFiltersKeyRef.current;
    const shouldRunBeforeReload =
      previousFiltersKey !== null && previousFiltersKey !== serverFiltersKey;

    previousFiltersKeyRef.current = serverFiltersKey;
    fetchAbortRef.current?.abort();
    fetchAbortRef.current = controller;

    queueMicrotask(() => {
      if (controller.signal.aborted) return;
      setIsLoading(true);
      setIsFetchingMore(false);
      setHasMoreRemote(true);
      setNextCursor(null);
      setOpportunities([]);
      setFacetCounts(null);
      setFilteredCount(null);
      setTotalCount(null);
      setSnapshotGeneratedAt(null);
      setLastUpdatedAt(null);
      inFlightCursorRef.current = null;
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
        setNextCursor(payload.rateLimited ? null : payload.nextCursor);
        setHasMoreRemote(payload.rateLimited ? false : payload.hasMore);
        if (payload.rateLimited) toast.error(messages.rateLimited);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setHasMoreRemote(false);
        toast.error(messages.loadError);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [messages.loadError, messages.rateLimited, onBeforeReload, serverFilters, serverFiltersKey]);

  const loadMoreFromApi = React.useCallback(async () => {
    if (!nextCursor || !hasMoreRemote) return false;
    const requestedCursor = nextCursor;
    if (inFlightCursorRef.current === requestedCursor) return false;
    if (exhaustedCursorsRef.current.has(requestedCursor)) return false;

    inFlightCursorRef.current = requestedCursor;

    try {
      const payload = await fetchOpportunitiesPage(serverFilters, {
        cursor: requestedCursor,
        limit: LOAD_MORE_BATCH_SIZE,
      });
      let hasNewItems = false;
      setOpportunities((previous) => {
        const merged = dedupeOpportunities([...previous, ...payload.items]);
        hasNewItems = merged.length > previous.length;
        return merged;
      });
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
      const canContinue = !payload.rateLimited &&
        payload.hasMore &&
        Boolean(nextCursorValue) &&
        !stalledCursor;
      setNextCursor(canContinue ? nextCursorValue : null);
      setHasMoreRemote(canContinue);
      if (!canContinue) exhaustedCursorsRef.current.add(requestedCursor);
      if (payload.rateLimited) toast.error(messages.rateLimited);
      return hasNewItems;
    } catch (error) {
      console.error(error);
      setHasMoreRemote(false);
      exhaustedCursorsRef.current.add(requestedCursor);
      toast.error(messages.loadMoreError);
      return false;
    } finally {
      if (inFlightCursorRef.current === requestedCursor) {
        inFlightCursorRef.current = null;
      }
    }
  }, [hasMoreRemote, messages.loadMoreError, messages.rateLimited, nextCursor, serverFilters]);

  return {
    opportunities,
    facetCounts,
    filteredCount,
    totalCount,
    snapshotGeneratedAt,
    lastUpdatedAt,
    nextCursor,
    hasMoreRemote,
    isLoading,
    isFetchingMore,
    setIsFetchingMore,
    loadMoreFromApi,
  };
}
