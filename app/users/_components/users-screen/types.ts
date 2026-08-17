import type { UserSummary } from "@/lib/opportunities/users";
import type { TranslationMessages } from "@/lib/translations/types";

export interface UsersScreenProps {
  users: UserSummary[];
  sourceUnavailable: boolean;
}

export type UserListMessages = TranslationMessages["users"]["list"];

export interface UserCardProps {
  item: UserSummary;
  locale: string;
  listMessages: UserListMessages;
}

export interface UsersListProps {
  locale: string;
  listMessages: UserListMessages;
  items: UserSummary[];
  emptyReason: import("@/app/_components/directory/types").DirectoryEmptyReason;
  onClearAll: () => void;
}
