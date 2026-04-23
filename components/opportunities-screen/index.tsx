"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useI18n } from "@/components/providers/i18n-provider";
import { REPOSITORIES } from "@/lib/constants/repositories";
import {
  opportunitiesDescriptionStyles,
  opportunitiesHeaderStyles,
  opportunitiesKickerStyles,
  opportunitiesScreenStyles,
  opportunitiesTitleStyles,
} from "@/components/opportunities-screen/styles";
import type {
  FilterOption,
  OnFilterFieldChange,
  OpportunityFilterOptions,
  OpportunityFiltersState,
  OpportunityItem,
  OpportunitySortOrder,
  OpportunityViewMode,
} from "@/components/opportunities-screen/types";
import { OpportunitiesFilters } from "@/components/opportunities-screen/opportunities-filters";
import { OpportunitiesList } from "@/components/opportunities-screen/opportunities-list";
import { OpportunitiesToolbar } from "@/components/opportunities-screen/opportunities-toolbar";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50] as const;
const INITIAL_BATCH_SIZE = 60;
const LOAD_MORE_BATCH_SIZE = 40;

const KNOWN_REPOSITORIES = new Set(REPOSITORIES.map((repository) => repository.repository));
const KNOWN_REGIONS = new Set(REPOSITORIES.map((repository) => repository.region));
const KNOWN_COUNTRIES = new Set(REPOSITORIES.map((repository) => repository.country));

interface OpportunitiesApiPayload {
  items: OpportunityItem[];
  nextCursor: string | null;
  hasMore: boolean;
  rateLimited: boolean;
  retryAfterSeconds: number | null;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

const DEFAULT_FILTERS: OpportunityFiltersState = {
  repository: "all",
  region: "all",
  country: "all",
  tags: [],
  authors: [],
  searchText: "",
  sortOrder: "recent",
  itemsPerPage: 20,
  viewMode: "list",
  page: 1,
};

function buildSearchParamsFromFilters(state: OpportunityFiltersState) {
  const params = new URLSearchParams();

  if (state.repository !== DEFAULT_FILTERS.repository) {
    params.set("repository", state.repository);
  }

  if (state.region !== DEFAULT_FILTERS.region) {
    params.set("region", state.region);
  }

  if (state.country !== DEFAULT_FILTERS.country) {
    params.set("country", state.country);
  }

  if (state.tags.length > 0) {
    params.set("tags", state.tags.join(","));
  }

  if (state.authors.length > 0) {
    params.set("authors", state.authors.join(","));
  }

  if (state.searchText.trim()) {
    params.set("search", state.searchText.trim());
  }

  if (state.sortOrder !== DEFAULT_FILTERS.sortOrder) {
    params.set("sort", state.sortOrder);
  }

  if (state.itemsPerPage !== DEFAULT_FILTERS.itemsPerPage) {
    params.set("perPage", String(state.itemsPerPage));
  }

  if (state.viewMode !== DEFAULT_FILTERS.viewMode) {
    params.set("view", state.viewMode);
  }

  if (state.page !== DEFAULT_FILTERS.page) {
    params.set("page", String(state.page));
  }

  return params;
}

function parseSortOrder(value: string | null): OpportunitySortOrder {
  return value === "oldest" ? "oldest" : "recent";
}

function parseViewMode(value: string | null): OpportunityViewMode {
  return value === "grid" ? "grid" : "list";
}

function parseListParam(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseItemsPerPage(value: string | null) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    return DEFAULT_FILTERS.itemsPerPage;
  }

  return ITEMS_PER_PAGE_OPTIONS.includes(parsed as (typeof ITEMS_PER_PAGE_OPTIONS)[number])
    ? parsed
    : DEFAULT_FILTERS.itemsPerPage;
}

