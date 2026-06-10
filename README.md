# AI Mastery Course

> A comprehensive, self-paced AI teaching course — from complete beginner to VS Code, Claude Code, and MCP workflows.

---

## What Is This?

This is the planning and architecture repository for the **AI Mastery Course** — a locally-served, offline-capable website that takes someone with zero AI or coding experience all the way to:

- Writing effective prompts and using AI tools for everyday work
- Working in VS Code with AI-powered code completion
- Using Claude Code as an AI coding agent
- Configuring MCP (Model Context Protocol) servers to connect AI to real tools
- Running local AI models with Ollama
- Building their own AI-powered tools via the Anthropic API
- Automating workflows with n8n, Zapier, and GitHub Actions

**Course structure:** 14 parts, 82 lessons, ~60–80 hours total learning time.

---

## Repository Structure

```
ai-mastery-course/
├── README.md                   ← you are here
│
└── .docs/                      ← all planning and architecture documents
    ├── ai-course-implementation-plan.md   ← v1 curriculum + tech stack + file structure
    ├── architectural-review.md            ← gap analysis, revised 14-part curriculum
    ├── resource-strategy.md               ← vendor/dependency strategy (offline-first)
    ├── site-design-plan.md                ← complete design system, wireframes, JS architecture
    ├── design-decisions.md                ← 5 resolved design questions
    └── lesson-content-guide.md            ← all 82 lessons with references + workshops
```

> The site itself (HTML/CSS/JS + lesson JSON files) will be built in a future phase. This repo currently contains the full architectural blueprint.

---

## Planning Documents

### [`ai-course-implementation-plan.md`](.docs/ai-course-implementation-plan.md)
The v1 curriculum skeleton. Covers:
- Goals and non-goals
- Tech stack decisions (vanilla HTML/CSS/JS, no build tools)
- Complete file and folder structure
- localStorage progress tracking schema
- Lesson JSON schema
- 6-phase implementation plan

### [`architectural-review.md`](.docs/architectural-review.md)
Full architect review with gap analysis. Covers:
- Why v1 needed expansion (VS Code, prompt engineering, MCP, local AI all missing)
- Complete gap tables for every AI tool and MCP server
- VS Code precision standard — what "exact step-by-step" looks like
- The revised 14-part, 82-lesson curriculum v2
- Content depth standards for every lesson
- Architecture decisions table

### [`resource-strategy.md`](.docs/resource-strategy.md)
All third-party dependencies documented. Covers:
- Vendor registry: marked.js, DOMPurify, highlight.js, Fuse.js (all pinned versions)
- `vendor-manifest.json` schema
- PowerShell + Bash scripts to refresh vendor files from CDN
- highlight.js language coverage
- Security notes (XSS, SRI hashes, localStorage)

### [`site-design-plan.md`](.docs/site-design-plan.md)
The complete design system. Covers:
- Design philosophy (5 principles)
- Full CSS token system — colors (dark + light), typography, spacing, borders, shadows
- ASCII wireframes for every view: topbar, sidebar, dashboard, lesson viewer, search overlay
- Component specifications: buttons, callouts, code blocks, exercises, quizzes, progress ring, part cards
- JavaScript module architecture (9 modules)
- Application state schema and data flow diagram
- Complete file structure tree
- 10-phase build sequence with deliverables and test criteria

### [`design-decisions.md`](.docs/design-decisions.md)
5 open design questions resolved:
1. **Logo:** Lucide `<Sparkles>` SVG + "AI Mastery" wordmark
2. **Accent color:** Indigo primary + violet secondary (with exact hex values)
3. **components.html:** Kept in `dev/` folder as a developer tool
4. **Voice:** First-person educator — warm, direct, no filler phrases
5. **VS Code screenshots:** ASCII diagrams + real PNGs in `assets/images/vscode/`

### [`lesson-content-guide.md`](.docs/lesson-content-guide.md)
The complete lesson content guide — all 82 lessons. Each lesson includes:
- **Outcome** — one measurable sentence
- **References** — real URLs to official docs, guides, tools
- **Workshop** — exact hands-on task (tagged: BROWSER, VSCODE, TERMINAL, CLAUDECODE, BUILD, REFLECT, etc.)

Notable workshops:
- **Lesson 8.11 — Gmail MCP:** 6-phase real inbox cleanup (Audit → Mass Cleanup → Label → Filters → Unsubscribe → Verify)
- **Lesson 10.2 — n8n Automations:** Build 3 live automations that run 24/7
- **Lesson 14.1 — Portfolio Capstone:** Live on GitHub Pages before the lesson ends

---

## Design Principles

| Principle | Expression |
|-----------|-----------|
| **The Accomplishment Principle** | Every workshop uses real user data and produces a lasting artifact |
| **Offline-first** | Runs on `file://` with no internet — vendor libs bundled in repo |
| **No build tools** | Vanilla HTML/CSS/ES6+ — double-click and it works |
| **Beginner precision** | Every click, every pane, every shortcut spelled out explicitly |
| **Dark mode default** | Deep navy backgrounds, indigo accent, system font stack |

---

## Tech Stack (When Built)

| Layer | Choice |
|-------|--------|
| Structure | Vanilla HTML5 |
| Styling | CSS3 + CSS custom properties |
| Logic | Vanilla ES6+ (modules) |
| Content | JSON lesson files |
| Progress | `localStorage` API |
| Markdown | marked.js v15.0.12 (vendored) |
| Sanitization | DOMPurify v3.2.6 (vendored) |
| Highlighting | highlight.js v11.11.1 (vendored) |
| Search | Fuse.js v7.1.0 (vendored) |
| Icons | Inline SVGs from Lucide |
| Fonts | System stack + optional Inter + JetBrains Mono |

---

## Curriculum Overview

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
| 11 | AI APIs & Building Your First AI Tool | 8 |
| 12 | Local AI with Ollama | 7 |
| 13 | AI Safety, Privacy & Cost Management | 5 |
| 14 | Capstone Projects | 5 |
| **Total** | | **82 lessons** |

---

## Current Status

**Phase:** Architect review complete. All design documents written.

**Next:** Phase 1 of the 10-phase build sequence (Design System Foundation — CSS tokens + reset).

---

## Build Phases

1. Design System Foundation (CSS tokens)
2. Static Layout Shell (HTML structure)
3. Component Library (HTML + CSS, no JS)
4. Design Polish Pass (QA gate)
5. JavaScript Core (routing, progress, sidebar)
6. Lesson Rendering Engine (marked.js, highlight.js)
7. Interactivity & Progress (quizzes, mark complete, animations)
8. Search (Fuse.js overlay)
9. Final Polish & QA
10. Content Authoring (all 82 lessons)

See [site-design-plan.md](.docs/site-design-plan.md) Section 7 for full details on each phase.

---

*Designed and architected 2026-06-10.*
