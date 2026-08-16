import {
  Building2,
  CalendarDays,
  Landmark,
  MapPin,
  Wallet,
} from "lucide-react";
import { metadataRowStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunityCardMetaProps {
  item: OpportunityItem;
  salaryLabel: string;
  dateLabel: string;
  showRepository?: boolean;
}

export function OpportunityCardMeta({
  item,
  salaryLabel,
  dateLabel,
  showRepository = true,
}: OpportunityCardMetaProps) {
  return (
    <div className={metadataRowStyles}>
      {salaryLabel ? (
        <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
          <Wallet className="size-3.5 text-primary" />
          {salaryLabel}
        </span>
      ) : null}
      {item.companyName ? (
        <span className="inline-flex items-center gap-1">
          <Building2 className="size-3.5" />
          {item.companyName}
        </span>
      ) : null}
      {showRepository ? (
        <span className="inline-flex items-center gap-1">
          <Landmark className="size-3.5" />
          {item.community.repository}
        </span>
      ) : null}
      <span className="inline-flex items-center gap-1">
        <MapPin className="size-3.5" />
        {item.country}
      </span>
      <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.5" />
          {dateLabel}
      </span>
    </div>
  );
}
