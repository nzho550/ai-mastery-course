# Site Design Plan — AI Learning Course
**Role:** Architect  
**Date:** 2026-06-10  
**Status:** Pre-build design review

---

## 1. Design Philosophy

| Principle | Expression |
|-----------|-----------|
| **Modern & calm** | Deep navy/charcoal backgrounds; not harsh black. Accent color is indigo — confident, not aggressive. |
| **Content-first** | UI chrome disappears; the lesson text breathes. Max reading width capped at 720px. |
| **Status at a glance** | Progress is visible at every level: overall ring, per-part bars, per-lesson icons. |
| **Offline-first feel** | No spinners for navigation. Everything feels instant because content is local. |
| **Beginner-friendly** | UI language avoids jargon. Callouts are prominent. Exercises stand out from reading. |

**Visual inspiration:** Linear.app navigation clarity + Vercel docs typography + Josh Comeau course platform warmth.

---

## 2. Design System

### 2.1 Color Tokens

```css
/* ── DARK MODE (default) ─────────────────────────────── */
--bg-base:      #0a0b0f;   /* page background — deepest layer */
--bg-surface:   #111318;   /* cards, panels */
--bg-elevated:  #1a1d27;   /* modals, dropdowns, code blocks */
--bg-hover:     #1f2235;   /* hover states */
--bg-active:    #252840;   /* selected / active items */

--border-subtle:  #1e2130; /* dividers, very quiet lines */
--border-default: #2a2d3e; /* card edges, input borders */
--border-strong:  #3d4261; /* emphasized separators */

--text-primary:   #f1f5f9; /* headings, body */
--text-secondary: #94a3b8; /* meta, timestamps, secondary labels */
--text-muted:     #64748b; /* placeholders, disabled */
--text-on-accent: #ffffff; /* text on accent backgrounds */

/* Accent: Indigo */
--accent:         #818cf8; /* indigo-400 — links, active, highlights */
--accent-hover:   #a5b4fc; /* indigo-300 — hover */
--accent-muted:   #1e1f3a; /* indigo tint background */
--accent-glow:    0 0 24px rgb(129 140 248 / 0.2);

/* Semantic */
--color-success:        #4ade80; /* green-400 — complete */
--color-success-muted:  #052e16;
--color-warning:        #fb923c; /* orange-400 — in-progress */
--color-warning-muted:  #2c1400;
--color-danger:         #f87171; /* red-400 — errors, don't-do */
--color-danger-muted:   #2d0a0a;
--color-info:           #38bdf8; /* sky-400 — info callouts */
--color-info-muted:     #0a1e2d;
--color-tip:            #818cf8; /* indigo — tip callouts */
--color-tip-muted:      #1e1f3a;
--color-deep:           #c084fc; /* purple-400 — deep-dive callouts */
--color-deep-muted:     #1f0d2e;

/* ── LIGHT MODE ───────────────────────────────────────── */
/* Applied via [data-theme="light"] or @media prefers-color-scheme: light  */
--bg-base:      #ffffff;
--bg-surface:   #f8fafc;
--bg-elevated:  #f1f5f9;
--bg-hover:     #e2e8f0;
--bg-active:    #dde1f0;

--border-subtle:  #f1f5f9;
--border-default: #e2e8f0;
--border-strong:  #cbd5e1;

--text-primary:   #0f172a;
--text-secondary: #475569;
--text-muted:     #94a3b8;
--text-on-accent: #ffffff;

--accent:         #6366f1; /* indigo-500 */
--accent-hover:   #4f46e5; /* indigo-600 */
--accent-muted:   #eef2ff;
--accent-glow:    0 0 24px rgb(99 102 241 / 0.15);

--color-success:        #16a34a;
--color-success-muted:  #f0fdf4;
--color-warning:        #ea580c;
--color-warning-muted:  #fff7ed;
--color-danger:         #dc2626;
--color-danger-muted:   #fef2f2;
--color-info:           #0284c7;
--color-info-muted:     #f0f9ff;
--color-tip:            #6366f1;
--color-tip-muted:      #eef2ff;
--color-deep:           #9333ea;
--color-deep-muted:     #faf5ff;
```

### 2.2 Typography

