import * as React from "react";
interface UseEnsurePageLoadedParams {
  currentPage: number;
  itemsPerPage: number;
  loadedCount: number;
  totalCount: number;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMoreRemote: boolean;
  nextCursor: string | null;
  loadMoreFromApi: () => Promise<boolean>;
}

export function useEnsurePageLoaded({
  currentPage,
  itemsPerPage,
  loadedCount,
  totalCount,
  isLoading,
  isFetchingMore,
  hasMoreRemote,
  nextCursor,
  loadMoreFromApi,
}: UseEnsurePageLoadedParams) {
  React.useEffect(() => {
    if (isLoading || isFetchingMore) return;
    if (!hasMoreRemote || !nextCursor) return;

    const requiredLoadedCount = Math.min(currentPage * itemsPerPage, totalCount);
    if (loadedCount >= requiredLoadedCount) return;

    void loadMoreFromApi();
  }, [
    currentPage,
    hasMoreRemote,
    isFetchingMore,
    isLoading,
    itemsPerPage,
    loadMoreFromApi,
    loadedCount,
    nextCursor,
    totalCount,
  ]);
}
