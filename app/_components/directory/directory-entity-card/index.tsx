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
      className="group block h-full rounded-xl border-2 border-border bg-card p-5 shadow-soft-md transition-[background-color,box-shadow,transform] hover:-translate-x-1 hover:-translate-y-1 hover:bg-accent hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={avatarAlt}
            className="size-11 rounded-full border-2 border-border bg-muted object-cover"
          />
        ) : (
          <span className="inline-flex size-11 items-center justify-center rounded-full border-2 border-border bg-muted text-sm font-black text-muted-foreground">
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