```css
--font-ui:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-code: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;

/* Scale */
--text-xs:   0.75rem;   /* 12px — labels, captions, status badges */
--text-sm:   0.875rem;  /* 14px — sidebar items, meta, secondary */
--text-base: 1rem;      /* 16px — body text */
--text-lg:   1.125rem;  /* 18px — lead paragraphs */
--text-xl:   1.25rem;   /* 20px — card titles, lesson sub-headings */
--text-2xl:  1.5rem;    /* 24px — part headings, section headings */
--text-3xl:  1.875rem;  /* 30px — lesson page title */
--text-4xl:  2.25rem;   /* 36px — dashboard hero */
--text-5xl:  3rem;      /* 48px — landing display */

/* Weight */
--weight-normal:   400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;

/* Line height */
--leading-tight:   1.25;
--leading-snug:    1.375;
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-loose:   2;

/* Letter spacing */
--tracking-tight:  -0.025em;
--tracking-normal:  0;
--tracking-wide:    0.05em;   /* used for uppercase labels */
--tracking-wider:   0.1em;
```

### 2.3 Spacing Scale

```css
/* Base unit: 4px */
--space-0:  0;
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### 2.4 Borders, Radius, Shadows

```css
/* Border radius */
--radius-sm:   0.25rem;  /*  4px */
--radius-md:   0.5rem;   /*  8px */
--radius-lg:   0.75rem;  /* 12px */
--radius-xl:   1rem;     /* 16px */
--radius-2xl:  1.5rem;   /* 24px */
--radius-full: 9999px;   /* pill / circle */

/* Shadows (dark mode — more prominent) */
--shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.4);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3);

/* Transitions */
--transition-fast:   150ms ease;
--transition-base:   200ms ease;
--transition-slow:   300ms ease;
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 2.5 Sizing Constants

```css
--topbar-height:   56px;
--sidebar-width:   264px;
--content-max:     720px;   /* max reading width */
--content-wide:    960px;   /* dashboard grid */
--toc-width:       200px;   /* table of contents (future) */
```

---

## 3. Layout Architecture

### 3.1 Global Page Grid

```
┌─────────────────────────────────────────────────────────────────┐
│  TOP BAR  (56px fixed, full width, z-index: 100)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌──────────────────────────────────────────┐  │
│  │             │  │                                          │  │
│  │  SIDEBAR    │  │   MAIN CONTENT AREA                      │  │
│  │  (264px)    │  │   (fills remaining width)                │  │
│  │  fixed      │  │   inner content max-width: 720px         │  │
│  │  left       │  │   centered with auto margins             │  │
│  │             │  │                                          │  │
│  │             │  │                                          │  │
│  │             │  │                                          │  │
│  └─────────────┘  └──────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Breakpoints:**
```css
/* Desktop:  ≥ 1024px — sidebar visible, full layout */
/* Tablet:   768–1023px — sidebar slides in as overlay */
/* Mobile:   < 768px — sidebar drawer, hamburger button */
```

---

### 3.2 Top Bar

```
┌─────────────────────────────────────────────────────────────────┐
│ ☰  [◈ AI Course]          [═══════════════════  47%]   🔍 ☀ ⚙  │
│    ^logo + name            ^global progress bar         ^icons  │
└─────────────────────────────────────────────────────────────────┘
```

**Elements:**
- Left: Hamburger (mobile only) + Logo mark (◈ or custom SVG) + "AI Mastery Course" text
- Center: Global progress bar (thin 4px bar, accent color fill, shows overall % complete, hidden on dashboard page)
- Right: Search icon (`/` hotkey tooltip), Theme toggle (sun/moon), Settings icon
- Style: `backdrop-filter: blur(12px)` + subtle bottom border — glass effect
- Background: `--bg-base` at 85% opacity (allows page content to subtly show through)

---

### 3.3 Sidebar

```
┌──────────────────────────┐
│  SIDEBAR (264px)         │
│  ─────────────────────── │
│  [Search lessons...]  🔍 │  ← in-sidebar search shortcut
│  ─────────────────────── │
│                          │
│  ▼ PART 1                │  ← part header (uppercase, bold, chevron)
│     AI Foundations       │    "2 / 6 complete" in muted text
│     ── ── ── ── ──       │
│     ✓  1.1  What is AI?  │  ← complete (green check, muted text)
│    ►│  1.2  How LLMs...  │  ← active (accent left border, bright text, bg-active)
│     ◑  1.3  AI Landscape │  ← in-progress (accent circle, normal text)
│     ○  1.4  Hallucina... │  ← not started (gray circle, secondary text)
│     ○  1.5  Privacy      │
│     ○  1.6  Responsible  │
│                          │
│  ▶ PART 2                │  ← collapsed (chevron right)
│     AI Tools             │    "0 / 8 complete"
│                          │
│  ▶ PART 3                │
│     Prompt Engineering   │
│  ...                     │
│                          │
│  ─────────────────────── │
│  [Reset Progress]        │  ← settings area at bottom
└──────────────────────────┘
```

**Status icon system:**
```
○  Not started   — gray empty circle       (--text-muted)
◑  In progress   — half-filled circle      (--color-warning)
✓  Complete      — checkmark               (--color-success)
►  Active        — accent left border + bg (--accent)
```

**Part header:** Shows part number + name + "X / Y complete" count in muted text.
**Collapse state:** All parts collapsed except the one containing the active lesson.
**Scroll:** Sidebar scrolls independently of content area.

---

### 3.4 Dashboard (index.html)

```
MAIN CONTENT (within the layout grid above)
─────────────────────────────────────────────────────────

  HERO CARD
  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │   Welcome back!                                     │
  │   Pick up where you left off.                       │
  │                                                     │
  │   ┌──────┐    Overall Progress                      │
  │   │  47% │    ████████████░░░░░░░░  47%             │
  │   │ ring │    14 of 30 lessons complete              │
  │   └──────┘                                          │
  │                                                     │
  │   [ ► Resume: Lesson 1.2 — How LLMs Work ]          │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  YOUR LEARNING PATH   [View all 14 parts ↓]
  ─────────────────────────────────────────

  ┌──────────────────┐  ┌──────────────────┐
  │ PART 1           │  │ PART 2           │
  │ AI Foundations   │  │ AI Tools         │
  │ ████████░░  4/6  │  │ ░░░░░░░░░░  0/8  │
  │ [Continue →]     │  │ [Start →]        │
  └──────────────────┘  └──────────────────┘

  ┌──────────────────┐  ┌──────────────────┐
  │ PART 3           │  │ PART 4           │
  │ Prompt Engineer  │  │ CLI Basics       │
  │ ░░░░░░░░░░  0/8  │  │ ░░░░░░░░░░  0/6  │
  │ [Start →]        │  │ [Start →]        │
  └──────────────────┘  └──────────────────┘

  ... (grid continues, 2 cols on desktop, 1 on mobile)
