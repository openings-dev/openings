import Link from "next/link";
import type { LucideIcon } from "lucide-react";

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
}: DirectoryEntityCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border/60 bg-card/70 p-4 transition hover:border-primary/40 hover:bg-card"
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
          <p className="truncate text-sm font-semibold text-foreground">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <dl className="mt-4 grid gap-2 text-xs text-muted-foreground">
        {details.map((detail) => (
          <div key={`${detail.label}-${detail.value}`} className="flex items-center gap-2">
            <detail.icon className="size-3.5" />
            <dt>{detail.label}</dt>
            <dd className="truncate text-foreground/80">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-primary">{opportunitiesLabel}</p>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition group-hover:text-primary">
          {actionLabel}
        </span>
      </div>
    </Link>
  );
}
