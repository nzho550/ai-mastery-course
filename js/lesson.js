import { icons } from './icons.js';
import { getLessonStatus, setLessonStatus, setLastVisited } from './progress.js';
import { setActiveLesson } from './sidebar.js';
import { navigate } from './router.js';
import { qs, formatMinutes, escapeHtml } from './utils.js';
import { t, lessonPath } from './i18n.js';

let curriculum = null;
let scrollHandler = null;

export function initLesson(curriculumData) {
  curriculum = curriculumData;
}

export async function renderLesson(id) {
  const main = qs('#main');
  if (!main) return;

  // Find lesson metadata
  const meta = findLesson(id);
  if (!meta) { main.innerHTML = `<div class="lesson-page"><p style="color:var(--text-muted)">${t('lesson.notFound')}</p></div>`; return; }

  setLastVisited(id);
  setActiveLesson(id);
  if (getLessonStatus(id) === 'not-started') setLessonStatus(id, 'in-progress');

  // Load lesson JSON
  let data;
  try {
    const res = await fetch(lessonPath(meta.partId, id));
    if (!res.ok) throw new Error('not found');
    data = await res.json();
  } catch {
    main.innerHTML = buildComingSoon(meta);
    setupScrollProgress();
    return;
  }

  main.innerHTML = buildLesson(meta, data);
  setupScrollProgress();
  setupCopyButtons();
  setupQuiz();
  setupMarkComplete(id, meta);
  try { hljs.highlightAll(); } catch { /* vendor script unavailable, code blocks stay unhighlighted */ }
  window.scrollTo(0, 0);
}

function findLesson(id) {
  for (const part of curriculum.parts) {
    const lesson = part.lessons.find(l => l.id === id);
    if (lesson) return { ...lesson, partTitle: part.title, partId: part.id, partNumber: part.number };
  }
  return null;
}

function buildLesson(meta, data) {
  const status = getLessonStatus(meta.id);
  const prevMeta = meta.prevLesson ? findLesson(meta.prevLesson) : null;
  const nextMeta = meta.nextLesson ? findLesson(meta.nextLesson) : null;

  const sectionsHtml = (data.sections || []).map(renderSection).join('');

  return `
    <div id="scroll-progress"></div>
    <div class="lesson-page">
      <nav class="breadcrumb">
        <a href="#/">${t('breadcrumb.home')}</a>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <a href="#/">${t('part.label', { number: meta.partNumber })}</a>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <span>${escapeHtml(meta.title || '')}</span>
      </nav>

      <header class="lesson-header">
        <div class="lesson-header-meta">
          <span class="badge badge-accent">${t('part.label', { number: meta.partNumber })}</span>
          ${meta.estimatedMinutes ? `<span class="badge badge-muted">${icons.clock} ${formatMinutes(meta.estimatedMinutes)}</span>` : ''}
          ${status === 'complete' ? `<span class="badge badge-success">${icons.checkCircle} ${t('badge.complete')}</span>` : ''}
        </div>
        <h1 class="lesson-title">${escapeHtml(data.title || meta.title || '')}</h1>
      </header>

      <div class="lesson-content">
        ${sectionsHtml}
      </div>

      <nav class="lesson-nav">
        ${prevMeta ? `
          <div class="lesson-nav-prev">
            <a href="#/lesson/${prevMeta.id}">
              <span class="lesson-nav-label">${icons.arrowLeft} ${t('nav.previous')}</span>
              <span class="lesson-nav-title">${prevMeta.id} ${escapeHtml(prevMeta.title || '')}</span>
            </a>
          </div>` : '<div></div>'}
        ${nextMeta ? `
          <div class="lesson-nav-next">
            <a href="#/lesson/${nextMeta.id}">
              <span class="lesson-nav-label">${t('nav.next')} ${icons.arrowRight}</span>
              <span class="lesson-nav-title">${nextMeta.id} ${escapeHtml(nextMeta.title || '')}</span>
            </a>
          </div>` : ''}
      </nav>
    </div>

    <div class="complete-bar">
      <p>${status === 'complete' ? t('complete.done') : t('complete.todo')}</p>
      <button class="btn btn-primary" id="mark-complete-btn">
        ${status === 'complete' ? `${icons.checkCircle} ${t('button.completed')}` : `${icons.check} ${t('button.markComplete')}`}
      </button>
    </div>
  `;
}

