# 30 — Shareable profile-page copy design

Status: Complete

## Context

Communities and opportunity authors will use their Openings destination as a public link in GitHub, Instagram, and other profile surfaces. Visitors may land without prior knowledge of Openings.

## Audience and action

- Primary visitor: a candidate following a community or author link.
- Primary action: understand the source and browse its open opportunities.
- Secondary action: open a specific opportunity and continue to the original GitHub issue.

## Copy thesis

Lead with the publisher and the available opportunities, not with Openings as a product. Explain that roles were shared by that community or person, keep claims factual, and let the live opportunity count and recent activity provide proof.

## Design decisions

- Community headline: localized equivalent of “Open opportunities from {name}”.
- User headline: localized equivalent of “Opportunities shared by {name}”.
- Use a short trust line explaining that listings come from public GitHub community activity.
- Replace directory language such as “available in the system” with visitor-facing discovery copy.
- Give users a stable `/users/[handle]` page, while retaining compatibility for the existing author query.
- Add route-specific canonical, Open Graph, and Twitter metadata for shared-link previews.

## Completion checklist

- [x] Confirm the public-link audience, promise, proof, and CTA.
- [x] Define community, user, directory, and metadata copy boundaries.
- [x] Preserve all current filtering and opportunity-detail behavior.
