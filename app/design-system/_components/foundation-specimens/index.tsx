import {
  ArrowUpRight,
  BriefcaseBusiness,
  CircleHelp,
  Search,
} from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { BrandMarkSize } from "@/components/brand/brand-mark/types";
import { Wordmark } from "@/components/brand/wordmark";
import { WordmarkSize } from "@/components/brand/wordmark/types";
import { cn } from "@/lib/utils/tailwind";
import { LocalizedCopy } from "../localized-copy";
import type { ColorRoleSpecimen, ScaleSpecimen, TypographyRoleSpecimen } from "./types";

const COLOR_ROLES = Object.freeze<ColorRoleSpecimen[]>([
  { token: "canvas", purposeKey: "canvas", swatchClassName: "bg-canvas", foregroundPair: "foreground" },
  { token: "paper", purposeKey: "paper", swatchClassName: "bg-paper", foregroundPair: "foreground" },
  { token: "surface", purposeKey: "surface", swatchClassName: "bg-surface", foregroundPair: "foreground" },
  { token: "surface-elevated", purposeKey: "elevated", swatchClassName: "bg-surface-elevated shadow-floating-sm", foregroundPair: "foreground" },
  { token: "overlay", purposeKey: "overlay", swatchClassName: "bg-overlay", foregroundPair: "foreground-inverse" },
  { token: "foreground", purposeKey: "foreground", swatchClassName: "bg-foreground", textClassName: "text-background", foregroundPair: "background" },
  { token: "muted-foreground", purposeKey: "muted", swatchClassName: "bg-muted-foreground", textClassName: "text-background", foregroundPair: "background" },
  { token: "line", purposeKey: "line", swatchClassName: "bg-line", foregroundPair: "foreground" },
  { token: "primary", purposeKey: "primary", swatchClassName: "bg-primary", textClassName: "text-primary-foreground", foregroundPair: "primary-foreground" },
  { token: "lavender", purposeKey: "lavender", swatchClassName: "bg-lavender", textClassName: "text-lavender-foreground", foregroundPair: "lavender-foreground" },
  { token: "mint", purposeKey: "mint", swatchClassName: "bg-mint", textClassName: "text-mint-foreground", foregroundPair: "mint-foreground" },
  { token: "peach", purposeKey: "peach", swatchClassName: "bg-peach", textClassName: "text-peach-foreground", foregroundPair: "peach-foreground" },
  { token: "positive", purposeKey: "status", swatchClassName: "bg-positive", textClassName: "text-positive-foreground", foregroundPair: "positive-foreground" },
  { token: "warning", purposeKey: "status", swatchClassName: "bg-warning", textClassName: "text-warning-foreground", foregroundPair: "warning-foreground" },
  { token: "info", purposeKey: "status", swatchClassName: "bg-info", textClassName: "text-info-foreground", foregroundPair: "info-foreground" },
  { token: "destructive-soft", purposeKey: "status", swatchClassName: "bg-destructive-soft", textClassName: "text-destructive-soft-foreground", foregroundPair: "destructive-soft-foreground" },
]);

const SPACING_SCALE = Object.freeze<ScaleSpecimen[]>([
  { label: "8", className: "w-2" },
  { label: "12", className: "w-3" },
  { label: "16", className: "w-4" },
  { label: "24", className: "w-6" },
  { label: "32", className: "w-8" },
  { label: "48", className: "w-12" },
  { label: "64", className: "w-16" },
]);

const TYPOGRAPHY_ROLES = Object.freeze<TypographyRoleSpecimen[]>([
  { token: "text-hero · display", className: "text-hero font-display font-semibold", sample: "displaySample" },
  { token: "text-public-profile", className: "text-public-profile font-display font-semibold", sample: "displaySample" },
  { token: "text-page-title · directory", className: "text-page-title font-display font-semibold", sample: "displaySample" },
  { token: "text-product-title", className: "text-product-title font-display font-semibold", sample: "displaySample" },
  { token: "text-section-title", className: "text-section-title font-display font-semibold", sample: "displaySample" },
  { token: "text-marketing-body", className: "text-marketing-body", sample: "bodySample" },
  { token: "text-metadata", className: "text-metadata", sample: "bodySample" },
  { token: "font-editorial", className: "font-editorial text-2xl", sample: "editorialSample" },
  { token: "font-mono · technical", className: "font-mono text-technical", sample: "bodySample" },
]);