```

**Part card states:**
- Not started: muted border, "Start →" button
- In progress: accent border, progress bar filled, "Continue →" button
- Complete: green border, checkmark badge, "Review →" button

---

### 3.5 Lesson Viewer (lesson.html)

```
─────────────────────────────────────────────────────────
TOP BAR: [═══════════════════════  72%] ← scroll progress

BREADCRUMB:  Home  /  Part 1: AI Foundations  /  Lesson 1.2
─────────────────────────────────────────────────────────

LESSON HEADER
┌─────────────────────────────────────────────────────────┐
│  PART 1 · LESSON 2                                      │  ← tag
│                                                         │
│  How Language Models Work                               │  ← h1
│                                                         │
│  ⏱ 15 min   📌 Fundamentals   🏷 no-code               │  ← meta badges
└─────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────
LESSON CONTENT (max-width: 720px, centered)

[text sections rendered as prose]

  ┌─────────────────────────────────────────────────────┐
  │ 💡 TIP                                              │ ← callout
  │ Think of tokens like puzzle pieces, not words.      │
  └─────────────────────────────────────────────────────┘

  [more prose]

  ┌─────────────────────────────────────────────────────┐
  │ javascript                              [Copy] [✓]  │ ← code block
  │ ─────────────────────────────────────────────────── │
  │  1  const prompt = "What is AI?";                   │
  │  2  const response = await claude(prompt);          │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │ 🎯 TRY THIS                                         │ ← exercise
  │                                                     │
  │  Ask Claude: "Explain tokens to me as if I'm 10."   │
  │                                                     │
  │  [Show Hint ▼]                                      │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │ KNOWLEDGE CHECK                                     │ ← quiz
  │                                                     │
  │  What does "context window" mean?                   │
  │                                                     │
  │  ○  A) The browser window size                      │
  │  ○  B) The maximum text an AI can remember at once  │
  │  ○  C) A VS Code panel                              │
  │  ○  D) The AI's internet history                    │
  │                                                     │
  │  [Check Answer]                                     │
  └─────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────
LESSON FOOTER

  ┌─────────────────────────────────────────────────────┐
  │ [← 1.1 What is AI?]    [✓ Mark Complete]   [1.3 →] │
  └─────────────────────────────────────────────────────┘
