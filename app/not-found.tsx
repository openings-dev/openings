"use client";

import Link from "next/link";
import { LegacyRouteRedirect } from "@/app/_components/legacy-route-redirect";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { Button } from "@/components/ui/button";

export default function NotFound(): React.ReactNode {
  const { messages } = useI18n();
  const copy = messages.notFound;

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <LegacyRouteRedirect />
      <div className="space-y-4 border-l border-primary pl-5 sm:pl-7">
        <p className="text-label font-semibold text-primary-deep">{copy.kicker}</p>
        <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
          {copy.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {copy.description}
        </p>
        <Button asChild><Link href="/">{copy.action}</Link></Button>
      </div>
    </section>
  );
}
