# Architectural Review — AI Course

**Reviewer role:** Course architect  
**Review date:** 2026-06-10  
**Scope:** Content completeness, instructional precision, AI tool coverage, VS Code onboarding

---

## Executive Summary

The v1 curriculum is a solid skeleton but has four systemic gaps:

1. **VS Code onboarding is fatally under-specified.** A true beginner cannot follow "install VS Code" as a single bullet. Every click, every modal, every pane name must be spelled out. This is the single highest-risk content area.
2. **AI tool coverage is ~40% complete.** The entire ecosystem of specialized AI tools (search, documentation, reasoning, automation, agents, local models) is absent. The user explicitly wants *everything* covered.
3. **Prompt engineering is buried inside Part 2** as two lessons. It deserves its own part — it is the most transferable skill in the course.
4. **Advanced Claude Code features are missing.** CLAUDE.md, custom slash commands, hooks, memory, and sub-agent orchestration are not planned.

The revised curriculum below addresses all four gaps. Lesson count grows from 38 → ~80 lessons across 14 parts.

---

## Gap Analysis by Category

### 1. VS Code — Precision Deficit

Current plan has 6 lessons in Part 4 covering VS Code. Issues:

| Deficiency | Impact |
|-----------|--------|
| No installation walkthrough with exact steps | Beginner gets stuck at download page |
| No interface anatomy lesson | User doesn't know what the "Activity Bar" is when referenced later |
| No "opening a folder/workspace" lesson | File operations will be confusing |
| Command Palette not introduced early | Most VS Code instructions assume knowledge of Ctrl+Shift+P |
| No lesson on the integrated terminal | Terminal appears later in Claude Code section — too late |
| No settings/keybindings coverage | User can't customize, gets frustrated |
| Extensions panel not taught as a skill | User installs extensions without understanding what they're doing |
| No coverage of VS Code's Git UI | Beginners will be lost when Source Control is mentioned |

**Verdict:** VS Code needs to be split into two parts — Part A: Core VS Code (beginner), Part B: VS Code + AI. Estimated 10–12 lessons minimum.

---

### 2. Missing AI Tools & Integrations

#### AI Assistants & Chat Tools
| Tool | Status | Notes |
|------|--------|-------|
| Claude.ai | Partial | Needs Projects, Memory, Artifacts, Canvas |
| ChatGPT / GPT-4o | Missing | World's most-used AI — must cover |
| Google Gemini | Missing | Deep Google Workspace integration |
| Perplexity AI | Missing | AI-native search engine — highly practical |
| Microsoft Copilot | Missing | Built into Windows 11, Edge, Office 365 |
| Grok (xAI) | Missing | Optional — mention in landscape lesson |

#### AI Coding Tools
| Tool | Status | Notes |
|------|--------|-------|
| GitHub Copilot | Partial | Needs Chat, inline edits, workspace agent |
| Claude Code | Partial | Missing CLAUDE.md, skills, hooks, memory, sub-agents |
| Cursor IDE | Missing | Most popular AI-first editor — deserves its own lesson |
| Windsurf (Codeium) | Missing | Strong competitor to Cursor |
| Continue.dev | Missing | Open-source, free, works inside VS Code |
| Aider | Missing | Terminal-based AI coding — important for CLI users |
| Cody (Sourcegraph) | Missing | Enterprise-grade, strong codebase context |
| Tabnine | Missing | Privacy-first AI completion |

#### MCP Servers (tool specifically listed by user as important)
| Server | Status | Notes |
|--------|--------|-------|
| context7 | Missing | Fetches live library docs — user explicitly mentioned |
| sequential-thinking | Missing | Structured reasoning steps — user has this installed |
| actor-critic-thinking | Missing | Self-critique reasoning loop — user has this installed |
| task-master-ai | Missing | AI-driven project task management |
| GitHub MCP | Partial | Covered but needs depth |
| Filesystem MCP | Partial | Covered but needs depth |
| Browser/Playwright MCP | Missing | AI controls a real browser |
| Google Drive MCP | Missing | User has this connected |
| Google Calendar MCP | Missing | User has this connected |
| Gmail MCP | Missing | User actively using this |
| Slack MCP | Missing | Common workplace tool |
| SQLite/Database MCPs | Missing | Data access via natural language |
| Custom MCP server | Missing | Building your own server |
| MCP Registry | Missing | How to discover community servers |

#### Prompt Engineering (needs its own part)
| Topic | Status | Notes |
|-------|--------|-------|
| Basic prompting | Partial | Currently lesson 1.5 — insufficient |
| System prompts | Missing | Critical concept |
| Role prompting | Missing | |
| Chain-of-thought | Missing | |
| Few-shot examples | Missing | |
| Structured output (JSON mode) | Missing | |
| Prompt templates | Missing | |
| Context management | Missing | Token limits, context windows |
| Prompt caching | Missing | Cost optimization |
| Iterative refinement | Missing | How to get better answers |

#### AI Automation & Workflow Tools
| Tool | Status | Notes |
|------|--------|-------|
| n8n | Missing | Open-source workflow automation + AI nodes |
| Make (formerly Integromat) | Missing | Visual automation with AI |
| Zapier + AI | Missing | Most popular automation platform |
| GitHub Actions + AI | Missing | CI/CD with AI-generated steps |
| AI-assisted git workflows | Missing | Commit messages, PR descriptions |

#### Local AI
| Tool | Status | Notes |
|------|--------|-------|
| Ollama | Missing | Run models locally — essential for privacy users |
| LM Studio | Missing | GUI for local models |
| Jan.ai | Missing | Alternative local runner |
| Local models overview | Missing | Llama, Mistral, Phi, Gemma |
| Privacy considerations | Missing | What not to send to cloud AI |

#### AI APIs & Development
| Topic | Status | Notes |
|-------|--------|-------|
| What is an API? | Missing | Foundational — beginners don't know this |
| Anthropic API basics | Missing | |
| OpenAI API basics | Missing | |
| Making first API call | Missing | Using curl / VS Code REST client |
| Building a simple AI tool | Missing | Small project with an API |
| Token counting & cost | Missing | Understanding pricing |
| Streaming responses | Missing | Better UX in AI apps |

