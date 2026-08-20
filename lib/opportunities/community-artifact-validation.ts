import type { StaticCommunities, StaticCommunity } from "./api-types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isHttpUrl(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isTimestamp(value: unknown): value is string {
  return isNonEmptyString(value) && Number.isFinite(Date.parse(value));
}

function isCommunity(value: unknown): value is StaticCommunity {
  if (!isRecord(value)) return false;
  return isNonEmptyString(value.repository) &&
    isHttpUrl(value.repositoryUrl) &&
    isNonEmptyString(value.name) &&
    isHttpUrl(value.avatarUrl) &&
    isNonEmptyString(value.region) &&
    isNonEmptyString(value.country) &&
    isNonEmptyString(value.countryCode) &&
    isNonEmptyString(value.locale) &&
    isNonEmptyString(value.scope) &&
    Number.isInteger(value.opportunitiesCount) &&
    (value.opportunitiesCount as number) >= 0 &&
    (value.lastPostedAt === null || isTimestamp(value.lastPostedAt));
}

function isStaticCommunities(value: unknown): value is StaticCommunities {
  if (!isRecord(value) || !isTimestamp(value.generatedAt) || !Array.isArray(value.items)) {
    return false;
  }
  const repositories = value.items.map((item) =>
    isRecord(item) && isNonEmptyString(item.repository)
      ? item.repository.toLowerCase()
      : ""
  );
  return value.items.every(isCommunity) &&
    repositories.every(Boolean) &&
    new Set(repositories).size === repositories.length;
}

export function parseStaticCommunities(
  value: unknown,
  path: string,
): StaticCommunities {
  if (!isStaticCommunities(value)) {
    throw new Error(`Invalid static opportunity communities at ${path}`);
  }
  return value;
}
