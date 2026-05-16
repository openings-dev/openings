"use client";

import * as React from "react";
import { Activity, Clock3 } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { opportunitiesSnapshotStatusStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { formatTemplate } from "@/lib/utils/format-template";

interface SnapshotStatusProps {
  totalCount: number;
  lastUpdatedAt: string | null;
}

function formatRelativeTime(fromDate: Date, now: number, locale: string) {
  const diffMs = fromDate.getTime() - now;
  const absSeconds = Math.round(Math.abs(diffMs) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (absSeconds < 60) return rtf.format(Math.round(diffMs / 1000), "second");
  const absMinutes = Math.round(absSeconds / 60);
  if (absMinutes < 60) return rtf.format(Math.round(diffMs / 60000), "minute");
  const absHours = Math.round(absMinutes / 60);
  if (absHours < 24) return rtf.format(Math.round(diffMs / 3600000), "hour");
  return rtf.format(Math.round(diffMs / 86400000), "day");
}

export function SnapshotStatus({ totalCount, lastUpdatedAt }: SnapshotStatusProps) {
  const { locale, messages } = useI18n();
  const statusMessages = messages.opportunities.status;
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const generatedAt = lastUpdatedAt ? new Date(lastUpdatedAt) : null;
  const relativeStatus = 
    generatedAt && Number.isFinite(generatedAt.getTime())
      ? formatTemplate(statusMessages.updatedRelative, {
        relative: formatRelativeTime(generatedAt, now, locale),
      })
      : statusMessages.updatedUnavailable;
  const absoluteStatus =
    generatedAt && Number.isFinite(generatedAt.getTime())
      ? formatTemplate(statusMessages.updatedAt, {
        date: new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(generatedAt),
      })
      : null;

  return (
    <section className={opportunitiesSnapshotStatusStyles()} aria-label={statusMessages.ariaLabel}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <Activity className="size-4" />
        </span>

        <div className="grid min-w-0 flex-1 gap-x-4 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {statusMessages.title}
          </p>
          <p className="text-sm font-semibold text-foreground sm:justify-self-end">
            {formatTemplate(statusMessages.opportunitiesFound, {
              count: totalCount.toLocaleString(locale),
            })}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock3 className="size-3.5 shrink-0" />
            {relativeStatus}
          </p>
          {absoluteStatus ? (
            <p className="text-xs text-muted-foreground/75 sm:justify-self-end">
              {absoluteStatus}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
