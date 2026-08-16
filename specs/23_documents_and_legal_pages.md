# Documents and Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a calm editorial reading experience for project documentation and legal content.

**Architecture:** The document page controls measure and title hierarchy; the Markdown renderer controls semantic element rhythm. Content lookup and sources remain untouched.

**Tech Stack:** Next.js Server Components, React Markdown, Remark GFM, Tailwind CSS

---

### Task 1: Refine document frame

**Files:**
- Modify: `app/_components/document-page/index.tsx`

- [x] **Step 1:** Establish a readable maximum measure, responsive gutters, title block, metadata rhythm, and section spacing.
- [x] **Step 2:** Align document entry with the application grid while keeping the reading column intentionally narrower.
- [x] **Step 3:** Preserve Server Component loading, localized content, and every route.

### Task 2: Refine long-form typography

**Files:**
- Modify: `app/_components/document-page/document-markdown/index.tsx`

- [x] **Step 1:** Define clear heading cadence and readable paragraph measure and line height.
- [x] **Step 2:** Refine lists, links, separators, tables, blockquotes, inline code, code blocks, and overflow.
- [x] **Step 3:** Ensure anchors, external links, and semantic Markdown output remain unchanged.

### Task 3: Validate and commit

- [x] **Step 1:** Run `npm run lint`, `npm run test:outreach`, and `npm run build`; expect exit code 0.
- [x] **Step 2:** Review all six document/legal routes at mobile and desktop widths in both themes.
- [x] **Step 3:** Commit with `feat: refine document reading experience`.
