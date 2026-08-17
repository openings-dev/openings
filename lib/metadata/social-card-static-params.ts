import { listSnapshotCommunities } from "@/lib/opportunities/communities";
import { communityRouteSegmentsFromRepository } from "@/lib/opportunities/routing";
import { listStaticOpportunityIds } from "@/lib/opportunities/static-api";
import { listSnapshotUsers } from "@/lib/opportunities/users";

export async function listJobSocialCardParams(): Promise<
  Array<{ id: string }>
> {
  const ids = await listStaticOpportunityIds();
  return ids.map((id) => ({ id }));
}

export async function listCommunitySocialCardParams(): Promise<
  Array<{ owner: string; name: string }>
> {
  const communities = await listSnapshotCommunities();
  const params: Array<{ owner: string; name: string }> = [];

  for (const community of communities) {
    const segments = communityRouteSegmentsFromRepository(community.repository);
    if (segments) params.push({ owner: segments.owner, name: segments.name });
  }

  return params;
}

export async function listAuthorSocialCardParams(): Promise<
  Array<{ handle: string }>
> {
  const authors = await listSnapshotUsers();
  return authors.map(({ handle }) => ({ handle }));
}