#### AI-Specific Safety & Responsibility
| Topic | Status | Notes |
|-------|--------|-------|
| AI hallucinations | Missing | Critical for beginners to understand |
| Fact-checking AI output | Missing | |
| Privacy: what NOT to share | Missing | PII, credentials, proprietary code |
| AI bias awareness | Missing | |
| Responsible AI use | Missing | |
| Cost management | Missing | Avoiding surprise bills |

#### Claude Code — Missing Features
| Feature | Status | Notes |
|---------|--------|-------|
| CLAUDE.md files | Missing | Project-level instructions — core feature |
| Custom slash commands | Missing | `/my-command` — user mentioned this |
| Hooks (pre/post tool) | Missing | Automate actions around Claude's work |
| Memory system | Missing | `~/.claude/memory/` persistent memory |
| Sub-agents | Missing | Spawning agents for parallel work |
| Permissions model | Missing | Allow/deny specific tools |
| Plan mode | Missing | Review before execute |
| Worktrees | Missing | Isolated git branches for agents |
| Claude Code settings.json | Missing | Configuring the harness |
| MCP configuration in Claude Code | Partial | Needs more precision |

---

## VS Code — Precision Standard

Every VS Code lesson must follow this instructional template:

### What precision looks like

**Bad (current level):**
> Install VS Code and open the Extensions panel.

**Required level:**
> 1. Open your web browser and go to `code.visualstudio.com`
> 2. Click the blue **Download for Windows** button (or the button matching your OS)
> 3. When the download finishes, open your Downloads folder and double-click `VSCodeSetup-x64-x.x.x.exe`
> 4. In the installer: click **Next**, accept the license agreement, click **Next** three more times keeping all defaults, then click **Install**
> 5. When installation finishes, make sure **Launch Visual Studio Code** is checked, then click **Finish**
> 6. VS Code opens. You will see a **Welcome** tab — this is normal.

Every lesson must:
- Name every UI element on first mention (e.g., "the **Activity Bar** — the tall vertical strip of icons on the far left")
- Show the keyboard shortcut AND the menu path (never one without the other)
- Describe what success looks like ("you should now see…")
- Describe the most common failure mode and how to recover
- Include a "You did it if…" confirmation checklist at the end

### VS Code Interface — Named Elements (must be introduced in lesson 5.3)

```
┌─────────────────────────────────────────────────────────┐
│  Menu Bar: File  Edit  Selection  View  Go  Run  Terminal│
├──┬──────────────────────────────────────────────────────┤
│  │ ← Activity Bar (left icon strip)                      │
│  │   Explorer (files)    ─ folder icon                   │
│A │   Search              ─ magnifier icon                │
│c │   Source Control      ─ branch icon                   │
│t │   Run & Debug         ─ play/bug icon                 │
│i │   Extensions          ─ puzzle icon                   │
│v │                                                        │
│i ├──────────────────────────────────────────────────────┤
│t │ ← Side Bar (changes based on Activity Bar selection)  │
│y │   When Explorer is active: shows file/folder tree     │
│  │                                                        │
│B ├──────────────────────────────────────────────────────┤
│a │                                                        │
│r │           Editor Area (center)                        │
│  │           Tabs appear at the top                       │
│  │                                                        │
│  ├──────────────────────────────────────────────────────┤
│  │           Panel (bottom)                               │
│  │           Terminal | Output | Problems | Debug Console │
├──┴──────────────────────────────────────────────────────┤
│  Status Bar (very bottom, colored strip)                  │
└─────────────────────────────────────────────────────────┘
```

---

## Revised Curriculum — Version 2

### Summary of Changes

| v1 | v2 | Change |
|----|----|----|
| 8 parts, 38 lessons | 14 parts, ~82 lessons | +44 lessons |
| VS Code: 6 lessons | VS Code: 12 lessons across 2 parts | Split into Core + AI |
| MCP: 6 lessons | MCP: 14 lessons | +8 lessons, all missing servers |
| No Prompt Engineering part | New Part 3 (8 lessons) | New |
| No local AI | New Part 12 | New |
| No AI APIs | New Part 11 | New |
| No AI automation tools | New Part 10 | New |
| No alternative editors | New Part 9 (partial) | New |
| No responsibility/safety | Added to Part 1 | Expanded |

---

### Part 1 — AI Foundations *(no prerequisites, ~75 min)*

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 1.1 | What is Artificial Intelligence? | Explains AI in plain English | 10 |
| 1.2 | How Language Models Work | Mental model: tokens, context, prediction | 15 |
| 1.3 | The AI Tools Landscape (2025) | Knows the major tools and categories | 12 |
| 1.4 | AI Hallucinations & Limitations | Knows when NOT to trust AI output | 12 |
| 1.5 | Privacy & Safety — What NOT to Share | Never sends PII, credentials, or secrets to AI | 10 |
| 1.6 | AI & The Law: Legal Limits You Need to Know | Understands copyright, defamation, privacy law (GDPR/CCPA), ToS, professional rules, EU AI Act | 20 |

---

### Part 2 — Your First AI Tools *(hands-on with real tools)*

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 2.1 | Claude.ai — First Conversation | Sends a message, iterates, uses artifacts | 15 |
| 2.2 | Claude Projects & Memory | Creates a project, attaches files, sets instructions | 15 |
| 2.3 | ChatGPT & GPT-4o | Uses ChatGPT for comparison, knows when to use each | 12 |
| 2.4 | Google Gemini | Uses Gemini, especially Google Workspace integration | 10 |
| 2.5 | Perplexity AI — AI Search | Uses Perplexity for research with citations | 10 |
| 2.6 | Microsoft Copilot | Uses Copilot in Edge and Windows | 10 |
| 2.7 | AI Image Generation Overview | Tries DALL-E or similar, understands landscape | 12 |
| 2.8 | Choosing the Right AI Tool | Decision framework: which tool for which job | 10 |

