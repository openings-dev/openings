"use client";

import * as React from "react";
import {
  buildCountryOptions,
  buildRegionOptions,
  filterByLocation,
  normalizeLocationFilters,
} from "./utils";
import { ALL_FILTER_VALUE, NEUTRAL_LOCATION_FILTERS } from "./types";
import type { LocationScopedItem } from "./types";

interface UseLocationFiltersParams<TItem extends LocationScopedItem> {
  items: TItem[];
}

export function useLocationFilters<TItem extends LocationScopedItem>({
  items,
}: UseLocationFiltersParams<TItem>) {
  const [filters, setFilters] = React.useState(() => ({
    ...NEUTRAL_LOCATION_FILTERS,
  }));

  React.useEffect(() => {
    let isCurrent = true;

    queueMicrotask(() => {
      if (!isCurrent) return;
      setFilters((previous) => {
        const normalized = normalizeLocationFilters(items, previous);
        return previous.region === normalized.region && previous.country === normalized.country
          ? previous
          : normalized;
      });
    });

    return () => {
      isCurrent = false;
    };
  }, [items]);

  const countryOptions = React.useMemo(
    () => buildCountryOptions(items),
    [items],
  );
  const regionOptions = React.useMemo(
    () => buildRegionOptions(items, filters.country),
    [filters.country, items],
  );
  const filteredItems = React.useMemo(
    () => filterByLocation(items, filters),
    [filters, items],
  );

  const handleRegionChange = React.useCallback(
    (region: string) => {
      setFilters((previous) => normalizeLocationFilters(
        items,
        { ...previous, region },
      ));
    },
    [items],
  );

  const handleCountryChange = React.useCallback((country: string) => {
    setFilters((previous) => normalizeLocationFilters(
      items,
      { ...previous, country },
    ));
  }, [items]);

  const handleClear = React.useCallback(() => {
    setFilters({ ...NEUTRAL_LOCATION_FILTERS });
  }, []);

  const activeFilters = React.useMemo(
    () => [
      filters.country !== ALL_FILTER_VALUE
        ? { kind: "country" as const, value: filters.country }
        : null,
      filters.region !== ALL_FILTER_VALUE
        ? { kind: "region" as const, value: filters.region }
        : null,
    ].filter((entry): entry is NonNullable<typeof entry> => entry !== null),
    [filters.country, filters.region],
  );

  return {
    filters,
    regionOptions,
    countryOptions,
    filteredItems,
    activeFilters,
    hasActiveFilters: activeFilters.length > 0,
    handleRegionChange,
    handleCountryChange,
    handleClear,
  };
}