function renderSection(section) {
  switch (section.type) {
    case 'text':
      return `<div class="lesson-content">${DOMPurify.sanitize(marked.parse(section.content || ''))}</div>`;

    case 'callout': {
      const variant = section.variant || 'info';
      const iconMap = { tip: icons.sparkles, warning: icons.alertTriangle, danger: icons.alertTriangle, success: icons.checkCircle, info: icons.info };
      return `
        <div class="callout ${variant}">
          <span class="callout-icon">${iconMap[variant] || icons.info}</span>
          <div class="callout-body">${DOMPurify.sanitize(marked.parse(section.content || ''))}</div>
        </div>`;
    }

    case 'code':
      return `
        <div class="code-block">
          <div class="code-block-header">
            <span>${section.language || 'code'}</span>
            <button class="copy-btn" data-code="${encodeURIComponent(section.content || '')}">${icons.copy} ${t('copy.button')}</button>
          </div>
          <pre><code class="language-${section.language || 'plaintext'}">${escapeHtml(section.content || '')}</code></pre>
        </div>`;

    case 'workshop': {
      const tagIconMap = {
        BROWSER: icons.globe, VSCODE: icons.code2, TERMINAL: icons.terminal,
        CLAUDECODE: icons.zap, REFLECT: icons.bookOpen, BUILD: icons.wrench,
        API: icons.zap, LOCAL: icons.terminal,
      };
      const tag = (section.tag || 'WORKSHOP').toUpperCase();
      const tagIcon = tagIconMap[tag] || icons.zap;
      return `
        <div class="workshop">
          <div class="workshop-header">
            <div class="workshop-meta">
              <span class="workshop-label">${t('workshop.label')}</span>
              <span class="workshop-tag">${tagIcon} ${tag}</span>
            </div>
            <div class="workshop-title">${escapeHtml(section.title || '')}</div>
          </div>
          <div>${DOMPurify.sanitize(marked.parse(section.content || ''))}</div>
        </div>`;
    }

    case 'quiz':
      return `
        <div class="quiz" data-correct="${section.correct}">
          <p class="quiz-question">${escapeHtml(section.question || '')}</p>
          <div class="quiz-options">
            ${(section.options || []).map((opt, i) => `
              <button class="quiz-option" data-idx="${i}">${String.fromCharCode(65+i)}. ${escapeHtml(opt || '')}</button>
            `).join('')}
          </div>
          <div class="quiz-explanation">${escapeHtml(section.explanation || '')}</div>
        </div>`;

    case 'video':
      return `
        <div style="margin:var(--sp-6) 0">
          <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--border)">
            <iframe src="${escapeHtml(section.url || '')}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen loading="lazy"></iframe>
          </div>
          ${section.caption ? `<p style="margin-top:var(--sp-2);font-size:var(--text-sm);color:var(--text-faint);text-align:center">${escapeHtml(section.caption)}</p>` : ''}
        </div>`;

    case 'diagram': {
      const variant = section.variant || '';
      if (variant === 'ai-stack') return renderAiStack(section);
      if (variant === 'misconceptions') return renderMisconceptions(section);
      if (variant === 'roadmap') return renderRoadmap(section);
      return '';
    }

    default:
      return '';
  }
}

function renderAiStack(section) {
  const layers = (section.layers || []).slice().reverse();
  const rows = layers.map(l => `
    <div class="ai-stack-row" style="--layer-color:${escapeHtml(l.color || '#818cf8')}">
      <div class="ai-stack-num">${l.num}</div>
      <div class="ai-stack-body">
        <span class="ai-stack-term">${escapeHtml(l.term)}</span>
        <span class="ai-stack-sep">—</span>
        <span class="ai-stack-analogy">${escapeHtml(l.analogy)}</span>
        <span class="ai-stack-desc">${escapeHtml(l.desc)}</span>
      </div>
    </div>`).join('');
  return `
    <div class="diagram-section">
      ${section.title ? `<div class="diagram-title">${escapeHtml(section.title)}</div>` : ''}
      <div class="ai-stack">${rows}</div>
      ${section.caption ? `<div class="diagram-caption">${escapeHtml(section.caption)}</div>` : ''}
    </div>`;
}

