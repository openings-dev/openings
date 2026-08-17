import { ArrowUpRight, MapPin } from "lucide-react";
import { DirectoryEntityCard } from "@/app/_components/directory/directory-entity-card";
import { DocumentMarkdown } from "@/app/_components/document-page/document-markdown";
import { ProfileHero } from "@/app/opportunities/_components/opportunities-screen/profile-hero";
import {
  ShareableProfileKind,
  type ShareableProfileSource,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { getTranslations } from "@/lib/translations/get-translations";
import { LocalizedCopy } from "../localized-copy";

const COMMUNITY_PROFILE_SPECIMEN: ShareableProfileSource = Object.freeze({
  kind: ShareableProfileKind.Community,
  profile: {
    repository: "openings-dev/community-opportunities-and-maintainers",
    repositoryUrl: "https://github.com/openings-dev/openings",
    name: "openings.dev/specimen",
    opportunitiesCount: 24,
    lastPostedAt: "2026-08-15T12:00:00.000Z",
  },
});

const PUBLISHER_PROFILE_SPECIMEN: ShareableProfileSource = Object.freeze({
  kind: ShareableProfileKind.Publisher,
  profile: {
    handle: "specimen-author",
    name: "specimen-author",
    opportunitiesCount: 8,
    lastPostedAt: "2026-08-14T12:00:00.000Z",
  },
});

function getDocumentSpecimen(locale: (typeof AVAILABLE_LOCALES)[number]["code"]): string {
  const messages = getTranslations(locale);
  return `## ${messages.documents.tableOfContentsLabel}

${messages.designSystem.guidance.content}

> ${messages.designSystem.specimens.claimsBoundary}

| ${messages.designSystem.sections.foundations} | ${messages.designSystem.sections.usage} |
| --- | --- |
| paper | ${messages.designSystem.specimens.colorPurposes.paper} |
| line | ${messages.designSystem.specimens.colorPurposes.line} |

\`font-mono\` · github.com/openings-dev/openings`;
}

export function ProductPatternSpecimens(): React.ReactNode {
  return (
    <div className="space-y-6">
      <p className="inline-flex rounded-pill border border-warning-foreground/20 bg-warning px-3 py-1.5 text-xs font-semibold text-warning-foreground">
        <LocalizedCopy select={(messages) => messages.designSystem.labels.representativeData} />
      </p>

      <div className="space-y-4 overflow-hidden rounded-panel border border-line bg-background">
        <p className="px-5 pt-5 text-sm text-muted-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.profileSpecimenLabel} /></p>
        <ProfileHero source={COMMUNITY_PROFILE_SPECIMEN} headingLevel={3} specimenMode />
        <ProfileHero source={PUBLISHER_PROFILE_SPECIMEN} headingLevel={3} specimenMode />
      </div>

      <div className="max-w-md">
        <DirectoryEntityCard
          href="#usage"
          avatarUrl=""
          avatarFallback="O"
          title="openings.dev/specimen"
          subtitle="openings-dev/openings"
          opportunitiesLabel={<LocalizedCopy select={(messages) => messages.designSystem.specimens.directoryCount} />}
          actionLabel={<LocalizedCopy select={(messages) => messages.designSystem.specimens.directoryAction} />}
          details={[
            { id: "location", icon: MapPin, label: <LocalizedCopy select={(messages) => messages.profiles.locationLabel} />, value: <LocalizedCopy select={(messages) => messages.designSystem.specimens.values.global} /> },
            { id: "source", icon: ArrowUpRight, label: <LocalizedCopy select={(messages) => messages.profiles.publicSourceLabel} />, value: "GitHub" },
          ]}
        />
      </div>
    </div>
  );
}

export function ContentSpecimens(): React.ReactNode {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card border border-line bg-surface p-5">
          <p className="text-label font-semibold text-primary-deep"><LocalizedCopy select={(messages) => messages.designSystem.specimens.messageThesis} /></p>
          <p className="font-display mt-3 text-2xl font-semibold tracking-[-0.03em]">
            <LocalizedCopy select={(messages) => messages.home.title} />
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            <LocalizedCopy select={(messages) => messages.designSystem.specimens.claimsBoundary} />
          </p>
        </div>
        <dl className="rounded-card border border-line bg-surface p-5 text-sm">
          <div className="border-b border-line pb-3">
            <dt className="font-semibold text-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.actionVocabulary} /></dt>
            <dd className="mt-1 text-muted-foreground"><LocalizedCopy select={(messages) => messages.designSystem.actions.primary} /> · <LocalizedCopy select={(messages) => messages.opportunities.card.openOriginal} /></dd>
          </div>
          <div className="pt-3">
            <dt className="font-semibold text-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.avoid} /></dt>
            <dd className="mt-1 text-muted-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.avoidDescription} /></dd>
          </div>
        </dl>
      </div>
      <div className="localized-copy rounded-card border border-line bg-paper p-5 sm:p-7">
        {AVAILABLE_LOCALES.map(({ code }) => (
          <div key={code} lang={code}>
            <DocumentMarkdown markdown={getDocumentSpecimen(code)} idPrefix={`specimen-${code}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
