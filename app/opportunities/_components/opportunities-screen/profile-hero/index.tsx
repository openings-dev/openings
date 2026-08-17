"use client";

import {
  ArrowDown,
  BriefcaseBusiness,
  Clock3,
  ExternalLink,
  MapPin,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { GithubIcon } from "@/components/icons/github";
import { buildShareableProfilePresentation } from "@/app/opportunities/_components/opportunities-screen/controller/profile-header";
import { ShareableProfileKind } from "@/app/opportunities/_components/opportunities-screen/types";
import { formatLocationSegments } from "@/lib/opportunities/summary-helpers";
import { formatTemplate } from "@/lib/utils/format-template";
import { resolvePublicSiteUrl } from "@/lib/metadata/site-metadata";
import type { ProfileHeroProps } from "./types";

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export function ProfileHero({
  source,
  headingLevel = 1,
  specimenMode = false,
}: ProfileHeroProps): React.ReactNode {
  const { locale, messages } = useI18n();
  const copy = messages.profiles;
  const profile = buildShareableProfilePresentation(source, copy);
  const isCommunity = profile.kind === ShareableProfileKind.Community;
  const eyebrow = isCommunity
    ? copy.communityEyebrow
    : copy.publisherEyebrow;
  const opportunitySummary = profile.opportunityCount === 1
    ? copy.openRoleSingular
    : copy.openRolesPlural;
  const locationSummary = profile.location
    ? formatLocationSegments([
        profile.location.region,
        profile.location.country,
      ]) || null
    : null;
  const latestActivityDate = profile.latestActivity
    ? new Date(profile.latestActivity)
    : null;
  const latestActivitySummary = latestActivityDate
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(latestActivityDate)
    : null;
  const shareText = formatTemplate(
    isCommunity ? copy.shareCommunityText : copy.sharePublisherText,
    isCommunity
      ? { name: profile.displayName }
      : { handle: profile.handle },
  );

  const copyCanonicalUrl = async (canonicalUrl: string) => {
    await navigator.clipboard.writeText(canonicalUrl);
    toast.success(copy.shareCopied);
  };

  const handleShare = async () => {
    const canonicalUrl = resolvePublicSiteUrl(profile.canonicalPath);

    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.displayName,
          text: shareText,
          url: canonicalUrl,
        });
        toast.success(copy.shareShared);
        return;
      } catch (error) {
        if (isAbortError(error)) return;
      }
    }

    try {
      await copyCanonicalUrl(canonicalUrl);
    } catch {
      toast.error(copy.shareFailed);
    }
  };
  const Heading = headingLevel === 3 ? "h3" : "h1";

  return (
    <section className="border-b border-line bg-background">
      <div className="mx-auto grid w-full max-w-[90rem] gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16 xl:px-10">
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <Avatar
              src={profile.avatarUrl}
              fallback={profile.displayName || profile.identity}
              width={80}
              height={80}
              loading="eager"
              className="size-16 border-primary/20 bg-primary-soft text-3xl sm:size-20 sm:text-4xl"
            />

            <div className="min-w-0">
              <Badge tone="primary" size="compact">
                {eyebrow}
              </Badge>
              <Heading className="font-display mt-3 text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
                {profile.displayName}
              </Heading>
              <p className="font-mono mt-1.5 [overflow-wrap:anywhere] text-sm text-muted-foreground sm:text-base">
                {profile.identity}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {profile.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {specimenMode ? (
              <>
                <Button type="button" disabled className="w-full whitespace-normal text-center sm:w-auto">
                  {copy.seeOpenRoles}
                  <ArrowDown aria-hidden="true" />
                </Button>
                <Button type="button" disabled variant="secondary" className="w-full whitespace-normal text-center sm:w-auto">
                  <Share2 aria-hidden="true" />
                  {copy.shareProfile}
                </Button>
                <Button type="button" disabled variant="outline" className="w-full whitespace-normal text-center sm:w-auto">
                  <GithubIcon aria-hidden="true" />
                  {isCommunity
                    ? copy.openCommunityOnGitHub
                    : copy.openPublisherOnGitHub}
                  <ExternalLink aria-hidden="true" />
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full whitespace-normal text-center sm:w-auto">
                  <a href="#opportunity-results">
                    {copy.seeOpenRoles}
                    <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
                <Button type="button" variant="secondary" className="w-full whitespace-normal text-center sm:w-auto" onClick={handleShare}>
                  <Share2 aria-hidden="true" />
                  {copy.shareProfile}
                </Button>
                <Button asChild variant="outline" className="w-full whitespace-normal text-center sm:w-auto">
                  <a
                    href={profile.githubSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon aria-hidden="true" />
                    {isCommunity
                      ? copy.openCommunityOnGitHub
                      : copy.openPublisherOnGitHub}
                    <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>

        <aside className="rounded-card border border-line bg-surface-muted/70 p-5 sm:p-6 lg:col-span-5 xl:col-span-4">
          <p className="mb-4 text-xs leading-5 text-muted-foreground">
            {copy.summaryScope}
          </p>
          <div className="border-b border-line pb-5">
            <BriefcaseBusiness
              className="size-5 text-primary-deep"
              aria-hidden="true"
            />
            <p className="font-editorial mt-3 text-4xl leading-none text-primary-deep sm:text-5xl">
              {profile.opportunityCount.toLocaleString(locale)}
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {opportunitySummary}
            </p>
          </div>

          <dl className="mt-5 space-y-4 text-sm">
            {locationSummary ? (
              <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2">
                <MapPin className="mt-0.5 size-4 text-primary-deep" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {copy.locationLabel}
                  </dt>
                  <dd className="mt-0.5 [overflow-wrap:anywhere] font-medium text-foreground">
                    {locationSummary}
                  </dd>
                </div>
              </div>
            ) : null}

            {latestActivitySummary && profile.latestActivity ? (
              <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2">
                <Clock3 className="mt-0.5 size-4 text-primary-deep" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {copy.latestActivityLabel}
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    <time dateTime={profile.latestActivity}>
                      {latestActivitySummary}
                    </time>
                  </dd>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2">
              <GithubIcon className="mt-0.5 size-4 text-primary-deep" aria-hidden="true" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {copy.publicSourceLabel}
                </dt>
                <dd className="mt-0.5 font-medium text-foreground">GitHub</dd>
              </div>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
