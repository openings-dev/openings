import { chipStyles } from "@/app/opportunities/_components/opportunities-screen/styles";

interface OpportunityCardTagsProps {
  tags: string[];
}

export function OpportunityCardTags({ tags }: OpportunityCardTagsProps): React.ReactNode {
  if (tags.length === 0) {
    return null;
  }

  const visibleTags = tags.slice(0, 3);
  const overflowCount = tags.length - visibleTags.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleTags.map((tag) => (
        <span key={tag} className={chipStyles({ active: false })}>
          {tag}
        </span>
      ))}
      {overflowCount > 0 ? (
        <span className="inline-flex items-center rounded-md border-2 border-border bg-accent px-2 py-0.5 text-xs font-black text-accent-foreground">
          +{overflowCount}
        </span>
      ) : null}
    </div>
  );
}
