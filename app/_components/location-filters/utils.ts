import {
  ALL_FILTER_VALUE,
  type LocationFilterOption,
  type LocationFilterState,
  type LocationScopedItem,
} from "./types";
import { normalizeLocationValue } from "@/lib/opportunities/summary-helpers";

function buildOptions<TItem extends LocationScopedItem>(
  items: TItem[],
  key: "region" | "country",
) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const value = normalizeLocationValue(item[key]);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([value, count]) => ({ value, count } satisfies LocationFilterOption));
}

function hasCountry<TItem extends LocationScopedItem>(items: TItem[], country: string) {
  return items.some((item) => item.country === country);
}

function hasRegion<TItem extends LocationScopedItem>(items: TItem[], region: string) {
  return items.some((item) => item.region === region);
}

function hasRegionWithinCountry<TItem extends LocationScopedItem>(
  items: TItem[],
  region: string,
  country: string,
) {
  return items.some((item) => item.region === region && item.country === country);
}

export function buildRegionOptions<TItem extends LocationScopedItem>(
  items: TItem[],
  country: string,
) {
  const scoped = country === ALL_FILTER_VALUE
    ? items
    : items.filter((item) => item.country === country);
  return buildOptions(scoped, "region");
}

export function buildCountryOptions<TItem extends LocationScopedItem>(items: TItem[]) {
  return buildOptions(items, "country");
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
  const country =
    filters.country === ALL_FILTER_VALUE || hasCountry(items, filters.country)
      ? filters.country
      : ALL_FILTER_VALUE;
  const regionIsValid = filters.region === ALL_FILTER_VALUE ||
    (country === ALL_FILTER_VALUE
      ? hasRegion(items, filters.region)
      : hasRegionWithinCountry(items, filters.region, country));

  return {
    country,
    region: regionIsValid ? filters.region : ALL_FILTER_VALUE,
  };
}
