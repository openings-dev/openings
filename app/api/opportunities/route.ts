import { NextRequest, NextResponse } from "next/server";
import type {
  OpportunityFilterFacets,
  OpportunityItem,
  OpportunitySalary,
  OpportunitySourceType,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { canonicalTagValue } from "@/app/opportunities/_components/opportunities-screen/controller/tag-normalization";
import { loadSnapshotDataset } from "@/lib/opportunities/snapshot";

export const dynamic = "force-static";

const DEFAULT_LIMIT = 5000;
const MIN_LIMIT = 10;
const MAX_LIMIT = 5000;

type SortOrder = "recent" | "oldest";
type ScopeFilterKey = "repository" | "region" | "country";

interface ScopeFilters {
  repository: string | null;
  region: string | null;
  country: string | null;
  tags: string[];
  authors: string[];
  searchText: string;
}

const EMPTY_FACETS: OpportunityFilterFacets = {
  repositories: {},
  regions: {},
  countries: {},
  tags: {},
  authors: {},
  authorLabels: {},
};

interface OpportunitiesApiPayload {
  items: OpportunityItem[];
  nextCursor: string | null;
  hasMore: boolean;
  rateLimited: boolean;
  retryAfterSeconds: number | null;
  meta: {
    snapshotGeneratedAt: string | null;
    deployedAt: string | null;
    lastUpdatedAt: string | null;
    totalCount: number;
    filteredCount: number;
    facets: OpportunityFilterFacets;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseLimit(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_LIMIT;
  }

  return clamp(parsed, MIN_LIMIT, MAX_LIMIT);
}

function parseOffset(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function normalizeSortOrder(value: string | null): SortOrder {
  return value === "oldest" ? "oldest" : "recent";
}

function normalizeIsoDate(value: string | null | undefined) {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toISOString();
}

const API_DEPLOYED_AT = normalizeIsoDate(
  process.env.OPENINGS_API_DEPLOYED_AT ||
    process.env.VERCEL_GIT_COMMIT_DATE ||
    process.env.VERCEL_DEPLOYMENT_CREATED_AT ||
    process.env.BUILD_CREATED_AT ||
    new Date().toISOString(),
);

function pickLastUpdatedAt(snapshotGeneratedAt: string | null, deployedAt: string | null) {
  if (!snapshotGeneratedAt) return deployedAt;
  if (!deployedAt) return snapshotGeneratedAt;
  return Date.parse(snapshotGeneratedAt) >= Date.parse(deployedAt)
    ? snapshotGeneratedAt
    : deployedAt;
}

function normalizeScopeFilter(value: string | null) {
  if (!value || value === "all") {
    return null;
  }

  return value;
}

function parseListParam(value: string | null) {
  return [
    ...new Set(
      (value ?? "")
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean),
    ),
  ];
}

function parseScopeFilters(searchParams: URLSearchParams): ScopeFilters {
  return {
    repository: normalizeScopeFilter(searchParams.get("repository")),
    region: normalizeScopeFilter(searchParams.get("region")),
    country: normalizeScopeFilter(searchParams.get("country")),
    tags: parseListParam(searchParams.get("tags"))
      .map((tag) => canonicalTagValue(tag))
      .filter(Boolean),
    authors: parseListParam(searchParams.get("authors")),
    searchText: searchParams.get("search")?.trim() ?? "",
  };
}

function asRecord(value: unknown) {
  if (!value || typeof value !== "object") {
    return null;
  }

  return value as Record<string, unknown>;
}

function stringOrNull(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function normalizeSourceType(value: unknown): OpportunitySourceType {
  if (
    value === "github-discussion" ||
    value === "community-board" ||
    value === "github-issue"
  ) {
    return value;
  }

  return "github-issue";
}

function normalizeSalary(value: unknown): OpportunitySalary | undefined {
  const record = asRecord(value);

  if (!record) {
    return undefined;
  }

  const currency = stringOrNull(record.currency);

  if (!currency) {
    return undefined;
  }

  const period =
    record.period === "month" || record.period === "hour" || record.period === "year"
      ? record.period
      : "year";

  const min = typeof record.min === "number" && Number.isFinite(record.min)
    ? record.min
    : undefined;
  const max = typeof record.max === "number" && Number.isFinite(record.max)
    ? record.max
    : undefined;

  return {
    currency,
    period,
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
  };
}

function normalizeOpportunity(value: unknown): OpportunityItem | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  const id = stringOrNull(record.id);
  const title = stringOrNull(record.title);
  const repository = stringOrNull(record.repository);
  const repositoryUrl = stringOrNull(record.repositoryUrl);
  const region = stringOrNull(record.region);
  const country = stringOrNull(record.country);
  const url = stringOrNull(record.url);
  const createdAt = stringOrNull(record.createdAt);
  const updatedAt = stringOrNull(record.updatedAt) ?? createdAt;

  if (!id || !title || !repository || !repositoryUrl || !region || !country || !url || !createdAt || !updatedAt) {
    return null;
  }

  const authorRecord = asRecord(record.author) ?? {};
  const authorHandle = stringOrNull(authorRecord.handle) ?? stringOrNull(authorRecord.name) ?? "unknown";
  const authorId = stringOrNull(authorRecord.id) ?? authorHandle;
  const authorName = stringOrNull(authorRecord.name) ?? authorHandle;
  const authorAvatarUrl = stringOrNull(authorRecord.avatarUrl) ?? "";

  const communityRecord = asRecord(record.community) ?? {};
  const communityRepository = stringOrNull(communityRecord.repository) ?? repository;
  const communityUrl = stringOrNull(communityRecord.url) ?? repositoryUrl;
  const communityName =
    stringOrNull(communityRecord.name) ?? stringOrNull(communityRecord.id) ?? repository.split("/")[0] ?? "unknown";
  const communityId = stringOrNull(communityRecord.id) ?? communityName;
  const communityAvatarUrl = stringOrNull(communityRecord.avatarUrl) ?? "";

  const tags = Array.isArray(record.tags)
    ? Array.from(new Set(record.tags.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0))).slice(0, 12)
    : [];

  const description = stringOrNull(record.description) ??
    stringOrNull(record.body) ??
    stringOrNull(record.excerpt) ??
    title;
  const excerpt = stringOrNull(record.excerpt) ?? title;
  const companyName = stringOrNull(record.companyName) ?? undefined;
  const salary = normalizeSalary(record.salary);

  return {
    id,
    ...(stringOrNull(record.sourceId) ? { sourceId: stringOrNull(record.sourceId) ?? undefined } : {}),
    title,
    description,
    excerpt,
    issueState: record.issueState === "closed" ? "closed" : "open",
    repository,
    repositoryUrl,
    region,
    country,
    tags,
    author: { id: authorId, name: authorName, handle: authorHandle, avatarUrl: authorAvatarUrl },
    community: {
      id: communityId,
      name: communityName,
      avatarUrl: communityAvatarUrl,
      repository: communityRepository,
      url: communityUrl,
    },
    ...(companyName ? { companyName } : {}),
    ...(salary ? { salary } : {}),
    createdAt,
    updatedAt,
    url,
    sourceType: normalizeSourceType(record.sourceType),
  };
}

function countBy<T>(items: T[], getValue: (item: T) => string) {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    const value = getValue(item);
    if (!value) return accumulator;
    accumulator[value] = (accumulator[value] ?? 0) + 1;
    return accumulator;
  }, {});
}

