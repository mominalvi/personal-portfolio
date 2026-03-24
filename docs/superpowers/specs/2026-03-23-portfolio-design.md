# Portfolio Site — Design Spec
Date: 2026-03-23

## Goal

Single-page personal portfolio for Momin Alvi. Audience: recruiters and engineering managers. Tone: polished, honest, confident — not flashy.

---

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`, `@import "tailwindcss"` syntax)
- Geist Sans (loaded via `next/font/google`)
- Deployed on Vercel

---

## Visual Design

- **Background:** near-black (`bg-neutral-950`)
- **Primary text:** off-white (`text-neutral-200`)
- **Muted text:** `text-neutral-500`
- **Dividers/borders:** `border-neutral-800`
- **Accent (primary CTA only):** `text-blue-400` / `bg-blue-500`
- **Font:** Geist Sans — clean, developer-aesthetic, already loaded in scaffold
- **No:** glassmorphism, gradients, 3D, heavy animation, icon spam

---

## Layout

Single page with smooth scroll (`scroll-smooth` on `<html>`). Fixed/sticky navbar. Centered max-width container: `max-w-4xl mx-auto px-6`.

---

## Component Architecture

```
src/
  app/
    layout.tsx        # root layout — Geist font vars, dark bg, scroll-smooth
    page.tsx          # assembles all section components top to bottom
    globals.css       # Tailwind v4 import + base overrides
  components/
    Navbar.tsx
    Hero.tsx
    Experience.tsx
    FeaturedWork.tsx
    About.tsx
    Competencies.tsx
    Contact.tsx
    Footer.tsx
```

Each component is self-contained with no shared state. `page.tsx` is a simple stack of `<Section />` components.

---

## Sections

### Navbar
- Fixed top, full-width, subtle bottom border (`border-neutral-800`), dark bg
- Left: "Momin Alvi" in normal weight (not bold — acts as a wordmark, not a shout)
- Right: text links — Experience · Featured Work · About · Contact
- `href="#experience"` etc. for smooth scroll anchors
- Mobile: links collapse or stack (hamburger not required — links are short enough to fit on one line at small sizes with reduced font)

### Hero
- Full viewport height (`min-h-screen`) centered content
- Small label above headline: `MOMIN ALVI` in uppercase tracking-widest, muted
- Headline: `"I build tools and explore AI systems."` — large, `text-4xl md:text-6xl`, font-semibold
- Supporting text: paragraph beneath, `text-neutral-400`, max-width constrained for readability
- CTA row: "Contact" (primary — blue, solid), "GitHub" (secondary — border/ghost), "LinkedIn" (secondary — border/ghost)
- All three are `<a>` tags, not `<button>` — they're links

### Experience
- `id="experience"` anchor
- Section heading: "Experience" small uppercase label
- Line-based layout — each entry is a single row: `date | org | role`
- Separated by subtle `border-b border-neutral-800`
- Hover: `hover:text-neutral-100` on the row
- Newest first:
  - 2025 – Present · Ontario Teachers' Pension Plan (OTPP) · Software Engineering Intern
  - 2025 · Riipen / Kaniq · Industry Project — AI Infrastructure
  - 2024 – 2025 · COMPSA · Backend Developer
  - 2024 · Vita Home · Entrepreneur in Residence
- No bullets, no cards, no descriptions

### Featured Work
- `id="featured-work"` anchor
- Single project — no grid
- Left column: label "Case Study 01", title "ScholarPups", description, tech tags (plain text dots `·`), link
- Right column: placeholder image area — a bordered `div` with muted text "Project screenshot" — easy to swap
- Tech tags: `Python · FastAPI · PostgreSQL · Redis` — small, muted, no pill styling
- Link: "View Project Documentation →" as a plain styled `<a>`

### About
- `id="about"` anchor
- Two-column on desktop (`md:grid-cols-2`), single column on mobile
- Short paragraph of copy (from spec)
- Left column is the text; right column can be empty or a subtle visual element (TBD — start empty)

### Core Competencies
- `id="competencies"` anchor (not in nav — nav goes to About)
- Three groups in a row on desktop, stacked on mobile:
  - Languages: Python, Java, TypeScript, SQL, C
  - Frameworks: React, Next.js, FastAPI, Node.js
  - Tools: Docker, AWS, Git, PostgreSQL
- Each group: small uppercase label, then items as plain comma-separated text
- No icon grid, no pill badges

### Contact
- `id="contact"` anchor
- Headline: "Let's connect"
- Supporting: "Open to opportunities and interesting work."
- Three links: Email · GitHub · LinkedIn — spaced out, clean
- Email uses `mailto:`, GitHub and LinkedIn use real URLs

### Footer
- Minimal single row: "Momin Alvi" · © 2025 · Email · GitHub · LinkedIn
- `text-neutral-500`, small font size
- Border top

---

## Implementation Notes

- Tailwind v4 — no `tailwind.config.ts`. Custom theme tokens go in `globals.css` under `@theme`.
- `layout.tsx` sets `className="scroll-smooth"` on `<html>`, dark bg on `<body>`.
- `metadata` in `layout.tsx` updated to real title/description.
- All external links get `target="_blank" rel="noopener noreferrer"`.
- All placeholder hrefs labeled with comments for easy swap.
- Responsive: desktop / tablet / mobile — tested at `sm`, `md`, `lg` breakpoints.
- Semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<footer>`, `<header>`.
