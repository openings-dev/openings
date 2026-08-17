import { PUBLIC_ROUTES } from "@/lib/navigation/routes";

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

export function communityRouteSegmentsFromRepository(repository: string) {
  const [owner, name] = repository.trim().split("/");

  if (!owner || !name) {
    return null;
  }

  return {
    owner,
    name,
    encodedOwner: encodeURIComponent(owner),
    encodedName: encodeURIComponent(name),
  };
}

export function buildOpportunityPath(id: string) {
  const normalized = id.trim();
  return normalized ? `/jobs/${encodeURIComponent(normalized)}` : "/";
}

export function buildCommunityPath(repository: string) {
  const segments = communityRouteSegmentsFromRepository(repository);

  if (!segments) {
    return buildHomePathWithParam("repository", repository);
  }

  const { encodedOwner, encodedName } = segments;
  return `${PUBLIC_ROUTES.communities}/${encodedOwner}/${encodedName}`;
}

export function buildUserPath(handle: string) {
  const normalized = normalizeAuthorHandle(handle);

  return normalized
    ? `${PUBLIC_ROUTES.authors}/${encodeURIComponent(normalized)}`
    : PUBLIC_ROUTES.authors;
}

export function buildGitHubRepositoryUrl(repository: string) {
  const segments = communityRouteSegmentsFromRepository(repository);

  if (!segments) {
    return "https://github.com";
  }

  return `https://github.com/${segments.encodedOwner}/${segments.encodedName}`;
}

export function buildGitHubUserUrl(handle: string) {
  const normalized = normalizeAuthorHandle(handle);

  return normalized
    ? `https://github.com/${encodeURIComponent(normalized)}`
    : "https://github.com";
}

export function repositoryFromCommunitySegments(segments: string[]) {
  return segments.map((segment) => safeDecode(segment)).join("/");
}

export function authorHandleFromRoute(handle: string) {
  return normalizeAuthorHandle(safeDecode(handle));
}
