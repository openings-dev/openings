import { cache } from "react";
import {
  createSocialCardImage,
  SOCIAL_CARD_CONTENT_TYPE,
  SOCIAL_CARD_SIZE,
} from "@/lib/metadata/social-card";
import { createCommunitySocialCard } from "@/lib/metadata/social-card-presentations";
import { listCommunitySocialCardParams } from "@/lib/metadata/social-card-static-params";
import { getSnapshotCommunityByRepository } from "@/lib/opportunities/communities";
import { repositoryFromCommunitySegments } from "@/lib/opportunities/routing";

interface CommunitySocialImageProps {
  params: Promise<{ owner: string; name: string }>;
}

export const dynamic = "force-static";
export const alt = "Community jobs on openings.dev";
export const size = SOCIAL_CARD_SIZE;
export const contentType = SOCIAL_CARD_CONTENT_TYPE;

const getCommunity = cache(getSnapshotCommunityByRepository);

export async function generateStaticParams(): Promise<
  Array<{ owner: string; name: string }>
> {
  return listCommunitySocialCardParams();
}

async function resolveCommunity(params: CommunitySocialImageProps["params"]) {
  const { owner, name } = await params;
  const repository = repositoryFromCommunitySegments([owner, name]);
  const community = await getCommunity(repository);

  if (!community) {
    throw new Error(
      `Cannot generate a social card for unknown community ${repository}.`,
    );
  }

  return community;
}

export default async function CommunitySocialImage({
  params,
}: CommunitySocialImageProps): Promise<ReturnType<typeof createSocialCardImage>> {
  const community = await resolveCommunity(params);
  return createSocialCardImage(createCommunitySocialCard(community));
}
