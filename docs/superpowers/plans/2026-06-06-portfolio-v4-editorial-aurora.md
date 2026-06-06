# Portfolio v4 — "Editorial Aurora" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended for this visual work) to implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static portfolio into a living "Editorial Aurora" design — kinetic hero, ambient aurora glow, bento projects, marquee skills, scroll-reveal motion — while keeping the editorial structure, fixing dead links, and shipping to Vercel.

**Architecture:** Keep the existing Next 16 / React 19 / Tailwind v4 component structure. Add a small set of reusable motion primitives (`Reveal`, `MagneticButton`, `RotatingText`, `Marquee`) built on the **Motion** library, plus an `AuroraBackground`. Restyle each section to use them. All motion is gated behind `prefers-reduced-motion`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Motion (`motion`), TypeScript.

**Verification model:** This is visual frontend work — unit-test-first TDD does not fit. Each task is verified by (a) `npm run build` passing and (b) a Playwright screenshot confirming the visual result in **both** light and dark themes. The dev server runs via `npm run dev` (webpack). Treat "build passes + screenshot looks right + reduced-motion respected" as the green bar.

**Accent tokens (single coordinated system):** `--accent: #6d5cff`, `--accent-2: #a855f7`.

---

## File Structure

**New files:**
- `src/components/motion/Reveal.tsx` — scroll-triggered fade/rise wrapper (client).
- `src/components/motion/MagneticButton.tsx` — cursor-follow button/link (client).
- `src/components/motion/RotatingText.tsx` — cycling word list (client).
- `src/components/motion/Marquee.tsx` — infinite horizontal scroll track (client).
- `src/components/AuroraBackground.tsx` — fixed ambient glow + grid (server/no-state).
- `public/favicon.svg` — branded favicon (monogram).

**Modified files:**
- `src/app/globals.css` — accent tokens, aurora/shine/shimmer/marquee keyframes, reduced-motion guard.
- `src/app/layout.tsx` — render `AuroraBackground`, expand metadata + favicon.
- `src/app/page.tsx` — wrap sections in `Reveal`, ensure z-index above aurora.
- `src/components/Hero.tsx` — rotating word, shimmer name, magnetic CTAs, real links, drop "making music".
- `src/components/Projects.tsx` — bento grid, Coursify featured + shimmer.
- `src/components/Skills.tsx` — marquee track.
- `src/components/GitHubActivity.tsx` — full-width larger heatmap.
- `src/components/IndexModule.tsx` — elevate to "Beyond Code" (hover-lift, accent).
- `src/components/Experience.tsx` — accent hover-glow.
- `src/components/Awards.tsx` — hover-lift.
- `src/components/Footer.tsx` — real links.
- `package.json` — add `motion`, set `build` to `next build --webpack`.

**Section numbering (fix the duplicate `03`/`04` bug) — final sequence:**
`00 // Index` (Hero) · `01 // Work` (Experience) · `02 // Projects` · `03 // Stack` (Skills) · `04 // Activity` (GitHub) · `05 // Beyond` (IndexModule/Beyond Code) · `06 // Awards`.

---

## Task 1: Install Motion + add design tokens & keyframes

**Files:**
- Modify: `package.json`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Install Motion**

Run (standalone terminal recommended; webpack avoids the corrupt SWC binary):
```bash
npm install motion
```
Expected: `motion` added to dependencies, no errors.

- [ ] **Step 2: Switch build script to webpack**

In `package.json`, change:
```json
"build": "next build",
```
to:
```json
"build": "next build --webpack",
```

- [ ] **Step 3: Add accent tokens, keyframes, and reduced-motion guard to `globals.css`**

