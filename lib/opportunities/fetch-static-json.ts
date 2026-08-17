import { openingsDataUrl } from "./data-source";
import { fetchJson } from "./fetch-json";

export async function fetchStaticJson(
  path: string,
  options: { cache?: RequestCache } = {},
): Promise<unknown> {
  const url = openingsDataUrl(path);
  const cache = options.cache ?? "force-cache";
  return fetchJson(url, { cache });
}
