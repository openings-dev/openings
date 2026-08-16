"use client";

import * as React from "react";

import { DirectoryScreenLayout } from "@/app/_components/directory/directory-screen-layout";
import { LocationFiltersPanel } from "@/app/_components/location-filters/location-filters-panel";
import { useLocationFilters } from "@/app/_components/location-filters/use-location-filters";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { DirectoryDiscoveryControls } from "@/app/_components/directory/directory-discovery-controls";
import { UsersList } from "./users-list";
import type { UsersScreenProps } from "./types";

export function UsersScreen({ users }: UsersScreenProps): React.ReactNode {
  const { locale, messages } = useI18n();
  const copy = messages.users;
  const location = useLocationFilters({ items: users });
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<"count" | "recent" | "name">("count");
  const visibleUsers = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    return [...location.filteredItems]
      .filter((item) => !normalizedQuery || `${item.name} ${item.handle}`.toLocaleLowerCase(locale).includes(normalizedQuery))
      .sort((left, right) => sort === "name" ? left.name.localeCompare(right.name, locale) : sort === "recent" ? Date.parse(right.lastPostedAt ?? "") - Date.parse(left.lastPostedAt ?? "") : right.opportunitiesCount - left.opportunitiesCount || left.name.localeCompare(right.name, locale));
  }, [locale, location.filteredItems, query, sort]);

  return (
    <DirectoryScreenLayout
      kicker={copy.header.kicker}
      title={copy.header.title}
      description={copy.header.description}
      filters={(
        <div className="space-y-3"><DirectoryDiscoveryControls query={query} sort={sort} searchPlaceholder={copy.filters.searchPlaceholder} sortLabel={copy.filters.sortLabel} sortCount={copy.filters.sortCount} sortRecent={copy.filters.sortRecent} sortName={copy.filters.sortName} onQueryChange={setQuery} onSortChange={setSort} /><LocationFiltersPanel
          locale={locale}
          filtersMessages={copy.filters}
          state={location.filters}
          regions={location.regionOptions}
          countries={location.countryOptions}
          onRegionChange={location.handleRegionChange}
          onCountryChange={location.handleCountryChange}
          onClear={location.handleClear}
        /></div>
      )}
      list={(
        <UsersList locale={locale} listMessages={copy.list} items={visibleUsers} />
      )}
    />
  );
}
