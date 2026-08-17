"use client";

import { DirectoryListShell } from "@/app/_components/directory/directory-list-shell";
import { DirectoryEmptyReason } from "@/app/_components/directory/types";
import { UserCard } from "../user-card";
import type { UserListMessages, UsersListProps } from "../types";

function emptyStateFor(
  reason: DirectoryEmptyReason,
  messages: UserListMessages,
) {
  if (reason === DirectoryEmptyReason.Unavailable) {
    return {
      title: messages.unavailableTitle,
      description: messages.unavailableDescription,
      recoveryLabel: messages.browseJobs,
      recoveryHref: "/",
    };
  }
  if (reason === DirectoryEmptyReason.Query) {
    return {
      title: messages.emptyQueryTitle,
      description: messages.emptyQueryDescription,
      recoveryLabel: messages.clearAll,
    };
  }
  if (reason === DirectoryEmptyReason.Geography) {
    return {
      title: messages.emptyGeographyTitle,
      description: messages.emptyGeographyDescription,
      recoveryLabel: messages.clearAll,
    };
  }
  if (reason === DirectoryEmptyReason.Combined) {
    return {
      title: messages.emptyCombinedTitle,
      description: messages.emptyCombinedDescription,
      recoveryLabel: messages.clearAll,
    };
  }
  return {
    title: messages.emptySourceTitle,
    description: messages.emptySourceDescription,
  };
}

export function UsersList({
  locale,
  listMessages,
  items,
  emptyReason,
  onClearAll,
}: UsersListProps): React.ReactNode {
  return (
    <DirectoryListShell
      listLabel={listMessages.listLabel}
      emptyState={emptyStateFor(emptyReason, listMessages)}
      items={items}
      getKey={(item) => item.handle}
      renderItem={(item) => (
        <UserCard item={item} locale={locale} listMessages={listMessages} />
      )}
      onRecover={
        emptyReason === DirectoryEmptyReason.Query ||
        emptyReason === DirectoryEmptyReason.Geography ||
        emptyReason === DirectoryEmptyReason.Combined
          ? onClearAll
          : undefined
      }
    />
  );
}
