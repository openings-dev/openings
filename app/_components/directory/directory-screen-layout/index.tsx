import type { ReactNode } from "react";

interface DirectoryScreenLayoutProps {
  kicker: string;
  title: string;
  description: string;
  discovery: ReactNode;
  list: ReactNode;
}

export function DirectoryScreenLayout({
  kicker,
  title,
  description,
  discovery,
  list,
}: DirectoryScreenLayoutProps): ReactNode {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 xl:px-10 xl:pt-12">
      <header className="max-w-4xl border-b border-line pb-8 sm:pb-10">
        <p className="text-label font-semibold uppercase tracking-[0.12em] text-primary-deep">
          {kicker}
        </p>
        <h1 className="font-display mt-3 text-balance text-page-title font-semibold tracking-[-0.04em] text-foreground">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-product-body text-muted-foreground sm:text-marketing-body">
          {description}
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-8 sm:mt-8">
        {discovery}
        {list}
      </div>
    </section>
  );
}
