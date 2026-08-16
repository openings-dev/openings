import { cn } from "@/lib/utils/tailwind";

interface OpeningsMotifProps {
  className?: string;
}

export function OpeningsMotif({ className }: OpeningsMotifProps): React.ReactNode {
  return (
    <span className={cn("pointer-events-none grid w-fit grid-cols-3 items-end gap-1.5", className)} aria-hidden="true">
      <span className="size-3 rounded-sm border-2 border-border bg-primary shadow-soft-sm" />
      <span className="mb-2 size-5 rounded-sm border-2 border-border bg-card shadow-soft-sm" />
      <span className="size-4 rounded-sm border-2 border-border bg-[#f7d56b] shadow-soft-sm dark:bg-[#75621d]" />
    </span>
  );
}
