"use client";

import { ArrowDown } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { Button } from "@/components/ui/button";
import { OpportunityNetwork } from "./opportunity-network";

export function HomeHero(): React.ReactNode {
  const { messages } = useI18n();
  const homeMessages = messages.home;

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-paper"
      aria-labelledby="home-hero-title"
    >
      <div className="mx-auto w-full max-w-[90rem] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 xl:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-6">
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-primary-deep">
              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
              {homeMessages.kicker}
            </p>
            <h1
              id="home-hero-title"
              className="font-display max-w-[15ch] text-[clamp(2.625rem,13vw,3.25rem)] font-semibold leading-[0.99] tracking-[-0.055em] text-foreground sm:text-hero"
            >
              {homeMessages.title}
            </h1>
            <p className="mt-6 max-w-[38rem] text-marketing-body text-muted-foreground sm:mt-7">
              {homeMessages.description}
            </p>

            <div className="mt-7 sm:mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#opportunity-results">
                  {homeMessages.primaryAction}
                  <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <p className="font-editorial mt-5 max-w-[34rem] text-base leading-6 text-muted-foreground sm:text-lg">
              {homeMessages.sourceStatement}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <OpportunityNetwork labels={homeMessages.network} />
          </div>
        </div>

        <dl className="mt-8 hidden border-t border-line pt-5 sm:grid sm:grid-cols-3 sm:gap-6 lg:mt-10">
          <div className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:py-0 sm:pr-6">
            <dt className="text-metadata font-medium text-muted-foreground">
              {homeMessages.proof.sourceLabel}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {homeMessages.proof.sourceValue}
            </dd>
          </div>
          <div className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:px-6 sm:py-0">
            <dt className="text-metadata font-medium text-muted-foreground">
              {homeMessages.proof.searchLabel}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {homeMessages.proof.searchValue}
            </dd>
          </div>
          <div className="py-4 sm:py-0 sm:pl-6">
            <dt className="text-metadata font-medium text-muted-foreground">
              {homeMessages.proof.destinationLabel}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {homeMessages.proof.destinationValue}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
