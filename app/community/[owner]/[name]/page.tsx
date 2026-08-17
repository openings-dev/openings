import type { Metadata } from "next";
import { LegacyRouteRedirect } from "@/app/_components/legacy-route-redirect";
import { createLegacyRouteMetadata } from "@/lib/metadata/legacy-route-metadata";
import { listSnapshotCommunities } from "@/lib/opportunities/communities";
import {
  buildCommunityPath,
  communityRouteSegmentsFromRepository,
  repositoryFromCommunitySegments,
} from "@/lib/opportunities/routing";

interface LegacyCommunityPageProps {
  params: Promise<{ owner: string; name: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const communities = await listSnapshotCommunities();
  const params: Array<{ owner: string; name: string }> = [];

  for (const community of communities) {
    const segments = communityRouteSegmentsFromRepository(community.repository);
    if (segments) params.push({ owner: segments.owner, name: segments.name });
  }

  return params;
}

async function resolveDestination(params: LegacyCommunityPageProps["params"]) {
  const { owner, name } = await params;
  return buildCommunityPath(
    repositoryFromCommunitySegments([owner, name]),
  );
}

export async function generateMetadata({
  params,
}: LegacyCommunityPageProps): Promise<Metadata> {
  return createLegacyRouteMetadata(await resolveDestination(params));
}

export default async function LegacyCommunityPage({
  params,
}: LegacyCommunityPageProps): Promise<React.ReactNode> {
  return <LegacyRouteRedirect destinationPath={await resolveDestination(params)} />;
}
