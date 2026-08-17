import { DirectoryEmptyReason } from "./types";

interface ResolveDirectoryEmptyReasonParams {
  sourceUnavailable: boolean;
  sourceCount: number;
  visibleCount: number;
  queryMatchCount: number;
  geographyMatchCount: number;
  hasQuery: boolean;
  hasGeography: boolean;
}

export function resolveDirectoryEmptyReason({
  sourceUnavailable,
  sourceCount,
  visibleCount,
  queryMatchCount,
  geographyMatchCount,
  hasQuery,
  hasGeography,
}: ResolveDirectoryEmptyReasonParams) {
  if (sourceUnavailable) return DirectoryEmptyReason.Unavailable;
  if (sourceCount === 0) return DirectoryEmptyReason.Source;
  if (visibleCount > 0) return DirectoryEmptyReason.Source;

  // A query with no global match is causal even when geography is also empty.
  if (hasQuery && queryMatchCount === 0) return DirectoryEmptyReason.Query;
  if (hasGeography && geographyMatchCount === 0) {
    return DirectoryEmptyReason.Geography;
  }
  if (hasQuery && hasGeography) return DirectoryEmptyReason.Combined;
  if (hasQuery) return DirectoryEmptyReason.Query;
  if (hasGeography) return DirectoryEmptyReason.Geography;
  return DirectoryEmptyReason.Source;
}
