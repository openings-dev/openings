import { cache } from "react";
import {
  createSocialCardImage,
  SOCIAL_CARD_CONTENT_TYPE,
  SOCIAL_CARD_SIZE,
} from "@/lib/metadata/social-card";
import { createCommunitySocialCard } from "@/lib/metadata/social-card-presentations";
import { getSnapshotCommunityByRepository } from "@/lib/opportunities/communities";
import { repositoryFromCommunitySegments } from "@/lib/opportunities/routing";

interface CommunitySocialImageProps {
  params: Promise<{ owner: string; name: string }>;
}

export const dynamic = "force-static";

const getCommunity = cache(getSnapshotCommunityByRepository);

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

export async function generateImageMetadata({
  params,
}: CommunitySocialImageProps) {
  const community = await resolveCommunity(params);

  return [
    {
      id: "primary",
      alt: `${community.name} community jobs on openings.dev`,
      size: SOCIAL_CARD_SIZE,
      contentType: SOCIAL_CARD_CONTENT_TYPE,
    },
  ];
}

export default async function CommunitySocialImage({
  params,
}: CommunitySocialImageProps): Promise<ReturnType<typeof createSocialCardImage>> {
  const community = await resolveCommunity(params);
  return createSocialCardImage(createCommunitySocialCard(community));
}
