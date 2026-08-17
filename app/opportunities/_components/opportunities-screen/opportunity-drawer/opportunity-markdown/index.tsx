import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OpportunityMarkdownProps {
  body: string;
  emptyDescription: string;
}

export function OpportunityMarkdown({
  body,
  emptyDescription,
}: OpportunityMarkdownProps): React.ReactNode {
  if (!body.trim()) {
    return (
      <p className="text-[0.9375rem] leading-7 text-muted-foreground">
        {emptyDescription}
      </p>
    );
  }

  return (
    <div className="prose-opportunity min-w-0 max-w-full [overflow-wrap:anywhere]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h3 className="font-display mb-2 mt-7 text-xl font-semibold tracking-[-0.025em] text-foreground first:mt-0">{children}</h3>,
          h2: ({ children }) => <h3 className="font-display mb-2 mt-6 text-lg font-semibold tracking-[-0.02em] text-foreground first:mt-0">{children}</h3>,
          h3: ({ children }) => <h4 className="mb-2 mt-5 text-base font-semibold text-foreground first:mt-0">{children}</h4>,
          p: ({ children }) => <p className="mb-5 min-w-0 max-w-full text-[0.9375rem] leading-7 text-muted-foreground last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-5 min-w-0 max-w-full list-disc space-y-1.5 pl-5 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-5 min-w-0 max-w-full list-decimal space-y-1.5 pl-5 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="min-w-0 max-w-full text-[0.9375rem] leading-7 text-muted-foreground marker:text-muted-foreground/60">{children}</li>,
          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-deep underline decoration-primary/45 underline-offset-3 hover:text-foreground">{children}</a>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
          code: ({ children, className }) =>
            className?.includes("language-") ? (
              <code className="block w-full max-w-full overflow-x-auto rounded-card border border-line bg-surface-muted/70 px-4 py-3.5 font-mono text-xs leading-5 text-foreground">{children}</code>
            ) : (
              <code className="rounded-sm bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{children}</code>
            ),
          pre: ({ children }) => <pre className="mb-5 min-w-0 max-w-full last:mb-0">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="mb-5 border-l border-primary bg-primary-soft/45 py-2 pl-4 pr-3 last:mb-0">{children}</blockquote>,
          hr: () => <hr className="my-6 border-line" />,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
