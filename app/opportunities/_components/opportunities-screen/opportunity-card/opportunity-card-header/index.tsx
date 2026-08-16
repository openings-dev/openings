import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OpportunityCardHeaderProps {
  title: string;
  excerpt: string;
}

export function OpportunityCardHeader({
  title,
  excerpt,
}: OpportunityCardHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="font-display text-[17px] font-bold leading-snug tracking-[-0.025em] text-foreground">
        {title}
      </p>
      <div className="line-clamp-2 max-w-[62ch] text-sm leading-5.5 text-muted-foreground">
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
