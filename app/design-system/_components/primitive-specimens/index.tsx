"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function PrimitiveSpecimens(): React.ReactNode {
  const { messages } = useI18n();
  const copy = messages.designSystem;

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-card-title font-semibold">
          {copy.specimens.buttonsAndLinks}
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button">{copy.actions.primary}</Button>
          <Button type="button" variant="secondary">
            {copy.specimens.secondaryButton}
          </Button>
          <Button type="button" variant="outline">
            {copy.specimens.outlineButton}
          </Button>
          <Button type="button" variant="ghost">
            {copy.specimens.quietButton}
          </Button>
          <Button type="button" variant="destructive">
            {copy.specimens.removeButton}
          </Button>
          <Button type="button" disabled>
            {copy.labels.disabledState}
          </Button>
          <Button asChild variant="link">
            <Link href="#usage">
              {copy.actions.secondary}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
          <Field
            label={copy.specimens.searchTermsLabel}
            hint={copy.specimens.searchTermsHint}
          >
            <Input leadingVisual={<Mail />} />
          </Field>
        </div>
        <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
          <Field
            label={copy.interactive.invalidLabel}
            error={copy.interactive.invalidError}
          >
            <Input aria-invalid="true" defaultValue="invalid@" />
          </Field>
        </div>
      </div>

      <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <h3 className="font-display text-card-title font-semibold">
          {copy.specimens.badgesAndStatus}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>TypeScript</Badge>
          <Badge tone="primary">{copy.labels.selectedState}</Badge>
          <Badge tone="positive">{messages.opportunities.card.statusOpen}</Badge>
          <Badge tone="warning">{copy.specimens.needsReview}</Badge>
          <Badge tone="informational">{copy.specimens.publicSource}</Badge>
        </div>
      </div>
    </div>
  );
}
