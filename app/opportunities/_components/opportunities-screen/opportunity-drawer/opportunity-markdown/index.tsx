import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OpportunityMarkdownProps {
  body: string;
}

export function OpportunityMarkdown({ body }: OpportunityMarkdownProps): React.ReactNode {
  return (
    <div className="prose-opportunity">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="font-display mb-2 mt-6 text-lg font-bold tracking-[-0.025em] text-foreground first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="font-display mb-2 mt-5 text-base font-bold tracking-[-0.02em] text-foreground first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-1.5 mt-3 text-sm font-medium text-foreground first:mt-0">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-sm leading-6.5 text-muted-foreground last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-3 space-y-1 pl-4 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="text-sm leading-6 text-muted-foreground marker:text-muted-foreground/60">{children}</li>,
          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline decoration-primary/35 underline-offset-3 hover:text-primary-hover">{children}</a>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
          code: ({ children, className }) =>
            className?.includes("language-") ? (
              <code className="block w-full overflow-x-auto rounded-xl border-2 border-border bg-surface px-3.5 py-3 font-mono text-xs leading-5 text-foreground shadow-soft-sm">{children}</code>
            ) : (
              <code className="rounded border border-border/50 bg-muted/50 px-1 py-0.5 font-mono text-xs text-foreground">{children}</code>
            ),
          pre: ({ children }) => <pre className="mb-3 last:mb-0">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="mb-3 rounded-r-lg border-l-4 border-primary bg-accent py-2 pl-4 pr-3 last:mb-0">{children}</blockquote>,
          hr: () => <hr className="my-3 border-border" />,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
