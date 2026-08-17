import {
  OpportunitySortOrder,
  type ActiveOpportunityFilter,
  type OnFilterFieldChange,
  type OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { ALL_FILTER_VALUE, DEFAULT_FILTERS } from "./defaults";
import { classifyOpportunityTag, OpportunityTagCategory } from "./tag-categories";

function defaultCountry(
  forcedRepository: string | null,
  forcedAuthor: string | null,
) {
  return forcedRepository || forcedAuthor
    ? ALL_FILTER_VALUE
    : DEFAULT_FILTERS.country;
}

export function getActiveOpportunityFilters(
  filters: OpportunityFiltersState,
  forcedRepository: string | null,
  forcedAuthor: string | null,
): ActiveOpportunityFilter[] {
  const items: ActiveOpportunityFilter[] = [];
  const searchText = filters.searchText.trim();

  if (searchText) {
    items.push({
      id: "search",
      kind: "search",
      label: searchText,
      value: filters.searchText,
      resetValue: "",
    });
  }

  if (!forcedRepository && filters.repository !== DEFAULT_FILTERS.repository) {
    items.push({
      id: `repository:${filters.repository}`,
      kind: "repository",
      label: filters.repository,
      value: filters.repository,
      resetValue: DEFAULT_FILTERS.repository,
    });
  }

  if (filters.region !== DEFAULT_FILTERS.region) {
    items.push({
      id: `region:${filters.region}`,
      kind: "region",
      label: filters.region,
      value: filters.region,
      resetValue: DEFAULT_FILTERS.region,
    });
  }

  const countryResetValue = defaultCountry(forcedRepository, forcedAuthor);
  const countryIsImplicitAll =
    filters.country === ALL_FILTER_VALUE &&
    (Boolean(forcedRepository) ||
      Boolean(forcedAuthor) ||
      filters.repository !== DEFAULT_FILTERS.repository ||
      filters.region !== DEFAULT_FILTERS.region);
  if (filters.country !== countryResetValue && !countryIsImplicitAll) {
    items.push({
      id: `country:${filters.country}`,
      kind: "country",
      label: filters.country,
      value: filters.country,
      resetValue: countryResetValue,
    });
  }

  for (const tag of filters.tags) {
    const category = classifyOpportunityTag(tag).category;
    items.push({
      id: `tag:${tag}`,
      kind: category === OpportunityTagCategory.Stack ? "stack" : "advanced-tag",
      label: tag,
      value: tag,
    });
  }

  if (!forcedAuthor) {
    for (const author of filters.authors) {
      items.push({
        id: `author:${author}`,
        kind: "author",
        label: author,
        value: author,
      });
    }
  }

  if (filters.sortOrder !== DEFAULT_FILTERS.sortOrder) {
    items.push({
      id: `sort:${filters.sortOrder}`,
      kind: "sort",
      label: filters.sortOrder,
      value: filters.sortOrder,
      resetValue: DEFAULT_FILTERS.sortOrder,
    });
  }

  if (filters.itemsPerPage !== DEFAULT_FILTERS.itemsPerPage) {
    items.push({
      id: `items-per-page:${filters.itemsPerPage}`,
      kind: "items-per-page",
      label: String(filters.itemsPerPage),
      value: String(filters.itemsPerPage),
      resetValue: String(DEFAULT_FILTERS.itemsPerPage),
    });
  }

  return items;
}

export function getActiveFiltersCount(
  filters: OpportunityFiltersState,
  forcedRepository: string | null,
  forcedAuthor: string | null,
) {
  return getActiveOpportunityFilters(
    filters,
    forcedRepository,
    forcedAuthor,
  ).length;
}

export function removeActiveOpportunityFilter(
  item: ActiveOpportunityFilter,
  filters: OpportunityFiltersState,
  onFieldChange: OnFilterFieldChange,
) {
  switch (item.kind) {
    case "search":
      onFieldChange("searchText", "");
      return;
    case "repository":
      onFieldChange("repository", item.resetValue ?? ALL_FILTER_VALUE);
      return;
    case "region":
      onFieldChange("region", item.resetValue ?? ALL_FILTER_VALUE);
      return;
    case "country":
      onFieldChange("country", item.resetValue ?? DEFAULT_FILTERS.country);
      return;
    case "stack":
    case "advanced-tag":
      onFieldChange("tags", filters.tags.filter((tag) => tag !== item.value));
      return;
    case "author":
      onFieldChange(
        "authors",
        filters.authors.filter((author) => author !== item.value),
      );
      return;
    case "sort":
      onFieldChange(
        "sortOrder",
        (item.resetValue ?? OpportunitySortOrder.Recent) as OpportunitySortOrder,
      );
      return;
    case "items-per-page":
      onFieldChange(
        "itemsPerPage",
        Number(item.resetValue ?? DEFAULT_FILTERS.itemsPerPage),
      );
  }
}
