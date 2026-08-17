import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { ShareableProfileKind } from "@/app/opportunities/_components/opportunities-screen/types";
import { createPublisherProfileMetadata } from "@/lib/metadata/profile-metadata";
import {
  authorHandleFromRoute,
  buildUserPath,
} from "@/lib/opportunities/routing";
import {
  getSnapshotUserByHandle,
  listSnapshotUsers,
} from "@/lib/opportunities/users";
import { loadSafely } from "@/lib/utils/load-safely";

interface AuthorProfilePageProps {
  params: Promise<{ handle: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ handle: string }>> {
  const authors = await listSnapshotUsers();
  return authors.map(({ handle }) => ({ handle }));
}

async function resolveAuthorProfile(params: AuthorProfilePageProps["params"]) {
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
}: AuthorProfilePageProps): Promise<Metadata> {
  const { profile, handle } = await resolveAuthorProfile(params);

  return createPublisherProfileMetadata({
    profile,
    handle,
    path: buildUserPath(profile?.handle ?? handle),
  });
}

export default async function AuthorProfilePage({
  params,
}: AuthorProfilePageProps): Promise<React.ReactNode> {
  const { profile } = await resolveAuthorProfile(params);

  if (!profile) notFound();

  return (
    <OpportunitiesPage
      profile={{ kind: ShareableProfileKind.Publisher, profile }}
    />
  );
}
