import { OpportunitiesFilters } from "@/app/opportunities/_components/opportunities-screen/opportunities-filters";
import { OpportunitiesList } from "@/app/opportunities/_components/opportunities-screen/opportunities-list";
import { OpportunitiesQuickFilters } from "@/app/opportunities/_components/opportunities-screen/opportunities-quick-filters";
import { OpportunitiesToolbar } from "@/app/opportunities/_components/opportunities-screen/opportunities-toolbar";
import { OpportunityDrawer } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer";
import {
  opportunitiesBodyStyles,
  opportunitiesMainStyles,
  splitViewStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import { useOpportunitiesScreenController } from "@/app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller";
import { SnapshotStatus } from "@/app/opportunities/_components/opportunities-screen/snapshot-status";
import { OpportunityViewMode } from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunitiesScreenContentProps {
  controller: ReturnType<typeof useOpportunitiesScreenController>;
}

export function OpportunitiesScreenContent({
  controller,
}: OpportunitiesScreenContentProps) {
  return (
    <>
      <OpportunitiesQuickFilters
        filters={controller.normalizedFilters}
        options={controller.options}
        activeFiltersCount={controller.activeFiltersCount}
        onOpenAdvancedFilters={() => controller.setFiltersModalOpen(true)}
        onFieldChange={controller.handleFieldChange}
      />

      <div className={opportunitiesBodyStyles}>
        <div className={opportunitiesMainStyles}>
          <OpportunitiesToolbar
            totalCount={controller.totalCount}
            rangeLabel={controller.rangeLabel}
            sortOrder={controller.normalizedFilters.sortOrder}
            viewMode={controller.normalizedFilters.viewMode}
            currentPage={controller.currentPage}
            totalPages={controller.totalPages}
            onSortOrderChange={(value) => controller.handleFieldChange("sortOrder", value)}
            onViewModeChange={(value) => controller.handleFieldChange("viewMode", value)}
          />

          <SnapshotStatus
            totalCount={controller.totalCount}
            lastUpdatedAt={controller.lastUpdatedAt}
          />

          <div className={splitViewStyles({ open: controller.isDetailsOpen })}>
            <OpportunitiesList
              items={controller.visibleOpportunities}
              viewMode={controller.isDetailsOpen ? OpportunityViewMode.List : controller.normalizedFilters.viewMode}
              selectedOpportunityId={controller.selectedOpportunityId}
              isLoading={controller.isLoading}
              isFetchingMore={controller.isFetchingMore}
              hasMore={controller.hasMore}
              hasActiveFilters={controller.hasActiveFilters}
              rangeLabel={controller.rangeLabel}
              totalCount={controller.totalCount}
              currentPage={controller.currentPage}
              totalPages={controller.totalPages}
              skeletonCount={Math.min(controller.normalizedFilters.itemsPerPage, 8)}
              onLoadMore={controller.handleLoadMore}
              onClearFilters={controller.handleClearFilters}
              onSelectOpportunity={(item) => controller.setSelectedOpportunityId(item.id)}
              onCommunitySelect={controller.onCommunitySelect}
              onAuthorSelect={controller.onAuthorSelect}
              hideCommunityIdentity={controller.hideCommunityIdentity}
              hideAuthorIdentity={controller.hideAuthorIdentity}
            />

            <OpportunityDrawer
              item={controller.selectedOpportunity}
              open={controller.isDetailsOpen}
              onClose={() => controller.setSelectedOpportunityId(null)}
              onCommunitySelect={controller.onCommunitySelect}
              onAuthorSelect={controller.onAuthorSelect}
            />
          </div>
        </div>
      </div>

      <OpportunitiesFilters
        state={controller.normalizedFilters}
        options={controller.options}
        open={controller.filtersModalOpen}
        resultCount={controller.totalCount}
        activeFiltersCount={controller.activeFiltersCount}
        onOpenChange={controller.setFiltersModalOpen}
        onFieldChange={controller.handleFieldChange}
        onToggleTag={controller.handleToggleTag}
        onToggleAuthor={controller.handleToggleAuthor}
        onClearFilters={controller.handleClearFilters}
      />
    </>
  );
}
