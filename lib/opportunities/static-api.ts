const DEFAULT_DATA_BASE_URL =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";
const DEFAULT_DATA_REPOSITORY_BASE_URL =
  "https://raw.githubusercontent.com/openings-dev/data/main";

export function getOpeningsDataBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_OPENINGS_DATA_BASE_URL ||
    process.env.OPENINGS_DATA_BASE_URL ||
    DEFAULT_DATA_BASE_URL
  ).replace(/\/+$/, "");
}

export function openingsDataUrl(path: string) {
  return `${getOpeningsDataBaseUrl()}/${path.replace(/^\/+/, "")}`;
}

export function getOpeningsDataRepositoryBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL ||
    process.env.OPENINGS_DATA_REPOSITORY_BASE_URL ||
    DEFAULT_DATA_REPOSITORY_BASE_URL
  ).replace(/\/+$/, "");
}

export function openingsDataRepositoryUrl(path: string) {
  return `${getOpeningsDataRepositoryBaseUrl()}/${path.replace(/^\/+/, "")}`;
}

export async function listStaticOpportunityIds(): Promise<string[]> {
  const response = await fetch(openingsDataUrl("api/job-ids.json"), {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to load static opportunity ids (${response.status})`);
  }

  const payload = await response.json().catch(() => null);
  const ids = Array.isArray(payload?.ids) ? payload.ids : [];
  return ids.filter((id: unknown): id is string => typeof id === "string" && Boolean(id.trim()));
}
