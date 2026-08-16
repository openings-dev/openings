import { UserRound } from "lucide-react";
import { formatTemplate } from "@/lib/utils/format-template";
import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

interface DrawerIdentitiesProps {
  item: OpportunityItem;
  communityAvatarAltTemplate: string;
  authorAvatarAltTemplate: string;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
}

export function DrawerIdentities({
  item,
  communityAvatarAltTemplate,
  authorAvatarAltTemplate,
  onCommunitySelect,
  onAuthorSelect,
}: DrawerIdentitiesProps) {
  return (
    <div className="space-y-1 rounded-xl bg-surface p-2">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-surface-elevated focus-visible:outline-none"
        onClick={() => onCommunitySelect(item.repository)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.community.avatarUrl}
          alt={formatTemplate(communityAvatarAltTemplate, { name: item.community.name })}
          className="size-8 rounded-full border border-border/70 bg-muted object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{item.community.name}</p>
          <p className="truncate text-xs text-muted-foreground">{item.community.repository}</p>
        </div>
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-surface-elevated focus-visible:outline-none"
        onClick={() => onAuthorSelect(item.author.handle)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.author.avatarUrl}
          alt={formatTemplate(authorAvatarAltTemplate, { name: item.author.name })}
          className="size-8 rounded-full border border-border/70 bg-muted object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{item.author.name}</p>
          <p className="truncate text-xs text-muted-foreground">@{item.author.handle}</p>
        </div>
        <UserRound className="size-4 text-muted-foreground" />
      </button>
    </div>
  );
}
