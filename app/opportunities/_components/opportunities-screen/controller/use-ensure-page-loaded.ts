import * as React from "react";
import type { Dispatch, SetStateAction } from "react";

interface UseEnsurePageLoadedParams {
  currentPage: number;
  itemsPerPage: number;
  loadedCount: number;
  totalCount: number;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMoreRemote: boolean;
  nextCursor: string | null;
  setIsFetchingMore: Dispatch<SetStateAction<boolean>>;
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
  setIsFetchingMore,
  loadMoreFromApi,
}: UseEnsurePageLoadedParams) {
  const loadLockRef = React.useRef(false);

  React.useEffect(() => {
    if (loadLockRef.current || isLoading || isFetchingMore) return;
    if (!hasMoreRemote || !nextCursor) return;

    const requiredLoadedCount = Math.min(currentPage * itemsPerPage, totalCount);
    if (loadedCount >= requiredLoadedCount) return;

    loadLockRef.current = true;
    setIsFetchingMore(true);

    void loadMoreFromApi().finally(() => {
      setIsFetchingMore(false);
      loadLockRef.current = false;
    });
  }, [
    currentPage,
    hasMoreRemote,
    isFetchingMore,
    isLoading,
    itemsPerPage,
    loadMoreFromApi,
    loadedCount,
    nextCursor,
    setIsFetchingMore,
    totalCount,
  ]);
}
