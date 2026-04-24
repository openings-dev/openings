import * as React from "react";
import { toast } from "sonner";
import { DEFAULT_FILTERS } from "./defaults";
import {
  createFilterFieldChangeHandler,
  normalizeFilterDependencies,
} from "./filter-dependencies";
import { parseFiltersFromSearchParams } from "./url-filters";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseFiltersStateParams {
  searchParamsValue: string;
  forcedRepository: string | null;
  forcedAuthor: string | null;
  resetSuccessMessage: string;
}

function resolveFiltersFromParams(params: UseFiltersStateParams) {
  const parsed = parseFiltersFromSearchParams(new URLSearchParams(params.searchParamsValue));
  if (params.forcedRepository) parsed.repository = params.forcedRepository;
  if (params.forcedAuthor) parsed.authors = [params.forcedAuthor];
  return normalizeFilterDependencies(parsed);
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
    resetSuccessMessage,
  } = params;
  const [filters, setFilters] = React.useState<OpportunityFiltersState>(() =>
    resolveFiltersFromParams(params),
  );

  React.useEffect(() => {
    const next = resolveFiltersFromParams({
      searchParamsValue,
      forcedRepository,
      forcedAuthor,
      resetSuccessMessage,
    });

    let isCurrent = true;
    queueMicrotask(() => {
      if (!isCurrent) return;
      setFilters((previous) => (filtersAreEqual(previous, next) ? previous : next));
    });

    return () => {
      isCurrent = false;
    };
  }, [forcedAuthor, forcedRepository, resetSuccessMessage, searchParamsValue]);

  const handleFieldChange = React.useMemo(
    () =>
      createFilterFieldChangeHandler({
        forcedRepository,
        forcedAuthor,
        setFilters,
      }),
    [forcedAuthor, forcedRepository],
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

  const handleClearFilters = React.useCallback(() => {
    setFilters((previous) =>
      normalizeFilterDependencies({
        ...DEFAULT_FILTERS,
        repository: forcedRepository ?? DEFAULT_FILTERS.repository,
        authors: forcedAuthor ? [forcedAuthor] : [],
        viewMode: previous.viewMode,
      }),
    );
    toast.success(resetSuccessMessage);
  }, [forcedAuthor, forcedRepository, resetSuccessMessage]);

  return {
    filters,
    setFilters,
    handleFieldChange,
    handleToggleTag,
    handleToggleAuthor,
    handleClearFilters,
  };
}
