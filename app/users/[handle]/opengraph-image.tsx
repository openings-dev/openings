import { cache } from "react";
import {
  createSocialCardImage,
  SOCIAL_CARD_CONTENT_TYPE,
  SOCIAL_CARD_SIZE,
} from "@/lib/metadata/social-card";
import { createAuthorSocialCard } from "@/lib/metadata/social-card-presentations";
import {
  authorHandleFromRoute,
} from "@/lib/opportunities/routing";
import { getSnapshotUserByHandle } from "@/lib/opportunities/users";

interface AuthorSocialImageProps {
  params: Promise<{ handle: string }>;
}

export const dynamic = "force-static";

const getAuthor = cache(getSnapshotUserByHandle);

async function resolveAuthor(params: AuthorSocialImageProps["params"]) {
  const { handle: routeHandle } = await params;
  const handle = authorHandleFromRoute(routeHandle);
  const author = await getAuthor(handle);

  if (!author) {
    throw new Error(
      `Cannot generate a social card for unknown GitHub author ${handle}.`,
    );
  }

  return author;
}

export async function generateImageMetadata({
  params,
}: AuthorSocialImageProps) {
  const author = await resolveAuthor(params);

  return [
    {
      id: "primary",
      alt: `${author.name} (@${author.handle}) — Open jobs on openings.dev`,
      size: SOCIAL_CARD_SIZE,
      contentType: SOCIAL_CARD_CONTENT_TYPE,
    },
  ];
}

export default async function AuthorSocialImage({
  params,
}: AuthorSocialImageProps): Promise<ReturnType<typeof createSocialCardImage>> {
  const author = await resolveAuthor(params);
  return createSocialCardImage(createAuthorSocialCard(author));
}
