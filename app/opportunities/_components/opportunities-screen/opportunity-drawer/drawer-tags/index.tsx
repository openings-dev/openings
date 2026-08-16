import { chipStyles } from "@/app/opportunities/_components/opportunities-screen/styles";

interface DrawerTagsProps {
  tags: string[];
}

export function DrawerTags({ tags }: DrawerTagsProps): React.ReactNode {
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
