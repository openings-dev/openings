import { openingsDataUrl } from "./static-api";
import { fetchJson } from "./fetch-json";

const JSON_CACHE = new Map<string, Promise<unknown>>();

export async function fetchStaticJson<T>(
  path: string,
  options: { cache?: RequestCache } = {},
): Promise<T> {
  const url = openingsDataUrl(path);
  const cache = options.cache ?? "force-cache";
  const cacheKey = `${cache}:${url}`;
  const cached = JSON_CACHE.get(cacheKey);
  if (cached) return cached as Promise<T>;

  const request = fetchJson(url, { cache });
  JSON_CACHE.set(cacheKey, request);
  request.catch(() => {
    if (JSON_CACHE.get(cacheKey) === request) JSON_CACHE.delete(cacheKey);
  });
  return request as Promise<T>;
}
