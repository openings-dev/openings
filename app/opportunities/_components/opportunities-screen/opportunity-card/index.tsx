"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { formatSalary } from "@/app/opportunities/_components/opportunities-screen/shared/format-salary";
import { formatTemplate } from "@/lib/utils/format-template";
import { cn } from "@/lib/utils/tailwind";
import { opportunityCardStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { OpportunityCardProps } from "@/app/opportunities/_components/opportunities-screen/types";
import { OpportunityCardFooter } from "./opportunity-card-footer";
import { OpportunityCardHeader } from "./opportunity-card-header";
import { OpportunityCardMeta } from "./opportunity-card-meta";
import { OpportunityCardTags } from "./opportunity-card-tags";

export function OpportunityCard({
  item,
  viewMode,
  isSelected,
  onSelectOpportunity,
  onCommunitySelect,
  onAuthorSelect,
  hideCommunityIdentity,
  hideAuthorIdentity,
}: OpportunityCardProps) {
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const dateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "medium" }),
    [locale],
  );
  const salaryLabel = formatSalary(item.salary, locale, {
    month: cardMessages.salaryPeriodMonth,
    year: cardMessages.salaryPeriodYear,
    hour: cardMessages.salaryPeriodHour,
  });
  const showCommunity = !hideCommunityIdentity;
  const handleCommunityClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onCommunitySelect(item.repository);
  };

  return (
    <article
      className={cn(opportunityCardStyles({ viewMode, selected: isSelected }))}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelectOpportunity(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectOpportunity(item);
        }
      }}
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {showCommunity ? (
            <button
              type="button"
              className="mt-0.5 shrink-0 rounded-full transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              onClick={handleCommunityClick}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.community.avatarUrl}
                alt={formatTemplate(cardMessages.communityAvatarAlt, {
                  name: item.community.name,
                })}
                className="size-9 rounded-full border border-border/70 bg-muted object-cover"
              />
            </button>
          ) : null}
          <div className="min-w-0 flex-1 space-y-1.5">
            {showCommunity ? (
              <button
                type="button"
                className="block max-w-full truncate text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={handleCommunityClick}
              >
                {item.community.repository}
              </button>
            ) : null}
            <OpportunityCardHeader title={item.title} excerpt={item.excerpt} />
          </div>
        </div>
        <OpportunityCardTags tags={item.tags} />
        <OpportunityCardMeta
          item={item}
          salaryLabel={salaryLabel}
          dateLabel={dateFormatter.format(new Date(item.createdAt))}
          showRepository={!hideCommunityIdentity}
        />
        <OpportunityCardFooter
          item={item}
          communityAvatarAltTemplate={cardMessages.communityAvatarAlt}
          authorAvatarAltTemplate={cardMessages.authorAvatarAlt}
          onCommunitySelect={onCommunitySelect}
          onAuthorSelect={onAuthorSelect}
          showCommunityIdentity={false}
          showAuthorIdentity={!hideAuthorIdentity}
        />
      </div>
    </article>
  );
}
