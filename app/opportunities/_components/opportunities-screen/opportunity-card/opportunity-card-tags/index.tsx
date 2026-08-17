import { Badge } from "@/components/ui/badge";
import {
  classifyOpportunityTags,
  OPPORTUNITY_TAG_BADGE_TONES,
} from "@/app/opportunities/_components/opportunities-screen/controller/tag-categories";
import { canonicalTagLabel } from "@/app/opportunities/_components/opportunities-screen/controller/tag-labels";
import { OpportunityViewMode } from "@/app/opportunities/_components/opportunities-screen/types";
import { formatTemplate } from "@/lib/utils/format-template";

interface OpportunityCardTagsProps {
  tags: string[];
  viewMode: OpportunityViewMode;
  locale: string;
  moreTagLabel: string;
  moreTagsLabel: string;
}

export function OpportunityCardTags({
  tags,
  viewMode,
  locale,
  moreTagLabel,
  moreTagsLabel,
}: OpportunityCardTagsProps): React.ReactNode {
  const classified = classifyOpportunityTags(tags);
  const supportingTags = [
    ...classified.workModel.slice(1),
    ...classified.seniority,
    ...classified.stack,
    ...classified.other,
  ];

  if (supportingTags.length === 0) {
    return null;
  }

  const visibleLimit = viewMode === OpportunityViewMode.List ? 2 : 3;
  const visibleTags = supportingTags.slice(0, visibleLimit);
  const overflowCount = supportingTags.length - visibleTags.length;
  const formattedOverflowCount = overflowCount.toLocaleString(locale);

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleTags.map((tag, index) => (
        <Badge
          key={`${tag.canonicalValue}-${tag.value}-${index}`}
          tone={OPPORTUNITY_TAG_BADGE_TONES[tag.category]}
          size="compact"
        >
          {canonicalTagLabel(tag.canonicalValue, tag.value, locale)}
        </Badge>
      ))}
      {overflowCount > 0 ? (
        <Badge
          tone="neutral"
          size="compact"
          aria-label={overflowCount === 1
            ? moreTagLabel
            : formatTemplate(moreTagsLabel, { count: formattedOverflowCount })}
        >
          +{formattedOverflowCount}
        </Badge>
      ) : null}
    </div>
  );
}
