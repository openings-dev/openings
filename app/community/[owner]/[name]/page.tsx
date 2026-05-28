import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { getSnapshotCommunityByRepository } from "@/lib/opportunities/communities";
import {
  buildCommunityPath,
  communityRouteSegmentsFromRepository,
  repositoryFromCommunitySegments,
} from "@/lib/opportunities/routing";
import { listSnapshotRepositories } from "@/lib/opportunities/snapshot";
import { loadSafely } from "@/lib/utils/load-safely";

interface CommunityRepositoryPageProps {
  params: Promise<{
    owner: string;
    name: string;
  }>;
}

export const revalidate = 10800;
export const dynamicParams = false;

export async function generateStaticParams() {
  const repositories = await listSnapshotRepositories();
  const params: Array<{ owner: string; name: string }> = [];

  for (const repository of repositories) {
    const segments = communityRouteSegmentsFromRepository(repository);

    if (segments) {
      params.push({ owner: segments.owner, name: segments.name });
    }
  }

  return params;
}

async function resolveCommunityProfile(
  params: CommunityRepositoryPageProps["params"],
) {
  const { owner, name } = await params;
  const repository = repositoryFromCommunitySegments([owner, name]);

  return loadSafely({
    load: () => getSnapshotCommunityByRepository(repository),
    defaultValue: null,
  });
}

export async function generateMetadata({
  params,
}: CommunityRepositoryPageProps): Promise<Metadata> {
  const profile = await resolveCommunityProfile(params);

  if (!profile) {
    return {
      title: "Community jobs | openings.dev",
      description: "Browse technology opportunities from a GitHub community.",
    };
  }

  return {
    title: `${profile.name} jobs | openings.dev`,
    description: `Browse open technology opportunities from ${profile.repository} in a cleaner interface powered by openings.dev.`,
    alternates: {
      canonical: buildCommunityPath(profile.repository),
    },
  };
}

export default async function CommunityRepositoryPage({
  params,
}: CommunityRepositoryPageProps) {
  const profile = await resolveCommunityProfile(params);

  if (!profile) {
    notFound();
  }

  return (
    <OpportunitiesPage
      forcedRepository={profile.repository}
      forcedRepositoryProfile={profile}
    />
  );
}
