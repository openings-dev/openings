import { resultsGridStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type {
  OpportunityItem,
  OpportunityViewMode,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { OpportunityCard } from "@/app/opportunities/_components/opportunities-screen/opportunity-card";

interface ResultsGridProps {
  items: OpportunityItem[];
  viewMode: OpportunityViewMode;
  selectedOpportunityId: string | null;
  onSelectOpportunity: (item: OpportunityItem) => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  hideCommunityIdentity: boolean;
  hideAuthorIdentity: boolean;
}

export function ResultsGrid({
  items,
  viewMode,
  selectedOpportunityId,
  onSelectOpportunity,
  onCommunitySelect,
  onAuthorSelect,
  hideCommunityIdentity,
  hideAuthorIdentity,
}: ResultsGridProps): React.ReactNode {
  return (
    <ul className={resultsGridStyles({ viewMode })}>
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <OpportunityCard
            item={item}
            viewMode={viewMode}
            isSelected={selectedOpportunityId === item.id}
            onSelectOpportunity={onSelectOpportunity}
            onCommunitySelect={onCommunitySelect}
            onAuthorSelect={onAuthorSelect}
            hideCommunityIdentity={hideCommunityIdentity}
            hideAuthorIdentity={hideAuthorIdentity}
          />
        </li>
      ))}
    </ul>
  );
}
