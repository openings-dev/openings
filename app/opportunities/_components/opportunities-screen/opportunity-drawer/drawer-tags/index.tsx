import { Badge } from "@/components/ui/badge";
import {
  classifyOpportunityTags,
  OPPORTUNITY_TAG_BADGE_TONES,
} from "@/app/opportunities/_components/opportunities-screen/controller/tag-categories";
import { canonicalTagLabel } from "@/app/opportunities/_components/opportunities-screen/controller/tag-labels";

interface DrawerTagsProps {
  tags: string[];
  locale: string;
}

export function DrawerTags({ tags, locale }: DrawerTagsProps): React.ReactNode {
  const classified = classifyOpportunityTags(tags);
  const orderedTags = [
    ...classified.seniority,
    ...classified.stack,
    ...classified.other,
  ];

  if (orderedTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {orderedTags.map((tag, index) => (
        <Badge
          key={`${tag.canonicalValue}-${tag.value}-${index}`}
          tone={OPPORTUNITY_TAG_BADGE_TONES[tag.category]}
          size="compact"
        >
          {canonicalTagLabel(tag.canonicalValue, tag.value, locale)}
        </Badge>
      ))}
    </div>
  );
}
