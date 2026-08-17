import type { ShowcaseSectionId } from "../design-system-showcase/types";

export interface ShowcaseSectionProps {
  id: ShowcaseSectionId;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
