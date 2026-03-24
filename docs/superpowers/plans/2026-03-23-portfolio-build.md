# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Momin Alvi's personal portfolio as a single-page Next.js site with 8 section components, assembled in `page.tsx`.

**Architecture:** Each section is an isolated React component in `src/components/`. `page.tsx` stacks them. No shared state, no context, no data fetching — purely static JSX with Tailwind v4 utility classes. `layout.tsx` and `globals.css` set the global dark theme and font.

**Tech Stack:** Next.js 16.2.1 (App Router), TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), Geist Sans (`next/font/google`)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/app/globals.css` | Modify | Strip light-mode vars, keep Geist font mapping |
| `src/app/layout.tsx` | Modify | Dark bg, scroll-smooth, real metadata |
| `src/app/page.tsx` | Rewrite | Assemble all section components |
| `src/components/Navbar.tsx` | Create | Fixed top nav with anchor links |
| `src/components/Hero.tsx` | Create | Full-height hero with headline and CTAs |
| `src/components/Experience.tsx` | Create | Line-based experience rows |
| `src/components/FeaturedWork.tsx` | Create | Single project case study |
| `src/components/About.tsx` | Create | Short bio paragraph |
| `src/components/Competencies.tsx` | Create | Three skill groups |
| `src/components/Contact.tsx` | Create | Links section |
| `src/components/Footer.tsx` | Create | Minimal footer row |

---

## Important: Tailwind v4 Notes

- No `tailwind.config.ts` — all config lives in `globals.css` under `@theme inline`
- Standard utility classes (`bg-neutral-950`, `text-neutral-200`, etc.) work as-is
- `font-sans` utility resolves to `--font-geist-sans` via the `@theme inline` mapping already in `globals.css`
- `backdrop-blur-sm` and all other v3-era utilities still work in v4

## Important: Commit Workflow (CLAUDE.md)

After each task, output a draft commit message in this format and **stop to wait for approval before running `git commit`**:

```
Draft commit: "feat: add <section> component"
Files: src/components/<Section>.tsx
```

Never run `git push`.

---

## Task 1: Foundation — `globals.css` + `layout.tsx`

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite `globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
}
```

Removes the light/dark CSS variable approach. Background and text colors will be set directly via Tailwind classes on `<body>` in layout.tsx.

- [ ] **Step 2: Rewrite `layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Momin Alvi",
  description: "Software engineer building tools and exploring AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} scroll-smooth`}>
      <body className="bg-neutral-950 text-neutral-200 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
```

Note: `Geist_Mono` import is removed — not needed for this site.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors, no Tailwind errors. If the build fails, fix before continuing.

- [ ] **Step 4: Draft commit**

```
Draft commit: "feat: configure dark theme and global layout"
Files: src/app/globals.css, src/app/layout.tsx
```

Stop and wait for approval before committing.

---

## Task 2: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="text-neutral-200 text-sm font-normal tracking-wide hover:text-neutral-100 transition-colors"
        >
          Momin Alvi
        </a>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap justify-end gap-x-6 gap-y-1 list-none">
            {[
              { label: "Experience", href: "#experience" },
              { label: "Featured Work", href: "#featured-work" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Stub it into `page.tsx` to verify it renders**

Temporarily replace the contents of `src/app/page.tsx` with:

```tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen" />
    </>
  );
}
```

- [ ] **Step 3: Run build to verify no TypeScript errors**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 4: Draft commit**

```
Draft commit: "feat: add Navbar component"
Files: src/components/Navbar.tsx
```

Stop and wait for approval. Do not yet commit `page.tsx` — it will be committed in the final assembly task.

---

## Task 3: Hero

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-6">
          Momin Alvi
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold text-neutral-100 leading-tight mb-6">
          I build tools and
          <br className="hidden sm:block" />
          {" "}explore AI systems.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-xl mb-10">
          Early-career software engineer building through internships, industry
          projects, and hands-on work. Focused on consistency, clean execution,
          and getting better over time.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-500 transition-colors"
          >
            Contact
          </a>
          <a
            href="https://github.com/mominalvi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-neutral-700 text-neutral-300 text-sm font-medium rounded hover:border-neutral-500 hover:text-neutral-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/momin-alvi/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-neutral-700 text-neutral-300 text-sm font-medium rounded hover:border-neutral-500 hover:text-neutral-100 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `page.tsx` stub and verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add Hero component"
Files: src/components/Hero.tsx
```

Stop and wait for approval.

---

## Task 4: Experience

**Files:**
- Create: `src/components/Experience.tsx`

- [ ] **Step 1: Create the component**

