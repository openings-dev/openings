import {
  loadOpportunityJobIds,
  loadOpportunityManifest,
  withStaticArtifactRecovery,
} from "./static-artifacts";

export {
  getOpeningsDataBaseUrl,
  getOpeningsDataRepositoryBaseUrl,
  openingsDataRepositoryUrl,
  openingsDataUrl,
} from "./data-source";

export async function listStaticOpportunityIds(): Promise<string[]> {
  return withStaticArtifactRecovery(async () => {
    const manifest = await loadOpportunityManifest();
    return loadOpportunityJobIds(manifest);
  });
}