---

### Part 3 — Prompt Engineering *(most transferable skill in the course)*

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 3.1 | Why Prompting Matters | Understands that prompt quality = output quality | 8 |
| 3.2 | The Anatomy of a Good Prompt | Writes prompts with context, task, format, constraints | 15 |
| 3.3 | Role & Persona Prompting | Uses system-level role assignment effectively | 12 |
| 3.4 | Chain-of-Thought Prompting | Gets step-by-step reasoning from AI | 12 |
| 3.5 | Few-Shot Examples | Teaches AI with examples in the prompt | 12 |
| 3.6 | Structured Output (JSON, tables, lists) | Gets predictable, machine-readable output | 12 |
| 3.7 | Iterative Refinement | Improves output through follow-up instructions | 15 |
| 3.8 | Prompt Templates & Reuse | Saves and reuses effective prompts | 10 |

---

### Part 4 — Computer & Command Line Basics

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 4.1 | How Computers Organize Files | Mental model of files, folders, paths | 10 |
| 4.2 | Windows: File Explorer & Paths | Navigates files, understands `C:\Users\...` paths | 12 |
| 4.3 | Opening the Terminal (PowerShell) | Opens PowerShell, knows it's not scary | 10 |
| 4.4 | Essential Terminal Commands | `cd`, `ls`/`dir`, `mkdir`, `pwd`, copy/paste in terminal | 15 |
| 4.5 | What is Code? Plain-English Intro | Variables, functions, control flow explained simply | 15 |
| 4.6 | Your First HTML File (Notepad) | Creates and opens HTML without any tools | 12 |

---

### Part 5 — VS Code: Complete Beginner Guide *(zero assumptions)*

> Every step is spelled out. Every UI element is named. Every shortcut has a menu alternative.

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 5.1 | What is VS Code and Why Use It | Understands the value proposition over Notepad | 8 |
| 5.2 | Downloading & Installing VS Code | VS Code installed and open (Windows + Mac paths) | 15 |
| 5.3 | The Interface: A Named Tour | Can name every panel: Activity Bar, Side Bar, Editor, Panel, Status Bar | 15 |
| 5.4 | Opening a Folder / Workspace | Creates a project folder and opens it in VS Code | 12 |
| 5.5 | Creating, Renaming & Deleting Files | Manages files from within VS Code, not File Explorer | 10 |
| 5.6 | The Command Palette (Ctrl+Shift+P) | Uses Command Palette for any action | 12 |
| 5.7 | The Integrated Terminal | Opens terminal inside VS Code, knows it's the same as PowerShell | 12 |
| 5.8 | Extensions — Installing & Managing | Installs Live Server, Prettier; understands what extensions do | 15 |
| 5.9 | Settings: UI Mode & JSON Mode | Changes font size, auto-save, theme; opens settings.json | 12 |
| 5.10 | Essential Keyboard Shortcuts | 10 shortcuts every VS Code user needs | 12 |
| 5.11 | Split Editor & Multiple Files | Works with two files side-by-side | 8 |
| 5.12 | VS Code Git Integration (Source Control) | Sees file changes, writes a commit message, commits from VS Code | 15 |

---

### Part 6 — AI Inside VS Code

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 6.1 | GitHub Copilot: Setup & First Suggestion | Copilot active; accepts its first autocomplete | 15 |
| 6.2 | Copilot Autocomplete in Practice | Guides, accepts, and rejects Copilot suggestions | 12 |
| 6.3 | Copilot Chat — Ask Questions About Code | Uses inline chat to explain and refactor code | 12 |
| 6.4 | Continue.dev — Free AI in VS Code | Installs Continue.dev, connects to Claude or local model | 15 |
| 6.5 | AI Debugging: Fix Errors with AI Help | Pastes an error into AI, applies the fix | 12 |
| 6.6 | Cursor IDE — The AI-Native Editor | Installs Cursor; understands how it differs from VS Code + Copilot | 15 |
| 6.7 | Windsurf — Another AI Editor Option | Brief tour of Windsurf; when to choose it | 10 |
| 6.8 | Choosing Your AI Editor Setup | Decision matrix: VS Code+Copilot vs Continue vs Cursor vs Windsurf | 10 |

---

### Part 7 — Claude Code: Complete Guide

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 7.1 | What is Claude Code? | Knows it as a coding agent, not just a chat tool | 10 |
| 7.2 | Installing Claude Code (CLI & Desktop) | `claude` runs in terminal | 20 |
| 7.3 | First Session: Reading a Project | Claude reads the course website project and answers questions | 15 |
| 7.4 | Asking Claude to Write a File | Generated a working file from a natural language prompt | 15 |
| 7.5 | Reviewing & Accepting Changes (diff view) | Uses diff view; accepts/rejects individual edits | 12 |
| 7.6 | CLAUDE.md — Project Instructions File | Creates a CLAUDE.md that customizes Claude's behavior per project | 15 |
| 7.7 | Custom Slash Commands | Creates a `/review` or `/test` command; understands `.claude/commands/` | 15 |
| 7.8 | Hooks — Automate Actions Around Claude | Sets up a pre/post-tool hook; understands settings.json hooks | 15 |
| 7.9 | The Memory System | Uses `~/.claude/memory/` to store persistent context across sessions | 12 |
| 7.10 | Plan Mode & Permissions | Uses Plan mode before execution; configures tool allow/deny | 12 |
| 7.11 | Sub-Agents & Parallel Work | Spawns a sub-agent for a research task; understands use cases | 15 |
| 7.12 | Claude Code Settings Deep Dive | Configures `settings.json`; understands all major knobs | 15 |

---

