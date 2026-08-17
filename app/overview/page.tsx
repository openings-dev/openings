import type { Metadata } from "next";
import { LegacyRouteRedirect } from "@/app/_components/legacy-route-redirect";
import { createLegacyRouteMetadata } from "@/lib/metadata/legacy-route-metadata";
import { PUBLIC_ROUTES } from "@/lib/navigation/routes";

export const metadata: Metadata = createLegacyRouteMetadata(
  PUBLIC_ROUTES.overview,
);

export default function LegacyOverviewPage(): React.ReactNode {
  return <LegacyRouteRedirect destinationPath={PUBLIC_ROUTES.overview} />;
}
