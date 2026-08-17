import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Share your community’s Openings page",
  description:
    "Add your community’s openings.dev profile to a README, website, or social bio, and learn how to request a correction or removal.",
  path: "/docs/maintainers",
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.Maintainers, "maintainers");
