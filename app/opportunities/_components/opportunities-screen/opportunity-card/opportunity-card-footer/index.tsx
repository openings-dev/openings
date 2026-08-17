import { ArrowUpRight, CalendarDays, GitBranch } from "lucide-react";
import { cardPersonButtonStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";
import { Avatar } from "@/components/ui/avatar";

interface OpportunityCardFooterProps {
  item: OpportunityItem;
  dateLabel: string;
  detailsLabel: string;
  authorActionLabel: string;
  onAuthorSelect: (authorHandle: string) => void;
  showAuthorIdentity?: boolean;
  showRepository?: boolean;
}

export function OpportunityCardFooter({
  item,
  dateLabel,
  detailsLabel,
  authorActionLabel,
  onAuthorSelect,
  showAuthorIdentity = true,
  showRepository = true,
}: OpportunityCardFooterProps): React.ReactNode {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-3">
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {showAuthorIdentity ? (
          <button
            type="button"
            className={cardPersonButtonStyles}
            aria-label={authorActionLabel}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onAuthorSelect(item.author.handle);
            }}
          >
            <Avatar
              src={item.author.avatarUrl}
              fallback={item.author.name || item.author.handle}
              width={24}
              height={24}
              className="size-6 text-[0.625rem]"
            />
            <span className="truncate">@{item.author.handle}</span>
          </button>
        ) : null}
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {dateLabel}
        </span>
        {showRepository ? (
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <GitBranch className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{item.repository}</span>
          </span>
        ) : null}
      </div>

      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary-deep">
        {detailsLabel}
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </span>
    </div>
  );
}
