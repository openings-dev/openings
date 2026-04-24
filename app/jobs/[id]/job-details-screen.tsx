"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/providers/i18n-provider";
import { buildCommunityPath, buildUserPath } from "@/lib/opportunities/routing";
import { cn } from "@/lib/utils/tailwind";
import { formatSalary } from "@/app/opportunities/_components/opportunities-screen/shared/format-salary";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import { fetchOpportunityById } from "@/app/opportunities/_components/opportunities-screen/controller/api";
import { opportunitiesScreenStyles, panelStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { DrawerAction } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer/drawer-action";
import { DrawerIdentities } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer/drawer-identities";
import { DrawerMetadata } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer/drawer-metadata";
import { DrawerTags } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer/drawer-tags";
import { OpportunityMarkdown } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer/opportunity-markdown";
import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

interface JobDetailsScreenProps {
  id: string;
}

export function JobDetailsScreen({ id }: JobDetailsScreenProps) {
  const router = useRouter();
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const listMessages = messages.opportunities.list;
  const [loadState, setLoadState] = React.useState<{
    id: string;
    status: "loading" | "ready" | "error";
    item: OpportunityItem | null;
  }>({ id: "", status: "loading", item: null });
  const dateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }),
    [locale],
  );
  const shareUrl = React.useMemo(() => {
    if (typeof window === "undefined") return `/jobs/${id}`;
    return new URL(`/jobs/${id}`, window.location.origin).toString();
  }, [id]);

  React.useEffect(() => {
    let cancelled = false;
    fetchOpportunityById(id)
      .then((nextItem) => {
        if (!cancelled) {
          setLoadState({ id, status: "ready", item: nextItem });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadState({ id, status: "error", item: null });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const item = loadState.id === id ? loadState.item : null;
  const isLoading = loadState.id !== id || loadState.status === "loading";
  const hasError = loadState.id === id && loadState.status === "error";
  const salaryLabel = formatSalary(item?.salary, locale, {
    month: cardMessages.salaryPeriodMonth,
    year: cardMessages.salaryPeriodYear,
    hour: cardMessages.salaryPeriodHour,
  });
  const postedAt = item
    ? formatTemplate(cardMessages.postedAt, { date: dateFormatter.format(new Date(item.createdAt)) })
    : "";
  const updatedAt = item
    ? formatTemplate(cardMessages.updatedAt, { date: dateFormatter.format(new Date(item.updatedAt)) })
    : "";

  return (
    <section className={cn(opportunitiesScreenStyles(), "pb-16")}>
      <div className={cn(panelStyles(), "mx-auto max-w-4xl space-y-5 p-5 sm:p-6")}>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-5 w-36 animate-pulse rounded bg-muted" />
            <div className="h-9 w-4/5 animate-pulse rounded bg-muted/80" />
            <div className="h-32 animate-pulse rounded bg-muted/70" />
          </div>
        ) : !item || hasError ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">{listMessages.noResultsTitle}</p>
            <p className="text-sm text-muted-foreground">{messages.opportunities.feedback.loadError}</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-primary">
                {cardMessages.detailsLabel}
              </p>
              <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                {item.title}
              </h1>
            </div>
            <DrawerIdentities
              item={item}
              communityAvatarAltTemplate={cardMessages.communityAvatarAlt}
              authorAvatarAltTemplate={cardMessages.authorAvatarAlt}
              onCommunitySelect={(repository) => router.push(buildCommunityPath(repository))}
              onAuthorSelect={(handle) => router.push(buildUserPath(handle))}
            />
            <DrawerAction
              openOriginalLabel={cardMessages.openOriginal}
              shareLabel={cardMessages.share}
              shareCopiedLabel={cardMessages.shareCopied}
              shareFailedLabel={cardMessages.shareFailed}
              shareUrl={shareUrl}
              url={item.url}
            />
            <DrawerTags tags={item.tags} />
            <OpportunityMarkdown body={item.description} />
            <DrawerMetadata
              postedAt={postedAt}
              updatedAt={updatedAt}
              repository={item.community.repository}
              country={item.country}
              companyName={item.companyName}
              salaryLabel={salaryLabel}
            />
          </>
        )}
      </div>
    </section>
  );
}
