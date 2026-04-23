import { NextRequest, NextResponse } from "next/server";
import type {
  OpportunityItem,
  OpportunitySalary,
  OpportunitySourceType,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { loadSnapshotItems } from "@/lib/opportunities/snapshot";

export const dynamic = "force-static";

const DEFAULT_LIMIT = 40;
const MIN_LIMIT = 10;
const MAX_LIMIT = 80;

type SortOrder = "recent" | "oldest";

interface OpportunitiesApiPayload {
  items: OpportunityItem[];
  nextCursor: string | null;
  hasMore: boolean;
  rateLimited: boolean;
  retryAfterSeconds: number | null;
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

  const excerpt = stringOrNull(record.excerpt) ?? title;
  const companyName = stringOrNull(record.companyName) ?? undefined;
  const salary = normalizeSalary(record.salary);

  return {
    id,
    title,
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

function filterItems(items: OpportunityItem[], searchParams: URLSearchParams) {
  const repositoryFilter = searchParams.get("repository");
  const regionFilter = searchParams.get("region");
  const countryFilter = searchParams.get("country");

  return items.filter((item) => {
    const matchesRepository = !repositoryFilter || repositoryFilter === "all" || item.repository === repositoryFilter;
    const matchesRegion = !regionFilter || regionFilter === "all" || item.region === regionFilter;
    const matchesCountry = !countryFilter || countryFilter === "all" || item.country === countryFilter;
    return matchesRepository && matchesRegion && matchesCountry;
  });
}

function sortItems(items: OpportunityItem[], sortOrder: SortOrder) {
  return [...items].sort((left, right) => {
    const leftDate = new Date(left.createdAt).getTime();
    const rightDate = new Date(right.createdAt).getTime();
    return sortOrder === "oldest" ? leftDate - rightDate : rightDate - leftDate;
  });
}

function paginateItems(items: OpportunityItem[], offset: number, limit: number): OpportunitiesApiPayload {
  const start = clamp(offset, 0, items.length);
  const slice = items.slice(start, start + limit);
  const nextOffset = start + slice.length;

  return {
    items: slice,
    nextCursor: nextOffset < items.length ? String(nextOffset) : null,
    hasMore: nextOffset < items.length,
    rateLimited: false,
    retryAfterSeconds: null,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const snapshotItems = await loadSnapshotItems();
    const normalizedItems = snapshotItems
      .map((item) => normalizeOpportunity(item))
      .filter((item): item is OpportunityItem => item !== null);

    const filteredItems = filterItems(normalizedItems, searchParams);
    const sortedItems = sortItems(filteredItems, normalizeSortOrder(searchParams.get("sort")));
    const payload = paginateItems(
      sortedItems,
      parseOffset(searchParams.get("cursor")),
      parseLimit(searchParams.get("limit")),
    );

    return NextResponse.json(payload satisfies OpportunitiesApiPayload);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { items: [], nextCursor: null, hasMore: false, rateLimited: false, retryAfterSeconds: null } satisfies OpportunitiesApiPayload,
      { status: 502 },
    );
  }
}
