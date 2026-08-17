import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";
import { Avatar } from "@/components/ui/avatar";

interface DrawerIdentitiesProps {
  item: OpportunityItem;
  hideCommunityIdentity: boolean;
  hideAuthorIdentity: boolean;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  communityActionLabel: string;
  authorActionLabel: string;
}

export function DrawerIdentities({
  item,
  hideCommunityIdentity,
  hideAuthorIdentity,
  onCommunitySelect,
  onAuthorSelect,
  communityActionLabel,
  authorActionLabel,
}: DrawerIdentitiesProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-1 pr-12">
      {!hideCommunityIdentity ? (
        <button
          type="button"
          className="-ml-2 flex min-h-11 min-w-0 items-center gap-3 rounded-control px-2 text-left transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={communityActionLabel}
          onClick={() => onCommunitySelect(item.repository)}
        >
          <Avatar
            src={item.community.avatarUrl}
            fallback={item.community.name || item.repository}
            width={32}
            height={32}
            className="size-8 text-xs"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{item.community.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.community.repository}</p>
          </div>
        </button>
      ) : null}

      {!hideAuthorIdentity ? (
        <button
          type="button"
          className="-ml-2 flex min-h-11 min-w-0 items-center gap-3 rounded-control px-2 text-left transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={authorActionLabel}
          onClick={() => onAuthorSelect(item.author.handle)}
        >
          <Avatar
            src={item.author.avatarUrl}
            fallback={item.author.name || item.author.handle}
            width={32}
            height={32}
            className="size-8 text-xs"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{item.author.name}</p>
            <p className="truncate text-xs text-muted-foreground">@{item.author.handle}</p>
          </div>
        </button>
      ) : null}
    </div>
  );
}
