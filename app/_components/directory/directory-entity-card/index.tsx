import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Avatar } from "@/components/ui/avatar";

interface DirectoryEntityDetail {
  id?: string;
  icon: LucideIcon;
  label: React.ReactNode;
  value: React.ReactNode;
  dateTime?: string;
}

interface DirectoryEntityCardProps {
  href: string;
  avatarUrl: string;
  avatarFallback: string;
  title: string;
  subtitle: string;
  details: DirectoryEntityDetail[];
  opportunitiesLabel: React.ReactNode;
  actionLabel: React.ReactNode;
}

export function DirectoryEntityCard({
  href,
  avatarUrl,
  avatarFallback,
  title,
  subtitle,
  details,
  opportunitiesLabel,
  actionLabel,
}: DirectoryEntityCardProps): React.ReactNode {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-64 flex-col rounded-card border border-line bg-surface p-5 transition-colors hover:border-primary/25 hover:bg-primary-soft/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <Avatar
          src={avatarUrl}
          fallback={avatarFallback}
          width={48}
          height={48}
          className="size-12 border-primary/20 bg-primary-soft text-xl"
        />

        <div className="min-w-0">
          <h2 className="font-display text-card-title font-semibold tracking-[-0.025em] text-foreground [overflow-wrap:anywhere]">
            {title}
          </h2>
          <p className="font-mono mt-1 text-technical text-muted-foreground [overflow-wrap:anywhere]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary-deep">
        <BriefcaseBusiness className="size-4" aria-hidden="true" />
        <span className="font-tabular">{opportunitiesLabel}</span>
      </div>

      {details.length > 0 ? (
        <dl className="mt-4 grid gap-2.5 text-metadata text-muted-foreground">
          {details.map((detail, index) => (
            <div
              key={detail.id ?? index}
              className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2"
            >
              <detail.icon className="mt-0.5 size-3.5" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="sr-only">{detail.label}</dt>
                <dd className="[overflow-wrap:anywhere]">
                  {detail.dateTime ? (
                    <time dateTime={detail.dateTime}>{detail.value}</time>
                  ) : detail.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      ) : null}

      <span className="mt-auto flex min-h-11 items-end justify-between gap-3 border-t border-line pt-4 text-sm font-semibold text-foreground transition-colors group-hover:text-primary-deep">
        {actionLabel}
        <ArrowUpRight className="mb-0.5 size-4 shrink-0" aria-hidden="true" />
      </span>
    </Link>
  );
}
