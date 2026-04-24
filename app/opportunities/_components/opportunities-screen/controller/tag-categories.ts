import type { FilterOption, OpportunityTagCategoryOptions } from "@/app/opportunities/_components/opportunities-screen/types";
import { canonicalTagValue } from "./tag-normalization";

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
    const canonical = canonicalTagValue(option.value);
    const normalized = canonical || option.value;

    if (WORK_MODEL_VALUES.has(normalized)) {
      grouped.workModel.push(option);
      continue;
    }
    if (SENIORITY_VALUES.has(normalized)) {
      grouped.seniority.push(option);
      continue;
    }
    if (isStackCanonicalTag(normalized)) {
      grouped.stack.push(option);
      continue;
    }

    grouped.other.push(option);
  }

  return grouped;
}
