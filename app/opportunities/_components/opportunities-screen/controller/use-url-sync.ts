import * as React from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { buildSearchParamsFromFilters } from "./url-filters";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseUrlSyncParams {
  pathname: string;
  currentSearch: string;
  router: AppRouterInstance;
  filtersForUrl: OpportunityFiltersState;
}

function normalizeSearchValue(value: string) {
  const entries = [...new URLSearchParams(value).entries()].sort(
    ([leftKey, leftValue], [rightKey, rightValue]) =>
      leftKey === rightKey
        ? leftValue.localeCompare(rightValue)
        : leftKey.localeCompare(rightKey),
  );
  const normalized = new URLSearchParams();

  for (const [key, entryValue] of entries) {
    normalized.append(key, entryValue);
  }

  return normalized.toString();
}

export function useUrlSync({
  pathname,
  currentSearch,
  router,
  filtersForUrl,
}: UseUrlSyncParams) {
  const serializedFilters = React.useMemo(
    () => buildSearchParamsFromFilters(filtersForUrl).toString(),
    [filtersForUrl],
  );
  const normalizedCurrentSearch = React.useMemo(
    () => normalizeSearchValue(currentSearch),
    [currentSearch],
  );
  const normalizedSerializedFilters = React.useMemo(
    () => normalizeSearchValue(serializedFilters),
    [serializedFilters],
  );
  const pendingReplaceRef = React.useRef<{
    href: string;
    currentSearch: string;
  } | null>(null);

  React.useEffect(() => {
    if (normalizedSerializedFilters === normalizedCurrentSearch) {
      pendingReplaceRef.current = null;
      return;
    }

    const href = serializedFilters ? `${pathname}?${serializedFilters}` : pathname;
    const pendingReplace = pendingReplaceRef.current;

    if (
      pendingReplace?.href === href &&
      pendingReplace.currentSearch === currentSearch
    ) {
      return;
    }

    pendingReplaceRef.current = { href, currentSearch };
    router.replace(href, { scroll: false });
  }, [
    currentSearch,
    normalizedCurrentSearch,
    normalizedSerializedFilters,
    pathname,
    router,
    serializedFilters,
  ]);
}
