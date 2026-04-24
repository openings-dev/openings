import { UsersScreen } from "@/app/users/_components/users-screen";
import { loadSafely } from "@/app/_lib/load-safe";
import type { UserSummary } from "@/lib/opportunities/users";
import { listSnapshotUsers } from "@/lib/opportunities/users";

export const revalidate = 10800;

export default async function UsersIndexPage() {
  const users = await loadSafely<UserSummary[]>({
    load: () => listSnapshotUsers(),
    fallback: [],
    errorMessage: "Failed to load users page",
  });

  return <UsersScreen users={users} />;
}
