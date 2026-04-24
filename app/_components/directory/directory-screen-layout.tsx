import type { ReactNode } from "react";

interface DirectoryScreenLayoutProps {
  kicker: string;
  title: string;
  description: string;
  filters: ReactNode;
  list: ReactNode;
}

export function DirectoryScreenLayout({
  kicker,
  title,
  description,
  filters,
  list,
}: DirectoryScreenLayoutProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {kicker}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-10">
        {filters}
        {list}
      </div>
    </section>
  );
}
