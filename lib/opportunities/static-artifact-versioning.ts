export function versionStaticArtifactPath(
  path: string,
  viewToken: string,
): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}snapshot=${encodeURIComponent(viewToken)}`;
}

export function isStaticArtifactOutsideView(params: {
  artifactGeneratedAt: string;
  viewGeneratedAt: string;
}): boolean {
  const artifactTime = Date.parse(params.artifactGeneratedAt);
  const viewTime = Date.parse(params.viewGeneratedAt);

  // The data publisher keeps unchanged shards intact, including their original
  // generatedAt value. An older shard is therefore valid when the current
  // manifest still references it. A newer shard means publication moved ahead
  // of the active manifest and must be retried as a new view.
  return artifactTime > viewTime;
}

export function createStaticArtifactViewToken(params: {
  manifestGeneratedAt: string;
  dataHash: string;
  viewGeneratedAt: string;
  viewNonce: number;
}): string {
  return [
    params.manifestGeneratedAt,
    params.dataHash,
    params.viewGeneratedAt,
    params.viewNonce,
  ].join(":");
}
