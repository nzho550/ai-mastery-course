# AI Learning Course — Implementation Plan

## Overview

A fully self-contained, locally-served website that takes a complete beginner from
"I've never touched AI or code" to confidently using VS Code, Claude Code, and MCP-connected
AI workflows. No internet required after setup (except for embedded external links/videos).

---

## Goals

| Goal | Detail |
|------|--------|
| Zero-prerequisite entry | First module assumes nothing |
| Progressive depth | Each part builds on the last |
| Practical outcomes | Every part ends with a hands-on exercise |
| Offline-capable | Runs from `file://` or a local server |
| Progress persistence | localStorage tracks completed lessons across sessions |
| Easy navigation | Sidebar, breadcrumbs, next/prev buttons, progress bar |

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Structure | Vanilla HTML5 | No build step; open in any browser |
| Styling | CSS3 + CSS variables | Theming, dark mode, no framework needed |
| Logic | Vanilla ES6+ JavaScript (modules) | No Node.js required to run |
| Content | JSON lesson files | Easy to edit/extend without touching HTML |
| Progress | `localStorage` API | Persists across sessions, zero backend |
| Markdown | marked.js v15 (vendored) | See `resource-strategy.md` |
| Sanitization | DOMPurify v3 (vendored) | XSS defense on marked output |
| Highlighting | highlight.js v11 common (vendored) | See `resource-strategy.md` |
| Search | Fuse.js v7 (vendored) | Client-side fuzzy search |
| Icons | Inline SVGs (Lucide source) | Zero dependency |
| Fonts | System stack + optional WOFF2 | Works offline with no downloads |
| Local server (optional) | Python `http.server` or VS Code Live Server | Needed only if fetch() hits CORS on `file://` |

> **Running:** Double-clicking `index.html` works for most features. For full module
> loading, run `python -m http.server 8080` in the project root or use VS Code Live Server.

---

## File & Folder Structure

```
ai-course/
├── index.html                  # Dashboard / home page
├── lesson.html                 # Single-page lesson viewer (reused for all lessons)
├── 404.html                    # Friendly fallback
│
├── css/
│   ├── reset.css               # Normalize browser defaults
│   ├── variables.css           # Color tokens, spacing scale, font sizes
│   ├── layout.css              # Sidebar + main area grid
│   ├── components.css          # Cards, buttons, badges, progress bars
│   ├── lesson.css              # Lesson content typography & code blocks
│   └── dark.css                # Dark mode overrides (auto via prefers-color-scheme)
│
├── js/
│   ├── app.js                  # Bootstrap: loads curriculum, wires up events
│   ├── router.js               # Hash-based routing (no server rewrite needed)
│   ├── progress.js             # Read/write/clear localStorage progress store
│   ├── sidebar.js              # Render & update sidebar nav tree
│   ├── lesson.js               # Fetch + render a lesson JSON into lesson.html
│   ├── search.js               # Client-side full-text search over curriculum
│   └── utils.js                # Shared helpers (slugify, format time, etc.)
│
├── data/
│   ├── curriculum.json         # Master course structure (parts → lessons metadata)
│   └── lessons/
│       ├── 1-1-what-is-ai.json
│       ├── 1-2-how-llms-work.json
│       ├── ... (one file per lesson)
│       └── part-14/14-5-open-project.json  ← see v3 folder structure above
│
├── assets/
│   ├── images/                 # Diagrams, screenshots
│   └── fonts/                  # Optional WOFF2 files (Inter + JetBrains Mono)
│
├── vendor/                     # Bundled third-party JS/CSS (committed to repo)
│   ├── vendor-manifest.json    # Pinned versions + CDN URLs (source of truth)
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
│   ├── update-vendors.ps1      # Re-download vendor files from CDN (Windows)
│   ├── update-vendors.sh       # Re-download vendor files from CDN (Mac/Linux)
│   └── download-fonts.ps1      # Download optional WOFF2 font files
│
└── .docs/
    ├── ai-course-implementation-plan.md   # This file (v1 skeleton)
    ├── architectural-review.md            # Full gap analysis + revised curriculum v2
    ├── resource-strategy.md               # Dependency & vendor strategy
    └── lesson-schema.md                   # JSON schema for lesson files
```

---

## Curriculum Outline

> **Note:** This plan was written against the v1 skeleton (8 parts, 38 lessons). The authoritative curriculum is **v3** — see `.docs/architectural-review.md` for the full structure and gap analysis, and `.docs/lesson-content-guide.md` for all lesson content. The v3 structure is summarised below.

