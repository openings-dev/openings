import type {
  OpportunityDimensionKey,
  OpportunityFacetIndexDimensions,
  OpportunityServerFilters,
  StaticSearchIndex,
} from "./api-types";

export function parseOpportunityOffset(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function uniqueOpportunityIds(ids: string[]) {
  return [...new Set(ids)];
}

export function normalizeOpportunitySearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildOpportunitySearchHits(
  searchIndex: StaticSearchIndex,
  searchText: string,
) {
  const query = normalizeOpportunitySearchText(searchText);
  if (!query) return null;

  return new Set(
    searchIndex.items
      .filter((entry) => entry.text.includes(query))
      .map((entry) => entry.id),
  );
}

export function selectedOpportunityDimensionIds(
  dimensions: OpportunityFacetIndexDimensions,
  filters: OpportunityServerFilters,
  key: OpportunityDimensionKey,
) {
  if (key === "repositories" && filters.repository !== "all") {
    return dimensions.repositories[filters.repository] ?? [];
  }
  if (key === "regions" && filters.region !== "all") {
    return dimensions.regions[filters.region] ?? [];
  }
  if (key === "countries" && filters.country !== "all") {
    return dimensions.countries[filters.country] ?? [];
  }
  if (key === "tags" && filters.tags.length > 0) {
    return uniqueOpportunityIds(
      filters.tags.flatMap((value) => dimensions.tags[value] ?? []),
    );
  }
  if (key === "authors" && filters.authors.length > 0) {
    return uniqueOpportunityIds(
      filters.authors.flatMap((value) => dimensions.authors[value] ?? []),
    );
  }
  return null;
}

export function countOpportunityDimension(
  ids: string[],
  dimension: Record<string, string[]>,
) {
  const base = new Set(ids);
  const counts: Record<string, number> = {};
  for (const [value, optionIds] of Object.entries(dimension)) {
    const count = optionIds.reduce(
      (total, id) => total + (base.has(id) ? 1 : 0),
      0,
    );
    if (count > 0) counts[value] = count;
  }
  return counts;
}
