import { chipStyles } from "@/app/opportunities/_components/opportunities-screen/styles";

interface OpportunityCardTagsProps {
  tags: string[];
}

export function OpportunityCardTags({ tags }: OpportunityCardTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className={chipStyles({ active: false })}>
          {tag}
        </span>
      ))}
    </div>
  );
}
