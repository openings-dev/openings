import { REPOSITORIES } from "@/lib/constants/repositories";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50] as const;
export const INITIAL_BATCH_SIZE = 5000;
export const LOAD_MORE_BATCH_SIZE = 5000;
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

export const KNOWN_REPOSITORIES = new Set(
  REPOSITORIES.map((repository) => repository.repository),
);
export const KNOWN_REGIONS = new Set(
  REPOSITORIES.map((repository) => repository.region),
);
export const KNOWN_COUNTRIES = new Set(
  REPOSITORIES.map((repository) => repository.country),
);

function buildRegionsByCountry() {
  const regionsByCountry = new Map<string, Set<string>>();

  for (const repository of REPOSITORIES) {
    const regions = regionsByCountry.get(repository.country) ?? new Set<string>();
    regions.add(repository.region);
    regionsByCountry.set(repository.country, regions);
  }

  return regionsByCountry;
}

export const REGIONS_BY_COUNTRY = buildRegionsByCountry();
