"use client";

import * as React from "react";

import { DirectoryDiscoveryControls } from "@/app/_components/directory/directory-discovery-controls";
import { resolveDirectoryEmptyReason } from "@/app/_components/directory/empty-reason";
import { DirectoryScreenLayout } from "@/app/_components/directory/directory-screen-layout";
import {
  filterAndSortDirectoryItems,
  filterDirectoryItemsByQuery,
} from "@/app/_components/directory/sorting";
import { DirectorySortMode } from "@/app/_components/directory/types";
import { LocationFiltersPanel } from "@/app/_components/location-filters/location-filters-panel";
import { useLocationFilters } from "@/app/_components/location-filters/use-location-filters";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { normalizeDirectoryQuery } from "@/lib/opportunities/summary-helpers";
import { formatTemplate } from "@/lib/utils/format-template";
import { UsersList } from "./users-list";
import type { UsersScreenProps } from "./types";

export function UsersScreen({
  users,
  sourceUnavailable,
}: UsersScreenProps): React.ReactNode {
  const { locale, messages } = useI18n();
  const copy = messages.users;
  const {
    filters,
    regionOptions,
    countryOptions,
    filteredItems,
    hasActiveFilters: hasGeography,
    handleRegionChange,
    handleCountryChange,
    handleClear,
  } = useLocationFilters({ items: users });
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<DirectorySortMode>(
    DirectorySortMode.Count,
  );
  const hasQuery = normalizeDirectoryQuery(query, locale).length > 0;
  const queryMatchedUsers = React.useMemo(
    () =>
      filterDirectoryItemsByQuery({
        items: users,
        locale,
        query,
        getSearchValues: (item) => [item.name, item.handle, `@${item.handle}`],
      }),
    [locale, query, users],
  );
  const visibleUsers = React.useMemo(
    () =>
      filterAndSortDirectoryItems({
        items: filteredItems,
        locale,
        query,
        sort,
        getIdentity: (item) => item.handle,
        getSearchValues: (item) => [item.name, item.handle, `@${item.handle}`],
      }),
    [filteredItems, locale, query, sort],
  );
  const resultSummary =
    visibleUsers.length === 1
      ? copy.list.summaryOne
      : formatTemplate(copy.list.summary, {
          count: visibleUsers.length.toLocaleString(locale),
        });
  const emptyReason = resolveDirectoryEmptyReason({
    sourceUnavailable,
    sourceCount: users.length,
    visibleCount: visibleUsers.length,
    queryMatchCount: queryMatchedUsers.length,
    geographyMatchCount: filteredItems.length,
    hasQuery,
    hasGeography,
  });
  const handleClearAll = React.useCallback(() => {
    setQuery("");
    handleClear();
  }, [handleClear]);

  return (
    <DirectoryScreenLayout
      kicker={copy.header.kicker}
      title={copy.header.title}
      description={copy.header.description}
      discovery={(
        <DirectoryDiscoveryControls
          query={query}
          sort={sort}
          discoveryLabel={copy.filters.discoveryLabel}
          searchLabel={copy.filters.searchLabel}
          searchPlaceholder={copy.filters.searchPlaceholder}
          sortLabel={copy.filters.sortLabel}
          sortCount={copy.filters.sortCount}
          sortRecent={copy.filters.sortRecent}
          sortName={copy.filters.sortName}
          resultSummary={sourceUnavailable ? undefined : resultSummary}
          clearLabel={copy.filters.clear}
          hasActiveFilters={hasQuery || hasGeography}
          onQueryChange={setQuery}
          onSortChange={setSort}
          onClearAll={handleClearAll}
          geography={(
            <LocationFiltersPanel
              locale={locale}
              filtersMessages={copy.filters}
              state={filters}
              regions={regionOptions}
              countries={countryOptions}
              onRegionChange={handleRegionChange}
              onCountryChange={handleCountryChange}
            />
          )}
        />
      )}
      list={(
        <UsersList
          locale={locale}
          listMessages={copy.list}
          items={visibleUsers}
          emptyReason={emptyReason}
          onClearAll={handleClearAll}
        />
      )}
    />
  );
}
