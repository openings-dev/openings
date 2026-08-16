"use client";

import { motion } from "framer-motion";
import { LinkIcon, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { OpeningsMotif } from "@/app/_components/openings-motif";
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
  const { messages } = useI18n();
  const avatarFallback = profile?.title.trim().charAt(0).toUpperCase() || "@";
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: profile?.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(messages.opportunities.card.shareCopied);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error(messages.opportunities.card.shareFailed);
    }
  };

  return (
    <motion.header
      className={opportunitiesHeaderStyles}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <OpeningsMotif className="mb-5" />
      <p className={opportunitiesKickerStyles}>{kicker}</p>
      <h1 className={opportunitiesTitleStyles}>{title}</h1>
      <p className={opportunitiesDescriptionStyles}>{description}</p>

      {profile ? (
        <div className="mt-5 rounded-xl border-2 border-border bg-card p-4 shadow-soft-md sm:p-5">
          <div className="flex flex-wrap items-center gap-3">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.title}
                className="size-14 rounded-full border-2 border-border bg-muted object-cover"
              />
            ) : (
              <span className="inline-flex size-14 items-center justify-center rounded-full border-2 border-border bg-muted text-lg font-black text-muted-foreground">
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
            <div className="rounded-lg border-2 border-border bg-surface px-3 py-2 text-sm font-semibold text-muted-foreground">
              <dt className="sr-only">{opportunitiesLabel}</dt>
              <dd>{profile.opportunitiesSummary}</dd>
            </div>
            <div className="rounded-lg border-2 border-border bg-surface px-3 py-2 text-sm font-semibold text-muted-foreground">
              <dt className="sr-only">{locationLabel}</dt>
              <dd>{profile.locationSummary}</dd>
            </div>
            <div className="rounded-lg border-2 border-border bg-surface px-3 py-2 text-sm font-semibold text-muted-foreground">
              <dt className="sr-only">{lastPostLabel}</dt>
              <dd>{profile.lastPostedSummary}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-3 border-t-2 border-border pt-4">
            <Button asChild><a href="#opportunity-results"><LinkIcon className="size-4" />{opportunitiesLabel}</a></Button>
            <Button type="button" variant="outline" onClick={handleShare}><Share2 className="size-4" />{messages.opportunities.card.share}</Button>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