```

---

### 3.6 Search Overlay

```
┌─────────────────────────────────────────────────────────┐
│ ░░░░ BACKDROP (semi-transparent, click to close) ░░░░░  │
│                                                         │
│       ┌───────────────────────────────────────┐         │
│       │ 🔍  Search lessons...            [Esc] │         │
│       ├───────────────────────────────────────┤         │
│       │                                       │         │
│       │  PART 5 · LESSON 5.3                  │ ← result│
│       │  The Interface: A Named Tour          │         │
│       │                                       │         │
│       │  PART 8 · LESSON 8.4                  │         │
│       │  context7 — Live Documentation        │         │
│       │                                       │         │
│       │  PART 7 · LESSON 7.6                  │         │
│       │  CLAUDE.md — Project Instructions     │         │
│       │                                       │         │
│       │  ↑ ↓ navigate  ↵ open  Esc close      │ ← hint  │
│       └───────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

**Trigger:** `/` key or search icon in top bar.
**Behavior:** Focused automatically; arrow keys navigate results; Enter opens lesson; Esc closes.

---

## 4. Component Specifications

### 4.1 Buttons

```
Primary (filled):
  bg: --accent    text: --text-on-accent    border: none
  hover: --accent-hover + translateY(-1px)
  active: scale(0.98)

Ghost (outlined):
  bg: transparent    border: --border-default    text: --text-primary
  hover: bg --bg-hover

Danger:
  bg: --color-danger-muted    border: --color-danger    text: --color-danger

Icon-only:
  bg: transparent    padding: --space-2    border-radius: --radius-md
  hover: bg --bg-hover

Sizes:
  sm:  height 32px  padding 0 12px  font-size --text-sm
  md:  height 40px  padding 0 16px  font-size --text-base   (default)
  lg:  height 48px  padding 0 24px  font-size --text-lg
```

### 4.2 Callout Variants

All callouts: `border-left: 3px solid {color}`, `border-radius: --radius-lg`, left-border + tinted background.

```
💡 tip        border/icon: --color-tip      bg: --color-tip-muted
⚠️  warning    border/icon: --color-warning  bg: --color-warning-muted
❌ danger      border/icon: --color-danger   bg: --color-danger-muted
ℹ️  info        border/icon: --color-info     bg: --color-info-muted
🔍 deep-dive  border/icon: --color-deep     bg: --color-deep-muted
🎯 exercise   border/icon: --accent          bg: --accent-muted      (special — see below)
```

### 4.3 Code Block

```
┌──────────────────────────────────────────────────┐
│  javascript                  [copy icon]  [✓ ×]  │  ← header bar
│  ─────────────────────────────────────────────── │
│   1│ const name = "Alice";                        │  ← line numbers
│   2│ console.log(`Hello, ${name}`);               │
│   3│                                              │
└──────────────────────────────────────────────────┘
```
- Background: always `--bg-elevated` (dark even in light mode — industry standard)
- Font: `--font-code`, `--text-sm`
- Copy button: top-right; shows checkmark for 2 seconds after copying
- Language badge: top-left, `--text-xs`, `--text-muted`
- Line numbers: `--text-muted`, right-aligned, separated by `1px --border-subtle`

### 4.4 Exercise Block

```
┌──────────────────────────────────────────────────────┐
│  🎯  TRY THIS EXERCISE                   ⏱ ~5 min   │  ← header
│  ─────────────────────────────────────────────────── │
│                                                      │
│  Open Claude.ai and type the following prompt:       │
│                                                      │
│  "Explain what a token is using a food analogy."    │
│                                                      │
│  Notice how the response structure changes when      │
│  you add: "Keep it under 3 sentences."              │
│                                                      │
│  [▼ Show Hint]                                       │  ← collapsed hint
└──────────────────────────────────────────────────────┘
```

### 4.5 Quiz Component

**States: unanswered → submitted (correct) → submitted (incorrect)**

```
Unanswered:
  Options are rounded cards with border --border-default
  Hover: border --accent, bg --accent-muted
  Selected: filled --accent-muted border --accent

After submit (correct):
  Correct option: green border + bg, checkmark icon
  Other options: muted
  Explanation box slides in below (green tint)

After submit (incorrect):
  Selected option: red border + bg, × icon
  Correct option revealed: green border + bg, checkmark
  Explanation box slides in (yellow/info tint)
```

