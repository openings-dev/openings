function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeAuthorHandle(handle: string) {
  return handle.trim().replace(/^@+/, "");
}

function buildHomePathWithParam(key: string, value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return "/";
  }

  const params = new URLSearchParams({ [key]: normalized });
  return `/?${params.toString()}`;
}

export function buildOpportunityPath(id: string) {
  return buildHomePathWithParam("job", id);
}

export function buildCommunityPath(repository: string) {
  return buildHomePathWithParam("repository", repository);
}

export function buildUserPath(handle: string) {
  const normalized = normalizeAuthorHandle(handle);

  return buildHomePathWithParam("authors", normalized);
}

export function repositoryFromCommunitySegments(segments: string[]) {
  return segments.map((segment) => safeDecode(segment)).join("/");
}

export function authorHandleFromRoute(handle: string) {
  return normalizeAuthorHandle(safeDecode(handle));
}
