import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of service",
  description:
    "Read the terms that apply when using openings.dev, its public GitHub-derived listings, and external links.",
  path: "/terms",
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.Terms, "terms");