Append to the end of `src/app/globals.css`:
```css
/* ---- v4 Editorial Aurora ---- */
:root {
  --accent: #6d5cff;
  --accent-2: #a855f7;
  /* aurora tuned for LIGHT mode: tinted, faint */
  --aurora-1: rgba(109, 92, 255, 0.18);
  --aurora-2: rgba(168, 85, 247, 0.14);
  --aurora-opacity: 0.7;
  --grid-line: rgba(17, 17, 17, 0.04);
}
.dark {
  --aurora-1: rgba(109, 92, 255, 0.22);
  --aurora-2: rgba(168, 85, 247, 0.18);
  --aurora-opacity: 0.5;
  --grid-line: rgba(255, 255, 255, 0.035);
}

@keyframes aurora-float-1 { 50% { transform: translate(40px, -30px) scale(1.12); } }
@keyframes aurora-float-2 { 50% { transform: translate(-35px, 25px) scale(1.1); } }
@keyframes name-shine { to { background-position: 200% center; } }
@keyframes shimmer-sweep { to { background-position: -200% 0; } }
@keyframes marquee-x { to { transform: translateX(-50%); } }

.name-shine {
  background: linear-gradient(90deg, var(--color-primary), var(--accent), var(--color-primary));
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: name-shine 5s linear infinite;
}
.shimmer::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.10) 50%, transparent 62%);
  background-size: 200% 100%; animation: shimmer-sweep 3.4s linear infinite;
}
.tile-lift { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s; }
.tile-lift:hover { transform: translateY(-5px); }

@media (prefers-reduced-motion: reduce) {
  .name-shine { animation: none; -webkit-text-fill-color: currentColor; }
  .shimmer::after, .aurora-blob { animation: none !important; }
  .marquee-run { animation: none !important; }
  .animate-fade-in-up { animation: none !important; }
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build completes, `✓ Compiled successfully`, no type errors. (SWC WASM warnings are expected and harmless.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/app/globals.css
git commit -m "add motion, accent tokens, and v4 keyframes"
```

---

## Task 2: AuroraBackground component

**Files:**
- Create: `src/components/AuroraBackground.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/AuroraBackground.tsx`**

```tsx
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ opacity: "var(--aurora-opacity)" }}
    >
      {/* grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* aurora blobs */}
      <div
        className="aurora-blob absolute rounded-full"
        style={{
          width: 520, height: 520, top: -180, left: -120,
          background: "var(--aurora-1)", filter: "blur(120px)",
          animation: "aurora-float-1 16s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob absolute rounded-full"
        style={{
          width: 520, height: 520, bottom: -200, right: -140,
          background: "var(--aurora-2)", filter: "blur(120px)",
          animation: "aurora-float-2 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Render it in `layout.tsx`**

In `src/app/layout.tsx`, import at top:
```tsx
import AuroraBackground from "@/components/AuroraBackground";
```
Then inside `<body ...>`, make it the first child (before `{children}`):
```tsx
<body className="bg-bone text-primary antialiased font-body-md min-h-screen flex flex-col">
  <AuroraBackground />
  {children}
</body>
```

- [ ] **Step 3: Verify build + screenshot**

Run: `npm run build`, then `npm run dev` and screenshot http://localhost:3000 in both themes.
Expected: a faint indigo/violet glow drifts behind content; grid is barely visible; content fully readable. Glow is a whisper, not a spotlight.

- [ ] **Step 4: Commit**

```bash
git add src/components/AuroraBackground.tsx src/app/layout.tsx
git commit -m "add ambient aurora background"
```

---

## Task 3: Motion primitives (Reveal, MagneticButton, RotatingText, Marquee)

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/MagneticButton.tsx`
- Create: `src/components/motion/RotatingText.tsx`
- Create: `src/components/motion/Marquee.tsx`

- [ ] **Step 1: Create `src/components/motion/Reveal.tsx`**

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children, delay = 0, className,
}: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `src/components/motion/MagneticButton.tsx`**

