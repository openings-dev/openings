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
}: DirectoryScreenLayoutProps): ReactNode {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 xl:px-10 xl:pt-12">
      <header className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          {kicker}
        </p>
        <h1 className="font-display mt-2.5 text-balance text-3xl font-bold tracking-[-0.045em] text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2.5 max-w-2xl text-[15px] leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-8 sm:mt-10">
        {filters}
        {list}
      </div>
    </section>
  );
}
