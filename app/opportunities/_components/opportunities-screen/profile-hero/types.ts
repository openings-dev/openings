import type { ShareableProfileSource } from "@/app/opportunities/_components/opportunities-screen/types";

export interface ProfileHeroProps {
  source: ShareableProfileSource;
  headingLevel?: 1 | 3;
  specimenMode?: boolean;
}
