import type { Metadata } from "next";
import { UsersScreen } from "@/app/users/_components/users-screen";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { LoadResultStatus, loadWithStatus } from "@/lib/utils/load-safely";
import { listSnapshotUsers } from "@/lib/opportunities/users";

export const metadata: Metadata = createPageMetadata({
  title: "GitHub authors sharing tech jobs",
  description:
    "Browse the GitHub accounts that authored public job listings in community repositories and view the jobs linked to each account.",
  path: "/users",
});

export default async function UsersIndexPage(): Promise<React.ReactNode> {
  const result = await loadWithStatus({
    load: () => listSnapshotUsers(),
  });

  return (
    <UsersScreen
      users={result.status === LoadResultStatus.Success ? result.data : []}
      sourceUnavailable={result.status === LoadResultStatus.Failure}
    />
  );
}
