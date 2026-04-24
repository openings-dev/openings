import * as React from "react";
import { openingsDataRepositoryUrl } from "@/lib/opportunities/static-api";

interface RepositoryCatalogEntry {
  repository: string;
  country: string;
  region: string;
}

interface RepositoryCatalogPayload {
  repositories: RepositoryCatalogEntry[];
}

export interface RepositoryFilterRegistry {
  repositories: Set<string>;
  regions: Set<string>;
  countries: Set<string>;
  regionsByCountry: Map<string, Set<string>>;
}

let registryPromise: Promise<RepositoryFilterRegistry> | null = null;

function buildRepositoryFilterRegistry(
  entries: RepositoryCatalogEntry[],
): RepositoryFilterRegistry {
  const repositories = new Set<string>();
  const regions = new Set<string>();
  const countries = new Set<string>();
  const regionsByCountry = new Map<string, Set<string>>();

  for (const entry of entries) {
    if (!entry.repository || !entry.country || !entry.region) continue;

    repositories.add(entry.repository);
    regions.add(entry.region);
    countries.add(entry.country);

    const countryRegions = regionsByCountry.get(entry.country) ?? new Set<string>();
    countryRegions.add(entry.region);
    regionsByCountry.set(entry.country, countryRegions);
  }

  return { repositories, regions, countries, regionsByCountry };
}

async function fetchRepositoryFilterRegistry() {
  const response = await fetch(
    openingsDataRepositoryUrl("src/modules/catalog/repositories.json"),
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to load repository catalog (${response.status})`);
  }

  const payload = (await response.json()) as Partial<RepositoryCatalogPayload>;
  const repositories = Array.isArray(payload.repositories)
    ? payload.repositories
    : [];

  return buildRepositoryFilterRegistry(repositories);
}

export function loadRepositoryFilterRegistry() {
  registryPromise ??= fetchRepositoryFilterRegistry().catch((error) => {
    registryPromise = null;
    throw error;
  });
  return registryPromise;
}

export function useRepositoryFilterRegistry() {
  const [registry, setRegistry] = React.useState<RepositoryFilterRegistry | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isCurrent = true;

    loadRepositoryFilterRegistry()
      .then((nextRegistry) => {
        if (isCurrent) setRegistry(nextRegistry);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { registry, isLoading };
}
