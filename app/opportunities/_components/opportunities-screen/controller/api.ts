import type { OpportunityFiltersState, OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

export interface OpportunitiesApiPayload {
  items: OpportunityItem[];
  nextCursor: string | null;
  hasMore: boolean;
  rateLimited: boolean;
  retryAfterSeconds: number | null;
}

export function buildApiUrl(
  filters: Pick<OpportunityFiltersState, "repository" | "region" | "country" | "sortOrder">,
  cursor: string | null,
  limit: number,
) {
  const params = new URLSearchParams();

  if (filters.repository !== "all") params.set("repository", filters.repository);
  if (filters.region !== "all") params.set("region", filters.region);
  if (filters.country !== "all") params.set("country", filters.country);
  if (filters.sortOrder !== "recent") params.set("sort", filters.sortOrder);
  if (cursor) params.set("cursor", cursor);
  params.set("limit", String(limit));

  const query = params.toString();
  return query ? `/api/opportunities?${query}` : "/api/opportunities";
}

export function parseApiPayload(payload: unknown): OpportunitiesApiPayload {
  if (!payload || typeof payload !== "object") {
    return { items: [], nextCursor: null, hasMore: false, rateLimited: false, retryAfterSeconds: null };
  }

  const data = payload as Partial<OpportunitiesApiPayload>;
  const retryAfterSeconds =
    typeof data.retryAfterSeconds === "number" && Number.isFinite(data.retryAfterSeconds) && data.retryAfterSeconds > 0
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

export async function fetchOpportunitiesPage(
  filters: Pick<OpportunityFiltersState, "repository" | "region" | "country" | "sortOrder">,
  params: { cursor: string | null; limit: number; signal?: AbortSignal },
) {
  const response = await fetch(buildApiUrl(filters, params.cursor, params.limit), {
    cache: "force-cache",
    signal: params.signal,
  });
  const payload = parseApiPayload(await response.json().catch(() => null));

  if (response.status === 429 || payload.rateLimited) {
    return { ...payload, rateLimited: true };
  }

  if (!response.ok) {
    throw new Error(`Failed to load opportunities (${response.status})`);
  }

  return payload;
}
