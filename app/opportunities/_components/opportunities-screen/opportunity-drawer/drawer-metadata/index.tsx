import { Building2, CalendarDays, Landmark, MapPin, Wallet } from "lucide-react";

interface DrawerMetadataProps {
  postedAt: string;
  updatedAt: string;
  repository: string;
  country: string;
  companyName?: string;
  salaryLabel?: string;
}

export function DrawerMetadata({
  postedAt,
  updatedAt,
  repository,
  country,
  companyName,
  salaryLabel,
}: DrawerMetadataProps) {
  return (
    <div className="grid gap-2 rounded-lg border border-border/70 bg-background/45 p-3 text-sm sm:grid-cols-2">
      <p className="flex items-center gap-2 text-foreground/95">
        <CalendarDays className="size-4 text-primary/80" />
        {postedAt}
      </p>
      <p className="flex items-center gap-2 text-foreground/95">
        <CalendarDays className="size-4 text-primary/80" />
        {updatedAt}
      </p>
      <p className="flex items-center gap-2 text-foreground/95">
        <Landmark className="size-4 text-primary/80" />
        {repository}
      </p>
      <p className="flex items-center gap-2 text-foreground/95">
        <MapPin className="size-4 text-primary/80" />
        {country}
      </p>
      {companyName ? (
        <p className="flex items-center gap-2 text-foreground/95">
          <Building2 className="size-4 text-primary/80" />
          {companyName}
        </p>
      ) : null}
      {salaryLabel ? (
        <p className="flex items-center gap-2 text-foreground/95">
          <Wallet className="size-4 text-primary/80" />
          {salaryLabel}
        </p>
      ) : null}
    </div>
  );
}