### Part 8 — MCP: Model Context Protocol

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 8.1 | What is MCP and Why It's a Big Deal | Explains the protocol: AI ↔ tool bridge | 12 |
| 8.2 | MCP Architecture: Client, Server, Transport | Understands how a host (Claude Code) talks to an MCP server | 15 |
| 8.3 | Installing Your First MCP Server | Walks through adding a server to Claude Code's config | 15 |
| 8.4 | context7 — Live Documentation for Any Library | Queries real-time docs while coding; never gets stale API info | 15 |
| 8.5 | sequential-thinking — Structured Reasoning | Uses the server to get step-by-step AI analysis | 12 |
| 8.6 | actor-critic-thinking — Self-Critique Loop | AI proposes then critiques its own answer; better output quality | 12 |
| 8.7 | task-master-ai — AI Project Management | Creates and tracks tasks with AI inside the editor | 15 |
| 8.8 | GitHub MCP — Issues, PRs, Code via Chat | Creates a GitHub issue with natural language | 15 |
| 8.9 | Filesystem MCP — AI Reads Your Files | AI navigates and reads your local file system | 12 |
| 8.10 | Browser / Playwright MCP | AI opens a browser, fills forms, scrapes data | 15 |
| 8.11 | Gmail MCP — AI + Your Email | AI reads, labels, and drafts emails | 15 |
| 8.12 | Google Drive & Calendar MCP | AI reads docs and creates calendar events | 12 |
| 8.13 | Database MCPs (SQLite) | AI queries a local database in plain English | 15 |
| 8.14 | Finding Community MCP Servers | Navigates the MCP registry; adds a new server independently | 12 |
| 8.15 | Building a Simple Custom MCP Server | Scaffolds a minimal MCP server in Python or Node.js | 25 |

---

### Part 9 — Other AI Coding Tools

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 9.1 | Aider — Terminal-Based AI Coding | Uses Aider for multi-file edits from the command line | 15 |
| 9.2 | Cody by Sourcegraph | Uses Cody for large-codebase context search | 12 |
| 9.3 | Tabnine — Privacy-First Completion | Understands the privacy-vs-capability tradeoff | 10 |
| 9.4 | AI Coding Tool Landscape (Full Map) | Can recommend the right tool for a given situation | 12 |

---

### Part 10 — AI Automation & Workflow Tools

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 10.1 | What is Workflow Automation? | Mental model: triggers, actions, data flow | 10 |
| 10.2 | n8n — Open-Source Automation + AI | Builds a workflow with an AI node; self-hostable | 20 |
| 10.3 | Zapier + AI Actions | Connects two apps with an AI step in between | 15 |
| 10.4 | Make (Integromat) Basics | Visual automation with AI modules | 15 |
| 10.5 | AI-Assisted Git Workflows | AI writes commit messages, PR descriptions, changelogs | 12 |
| 10.6 | GitHub Actions + AI | Adds an AI review step to a CI/CD pipeline | 20 |
| 10.7 | Building a Personal AI Workflow | Designs and documents their own recurring AI workflow | 20 |

---

### Part 11 — AI APIs & Building Your First AI Tool

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 11.1 | What is an API? (Plain English) | Explains API as "menu + waiter + kitchen" | 10 |
| 11.2 | The Anthropic API — Overview | Knows what the API offers vs. Claude.ai | 10 |
| 11.3 | Getting Your First API Key | Has an Anthropic API key stored safely | 15 |
| 11.4 | First API Call with curl | Makes a real API call from the terminal | 15 |
| 11.5 | Using the Anthropic SDK (Python or JS) | Makes a call from a code file | 20 |
| 11.6 | Understanding Tokens & Cost | Can estimate cost before running a prompt | 12 |
| 11.7 | Streaming Responses | Displays AI output word-by-word like Claude.ai | 15 |
| 11.8 | Build a Simple AI Tool | Builds a small working app (summarizer, Q&A bot, etc.) | 30 |

---

### Part 12 — Local AI with Ollama *(privacy & offline)*

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 12.1 | Why Run AI Locally? | Understands privacy, cost, and offline use cases | 10 |
| 12.2 | Installing Ollama | Ollama installed and running | 15 |
| 12.3 | Running Your First Local Model | Pulls and chats with Llama 3 or Phi-4 | 12 |
| 12.4 | LM Studio — GUI for Local Models | Uses LM Studio as a desktop interface | 12 |
| 12.5 | Connecting Local Models to VS Code | Wires Continue.dev to a local Ollama model | 15 |
| 12.6 | Connecting Local Models to Claude Code | Uses Ollama as an MCP-connected model | 15 |
| 12.7 | Choosing a Local Model | Decision guide: Llama vs Phi vs Mistral vs Gemma | 10 |

---

### Part 13 — AI Safety, Privacy & Cost Management

| # | Lesson | Key Outcome | Est. Min |
|---|--------|-------------|---------|
| 13.1 | Understanding AI Hallucinations (Deep Dive) | Has a multi-step verification habit | 12 |
| 13.2 | What NOT to Share with Cloud AI | Has a personal policy on PII, secrets, proprietary code | 12 |
| 13.3 | API Cost Management | Sets usage limits; knows how to avoid surprise bills | 12 |
| 13.4 | AI & Copyright — What You Need to Know | Understands generated code/content ownership questions | 10 |
| 13.5 | Security Risks in AI Workflows | Knows prompt injection, data exfiltration risks in MCPs | 15 |

---

### Part 14 — Capstone Projects

| # | Project | Skills Used | Est. Hours |
|---|---------|------------|------------|
| 14.1 | Personal Portfolio Website | VS Code, Copilot, Claude Code, HTML/CSS | 3 |
| 14.2 | AI-Powered Research Tool | Claude API, prompting, structured output | 4 |
| 14.3 | Automated Email Workflow | Gmail MCP, n8n or Zapier, Claude Code | 3 |
| 14.4 | Full AI Dev Environment Setup | Claude Code + MCP stack + CLAUDE.md + custom skills | 4 |
| 14.5 | Your Own Mini-App | Student-chosen project with AI assistance | Open |

---

## Content Depth Standards

### Every Lesson Must Include

