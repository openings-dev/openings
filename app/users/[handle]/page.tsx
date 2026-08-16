import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import {
  authorHandleFromRoute,
  buildUserPath,
} from "@/lib/opportunities/routing";
import {
  getSnapshotUserByHandle,
  listSnapshotUsers,
} from "@/lib/opportunities/users";
import { loadSafely } from "@/lib/utils/load-safely";

interface UserProfilePageProps {
  params: Promise<{ handle: string }>;
}

export const revalidate = 10800;
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ handle: string }>> {
  const users = await listSnapshotUsers();
  return users.map(({ handle }) => ({ handle }));
}

async function resolveUserProfile(params: UserProfilePageProps["params"]) {
  const { handle } = await params;
  return loadSafely({
    load: () => getSnapshotUserByHandle(authorHandleFromRoute(handle)),
    defaultValue: null,
  });
}

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const profile = await resolveUserProfile(params);

  if (!profile) {
    return {
      title: "Publisher profile",
      description: "Browse technology opportunities shared by a community publisher.",
    };
  }

  const title = `Opportunities shared by ${profile.name}`;
  const description = `Browse open roles shared by @${profile.handle} across public GitHub community repositories.`;
  const canonical = buildUserPath(profile.handle);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      title,
      description,
      url: canonical,
      siteName: "openings.dev",
      images: profile.avatarUrl ? [{ url: profile.avatarUrl, alt: profile.name }] : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: profile.avatarUrl ? [profile.avatarUrl] : undefined,
    },
  };
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps): Promise<React.ReactNode> {
  const profile = await resolveUserProfile(params);

  if (!profile) notFound();

  return (
    <OpportunitiesPage
      forcedAuthor={profile.handle}
      forcedAuthorProfile={profile}
    />
  );
}
