import * as React from "react";
import { OpportunitiesFilters } from "@/app/opportunities/_components/opportunities-screen/opportunities-filters";
import { OpportunitiesList } from "@/app/opportunities/_components/opportunities-screen/opportunities-list";
import { OpportunitiesQuickFilters } from "@/app/opportunities/_components/opportunities-screen/opportunities-quick-filters";
import { OpportunitiesToolbar } from "@/app/opportunities/_components/opportunities-screen/opportunities-toolbar";
import { OpportunityDrawer } from "@/app/opportunities/_components/opportunities-screen/opportunity-drawer";
import {
  opportunitiesBodyStyles,
  opportunitiesMainStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";
import { useOpportunitiesScreenController } from "@/app/opportunities/_components/opportunities-screen/controller/use-opportunities-screen-controller";

interface OpportunitiesScreenContentProps {
  controller: ReturnType<typeof useOpportunitiesScreenController>;
}

export function OpportunitiesScreenContent({
  controller,
}: OpportunitiesScreenContentProps): React.ReactNode {
  const { setSelectedOpportunityId } = controller;
  const handleCloseDetails = React.useCallback(
    () => setSelectedOpportunityId(null),
    [setSelectedOpportunityId],
  );

  return (
    <>
      <OpportunitiesQuickFilters
        filters={controller.normalizedFilters}
        options={controller.options}
        activeFiltersCount={controller.activeFiltersCount}
        advancedFiltersOpen={controller.filtersModalOpen}
        onOpenAdvancedFilters={() => controller.setFiltersModalOpen(true)}
        onFieldChange={controller.handleFieldChange}
        onClearFilters={controller.handleClearFilters}
        forcedScope={controller.forcedScope}
      />

      <div className={opportunitiesBodyStyles}>
        <div className={opportunitiesMainStyles}>
          <OpportunitiesToolbar
            rangeLabel={controller.rangeLabel}
            resultCount={controller.totalCount}
            lastUpdatedAt={controller.lastUpdatedAt}
            isLoading={controller.isLoading}
            hasLoadError={controller.hasLoadError}
            sortOrder={controller.normalizedFilters.sortOrder}
            viewMode={controller.normalizedFilters.viewMode}
            onSortOrderChange={(value) => controller.handleFieldChange("sortOrder", value)}
            onViewModeChange={(value) => controller.handleFieldChange("viewMode", value)}
          />

          <OpportunitiesList
            items={controller.visibleOpportunities}
            viewMode={controller.normalizedFilters.viewMode}
            selectedOpportunityId={controller.selectedOpportunityId}
            isLoading={controller.isLoading}
            hasLoadError={controller.hasLoadError}
            hasLoadMoreError={controller.hasLoadMoreError}
            isFetchingMore={controller.isFetchingMore}
            hasMore={controller.hasMore}
            hasActiveFilters={controller.hasActiveFilters}
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
            selectedOpportunityId={controller.selectedOpportunityId}
            selectionStatus={controller.selectionStatus}
            hideCommunityIdentity={controller.hideCommunityIdentity}
            hideAuthorIdentity={controller.hideAuthorIdentity}
            onClose={handleCloseDetails}
            onCommunitySelect={controller.onCommunitySelect}
            onAuthorSelect={controller.onAuthorSelect}
          />
        </div>
      </div>

      <OpportunitiesFilters
        state={controller.normalizedFilters}
        options={controller.options}
        open={controller.filtersModalOpen}
        resultCount={controller.totalCount}
        isLoading={controller.isLoading}
        hasLoadError={controller.hasLoadError}
        hasLoadMoreError={controller.hasLoadMoreError}
        activeFiltersCount={controller.activeFiltersCount}
        onOpenChange={controller.setFiltersModalOpen}
        onFieldChange={controller.handleFieldChange}
        onToggleTag={controller.handleToggleTag}
        onToggleAuthor={controller.handleToggleAuthor}
        onClearFilters={controller.handleClearFilters}
        forcedScope={controller.forcedScope}
      />
    </>
  );
}
