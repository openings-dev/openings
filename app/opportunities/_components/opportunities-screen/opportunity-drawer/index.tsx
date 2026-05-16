"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { buildOpportunityPath } from "@/lib/opportunities/routing";
import { formatSalary } from "@/app/opportunities/_components/opportunities-screen/shared/format-salary";
import { formatTemplate } from "@/lib/utils/format-template";
import { panelStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { cn } from "@/lib/utils/tailwind";
import type { OpportunityDrawerProps } from "@/app/opportunities/_components/opportunities-screen/types";
import { DrawerAction } from "./drawer-action";
import { DrawerHeader } from "./drawer-header";
import { DrawerIdentities } from "./drawer-identities";
import { DrawerMetadata } from "./drawer-metadata";
import { DrawerMobileSheet } from "./drawer-mobile-sheet";
import { DrawerTags } from "./drawer-tags";
import { OpportunityMarkdown } from "./opportunity-markdown";

export function OpportunityDrawer({
  item,
  open,
  onClose,
  onCommunitySelect,
  onAuthorSelect,
}: OpportunityDrawerProps) {
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const dateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }),
    [locale],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);
  const shareUrl = React.useMemo(() => {
    if (!item) return "";
    const path = buildOpportunityPath(item.id);
    if (typeof window === "undefined") return path;
    return new URL(path, window.location.origin).toString();
  }, [item]);

  if (!open || !item) return null;

  const salaryLabel = formatSalary(item.salary, locale, {
    month: cardMessages.salaryPeriodMonth,
    year: cardMessages.salaryPeriodYear,
    hour: cardMessages.salaryPeriodHour,
  });
  const postedAt = formatTemplate(cardMessages.postedAt, {
    date: dateFormatter.format(new Date(item.createdAt)),
  });
  const updatedAt = formatTemplate(cardMessages.updatedAt, {
    date: dateFormatter.format(new Date(item.updatedAt)),
  });
  const content = (
    <div className="flex h-full flex-col">
      <DrawerHeader title={item.title} detailsLabel={cardMessages.detailsLabel} closeLabel={cardMessages.closeDetails} onClose={onClose} />
      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <DrawerIdentities
          item={item}
          communityAvatarAltTemplate={cardMessages.communityAvatarAlt}
          authorAvatarAltTemplate={cardMessages.authorAvatarAlt}
          onCommunitySelect={onCommunitySelect}
          onAuthorSelect={onAuthorSelect}
        />
        <DrawerTags tags={item.tags} />
        <OpportunityMarkdown body={item.description} />
        <DrawerMetadata postedAt={postedAt} updatedAt={updatedAt} repository={item.community.repository} country={item.country} companyName={item.companyName} salaryLabel={salaryLabel} />
      </div>
      <DrawerAction
        openOriginalLabel={cardMessages.openOriginal}
        shareLabel={cardMessages.share}
        shareCopiedLabel={cardMessages.shareCopied}
        shareFailedLabel={cardMessages.shareFailed}
        shareUrl={shareUrl}
        url={item.url}
        className="border-t border-border/70 bg-card/58 px-4 py-4"
      />
    </div>
  );

  return (
    <>
      <aside className={cn(panelStyles(), "hidden overflow-hidden p-0 lg:sticky lg:top-20 lg:block lg:max-h-[calc(100dvh-6rem)]")}>
        {content}
      </aside>
      <DrawerMobileSheet open={open} closeLabel={cardMessages.closeDetails} onClose={onClose}>
        {content}
      </DrawerMobileSheet>
    </>
  );
}
