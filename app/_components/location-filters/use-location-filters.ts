"use client";

import * as React from "react";
import {
  buildCountryOptions,
  buildRegionOptions,
  filterByLocation,
  resolveInitialLocationFilters,
  normalizeLocationFilters,
} from "./utils";
import { ALL_FILTER_VALUE } from "./types";
import type {
  LocationScopedItem,
  PreferredLocation,
} from "./types";

const DEFAULT_PREFERRED_LOCATION: PreferredLocation = {
  country: "Brazil",
  region: "South America",
};

interface UseLocationFiltersParams<TItem extends LocationScopedItem> {
  items: TItem[];
  preferredLocation?: PreferredLocation;
}

export function useLocationFilters<TItem extends LocationScopedItem>({
  items,
  preferredLocation = DEFAULT_PREFERRED_LOCATION,
}: UseLocationFiltersParams<TItem>) {
  const preferredCountry = preferredLocation.country;
  const preferredRegion = preferredLocation.region;

  const initialFilters = React.useMemo(
    () =>
      resolveInitialLocationFilters(items, {
        country: preferredCountry,
        region: preferredRegion,
      }),
    [items, preferredCountry, preferredRegion],
  );
  const [filters, setFilters] = React.useState(initialFilters);

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

  const regionOptions = React.useMemo(() => buildRegionOptions(items), [items]);
  const countryOptions = React.useMemo(
    () => buildCountryOptions(items, filters.region),
    [filters.region, items],
  );
  const filteredItems = React.useMemo(
    () => filterByLocation(items, filters),
    [filters, items],
  );

  const handleRegionChange = React.useCallback(
    (region: string) => {
      setFilters((previous) => {
        if (previous.region === region && previous.country === ALL_FILTER_VALUE) {
          return previous;
        }

        return { region, country: ALL_FILTER_VALUE };
      });
    },
    [],
  );

  const handleCountryChange = React.useCallback((country: string) => {
    setFilters((previous) =>
      previous.country === country ? previous : { ...previous, country },
    );
  }, []);

  const handleClear = React.useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    filters,
    regionOptions,
    countryOptions,
    filteredItems,
    handleRegionChange,
    handleCountryChange,
    handleClear,
  };
}
