"use client";

import { DirectoryListShell } from "@/app/_components/directory";
import type { UserSummary } from "@/lib/opportunities/users";
import { UserCard } from "./user-card";

interface UsersListProps {
  locale: string;
  listMessages: {
    summary: string;
    emptyTitle: string;
    emptyDescription: string;
    handleLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openUser: string;
  };
  items: UserSummary[];
}

export function UsersList({ locale, listMessages, items }: UsersListProps) {
  return (
    <DirectoryListShell
      locale={locale}
      summaryTemplate={listMessages.summary}
      emptyTitle={listMessages.emptyTitle}
      emptyDescription={listMessages.emptyDescription}
      items={items}
      getKey={(item) => item.handle}
      renderItem={(item) => (
        <UserCard item={item} locale={locale} listMessages={listMessages} />
      )}
    />
  );
}
