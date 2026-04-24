import { readProjectDocumentBundle, type ProjectDocumentKey } from "@/lib/content/markdown";
import { DocumentPage } from ".";
import type { DocumentPageKey } from "./types";

export function createProjectDocumentPage(
  sourceDocumentKey: ProjectDocumentKey,
  pageDocumentKey: DocumentPageKey,
) {
  return async function ProjectDocumentRoutePage() {
    const document = await readProjectDocumentBundle(sourceDocumentKey);

    return (
      <DocumentPage
        documentKey={pageDocumentKey}
        markdownByLocale={document.markdownByLocale}
        sourceFileByLocale={document.sourceFileByLocale}
      />
    );
  };
}
