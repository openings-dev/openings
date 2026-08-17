import * as React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseLoadMoreHandlerParams {
  currentPage: number;
  totalPages: number;
  loadedCount: number;
  totalCount: number;
  itemsPerPage: number;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMoreRemote: boolean;
  nextCursor: string | null;
  setFilters: Dispatch<SetStateAction<OpportunityFiltersState>>;
  loadMoreFromApi: () => Promise<boolean>;
}

export function useLoadMoreHandler(params: UseLoadMoreHandlerParams) {
  const {
    currentPage,
    totalPages,
    loadedCount,
    totalCount,
    itemsPerPage,
    isLoading,
    isFetchingMore,
    hasMoreRemote,
    nextCursor,
    setFilters,
    loadMoreFromApi,
  } = params;
  const loadLockRef = React.useRef(false);

  return React.useCallback(async () => {
    if (loadLockRef.current || isLoading || isFetchingMore) return;

    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const requiredLoadedCount = Math.min(nextPage * itemsPerPage, totalCount);

      if (loadedCount >= requiredLoadedCount || !hasMoreRemote || !nextCursor) {
        setFilters((previous) => ({
          ...previous,
          page: Math.min(previous.page + 1, totalPages),
        }));
        return;
      }

      loadLockRef.current = true;
      try {
        const hasNewItems = await loadMoreFromApi();

        if (hasNewItems) {
          setFilters((previous) => ({
            ...previous,
            page: Math.min(previous.page + 1, totalPages),
          }));
        }
      } finally {
        loadLockRef.current = false;
      }
      return;
    }

    if (!hasMoreRemote || !nextCursor) return;

    loadLockRef.current = true;
    try {
      const hasNewItems = await loadMoreFromApi();

      if (hasNewItems) {
        setFilters((previous) => ({ ...previous, page: previous.page + 1 }));
      }
    } finally {
      loadLockRef.current = false;
    }
  }, [
    currentPage,
    hasMoreRemote,
    itemsPerPage,
    loadedCount,
    isFetchingMore,
    isLoading,
    loadMoreFromApi,
    nextCursor,
    setFilters,
    totalCount,
    totalPages,
  ]);
}
