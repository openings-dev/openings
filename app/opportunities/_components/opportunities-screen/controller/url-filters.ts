import {
  ALL_FILTER_VALUE,
  DEFAULT_FILTERS,
  ITEMS_PER_PAGE_OPTIONS,
} from "./defaults";
import type {
  OpportunityFiltersState,
  OpportunitySortOrder,
  OpportunityViewMode,
} from "@/app/opportunities/_components/opportunities-screen/types";

function parseSortOrder(value: string | null): OpportunitySortOrder {
  return value === "oldest" ? "oldest" : "recent";
}

function parseViewMode(value: string | null): OpportunityViewMode {
  return value === "grid" ? "grid" : "list";
}

function parseListParam(value: string | null) {
  return (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseItemsPerPage(value: string | null) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return DEFAULT_FILTERS.itemsPerPage;
  return ITEMS_PER_PAGE_OPTIONS.includes(
    parsed as (typeof ITEMS_PER_PAGE_OPTIONS)[number],
  )
    ? parsed
    : DEFAULT_FILTERS.itemsPerPage;
}

function parsePage(value: string | null) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function parseFiltersFromSearchParams(searchParams: URLSearchParams) {
  const repository = searchParams.get("repository") ?? DEFAULT_FILTERS.repository;
  const region = searchParams.get("region") ?? DEFAULT_FILTERS.region;
  const countryFromUrl = searchParams.get("country");
  const shouldFallbackCountryToAll =
    countryFromUrl === null &&
    (repository !== DEFAULT_FILTERS.repository ||
      region !== DEFAULT_FILTERS.region);

  return {
    repository,
    region,
    country: countryFromUrl ??
      (shouldFallbackCountryToAll ? ALL_FILTER_VALUE : DEFAULT_FILTERS.country),
    tags: parseListParam(searchParams.get("tags")),
    authors: parseListParam(searchParams.get("authors")),
    searchText: searchParams.get("search") ?? DEFAULT_FILTERS.searchText,
    sortOrder: parseSortOrder(searchParams.get("sort")),
    itemsPerPage: parseItemsPerPage(searchParams.get("perPage")),
    viewMode: parseViewMode(searchParams.get("view")),
    page: parsePage(searchParams.get("page")),
  } satisfies OpportunityFiltersState;
}

export function buildSearchParamsFromFilters(state: OpportunityFiltersState) {
  const params = new URLSearchParams();
  if (state.repository !== DEFAULT_FILTERS.repository) params.set("repository", state.repository);
  if (state.region !== DEFAULT_FILTERS.region) params.set("region", state.region);
  const countryIsImplicitAll =
    state.country === ALL_FILTER_VALUE &&
    (state.repository !== DEFAULT_FILTERS.repository ||
      state.region !== DEFAULT_FILTERS.region);
  if (state.country !== DEFAULT_FILTERS.country && !countryIsImplicitAll) {
    params.set("country", state.country);
  }
  if (state.tags.length > 0) params.set("tags", state.tags.join(","));
  if (state.authors.length > 0) params.set("authors", state.authors.join(","));
  if (state.searchText.trim()) params.set("search", state.searchText.trim());
  if (state.sortOrder !== DEFAULT_FILTERS.sortOrder) params.set("sort", state.sortOrder);
  if (state.itemsPerPage !== DEFAULT_FILTERS.itemsPerPage) {
    params.set("perPage", String(state.itemsPerPage));
  }
  if (state.viewMode !== DEFAULT_FILTERS.viewMode) params.set("view", state.viewMode);
  if (state.page !== DEFAULT_FILTERS.page) params.set("page", String(state.page));
  return params;
}
