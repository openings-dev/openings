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
      title: "Community jobs",
      description: "Browse technology opportunities from a GitHub community.",
    };
  }

  const title = `Open opportunities from ${profile.name}`;
  const description = `Browse open roles shared by ${profile.name}. Every listing links to its original public GitHub issue.`;
  const canonical = buildCommunityPath(profile.repository);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "openings.dev",
      images: profile.avatarUrl ? [{ url: profile.avatarUrl, alt: profile.name }] : undefined,
    },
    twitter: {
      card: profile.avatarUrl ? "summary" : "summary_large_image",
      title,
      description,
      images: profile.avatarUrl ? [profile.avatarUrl] : undefined,
    },
  };
}

export default async function CommunityRepositoryPage({
  params,
}: CommunityRepositoryPageProps): Promise<React.ReactNode> {
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
