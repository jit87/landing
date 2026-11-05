# Feature: contact-envelope

## Objective

Replace the inline contact form with a centered envelope button that opens the form in a
native modal dialog. On desktop the dialog is centered and wider; the section no longer
renders a static form or leaves empty space.

## Problem

The two-column desktop card still reads as a static form competing with the hero and the
service cards. The owner wants the form behind an envelope button, centered, and wider.

## Why

Owner request: a styled button opens an envelope containing the form (Option A, modal).

## Scope

- Contact section: centered intro plus an envelope button.
- Envelope art: CSS envelope whose flap lifts on hover/focus.
- Native `<dialog>` opened with `showModal()` containing the existing form.
- Dialog card: centered, `min(100% - 2rem, 44rem)` wide, close button, backdrop.
- Name and email side by side at >= 48rem; message, submit and status full width.
- JS: open, close, backdrop click, ESC via the native `cancel`, focus return, scroll lock.

## Out of scope

- Validation rules, error messages, Web3Forms configuration.
- New fields, consent checkbox, privacy copy.
- Any change to `odd/tasks/contact-form-desktop.md` mobile history beyond marking it superseded.

## Constraints

- Keep every `id`, `name`, `aria-describedby` and the honeypot intact: `js/main.js` depends on them.
- Use the native `<dialog>` element; no focus-trap library, no dependencies.
- Trigger: `aria-haspopup="dialog"` and `aria-controls="contact-dialog"`.
- Dialog: `aria-labelledby` pointing at its own heading.
- `prefers-reduced-motion` disables the envelope and dialog animations.
- No `!important`; WCAG AA on dialog text, close button and envelope label.

## Route

- T1-T4: delegated writer. Trigger: writer rule, 3 non-trivial files.

## Tasks

- [x] T1. Markup: centered intro, envelope trigger, native dialog with the form moved inside.
- [x] T2. CSS: envelope art and states, dialog and backdrop, centered wide card, form grid.
- [x] T3. JS: open/close wiring, backdrop click, scroll lock, focus return.
- [ ] T4. Verification: open/close, keyboard, reduced motion, existing form behavior.
  Static gates pass; interactive open/close, ESC and reduced-motion were not exercised
  in a browser (no browser available in this session).

## Acceptance criteria

- The contact section no longer renders a visible form; it renders the envelope button.
- Clicking the button opens a centered modal with the form; ESC and backdrop click close it.
- Focus returns to the envelope button after closing.
- Form ids, names, honeypot and validation behavior are unchanged.
- At 320px the dialog fits without horizontal scroll.
- No `console.log`, no `!important`, `node --check js/main.js` passes.

## Checks

- `node --check js/main.js`
- CSS braces balanced.
- Gate: every `label for=` still matches an input id.
- Gate: no `!important`, no `console.log`.
- Gate: exactly one `h1`, `lang="es"`, `script defer`.

## Progress

- 2026-11-05: feature created, pending implementation.
- 2026-11-05: T1-T3 implemented by a delegated writer. `index.html` now renders a centered
  intro plus `.envelope` (`data-contact-open`, `aria-haspopup="dialog"`,
  `aria-controls="contact-dialog"`); the unchanged form lives in `#contact-dialog` inside
  `.contact-dialog__card`. CSS adds the envelope art with a flipping flap, the dialog card
  (`min(100% - 2rem, 44rem)`, `space-4` padding, `space-6` at >= 48rem), backdrop, entry
  animations, `html.has-dialog` scroll lock and reduced-motion overrides. JS adds open,
  close, backdrop-click and focus-return wiring before form initialization; validation and
  fetch code untouched.
- Checks observed: `node --check js/main.js` OK; CSS braces 129/129; exactly one `h1`;
  `div` 11/11 and `dialog` 1/1 balanced; `label for=` all resolve; no `!important`, no
  `console.log`; `aria-controls="contact-dialog"` present.
- Known visual risk: the card's outer shadow is clipped by `.contact-dialog { overflow: auto }`
  on desktop. Not fixed; cosmetic only.