function filterItems(
  items: OpportunityItem[],
  scopeFilters: ScopeFilters,
  ignoredKeys: ScopeFilterKey[] = [],
) {
  const selectedTags = scopeFilters.tags.length > 0
    ? new Set(scopeFilters.tags)
    : null;
  const selectedAuthors = scopeFilters.authors.length > 0
    ? new Set(scopeFilters.authors)
    : null;
  const searchQuery = scopeFilters.searchText.toLowerCase();

  return items.filter((item) => {
    const matchesRepository = ignoredKeys.includes("repository") ||
      !scopeFilters.repository ||
      item.repository === scopeFilters.repository;
    const matchesRegion = ignoredKeys.includes("region") ||
      !scopeFilters.region ||
      item.region === scopeFilters.region;
    const matchesCountry = ignoredKeys.includes("country") ||
      !scopeFilters.country ||
      item.country === scopeFilters.country;
    const matchesTags =
      !selectedTags ||
      item.tags.some((tag) => selectedTags.has(canonicalTagValue(tag)));
    const matchesAuthors = !selectedAuthors || selectedAuthors.has(item.author.handle);
    const matchesSearch =
      !searchQuery ||
      [
        item.title,
        item.excerpt,
        item.description,
        item.repository,
        item.country,
        item.region,
        item.companyName,
        item.author.name,
        item.author.handle,
        item.tags.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery);
    const matchesOpenIssue = item.issueState === "open";

    return (
      matchesOpenIssue &&
      matchesRepository &&
      matchesRegion &&
      matchesCountry &&
      matchesTags &&
      matchesAuthors &&
      matchesSearch
    );
  });
}