### v3 Curriculum — 14 Parts, 112 Lessons

| Part | Title | Lessons |
|------|-------|---------|
| 1 | AI Foundations | 6 |
| 2 | Your First AI Tools | 8 |
| 3 | Prompt Engineering | 8 |
| 4 | Computer & Command Line Basics | 6 |
| 5 | VS Code: Complete Beginner Guide | 12 |
| 6 | AI Inside VS Code | 8 |
| 7 | Claude Code: Complete Guide | 12 |
| 8 | MCP: Model Context Protocol | 15 |
| 9 | Other AI Coding Tools | 4 |
| 10 | AI Automation & Workflow Tools | 7 |
| 11 | AI APIs & Building Your First AI Tool | 9 |
| 12 | Local AI with Ollama | 7 |
| 13 | AI Safety, Privacy & Cost Management | 5 |
| 14 | Capstone Projects | 5 |
| **Total** | | **112** |

### Key additions vs v1

- Parts 1–8 are significantly expanded (VS Code split into 2 parts; MCP now 15 lessons covering every major server)
- New Part 3: Prompt Engineering (8 lessons — the most transferable skill)
- New Part 9: Other AI Coding Tools (Aider, Cody, Tabnine)
- New Part 10: AI Automation (n8n, Zapier, Make, GitHub Actions)
- New Part 11: AI APIs — includes **lesson 11.9: Cost Engineering** (token minimization, model routing, prompt caching, Batch API)
- New Part 12: Local AI (Ollama, LM Studio)
- Part 13 (Safety/Privacy/Cost) expanded — lesson 13.3 now covers budget monitoring + applying techniques

### Data folder structure (v3)

```
data/lessons/
  ├── part-01/   (6 files)
  ├── part-02/   (8 files)
  ├── part-03/   (8 files)
  ├── part-04/   (6 files)
  ├── part-05/   (12 files)
  ├── part-06/   (8 files)
  ├── part-07/   (12 files)
  ├── part-08/   (15 files)
  ├── part-09/   (4 files)
  ├── part-10/   (7 files)
  ├── part-11/   (9 files)   ← includes 11.9 Cost Engineering
  ├── part-12/   (7 files)
  ├── part-13/   (5 files)
  └── part-14/   (5 files)   ← total: 112 lesson files
```

---

## Progress Tracking System

### localStorage Schema

```json
{
  "progress": {
    "1-1": { "status": "complete", "completedAt": "2026-06-10T12:00:00Z" },
    "1-2": { "status": "in-progress", "startedAt": "2026-06-10T12:30:00Z" },
    "1-3": { "status": "not-started" }
  },
  "lastVisited": "1-2",
  "settings": {
    "theme": "auto",
    "sidebarCollapsed": false
  }
}
```

### Progress Rules
- Lesson marked **complete** when user clicks "Mark Complete" button or reaches end of content
- **In-progress** set automatically when lesson is first opened
- Dashboard shows overall % complete + per-part % bars
- "Resume" button on home page jumps to `lastVisited`
- Reset button in settings clears all progress (with confirmation)

---

## Lesson JSON Schema

Each lesson is a `.json` file with this shape:

```json
{
  "id": "1-1",
  "title": "What is Artificial Intelligence?",
  "part": 1,
  "estimatedMinutes": 12,
  "tags": ["fundamentals", "no-code"],
  "sections": [
    {
      "type": "text",
      "content": "Markdown string..."
    },
    {
      "type": "callout",
      "variant": "tip",
      "content": "..."
    },
    {
      "type": "code",
      "language": "plaintext",
      "content": "..."
    },
    {
      "type": "exercise",
      "prompt": "Try this...",
      "hint": "..."
    },
    {
      "type": "video",
      "url": "https://...",
      "caption": "..."
    },
    {
      "type": "quiz",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct": 1,
      "explanation": "..."
    }
  ],
  "nextLesson": "1-2",
  "prevLesson": null
}
```

---

## UI Components

### Sidebar
- Collapsible tree: Part → Lesson list
- Status icons: ○ not started · ◑ in progress · ✓ complete
- Active lesson highlighted
- Collapse-to-icons mode on narrow screens

### Lesson Viewer
- Breadcrumb: Home > Part 1 > Lesson 1.1
- Estimated read time badge
- Progress bar across top (lesson scroll position)
- Section renderer (text, callout, code with copy button, exercise, video, quiz)
- "Mark Complete" sticky button at bottom
- Prev / Next navigation

### Dashboard (index.html)
- Welcome / resume card
- Per-part progress bars
- Overall completion badge
- Quick-start: "Where to begin" for new users

