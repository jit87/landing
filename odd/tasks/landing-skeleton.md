# Feature: landing-skeleton

## Objective

Scaffold a dependency-free portfolio landing page (vanilla HTML/CSS/JS) with real semantic
structure, design tokens, SEO metadata, and a contact form wired for client-side validation,
so the owner can fill in real content without rewriting the foundation.

## Problem

The repository starts empty. The owner wants to build the landing themselves and use this
project as a portfolio piece. Without a skeleton that already respects the review checklist,
every later fix costs a rewrite.

## Scope

- Semantic single-page structure: skip link, header/nav, main (hero, projects, about, contact), footer.
- CSS design tokens and mobile-first stylesheet without fixed layout widths.
- Contact form: client validation, provider submission, success and error states.
- Basic SEO: title, meta description, canonical placeholder, Open Graph, Twitter card, `lang`, favicon.
- Placeholder copy and images, clearly marked with TODOs.

## Out of scope

- Backend, serverless functions, or any server-side validation (project is 100% front-end).
- Final copy, real project screenshots, personal branding.
- Build tooling, frameworks, dependencies, CSS preprocessors.
- Deployment and custom domain.

## Constraints

- No dependencies, no CDN, no build step, no `node_modules`.
- System font stack: zero font requests, zero font-induced layout shift.
- Exactly one `h1`; headings in order.
- No `!important`, no duplicated rules.
- WCAG AA contrast on every text/background pair and on form control borders.
- Classic script with `defer`; ES modules break when opening `index.html` over `file://`.
- Comments in English; visible UI copy in Spanish (`lang="es"`).

## Route

- T1–T4: delegated writer. Trigger: writer rule — 3+ non-trivial files.
- T5: parent inline. Trigger: deterministic verification, no source mutation.

## Tasks

- [x] T1. Repository scaffolding: `.gitignore`, folder layout, SVG placeholder assets. — 3807545
- [x] T2. Semantic HTML with SEO head and placeholder content. — e1a32ed
- [x] T3. Design tokens and mobile-first stylesheet. — d9c8404
- [x] T4. Contact form validation and submission handling. — f3ba7c8
- [x] T5. Verification: structure, accessibility and performance checks. — 02b8a7a
- [ ] T6. Native review: blocked on `managed_assets_outdated`.

## Verification evidence

- `node --check js/main.js` → exit 0.
- CSS braces balanced 58/58.
- Gates clean: no `!important`, no `console.log`, exactly one `<h1>`, every `<img>` with `alt`/`width`/`height`, every `label for=` bound, `lang="es"`, `script defer`.
- `gentle-ai review assess` → risk `medium`, 812 changed lines, `review_due: slice_budget_reached`.
- `gentle-ai review status` → `stop(managed_assets_outdated)`; `sync --dry-run` reports 14 apply steps over global managed components. Not executed.

## Corrections applied after reviewing writer output

- Honeypot used `aria-hidden` around a focusable input (`aria-hidden-focus` violation) → replaced with a native `hidden` input.
- Sticky header hid anchor targets → added `scroll-padding-top`.
- Avatar used a fixed `320x320`, distorting the 640x400 placeholder → `min(320px, 100%)` + `aspect-ratio: 1` + `object-fit: cover`.
- Hardcoded success color → `--color-success` token.
- Removed unused `.visually-hidden` rule (dead CSS).
- Five duplicated list resets → single `ul[class]` rule.
- Whitespace-only values passed client validation → trim check before validity gates.

## Pending (owner)

- Real copy, project URLs, social URLs, canonical domain, Web3Forms key.
- `og:image` and `twitter:image` are relative and SVG: social crawlers require an absolute PNG/JPG (1200x630).
- `href="#"` placeholders must not ship.

## Acceptance criteria

- One `h1`; every `img` has `alt`, `width` and `height`; every field has a real `label`.
- Layout survives at 320px; no fixed-width containers.
- No `console.log`, no unused code, no duplicate rules.
- Form reports success and failure in an `aria-live` region; first invalid field gets focus.
- All text and UI borders meet WCAG AA against their background.

## Checks

- `node --check js/main.js`
- Gate: no `!important`, no `console.log`, exactly one `<h1>`.
- Gate: every `<img` carries `alt=`; every input/textarea has a matching `label for=`.
- Gate: `lang=` present on `<html>`; `<script` uses `defer`.

## Placeholders to replace

- Name, role, pitch, bio, skills, three projects, social links, canonical URL, OG image.
- `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` in `js/main.js`.
- `assets/img/placeholder-project.svg` → real WebP/AVIF screenshots.
