import {
  opportunitiesDescriptionStyles,
  opportunitiesHeaderStyles,
  opportunitiesKickerStyles,
  opportunitiesTitleStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";

interface OpportunitiesScreenHeaderProps {
  kicker: string;
  title: string;
  description: string;
}

export function OpportunitiesScreenHeader({
  kicker,
  title,
  description,
}: OpportunitiesScreenHeaderProps): React.ReactNode {
  return (
    <header className={opportunitiesHeaderStyles}>
      <p className={opportunitiesKickerStyles}>{kicker}</p>
      <h1 className={opportunitiesTitleStyles}>{title}</h1>
      <p className={opportunitiesDescriptionStyles}>{description}</p>
    </header>
  );
}
