import { CommunitiesScreen } from "@/app/community/_components/communities-screen";
import { loadSafely } from "@/app/_lib/load-safe";
import type { CommunitySummary } from "@/lib/opportunities/communities";
import { listSnapshotCommunities } from "@/lib/opportunities/communities";

export const revalidate = 10800;

export default async function CommunityIndexPage() {
  const communities = await loadSafely<CommunitySummary[]>({
    load: () => listSnapshotCommunities(),
    fallback: [],
    errorMessage: "Failed to load communities page",
  });

  return <CommunitiesScreen communities={communities} />;
}
