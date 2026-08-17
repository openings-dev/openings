import {
  ShareableProfileKind,
  type OpportunitiesScreenProps,
  type ShareableProfileScope,
  type ShareableProfileSource,
} from "@/app/opportunities/_components/opportunities-screen/types";

export function profileScreenPropsFromSource(
  source: ShareableProfileSource,
): OpportunitiesScreenProps {
  if (source.kind === ShareableProfileKind.Community) {
    return {
      forcedRepository: source.profile.repository,
      showHeader: false,
    };
  }

  return {
    forcedAuthor: source.profile.handle,
    showHeader: false,
  };
}

export function profileScopeFromScreenProps(
  forcedRepository: string | null,
  forcedAuthor: string | null,
): ShareableProfileScope | null {
  if (forcedAuthor) {
    return {
      kind: ShareableProfileKind.Publisher,
      identity: `@${forcedAuthor}`,
    };
  }

  if (forcedRepository) {
    return {
      kind: ShareableProfileKind.Community,
      identity: forcedRepository,
    };
  }

  return null;
}

export function normalizeSelectedOpportunityId(id: string | null): string | null {
  return id?.trim() || null;
}
