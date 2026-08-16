"use client";

import { DirectoryScreenLayout } from "@/app/_components/directory/directory-screen-layout";
import { LocationFiltersPanel } from "@/app/_components/location-filters/location-filters-panel";
import { useLocationFilters } from "@/app/_components/location-filters/use-location-filters";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { UsersList } from "./users-list";
import type { UsersScreenProps } from "./types";

export function UsersScreen({ users }: UsersScreenProps): React.ReactNode {
  const { locale, messages } = useI18n();
  const copy = messages.users;
  const location = useLocationFilters({ items: users });

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
        <UsersList locale={locale} listMessages={copy.list} items={location.filteredItems} />
      )}
    />
  );
}