export function FoundationSpecimens(): React.ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-card-title font-semibold"><LocalizedCopy select={(messages) => messages.designSystem.specimens.semanticColors} /></h3>
        <p className="mt-1 text-sm text-muted-foreground">
          <LocalizedCopy select={(messages) => messages.designSystem.specimens.themeComparison} />
        </p>
        <dl className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {COLOR_ROLES.map((role) => (
            <div key={role.token} className="min-w-0 overflow-hidden rounded-card border border-line bg-surface">
              <dt
                className={cn(
                  "flex min-h-24 items-end p-3",
                  role.swatchClassName,
                  role.textClassName,
                )}
              >
                <code className="font-mono text-xs">{role.token}</code>
              </dt>
              <dd className="px-3 py-2.5 text-xs leading-5 text-muted-foreground">
                <LocalizedCopy select={(messages) => messages.designSystem.specimens.colorPurposes[role.purposeKey]} />
                <code className="font-mono mt-1 block text-[0.68rem] text-foreground">+ {role.foregroundPair}</code>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 rounded-control border border-line bg-paper p-4 text-sm leading-6 text-muted-foreground">
          <LocalizedCopy select={(messages) => messages.designSystem.specimens.colorLimits} />
        </p>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-2">
        <div className="min-w-0 rounded-card border border-line bg-surface p-5 sm:p-6">
          <h3 className="font-display text-card-title font-semibold"><LocalizedCopy select={(messages) => messages.designSystem.specimens.typographyRoles} /></h3>
          <div className="mt-5 min-w-0 max-h-[34rem] space-y-5 overflow-x-hidden overflow-y-auto pr-2">
            {TYPOGRAPHY_ROLES.map((role) => (
              <div key={role.token} className="min-w-0 border-b border-line pb-4 last:border-0">
                <code className="font-mono break-words text-xs text-primary-deep">{role.token}</code>
                <p className={cn("mt-2 min-w-0 line-clamp-2 break-words text-foreground", role.className)}>
                  <LocalizedCopy select={(messages) => messages.designSystem.specimens[role.sample]} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-card border border-line bg-surface p-5 sm:p-6">
          <h3 className="font-display text-card-title font-semibold"><LocalizedCopy select={(messages) => messages.designSystem.specimens.spacingShapeElevation} /></h3>
          <div className="mt-5 space-y-6">
            <div className="flex flex-wrap items-end gap-3" aria-labelledby="spacing-rhythm-label">
              <span id="spacing-rhythm-label" className="sr-only"><LocalizedCopy select={(messages) => messages.designSystem.specimens.spacingShapeElevation} /></span>
              {SPACING_SCALE.map((item) => (
                <div key={item.label} className="grid justify-items-center gap-2">
                  <span className={cn("h-8 rounded-sm bg-primary-soft", item.className)} />
                  <code className="font-mono text-xs text-muted-foreground">{item.label}</code>
                </div>
              ))}
            </div>
            <div className="grid min-w-0 gap-3 text-center text-xs text-muted-foreground sm:grid-cols-3">
              <div className="min-w-0 rounded-control border border-line bg-paper p-4"><code className="font-mono [overflow-wrap:anywhere]">control</code></div>
              <div className="min-w-0 rounded-card border border-line bg-paper p-4"><code className="font-mono [overflow-wrap:anywhere]">card</code></div>
              <div className="min-w-0 rounded-panel border border-line bg-paper p-4 shadow-floating-sm"><code className="font-mono [overflow-wrap:anywhere]">floating</code></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-card-title font-semibold"><LocalizedCopy select={(messages) => messages.designSystem.specimens.iconContract} /></h3>
        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 text-foreground"><Search className="size-4" aria-hidden="true" /> <LocalizedCopy select={(messages) => messages.designSystem.specimens.searchWithLabel} /></span>
          <span className="inline-flex items-center gap-2 text-foreground"><BriefcaseBusiness className="size-5" aria-hidden="true" /> <LocalizedCopy select={(messages) => messages.designSystem.specimens.productConcept} /></span>
          <span className="inline-flex items-center gap-2 text-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.sourceLink} /> <ArrowUpRight className="size-4" aria-hidden="true" /></span>
          <button type="button" className="inline-flex size-11 items-center justify-center rounded-control border border-line text-foreground" aria-labelledby="icon-help-label">
            <span id="icon-help-label" className="sr-only"><LocalizedCopy select={(messages) => messages.designSystem.specimens.iconHelpAriaLabel} /></span>
            <CircleHelp className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrandSpecimens(): React.ReactNode {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex min-h-44 flex-col justify-between rounded-panel border border-line bg-canvas p-5 text-foreground">
          <code className="font-mono text-xs text-muted-foreground">canvas</code>
          <div className="flex min-w-0 items-center justify-center py-4">
            <Wordmark
              size={WordmarkSize.Compact}
              className="!h-auto !w-full"
            />
          </div>
        </div>
        <div className="flex min-h-44 flex-col justify-between rounded-panel border border-line bg-paper p-5 text-foreground">
          <code className="font-mono text-xs text-muted-foreground">paper</code>
          <div className="flex min-w-0 items-center justify-center py-4">
            <Wordmark
              size={WordmarkSize.Display}
              className="!h-auto !w-full"
            />
          </div>
        </div>
        <div className="flex min-h-44 flex-col justify-between rounded-panel border border-line bg-surface-elevated p-5 text-foreground shadow-floating-sm">
          <code className="font-mono text-xs text-muted-foreground">surface-elevated</code>
          <div className="flex min-w-0 items-center justify-center py-4">
            <Wordmark
              size={WordmarkSize.Compact}
              className="!h-auto !w-full"
            />
          </div>
        </div>
        <div className="flex min-h-44 flex-col justify-between rounded-panel border border-line bg-surface-inverse p-5 text-foreground-inverse">
          <code className="font-mono text-xs text-foreground-inverse">inverse</code>
          <div className="flex min-w-0 items-center justify-center py-4">
            <Wordmark
              size={WordmarkSize.Compact}
              className="!h-auto !w-full text-foreground-inverse"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-6 rounded-card border border-line bg-surface p-5 text-foreground">
        {[
          { label: "16", size: BrandMarkSize.Micro },
          { label: "24", size: BrandMarkSize.Compact },
          { label: "32", size: BrandMarkSize.Standard },
          { label: "48", size: BrandMarkSize.Feature },
        ].map((item) => (
          <div key={item.label} className="grid justify-items-center gap-2">
            <BrandMark size={item.size} />
            <code className="font-mono text-xs text-muted-foreground">{item.label}</code>
          </div>
        ))}
      </div>
      <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
        <p className="rounded-card border border-line bg-surface p-4"><strong className="block text-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.wordmarkFirstTitle} /></strong><LocalizedCopy select={(messages) => messages.designSystem.specimens.wordmarkFirstDescription} /></p>
        <p className="rounded-card border border-line bg-surface p-4"><strong className="block text-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.compactMarkTitle} /></strong><LocalizedCopy select={(messages) => messages.designSystem.specimens.compactMarkDescription} /></p>
        <p className="rounded-card border border-line bg-surface p-4"><strong className="block text-foreground"><LocalizedCopy select={(messages) => messages.designSystem.specimens.oneIdentityTitle} /></strong><LocalizedCopy select={(messages) => messages.designSystem.specimens.oneIdentityDescription} /></p>
      </div>
    </div>
  );
}
