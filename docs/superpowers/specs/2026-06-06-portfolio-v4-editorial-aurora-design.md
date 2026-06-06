# Portfolio v4 — "Editorial Aurora" Design Spec

**Date:** 2026-06-06
**Status:** Approved (design), pending implementation plan
**Author:** Momin Alvi (with Claude)

## Goal

The current portfolio is structurally complete and clean but reads **static and flat**. This redesign keeps the existing content and editorial structure but makes the site feel **alive** through motion, depth, and a single coordinated accent system. It also closes the remaining ship-blockers (dead links, metadata, local build).

Target: shippable within 1–2 days.

## Concept

**"Editorial Aurora."** The existing architectural/editorial skeleton — grid lines, JetBrains Mono labels, `NN //` section numbers, tight spacing — is retained as the disciplined backbone. On top of it we layer:

- **Aurora ambient glow** (direction B) — a faint, drifting gradient mesh behind the whole page.
- **Bento interactivity** (direction C) — content sections become interactive tiles with hover-lift and shimmer.
- **Kinetic typography** (direction D) — oversized animated hero name + rotating word.

The editorial discipline (direction A) is the connective tissue that keeps the combination tasteful rather than chaotic. Each effect owns one zone; effects are not stacked everywhere.

## Design System

| Token | Value | Notes |
|---|---|---|
| Accent (light) | `#6d5cff` → `#a855f7` | Indigo → Violet gradient |
| Accent (single-color) | `#6d5cff` | links, focus rings |
| Canvas (dark) | `#0a0a0d` | near-black |
| Grid lines | `#ffffff08` on dark | 40px cells |
| Aurora blobs | `#6d5cff`, `#a855f7` | 2 blobs, opacity ~0.12, blur ~110–120px |
| Display font | Space Grotesk | already loaded |
| Body font | Inter | already loaded |
| Mono/label font | JetBrains Mono | already loaded |

- One coordinated accent system: buttons, rotating word, links, glow all share the indigo→violet accent. No competing accent colors.
- **Light mode is retained.** Aurora and grid adapt to light theme (lower-opacity tinted blobs on light canvas). Theme toggle behavior unchanged.

## Motion

- **Library:** Motion (`motion`, formerly Framer Motion) — React 19 / Next 16 compatible.
- **Patterns:**
  - Scroll-triggered reveals with stagger (sections fade/rise on enter viewport).
  - Magnetic buttons (subtle cursor-follow on hover) for hero CTAs.
  - Hover-lift + border brighten on bento tiles.
  - Shimmer sweep on the featured project tile.
  - Shine sweep on the hero name (CSS).
  - Rotating word in hero ("I build → AI systems / product tools / web experiences").
  - Auto-scrolling marquee for skills (CSS keyframes with gradient edge-mask).
- **Accessibility:** ALL motion gated behind `prefers-reduced-motion: reduce` — reduced-motion users get static, fully-readable content with instant (non-animated) appearance.

## Sections

Order top to bottom:

1. **Hero** — oversized shimmering "MOMIN ALVI", rotating-word line, bio, three magnetic gradient CTAs (GitHub / LinkedIn / Resume). Aurora behind. `00 // Index` label.
2. **Experience** — existing roles (OTPP, Kaniq, Queen's COMPSA, DDQIC, McMaster, Kumon per existing hierarchy). Scroll-reveal cards, subtle indigo hover-glow. Keep "Earlier" grouping (McMaster/Kumon).
3. **Selected Projects** — bento grid. **Coursify.ca = featured** large tile with shimmer; Scholar Pups = secondary tile. Optional live GitHub stat mini-tile. Hover-lift on all.
4. **Index module + Awards** — retained, with hover-lift on items. Layout grid position unchanged (Index right column, Awards below it).
5. **Skills** — auto-scrolling marquee track(s) with gradient edge-fade, replacing the static chip row.
6. **GitHub Activity** — full-width proper contribution heatmap (52 weeks, current 251 contributions via existing GraphQL API). Larger than current.
7. **Beyond Code** *(NEW)* — personality section anchored on training/fitness. **No music.** Light editorial blurb or 1–2 tiles. Content to be confirmed with user; keep factual and neutral.
8. **Footer** — links wired to real URLs.

## Fixes bundled in

- **Dead links (7):** Hero GitHub/LinkedIn; Projects Coursify/Scholar Pups; Footer GitHub/LinkedIn/Resume. Email already works. Replace `#` with real URLs.
- **Metadata:** add `metadataBase`, OpenGraph title/description/image, favicon (replace default Next.js icon). Improves link-preview when shared.
- **Local build:** change `build` script from `next build` (Turbopack, fails on this machine's corrupted `@next/swc-darwin-arm64` binary) to `next build --webpack`. Vercel builds unaffected either way.

## Content needed from user (for implementation)

These are not design decisions; build proceeds with placeholders until provided:

- LinkedIn profile URL.
- GitHub: `github.com/mominalvi` (confirmed) — confirm final.
- Coursify.ca: live URL and/or repo.
- Scholar Pups: live URL and/or repo.
- Resume: PDF to drop in `/public`, or external link.
- Beyond Code: which hobbies beyond training (if any), kept factual.

## Constraints & Non-Goals

- **Keep all existing content** — no fabricated experience, awards, or claims. Hero status copy stays neutral/builder-focused (never implies job-searching).
- **Light + dark both supported.**
- **No new heavy dependencies** beyond Motion.
- Not redesigning the information architecture wholesale — same sections, elevated execution.
- Performance: keep it fast (Lighthouse-friendly). Aurora/grid are CSS, cheap. Motion reveals are GPU-transform based.

## Success Criteria

- Site feels alive: visible (tasteful) motion on load and scroll, no jank.
- `prefers-reduced-motion` fully respected.
- No dead `#` links.
- Builds locally (`npm run build`) and on Vercel.
- Both themes look intentional.
- Deployed to Vercel with working metadata/favicon.