1. **Learning objective** — one sentence, measurable ("After this lesson, you can...")
2. **Estimated time** — honest, includes hands-on time
3. **Prerequisites** — which lessons must be done first
4. **Step-by-step instructions** — numbered, atomic steps
5. **Named UI elements** — every button, pane, menu item spelled out on first use
6. **"What you should see" checkpoints** — at least one per major step
7. **Common errors** — the #1 thing that goes wrong and how to fix it
8. **Hands-on exercise** — something the student does, not just reads
9. **"You did it if..." confirmation** — a test the student can run themselves
10. **Quick reference** — key commands/shortcuts at the end

### Callout Types

```
💡 Tip          — helpful shortcut or non-obvious detail
⚠️  Warning      — easy mistake to make
❌ Don't         — specific anti-pattern for beginners
🔍 Deep Dive    — optional advanced detail
🔗 Next Step    — what naturally follows from this lesson
```

---

## File Structure Update Required

Add to the implementation plan:

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
  ├── part-11/   (8 files)
  ├── part-12/   (7 files)
  ├── part-13/   (5 files)
  └── part-14/   (5 files)   ← total: 111 lesson files
```

---

## Architecture Decisions Driven by This Review

| Decision | Rationale |
|----------|-----------|
| VS Code lessons must use annotated screenshot descriptions (alt-text style) | Beginners cannot navigate from vague UI descriptions |
| OS-specific branches in installation lessons | Windows and Mac paths diverge at install; a single lesson must cover both |
| "Tool comparison" lessons at end of each tool category | Students need a decision framework, not just feature lists |
| Privacy/safety woven through every tool section, not just Part 13 | Part 13 is a deep dive; each tool section must include a "Safety Note" callout |
| Local AI (Part 12) comes before Capstones | Gives students the privacy option before they commit to cloud-only workflows |
| n8n chosen over Make/Zapier as primary automation tool | Open-source, self-hostable, has strong AI nodes, no usage caps |
| context7 gets its own full lesson (not a bullet in MCP overview) | User specifically named it; it is daily-use once learned |
| Custom MCP server lesson uses Python (not Node.js) | Python is more beginner-friendly and more common in AI/data contexts |

---

## Open Questions for Architect Sign-Off

1. **Depth vs. breadth tradeoff** — 82 lessons is a substantial course (~60–80 hours). Should any parts be marked "optional / advanced" to give beginners a clear shorter path to the core outcome?
2. **Windows vs. Mac parity** — All VS Code and CLI lessons currently assume Windows (the user's OS). Should Mac/Linux paths be a parallel track, a "Note for Mac users" callout, or deferred entirely?
3. **n8n self-hosting** — n8n requires Docker or Node.js to self-host. Should the course use n8n Cloud (free tier) instead, or teach Docker as a prerequisite?
4. **Cursor licensing** — Cursor has a free tier but is not open-source. Is it acceptable to teach a paid/freemium tool in a course aimed at beginners? Same question applies to GitHub Copilot.
5. **Video content** — Some tools (especially VS Code interface tour, Cursor) are much better demonstrated via video. Should key lessons link to official YouTube walkthroughs, or is text+screenshot-descriptions the only format?
6. **Versioning** — VS Code, Claude Code, and all MCP servers update frequently. What is the update strategy for lesson content? (Suggested: version-tag each lesson JSON with the tool version it was written against.)

---

## Version 3 Review — Findings & Fixes

**Review date:** 2026-06-10  
**Scope:** Step-by-step audit of all 111 lessons in `lesson-content-guide.md`

---

### Fixes Applied in v3

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | No cost engineering content beyond billing limits | Lesson 13.3 + Part 11 | Added new **lesson 11.9** covering token minimization, model routing, prompt caching, and Batch API. Expanded 13.3 into a full budget + apply-it workshop. |
| 2 | Python install never taught | First needed in lesson 8.15 | Added explicit Python install prereq callout (with "Add to PATH" warning) in 8.15 |
| 3 | Lesson count header wrong | `lesson-content-guide.md` line 3 | Updated "82 lessons" → "112 lessons" (111 original + new 11.9) |
| 4 | Lesson 12.6 referenced wrong docs | `bedrock-vertex-proxies` URL | Fixed to `claude-code/settings` |
| 5 | Lesson 10.6 silently requires OpenAI API key | GitHub Actions workshop | Added explicit note; suggests Anthropic-native alternative |

---

### Remaining Gaps Identified (not yet addressed)

| Gap | Severity | Detail |
|-----|----------|--------|
| Git/version control never explained as a concept | ~~Medium~~ **FIXED** | Lesson 5.12 now opens with a plain-English explanation of version control, Git vs GitHub, and key vocabulary (repo, commit, stage, branch). |
| No Git install/setup lesson | ~~Medium~~ **FIXED** | Lesson 5.12 now has a prereq callout: `git --version` check, git-scm.com download steps, `git config` name/email setup, and "paste the error into Claude" AI troubleshooting tip for anything that goes wrong. |
| Model names will become stale | Low | Hard-coded model IDs like `claude-haiku-4-5-20251001` and `claude-sonnet-4-6` will rot as new models release. Consider adding a recurring note: "Check `docs.anthropic.com/en/docs/about-claude/models` for the latest model IDs before building." |
| Continue.dev forward dependency | Low | Lesson 6.4 tells students to get their API key "from Part 11" — but Part 6 comes before Part 11. The fallback note (use Ollama) handles this acceptably; no structural change needed. |
| `ai-course-implementation-plan.md` shows v1 curriculum | Low | The implementation plan still lists the 8-part v1 curriculum. The v2 structure (14 parts, 112 lessons) is authoritative in `architectural-review.md` and `lesson-content-guide.md`. The implementation plan should be updated to reference v2. |
| OpenAI API basics never taught | Low | The architectural review listed this as missing. The course is Claude-first; the GitHub Actions lesson (10.6) is the only place OpenAI appears and it now has a note. Deliberate omission is acceptable — just document it here. |

---

### v3 Curriculum Count

| Part | Lessons |
|------|---------|
| 1 — AI Foundations | 6 |
| 2 — First AI Tools | 12 |
| 3 — Prompt Engineering | 8 |
| 4 — Computer & Command Line | 6 |
| 5 — VS Code Complete Guide | 12 |
| 6 — AI Inside VS Code | 8 |
| 7 — Claude Code Complete Guide | 12 |
| 8 — MCP | 20 |
| 9 — Other AI Coding Tools | 4 |
| 10 — AI Automation & Workflow | 7 |
| 11 — AI APIs & Building Tools | **9** (was 8 — added 11.9) |
| 12 — Local AI | 7 |
| 13 — Safety, Privacy & Cost | 5 |
| 14 — Capstone Projects | 5 |
| **Total** | **121** |

---

### Cost Coverage Summary (complete as of v3)

| Topic | Lesson | Depth |
|-------|--------|-------|
| Token counting before sending | 11.6 | ✓ Full workshop |
| Model tier pricing table | 11.9 | ✓ Full table + math |
| Token minimization techniques | 11.9 | ✓ Full workshop with code |
| Model routing / boss-worker pattern | 11.9 | ✓ Full workshop with code |
| Prompt caching (cache_control) | 11.9 | ✓ Full workshop with code |
| Batch API (50% discount) | 11.9 | ✓ Introduced with code |
| Billing limits & alerts | 13.3 | ✓ Step-by-step |
| Usage audit (console dashboard) | 13.3 | ✓ Step-by-step |
| Apply cost technique to real script | 13.3 | ✓ Hands-on exercise |
| Cost decision framework | 13.3 | ✓ Checklist |
| Local models as zero-cost alternative | 12.1 | ✓ Framed correctly |

---

## Version 4 Review — Full Step-by-Step Audit

**Review date:** 2026-06-10  
**Scope:** Every lesson re-read, all cross-references traced, all install steps tested against reality, all workshop instructions evaluated for completeness and consistency.

---

### Executive Summary

12 bugs found that will break real student experience. 5 content gaps. 6 consistency issues. All 12 bugs are fixed inline alongside this review. Content gaps are documented below with recommendations.

---

### Bugs — Things That Will Break

| # | Lesson | Bug | Fix |
|---|--------|-----|-----|
| B1 | 8.13 | SQLite MCP installed but config JSON never shown — it won't connect | Added config JSON to workshop |
| B2 | 8.15 | Custom MCP server step 7 says "Add to config" with no example — every other MCP lesson shows exact JSON | Added config JSON example |
| B3 | 8.8 | GitHub Personal Access Token placed directly in `settings.json` with no warning — if that file is in a git repo it gets committed and exposes the token | Added security callout: use env var reference or keep settings.json in `.gitignore` |
| B4 | 14.1 | GitHub Pages deploy uses `git push -u origin main` but older git defaults to `master` branch — push fails or creates wrong branch | Added `git branch -M main` step |
| B5 | 11.5 | JavaScript version: `npm install @anthropic-ai/sdk dotenv` before `npm init -y` — fails if no `package.json` exists | Added `npm init -y` step |
| B6 | 9.1 | Aider launch command given without setting `ANTHROPIC_API_KEY` first — Aider will error on auth | Added `$env:ANTHROPIC_API_KEY` setup step |
| B7 | 12.6 | Config shows LM Studio's port (`localhost:1234`) but lesson context is Ollama — Ollama's API is `localhost:11434` | Clarified which server each port belongs to, added both options |
| B8 | 6.4 | Fallback says "use Ollama from Part 12" but Part 12 is after Part 6 — student has neither API key nor Ollama yet | Rewrote fallback: defer Continue.dev connection until after Part 11 or 12, still install the extension now |
| B9 | 10.3 | "AI by Zapier" requires Zapier paid plan ($19.99+/mo) — lesson says "free tier" — student hits paywall | Added paid plan disclosure with free alternative (n8n already done in 10.2) |
| B10 | 5.8 | GitLens installed before Git is conceptually introduced (lesson 5.12) — confusing for absolute beginners | Added one-line clarifying note: "We'll activate Git features in lesson 5.12" |
| B11 | 7.8 | Hook command uses `%CLAUDE_TOOL_INPUT_PATH%` Windows env syntax — no Mac equivalent shown | Added Mac variant using `$CLAUDE_TOOL_INPUT_PATH` |
| B12 | 8.3 | MCP config path uses `C:\\Users\\YourName\\` — students must replace `YourName` but this isn't flagged | Added explicit "replace YourName with your actual Windows username" instruction |

---

### Content Gaps

| # | Gap | Severity | Recommendation |
|---|-----|----------|---------------|
| G1 | **System prompt as a concept is never explained** | High | "System prompt" is referenced in lessons 7.8, 11.5, 11.9, 12.6, and implicitly throughout CLAUDE.md and MCP config — but no lesson defines it. Should be added as a callout in lesson 3.3 (Role Prompting) explaining the user/assistant/system turn structure. |
| G2 | **Audio and video AI tools absent** | ~~Medium~~ **FIXED** | Lesson 2.7 renamed to "AI Media Generation" — expanded to cover image, audio (ElevenLabs, Suno), video (Sora, Runway) with a full landscape table and bonus exercises. Landscape table added to lesson 1.3 as well. |
| G3 | **NotebookLM not covered** | ~~Medium~~ **FIXED** | NotebookLM added to lesson 1.3 landscape table (with explanation), added to lesson 2.8 decision matrix ("Summarize a document / video" row), and added to 1.3 Tool Safari workshop. |
| G4 | **n8n lesson (10.2) does not meet the course's own precision standard** | Medium | The three automation examples are described as pipeline diagrams (`X → Y → Z`) with no step-by-step instructions for n8n's node-based UI. Compare to lesson 5.2 (every VS Code installer click is named) — the standard is not applied here. n8n's interface is non-obvious and students will get stuck. Needs a "first workflow, every step" section for at least Automation 1. |
| G5 | **Node.js never explained conceptually** | Low | Node.js is installed in lesson 7.2 with a download URL and one `node --version` check, but no explanation of what it is. Compare to how Git is now introduced in 5.12 (concept + why it exists + vocabulary). A two-paragraph explanation ("Node.js is JavaScript running outside a browser — it powers npm, which is the app store for JavaScript tools") would prevent confusion in lessons 7–11 where npm/npx commands appear constantly. |

---

### Consistency Issues

| # | Location | Issue |
|---|----------|-------|
| C1 | `lesson-content-guide.md` lesson 13.2 | Creates `notes/ai-data-policy.md` which duplicates work from lesson 1.5 (`my-ai-rules.md`). Should reference and extend the 1.5 file rather than create a parallel document. |
| C2 | `ai-course-implementation-plan.md` Phase 4 | Says "Write all 38 lessons as JSON files" — should say 112. |
| C3 | `ai-course-implementation-plan.md` file structure | `data/lessons/` still shows flat v1 file names (`1-1-what-is-ai.json`) rather than the v3 subdirectory structure (`part-01/1-1.json`). |
| C4 | `ai-course-implementation-plan.md` open questions | Questions reference "38 lessons" and v1 structure — should be updated to v3 questions. |
| C5 | `resource-strategy.md` | HTML loading section shows core highlight.js bundle but not the PowerShell language file (`vendor/highlight/languages/powershell.min.js`). The language table correctly notes it needs a separate file, but the HTML loading example omits it. |
| C6 | `design-decisions.md` line 42 | Typo: "adds a subtle gradient gradient" — double word. |

---

### What Was Fixed in This Review

All 12 bugs (B1–B12) were fixed inline in `lesson-content-guide.md`. Consistency issues C2–C4 were fixed in `ai-course-implementation-plan.md`. C6 fixed in `design-decisions.md`. Content gaps G2 and G3 fixed post-v4 (audio/video landscape + NotebookLM).

Unfixed post-v4: C1 (13.2/1.5 duplication — **FIXED in v5**: 13.2 now extends `my-ai-rules.md` from 1.5 instead of creating a new file), C5 (resource-strategy.md HTML loading — affects developer setup only, not student content; still open).

---

### v5 Review — Five-Pass Deep Audit (2026-06-10)

**Round 1 — Technical Accuracy**

| ID | Location | Bug | Fix |
|----|----------|-----|-----|
| V5-B1 | 11.6 Token cost | Pricing coefficient `$0.00000025` = $0.25/M (old Haiku 3). Haiku 4.5 = $0.80/M | Fixed: formula now uses `÷ 1,000,000 × $0.80` |
| V5-B2 | 6.3 Copilot Chat | `Ctrl+Shift+I` opens browser devtools, not Copilot Chat | Fixed: corrected to `Ctrl+Alt+I` |
| V5-B3 | 9.1 Aider | Duplicate step label "4." (two items both numbered 4) | Fixed: renumbered 4→5→6→7 |
| V5-B4 | 4.3 PowerShell | `Win+X` shows "Windows PowerShell" on Win 10, not "Terminal" | Fixed: added Start menu search fallback |

**Round 2 — Forward Dependencies**

| ID | Location | Issue | Fix |
|----|----------|-------|-----|
| V5-B5 | 7.11 Sub-agents | Agent tasked to research internet but Playwright MCP (8.10) not yet taught | Fixed: changed to file-based task; added Playwright callout |
| V5-G1 | 3.8 Prompt Library | "if not installed yet, use Notepad" — weak note for VS Code dependency | Documented; weak note is acceptable given later course position |
| V5-G2 | 8.7 task-master-ai | "Follow the repo's setup instructions" — only place in course without exact config | Fixed: added exact npx config JSON |

**Round 3 — Missing Content**

| ID | Location | Gap | Fix |
|----|----------|-----|-----|
| V5-G3 | 12.5 Continue.dev | Only Ollama shown; no LM Studio alternative (despite 12.4 teaching LM Studio) | Fixed: added LM Studio provider config option |
| V5-G4 | 7.2 Node.js | G5 open — no "what is Node.js" explanation | Fixed: added paragraph before workshop |
| V5-G5 | 8.6 actor-critic | GitHub URL hedged as "(or community equivalent)" — server may not exist | Fixed: reframed as "self-critique pattern" teachable without MCP |
| V5-G6 | 1.3 + 2.7 | No AI writing tools in landscape; no speech-to-text coverage | Fixed: added "Writing assistant" + "Speech-to-text" rows to 1.3 and 2.7 tables |

**Round 4 — Consistency & Quality**

| ID | Location | Issue | Fix |
|----|----------|-------|-----|
| V5-B6 | 8.13 SQLite | Step numbering resets: 1,2,3,4 then 3,4,5,6 | Fixed: renumbered to 1–8 continuously |
| V5-B7 | 5.6 Command Palette | `>Theme` notation implies typing `>` — Ctrl+Shift+P already provides it; `>>Theme` returns no results | Fixed: steps now say type `Theme`, added tip about pre-filled `>` |
| V5-B8 | 5.9 Settings JSON | "Add this line" — beginners don't know the `{}` context; causes JSON parse errors | Fixed: shows complete JSON snippet with context |

**Round 5 — Workshop Precision**

| ID | Location | Issue | Fix |
|----|----------|-------|-----|
| V5-B9 | 10.2 n8n Stars | GitHub stars API doesn't filter by date — requires Code node with `starred_at` check | Fixed: added API note + Code node instruction |
| V5-B10 | 13.2 Privacy policy | Creates `notes/ai-data-policy.md` duplicating `my-ai-rules.md` from 1.5 (C1) | Fixed: lesson now opens and extends 1.5 file instead |
| V5-G7 | 10.4 Make/Claude | "Claude/OpenAI module" — Make has no official Anthropic module | Fixed: added HTTP module instructions for calling Anthropic API directly |

---

### Remaining Open Questions (post-v5)

1. **n8n lesson 10.2 click-by-click precision** — The three automations now have API-accurate descriptions but still lack step-by-step n8n UI navigation (where to click to add nodes, how to configure credentials in the n8n UI, etc.). This is G4 and remains the highest-impact remaining gap before publishing.

2. **C5 (resource-strategy.md)** — HTML loading section still omits the `vendor/highlight/languages/powershell.min.js` tag. Developer-only concern; no student impact.

3. **System prompt callout** — Addressed in 3.3 with a callout box. Considered complete.

4. **Model name staleness** — Noted in 11.2. Considered complete.

---

### v5 Course Health Scorecard

| Dimension | v4 | v5 |
|-----------|----|----|
| Lesson count | 112 | 112 |
| Confirmed bugs | 0 | 0 (10 new v5 bugs found + fixed) |
| Technical accuracy errors | 2 (pricing, shortcut) | 0 |
| Step numbering errors | 1 (8.13) | 0 |
| Forward dependency issues | 1 (7.11) | 0 |
| Node.js concept | Absent | Explained in 7.2 |
| Continue.dev local options | Ollama only | Ollama + LM Studio |
| Self-critique pattern | MCP-dependent | Works with or without MCP |
| AI writing/speech-to-text | Absent | In 1.3 + 2.7 landscape |
| Privacy doc consistency | Duplicate (C1) | Single file extended |
| Make/Claude integration | Vague | HTTP module approach documented |
| n8n click-by-click | Incomplete | API accuracy fixed; UI steps still pending |
| Cross-references consistent | Yes | Yes |

---

## Implementation Log

### Phase 1 — Site Scaffolding (2026-06-10)

Branch: `feature/phase-1-scaffolding`

**Files created (29 files, ~4,300 lines):**

| File | Purpose |
|------|---------|
| `index.html` | App shell — header, sidebar, main content area, theme flash prevention |
| `404.html` | Custom 404 page |
| `css/reset.css` | Browser normalisation |
| `css/variables.css` | CSS custom properties (dark default, light via media + class) |
| `css/dark.css` | Manual `.theme-dark` / `.theme-light` overrides |
| `css/layout.css` | Fixed header, sidebar, main area, responsive breakpoint |
| `css/components.css` | Sidebar nav, part cards, hero, stats, search, progress bars |
| `css/lesson.css` | Lesson typography, callouts, quiz, workshop, lesson nav, complete bar |
| `js/icons.js` | 20 inline SVG icon exports (Lucide) |
| `js/utils.js` | `slugify`, `formatMinutes`, `qs`, `qsa`, `el`, `debounce` |
| `js/router.js` | Hash-based routing (`#/`, `#/lesson/1-1`), `hashchange` listener |
| `js/progress.js` | `localStorage` progress, theme persistence, stats helpers |
| `js/sidebar.js` | Collapsible sidebar nav, status icons, active-lesson highlight |
| `js/search.js` | Fuse.js fuzzy search, keyboard nav, `'/'` shortcut |
| `js/lesson.js` | `renderLesson`, all section type renderers, quiz, copy buttons, mark-complete |
| `js/app.js` | `boot()`, `renderDashboard()`, hash router wiring, theme toggle |
| `data/curriculum.json` | 14 parts, 112 lessons, full prev/next chain |
| `data/lessons/part-01/1-1.json` | Full lesson content — What is AI? |
| `data/lessons/part-01/1-2.json` | Full lesson content — How LLMs Work |
| `vendor/*` | marked v15, DOMPurify v3, Fuse.js v7, highlight.js v11 + PowerShell lang |
| `scripts/serve.js` | Node dev server (no Python required) |
| `scripts/update-vendors.{ps1,sh}` | Vendor refresh scripts |
| `.gitattributes` | LF line endings for all text files |
| `.gitignore` | Excludes `.claude/settings.json` (contains API keys) |

