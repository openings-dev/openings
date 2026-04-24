import {
  ALL_FILTER_VALUE,
  DEFAULT_FILTERS,
  KNOWN_COUNTRIES,
  KNOWN_REGIONS,
  KNOWN_REPOSITORIES,
} from "./defaults";
import { normalizeFilterDependencies } from "./filter-dependencies";
import { canonicalTagValue } from "./tag-normalization";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

function uniqueValues(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function normalizeFilters(
  filters: OpportunityFiltersState,
  forcedRepository: string | null,
  forcedAuthor: string | null,
) {
  const normalizedTags = [...new Set(filters.tags.map((tag) => canonicalTagValue(tag)).filter(Boolean))];
  const locationFilters = normalizeFilterDependencies({
    repository: forcedRepository ??
      (filters.repository === ALL_FILTER_VALUE || KNOWN_REPOSITORIES.has(filters.repository)
        ? filters.repository
        : DEFAULT_FILTERS.repository),
    region:
      filters.region === ALL_FILTER_VALUE || KNOWN_REGIONS.has(filters.region)
        ? filters.region
        : ALL_FILTER_VALUE,
    country:
      filters.country === ALL_FILTER_VALUE || KNOWN_COUNTRIES.has(filters.country)
        ? filters.country
        : ALL_FILTER_VALUE,
  });

  return {
    ...filters,
    ...locationFilters,
    tags: normalizedTags,
    authors: forcedAuthor ? [forcedAuthor] : uniqueValues(filters.authors),
  };
}
