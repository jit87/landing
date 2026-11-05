# Feature: contact-form-desktop

## Objective

Give the contact section a deliberate desktop layout: intro on the left, form as a
bordered card on the right, with name and email in two columns. Mobile keeps the current
single-column stack.

## Problem

The form is a 40rem column pinned to the left inside a 68rem container, leaving the right
half of the desktop viewport empty. Every field is full width and stacked, so the section
reads as an unstyled default form rather than part of the page.

## Why

Owner feedback: the form must look right on desktop; mobile is acceptable as it is.

## Scope

- `.contact` wrapper containing `.contact__intro` (heading + pitch) and the form.
- Desktop (>= 48rem): two-column section, form as a surface card with gold border and
  padding, name/email side by side, message full width, button left with status beside it.
- Mobile: unchanged single-column order, full-width controls.

## Out of scope

- Validation logic, error messages, Web3Forms integration.
- New fields, consent checkbox, subject line, privacy copy.
- Any mobile visual change.

## Constraints

- Keep every existing `id`, `name`, `aria-describedby` and the honeypot intact:
  `js/main.js` depends on them.
- Mobile first: base rules describe the current mobile layout; desktop lives in a media query.
- WCAG AA on labels, borders and status text against the new card background.
- No `!important`.

## Route

- T1-T4: delegated writer. Trigger: writer rule, 2 non-trivial files.

## Tasks

- [x] T1. Restructure contact section markup: intro wrapper, form class, message field modifier.
- [x] T2. Desktop two-column section and form card.
- [x] T3. Two-column name/email row plus button/status row at desktop.
- [x] T4. Verification: mobile unchanged, desktop layout, focus order, contrast.

## Acceptance criteria

- At >= 48rem the section renders two columns and the form renders as a card.
- At < 48rem the DOM order and visual stack match the previous layout.
- Name and email share a row only at desktop; message spans the full form width.
- No `id`, `name` or `aria-*` attribute renamed.
- Form still passes `node --check` and the existing gates.

## Checks

- `node --check js/main.js`
- Gate: every `label for=` still matches an input id.
- Gate: no `!important`.
- Manual: 320px, 768px and 1280px viewports.

## Progress

- 2026-11-05: implemented in `index.html` and `css/styles.css` as work unit
  `feat(ui): two-column contact section on desktop`.
- `node --check js/main.js`: exit 0.
- CSS braces balanced: 110 open / 110 close.
- Label/id gate: 3 `label for=` targets, all resolve.
- `div` balance: 10 open / 10 close.
- No `!important`; honeypot and `form-status` still present.
- Mobile: base `.contact-form` is a single-column grid with the same gap, margin and
  40rem max-width as the previous flex stack; card styling exists only at >= 48rem.
- Contrast: input border `#78716c` on card `#1a1530` ~3.66:1 (non-text AA); labels and
  status colors have ample contrast on `#1a1530`.
- Follow-up (not blocking): sticky intro offset `top: 6rem` must be revisited if the
  header height changes.