### 4.6 Progress Ring (SVG)

```
Size: 96px × 96px
Outer circle (track): stroke --border-strong, stroke-width: 6px
Inner circle (fill): stroke --accent, stroke-width: 6px
  stroke-dasharray: circumference
  stroke-dashoffset: circumference × (1 - progress)
  transition: stroke-dashoffset 600ms ease
Center text: progress%, --text-2xl, --weight-bold
```

### 4.7 Progress Bar

```
Height: 6px (in sidebar part headers) / 4px (in top bar scroll indicator)
Track: --border-default
Fill: --accent (lesson progress) or --color-success (part complete)
border-radius: --radius-full
transition: width 400ms ease
```

### 4.8 Status Badges (lesson list)

```
Complete   → filled green circle with white ✓ (12×12px)
In-progress → half circle or animated pulsing ring (--color-warning)
Not started → empty circle, --border-default stroke
```

### 4.9 Part Card (dashboard grid)

```
┌────────────────────────────┐
│  PART 3                    │  ← part number (--text-xs, uppercase, muted)
│                            │
│  Prompt Engineering        │  ← part name (--text-xl, bold)
│  8 lessons · ~96 min       │  ← meta (--text-sm, muted)
│                            │
│  ────────────────────────  │
│  ████████░░░░░░░░░░  4/8   │  ← progress bar + fraction
│                            │
│  [Continue →]              │  ← CTA button
└────────────────────────────┘

States:
  Not started: --border-subtle, ghost button "Start"
  In progress: --accent border (2px), primary button "Continue"
  Complete: --color-success border, "Review" ghost button, ✓ badge top-right
```

---

## 5. JavaScript Architecture

### 5.1 Module Map

```
js/
├── app.js            # Entry point. Bootstraps everything.
│                     # Loads curriculum.json, inits all modules, wires routing.
│
├── router.js         # Hash-based routing.
│                     # #/           → render dashboard
│                     # #/lesson/1-1 → load + render lesson
│                     # Fires events: 'route:dashboard', 'route:lesson'
│
├── progress.js       # localStorage abstraction.
│                     # getAll() → full progress object
│                     # setStatus(id, 'complete'|'in-progress'|'not-started')
│                     # getStats() → { total, complete, inProgress }
│                     # getPartStats(partNum) → { total, complete }
│                     # getLastVisited() / setLastVisited(id)
│                     # reset() — clears all (with external confirmation)
│
├── sidebar.js        # Renders sidebar nav from curriculum + progress data.
│                     # Subscribes to progress changes to update icons.
│                     # Handles part accordion expand/collapse.
│                     # Highlights active lesson.
│
├── dashboard.js      # Renders index.html content.
│                     # Draws progress ring (SVG), part cards, resume button.
│                     # All data comes from curriculum.json + progress.js.
│
├── lesson.js         # Fetches lesson JSON, renders sections into lesson.html.
│                     # Manages scroll-progress bar.
│                     # Wires Mark Complete, Prev, Next buttons.
│
├── renderer.js       # Section-type renderers (called by lesson.js).
│                     # renderText(section) → marked + purify
│                     # renderCallout(section)
│                     # renderCode(section) → highlight.js
│                     # renderExercise(section) → collapsible hint
│                     # renderQuiz(section) → interactive quiz cards
│                     # renderVideo(section) → responsive iframe
│
├── search.js         # Fuse.js-powered search overlay.
│                     # Indexes lesson titles + summaries from curriculum.json.
│                     # Keyboard: / opens, Esc closes, ↑↓ navigates, Enter selects.
│
├── theme.js          # Dark/light/auto mode.
│                     # Reads localStorage 'theme' setting.
│                     # Swaps [data-theme] attribute on <html>.
│                     # Swaps highlight.js CSS link href.
│
└── icons.js          # Inline SVG map — no icon font dependency.
                      # export const icons = { check, chevronRight, ... }
```

### 5.2 Application State

```js
// Owned by app.js, passed to modules via init() calls — no globals.
const appState = {
  curriculum: null,        // parsed curriculum.json (loaded once)
  currentLessonId: null,   // e.g. "1-2"
  sidebarOpen: true,       // desktop default; false on mobile
}

// Progress state lives entirely in localStorage, accessed via progress.js.
// Theme lives in localStorage, accessed via theme.js.
// No shared mutable objects between modules except curriculum (read-only).
```

### 5.3 Data Flow

