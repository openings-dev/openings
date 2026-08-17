const DEFAULT_DATA_BASE_URL =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";
const DEFAULT_DATA_REPOSITORY_BASE_URL =
  "https://raw.githubusercontent.com/openings-dev/data/main";

export function getOpeningsDataBaseUrl() {
  return (
    process.env.OPENINGS_DATA_BASE_URL ||
    process.env.NEXT_PUBLIC_OPENINGS_DATA_BASE_URL ||
    DEFAULT_DATA_BASE_URL
  ).replace(/\/+$/, "");
}

export function openingsDataUrl(path: string) {
  return `${getOpeningsDataBaseUrl()}/${path.replace(/^\/+/, "")}`;
}

export function getOpeningsDataRepositoryBaseUrl() {
  return (
    process.env.OPENINGS_DATA_REPOSITORY_BASE_URL ||
    process.env.NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL ||
    DEFAULT_DATA_REPOSITORY_BASE_URL
  ).replace(/\/+$/, "");
}

export function openingsDataRepositoryUrl(path: string) {
  return `${getOpeningsDataRepositoryBaseUrl()}/${path.replace(/^\/+/, "")}`;
}
