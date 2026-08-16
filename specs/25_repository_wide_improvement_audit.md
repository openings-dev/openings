# 25 — Repository-wide improvement audit

Status: Complete

## Goal

Audit the complete application after the structural and visual programs, then convert residual, evidence-backed debt into bounded implementation stages.

## Findings

- Opportunity cards expose a button-like article containing nested buttons, creating an ambiguous keyboard and assistive-technology interaction tree.
- The mobile opportunity dialog is modal but is not programmatically named and does not restore focus explicitly.
- Primary navigation, theme controls, social navigation, and profile summary labels contain untranslated accessible copy.
- Locale changes update the current DOM only and are lost on reload.
- Several components omit the repository-required explicit `React.ReactNode` return contract.
- Root metadata describes the product too generically.
- Both npm and Yarn lockfiles are tracked even though npm is canonical, and the runtime requirement is not machine-readable in `package.json`.

## Decision

Apply targeted hardening rather than another visual redesign. Preserve routes, remote schemas, static export, filter behavior, theme behavior, and the Calm Professional design system.

## Completion checklist

- [x] Record actionable findings and boundaries.
- [x] Define ordered implementation specs 26–29.
- [x] Confirm no unrelated product feature enters scope.

## Validation

- `npm run lint`