**Bugs fixed before / on commit:**
- Blank page on load — `app.js` `boot()` suspended at `await` before registering the route handler; DOMContentLoaded fired to empty listeners. Fix: call `handleRoute(getRoute())` at end of `boot()`.
- `sidebar.js` `updateLessonIcon` — dead first `outerHTML` replacement before re-query. Fix: removed the dead block.
- Scroll listener leak — `setupScrollProgress` accumulated `scroll` listeners across lesson navigations. Fix: module-level `scrollHandler` reference, remove old listener before adding new.
- CRLF line endings — `.gitattributes` added.
- Security: `.claude/settings.json` (contains GitHub PAT + Context7 key) excluded via `.gitignore`. PAT `ghp_ttNml…` and Context7 key `ctx7sk-d0cd…` were briefly exposed and must be rotated.

**Content status (updated 2026-06-10):**
- **ALL 121 lesson JSON files written** — Parts 1–14 complete. No "Coming Soon" cards remain.
- All 121 curriculum entries fully populated (id, title, estimatedMinutes, tags, prev/next). Zero chain errors.
- All 121 lessons have a hands-on workshop section. All next/prev chains validated.
- JSON fixer script (`scripts/fix-json.js`) guards against literal control characters in JSON strings.

**Office worker integrations added (2026-06-10):**
- Part 2: 4 new lessons (2-9 through 2-12) — Copilot for M365 (Outlook/Teams/Word/Excel/PowerPoint), AI meeting tools (Zoom/Otter.ai/Teams), browser AI extensions (Edge Copilot/Sider), Slack AI + Notion AI
- Part 8: 5 new MCP lessons (8-16 through 8-20) — Outlook MCP, Teams MCP, Slack MCP (full lesson), Notion MCP, and The Unified Office (multi-MCP chaining synthesis)
- Lesson 8-20 ("The Unified Office") is the capstone: designing and saving repeatable multi-tool workflows as custom Claude Code slash commands

**Lesson 1-6 rewritten (2026-06-10):** Changed from "Responsible & Ethical AI Use" (values/norms framing) to "AI & The Law: Legal Limits You Need to Know" (factual legal content only). New coverage: copyright law and AI output, defamation liability, GDPR/CCPA/Australian Privacy Act, platform ToS as contract, professional licensing rules (legal/medical/financial/academic), EU AI Act overview. Workshop changed from "write 3 personal commitments" to a legal self-audit document. Tags updated: `ethics` → `legal`.

**Implementation complete — Phase 4 (Content Authoring) done.**

**To run locally:**
```
node scripts/serve.js
# then open http://localhost:8080
```
ES modules require a server — `file://` protocol will fail in Chrome/Edge.
