import type { ReactNode } from "react";
import { OpeningsMotif } from "@/app/_components/openings-motif";

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
      <header className="max-w-4xl rounded-xl border-2 border-border bg-accent p-6 shadow-soft-lg sm:p-8">
        <OpeningsMotif className="mb-5" />
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-accent-foreground">
          {kicker}
        </p>
        <h1 className="font-display mt-2.5 text-balance text-3xl font-black tracking-[-0.045em] text-foreground sm:text-5xl">
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
