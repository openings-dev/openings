import {
  cardPersonButtonStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import { formatTemplate } from "@/lib/utils/format-template";
import type { OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunityCardFooterProps {
  item: OpportunityItem;
  communityAvatarAltTemplate: string;
  authorAvatarAltTemplate: string;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  showCommunityIdentity?: boolean;
  showAuthorIdentity?: boolean;
}

export function OpportunityCardFooter({
  item,
  communityAvatarAltTemplate,
  authorAvatarAltTemplate,
  onCommunitySelect,
  onAuthorSelect,
  showCommunityIdentity = true,
  showAuthorIdentity = true,
}: OpportunityCardFooterProps) {
  if (!showCommunityIdentity && !showAuthorIdentity) {
    return null;
  }

  return (
    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-3">
      {showCommunityIdentity ? (
        <button
          type="button"
          className={cardPersonButtonStyles()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onCommunitySelect(item.repository);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.community.avatarUrl}
            alt={formatTemplate(communityAvatarAltTemplate, {
              name: item.community.name,
            })}
            className="size-6 rounded-full border border-border/60 bg-muted object-cover"
          />
          <div>
            <p className="text-xs font-medium leading-none text-foreground">
              {item.community.name}
            </p>
            <p className="mt-0.5 text-[11px] leading-none text-muted-foreground">
              {item.repository}
            </p>
          </div>
        </button>
      ) : null}

      {showAuthorIdentity ? (
        <button
          type="button"
          className={cardPersonButtonStyles()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onAuthorSelect(item.author.handle);
          }}
        >
          <div className="text-right">
            <p className="text-xs font-medium leading-none text-foreground">
              {item.author.name}
            </p>
            <p className="mt-0.5 text-[11px] leading-none text-muted-foreground">
              @{item.author.handle}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.author.avatarUrl}
            alt={formatTemplate(authorAvatarAltTemplate, {
              name: item.author.name,
            })}
            className="size-6 rounded-full border border-border/60 bg-muted object-cover"
          />
        </button>
      ) : null}
    </div>
  );
}
