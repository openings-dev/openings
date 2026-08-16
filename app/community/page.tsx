import { CommunitiesScreen } from "@/app/community/_components/communities-screen";
import { loadSafely } from "@/lib/utils/load-safely";
import type { CommunitySummary } from "@/lib/opportunities/communities";
import { listSnapshotCommunities } from "@/lib/opportunities/communities";

export const revalidate = 10800;

export default async function CommunityIndexPage(): Promise<React.ReactNode> {
  const communities = await loadSafely<CommunitySummary[]>({
    load: () => listSnapshotCommunities(),
    defaultValue: [],
  });

  return <CommunitiesScreen communities={communities} />;
}
