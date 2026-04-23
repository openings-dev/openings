import { NextRequest, NextResponse } from "next/server";
import { REPOSITORIES, type RepositoryConfig } from "@/lib/constants/repositories";
import type {
  OpportunityItem,
  OpportunitySalary,
} from "@/components/opportunities-screen/types";

const GITHUB_ISSUES_PER_PAGE = 30;
const MAX_BATCH_LIMIT = 80;
const MULTI_REPOSITORY_TAKE = 4;

type SortDirection = "asc" | "desc";

interface CursorState {
  repoIndex: number;
  issuePage: number;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
}

interface GitHubLabelObject {
  name: string;
}

type GitHubLabel = string | GitHubLabelObject;

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  pull_request?: unknown;
}

interface RepositoryIssuesResponse {
  issues: GitHubIssue[];
  rateLimited: boolean;
  retryAfterSeconds: number | null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseLimit(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed)) {
    return 40;
  }

  return clamp(parsed, 10, MAX_BATCH_LIMIT);
}

function decodeCursor(rawCursor: string | null): CursorState {
  if (!rawCursor) {
    return { repoIndex: 0, issuePage: 1 };
  }

  try {
    const payload = JSON.parse(
      Buffer.from(rawCursor, "base64url").toString("utf8"),
    ) as Partial<CursorState>;
    const repoIndex =
      typeof payload.repoIndex === "number" && Number.isInteger(payload.repoIndex)
        ? payload.repoIndex
        : 0;
    const issuePage =
      typeof payload.issuePage === "number" && Number.isInteger(payload.issuePage)
        ? payload.issuePage
        : 1;

    return {
      repoIndex: clamp(repoIndex, 0, Number.MAX_SAFE_INTEGER),
      issuePage: clamp(issuePage, 1, Number.MAX_SAFE_INTEGER),
    };
  } catch {
    return { repoIndex: 0, issuePage: 1 };
  }
}

function encodeCursor(cursor: CursorState) {
  return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
}

