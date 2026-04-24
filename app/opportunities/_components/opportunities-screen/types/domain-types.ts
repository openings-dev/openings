export type OpportunitySortOrder = "recent" | "oldest";
export type OpportunityViewMode = "list" | "grid";
export type OpportunitySourceType =
  | "github-issue"
  | "github-discussion"
  | "community-board";

export interface OpportunityPerson {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface OpportunityCommunity {
  id: string;
  name: string;
  avatarUrl: string;
  repository: string;
  url: string;
}

export interface OpportunitySalary {
  currency: string;
  min?: number;
  max?: number;
  period: "month" | "year" | "hour";
}

export interface OpportunityItem {
  id: string;
  sourceId?: string;
  title: string;
  description: string;
  excerpt: string;
  issueState: "open" | "closed";
  repository: string;
  repositoryUrl: string;
  region: string;
  country: string;
  tags: string[];
  author: OpportunityPerson;
  community: OpportunityCommunity;
  companyName?: string;
  salary?: OpportunitySalary;
  createdAt: string;
  updatedAt: string;
  url: string;
  sourceType: OpportunitySourceType;
}

export interface UserProfileSummary {
  handle: string;
  name: string;
  avatarUrl: string;
  region: string;
  country: string;
  opportunitiesCount: number;
  lastPostedAt: string | null;
}

export interface CommunityProfileSummary {
  repository: string;
  name: string;
  avatarUrl: string;
  region: string;
  country: string;
  opportunitiesCount: number;
  lastPostedAt: string | null;
}
