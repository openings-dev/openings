"use client";

import * as React from "react";
import { LoaderCircle, X } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { Button } from "@/components/ui/button";
import { buildOpportunityPath } from "@/lib/opportunities/routing";
import { resolvePublicSiteUrl } from "@/lib/metadata/site-metadata";
import { formatSalary } from "@/app/opportunities/_components/opportunities-screen/shared/format-salary";
import { formatTemplate } from "@/lib/utils/format-template";
import { panelStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { cn } from "@/lib/utils/tailwind";
import {
  OpportunitySelectionStatus,
  type OpportunityDrawerProps,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { DrawerAction } from "./drawer-action";
import { DrawerHeader } from "./drawer-header";
import { DrawerIdentities } from "./drawer-identities";
import { DrawerMetadata } from "./drawer-metadata";
import { DrawerMobileSheet } from "./drawer-mobile-sheet";
import { DrawerTags } from "./drawer-tags";
import { OpportunityMarkdown } from "./opportunity-markdown";
import {
  findOpportunityTrigger,
  getOpportunityDetailsElementIds,
  restoreOpportunityTriggerFocus,
} from "@/app/opportunities/_components/opportunities-screen/opportunity-card/trigger-contract";

export function OpportunityDrawer({
  item,
  open,
  selectedOpportunityId,
  selectionStatus,
  hideCommunityIdentity,
  hideAuthorIdentity,
  onClose,
  onCommunitySelect,
  onAuthorSelect,
  specimenMode = false,
}: OpportunityDrawerProps): React.ReactNode {
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const itemId = item?.id ?? selectedOpportunityId ?? null;
  const lastOpenItemIdRef = React.useRef<string | null>(null);
  const returnFocusElementRef = React.useRef<HTMLElement | null>(null);
  const wasOpenRef = React.useRef(false);
  const detailsElementIds = itemId
    ? getOpportunityDetailsElementIds(itemId)
    : null;
  const dateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    }),
    [locale],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  React.useEffect(() => {
    const wasOpen = wasOpenRef.current;

    if (open && itemId && !wasOpen) {
      lastOpenItemIdRef.current = itemId;
      const activeElement = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      returnFocusElementRef.current =
        activeElement?.dataset.opportunityTrigger === itemId
          ? activeElement
          : findOpportunityTrigger(itemId);
    }
    wasOpenRef.current = open;

    if (open || !wasOpen || !lastOpenItemIdRef.current) return;
    if (!window.matchMedia("(min-width: 1280px)").matches) return;

    const returnFocusElement = returnFocusElementRef.current;
    if (returnFocusElement?.isConnected) {
      window.requestAnimationFrame(() => returnFocusElement.focus());
    } else {
      restoreOpportunityTriggerFocus(lastOpenItemIdRef.current);
    }
  }, [itemId, open]);
  const shareUrl = React.useMemo(() => {
    if (!item) return "";
    return resolvePublicSiteUrl(buildOpportunityPath(item.id));
  }, [item]);

  if (!open) return null;

  if (!item) {
    const isSelectionLoading =
      selectionStatus === OpportunitySelectionStatus.Loading;
    const feedbackMessage = selectionStatus === OpportunitySelectionStatus.NotFound
      ? messages.opportunities.feedback.selectedNotFound
      : selectionStatus === OpportunitySelectionStatus.LoadError
        ? messages.opportunities.feedback.selectedLoadError
        : messages.opportunities.feedback.selectedLoading;
    const stateContent = (
      <div className="flex h-full min-h-0 flex-col bg-surface-elevated">
        <header className="relative min-h-16 border-b border-line px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            data-detail-close=""
            onClick={onClose}
            aria-label={cardMessages.closeDetails}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </header>
        <div className="flex min-h-64 flex-1 flex-col items-center justify-center gap-5 px-6 py-10 text-center">
          {isSelectionLoading ? (
            <LoaderCircle
              className="size-5 animate-spin text-primary-deep"
              aria-hidden="true"
            />
          ) : null}
          <p
            className="max-w-sm text-sm leading-6 text-muted-foreground"
            role={isSelectionLoading ? "status" : "alert"}
            aria-live={isSelectionLoading ? "polite" : "assertive"}
            aria-atomic="true"
          >
            {feedbackMessage}
          </p>
          {!isSelectionLoading ? (
            <Button type="button" variant="outline" onClick={onClose}>
              {cardMessages.closeDetails}
            </Button>
          ) : null}
        </div>
      </div>
    );
    const returnFocusOpportunityId = selectedOpportunityId ?? "";

    return (
      <>
        <aside
          id={detailsElementIds?.panel}
          className={cn(
            panelStyles,
            "hidden overflow-hidden p-0 xl:sticky xl:top-20 xl:block xl:max-h-[calc(100dvh-6rem)]",
          )}
        >
          {stateContent}
        </aside>
        <DrawerMobileSheet
          open={open}
          dialogId={detailsElementIds?.dialog ?? "opportunity-details-dialog"}
          dialogLabel={feedbackMessage}
          returnFocusOpportunityId={returnFocusOpportunityId}
          onClose={onClose}
        >
          {stateContent}
        </DrawerMobileSheet>
      </>
    );
  }

  const salaryLabel = formatSalary(item.salary, locale, {
    month: cardMessages.salaryPeriodMonth,
    year: cardMessages.salaryPeriodYear,
    hour: cardMessages.salaryPeriodHour,
    from: cardMessages.salaryFrom,
    upTo: cardMessages.salaryUpTo,
    range: cardMessages.salaryRange,
  });
  const postedAt = formatTemplate(cardMessages.postedAt, {
    date: dateFormatter.format(new Date(item.createdAt)),
  });
  const updatedAt = formatTemplate(cardMessages.updatedAt, {
    date: dateFormatter.format(new Date(item.updatedAt)),
  });
  const content = (
    <div className="flex h-full min-h-0 flex-col">
      <DrawerHeader
        title={item.title}
        detailsLabel={cardMessages.detailsTitle}
        closeLabel={cardMessages.closeDetails}
        onClose={onClose}
      >
        <DrawerIdentities
          item={item}
          hideCommunityIdentity={hideCommunityIdentity}
          hideAuthorIdentity={hideAuthorIdentity}
          onCommunitySelect={onCommunitySelect}
          onAuthorSelect={onAuthorSelect}
          communityActionLabel={formatTemplate(cardMessages.showCommunityJobs, {
            name: item.community.name || item.repository,
          })}
          authorActionLabel={formatTemplate(cardMessages.showAuthorJobs, {
            handle: item.author.handle,
          })}
        />
      </DrawerHeader>
      <div className="min-w-0 flex-1 space-y-6 overflow-x-hidden overflow-y-auto px-5 py-6 overscroll-contain sm:px-6">
        <DrawerMetadata
          country={item.country}
          salaryLabel={salaryLabel}
          tags={item.tags}
          locale={locale}
        />
        <OpportunityMarkdown
          body={item.description}
          emptyDescription={cardMessages.noDescription}
        />
        <DrawerTags tags={item.tags} locale={locale} />
        <DrawerMetadata
          postedAt={postedAt}
          updatedAt={updatedAt}
          companyName={item.companyName}
          locale={locale}
        />
      </div>
      <DrawerAction
        openOriginalLabel={cardMessages.openOriginal}
        shareLabel={cardMessages.share}
        shareSharedLabel={cardMessages.shareShared}
        shareCopiedLabel={cardMessages.shareCopied}
        shareFailedLabel={cardMessages.shareFailed}
        shareUrl={shareUrl}
        url={item.url}
        inert={specimenMode}
        className="shrink-0 border-t border-line bg-surface-elevated/95 px-5 py-4 backdrop-blur-sm sm:px-6"
      />
    </div>
  );

  return (
    <>
      <aside id={detailsElementIds?.panel} className={cn(panelStyles, "hidden overflow-hidden p-0 xl:sticky xl:top-20 xl:block xl:max-h-[calc(100dvh-6rem)]")}>
        {content}
      </aside>
      <DrawerMobileSheet
        open={open}
        dialogId={detailsElementIds?.dialog ?? "opportunity-details-dialog"}
        dialogLabel={formatTemplate(cardMessages.openDetailsAriaLabel, {
          title: item.title,
        })}
        returnFocusOpportunityId={item.id}
        onClose={onClose}
      >
        {content}
      </DrawerMobileSheet>
    </>
  );
}