```
Browser loads index.html / lesson.html
  └→ app.js boots
      ├→ fetch('data/curriculum.json')
      ├→ progress.js.load()           ← reads localStorage
      ├→ theme.js.init()              ← applies saved theme
      ├→ sidebar.js.init(curriculum, progress)
      └→ router.js.init()
            ├→ #/           → dashboard.js.render(curriculum, progress)
            └→ #/lesson/X   → lesson.js.load(id)
                                  └→ fetch('data/lessons/X.json')
                                        └→ renderer.js.render(sections)
                                             ├→ marked(text) → purify
                                             └→ hljs.highlightElement(code)

User clicks "Mark Complete"
  └→ progress.js.setStatus('1-2', 'complete')
      ├→ sidebar.js.updateLesson('1-2')   ← updates icon
      └→ dashboard.js.refresh()           ← recalcs part cards + ring
```

### 5.4 curriculum.json Structure

```json
{
  "parts": [
    {
      "id": 1,
      "title": "AI Foundations",
      "lessons": [
        {
          "id": "1-1",
          "title": "What is Artificial Intelligence?",
          "estimatedMinutes": 10,
          "tags": ["fundamentals", "no-code"],
          "summary": "One-sentence summary used for search indexing."
        },
        { "id": "1-2", "title": "How Language Models Work", ... }
      ]
    },
    { "id": 2, "title": "Your First AI Tools", "lessons": [...] }
  ]
}
```

### 5.5 lesson JSON Structure

```json
{
  "id": "1-2",
  "title": "How Language Models Work",
  "part": 1,
  "estimatedMinutes": 15,
  "tags": ["fundamentals", "no-code"],
  "prevLesson": "1-1",
  "nextLesson": "1-3",
  "sections": [
    { "type": "text", "content": "## Introduction\n\nMarkdown here..." },
    { "type": "callout", "variant": "tip", "title": "Key Insight", "content": "..." },
    { "type": "code", "language": "javascript", "content": "const x = 1;" },
    { "type": "callout", "variant": "warning", "title": "Common Mistake", "content": "..." },
    {
      "type": "exercise",
      "estimatedMinutes": 5,
      "prompt": "What to do...",
      "hint": "Hint text shown on reveal..."
    },
    {
      "type": "quiz",
      "question": "What does context window mean?",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 1,
      "explanation": "B is correct because..."
    },
    { "type": "video", "url": "https://youtube.com/...", "caption": "..." }
  ]
}
```

---

## 6. File Structure (Complete)

```
ai-course/
│
├── index.html                    # Dashboard page
├── lesson.html                   # Lesson viewer (shared for all lessons)
├── 404.html                      # Fallback
│
├── css/
│   ├── reset.css                 # Modern CSS reset (box-sizing, margin-0)
│   ├── variables.css             # All tokens from Section 2
│   ├── layout.css                # Topbar, sidebar, content grid, responsive
│   ├── components.css            # Buttons, cards, badges, progress, callouts
│   ├── lesson.css                # Prose typography, code blocks, quiz, exercise
│   └── animations.css            # Keyframes, transitions, reduced-motion handling
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── progress.js
│   ├── sidebar.js
│   ├── dashboard.js
│   ├── lesson.js
│   ├── renderer.js
│   ├── search.js
│   ├── theme.js
│   └── icons.js
│
├── data/
│   ├── curriculum.json
│   └── lessons/
│       ├── part-01/
│       │   ├── 1-1-what-is-ai.json
│       │   ├── 1-2-how-llms-work.json
│       │   ├── 1-3-ai-landscape.json
│       │   ├── 1-4-hallucinations.json
│       │   ├── 1-5-privacy-safety.json
│       │   └── 1-6-responsible-use.json
│       ├── part-02/ ... (8 files)
│       ├── part-03/ ... (8 files)
│       ├── part-04/ ... (6 files)
│       ├── part-05/ ... (12 files)
│       ├── part-06/ ... (8 files)
│       ├── part-07/ ... (12 files)
│       ├── part-08/ ... (15 files)
│       ├── part-09/ ... (4 files)
│       ├── part-10/ ... (7 files)
│       ├── part-11/ ... (8 files)
│       ├── part-12/ ... (7 files)
│       ├── part-13/ ... (5 files)
│       └── part-14/ ... (5 files)
│
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   └── diagrams/             # VS Code interface diagrams, etc.
│   └── fonts/
│       ├── Inter-400.woff2       # (optional — system stack is fallback)
│       ├── Inter-500.woff2
│       ├── Inter-600.woff2
│       ├── Inter-700.woff2
│       ├── JetBrainsMono-400.woff2
│       └── JetBrainsMono-700.woff2
│
├── vendor/
│   ├── vendor-manifest.json
│   ├── marked.min.js
│   ├── purify.min.js
│   ├── fuse.min.js
│   └── highlight/
│       ├── highlight.min.js
│       ├── languages/
│       │   └── powershell.min.js
│       ├── github-dark.min.css
│       └── github.min.css
│
├── scripts/
│   ├── update-vendors.ps1
│   ├── update-vendors.sh
│   └── download-fonts.ps1
│
└── .docs/
    ├── ai-course-implementation-plan.md
    ├── architectural-review.md
    ├── resource-strategy.md
    ├── site-design-plan.md          ← this file
    └── lesson-schema.md
```

