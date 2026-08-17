import {
  buildCommunityPath,
  buildGitHubRepositoryUrl,
  buildGitHubUserUrl,
  buildUserPath,
} from "@/lib/opportunities/routing";
import type { TranslationMessages } from "@/lib/translations/types";
import { uniqueLocationSegments } from "@/lib/opportunities/summary-helpers";
import { formatTemplate } from "@/lib/utils/format-template";
import {
  ShareableProfileKind,
  type ShareableProfileLocation,
  type ShareableProfilePresentation,
  type ShareableProfileSource,
} from "@/app/opportunities/_components/opportunities-screen/types";

type ProfileMessages = TranslationMessages["profiles"];

function optionalText(value: string | null | undefined) {
  return value?.trim() || undefined;
}

function optionalActivity(value: string | null | undefined) {
  const normalized = optionalText(value);
  if (!normalized) return undefined;

  const timestamp = Date.parse(normalized);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
}

function optionalLocation(
  countryValue: string | undefined,
  regionValue: string | undefined,
): ShareableProfileLocation | undefined {
  const [country] = uniqueLocationSegments([countryValue]);
  const [regionValueNormalized] = uniqueLocationSegments([regionValue]);
  const distinctSegments = uniqueLocationSegments([
    country,
    regionValueNormalized,
  ]);
  const region = regionValueNormalized &&
    (!country || distinctSegments.length > 1)
    ? regionValueNormalized
    : undefined;

  if (!country && !region) return undefined;
  return {
    ...(country ? { country } : {}),
    ...(region ? { region } : {}),
  };
}

export function buildShareableProfilePresentation(
  source: ShareableProfileSource,
  messages: ProfileMessages,
): ShareableProfilePresentation {
  const shared = {
    avatarUrl: optionalText(source.profile.avatarUrl),
    location: optionalLocation(source.profile.country, source.profile.region),
    opportunityCount: source.profile.opportunitiesCount,
    latestActivity: optionalActivity(source.profile.lastPostedAt),
  };

  if (source.kind === ShareableProfileKind.Community) {
    const profile = source.profile;
    return {
      kind: ShareableProfileKind.Community,
      repository: profile.repository,
      displayName: profile.name,
      identity: profile.repository,
      description: formatTemplate(messages.communityDescription, {
        name: profile.name,
      }),
      canonicalPath: buildCommunityPath(profile.repository),
      githubSourceUrl: buildGitHubRepositoryUrl(profile.repository),
      ...shared,
    };
  }

  const profile = source.profile;
  return {
    kind: ShareableProfileKind.Publisher,
    handle: profile.handle,
    displayName: profile.name,
    identity: `@${profile.handle}`,
    description: formatTemplate(messages.publisherDescription, {
      handle: profile.handle,
    }),
    canonicalPath: buildUserPath(profile.handle),
    githubSourceUrl: buildGitHubUserUrl(profile.handle),
    ...shared,
  };
}
