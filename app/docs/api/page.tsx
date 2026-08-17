import type { Metadata } from "next";
import { createProjectDocumentPage } from "@/app/_components/document-page/create-project-document-page";
import { ProjectDocumentKey } from "@/lib/content/document-types";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Static data reference",
  description:
    "Read the static JSON file paths, manifest fields, paging conventions, validation rules, and integration examples used by openings.dev.",
  path: "/docs/api",
  openGraphType: "article",
});

export default createProjectDocumentPage(ProjectDocumentKey.ApiReference, "apiReference");
