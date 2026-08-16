import { readFile } from "node:fs/promises";
import { AVAILABLE_LOCALES, LocaleCode } from "@/lib/constants/locales";
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
  const fallback = getDocumentTarget(key, LocaleCode.English);
  const fallbackMarkdown = await readMarkdown(fallback.absolutePath) ??
    `# Missing file\n\nCould not read \`${fallback.displayPath}\` from the project root.`;
  const entries = await Promise.all(AVAILABLE_LOCALES.map(async ({ code }) => {
    const target = getDocumentTarget(key, code);
    const markdown = await readMarkdown(target.absolutePath);
    return [code, {
      markdown: markdown ?? fallbackMarkdown,
      sourceFile: markdown === null ? fallback.displayPath : target.displayPath,
    }] as const;
  }));

  return {
    markdownByLocale: Object.fromEntries(entries.map(([locale, value]) => [locale, value.markdown])) as ProjectDocumentBundle["markdownByLocale"],
    sourceFileByLocale: Object.fromEntries(entries.map(([locale, value]) => [locale, value.sourceFile])) as ProjectDocumentBundle["sourceFileByLocale"],
  };
}
