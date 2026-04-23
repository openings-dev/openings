"use client";

import * as React from "react";
import Image from "next/image";
import {
  Building2,
  CircleDot,
  CalendarDays,
  ExternalLink,
  Landmark,
  MapPin,
  Wallet,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils/tailwind";
import {
  chipStyles,
  metadataRowStyles,
  opportunityCardStyles,
} from "@/components/opportunities-screen/styles";
import type {
  OpportunityCardProps,
  OpportunitySalary,
} from "@/components/opportunities-screen/types";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

function formatSalary(
  salary: OpportunitySalary | undefined,
  locale: string,
  periodLabels: {
    month: string;
    year: string;
    hour: string;
  },
) {
  if (!salary || (!salary.min && !salary.max)) {
    return "";
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: salary.currency,
    maximumFractionDigits: 0,
  });
  const period = periodLabels[salary.period];

  if (salary.min && salary.max) {
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} / ${period}`;
  }

  if (salary.min) {
    return `${formatter.format(salary.min)}+ / ${period}`;
  }

  return `${formatter.format(salary.max ?? 0)} / ${period}`;
}

export function OpportunityCard({
  item,
  viewMode,
  onCommunitySelect,
  onAuthorSelect,
}: OpportunityCardProps) {
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const dateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
      }),
    [locale],
  );
  const openExternal = () => {
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      className={cn(opportunityCardStyles({ viewMode }))}
      role="link"
      tabIndex={0}
      onClick={openExternal}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openExternal();
        }
      }}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <CircleDot className="size-3.5" />
              {cardMessages.statusOpen}
            </div>
            <p className="inline-flex items-center gap-1 text-base font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover:text-muted-foreground">
              {item.title}
              <ExternalLink className="size-3.5" />
            </p>
            <p className="max-w-[62ch] text-sm leading-6 text-muted-foreground">
              {item.excerpt}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className={chipStyles({ active: false })}>
              {tag}
            </span>
          ))}
        </div>

        <div className={metadataRowStyles()}>
          {item.salary ? (
            <span className="inline-flex items-center gap-1">
              <Wallet className="size-3.5" />
              {formatSalary(item.salary, locale, {
                month: cardMessages.salaryPeriodMonth,
                year: cardMessages.salaryPeriodYear,
                hour: cardMessages.salaryPeriodHour,
              })}
            </span>
          ) : null}

          {item.companyName ? (
            <span className="inline-flex items-center gap-1">
              <Building2 className="size-3.5" />
              {item.companyName}
            </span>
          ) : null}

          <span className="inline-flex items-center gap-1">
            <Landmark className="size-3.5" />
            {item.community.repository}
          </span>

          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {item.country}
          </span>

          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {dateFormatter.format(new Date(item.createdAt))}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border/65 pt-3">
        <button
          type="button"
          className="flex items-center gap-3 rounded-md p-1 -m-1 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onCommunitySelect(item.repository);
          }}
        >
          <Image
            src={item.community.avatarUrl}
            alt={formatTemplate(cardMessages.communityAvatarAlt, {
              name: item.community.name,
            })}
            width={28}
            height={28}
            className="size-7 rounded-full border border-border/70 bg-muted object-cover"
          />
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-foreground">{item.community.name}</p>
            <p className="text-xs text-muted-foreground">{item.repository}</p>
          </div>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-md p-1 -m-1 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onAuthorSelect(item.author.handle);
          }}
        >
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">{item.author.name}</p>
            <p className="text-xs text-muted-foreground">@{item.author.handle}</p>
          </div>
          <Image
            src={item.author.avatarUrl}
            alt={formatTemplate(cardMessages.authorAvatarAlt, {
              name: item.author.name,
            })}
            width={28}
            height={28}
            className="size-7 rounded-full border border-border/70 bg-muted object-cover"
          />
        </button>
      </div>
    </article>
  );
}
