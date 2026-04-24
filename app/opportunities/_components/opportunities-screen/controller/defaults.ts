import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50] as const;
export const INITIAL_BATCH_SIZE = 20;
export const LOAD_MORE_BATCH_SIZE = 20;
export const ALL_FILTER_VALUE = "all";

export const DEFAULT_FILTERS: OpportunityFiltersState = {
  repository: ALL_FILTER_VALUE,
  region: ALL_FILTER_VALUE,
  country: "Brazil",
  tags: [],
  authors: [],
  searchText: "",
  sortOrder: "recent",
  itemsPerPage: 20,
  viewMode: "list",
  page: 1,
};
