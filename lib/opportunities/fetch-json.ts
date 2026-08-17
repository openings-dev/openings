export interface FetchJsonOptions {
  cache?: RequestCache;
  signal?: AbortSignal;
  allowedUrlPrefix?: string;
}

function urlIsWithinPrefix(url: string, prefix: string): boolean {
  const candidate = new URL(url);
  const allowed = new URL(prefix);
  return candidate.origin === allowed.origin &&
    candidate.pathname.startsWith(allowed.pathname);
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

  if (
    options.allowedUrlPrefix &&
    !urlIsWithinPrefix(response.url || url, options.allowedUrlPrefix)
  ) {
    throw new Error(`Public data request left its allowed origin or path at ${url}`);
  }

  if (!response.ok) {
    throw new Error(`Public data request failed (${response.status}) at ${url}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`Public data response was not valid JSON at ${url}`);
  }
}