function normalizeSortDirection(value: string | null): SortDirection {
  return value === "oldest" ? "asc" : "desc";
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function buildExcerpt(title: string, body: string | null) {
  const source = normalizeText(body ?? "");

  if (!source) {
    return title;
  }

  if (source.length <= 220) {
    return source;
  }

  return `${source.slice(0, 217)}...`;
}

function resolveLabelName(label: GitHubLabel) {
  if (typeof label === "string") {
    return label;
  }

  return label.name;
}

function extractTags(issue: GitHubIssue) {
  const labels = issue.labels
    .map(resolveLabelName)
    .map((name) => normalizeText(name).toLowerCase())
    .filter(Boolean);

  if (labels.length > 0) {
    return Array.from(new Set(labels)).slice(0, 8);
  }

  const text = normalizeText(`${issue.title} ${issue.body ?? ""}`).toLowerCase();
  const dictionary = [
    "remote",
    "hybrid",
    "onsite",
    "frontend",
    "backend",
    "fullstack",
    "react",
    "nextjs",
    "typescript",
    "node",
    "python",
    "golang",
    "java",
    "senior",
    "junior",
    "pleno",
    "staff",
    "principal",
    "devops",
    "data",
    "design",
  ];

  return dictionary.filter((tag) => text.includes(tag)).slice(0, 8);
}

function parseCurrency(token: string, repository: RepositoryConfig) {
  const normalized = token.toUpperCase();

  if (normalized === "R$" || normalized === "BRL") {
    return "BRL";
  }

  if (normalized === "€" || normalized === "EUR") {
    return "EUR";
  }

  if (normalized === "£" || normalized === "GBP") {
    return "GBP";
  }

  if (normalized === "CAD") {
    return "CAD";
  }

  if (normalized === "USD" || normalized === "US$") {
    return "USD";
  }

  if (normalized === "$") {
    if (repository.countryCode === "CA") {
      return "CAD";
    }

    if (repository.countryCode === "BR") {
      return "BRL";
    }

    return "USD";
  }

  return null;
}

function parseAmount(rawValue: string) {
  const value = rawValue.trim().toLowerCase();
  const hasK = value.endsWith("k");
  const hasM = value.endsWith("m");
  const base = value.replace(/[km]$/, "").replace(/\s+/g, "");
  const standardized = base
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(/,(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const parsed = Number.parseFloat(standardized);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  const multiplier = hasM ? 1_000_000 : hasK ? 1_000 : 1;
  return Math.round(parsed * multiplier);
}

function detectSalaryPeriod(text: string): OpportunitySalary["period"] {
  const lower = text.toLowerCase();

  if (/(hour|hr|hora|\/h)/i.test(lower)) {
    return "hour";
  }

  if (/(month|monthly|mês|mes|\/m)/i.test(lower)) {
    return "month";
  }

  return "year";
}

function parseSalary(text: string, repository: RepositoryConfig) {
  const content = normalizeText(text);

  const rangeMatch = content.match(
    /(R\$|US\$|USD|BRL|EUR|CAD|€|\$|£)\s*([0-9][0-9.,\s]*[kKmM]?)\s*(?:-|–|—|to|a|até)\s*(?:R\$|US\$|USD|BRL|EUR|CAD|€|\$|£)?\s*([0-9][0-9.,\s]*[kKmM]?)/i,
  );

  if (rangeMatch) {
    const currency = parseCurrency(rangeMatch[1], repository);
    const min = parseAmount(rangeMatch[2]);
    const max = parseAmount(rangeMatch[3]);

    if (currency && min && max) {
      return {
        currency,
        min: Math.min(min, max),
        max: Math.max(min, max),
        period: detectSalaryPeriod(content),
      } satisfies OpportunitySalary;
    }
  }

  const singleMatch = content.match(
    /(?:salary|sal[aá]rio|compensation|pay|faixa)[^\dRUSBECAD€$£]{0,24}(R\$|US\$|USD|BRL|EUR|CAD|€|\$|£)\s*([0-9][0-9.,\s]*[kKmM]?)/i,
  );

  if (singleMatch) {
    const currency = parseCurrency(singleMatch[1], repository);
    const amount = parseAmount(singleMatch[2]);

    if (currency && amount) {
      return {
        currency,
        min: amount,
        period: detectSalaryPeriod(content),
      } satisfies OpportunitySalary;
    }
  }

  return undefined;
}

function parseCompanyName(title: string, body: string | null) {
  const source = `${title}\n${body ?? ""}`;
  const labeledMatch = source.match(
    /(?:company|empresa|companhia|cliente)\s*[:|-]\s*([^\n|]{2,80})/i,
  );

  if (labeledMatch) {
    const normalized = normalizeText(labeledMatch[1]);
    return normalized.length <= 64 ? normalized : undefined;
  }

  const titleAtMatch = title.match(/\b(?:at|na|no)\s+([A-Za-z0-9&.'\- ]{2,64})$/i);

  if (titleAtMatch) {
    return normalizeText(titleAtMatch[1]);
  }

  return undefined;
}

function mapIssueToOpportunity(issue: GitHubIssue, repository: RepositoryConfig) {
  const body = issue.body ?? "";
  const combinedText = `${issue.title}\n${body}`;
  const salary = parseSalary(combinedText, repository);

  return {
    id: `${repository.repository}#${issue.number}`,
    title: issue.title,
    excerpt: buildExcerpt(issue.title, issue.body),
    issueState: issue.state,
    repository: repository.repository,
    repositoryUrl: repository.url,
    region: repository.region,
    country: repository.country,
    tags: extractTags(issue),
    author: {
      id: issue.user.login,
      name: issue.user.login,
      handle: issue.user.login,
      avatarUrl: issue.user.avatar_url,
    },
    community: {
      id: repository.owner,
      name: repository.owner,
      avatarUrl: `https://github.com/${repository.owner}.png?size=80`,
      repository: repository.repository,
      url: repository.url,
    },
    companyName: parseCompanyName(issue.title, issue.body),
    salary,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    url: issue.html_url,
    sourceType: "github-issue",
  } satisfies OpportunityItem;
}

function getGitHubHeaders() {
  const token =
    process.env.GITHUB_TOKEN ||
    process.env.GITHUB_API_TOKEN ||
    process.env.OPENINGS_GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "openings.dev",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function parseRetryAfterSeconds(response: Response) {
  const retryAfterHeader = response.headers.get("retry-after");

  if (retryAfterHeader) {
    const asNumber = Number.parseInt(retryAfterHeader, 10);

    if (Number.isFinite(asNumber) && asNumber > 0) {
      return asNumber;
    }
  }

  const resetHeader = response.headers.get("x-ratelimit-reset");

  if (!resetHeader) {
    return null;
  }

  const resetEpoch = Number.parseInt(resetHeader, 10);

  if (!Number.isFinite(resetEpoch) || resetEpoch <= 0) {
    return null;
  }

  const nowEpoch = Math.floor(Date.now() / 1000);
  const deltaSeconds = resetEpoch - nowEpoch;
  return deltaSeconds > 0 ? deltaSeconds : null;
}

async function fetchRepositoryIssues(
  repository: RepositoryConfig,
  issuePage: number,
  direction: SortDirection,
): Promise<RepositoryIssuesResponse> {
  const url =
    `https://api.github.com/repos/${repository.repository}/issues` +
    `?state=open&page=${issuePage}&per_page=${GITHUB_ISSUES_PER_PAGE}` +
    `&sort=created&direction=${direction}`;

  const response = await fetch(url, {
    headers: getGitHubHeaders(),
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 451) {
    return {
      issues: [],
      rateLimited: false,
      retryAfterSeconds: null,
    };
  }

  if (response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0") {
    return {
      issues: [],
      rateLimited: true,
      retryAfterSeconds: parseRetryAfterSeconds(response),
    };
  }

  if (!response.ok) {
    return {
      issues: [],
      rateLimited: false,
      retryAfterSeconds: null,
    };
  }

  const payload = (await response.json()) as GitHubIssue[];

  if (!Array.isArray(payload)) {
    return {
      issues: [],
      rateLimited: false,
      retryAfterSeconds: null,
    };
  }

  return {
    issues: payload.filter((issue) => !issue.pull_request),
    rateLimited: false,
    retryAfterSeconds: null,
  };
}

function filterRepositories(searchParams: URLSearchParams) {
  const repositoryFilter = searchParams.get("repository");
  const regionFilter = searchParams.get("region");
  const countryFilter = searchParams.get("country");

  return REPOSITORIES.filter((repository) => {
    const matchesRepository =
      !repositoryFilter || repository.repository === repositoryFilter;
    const matchesRegion = !regionFilter || repository.region === regionFilter;
    const matchesCountry = !countryFilter || repository.country === countryFilter;

    return matchesRepository && matchesRegion && matchesCountry;
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseLimit(searchParams.get("limit"));
    const direction = normalizeSortDirection(searchParams.get("sort"));
    const repositories = filterRepositories(searchParams);

    if (repositories.length === 0) {
      return NextResponse.json({
        items: [],
        nextCursor: null,
        hasMore: false,
        rateLimited: false,
        retryAfterSeconds: null,
      });
    }

    const cursor = decodeCursor(searchParams.get("cursor"));
    const singleRepositoryMode = repositories.length === 1;

    let repoIndex = clamp(cursor.repoIndex, 0, repositories.length);
    let issuePage = Math.max(cursor.issuePage, 1);

    const items: OpportunityItem[] = [];

    while (items.length < limit && repoIndex < repositories.length) {
      const repository = repositories[repoIndex];
      const repositoryIssues = await fetchRepositoryIssues(
        repository,
        issuePage,
        direction,
      );

      if (repositoryIssues.rateLimited) {
        const nextCursor = encodeCursor({ repoIndex, issuePage });
        const retryAfterSeconds = repositoryIssues.retryAfterSeconds;

        return NextResponse.json(
          {
            items,
            nextCursor,
            hasMore: true,
            rateLimited: true,
            retryAfterSeconds,
          },
          {
            status: 429,
            headers: retryAfterSeconds
              ? {
                  "Retry-After": String(retryAfterSeconds),
                }
              : undefined,
          },
        );
      }

      const issues = repositoryIssues.issues;
      const normalizedIssues = issues.map((issue) =>
        mapIssueToOpportunity(issue, repository),
      );

      if (singleRepositoryMode) {
        const remaining = limit - items.length;
        items.push(...normalizedIssues.slice(0, remaining));

        if (issues.length === GITHUB_ISSUES_PER_PAGE) {
          issuePage += 1;

          if (items.length >= limit) {
            break;
          }

          continue;
        }

        repoIndex += 1;
        issuePage = 1;
        continue;
      }

      const remaining = limit - items.length;
      const takeCount = Math.min(remaining, MULTI_REPOSITORY_TAKE);
      items.push(...normalizedIssues.slice(0, takeCount));

      repoIndex += 1;
      issuePage = 1;
    }

    const hasMore = singleRepositoryMode
      ? repoIndex < repositories.length || issuePage > 1
      : repoIndex < repositories.length;

    const nextCursor = hasMore ? encodeCursor({ repoIndex, issuePage }) : null;

    return NextResponse.json({
      items,
      nextCursor,
      hasMore,
      rateLimited: false,
      retryAfterSeconds: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        items: [],
        nextCursor: null,
        hasMore: false,
        rateLimited: false,
        retryAfterSeconds: null,
      },
      { status: 500 },
    );
  }
}
