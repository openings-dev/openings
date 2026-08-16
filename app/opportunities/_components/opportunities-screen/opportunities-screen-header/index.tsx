import { motion } from "framer-motion";
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
  opportunitiesLabel: string;
  locationLabel: string;
  lastPostLabel: string;
  profile?: {
    title: string;
    subtitle: string;
    avatarUrl: string;
    opportunitiesSummary: string;
    locationSummary: string;
    lastPostedSummary: string;
  } | null;
}

export function OpportunitiesScreenHeader({
  kicker,
  title,
  description,
  opportunitiesLabel,
  locationLabel,
  lastPostLabel,
  profile,
}: OpportunitiesScreenHeaderProps): React.ReactNode {
  const avatarFallback = profile?.title.trim().charAt(0).toUpperCase() || "@";

  return (
    <motion.header
      className={opportunitiesHeaderStyles}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <p className={opportunitiesKickerStyles}>{kicker}</p>
      <h1 className={opportunitiesTitleStyles}>{title}</h1>
      <p className={opportunitiesDescriptionStyles}>{description}</p>

      {profile ? (
        <div className="mt-5 rounded-2xl border border-border/80 bg-surface-elevated p-4 shadow-soft-sm sm:p-5">
          <div className="flex flex-wrap items-center gap-3">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.title}
                className="size-14 rounded-full border border-border/70 bg-muted object-cover"
              />
            ) : (
              <span className="inline-flex size-14 items-center justify-center rounded-full border border-border/70 bg-muted text-lg font-semibold text-muted-foreground">
                {avatarFallback}
              </span>
            )}
            <div className="min-w-0">
              <p className="font-display truncate text-lg font-bold tracking-[-0.025em] text-foreground">
                {profile.title}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {profile.subtitle}
              </p>
            </div>
          </div>

          <dl className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl bg-surface px-3 py-2 text-sm text-muted-foreground">
              <dt className="sr-only">{opportunitiesLabel}</dt>
              <dd>{profile.opportunitiesSummary}</dd>
            </div>
            <div className="rounded-xl bg-surface px-3 py-2 text-sm text-muted-foreground">
              <dt className="sr-only">{locationLabel}</dt>
              <dd>{profile.locationSummary}</dd>
            </div>
            <div className="rounded-xl bg-surface px-3 py-2 text-sm text-muted-foreground">
              <dt className="sr-only">{lastPostLabel}</dt>
              <dd>{profile.lastPostedSummary}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </motion.header>
  );
}
