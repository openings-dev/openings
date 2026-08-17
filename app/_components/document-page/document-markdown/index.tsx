import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { type ReactNode } from "react";
import { Link2 } from "lucide-react";
import { extractMarkdownHeadings } from "@/lib/content/markdown-headings";
import type { DocumentMarkdownProps } from "../types";

const HEADING_CLASS = "font-display group min-w-0 scroll-mt-28 font-semibold tracking-[-0.03em] text-foreground [overflow-wrap:anywhere]";
const LINK_CLASS = "font-medium text-primary-deep underline decoration-primary/45 underline-offset-4 transition-colors hover:text-foreground";

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return "";
}

function HeadingAnchor({ children, id }: { children: ReactNode; id: string }): React.ReactNode {
  return (
    <a
      href={`#${id}`}
      className="inline-flex max-w-full items-start gap-2 rounded-sm decoration-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
      <Link2 className="mt-[0.18em] size-[0.72em] shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true" />
    </a>
  );
}

export function DocumentMarkdown({ markdown, idPrefix }: DocumentMarkdownProps): React.ReactNode {
  const headingsBySourceLine = new Map(
    extractMarkdownHeadings(markdown, idPrefix).map((heading) => [
      heading.sourceLine,
      heading.id,
    ]),
  );
  const headingId = (
    children: ReactNode,
    sourceLine?: number,
  ): string => headingsBySourceLine.get(sourceLine ?? -1) ??
    `${idPrefix ?? "section"}-heading-${encodeURIComponent(getNodeText(children))}`;

  return (
    <article className="min-w-0 space-y-6 text-[15px] leading-7 text-foreground sm:text-base sm:leading-7.5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, node }) => {
            const id = headingId(children, node?.position?.start.line);
            return <h2 id={id} className={`${HEADING_CLASS} text-2xl sm:text-[1.6rem]`}><HeadingAnchor id={id}>{children}</HeadingAnchor></h2>;
          },
          h2: ({ children, node }) => {
            const id = headingId(children, node?.position?.start.line);
            return <h2 id={id} className={`${HEADING_CLASS} text-2xl sm:text-[1.6rem]`}><HeadingAnchor id={id}>{children}</HeadingAnchor></h2>;
          },
          h3: ({ children, node }) => {
            const id = headingId(children, node?.position?.start.line);
            return <h3 id={id} className={`${HEADING_CLASS} text-xl sm:text-[1.3rem]`}><HeadingAnchor id={id}>{children}</HeadingAnchor></h3>;
          },
          h4: ({ children, node }) => {
            const id = headingId(children, node?.position?.start.line);
            return <h4 id={id} className={`${HEADING_CLASS} text-lg`}><HeadingAnchor id={id}>{children}</HeadingAnchor></h4>;
          },
          h5: ({ children, node }) => {
            const id = headingId(children, node?.position?.start.line);
            return <h5 id={id} className={`${HEADING_CLASS} text-base`}><HeadingAnchor id={id}>{children}</HeadingAnchor></h5>;
          },
          h6: ({ children, node }) => {
            const id = headingId(children, node?.position?.start.line);
            return <h6 id={id} className={`${HEADING_CLASS} text-sm`}><HeadingAnchor id={id}>{children}</HeadingAnchor></h6>;
          },
          p: ({ children }) => <p className="min-w-0 text-[15px] leading-7 text-foreground [overflow-wrap:anywhere] sm:text-base sm:leading-7.5">{children}</p>,
          ul: ({ children }) => <ul className="min-w-0 list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground marker:text-muted-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="min-w-0 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-foreground marker:text-muted-foreground">{children}</ol>,
          blockquote: ({ children }) => <blockquote className="rounded-r-control border-l border-primary bg-primary-soft/55 py-3 pl-5 pr-4 text-foreground">{children}</blockquote>,
          pre: ({ children }) => <pre className="overflow-x-auto rounded-control border border-line bg-surface px-4 py-3 font-mono text-[13px] leading-6 text-foreground">{children}</pre>,
          code: ({ children, className }) => className
            ? <code className={className}>{children}</code>
            : <code className="rounded-sm bg-muted px-1.5 py-0.5 text-[13px] text-foreground">{children}</code>,
          a: ({ href = "", children }) => /^https?:\/\//.test(href)
            ? <a href={href} target="_blank" rel="noreferrer" className={LINK_CLASS}>{children}</a>
            : <Link href={href} className={LINK_CLASS}>{children}</Link>,
          hr: () => <hr className="border-border/70" />,
          table: ({ children }) => <div className="overflow-x-auto rounded-control border border-line"><table className="w-full border-collapse text-sm">{children}</table></div>,
          th: ({ children }) => <th className="border-b border-r border-line bg-surface-muted px-3 py-2 text-left font-semibold last:border-r-0">{children}</th>,
          td: ({ children }) => <td className="border-b border-r border-line px-3 py-2 align-top last:border-r-0">{children}</td>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
