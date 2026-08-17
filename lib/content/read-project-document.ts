import { readFile } from "node:fs/promises";
import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { getDocumentTarget } from "./document-config";
import type { ProjectDocumentBundle, ProjectDocumentKey } from "./document-types";

async function readMarkdown(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return null;
  }
}

export async function readProjectDocumentBundle(
  key: ProjectDocumentKey,
): Promise<ProjectDocumentBundle> {
  const entries = await Promise.all(AVAILABLE_LOCALES.map(async ({ code }) => {
    const target = getDocumentTarget(key, code);
    const markdown = await readMarkdown(target.absolutePath);
    return { code, markdown, sourceFile: target.displayPath };
  }));
  const markdownByLocale: ProjectDocumentBundle["markdownByLocale"] = {};
  const sourceFileByLocale: ProjectDocumentBundle["sourceFileByLocale"] = {};

  for (const { code, markdown, sourceFile } of entries) {
    if (markdown === null) continue;
    markdownByLocale[code] = markdown;
    sourceFileByLocale[code] = sourceFile;
  }

  return {
    markdownByLocale,
    sourceFileByLocale,
  };
}
