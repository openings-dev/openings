import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { OpportunityViewMode } from "@/app/opportunities/_components/opportunities-screen/types";
import { cn } from "@/lib/utils/tailwind";

interface OpportunityCardHeaderProps {
  title: string;
  excerpt: string;
  titleId: string;
  viewMode: OpportunityViewMode;
}

export function OpportunityCardHeader({
  title,
  excerpt,
  titleId,
  viewMode,
}: OpportunityCardHeaderProps): React.ReactNode {
  const isList = viewMode === OpportunityViewMode.List;

  return (
    <div className="space-y-2">
      <h3
        id={titleId}
        className="font-display text-card-title font-semibold tracking-[-0.025em] text-foreground sm:text-xl"
      >
        {title}
      </h3>
      <div
        className={cn(
          "max-w-[62ch] text-sm leading-5.5 text-muted-foreground",
          isList ? "line-clamp-2" : "line-clamp-3",
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <span className="font-medium text-foreground">{children} </span>,
            h2: ({ children }) => <span className="font-medium text-foreground">{children} </span>,
            h3: ({ children }) => <span className="font-medium text-foreground">{children} </span>,
            p: ({ children }) => <span>{children} </span>,
            ul: ({ children }) => <span>{children}</span>,
            ol: ({ children }) => <span>{children}</span>,
            li: ({ children }) => <span>{children} </span>,
            a: ({ children }) => <span className="underline underline-offset-2">{children} </span>,
            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => <code className="rounded bg-muted/40 px-1 py-0.5 font-mono text-xs">{children}</code>,
            pre: ({ children }) => <span>{children}</span>,
            blockquote: ({ children }) => <span>{children}</span>,
            hr: () => null,
          }}
        >
          {excerpt}
        </ReactMarkdown>
      </div>
    </div>
  );
}
