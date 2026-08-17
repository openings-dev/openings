export interface SocialCardFact {
  label: string;
  value: string;
}

export interface SocialCardPresentation {
  eyebrow: string;
  title: string;
  description?: string;
  facts?: SocialCardFact[];
  tags?: string[];
  actionLabel: string;
}
