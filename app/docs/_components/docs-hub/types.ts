import type { LucideIcon } from "lucide-react";
import type { TranslationMessages } from "@/lib/translations/types";

export enum DocsHubGroupId {
  StartHere = "start-here",
  Integration = "integration",
  Product = "product",
}

export type DocsHubGroupKey = keyof TranslationMessages["docsHub"]["groups"];
export type DocsHubResourceKey = keyof TranslationMessages["docsHub"]["resources"];

export interface DocsHubResourceDefinition {
  key: DocsHubResourceKey;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface DocsHubGroupDefinition {
  id: DocsHubGroupId;
  titleKey: DocsHubGroupKey;
  resources: readonly DocsHubResourceDefinition[];
}
