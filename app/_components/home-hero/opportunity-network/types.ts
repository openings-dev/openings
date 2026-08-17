export interface OpportunityNetworkLabels {
  ariaLabel: string;
  repository: string;
  publicIssue: string;
  indexedForSearch: string;
  opportunity: string;
  stack: string;
  location: string;
  originalSource: string;
}

export interface OpportunityNetworkProps {
  labels: OpportunityNetworkLabels;
}
