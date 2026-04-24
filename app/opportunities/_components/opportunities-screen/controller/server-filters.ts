import {
  ALL_FILTER_VALUE,
  DEFAULT_FILTERS,
} from "./defaults";
import { normalizeFilterDependencies } from "./filter-dependencies";
import type { RepositoryFilterRegistry } from "./repository-filter-registry";
import { canonicalTagValue } from "./tag-normalization";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

export type OpportunityServerFilters = Pick<
  OpportunityFiltersState,
  | "repository"
  | "region"
  | "country"
  | "sortOrder"
  | "searchText"
  | "tags"
  | "authors"
>;

function uniqueValues(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function buildServerFilters(
  filters: Pick<
    OpportunityFiltersState,
    | "repository"
    | "region"
    | "country"
    | "sortOrder"
    | "searchText"
    | "tags"
    | "authors"
  >,
  forcedRepository: string | null,
  forcedAuthor: string | null,
  registry: RepositoryFilterRegistry | null,
): OpportunityServerFilters {
  return normalizeFilterDependencies({
    repository: forcedRepository ??
      (filters.repository === ALL_FILTER_VALUE ||
        !registry ||
        registry.repositories.has(filters.repository)
        ? filters.repository
        : DEFAULT_FILTERS.repository),
    region:
      filters.region === ALL_FILTER_VALUE ||
        !registry ||
        registry.regions.has(filters.region)
        ? filters.region
        : ALL_FILTER_VALUE,
    country: filters.country === ALL_FILTER_VALUE ||
      !registry ||
      registry.countries.has(filters.country)
      ? filters.country
      : ALL_FILTER_VALUE,
    sortOrder: filters.sortOrder,
    searchText: filters.searchText.trim(),
    tags: [...new Set(filters.tags.map((tag) => canonicalTagValue(tag)).filter(Boolean))],
    authors: forcedAuthor ? [forcedAuthor] : uniqueValues(filters.authors),
  }, registry);
}
