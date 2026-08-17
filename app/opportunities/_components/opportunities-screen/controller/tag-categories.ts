import type { FilterOption, OpportunityTagCategoryOptions } from "@/app/opportunities/_components/opportunities-screen/types";
import { canonicalTagValue } from "./tag-normalization";

export enum OpportunityTagCategory {
  WorkModel = "work-model",
  Seniority = "seniority",
  Stack = "stack",
  Other = "other",
}

export type OpportunityTagBadgeTone =
  | "neutral"
  | "primary"
  | "positive"
  | "informational";

export interface ClassifiedOpportunityTag {
  category: OpportunityTagCategory;
  canonicalValue: string;
  value: string;
}

export interface ClassifiedOpportunityTags {
  workModel: ClassifiedOpportunityTag[];
  seniority: ClassifiedOpportunityTag[];
  stack: ClassifiedOpportunityTag[];
  other: ClassifiedOpportunityTag[];
}

export const OPPORTUNITY_TAG_BADGE_TONES = {
  [OpportunityTagCategory.WorkModel]: "positive",
  [OpportunityTagCategory.Seniority]: "primary",
  [OpportunityTagCategory.Stack]: "informational",
  [OpportunityTagCategory.Other]: "neutral",
} satisfies Record<OpportunityTagCategory, OpportunityTagBadgeTone>;

const WORK_MODEL_VALUES = new Set(["remote", "hybrid", "on-site"]);

const SENIORITY_VALUES = new Set([
  "junior",
  "pleno",
  "senior",
  "especialista",
  "principal",
  "staff",
  "lead",
  "mid",
  "intern",
  "internship",
  "trainee",
  "estagio",
]);

const STACK_VALUES = new Set([
  "javascript",
  "typescript",
  "nodejs",
  "react",
  "react-native",
  "nextjs",
  "vue",
  "angular",
  "python",
  "django",
  "flask",
  "fastapi",
  "java",
  "spring",
  "kotlin",
  "php",
  "laravel",
  "ruby",
  "ruby-on-rails",
  "go",
  "rust",
  "csharp",
  "dotnet",
  "mysql",
  "postgres",
  "mongodb",
  "redis",
  "aws",
  "gcp",
  "azure",
  "docker",
  "kubernetes",
  "terraform",
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "devops",
  "qa",
  "data-engineering",
  "data-science",
  "ai",
  "ml",
]);

function isStackCanonicalTag(value: string) {
  return STACK_VALUES.has(value) || value.includes("sql");
}

export function classifyOpportunityTag(value: string): ClassifiedOpportunityTag {
  const canonicalValue = canonicalTagValue(value) || value;
  let category = OpportunityTagCategory.Other;

  if (WORK_MODEL_VALUES.has(canonicalValue)) {
    category = OpportunityTagCategory.WorkModel;
  } else if (SENIORITY_VALUES.has(canonicalValue)) {
    category = OpportunityTagCategory.Seniority;
  } else if (isStackCanonicalTag(canonicalValue)) {
    category = OpportunityTagCategory.Stack;
  }

  return { category, canonicalValue, value };
}

export function classifyOpportunityTags(tags: string[]): ClassifiedOpportunityTags {
  const classified: ClassifiedOpportunityTags = {
    workModel: [],
    seniority: [],
    stack: [],
    other: [],
  };

  for (const tag of tags) {
    const classifiedTag = classifyOpportunityTag(tag);

    switch (classifiedTag.category) {
      case OpportunityTagCategory.WorkModel:
        classified.workModel.push(classifiedTag);
        break;
      case OpportunityTagCategory.Seniority:
        classified.seniority.push(classifiedTag);
        break;
      case OpportunityTagCategory.Stack:
        classified.stack.push(classifiedTag);
        break;
      case OpportunityTagCategory.Other:
        classified.other.push(classifiedTag);
        break;
    }
  }

  return classified;
}

export function groupTagOptionsByCategory(
  tagOptions: FilterOption[],
): OpportunityTagCategoryOptions {
  const grouped: OpportunityTagCategoryOptions = {
    workModel: [],
    stack: [],
    seniority: [],
    other: [],
  };

  for (const option of tagOptions) {
    const category = classifyOpportunityTag(option.value).category;

    switch (category) {
      case OpportunityTagCategory.WorkModel:
        grouped.workModel.push(option);
        break;
      case OpportunityTagCategory.Seniority:
        grouped.seniority.push(option);
        break;
      case OpportunityTagCategory.Stack:
        grouped.stack.push(option);
        break;
      case OpportunityTagCategory.Other:
        grouped.other.push(option);
        break;
    }
  }

  return grouped;
}