```tsx
"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

export default function MagneticButton({
  children, href, className, target, rel,
}: {
  children: ReactNode; href: string; className?: string;
  target?: string; rel?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.a
      href={href} target={target} rel={rel} className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={reset}
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 3: Create `src/components/motion/RotatingText.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function RotatingText({
  words, className, interval = 2200,
}: { words: string[]; className?: string; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  if (reduce) return <span className={className}>{words[0]}</span>;
  return (
    <span className={`inline-grid ${className ?? ""}`} style={{ overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          style={{ gridArea: "1/1" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
```

- [ ] **Step 4: Create `src/components/motion/Marquee.tsx`**

```tsx
"use client";
import type { ReactNode } from "react";

export default function Marquee({
  children, durationSec = 28, className,
}: { children: ReactNode; durationSec?: number; className?: string }) {
  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className="marquee-run flex w-max"
        style={{ animation: `marquee-x ${durationSec}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: compiles, no type errors. (Components are unused so far — that's fine.)

- [ ] **Step 6: Commit**

```bash
git add src/components/motion
git commit -m "add motion primitives: reveal, magnetic, rotating text, marquee"
```

---

## Task 4: Hero redesign

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Replace `src/components/Hero.tsx`**

```tsx
import RotatingText from "@/components/motion/RotatingText";
import MagneticButton from "@/components/motion/MagneticButton";

const GITHUB = "https://github.com/mominalvi";
const LINKEDIN = "https://www.linkedin.com/in/momin-alvi/";

export default function Hero() {
  return (
    <div className="md:w-10/12 border-b-architectural pb-lg md:pb-xl mb-xl animate-fade-in-up">
      <span className="font-meta-technical text-meta-technical text-on-surface-variant">
        00 // Index
      </span>
      <h1 className="font-h1 text-h1 name-shine mt-md mb-md" style={{ fontSize: "clamp(40px, 8vw, 84px)", lineHeight: 0.95 }}>
        MOMIN ALVI
      </h1>
      <p className="font-h3 text-on-surface-variant mb-lg flex items-baseline gap-sm flex-wrap">
        I build{" "}
        <RotatingText
          words={["AI systems", "product tools", "web experiences"]}
          className="font-bold"
          // accent color
        />
      </p>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-lg">
        CS student at Queen&apos;s and Software Engineering Intern at OTPP. I build
        practical AI systems, product tools, and clean web experiences. Outside of
        work, I&apos;m usually training or exploring new product ideas.
      </p>
      <div className="flex gap-md flex-wrap">
        <MagneticButton
          href={GITHUB} target="_blank" rel="noopener noreferrer"
          className="px-md py-sm font-label-caps text-label-caps text-white inline-flex items-center gap-sm"
        >
          <span style={{ background: "linear-gradient(90deg,var(--accent),var(--accent-2))" }} className="absolute inset-0 -z-10" />
          GitHub →
        </MagneticButton>
        <MagneticButton
          href={LINKEDIN} target="_blank" rel="noopener noreferrer"
          className="px-md py-sm border-architectural bg-surface-container-lowest text-primary font-label-caps text-label-caps inline-flex items-center gap-sm"
        >
          LinkedIn
        </MagneticButton>
      </div>
    </div>
  );
}
```

Note on the rotating word color: set it to the accent. Update `RotatingText` usage by wrapping with a span that has `style={{ color: "var(--accent)" }}`, OR add `text-[color:var(--accent)]` to its `className`. Use: `className="font-bold text-[color:var(--accent)]"`.

Note on the gradient button: the absolute-gradient approach above is fragile. Prefer the simpler inline style directly on the MagneticButton: add `style` support OR set the className background. Simplest: give the GitHub button `className="... "` plus inline gradient via a wrapper is messy — instead set background through a utility. Implement as:
```tsx
className="px-md py-sm font-label-caps text-label-caps text-white inline-flex items-center gap-sm rounded-none"
```
and add to `globals.css`:
```css
.btn-accent { background: linear-gradient(90deg, var(--accent), var(--accent-2)); box-shadow: 0 0 22px rgba(109,92,255,0.35); transition: box-shadow .25s, transform .25s; }
.btn-accent:hover { box-shadow: 0 8px 26px rgba(109,92,255,0.45); }
```
Then the GitHub button className becomes: `"btn-accent px-md py-sm font-label-caps text-label-caps text-white inline-flex items-center gap-sm"`. Remove the inner absolute `<span>`.

- [ ] **Step 2: Add `.btn-accent` to globals.css** (per the note above), and remove the placeholder absolute-span line from Hero.

- [ ] **Step 3: Verify build + screenshot**

Run `npm run build`, then dev + screenshot both themes.
Expected: shimmering "MOMIN ALVI", "I build [rotating accent word]", gradient GitHub button that nudges toward the cursor, no "making music" in bio.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/globals.css
git commit -m "redesign hero: kinetic name, rotating word, magnetic CTAs, real links"
```

---

## Task 5: Projects bento grid (Coursify featured)

**Files:**
- Modify: `src/components/Projects.tsx`

- [ ] **Step 1: Reorder data so Coursify is first/featured and update hrefs**

In the `projects` array, put Coursify first with a `featured: true` flag; Scholar Pups second. Use placeholder hrefs (`href: "#"` → keep but render non-navigating until URLs provided — see Step 2). Add `featured?: boolean` to each object; Coursify `featured: true`.

- [ ] **Step 2: Replace the `<section>` body with a bento grid**

```tsx
export default function Projects() {
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);
  return (
    <section className="animate-fade-in-up" id="projects">
      <div className="flex justify-between items-end border-b-architectural pb-sm mb-md">
        <h2 className="font-h3 text-h3 text-primary">Selected Projects</h2>
        <span className="font-meta-technical text-meta-technical text-on-surface-variant">02 // Projects</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Featured */}
        <a
          href={featured.href}
          className="tile-lift shimmer relative overflow-hidden border-architectural p-lg md:row-span-2 flex flex-col"
          style={{ background: "linear-gradient(150deg, rgba(109,92,255,0.12), rgba(168,85,247,0.06))" }}
        >
          <span className="font-meta-technical text-[11px] text-on-surface-variant">Featured</span>
          <h3 className="font-h3 text-h3 text-primary mt-sm mb-sm">{featured.title}</h3>
          <p className="font-body-md text-on-surface-variant mb-md">{featured.description}</p>
          <ul className="flex flex-col gap-xs mb-md">
            {featured.highlights.map((h) => (
              <li key={h} className="flex gap-sm font-meta-technical text-meta-technical text-on-surface-variant">
                <span className="text-[color:var(--accent)]">—</span><span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-xs flex-wrap mt-auto">
            {featured.tags.map((t) => (
              <span key={t} className="bg-surface-container px-sm py-xs font-meta-technical text-[10px] text-primary">{t}</span>
            ))}
          </div>
        </a>
        {/* Secondary cards */}
        {rest.map((p) => (
          <a key={p.title} href={p.href} className="tile-lift border-architectural p-md flex flex-col bg-surface-container-lowest">
            <h3 className="font-body-md font-bold text-primary mb-sm">{p.title}</h3>
            <p className="font-meta-technical text-meta-technical text-on-surface-variant mb-md">{p.description}</p>
            <div className="flex gap-xs flex-wrap mt-auto">
              {p.tags.map((t) => (
                <span key={t} className="bg-surface-container px-sm py-xs font-meta-technical text-[10px] text-primary">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build + screenshot** — Coursify is the large featured tile with shimmer + hover-lift; Scholar Pups is a secondary card. Both themes.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "redesign projects as bento grid with coursify featured"
```

---

## Task 6: Skills marquee

**Files:**
- Modify: `src/components/Skills.tsx`

- [ ] **Step 1: Replace the chip-wrap body with two marquee tracks**

Keep the `skills` array. Split into two halves for two tracks moving opposite-ish speeds. Replace the `<div className="flex flex-wrap ...">` block with:
```tsx
import Marquee from "@/components/motion/Marquee";
// ...
const mid = Math.ceil(skills.length / 2);
const rowA = skills.slice(0, mid);
const rowB = skills.slice(mid);
// chip renderer
const Chip = ({ s }: { s: string }) => (
  <span className="border border-outline-variant px-md py-sm mx-xs font-meta-technical text-[12px] text-on-surface-variant whitespace-nowrap">{s}</span>
);
// inside <section>, replace skill list with:
<div className="flex flex-col gap-sm">
  <Marquee durationSec={30}>{rowA.map((s) => <Chip key={s} s={s} />)}</Marquee>
  <Marquee durationSec={36}>{rowB.map((s) => <Chip key={s} s={s} />)}</Marquee>
</div>
```
Also update the section label from `03 // Skills` to `03 // Stack`.

- [ ] **Step 2: Verify build + screenshot** — two auto-scrolling chip tracks with faded edges; static under reduced motion. Both themes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "redesign skills as marquee tracks"
```

---

## Task 7: GitHub Activity — full-width larger heatmap

**Files:**
- Modify: `src/components/GitHubActivity.tsx`

- [ ] **Step 1: Enlarge cells and update label**

In `GitHubActivity.tsx`: change the day cell size from `w-[10px] h-[10px]` to `w-[13px] h-[13px]` and gap from `gap-[3px]` to `gap-[4px]` (both the column wrapper and row). Update the section number label to `04 // Activity` (already correct). Keep the existing data logic untouched.

- [ ] **Step 2: Verify build + screenshot** — the heatmap is visibly larger and reads as a proper full-width contribution graph showing 251 contributions. Both themes.

- [ ] **Step 3: Commit**

```bash
git add src/components/GitHubActivity.tsx
git commit -m "enlarge github contribution heatmap"
```

---

## Task 8: Elevate IndexModule → Beyond Code; Experience + Awards polish

**Files:**
- Modify: `src/components/IndexModule.tsx`
- Modify: `src/components/Experience.tsx`
- Modify: `src/components/Awards.tsx`

- [ ] **Step 1: IndexModule → "Beyond Code"**

In `IndexModule.tsx`: change heading text from `Index` to `Beyond Code`; change label from `03 // Beyond` to `05 // Beyond`. Add `tile-lift` polish by changing the icon hover color from `group-hover:text-secondary` to `group-hover:text-[color:var(--accent)]`, and the label hover from `group-hover:translate-x-1` (keep). Keep the existing hobby items (Gym/Bodybuilding, Soccer, Basketball, Running, Photography, Food) — no music present, consistent with spec.

- [ ] **Step 2: Experience accent hover-glow + label**

In `Experience.tsx`: change the section label `01 // Index` to `01 // Work`. Change row hover from `hover:bg-surface-container` to keep bg but add accent left-border on hover: add classes `border-l-2 border-l-transparent hover:border-l-[color:var(--accent)]` to each role row `div`. Change the org name hover from default to `group-hover:text-[color:var(--accent)]`.

- [ ] **Step 3: Awards hover-lift + label**

In `Awards.tsx`: change label `04 // Awards` to `06 // Awards`. Wrap each award row's classes to add `tile-lift px-sm` and on hover show accent: add `hover:text-[color:var(--accent)] transition-colors` to the title span.

- [ ] **Step 4: Verify build + screenshot** — Beyond Code heading reads right; Experience rows show an indigo left-edge + accent org name on hover; Awards lift slightly. Section numbers now read 00–06 with no duplicates. Both themes.

- [ ] **Step 5: Commit**

```bash
git add src/components/IndexModule.tsx src/components/Experience.tsx src/components/Awards.tsx
git commit -m "elevate beyond code, accent polish on experience and awards, fix section numbering"
```

---

## Task 9: Wrap sections in scroll reveals + footer links

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Wrap each grid section in `Reveal` in `page.tsx`**

Import `Reveal` at top: `import Reveal from "@/components/motion/Reveal";`. Wrap each of the grid `div` children's inner component in `<Reveal delay={...}>`. Example for Experience cell:
```tsx
<div className="md:col-span-8 md:col-start-1 md:row-start-1">
  <Reveal><Experience /></Reveal>
</div>
```
Apply to Experience, Projects, IndexModule, Awards, Skills, GitHubActivity (stagger delays optional: 0, 0.05, ...). Leave Hero as-is (it already has the fade-in-up entrance). Ensure `<main>` has `relative z-10` so content sits above the aurora: change `main` className to start with `relative z-10 `.

- [ ] **Step 2: Wire footer links in `Footer.tsx`**

Replace the `links` array:
```tsx
const links = [
  { label: "GitHub", href: "https://github.com/mominalvi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/momin-alvi/" },
  { label: "Email", href: "mailto:mominalvi30@gmail.com" },
];
```
Resume is deferred — omit it from the footer for now (re-add when the PDF is provided). The existing `target`/`rel` logic already handles `http` links.

- [ ] **Step 3: Verify build + screenshot + scroll** — sections fade/rise on scroll; reduced-motion shows them static; footer GitHub/LinkedIn/Email all resolve to real URLs (no `#`). Both themes.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/components/Footer.tsx
git commit -m "add scroll reveals and wire footer links"
```

---

## Task 10: Metadata, OpenGraph, favicon

**Files:**
- Create: `public/favicon.svg`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `public/favicon.svg`** (indigo monogram)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0a0a0d"/>
  <text x="32" y="44" font-family="Space Grotesk, sans-serif" font-size="34"
        font-weight="700" text-anchor="middle" fill="#6d5cff">M</text>
</svg>
```

- [ ] **Step 2: Expand metadata in `layout.tsx`**

Replace the `metadata` export:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://mominalvi.com"),
  title: "Momin Alvi — Software Engineer",
  description:
    "CS student at Queen's and Software Engineering Intern at OTPP. Builder of AI systems, product tools, and clean web experiences.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Momin Alvi — Software Engineer",
    description:
      "Builder of AI systems, product tools, and clean web experiences.",
    url: "https://mominalvi.com",
    siteName: "Momin Alvi",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Momin Alvi — Software Engineer" },
};
```
(If the final domain differs from `mominalvi.com`, update `metadataBase`/`url` after deploy — confirm with user.)

- [ ] **Step 3: Verify build** — `npm run build` passes; favicon shows in browser tab.

- [ ] **Step 4: Commit**

```bash
git add public/favicon.svg src/app/layout.tsx
git commit -m "add favicon and opengraph metadata"
```

---

## Task 11: Final QA + deploy

**Files:** none (verification + deploy)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: clean build, no type errors, route `/` static.

- [ ] **Step 2: Visual QA both themes**

Run `npm run dev`; screenshot full page in light AND dark; scroll through. Confirm: aurora faint, hero kinetic, Coursify featured, skills marquee, large heatmap, reveals fire, no dead `#` links, section numbers 00–06 unique.

- [ ] **Step 3: Reduced-motion check**

In Playwright, emulate `prefers-reduced-motion: reduce` and screenshot. Confirm: no animations, content fully visible/readable.

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 5: Deploy to Vercel**

Use the Vercel deploy skill (`/vercel:deploy` → production) or connect the GitHub repo in the Vercel dashboard. Set env vars `GITHUB_TOKEN` and `GITHUB_USERNAME` in the Vercel project (Production) so GitHub Activity works in prod. Confirm the live URL renders and the heatmap loads.

- [ ] **Step 6: Update `metadataBase`/OG url** with the real production domain if different; commit + redeploy.

---

## Self-Review Notes

- **Spec coverage:** Aurora (T2), accent system (T1), motion lib + reveals/magnetic/rotating/marquee (T3,T4,T6,T9), Coursify featured bento (T5), larger heatmap (T7), Beyond Code (T8, maps to existing IndexModule), experience/awards polish (T8), dead links (T4 hero, T9 footer), metadata/favicon (T10), webpack build (T1), reduced-motion (T1 + every client primitive), light+dark (verified each task), deploy (T11). All spec items covered.
- **Resume link:** deferred → removed from footer per user; re-add when PDF provided.
- **Project URLs:** Coursify/Scholar Pups still `#` (TBD from user) — featured/secondary still render; swap hrefs when provided.
- **Known deferred:** real production domain in `metadataBase` finalized post-deploy.
