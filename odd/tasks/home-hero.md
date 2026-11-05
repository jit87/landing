# Feature: home-hero

## Objective

Give the first screen more presence: a larger, tighter hero title and a slightly stronger
brand mark, so the home does not read as small or bland.

## Problem

The `h1` caps at `3.25rem` and the brand sits at base size. On a wide desktop the hero
title looks modest next to the aurora and the gold cards, and the brand is easy to miss.

## Why

Owner: "mejorar el nombre de la home, el texto se ve pequeño y algo anodino".

## Scope

- Raise the `h1` clamp maximum and tighten line-height and letter-spacing.
- Constrain the hero measure so the title breaks into two or three strong lines.
- Give the brand more presence with a larger size and slight tracking.
- Keep the aurora layer working over the title.

## Out of scope

- Renaming the company or rewriting the pitch paragraph.
- Section headings, layout structure, new fonts.

## Constraints

- Exactly one `h1`.
- No horizontal overflow at 320px.
- WCAG AA on the title against the page background.
- The aurora `mix-blend-mode: darken` must keep tinting only the glyphs.
- No `!important`, no new dependencies.

## Route

- T1-T3: delegated writer. Trigger: writer rule, 2 non-trivial files.

## Tasks

- [x] T1. Raise the hero title scale and tighten its typography.
- [x] T2. Give the brand more presence.
- [ ] T3. Verification: 320px, 768px and 1280px; one `h1`; aurora intact.
  Static gates pass; no browser in this session, so rendered line count and overflow
  were estimated, not observed.

## Acceptance criteria

- `--text-3xl` maximum is at least `4rem` and the `h1` uses it.
- The hero title occupies two or three lines at 1280px and never overflows at 320px.
- The aurora still tint the glyphs and stays hidden when blend mode is unsupported.
- Brand is visually distinct from the nav links.

## Checks

- `node --check js/main.js`
- CSS braces balanced.
- Gate: exactly one `<h1>`; no `!important`.
- Gate: no horizontal overflow at 320px.

## Progress

- 2026-11-05: feature created, pending implementation.
- 2026-11-05: T1-T2 implemented inline (single file, mechanical CSS changes).
  `--text-3xl` is now `clamp(2.25rem, 1.5rem + 4.2vw, 4.5rem)`; `h1` uses `line-height: 1.02`
  and `letter-spacing: -0.035em`; `.brand` moves to `var(--text-lg)` with `-0.02em` tracking.
  No explicit measure was added: the container caps at `68rem` and `text-wrap: balance`
  already splits the 39-character title into two balanced lines at wide viewports.
- Checks observed: CSS braces 131/131; exactly one `h1`; no `!important`, no `console.log`;
  `--text-3xl` is used only by `h1`; colors untouched so contrast is unchanged.
- Estimated line breaks: 320px -> ~3 lines at 36px; 768px -> ~2 lines at 56px;
  1280px -> 2 lines at 72px inside a 1088px container.
