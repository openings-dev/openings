export interface FetchJsonOptions {
  cache?: RequestCache;
  signal?: AbortSignal;
}

export async function fetchJson(
  url: string,
  options: FetchJsonOptions = {},
): Promise<unknown> {
  const response = await fetch(url, {
    cache: options.cache,
    headers: { Accept: "application/json" },
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`Public data request failed (${response.status}) at ${url}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`Public data response was not valid JSON at ${url}`);
  }
}
