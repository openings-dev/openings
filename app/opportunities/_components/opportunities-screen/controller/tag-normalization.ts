import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";
import { canonicalTagLabel } from "./tag-labels";

const CONTEXT_TOKENS = new Set([
  "lang",
  "language",
  "stack",
  "tech",
  "technology",
  "tecnologia",
  "framework",
  "skill",
  "skills",
  "role",
  "cargo",
  "seniority",
  "nivel",
  "level",
  "work",
  "model",
  "modelo",
  "modalidade",
  "type",
  "tipo",
]);

const DIRECT_ALIASES: Record<string, string> = {
  jr: "junior",
  junior: "junior",
  mid: "pleno",
  middle: "pleno",
  pleno: "pleno",
  senior: "senior",
  especialista: "especialista",
  specialist: "especialista",
  intern: "estagio",
  internship: "estagio",
  trainee: "estagio",
  estagio: "estagio",
  lead: "lead",
  principal: "principal",
  staff: "staff",
  remote: "remote",
  remoto: "remote",
  hybrid: "hybrid",
  hibrido: "hybrid",
  onsite: "on-site",
  "on site": "on-site",
  presencial: "on-site",
  js: "javascript",
  "java script": "javascript",
  javascript: "javascript",
  ts: "typescript",
  "type script": "typescript",
  typescript: "typescript",
  "node js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  reactjs: "react",
  "react js": "react",
  react: "react",
  "react native": "react-native",
  nextjs: "nextjs",
  "next js": "nextjs",
  vuejs: "vue",
  "vue js": "vue",
  golang: "go",
  postgres: "postgres",
  postgresql: "postgres",
  mongodb: "mongodb",
  "mongo db": "mongodb",
  frontend: "frontend",
  "front end": "frontend",
  backend: "backend",
  "back end": "backend",
  fullstack: "fullstack",
  "full stack": "fullstack",
  devops: "devops",
  "dev ops": "devops",
  qa: "qa",
  "quality assurance": "qa",
};

const PATTERN_ALIASES: Array<[RegExp, string]> = [
  [/(^| )junior( |$)|(^| )jr( |$)/, "junior"],
  [/(^| )pleno( |$)|(^| )mid(dle)?( |$)/, "pleno"],
  [/(^| )senior( |$)/, "senior"],
  [/(^| )(especialista|specialist)( |$)/, "especialista"],
  [/(^| )(intern|internship|trainee|estagio)( |$)/, "estagio"],
  [/(^| )lead( |$)/, "lead"],
  [/(^| )principal( |$)/, "principal"],
  [/(^| )staff( |$)/, "staff"],
  [/(^| )(remote|remoto|home office|work from home|wfh)( |$)/, "remote"],
  [/(^| )(hybrid|hibrido)( |$)/, "hybrid"],
  [/(^| )(onsite|on site|presencial|in person)( |$)/, "on-site"],
  [/(^| )(ruby on rails|rails)( |$)/, "ruby-on-rails"],
  [/(^| )(javascript|java script|js)( |$)/, "javascript"],
  [/(^| )(typescript|type script|ts)( |$)/, "typescript"],
  [/(^| )(nodejs|node js|node)( |$)/, "nodejs"],
  [/(^| )(react native)( |$)/, "react-native"],
  [/(^| )(reactjs|react js|react)( |$)/, "react"],
  [/(^| )(nextjs|next js)( |$)/, "nextjs"],
  [/(^| )(vuejs|vue js|vue)( |$)/, "vue"],
  [/(^| )golang( |$)/, "go"],
  [/(^| )(postgresql|postgres)( |$)/, "postgres"],
  [/(^| )(mongodb|mongo db)( |$)/, "mongodb"],
  [/(^| )(front end|frontend)( |$)/, "frontend"],
  [/(^| )(back end|backend)( |$)/, "backend"],
  [/(^| )(full stack|fullstack)( |$)/, "fullstack"],
  [/(^| )(dev ops|devops)( |$)/, "devops"],
  [/(^| )(quality assurance|qa)( |$)/, "qa"],
];

function normalizeBase(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9+#./\s-]+/g, " ")
    .replace(/[./_]+/g, " ")
    .replace(/[-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripContextTokens(value: string) {
  const tokens = value.split(" ").filter(Boolean);
  let start = 0;
  let end = tokens.length;

  while (start < end && CONTEXT_TOKENS.has(tokens[start])) {
    start += 1;
  }

  while (end > start && CONTEXT_TOKENS.has(tokens[end - 1])) {
    end -= 1;
  }

  return tokens.slice(start, end).join(" ").trim();
}

function resolveCanonicalAlias(value: string) {
  if (!value) return null;
  if (DIRECT_ALIASES[value]) return DIRECT_ALIASES[value];

  for (const [pattern, canonical] of PATTERN_ALIASES) {
    if (pattern.test(value)) return canonical;
  }

  return null;
}

function cleanLabel(value: string) {
  const cleaned = value.trim().replace(/^[^\p{Letter}\p{Number}]+/gu, "").trim();
  return cleaned || value.trim();
}

export function canonicalTagValue(value: string) {
  const base = normalizeBase(value);
  if (!base) return "";
  const stripped = stripContextTokens(base);
  const candidate = stripped || base;

  const alias =
    resolveCanonicalAlias(candidate) ??
    resolveCanonicalAlias(base);

  if (alias) return alias;

  return candidate.replace(/\s+/g, "-");
}

export function condenseTagOptions(counts: Record<string, number>, locale: string) {
  const grouped = new Map<string, { fallbackLabel: string; count: number; labelScore: number }>();

  for (const [rawValue, count] of Object.entries(counts)) {
    if (!Number.isFinite(count) || count <= 0) continue;
    const value = canonicalTagValue(rawValue);
    if (!value) continue;
    const fallbackLabel = cleanLabel(rawValue);
    const previous = grouped.get(value);
    if (!previous) {
      grouped.set(value, { fallbackLabel, count, labelScore: count });
      continue;
    }
    previous.count += count;
    if (count > previous.labelScore) {
      previous.fallbackLabel = fallbackLabel;
      previous.labelScore = count;
    }
  }

  const condensed = [...grouped.entries()]
    .map(([value, entry]) => ({
      value,
      label: canonicalTagLabel(value, entry.fallbackLabel, locale),
      count: entry.count,
    }))
    .sort((left, right) => left.label.localeCompare(right.label, locale));

  return condensed satisfies FilterOption[];
}
