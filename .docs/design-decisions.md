# Design Decisions — Resolved

**Date:** 2026-06-10  
**Status:** Final — all 5 open questions closed

---

## Decision 1 — Logo Mark

**Decision: Lucide `<Sparkles>` icon + wordmark**

Rationale: The sparkles icon is the universal visual shorthand for AI across every major platform (Apple Intelligence, Google AI, Notion AI, VS Code Copilot). It reads immediately. It's clean at 20px. No misinterpretation risk.

Implementation:
```html
<!-- Top bar logo -->
<a class="logo" href="#/">
  <!-- Sparkles SVG from icons.js, 20×20, --accent color -->
  <svg ...sparkles.../>
  <span class="logo-text">AI Mastery</span>
</a>
```

Font treatment: `font-weight: 700`, `letter-spacing: -0.02em`, `--text-xl`.  
Icon color: `--accent` (indigo glow on hover via `filter: drop-shadow(var(--accent-glow))`).

---

## Decision 2 — Accent Color

**Decision: Indigo primary, violet secondary**

| Role | Dark mode | Light mode |
|------|-----------|------------|
| Primary accent | `#818cf8` indigo-400 | `#6366f1` indigo-500 |
| Accent hover | `#a5b4fc` indigo-300 | `#4f46e5` indigo-600 |
| Secondary (progress ring, complete) | `#a78bfa` violet-400 | `#7c3aed` violet-600 |
| Success (complete) | `#4ade80` green-400 | `#16a34a` green-600 |

Rationale: Indigo sits in the same visual family as Claude's purple brand without being a direct copy. It signals intelligence and trust. The violet secondary for the progress ring adds a subtle gradient that makes "completion" feel distinct from "active." Cyan was rejected (too cold, reads as dashboard/data-viz), pure purple rejected (too close to Claude branding).

The dashboard hero gets a subtle radial gradient:
```css
background: radial-gradient(ellipse at 20% 50%, 
  rgb(129 140 248 / 0.08) 0%, 
  transparent 60%);
```

---

## Decision 3 — components.html Demo Page

**Decision: Keep in repo under `dev/components.html`**

Rationale: A living component gallery is invaluable during development and for anyone who extends the course. It is explicitly excluded from student-facing navigation. A comment in `index.html` will note it exists for developers.

It will include all component variants with their class names labeled — functions as inline documentation.

---

## Decision 4 — Lesson Authoring Voice

**Decision: First-person educator, direct and encouraging**

Voice guidelines:
- Speak to the reader as "you" — direct, warm, not condescending
- No filler phrases ("In this lesson, we will learn that...")  
- State the outcome first, then explain why it matters
- Every technical term introduced with a plain-English definition in parentheses the first time
- Sentence length varies — short punchy sentences for key points, longer for context
- Use "Let's" for exercises to create a collaborative feel

Tone reference: the feeling of a knowledgeable friend who happens to know everything about AI sitting next to you — not a textbook, not a YouTube hype channel.

---

## Decision 5 — VS Code Screenshots / Diagrams

**Decision: ASCII diagrams in lesson JSON + real screenshots in `assets/images/`**

Hybrid approach:
1. **ASCII diagrams** embedded in lesson JSON text for interface orientation (always works, always current, never needs updating for minor VS Code version changes)
2. **Real screenshots** in `assets/images/vscode/` for the 3–4 highest-friction moments: installer wizard, first launch, extension install confirmation, Git commit panel
3. Screenshots are wrapped in `<figure>` with `alt` text that fully describes what the screenshot shows — so the lesson is 100% usable even if images don't load
4. A caption on every screenshot: "Your screen may look slightly different depending on your VS Code version — this is normal."

Screenshot format: 1200×750px, PNG, annotated with numbered callouts in red circles matching the step numbers in the text. Callout font: Inter 14px bold.
