import type { Metadata } from "next";
import type { CommunitySummary } from "@/lib/opportunities/communities";
import type { UserSummary } from "@/lib/opportunities/users";
import {
  createPageMetadata,
  DEFAULT_SOCIAL_IMAGE,
  DEFAULT_TWITTER_IMAGE,
} from "./site-metadata";

interface ProfileMetadataImage {
  url: string;
  alt: string;
}

function profileImage(
  avatarUrl: string | null | undefined,
  alt: string,
): ProfileMetadataImage | null {
  if (!avatarUrl) return null;

  try {
    const url = new URL(avatarUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return { url: url.toString(), alt };
  } catch {
    return null;
  }
}

function withProfileImage(
  metadata: Metadata,
  image: ProfileMetadataImage | null,
): Metadata {
  if (!image) return metadata;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [DEFAULT_SOCIAL_IMAGE, image],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

interface CommunityProfileMetadataParams {
  profile: CommunitySummary | null;
  repository: string;
  path: string;
}

export function createCommunityProfileMetadata({
  profile,
  repository,
  path,
}: CommunityProfileMetadataParams): Metadata {
  const identity = profile?.name ?? repository;
  const metadata = createPageMetadata({
    title: profile
      ? `Jobs shared through ${profile.name} — ${profile.repository}`
      : `Community profile: ${identity}`,
    description: profile
      ? `Browse open jobs shared through ${profile.name}. Each listing links to its original public source.`
      : `This community profile is unavailable. Browse current jobs on openings.dev instead.`,
    path,
  });

  return withProfileImage(
    metadata,
    profileImage(profile?.avatarUrl, `${identity} avatar`),
  );
}

interface PublisherProfileMetadataParams {
  profile: UserSummary | null;
  handle: string;
  path: string;
}

export function createPublisherProfileMetadata({
  profile,
  handle,
  path,
}: PublisherProfileMetadataParams): Metadata {
  const displayName = profile?.name ?? `@${handle}`;
  const metadata = createPageMetadata({
    title: profile
      ? `Jobs shared by ${profile.name} (@${profile.handle})`
      : `GitHub author profile: @${handle}`,
    description: profile
      ? `Browse open jobs authored by @${profile.handle} across public GitHub community repositories.`
      : `This GitHub author profile is unavailable. Browse current jobs on openings.dev instead.`,
    path,
  });

  return withProfileImage(
    metadata,
    profileImage(profile?.avatarUrl, `${displayName} avatar`),
  );
}
