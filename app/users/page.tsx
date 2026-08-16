import { UsersScreen } from "@/app/users/_components/users-screen";
import { loadSafely } from "@/lib/utils/load-safely";
import type { UserSummary } from "@/lib/opportunities/users";
import { listSnapshotUsers } from "@/lib/opportunities/users";

export const revalidate = 10800;

export default async function UsersIndexPage(): Promise<React.ReactNode> {
  const users = await loadSafely<UserSummary[]>({
    load: () => listSnapshotUsers(),
    defaultValue: [],
  });

  return <UsersScreen users={users} />;
}
