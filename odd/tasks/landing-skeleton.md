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

- [ ] T1. Repository scaffolding: `.gitignore`, folder layout, SVG placeholder assets.
- [ ] T2. Semantic HTML with SEO head and placeholder content.
- [ ] T3. Design tokens and mobile-first stylesheet.
- [ ] T4. Contact form validation and submission handling.
- [ ] T5. Verification: structure, accessibility and performance checks.

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
