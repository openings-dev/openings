import {
  ALL_FILTER_VALUE,
  type LocationFilterOption,
  type LocationFilterState,
  type LocationScopedItem,
  type PreferredLocation,
} from "./types";

function buildOptions<TItem extends LocationScopedItem>(
  items: TItem[],
  key: "region" | "country",
) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const value = item[key];
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([value, count]) => ({ value, count } satisfies LocationFilterOption));
}

function hasCountry<TItem extends LocationScopedItem>(items: TItem[], country: string) {
  return items.some((item) => item.country === country);
}

function hasRegion<TItem extends LocationScopedItem>(items: TItem[], region: string) {
  return items.some((item) => item.region === region);
}

function hasCountryWithinRegion<TItem extends LocationScopedItem>(
  items: TItem[],
  country: string,
  region: string,
) {
  return items.some((item) => item.country === country && item.region === region);
}

export function buildRegionOptions<TItem extends LocationScopedItem>(items: TItem[]) {
  return buildOptions(items, "region");
}

export function buildCountryOptions<TItem extends LocationScopedItem>(
  items: TItem[],
  region: string,
) {
  const scoped = region === ALL_FILTER_VALUE
    ? items
    : items.filter((item) => item.region === region);
  return buildOptions(scoped, "country");
}

export function filterByLocation<TItem extends LocationScopedItem>(
  items: TItem[],
  filters: LocationFilterState,
) {
  return items.filter((item) => {
    const matchesRegion =
      filters.region === ALL_FILTER_VALUE || item.region === filters.region;
    const matchesCountry =
      filters.country === ALL_FILTER_VALUE || item.country === filters.country;

    return matchesRegion && matchesCountry;
  });
}

export function normalizeLocationFilters<TItem extends LocationScopedItem>(
  items: TItem[],
  filters: LocationFilterState,
): LocationFilterState {
  const region =
    filters.region === ALL_FILTER_VALUE || hasRegion(items, filters.region)
      ? filters.region
      : ALL_FILTER_VALUE;

  if (filters.country === ALL_FILTER_VALUE) {
    return { region, country: ALL_FILTER_VALUE };
  }

  const countryIsValid = region === ALL_FILTER_VALUE
    ? hasCountry(items, filters.country)
    : hasCountryWithinRegion(items, filters.country, region);

  return {
    region,
    country: countryIsValid ? filters.country : ALL_FILTER_VALUE,
  };
}

export function resolveInitialLocationFilters<TItem extends LocationScopedItem>(
  items: TItem[],
  preferred: PreferredLocation,
): LocationFilterState {
  const preferredCountryExists = hasCountry(items, preferred.country);

  if (!preferredCountryExists) {
    return { region: ALL_FILTER_VALUE, country: ALL_FILTER_VALUE };
  }

  const preferredPairExists = hasCountryWithinRegion(
    items,
    preferred.country,
    preferred.region,
  );

  return {
    region: preferredPairExists ? preferred.region : ALL_FILTER_VALUE,
    country: preferred.country,
  };
}