function renderMisconceptions(section) {
  const cards = (section.items || []).map(item => `
    <div class="misconception-card">
      <div class="misconception-wrong">
        <span class="misconception-badge">${t('diagram.myth')}</span>
        <span class="misconception-text">${escapeHtml(item.myth)}</span>
      </div>
      <div class="misconception-right">
        <span class="misconception-badge">${t('diagram.reality')}</span>
        <span class="misconception-text">${escapeHtml(item.reality)}</span>
      </div>
    </div>`).join('');
  return `
    <div class="diagram-section">
      ${section.title ? `<div class="diagram-title">${escapeHtml(section.title)}</div>` : ''}
      <div class="misconception-grid">${cards}</div>
    </div>`;
}

function renderRoadmap(section) {
  const steps = (section.steps || []).map((step, i) => `
    <div class="roadmap-step" style="--step-color:${escapeHtml(step.color || '#818cf8')}">
      <div class="roadmap-step-num">${i + 1}</div>
      <div class="roadmap-step-level">${escapeHtml(step.level)}</div>
      <div class="roadmap-step-title">${escapeHtml(step.title)}</div>
      <div class="roadmap-step-layers">
        ${(step.layers || []).map(l => `<span class="roadmap-layer-tag">${escapeHtml(l)}</span>`).join('')}
      </div>
      <div class="roadmap-step-outcome">${escapeHtml(step.outcome)}</div>
    </div>`).join('');
  return `
    <div class="diagram-section">
      ${section.title ? `<div class="diagram-title">${escapeHtml(section.title)}</div>` : ''}
      <div class="learning-roadmap">${steps}</div>
      ${section.caption ? `<div class="diagram-caption">${escapeHtml(section.caption)}</div>` : ''}
    </div>`;
}

function buildComingSoon(meta) {
  return `
    <div id="scroll-progress"></div>
    <div class="lesson-page">
      <nav class="breadcrumb">
        <a href="#/">${t('breadcrumb.home')}</a>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <span>${t('part.label', { number: meta.partNumber })}</span>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <span>${escapeHtml(meta.title || '')}</span>
      </nav>
      <header class="lesson-header">
        <div class="lesson-header-meta">
          <span class="badge badge-accent">${t('part.label', { number: meta.partNumber })}</span>
          ${meta.estimatedMinutes ? `<span class="badge badge-muted">${icons.clock} ${formatMinutes(meta.estimatedMinutes)}</span>` : ''}
        </div>
        <h1 class="lesson-title">${escapeHtml(meta.title || '')}</h1>
      </header>
      <div class="callout info">
        <span class="callout-icon">${icons.info}</span>
        <div class="callout-body">
          <strong>${t('comingSoon.title')}</strong>
          <p>${t('comingSoon.body')}</p>
        </div>
      </div>
    </div>
  `;
}

function setupScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
  scrollHandler = () => {
    const el = document.documentElement;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) || 0;
    bar.style.transform = `scaleX(${pct})`;
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
}

function setupCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = decodeURIComponent(btn.dataset.code || '');
      navigator.clipboard.writeText(code).then(() => {
        btn.innerHTML = `${icons.check} ${t('copy.copied')}`;
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = `${icons.copy} ${t('copy.button')}`; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

function setupQuiz() {
  document.querySelectorAll('.quiz').forEach(quiz => {
    const correct = parseInt(quiz.dataset.correct, 10);
    const explanation = quiz.querySelector('.quiz-explanation');
    quiz.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quiz.dataset.answered) return;
        quiz.dataset.answered = '1';
        const idx = parseInt(btn.dataset.idx, 10);
        btn.classList.add(idx === correct ? 'correct' : 'incorrect');
        quiz.querySelectorAll('.quiz-option')[correct]?.classList.add('correct');
        if (explanation) explanation.classList.add('show');
      });
    });
  });
}

function setupMarkComplete(id, meta) {
  const btn = qs('#mark-complete-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = getLessonStatus(id);
    if (current === 'complete') {
      setLessonStatus(id, 'in-progress');
      btn.innerHTML = `${icons.check} ${t('button.markComplete')}`;
    } else {
      setLessonStatus(id, 'complete');
      btn.innerHTML = `${icons.checkCircle} ${t('button.completed')}`;
      if (meta.nextLesson) {
        setTimeout(() => navigate(`/lesson/${meta.nextLesson}`), 800);
      }
    }
  });
}
