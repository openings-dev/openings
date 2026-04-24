"use client";

import { DirectoryListShell } from "@/app/_components/directory";
import type { CommunitySummary } from "@/lib/opportunities/communities";
import { CommunityCard } from "./community-card";

interface CommunitiesListProps {
  locale: string;
  listMessages: {
    summary: string;
    emptyTitle: string;
    emptyDescription: string;
    repositoryLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openCommunity: string;
  };
  items: CommunitySummary[];
}

export function CommunitiesList({ locale, listMessages, items }: CommunitiesListProps) {
  return (
    <DirectoryListShell
      locale={locale}
      summaryTemplate={listMessages.summary}
      emptyTitle={listMessages.emptyTitle}
      emptyDescription={listMessages.emptyDescription}
      items={items}
      getKey={(item) => item.repository}
      renderItem={(item) => (
        <CommunityCard item={item} locale={locale} listMessages={listMessages} />
      )}
    />
  );
}
