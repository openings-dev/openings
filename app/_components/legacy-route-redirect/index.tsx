"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { Button } from "@/components/ui/button";

interface LegacyRouteRedirectProps {
  destinationPath: string;
}

function resolveDestination(destinationPath: string): string | null {
  const currentUrl = new URL(window.location.href);
  const destinationUrl = new URL(destinationPath, currentUrl.origin);
  destinationUrl.search = currentUrl.search;
  destinationUrl.hash = currentUrl.hash;

  if (
    destinationUrl.pathname === currentUrl.pathname &&
    destinationUrl.search === currentUrl.search &&
    destinationUrl.hash === currentUrl.hash
  ) {
    return null;
  }

  return `${destinationUrl.pathname}${destinationUrl.search}${destinationUrl.hash}`;
}

export function LegacyRouteRedirect({
  destinationPath,
}: LegacyRouteRedirectProps): React.ReactNode {
  const { messages } = useI18n();

  React.useEffect(() => {
    const destination = resolveDestination(destinationPath);
    if (!destination) return;

    window.location.replace(destination);
  }, [destinationPath]);

  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4 border-l border-primary pl-5 sm:pl-7">
        <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
          {messages.legacyRedirect.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {messages.legacyRedirect.description}
        </p>
        <Button asChild>
          <a href={destinationPath}>{messages.legacyRedirect.action}</a>
        </Button>
      </div>
    </section>
  );
}
