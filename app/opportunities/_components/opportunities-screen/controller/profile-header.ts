import type { LocaleCode } from "@/lib/constants/locales";
import type {
  CommunityProfileSummary,
  UserProfileSummary,
} from "@/lib/opportunities/types";
import { formatTemplate } from "@/lib/utils/format-template";

export interface ProfileHeaderData {
  title: string;
  subtitle: string;
  avatarUrl: string;
  opportunitiesSummary: string;
  locationSummary: string;
  lastPostedSummary: string;
}

interface ProfileHeaderLabels {
  opportunitiesCount: string;
  country: string;
  region: string;
  postedAt: string;
  updatedUnavailable: string;
}

function formatLastPostedAt(
  lastPostedAt: string | null,
  locale: LocaleCode,
  labels: ProfileHeaderLabels,
) {
  if (!lastPostedAt) return labels.updatedUnavailable;
  return formatTemplate(labels.postedAt, {
    date: new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(lastPostedAt),
    ),
  });
}

function formatSharedProfileFields(
  profile: CommunityProfileSummary | UserProfileSummary,
  locale: LocaleCode,
  labels: ProfileHeaderLabels,
) {
  return {
    avatarUrl: profile.avatarUrl,
    opportunitiesSummary: formatTemplate(labels.opportunitiesCount, {
      count: profile.opportunitiesCount.toLocaleString(locale),
    }),
    locationSummary: `${labels.country}: ${profile.country} • ${labels.region}: ${profile.region}`,
    lastPostedSummary: formatLastPostedAt(profile.lastPostedAt, locale, labels),
  };
}

export function buildUserProfileHeader(
  profile: UserProfileSummary,
  locale: LocaleCode,
  labels: ProfileHeaderLabels,
): ProfileHeaderData {
  return {
    title: profile.name,
    subtitle: `@${profile.handle}`,
    ...formatSharedProfileFields(profile, locale, labels),
  };
}

export function buildCommunityProfileHeader(
  profile: CommunityProfileSummary,
  locale: LocaleCode,
  labels: ProfileHeaderLabels,
): ProfileHeaderData {
  return {
    title: profile.name,
    subtitle: profile.repository,
    ...formatSharedProfileFields(profile, locale, labels),
  };
}
