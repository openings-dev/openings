import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { PUBLIC_ROUTES } from "@/lib/navigation/routes";

export const metadata: Metadata = createPageMetadata({
  title: "Project overview",
  description:
    "Learn how openings.dev turns public community job listings into a searchable index while preserving every original source.",
  path: PUBLIC_ROUTES.overview,
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.Overview, "overview");
