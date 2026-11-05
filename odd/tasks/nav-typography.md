# Feature: nav-typography

## Objective

Replace the underlined hover on navigation and inline links with a deliberate
hover/focus treatment, and raise typographic quality across the page using only the
existing system font stack.

## Problem

Navigation and footer links rely on `text-decoration: underline` for hover, which reads
as default browser behavior rather than a designed state. Type is set at a single weight
with no optical tracking, so headings and UI text look flat next to the aurora hero and
the gold service cards.

## Why

Owner asked for an attractive navbar hover, a suitable typeface, and removal of the
underlines.

## Scope

- Nav links: pill-style hover/focus with a gold hairline, no underline.
- Brand: color transition on hover/focus.
- Footer and service-card links: color-based hover, no underline.
- Global visible focus ring for links, replacing the underline as the focus affordance.
- Typography: heading weights and negative tracking, balanced wrapping, body line-height,
  UI weights (nav, buttons), dark-background smoothing.

## Out of scope

- Loading a webfont or adding any new network request.
- Changing the type scale tokens.
- Layout changes outside link and text rendering.

## Constraints

- Zero font requests: keep the `system-ui` stack.
- WCAG AA on every new text/background pair.
- No `!important`.
- Respect `prefers-reduced-motion` for the new transitions.

## Route

- T1-T4: delegated writer. Trigger: writer rule, 2 non-trivial files.

## Tasks

- [x] T1. Nav link hover/focus treatment without underline.
- [x] T2. Footer and service-card link hover treatment.
- [x] T3. Typography pass: weights, tracking, wrapping, smoothing.
- [x] T4. Verification: contrast, focus visibility, no underline on hover.

## Acceptance criteria

- No `text-decoration: underline` on hover or focus anywhere.
- Every link has a visible focus indicator with at least 3:1 contrast against adjacent colors.
- Headings use weight 600/700 with tracking between -0.01em and -0.03em.
- No new network requests, dependencies, or font files.

## Checks

- `node --check js/main.js`
- CSS braces balanced.
- Gate: no `!important`, no `text-decoration: underline`.
- Manual: tab through nav and footer, focus must stay visible.

## Progress

- 2026-11-05: implemented in `css/styles.css` as work unit `feat(ui): pill nav hover and typography pass`.
- `node --check js/main.js`: exit 0.
- CSS braces balanced: 104 open / 104 close.
- Gate `!important` and `text-decoration: underline`: no matches.
- Contrast: nav muted 7.97:1; hover nav 14.16:1; gold 9.19:1; footer muted 7.97:1.
- Reduced motion: covered by the existing global transition-duration reset.
- Follow-up (not blocking): `.service-card__link` base `transition` still lists the unused
  `text-decoration-color`.
