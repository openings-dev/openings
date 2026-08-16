import {
  ALL_FILTER_VALUE,
  DEFAULT_FILTERS,
  ITEMS_PER_PAGE_OPTIONS,
} from "./defaults";
import {
  OpportunitySortOrder,
  OpportunityViewMode,
  type OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

export const OPPORTUNITY_QUERY_KEYS = {
  repository: "repository",
  region: "region",
  country: "country",
  tags: "tags",
  authors: "authors",
  searchText: "search",
  sortOrder: "sort",
  itemsPerPage: "perPage",
  viewMode: "view",
  page: "page",
  selectedOpportunity: "job",
} as const;

function parseSortOrder(value: string | null): OpportunitySortOrder {
  return value === OpportunitySortOrder.Oldest
    ? OpportunitySortOrder.Oldest
    : OpportunitySortOrder.Recent;
}

function parseViewMode(value: string | null): OpportunityViewMode {
  return value === OpportunityViewMode.Grid
    ? OpportunityViewMode.Grid
    : OpportunityViewMode.List;
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
  const repository = searchParams.get(OPPORTUNITY_QUERY_KEYS.repository) ?? DEFAULT_FILTERS.repository;
  const region = searchParams.get(OPPORTUNITY_QUERY_KEYS.region) ?? DEFAULT_FILTERS.region;
  const countryFromUrl = searchParams.get(OPPORTUNITY_QUERY_KEYS.country);
  const shouldFallbackCountryToAll =
    countryFromUrl === null &&
    (repository !== DEFAULT_FILTERS.repository ||
      region !== DEFAULT_FILTERS.region);

  return {
    repository,
    region,
    country: countryFromUrl ??
      (shouldFallbackCountryToAll ? ALL_FILTER_VALUE : DEFAULT_FILTERS.country),
    tags: parseListParam(searchParams.get(OPPORTUNITY_QUERY_KEYS.tags)),
    authors: parseListParam(searchParams.get(OPPORTUNITY_QUERY_KEYS.authors)),
    searchText: searchParams.get(OPPORTUNITY_QUERY_KEYS.searchText) ?? DEFAULT_FILTERS.searchText,
    sortOrder: parseSortOrder(searchParams.get(OPPORTUNITY_QUERY_KEYS.sortOrder)),
    itemsPerPage: parseItemsPerPage(searchParams.get(OPPORTUNITY_QUERY_KEYS.itemsPerPage)),
    viewMode: parseViewMode(searchParams.get(OPPORTUNITY_QUERY_KEYS.viewMode)),
    page: parsePage(searchParams.get(OPPORTUNITY_QUERY_KEYS.page)),
  } satisfies OpportunityFiltersState;
}

export function buildSearchParamsFromFilters(state: OpportunityFiltersState) {
  const params = new URLSearchParams();
  if (state.repository !== DEFAULT_FILTERS.repository) params.set(OPPORTUNITY_QUERY_KEYS.repository, state.repository);
  if (state.region !== DEFAULT_FILTERS.region) params.set(OPPORTUNITY_QUERY_KEYS.region, state.region);
  const countryIsImplicitAll =
    state.country === ALL_FILTER_VALUE &&
    (state.repository !== DEFAULT_FILTERS.repository ||
      state.region !== DEFAULT_FILTERS.region);
  if (state.country !== DEFAULT_FILTERS.country && !countryIsImplicitAll) {
    params.set(OPPORTUNITY_QUERY_KEYS.country, state.country);
  }
  if (state.tags.length > 0) params.set(OPPORTUNITY_QUERY_KEYS.tags, state.tags.join(","));
  if (state.authors.length > 0) params.set(OPPORTUNITY_QUERY_KEYS.authors, state.authors.join(","));
  if (state.searchText.trim()) params.set(OPPORTUNITY_QUERY_KEYS.searchText, state.searchText.trim());
  if (state.sortOrder !== DEFAULT_FILTERS.sortOrder) params.set(OPPORTUNITY_QUERY_KEYS.sortOrder, state.sortOrder);
  if (state.itemsPerPage !== DEFAULT_FILTERS.itemsPerPage) {
    params.set(OPPORTUNITY_QUERY_KEYS.itemsPerPage, String(state.itemsPerPage));
  }
  if (state.viewMode !== DEFAULT_FILTERS.viewMode) params.set(OPPORTUNITY_QUERY_KEYS.viewMode, state.viewMode);
  if (state.page !== DEFAULT_FILTERS.page) params.set(OPPORTUNITY_QUERY_KEYS.page, String(state.page));
  return params;
}