function buildFacets(params: {
  filteredItems: OpportunityItem[];
  repositoryFacetItems: OpportunityItem[];
  regionFacetItems: OpportunityItem[];
  countryFacetItems: OpportunityItem[];
}): OpportunityFilterFacets {
  const authorLabels = params.filteredItems.reduce<Record<string, string>>((accumulator, item) => {
    accumulator[item.author.handle] = item.author.name;
    return accumulator;
  }, {});

  return {
    repositories: countBy(params.repositoryFacetItems, (item) => item.repository),
    regions: countBy(params.regionFacetItems, (item) => item.region),
    countries: countBy(params.countryFacetItems, (item) => item.country),
    tags: countBy(params.filteredItems.flatMap((item) => item.tags), (tag) => tag),
    authors: countBy(params.filteredItems, (item) => item.author.handle),
    authorLabels,
  };
}

function sortItems(items: OpportunityItem[], sortOrder: SortOrder) {
  return [...items].sort((left, right) => {
    const leftDate = new Date(left.createdAt).getTime();
    const rightDate = new Date(right.createdAt).getTime();
    return sortOrder === "oldest" ? leftDate - rightDate : rightDate - leftDate;
  });
}

function paginateItems(
  items: OpportunityItem[],
  offset: number,
  limit: number,
  meta: OpportunitiesApiPayload["meta"],
): OpportunitiesApiPayload {
  const start = clamp(offset, 0, items.length);
  const slice = items.slice(start, start + limit);
  const nextOffset = start + slice.length;

  return {
    items: slice,
    nextCursor: nextOffset < items.length ? String(nextOffset) : null,
    hasMore: nextOffset < items.length,
    rateLimited: false,
    retryAfterSeconds: null,
    meta,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const scopeFilters = parseScopeFilters(searchParams);
    const snapshot = await loadSnapshotDataset();
    const normalizedItems = snapshot.items
      .map((item) => normalizeOpportunity(item))
      .filter((item): item is OpportunityItem => item !== null);

    const filteredItems = filterItems(normalizedItems, scopeFilters);
    const facets = buildFacets({
      filteredItems,
      repositoryFacetItems: filterItems(normalizedItems, scopeFilters, ["repository"]),
      regionFacetItems: filterItems(normalizedItems, scopeFilters, ["region"]),
      countryFacetItems: filterItems(normalizedItems, scopeFilters, ["country"]),
    });
    const sortedItems = sortItems(filteredItems, normalizeSortOrder(searchParams.get("sort")));
    const payload = paginateItems(
      sortedItems,
      parseOffset(searchParams.get("cursor")),
      parseLimit(searchParams.get("limit")),
      {
        snapshotGeneratedAt: snapshot.generatedAt,
        deployedAt: API_DEPLOYED_AT,
        lastUpdatedAt: pickLastUpdatedAt(snapshot.generatedAt, API_DEPLOYED_AT),
        totalCount: normalizedItems.length,
        filteredCount: filteredItems.length,
        facets,
      },
    );

    return NextResponse.json(payload satisfies OpportunitiesApiPayload);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        items: [],
        nextCursor: null,
        hasMore: false,
        rateLimited: false,
        retryAfterSeconds: null,
        meta: {
          snapshotGeneratedAt: null,
          deployedAt: API_DEPLOYED_AT,
          lastUpdatedAt: API_DEPLOYED_AT,
          totalCount: 0,
          filteredCount: 0,
          facets: EMPTY_FACETS,
        },
      } satisfies OpportunitiesApiPayload,
      { status: 502 },
    );
  }
}
