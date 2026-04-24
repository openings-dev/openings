"use client";

import { DirectoryScreenLayout } from "@/app/_components/directory";
import {
  LocationFiltersPanel,
  useLocationFilters,
} from "@/app/_components/location-filters";
import { useI18n } from "@/components/providers/i18n-provider";
import { CommunitiesList } from "./communities-list";
import type { CommunitiesScreenProps } from "./types";

export function CommunitiesScreen({ communities }: CommunitiesScreenProps) {
  const { locale, messages } = useI18n();
  const copy = messages.communities;
  const location = useLocationFilters({ items: communities });

  return (
    <DirectoryScreenLayout
      kicker={copy.header.kicker}
      title={copy.header.title}
      description={copy.header.description}
      filters={(
        <LocationFiltersPanel
          locale={locale}
          filtersMessages={copy.filters}
          state={location.filters}
          regions={location.regionOptions}
          countries={location.countryOptions}
          onRegionChange={location.handleRegionChange}
          onCountryChange={location.handleCountryChange}
          onClear={location.handleClear}
        />
      )}
      list={(
        <CommunitiesList
          locale={locale}
          listMessages={copy.list}
          items={location.filteredItems}
        />
      )}
    />
  );
}