---

## 7. Phased Build Sequence

Dependencies flow downward — each phase must be complete before the next begins.

```
PHASE 1 ──────────────────────────────────────────── ~2 days
  Design System Foundation
  ─────────────────────────
  Deliverables:
    □ css/reset.css         — modern reset
    □ css/variables.css     — ALL tokens from Section 2 (colors, type, space, etc.)
    □ css/animations.css    — keyframes + reduced-motion
  Test: Open a blank HTML file, confirm variables resolve, dark/light toggle works
  Dependency for: everything else

PHASE 2 ──────────────────────────────────────────── ~2 days
  Static Layout Shell
  ─────────────────────────
  Deliverables:
    □ index.html            — all structural divs, no dynamic content
    □ lesson.html           — all structural divs, static placeholder text
    □ 404.html              — friendly error page
    □ css/layout.css        — topbar, sidebar, content grid
  Test: Resize browser — sidebar collapses on tablet, drawer on mobile
  Dependency for: Phase 3, Phase 4

PHASE 3 ──────────────────────────────────────────── ~3 days
  Component Library (HTML + CSS, no JS)
  ─────────────────────────
  Deliverables:
    □ css/components.css    — all non-lesson components
    □ css/lesson.css        — lesson-specific styles
    Create a components.html demo page with every component in all states:
      □ Button (primary, ghost, danger, icon, all sizes)
      □ Card / Part card (not-started, in-progress, complete)
      □ Status badge (○ ◑ ✓)
      □ Progress bar (various fill %)
      □ Progress ring (SVG, various %)
      □ Callout (tip, warning, danger, info, deep-dive, exercise)
      □ Code block (with copy button placeholder)
      □ Exercise block (with collapsed hint)
      □ Quiz (unanswered, correct, incorrect)
      □ Breadcrumb
      □ Prev/Next navigation
      □ Search overlay (static)
  Test: Visual review of components.html in dark AND light mode
  Dependency for: Phase 5 (JS will target these HTML structures)

PHASE 4 ──────────────────────────────────────────── ~1 day
  Design Polish Pass
  ─────────────────────────
  Review components.html with fresh eyes:
    □ Check color contrast ratios (WCAG AA minimum)
    □ Verify hover/focus/active states feel snappy (--transition-fast)
    □ Test reduced-motion: all animations should respect prefers-reduced-motion
    □ Ensure spacing feels generous and consistent
    □ Typography hierarchy reads correctly on first glance
    □ Mobile layout review
  No code deliverable — this is a QA/design gate before JS

PHASE 5 ──────────────────────────────────────────── ~2 days
  JavaScript Core (no lesson rendering yet)
  ─────────────────────────
  Deliverables:
    □ js/icons.js           — 18 SVG strings from Lucide
    □ js/theme.js           — dark/light/auto, persisted to localStorage
    □ js/progress.js        — full localStorage API (get/set/clear/stats)
    □ js/router.js          — hash routing, fires events
    □ js/app.js             — bootstrap: fetch curriculum.json, init modules
    □ js/sidebar.js         — renders nav from curriculum + progress data
    □ data/curriculum.json  — complete metadata for all 82 lessons
  Test: Navigate between #/ and #/lesson/1-1. Sidebar updates. Theme persists on reload.
  Dependency for: Phase 6, Phase 7, Phase 8

PHASE 6 ──────────────────────────────────────────── ~2 days
  Lesson Rendering Engine
  ─────────────────────────
  Deliverables:
    □ js/renderer.js        — all section type renderers
    □ js/lesson.js          — fetch lesson JSON, render, scroll progress
    □ Wire vendor libs (marked, purify, highlight.js)
    □ data/lessons/part-01/ — all 6 Part 1 lessons (minimal content to validate)
  Test: Load lesson 1-1. All section types render. Code blocks highlight. Copy works.
  Dependency for: Phase 7

PHASE 7 ──────────────────────────────────────────── ~2 days
  Interactivity & Progress
  ─────────────────────────
  Deliverables:
    □ js/dashboard.js       — progress ring, part cards, resume button (wired to real data)
    □ Mark Complete button  — updates progress, updates sidebar icon, auto-advances
    □ Quiz interaction      — select, submit, reveal correct, show explanation
    □ Exercise hint toggle  — smooth slide reveal
    □ Scroll progress bar   — live update as user scrolls lesson
    □ Sidebar accordion     — expand/collapse parts, smooth height transition
  Test: Complete lesson 1-1. Sidebar shows ✓. Dashboard ring animates. Resume works.
  Dependency for: Phase 8

PHASE 8 ──────────────────────────────────────────── ~1 day
  Search
  ─────────────────────────
  Deliverables:
    □ js/search.js          — Fuse.js index over curriculum.json titles + summaries
    □ Search overlay UI wired (keyboard: / open, Esc close, ↑↓ navigate, Enter go)
  Test: Press /. Type "context7". Result appears. Press Enter. Navigates to lesson 8.4.

PHASE 9 ──────────────────────────────────────────── ~1 day
  Final Polish & QA
  ─────────────────────────
  Deliverables:
    □ Settings panel (theme toggle, reset progress with confirmation dialog)
    □ Sidebar collapse button + mobile drawer/hamburger
    □ Scroll-to-top on lesson navigation
    □ 404.html for unknown lesson IDs
    □ Loading skeleton state (while lesson JSON fetches)
  Tests:
    □ Chrome, Firefox, Edge — file:// and http://
    □ Mobile: iOS Safari, Chrome Android (via DevTools responsive)
    □ Progress survives page reload
    □ All 6 Part 1 lessons navigate correctly (prev/next chain)
    □ Dark mode persists across reload
    □ Vendor files load offline (disconnect network, reload)

PHASE 10 ─────────────────────────────────────────── ~3-4 weeks
  Content Authoring (all 82 lessons)
  ─────────────────────────
  Priority order:
    1. Part 1 (validate schema — already done in Phase 6)
    2. Part 5 (VS Code — highest risk, most precise)
    3. Part 7 (Claude Code — user's primary use case)
    4. Part 8 (MCP — explicitly requested)
    5. Parts 2, 3, 4 (foundations)
    6. Parts 6, 9–13 (tooling + APIs + local AI)
    7. Part 14 (capstones — depends on all prior content)
```