function parsePage(value: string | null) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function parseFiltersFromSearchParams(searchParams: URLSearchParams) {
  return {
    repository: searchParams.get("repository") ?? DEFAULT_FILTERS.repository,
    region: searchParams.get("region") ?? DEFAULT_FILTERS.region,
    country: searchParams.get("country") ?? DEFAULT_FILTERS.country,
    tags: parseListParam(searchParams.get("tags")),
    authors: parseListParam(searchParams.get("authors")),
    searchText: searchParams.get("search") ?? DEFAULT_FILTERS.searchText,
    sortOrder: parseSortOrder(searchParams.get("sort")),
    itemsPerPage: parseItemsPerPage(searchParams.get("perPage")),
    viewMode: parseViewMode(searchParams.get("view")),
    page: parsePage(searchParams.get("page")),
  } satisfies OpportunityFiltersState;
}

function detectCountryFromNavigator() {
  if (typeof window === "undefined") {
    return null;
  }

  const countryByCode = REPOSITORIES.reduce<Record<string, string>>(
    (accumulator, repository) => {
      if (!accumulator[repository.countryCode]) {
        accumulator[repository.countryCode] = repository.country;
      }

      return accumulator;
    },
    {},
  );

  const locales = [...navigator.languages, navigator.language].filter(Boolean);

  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region;

      if (!region) {
        continue;
      }

      const country = countryByCode[region.toUpperCase()];

      if (country) {
        return country;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function countBy<T>(items: T[], getValue: (item: T) => string) {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    const value = getValue(item);
    accumulator[value] = (accumulator[value] ?? 0) + 1;
    return accumulator;
  }, {});
}

function sortOptions(counts: Record<string, number>, labels?: Record<string, string>) {
  return Object.entries(counts)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([value, count]) => ({
      value,
      label: labels?.[value] ?? value,
      count,
    })) satisfies FilterOption[];
}

function withKnownValues(counts: Record<string, number>, values: Iterable<string>) {
  const merged = { ...counts };

  for (const value of values) {
    merged[value] = merged[value] ?? 0;
  }

  return merged;
}

function dedupeOpportunities(items: OpportunityItem[]) {
  const byId = new Map<string, OpportunityItem>();

  for (const item of items) {
    byId.set(item.id, item);
  }

  return [...byId.values()];
}

function buildApiUrl(
  filters: Pick<OpportunityFiltersState, "repository" | "region" | "country" | "sortOrder">,
  cursor: string | null,
  limit: number,
) {
  const params = new URLSearchParams({
    sort: filters.sortOrder,
    limit: String(limit),
  });

  if (filters.repository !== DEFAULT_FILTERS.repository) {
    params.set("repository", filters.repository);
  }

  if (filters.region !== DEFAULT_FILTERS.region) {
    params.set("region", filters.region);
  }

  if (filters.country !== DEFAULT_FILTERS.country) {
    params.set("country", filters.country);
  }

  if (cursor) {
    params.set("cursor", cursor);
  }

  return `/api/opportunities?${params.toString()}`;
}

function parseApiPayload(payload: unknown): OpportunitiesApiPayload {
  if (!payload || typeof payload !== "object") {
    return {
      items: [],
      nextCursor: null,
      hasMore: false,
      rateLimited: false,
      retryAfterSeconds: null,
    };
  }

  const data = payload as Partial<OpportunitiesApiPayload>;
  const retryAfterSeconds =
    typeof data.retryAfterSeconds === "number" &&
    Number.isFinite(data.retryAfterSeconds) &&
    data.retryAfterSeconds > 0
      ? Math.floor(data.retryAfterSeconds)
      : null;

  return {
    items: Array.isArray(data.items) ? data.items : [],
    nextCursor: typeof data.nextCursor === "string" ? data.nextCursor : null,
    hasMore: Boolean(data.hasMore),
    rateLimited: Boolean(data.rateLimited),
    retryAfterSeconds,
  };
}

