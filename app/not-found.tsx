import Link from "next/link";
import { LegacyRouteRedirect } from "@/app/_components/legacy-route-redirect";

export default function NotFound(): React.ReactNode {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <LegacyRouteRedirect />
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <p className="text-sm font-semibold uppercase text-primary">Not found</p>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The page you requested does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Open opportunities
        </Link>
      </div>
    </section>
  );
}
