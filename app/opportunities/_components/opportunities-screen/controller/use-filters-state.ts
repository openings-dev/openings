import * as React from "react";
import { toast } from "sonner";
import { ALL_FILTER_VALUE, DEFAULT_FILTERS } from "./defaults";
import {
  createFilterFieldChangeHandler,
  normalizeFilterDependencies,
} from "./filter-dependencies";
import type { RepositoryFilterRegistry } from "./repository-filter-registry";
import {
  OPPORTUNITY_QUERY_KEYS,
  parseFiltersFromSearchParams,
} from "./url-filters";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseFiltersStateParams {
  searchParamsValue: string;
  forcedRepository: string | null;
  forcedAuthor: string | null;
  registry: RepositoryFilterRegistry | null;
  resetSuccessMessage: string;
}

function resolveFiltersFromParams(params: UseFiltersStateParams) {
  const searchParams = new URLSearchParams(params.searchParamsValue);
  const parsed = parseFiltersFromSearchParams(searchParams);
  if (params.forcedRepository) parsed.repository = params.forcedRepository;
  if (params.forcedAuthor) {
    parsed.authors = [params.forcedAuthor];
  }
  if (
    (params.forcedRepository || params.forcedAuthor) &&
    !searchParams.has(OPPORTUNITY_QUERY_KEYS.country)
  ) {
    parsed.country = ALL_FILTER_VALUE;
  }
  return normalizeFilterDependencies(parsed, params.registry, {
    allowLocationWithRepository: Boolean(params.forcedRepository),
  });
}

function filtersAreEqual(left: OpportunityFiltersState, right: OpportunityFiltersState) {
  return (
    left.repository === right.repository &&
    left.region === right.region &&
    left.country === right.country &&
    left.searchText === right.searchText &&
    left.sortOrder === right.sortOrder &&
    left.itemsPerPage === right.itemsPerPage &&
    left.viewMode === right.viewMode &&
    left.page === right.page &&
    left.tags.length === right.tags.length &&
    left.tags.every((tag, index) => tag === right.tags[index]) &&
    left.authors.length === right.authors.length &&
    left.authors.every((author, index) => author === right.authors[index])
  );
}

export function useFiltersState(params: UseFiltersStateParams) {
  const {
    searchParamsValue,
    forcedRepository,
    forcedAuthor,
    registry,
    resetSuccessMessage,
  } = params;
  const [filters, setFilters] = React.useState<OpportunityFiltersState>(() =>
    resolveFiltersFromParams(params),
  );
  const [appliedSearchParamsValue, setAppliedSearchParamsValue] =
    React.useState(searchParamsValue);
  const isApplyingUrlFilters =
    appliedSearchParamsValue !== searchParamsValue;

  React.useEffect(() => {
    const next = resolveFiltersFromParams({
      searchParamsValue,
      forcedRepository,
      forcedAuthor,
      registry,
      resetSuccessMessage,
    });

    let isCurrent = true;
    queueMicrotask(() => {
      if (!isCurrent) return;
      setAppliedSearchParamsValue(searchParamsValue);
      setFilters((previous) => (filtersAreEqual(previous, next) ? previous : next));
    });

    return () => {
      isCurrent = false;
    };
  }, [forcedAuthor, forcedRepository, registry, resetSuccessMessage, searchParamsValue]);

  const handleFieldChange = React.useMemo(
    () =>
      createFilterFieldChangeHandler({
        forcedRepository,
        forcedAuthor,
        registry,
        setFilters,
      }),
    [forcedAuthor, forcedRepository, registry],
  );

  const handleToggleTag = React.useCallback((tag: string) => {
    setFilters((previous) => ({
      ...previous,
      tags: previous.tags.includes(tag)
        ? previous.tags.filter((entry) => entry !== tag)
        : [...previous.tags, tag],
      page: 1,
    }));
  }, []);

  const handleToggleAuthor = React.useCallback((authorHandle: string) => {
    if (forcedAuthor) return;
    setFilters((previous) => ({
      ...previous,
      authors: previous.authors.includes(authorHandle)
        ? previous.authors.filter((entry) => entry !== authorHandle)
        : [...previous.authors, authorHandle],
      page: 1,
    }));
  }, [forcedAuthor]);

  const handleClearFilters = React.useCallback((options?: { announce?: boolean }) => {
    setFilters((previous) =>
      normalizeFilterDependencies({
        ...DEFAULT_FILTERS,
        repository: forcedRepository ?? DEFAULT_FILTERS.repository,
        country: forcedAuthor || forcedRepository
          ? ALL_FILTER_VALUE
          : DEFAULT_FILTERS.country,
        authors: forcedAuthor ? [forcedAuthor] : [],
        viewMode: previous.viewMode,
      }, registry, {
        allowLocationWithRepository: Boolean(forcedRepository),
      }),
    );
    if (options?.announce !== false) toast.success(resetSuccessMessage);
  }, [forcedAuthor, forcedRepository, registry, resetSuccessMessage]);

  return {
    filters,
    isApplyingUrlFilters,
    setFilters,
    handleFieldChange,
    handleToggleTag,
    handleToggleAuthor,
    handleClearFilters,
  };
}
