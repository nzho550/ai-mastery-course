# AI Mastery Course

> A comprehensive, self-paced AI teaching course — from complete beginner to VS Code, Claude Code, MCP workflows, custom AI skills, and personal/business AI productivity.

---

## What Is This?

This is the **AI Mastery Course** — a built, deployed, offline-capable website that takes someone with zero AI or coding experience all the way to:

- Writing effective prompts and using AI tools for everyday work
- Working in VS Code with AI-powered code completion
- Using Claude Code as an AI coding agent
- Configuring MCP (Model Context Protocol) servers to connect AI to real tools
- Running local AI models with Ollama
- Building their own AI-powered tools via the Anthropic API
- Automating workflows with n8n, Zapier, GitHub Actions, and recurring/scheduled ("loop") automations
- Conducting deep research and managing personal knowledge with AI
- Applying AI to documents, projects, and personal productivity
- Applying AI to running a business and managing a team (entrepreneurship, performance reviews, hiring, OKRs, tracking team output)
- Advanced techniques: RAG, agents, model selection, custom knowledge engines
- Building custom AI skills/commands for Claude Code

**Course structure:** 21 parts, 246 lessons, ~245 hours total learning time. Available in English and Chinese (language toggle in the header).

**Status:** Live at GitHub Pages ([nzho550/ai-mastery-course](https://github.com/nzho550/ai-mastery-course)). All content authored, site built, i18n complete.

---

## Repository Structure

```
ai-mastery-course/
├── README.md
├── index.html / 404.html
├── css/                             ← design tokens + component styles
├── js/                              ← app.js, router.js, lesson.js, sidebar.js,
│                                       search.js, progress.js, i18n.js, icons.js, utils.js
├── vendor/                          ← bundled marked.js, DOMPurify, highlight.js, Fuse.js
├── data/
│   ├── curriculum.json              ← part/lesson index (drives navigation, prev/next)
│   ├── curriculum.zh.json           ← Chinese curriculum labels
│   └── lessons/
│       ├── part-01/ ... part-21/    ← one {lessonId}.json + {lessonId}.zh.json per lesson
├── scripts/
│   ├── serve.js                     ← local static dev server
│   ├── audit-lessons.js             ← structural QA (missing/empty lesson files)
│   ├── fix-json.js, fix-capstones.js
│   └── enhance_batch*.js            ← one-shot content-authoring scripts (historical)
└── .docs/                           ← historical planning/design docs (see note below)
```

**Note on `part.id` vs `part.number`:** each part in `curriculum.json` has an `id` (used for its `data/lessons/part-{id}/` folder name — stable, don't rename) and a `number` (display/study order, 1–21 — used for reordering the curriculum without touching folders or lesson IDs).

---

## Curriculum Overview

| # | Title | Lessons |
|---|-------|---------|
| 1 | AI Foundations | 7 |
| 2 | Your First AI Tools | 18 |
| 3 | Prompt Engineering | 8 |
| 4 | AI Safety, Privacy & Cost Management | 5 |
| 5 | AI for Research & Knowledge Work | 8 |
| 6 | AI for Document Creation & Office Work | 13 |
| 7 | AI for Project Planning & Management | 7 |
| 8 | AI for Personal Life | 13 |
| 9 | Computer & Command Line Basics | 7 |
| 10 | VS Code: Complete Beginner Guide | 12 |
| 11 | AI Inside VS Code | 30 |
| 12 | Other AI Coding Tools | 10 |
| 13 | Claude Code: Complete Guide | 14 |
| 14 | Building Custom AI Skills | 8 |
| 15 | MCP: Model Context Protocol | 23 |
| 16 | AI Automation & Workflow | 10 |
| 17 | AI APIs & Building Your First AI Tool | 10 |
| 18 | Local AI with Ollama | 7 |
| 19 | Advanced AI Mastery | 14 |
| 20 | Loop Engineering | 17 |
| 21 | Capstone Projects | 5 |
| **Total** | | **246 lessons** |

Business-owner and people-management content (validating/launching a business, performance reviews, hiring, OKRs, keeping tabs on a team's work without micromanaging) lives in Part 11 ("AI Inside VS Code"), lessons 6-24/6-29/6-30, with cross-links from Part 7 ("AI for Project Planning & Management").

---

## Lesson Format

Every lesson is a JSON file (`data/lessons/part-{id}/{lessonId}.json`) with a matching `{lessonId}.zh.json` sibling for the Chinese translation (identical structure/tags/`nextLesson`/`prevLesson`/quiz `correct`; only prose and `title` are translated):

```json
{
  "id": "1-1",
  "title": "Lesson Title",
  "part": 1,
  "estimatedMinutes": 65,
  "tags": ["tag1", "tag2"],
  "sections": [ ... ],
  "nextLesson": "1-2",
  "prevLesson": null
}
```

Each section is one of: `text`, `callout` (tip/warning/info/success), `code`, `workshop`, `quiz`, `video`, or `diagram`.

### Workshop pattern

| Tag | Label | Duration |
|-----|-------|----------|
| BROWSER | Quick drill | 8–10 min |
| BUILD | Build it with AI | 25–35 min |
| BROWSER | AI review/comparison | 10–15 min |
| BUILD | Real-world application | 15–25 min |

Workshop steps typically include a mandatory adversarial review step: *"Ask [the AI tool] to find 3 specific problems or gaps, then fix at least one."*

Most lessons also have 2–3 quizzes with 4 options, a `correct` index, and a detailed `explanation`.

---

## Design Principles

| Principle | Expression |
|-----------|-----------|
| **The Accomplishment Principle** | Every workshop uses real user data and produces a lasting artifact |
| **Offline-first** | Runs on `file://` or a static server, no build step, no external calls required |
| **No build tools** | Vanilla HTML/CSS/ES6+ — double-click and it works |
| **Beginner precision** | Every click, every pane, every shortcut spelled out explicitly |
| **Dark mode default** | Deep navy backgrounds, indigo accent, system font stack |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Structure | Vanilla HTML5 |
| Styling | CSS3 + CSS custom properties |
| Logic | Vanilla ES6+ (modules) |
| Content | JSON lesson files |
| Progress | `localStorage` API |
| i18n | `localStorage`-backed language toggle (`js/i18n.js`), English + Chinese |
| Markdown | marked.js (vendored) |
| Sanitization | DOMPurify (vendored) |
| Highlighting | highlight.js (vendored) |
| Search | Fuse.js (vendored) |
| Icons | Inline SVGs from Lucide |
| Fonts | System stack + optional Inter + JetBrains Mono |

---

## Running Locally

```
node scripts/serve.js
```

Then open `http://localhost:8080`. No `npm install` needed — there is no `package.json`; everything runs on vendored, bundled dependencies.

To check for structural issues in lesson content (missing files, empty sections):

```
node scripts/audit-lessons.js
```

---

*Last updated 2026-07-08.*
