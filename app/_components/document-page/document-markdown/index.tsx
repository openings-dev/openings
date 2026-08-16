"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type React from "react";
import type { DocumentMarkdownProps } from "../types";

const HEADING_CLASS = "font-display font-bold tracking-[-0.03em] text-foreground";
const LINK_CLASS = "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-hover";

export function DocumentMarkdown({ markdown }: DocumentMarkdownProps): React.ReactNode {
  return (
    <article className="space-y-6 text-[15px] leading-7 text-foreground/95 sm:text-base sm:leading-7.5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className={`${HEADING_CLASS} text-3xl sm:text-[2rem]`}>{children}</h1>,
          h2: ({ children }) => <h2 className={`${HEADING_CLASS} text-2xl sm:text-[1.6rem]`}>{children}</h2>,
          h3: ({ children }) => <h3 className={`${HEADING_CLASS} text-xl sm:text-[1.3rem]`}>{children}</h3>,
          h4: ({ children }) => <h4 className={`${HEADING_CLASS} text-lg`}>{children}</h4>,
          p: ({ children }) => <p className="text-[15px] leading-7 text-foreground/88 sm:text-base sm:leading-7.5">{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground/90 marker:text-muted-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-7 text-foreground/90 marker:text-muted-foreground">{children}</ol>,
          blockquote: ({ children }) => <blockquote className="rounded-r-xl border-l-2 border-primary/45 bg-accent/45 py-2 pl-4 pr-3 text-muted-foreground">{children}</blockquote>,
          pre: ({ children }) => <pre className="overflow-x-auto rounded-xl border border-border/70 bg-surface px-4 py-3 text-[13px] leading-6 text-foreground">{children}</pre>,
          code: ({ children, className }) => className
            ? <code className={className}>{children}</code>
            : <code className="rounded-sm bg-muted px-1.5 py-0.5 text-[13px] text-foreground">{children}</code>,
          a: ({ href = "", children }) => /^https?:\/\//.test(href)
            ? <a href={href} target="_blank" rel="noreferrer" className={LINK_CLASS}>{children}</a>
            : <Link href={href} className={LINK_CLASS}>{children}</Link>,
          hr: () => <hr className="border-border/70" />,
          table: ({ children }) => <div className="overflow-x-auto rounded-xl border border-border/70"><table className="w-full border-collapse text-sm">{children}</table></div>,
          th: ({ children }) => <th className="border border-border bg-muted/45 px-3 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-border px-3 py-2 align-top">{children}</td>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