### Search
- Triggered by `/` or search icon
- Searches lesson titles + content summaries from `curriculum.json`
- Keyboard-navigable results

---

## Implementation Phases

### Phase 1 — Scaffolding & Navigation (Days 1–2)
- [ ] Folder structure + empty files
- [ ] `curriculum.json` with all lesson metadata (no full content yet)
- [ ] `index.html` dashboard with static layout
- [ ] `lesson.html` template
- [ ] CSS variables, layout, sidebar structure
- [ ] Hash router (`#lesson/1-1`)
- [ ] Sidebar renders from `curriculum.json`

### Phase 2 — Progress System (Day 3)
- [ ] `progress.js` — get/set/clear helpers
- [ ] Status icons update in sidebar on completion
- [ ] Dashboard progress bars calculate from localStorage
- [ ] Resume button logic
- [ ] Settings panel (theme toggle, reset progress)

### Phase 3 — Lesson Renderer (Days 4–5)
- [ ] `lesson.js` fetches lesson JSON and renders sections
- [ ] Section types: text (marked.js or simple MD parser), callout, code + copy, exercise
- [ ] Quiz component (single-answer, shows explanation on submit)
- [ ] Video embed section
- [ ] Scroll-progress bar
- [ ] Mark Complete button + auto-advance

### Phase 4 — Content Authoring (Days 6–15)
- [ ] Write all 112 lessons as JSON files (most effort here) — see `lesson-content-guide.md` for full content
- [ ] Diagrams / screenshots for key concepts
- [ ] Exercise prompts and hints for each lesson

### Phase 5 — Search & Polish (Days 16–17)
- [ ] Client-side search over lesson metadata + content summaries
- [ ] Keyboard navigation (arrow keys in sidebar, `/` to focus search)
- [ ] Dark mode (CSS `prefers-color-scheme` + manual toggle)
- [ ] Mobile responsive layout
- [ ] `404.html` fallback

### Phase 6 — Testing & QA (Day 18)
- [ ] Test on Chrome, Firefox, Edge (file:// and http://)
- [ ] Verify localStorage persistence across sessions
- [ ] Check all next/prev links are wired correctly
- [ ] Validate all lesson JSON files parse without error

---

## Non-Goals (Explicitly Out of Scope)

- No user accounts or server-side storage
- No video hosting (links to YouTube/external only)
- No Node.js build pipeline (zero `npm install`)
- No framework (React, Vue, etc.) — intentionally vanilla for longevity

---

## Resolved Decisions

All dependency questions are closed — see `.docs/resource-strategy.md` for full detail.

| Question | Decision |
|----------|----------|
| Markdown parsing | marked.js v15, vendored in `vendor/` |
| Sanitization | DOMPurify v3, vendored (XSS defense) |
| Icons | Inline SVGs from Lucide — no library loaded |
| Fonts | System font stack by default; optional WOFF2 via download script |
| Syntax highlighting | highlight.js v11 common bundle, vendored |
| Search | Fuse.js v7, vendored |
| Offline delivery | All vendor files bundled in repo; CDN URLs live in `vendor-manifest.json` only |
| Content authoring order | Write Part 1 first to validate JSON schema, then proceed in order |

## Open Questions (Architecture Review)

1. **highlight.js language coverage** — Common bundle covers JS/HTML/CSS/Python/Bash. PowerShell needs an extra language file (`vendor/highlight/languages/powershell.min.js`) loaded separately in HTML. The `resource-strategy.md` language table confirms coverage; the HTML loading example needs updating to include it.
2. **Video embed strategy** — `type: "video"` in lesson JSON currently assumes a YouTube URL. YouTube-only is acceptable — video is inherently online content and the lessons only reference external videos (3Blue1Brown, Karpathy, etc.).
3. **Capstone structure** — Capstones (Part 14) are structured as guided walkthroughs with step-by-step sections, not free-form briefs. This matches the precision standard applied throughout the course.
4. **Distribution** — Treat as single local user first, with GitHub Pages as the distribution target for sharing. Vendor files should be committed to git for offline use.
5. **n8n lesson precision** — Lesson 10.2 describes automations as pipeline diagrams but does not provide click-by-click n8n UI instructions. Bring to course precision standard before publishing.
6. **System prompt concept** — Add a callout to lesson 3.3 explaining the user/assistant/system turn structure before the API sections in Part 11 reference it technically.
7. **Model name staleness** — Add a note in lesson 11.2 directing students to check the models page for current IDs before building.