---

## 8. Accessibility Baseline

| Requirement | Implementation |
|-------------|---------------|
| Color contrast | All text on backgrounds ≥ 4.5:1 (WCAG AA) |
| Focus indicators | Visible outline on all interactive elements (never `outline: none`) |
| Keyboard navigation | Tab through all interactive elements; `/` search; arrow keys in sidebar |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — disable all transitions/animations |
| Semantic HTML | `<nav>`, `<main>`, `<article>`, `<aside>`, `<header>` used correctly |
| ARIA | `aria-current="page"` on active lesson; `aria-expanded` on accordions; `role="dialog"` on search overlay |
| Alt text | All images have descriptive alt text (especially VS Code screenshots) |

---

## 9. Open Questions for Sign-Off Before Phase 1

1. **Logo mark** — Simple text logo "AI Course" or a custom SVG mark? (Suggest: a simple circuit/brain icon from Lucide — `<Brain>` or `<Cpu>`)
2. **Accent color** — Indigo (`#818cf8`) is the proposal. Alternatives: cyan (`#22d3ee`), violet (`#a78bfa`), or brand-match to Claude purple. Architect decision needed.
3. **components.html** — Should the component demo page be committed to the repo as a developer tool, or deleted before "release"?
4. **Lesson content source** — Who writes the 82 lessons? AI-assisted drafting is available. Should Phase 10 be a separate tracked workstream?
5. **VS Code screenshots** — Lessons 5.2–5.12 reference specific UI elements. Should these use: (a) text-based ASCII diagrams embedded in the JSON, (b) actual screenshots in `assets/images/`, or (c) links to official Microsoft docs screenshots?
