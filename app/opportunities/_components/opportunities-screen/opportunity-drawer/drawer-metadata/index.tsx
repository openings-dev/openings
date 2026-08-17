import { Building2, CalendarDays, MapPin, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  classifyOpportunityTags,
  OPPORTUNITY_TAG_BADGE_TONES,
} from "@/app/opportunities/_components/opportunities-screen/controller/tag-categories";
import { canonicalTagLabel } from "@/app/opportunities/_components/opportunities-screen/controller/tag-labels";
import { cn } from "@/lib/utils/tailwind";

interface DrawerMetadataProps {
  postedAt?: string;
  updatedAt?: string;
  country?: string;
  companyName?: string;
  salaryLabel?: string;
  tags?: string[];
  locale: string;
}

export function DrawerMetadata({
  postedAt,
  updatedAt,
  country,
  companyName,
  salaryLabel,
  tags = [],
  locale,
}: DrawerMetadataProps): React.ReactNode {
  const { workModel } = classifyOpportunityTags(tags);
  const isPrimary = Boolean(salaryLabel || country || workModel.length > 0);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-4 gap-y-2 text-sm",
        !isPrimary && "border-t border-line pt-5",
      )}
    >
      {salaryLabel ? (
        <p className="flex items-center gap-2 font-semibold text-foreground">
          <Wallet className="size-4 text-positive-foreground" aria-hidden="true" />
          {salaryLabel}
        </p>
      ) : null}
      {workModel.map((tag) => (
        <Badge
          key={`${tag.canonicalValue}-${tag.value}`}
          tone={OPPORTUNITY_TAG_BADGE_TONES[tag.category]}
          size="compact"
        >
          {canonicalTagLabel(tag.canonicalValue, tag.value, locale)}
        </Badge>
      ))}
      {country ? (
        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {country}
        </p>
      ) : null}
      {companyName ? (
        <p className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="size-4" aria-hidden="true" />
          {companyName}
        </p>
      ) : null}
      {postedAt ? (
        <p className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="size-4" aria-hidden="true" />
          {postedAt}
        </p>
      ) : null}
      {updatedAt ? (
        <p className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="size-4" aria-hidden="true" />
          {updatedAt}
        </p>
      ) : null}
    </div>
  );
}
