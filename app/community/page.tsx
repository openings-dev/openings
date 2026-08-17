import type { Metadata } from "next";
import { CommunitiesScreen } from "@/app/community/_components/communities-screen";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { LoadResultStatus, loadWithStatus } from "@/lib/utils/load-safely";
import { listSnapshotCommunities } from "@/lib/opportunities/communities";

export const metadata: Metadata = createPageMetadata({
  title: "GitHub communities sharing tech jobs",
  description:
    "Browse public GitHub communities with open tech jobs, then check any listing at its original source.",
  path: "/community",
});

export default async function CommunityIndexPage(): Promise<React.ReactNode> {
  const result = await loadWithStatus({
    load: () => listSnapshotCommunities(),
  });

  return (
    <CommunitiesScreen
      communities={result.status === LoadResultStatus.Success ? result.data : []}
      sourceUnavailable={result.status === LoadResultStatus.Failure}
    />
  );
}
