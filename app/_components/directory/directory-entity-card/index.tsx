import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type React from "react";

interface DirectoryEntityDetail {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface DirectoryEntityCardProps {
  href: string;
  avatarUrl: string;
  avatarAlt: string;
  avatarFallback: string;
  title: string;
  subtitle: string;
  details: DirectoryEntityDetail[];
  opportunitiesLabel: string;
  actionLabel: string;
}

export function DirectoryEntityCard({
  href,
  avatarUrl,
  avatarAlt,
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
      className="group block h-full rounded-2xl border border-border/80 bg-surface-elevated p-4 shadow-soft-sm transition-[border-color,background-color,box-shadow] hover:border-primary/35 hover:bg-card hover:shadow-soft-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
    >
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={avatarAlt}
            className="size-10 rounded-full border border-border/70 bg-muted object-cover"
          />
        ) : (
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-muted text-sm font-semibold text-muted-foreground">
            {avatarFallback}
          </span>
        )}

        <div className="min-w-0">
          <p className="font-display truncate text-base font-bold tracking-[-0.025em] text-foreground">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-2.5 text-xs text-muted-foreground">
        {details.map((detail) => (
          <div key={`${detail.label}-${detail.value}`} className="flex items-center gap-2">
            <detail.icon className="size-3.5" />
            <dt>{detail.label}</dt>
            <dd className="truncate text-foreground/80">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-tabular text-sm font-semibold text-primary">{opportunitiesLabel}</p>
        <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-subtle-foreground transition group-hover:text-primary">
          {actionLabel}
        </span>
      </div>
    </Link>
  );
}
