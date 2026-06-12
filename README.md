# AI Mastery Course

> A comprehensive, self-paced AI teaching course — from complete beginner to VS Code, Claude Code, MCP workflows, advanced AI mastery, and personal AI productivity.

---

## What Is This?

This is the build repository for the **AI Mastery Course** — a locally-served, offline-capable website that takes someone with zero AI or coding experience all the way to:

- Writing effective prompts and using AI tools for everyday work
- Working in VS Code with AI-powered code completion
- Using Claude Code as an AI coding agent
- Configuring MCP (Model Context Protocol) servers to connect AI to real tools
- Running local AI models with Ollama
- Building their own AI-powered tools via the Anthropic API
- Automating workflows with n8n, Zapier, and GitHub Actions
- Conducting deep research and managing personal knowledge with AI
- Applying AI to documents, projects, and personal productivity
- Advanced techniques: RAG, agents, model selection, custom knowledge engines

**Course structure:** 19 parts, 156 lessons, ~162 hours total learning time.

---

## Repository Structure

```
ai-mastery-course/
├── README.md
├── data/
│   ├── curriculum.json             ← part/lesson index
│   └── lessons/
│       ├── part-01/                ← lesson JSON files (one per lesson)
│       ├── part-02/
│       └── ...part-19/
├── scripts/
│   └── enhance_batch*.js           ← one-shot workshop/quiz enhancement scripts
└── .docs/                          ← planning and architecture documents
    ├── ai-course-implementation-plan.md
    ├── architectural-review.md
    ├── resource-strategy.md
    ├── site-design-plan.md
    ├── design-decisions.md
    └── lesson-content-guide.md
```

---

## Curriculum Overview

| Part | Title | Lessons |
|------|-------|---------|
| 1 | AI Foundations | 6 |
| 2 | Your First AI Tools | 12 |
| 3 | Prompt Engineering | 8 |
| 4 | Computer & Command Line Basics | 6 |
| 5 | VS Code: Complete Beginner Guide | 12 |
| 6 | AI Inside VS Code | 8 |
| 7 | Claude Code: Complete Guide | 12 |
| 8 | MCP: Model Context Protocol | 20 |
| 9 | Other AI Coding Tools | 4 |
| 10 | AI Automation & Workflow | 7 |
| 11 | AI APIs & Building Your First AI Tool | 9 |
| 12 | Local AI with Ollama | 7 |
| 13 | AI Safety, Privacy & Cost Management | 5 |
| 14 | Capstone Projects | 5 |
| 15 | AI for Research & Knowledge Work | 7 |
| 16 | AI for Document Creation & Office Work | 7 |
| 17 | AI for Project Planning & Management | 6 |
| 18 | Advanced AI Mastery | 7 |
| 19 | AI for Personal Life | 8 |
| **Total** | | **156 lessons** |

---

## Lesson Format

Every lesson is a JSON file (`data/lessons/part-XX/X-Y.json`) with the schema:

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

Each section is one of: `text`, `callout` (tip/warning/info/success), `workshop`, or `quiz`.

### Workshop pattern (every lesson has 5)

| Tag | Label | Duration |
|-----|-------|----------|
| BROWSER | Workshop A — Quick Drill | 8–10 min |
| BUILD | Workshop B — Build It With AI | 25–35 min |
| BROWSER | Workshop C — AI Review/Comparison | 10–15 min |
| BUILD | Workshop D — Real-World Application | 15–25 min |

Workshop B always includes a mandatory adversarial review step: *"Ask Claude to find 3 specific problems or gaps, then fix at least one."*

Every lesson also has 2–3 quizzes with 4 options, a `correct` index, and a detailed `explanation`.

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

## Current Status

**Phase:** All 156 lesson JSON files authored and fully enhanced.

Every lesson has:
- Full text content with callouts
- 5 workshops (A–D pattern) including at least 1 real AI build activity
- 2–3 quizzes with explanations
- Estimated time: 55–145 min per lesson (~162 hours total)

**Next:** Site build — HTML/CSS/JS rendering engine for lesson content.

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
10. ~~Content Authoring~~ ✅ Complete — 156 lessons done

See [site-design-plan.md](.docs/site-design-plan.md) for full details on each phase.

---

*Course content completed 2026-06-11. Architecture designed 2026-06-10.*