```tsx
const experiences = [
  {
    date: "2025 – Present",
    org: "Ontario Teachers' Pension Plan (OTPP)",
    role: "Software Engineering Intern",
  },
  {
    date: "2026 – Present",
    org: "Kaniq",
    role: "Industry Project — AI Infrastructure",
  },
  {
    date: "2024 – 2025",
    org: "COMPSA",
    role: "Backend Developer",
  },
  {
    date: "2024",
    org: "Vita Home",
    role: "Entrepreneur in Residence",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-10">
          Experience
        </p>
        <div className="divide-y divide-neutral-800">
          {experiences.map((item) => (
            <div
              key={item.org}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 py-4 group cursor-default"
            >
              <span className="text-sm text-neutral-500 sm:w-36 shrink-0">
                {item.date}
              </span>
              <span className="text-neutral-300 group-hover:text-neutral-100 transition-colors sm:flex-1">
                {item.org}
              </span>
              <span className="text-sm text-neutral-500 sm:w-72 sm:text-right">
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add Experience section"
Files: src/components/Experience.tsx
```

Stop and wait for approval.

---

## Task 5: Featured Work

**Files:**
- Create: `src/components/FeaturedWork.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function FeaturedWork() {
  return (
    <section id="featured-work" className="py-24 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-10">
          Featured Work
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs text-neutral-500 tracking-widest uppercase mb-3">
              Case Study 01
            </p>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
              ScholarPups
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Hackathon project built to improve how students discover
              scholarships and get application feedback. I worked on the
              frontend, focusing on UI/UX and integrating the user experience
              with backend APIs.
            </p>
            <p className="text-sm text-neutral-500 mb-6">
              Python · FastAPI · PostgreSQL · Redis
            </p>
            <a
              href="https://github.com/connor-leung/scholar-pups"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              View Project Documentation →
            </a>
          </div>
          {/* Replace this div with <Image /> once a real screenshot is available */}
          <div className="border border-neutral-800 rounded aspect-video flex items-center justify-center">
            <p className="text-sm text-neutral-600">Project screenshot</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add FeaturedWork section"
Files: src/components/FeaturedWork.tsx
```

Stop and wait for approval.

---

## Task 6: About

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function About() {
  return (
    <section id="about" className="py-24 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-10">
          About
        </p>
        <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl">
          I&apos;m a developer who learns best by building. My focus is on
          gaining real experience through internships and projects, constantly
          refining my skills and working toward steady, intentional improvement
          in every line of code.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add About section"
Files: src/components/About.tsx
```

Stop and wait for approval.

---

## Task 7: Core Competencies

**Files:**
- Create: `src/components/Competencies.tsx`

- [ ] **Step 1: Create the component**

```tsx
const groups = [
  { label: "Languages", items: "Python, Java, TypeScript, SQL, C" },
  { label: "Frameworks", items: "React, Next.js, FastAPI, Node.js" },
  { label: "Tools", items: "Docker, AWS, Git, PostgreSQL" },
];

export default function Competencies() {
  return (
    <section id="competencies" className="py-24 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-10">
          Core Competencies
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="text-xs text-neutral-500 tracking-widest uppercase mb-3">
                {g.label}
              </p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {g.items}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add Competencies section"
Files: src/components/Competencies.tsx
```

Stop and wait for approval.

---

## Task 8: Contact

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-neutral-100 mb-4">
          Let&apos;s connect
        </h2>
        <p className="text-neutral-400 mb-8">
          Open to opportunities and interesting work.
        </p>
        <div className="flex flex-wrap gap-6">
          <a
            href="mailto:momin.alvi@queensu.ca"
            className="text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/mominalvi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/momin-alvi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add Contact section"
Files: src/components/Contact.tsx
```

Stop and wait for approval.

---

## Task 9: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8">
      <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
        <span>Momin Alvi</span>
        <span>© 2026</span>
        <a
          href="mailto:momin.alvi@queensu.ca"
          className="hover:text-neutral-300 transition-colors"
        >
          Email
        </a>
        <a
          href="https://github.com/mominalvi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/momin-alvi/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Draft commit**

```
Draft commit: "feat: add Footer component"
Files: src/components/Footer.tsx
```

Stop and wait for approval.

---

## Task 10: Final Assembly — `page.tsx`

**Files:**
- Rewrite: `src/app/page.tsx`

- [ ] **Step 1: Rewrite `page.tsx`**

Replace the entire file with:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Competencies from "@/components/Competencies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Experience />
        <FeaturedWork />
        <About />
        <Competencies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

Note: `pt-14` offsets for the fixed 56px (`h-14`) navbar.

- [ ] **Step 2: Run final build**

```bash
npm run build
```

Expected: clean build, no TypeScript errors, no missing module errors.

- [ ] **Step 3: Spot-check in dev server**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Navbar is fixed at top, links scroll to correct sections
- Hero headline renders at correct size on desktop and mobile
- Experience rows have hover effect
- FeaturedWork placeholder box is visible
- All sections have consistent left margin and max-width
- Contact and Footer links are correct

- [ ] **Step 4: Draft commit**

```
Draft commit: "feat: assemble full page from section components"
Files: src/app/page.tsx
```

Stop and wait for approval.
