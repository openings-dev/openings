import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { ShareableProfileKind } from "@/app/opportunities/_components/opportunities-screen/types";
import {
  authorHandleFromRoute,
  buildUserPath,
} from "@/lib/opportunities/routing";
import {
  getSnapshotUserByHandle,
  listSnapshotUsers,
} from "@/lib/opportunities/users";
import { createPublisherProfileMetadata } from "@/lib/metadata/profile-metadata";
import { loadSafely } from "@/lib/utils/load-safely";

interface UserProfilePageProps {
  params: Promise<{ handle: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ handle: string }>> {
  const users = await listSnapshotUsers();
  return users.map(({ handle }) => ({ handle }));
}

async function resolveUserProfile(params: UserProfilePageProps["params"]) {
  const { handle: routeHandle } = await params;
  const handle = authorHandleFromRoute(routeHandle);
  const profile = await loadSafely({
    load: () => getSnapshotUserByHandle(handle),
    defaultValue: null,
  });

  return { profile, handle };
}

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const { profile, handle } = await resolveUserProfile(params);

  return createPublisherProfileMetadata({
    profile,
    handle,
    path: buildUserPath(profile?.handle ?? handle),
  });
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps): Promise<React.ReactNode> {
  const { profile } = await resolveUserProfile(params);

  if (!profile) notFound();

  return (
    <OpportunitiesPage
      profile={{ kind: ShareableProfileKind.Publisher, profile }}
    />
  );
}