function matchesSearch(opportunity: OpportunityItem, searchText: string) {
  if (!searchText.trim()) {
    return true;
  }

  const query = searchText.trim().toLowerCase();
  const searchableText = [
    opportunity.title,
    opportunity.excerpt,
    opportunity.repository,
    opportunity.country,
    opportunity.region,
    opportunity.companyName,
    opportunity.author.name,
    opportunity.author.handle,
    opportunity.tags.join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

export function OpportunitiesScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, messages } = useI18n();
  const opportunitiesMessages = messages.opportunities;

  const [filters, setFilters] = React.useState<OpportunityFiltersState>(() =>
    {
      const parsedFilters = parseFiltersFromSearchParams(
        new URLSearchParams(searchParams.toString()),
      );

      if (
        !searchParams.has("country") &&
        parsedFilters.country === DEFAULT_FILTERS.country
      ) {
        const detectedCountry = detectCountryFromNavigator();

        if (detectedCountry) {
          parsedFilters.country = detectedCountry;
        }
      }

      return parsedFilters;
    },
  );
  const [opportunities, setOpportunities] = React.useState<OpportunityItem[]>([]);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [hasMoreRemote, setHasMoreRemote] = React.useState(true);
  const [filtersExpanded, setFiltersExpanded] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const fetchAbortRef = React.useRef<AbortController | null>(null);

  const openOpportunities = React.useMemo(
    () => opportunities.filter((opportunity) => opportunity.issueState === "open"),
    [opportunities],
  );

  const serverFilters = React.useMemo(
    () => ({
      repository: KNOWN_REPOSITORIES.has(filters.repository)
        ? filters.repository
        : DEFAULT_FILTERS.repository,
      region: KNOWN_REGIONS.has(filters.region) ? filters.region : DEFAULT_FILTERS.region,
      country: KNOWN_COUNTRIES.has(filters.country)
        ? filters.country
        : DEFAULT_FILTERS.country,
      sortOrder: filters.sortOrder,
    }),
    [filters.country, filters.region, filters.repository, filters.sortOrder],
  );

  const fetchOpportunities = React.useCallback(
    async ({
      cursor,
      limit,
      signal,
    }: {
      cursor: string | null;
      limit: number;
      signal?: AbortSignal;
    }) => {
      const response = await fetch(buildApiUrl(serverFilters, cursor, limit), {
        cache: "no-store",
        signal,
      });
      const payload = parseApiPayload(await response.json().catch(() => null));

      if (response.status === 429 || payload.rateLimited) {
        return {
          ...payload,
          rateLimited: true,
        };
      }

      if (!response.ok) {
        throw new Error(`Failed to load opportunities (${response.status})`);
      }

      return payload;
    },
    [serverFilters],
  );

  React.useEffect(() => {
    const controller = new AbortController();
    fetchAbortRef.current?.abort();
    fetchAbortRef.current = controller;

    queueMicrotask(() => {
      if (controller.signal.aborted) {
        return;
      }

      setIsLoading(true);
      setIsFetchingMore(false);
      setHasMoreRemote(true);
      setNextCursor(null);
      setOpportunities([]);
      setFilters((previous) =>
        previous.page === 1 ? previous : { ...previous, page: 1 },
      );
    });

    fetchOpportunities({
      cursor: null,
      limit: INITIAL_BATCH_SIZE,
      signal: controller.signal,
    })
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setOpportunities(payload.items);
        setNextCursor(payload.rateLimited ? null : payload.nextCursor);
        setHasMoreRemote(payload.rateLimited ? false : payload.hasMore);

        if (payload.rateLimited) {
          toast.error(opportunitiesMessages.feedback.rateLimited);
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        setHasMoreRemote(false);
        toast.error(opportunitiesMessages.feedback.loadError);
      })
      .finally(() => {
        if (controller.signal.aborted) {
          return;
        }

        setIsLoading(false);
      });

    return () => controller.abort();
  }, [
    fetchOpportunities,
    opportunitiesMessages.feedback.loadError,
    opportunitiesMessages.feedback.rateLimited,
  ]);

  const options = React.useMemo<OpportunityFilterOptions>(() => {
    const repositoryCounts = countBy(openOpportunities, (item) => item.repository);
    const regionCounts = countBy(openOpportunities, (item) => item.region);
    const countryCounts = countBy(openOpportunities, (item) => item.country);
    const tagCounts = countBy(
      openOpportunities.flatMap((item) => item.tags),
      (tag) => tag,
    );
    const authorCounts = countBy(
      openOpportunities,
      (item) => item.author.handle,
    );
    const authorLabels = openOpportunities.reduce<Record<string, string>>(
      (accumulator, item) => {
        accumulator[item.author.handle] = item.author.name;
        return accumulator;
      },
      {},
    );

    return {
      repositories: sortOptions(
        withKnownValues(
          repositoryCounts,
          REPOSITORIES.map((repository) => repository.repository),
        ),
      ),
      regions: sortOptions(
        withKnownValues(
          regionCounts,
          REPOSITORIES.map((repository) => repository.region),
        ),
      ),
      countries: sortOptions(
        withKnownValues(
          countryCounts,
          REPOSITORIES.map((repository) => repository.country),
        ),
      ),
      tags: sortOptions(tagCounts),
      authors: sortOptions(authorCounts, authorLabels),
      itemsPerPage: [...ITEMS_PER_PAGE_OPTIONS],
    };
  }, [openOpportunities]);

  const normalizedFilters = React.useMemo(() => {
    const repositoryValues = new Set(options.repositories.map((option) => option.value));
    const regionValues = new Set(options.regions.map((option) => option.value));
    const countryValues = new Set(options.countries.map((option) => option.value));
    const tagValues = new Set(options.tags.map((option) => option.value));
    const authorValues = new Set(options.authors.map((option) => option.value));

    return {
      ...filters,
      repository: repositoryValues.has(filters.repository)
        ? filters.repository
        : DEFAULT_FILTERS.repository,
      region: regionValues.has(filters.region) ? filters.region : DEFAULT_FILTERS.region,
      country: countryValues.has(filters.country)
        ? filters.country
        : DEFAULT_FILTERS.country,
      tags: filters.tags.filter((tag) => tagValues.has(tag)),
      authors: filters.authors.filter((author) => authorValues.has(author)),
    };
  }, [filters, options]);

  const filteredOpportunities = React.useMemo(() => {
    const filtered = opportunities.filter((opportunity) => {
      if (opportunity.issueState !== "open") {
        return false;
      }

      const matchesRepository =
        normalizedFilters.repository === "all" ||
        opportunity.repository === normalizedFilters.repository;
      const matchesRegion =
        normalizedFilters.region === "all" ||
        opportunity.region === normalizedFilters.region;
      const matchesCountry =
        normalizedFilters.country === "all" ||
        opportunity.country === normalizedFilters.country;
      const matchesTags =
        normalizedFilters.tags.length === 0 ||
        normalizedFilters.tags.some((tag) => opportunity.tags.includes(tag));
      const matchesAuthors =
        normalizedFilters.authors.length === 0 ||
        normalizedFilters.authors.includes(opportunity.author.handle);

      return (
        matchesRepository &&
        matchesRegion &&
        matchesCountry &&
        matchesTags &&
        matchesAuthors &&
        matchesSearch(opportunity, normalizedFilters.searchText)
      );
    });

    return filtered.sort((left, right) => {
      const leftDate = new Date(left.createdAt).getTime();
      const rightDate = new Date(right.createdAt).getTime();

      return normalizedFilters.sortOrder === "recent"
        ? rightDate - leftDate
        : leftDate - rightDate;
    });
  }, [normalizedFilters, opportunities]);

  const totalCount = filteredOpportunities.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / normalizedFilters.itemsPerPage),
  );
  const currentPage = Math.min(normalizedFilters.page, totalPages);

  const visibleOpportunities = React.useMemo(() => {
    const end = currentPage * normalizedFilters.itemsPerPage;
    return filteredOpportunities.slice(0, end);
  }, [currentPage, filteredOpportunities, normalizedFilters.itemsPerPage]);

  const rangeLabel = React.useMemo(() => {
    if (totalCount === 0) {
      return opportunitiesMessages.range.zeroResults;
    }

    const end = Math.min(currentPage * normalizedFilters.itemsPerPage, totalCount);

    return formatTemplate(opportunitiesMessages.range.rangeOfTotal, {
      start: (1).toLocaleString(locale),
      end: end.toLocaleString(locale),
      total: totalCount.toLocaleString(locale),
    });
  }, [
    currentPage,
    locale,
    normalizedFilters.itemsPerPage,
    opportunitiesMessages.range.rangeOfTotal,
    opportunitiesMessages.range.zeroResults,
    totalCount,
  ]);

  const activeFiltersCount = React.useMemo(
    () =>
      [
        normalizedFilters.repository !== DEFAULT_FILTERS.repository,
        normalizedFilters.region !== DEFAULT_FILTERS.region,
        normalizedFilters.country !== DEFAULT_FILTERS.country,
        normalizedFilters.tags.length > 0,
        normalizedFilters.authors.length > 0,
        normalizedFilters.searchText.trim().length > 0,
        normalizedFilters.sortOrder !== DEFAULT_FILTERS.sortOrder,
        normalizedFilters.itemsPerPage !== DEFAULT_FILTERS.itemsPerPage,
      ].filter(Boolean).length,
    [normalizedFilters],
  );

  const hasActiveFilters = activeFiltersCount > 0;

  const filtersForUrl = React.useMemo(
    () => ({ ...normalizedFilters, page: currentPage }),
    [currentPage, normalizedFilters],
  );

  const serializedFilters = React.useMemo(
    () => buildSearchParamsFromFilters(filtersForUrl).toString(),
    [filtersForUrl],
  );

  const currentSearch = searchParams.toString();

  React.useEffect(() => {
    if (serializedFilters === currentSearch) {
      return;
    }

    const href = serializedFilters ? `${pathname}?${serializedFilters}` : pathname;
    router.replace(href, { scroll: false });
  }, [currentSearch, pathname, router, serializedFilters]);

  const loadMoreFromApi = React.useCallback(async () => {
    if (!nextCursor || !hasMoreRemote) {
      return false;
    }

    const payload = await fetchOpportunities({
      cursor: nextCursor,
      limit: LOAD_MORE_BATCH_SIZE,
    });

    setOpportunities((previous) =>
      dedupeOpportunities([...previous, ...payload.items]),
    );
    setNextCursor(payload.rateLimited ? null : payload.nextCursor);
    setHasMoreRemote(payload.rateLimited ? false : payload.hasMore);

    if (payload.rateLimited) {
      toast.error(opportunitiesMessages.feedback.rateLimited);
      return false;
    }

    return payload.items.length > 0;
  }, [
    fetchOpportunities,
    hasMoreRemote,
    nextCursor,
    opportunitiesMessages.feedback.rateLimited,
  ]);

  const handleFieldChange = React.useCallback<OnFilterFieldChange>(
    (field, value) => {
      setFilters((previous) => {
        const next = { ...previous, [field]: value } as OpportunityFiltersState;

        if (field !== "page" && field !== "viewMode") {
          next.page = 1;
        }

        return next;
      });
    },
    [],
  );

  const handleToggleTag = React.useCallback((tag: string) => {
    setFilters((previous) => {
      const isSelected = previous.tags.includes(tag);

      return {
        ...previous,
        tags: isSelected
          ? previous.tags.filter((entry) => entry !== tag)
          : [...previous.tags, tag],
        page: 1,
      };
    });
  }, []);

  const handleToggleAuthor = React.useCallback((authorHandle: string) => {
    setFilters((previous) => {
      const isSelected = previous.authors.includes(authorHandle);

      return {
        ...previous,
        authors: isSelected
          ? previous.authors.filter((entry) => entry !== authorHandle)
          : [...previous.authors, authorHandle],
        page: 1,
      };
    });
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setFilters((previous) => ({
      ...DEFAULT_FILTERS,
      viewMode: previous.viewMode,
    }));
    toast.success(opportunitiesMessages.feedback.filtersReset);
  }, [opportunitiesMessages.feedback.filtersReset]);

  const hasMore = currentPage < totalPages || hasMoreRemote;

  const handleLoadMore = React.useCallback(async () => {
    if (isLoading || isFetchingMore) {
      return;
    }

    if (currentPage < totalPages) {
      setFilters((previous) => ({
        ...previous,
        page: Math.min(previous.page + 1, totalPages),
      }));
      return;
    }

    if (!hasMoreRemote || !nextCursor) {
      return;
    }

    setIsFetchingMore(true);

    try {
      const hasNewItems = await loadMoreFromApi();

      if (hasNewItems) {
        setFilters((previous) => ({ ...previous, page: previous.page + 1 }));
      }
    } catch (error) {
      console.error(error);
      setHasMoreRemote(false);
      toast.error(opportunitiesMessages.feedback.loadMoreError);
    } finally {
      setIsFetchingMore(false);
    }
  }, [
    currentPage,
    hasMoreRemote,
    isFetchingMore,
    isLoading,
    loadMoreFromApi,
    nextCursor,
    opportunitiesMessages.feedback.loadMoreError,
    totalPages,
  ]);

  const handleCommunitySelect = React.useCallback((repository: string) => {
    setFilters((previous) => ({
      ...previous,
      repository,
      page: 1,
    }));
  }, []);

  const handleAuthorSelect = React.useCallback((authorHandle: string) => {
    setFilters((previous) => ({
      ...previous,
      authors: [authorHandle],
      page: 1,
    }));
  }, []);

  return (
    <section className={opportunitiesScreenStyles()}>
      <motion.header
        className={opportunitiesHeaderStyles()}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <p className={opportunitiesKickerStyles()}>
          {opportunitiesMessages.header.kicker}
        </p>
        <h1 className={opportunitiesTitleStyles()}>
          {opportunitiesMessages.header.title}
        </h1>
        <p className={opportunitiesDescriptionStyles()}>
          {opportunitiesMessages.header.description}
        </p>
      </motion.header>

      <OpportunitiesFilters
        state={normalizedFilters}
        options={options}
        isExpanded={filtersExpanded}
        activeFiltersCount={activeFiltersCount}
        onExpandedChange={setFiltersExpanded}
        onFieldChange={handleFieldChange}
        onToggleTag={handleToggleTag}
        onToggleAuthor={handleToggleAuthor}
        onClearFilters={handleClearFilters}
      />

      <OpportunitiesToolbar
        totalCount={totalCount}
        rangeLabel={rangeLabel}
        sortOrder={normalizedFilters.sortOrder}
        viewMode={normalizedFilters.viewMode}
        currentPage={currentPage}
        totalPages={totalPages}
        onSortOrderChange={(value) => handleFieldChange("sortOrder", value)}
        onViewModeChange={(value) => handleFieldChange("viewMode", value)}
      />

      <OpportunitiesList
        items={visibleOpportunities}
        viewMode={normalizedFilters.viewMode}
        isLoading={isLoading}
        isFetchingMore={isFetchingMore}
        hasMore={hasMore}
        hasActiveFilters={hasActiveFilters}
        rangeLabel={rangeLabel}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        skeletonCount={Math.min(normalizedFilters.itemsPerPage, 8)}
        onLoadMore={handleLoadMore}
        onClearFilters={handleClearFilters}
        onCommunitySelect={handleCommunitySelect}
        onAuthorSelect={handleAuthorSelect}
      />
    </section>
  );
}
