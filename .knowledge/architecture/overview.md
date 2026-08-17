# Architecture Overview

> Map the current Next.js application and its ownership boundaries.

## Runtime model

The application uses the App Router and `output: "export"`. Server Components and build-time functions fetch public remote JSON to generate static output, including canonical job pages and route-specific social images. Focused Client Components own filters, theme and language controls, fullscreen dialogs, and other browser interactions.

## Source map

```text
app/
├── _components/                 # UI shared by route segments
├── _hooks/                      # route-level reusable client behavior
├── community/                   # community directory and detail route
├── docs/                        # rendered contributor documents
├── opportunities/               # opportunity discovery feature
├── users/                       # author directory
├── layout.tsx                   # root shell, fonts, metadata, providers
└── page.tsx                     # root route
components/
├── footer/                      # global footer composition
├── header/                      # global header composition
├── icons/                       # shared non-Lucide brand icons
├── providers/                   # cross-cutting client providers
└── ui/                          # application-wide primitives
lib/
├── constants/                   # fixed application values
├── content/                     # localized Markdown loading
├── opportunities/               # data access and opportunity domain logic
├── translations/                # typed locale dictionaries
└── utils/                        # domain-independent helpers
docs/                            # localized Markdown rendered by routes
public/                          # logos and static brand assets
```

## Ownership rules

- Keep route-specific code under its route segment.
- Keep route-shared code under `app/_components/` or `app/_hooks/` only when multiple routes consume it.
- Keep application-wide components under `components/`.
- Keep remote-data access and domain transformations outside React components.
- Promote a unit only after reuse crosses its current ownership boundary.
- Do not introduce Atomic Design folders or speculative layers.

## Rendering boundary

Pages and layouts remain Server Components unless framework or browser behavior requires otherwise. Add `"use client"` at the smallest interactive boundary. Do not move remote build-time reads into client effects merely to simplify component props.

## Continuous improvement

The repository-wide structural and visual refactors are complete. New work should be driven by current evidence—accessibility audits, rendering behavior, measured performance, or a product requirement—instead of repeating historical pressure points. Specifications 25–29 record the post-refactor hardening pass.
