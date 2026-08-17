import type { Metadata } from "next";
import { LegacyRouteRedirect } from "@/app/_components/legacy-route-redirect";
import { createLegacyRouteMetadata } from "@/lib/metadata/legacy-route-metadata";
import {
  authorHandleFromRoute,
  buildUserPath,
} from "@/lib/opportunities/routing";
import { listSnapshotUsers } from "@/lib/opportunities/users";

interface LegacyAuthorPageProps {
  params: Promise<{ handle: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ handle: string }>> {
  const authors = await listSnapshotUsers();
  return authors.map(({ handle }) => ({ handle }));
}

async function resolveDestination(params: LegacyAuthorPageProps["params"]) {
  const { handle: routeHandle } = await params;
  return buildUserPath(authorHandleFromRoute(routeHandle));
}

export async function generateMetadata({
  params,
}: LegacyAuthorPageProps): Promise<Metadata> {
  return createLegacyRouteMetadata(await resolveDestination(params));
}

export default async function LegacyAuthorPage({
  params,
}: LegacyAuthorPageProps): Promise<React.ReactNode> {
  return <LegacyRouteRedirect destinationPath={await resolveDestination(params)} />;
}
