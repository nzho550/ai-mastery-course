import { icons } from './icons.js';
import { getLessonStatus, setLessonStatus, setLastVisited } from './progress.js';
import { setActiveLesson } from './sidebar.js';
import { navigate } from './router.js';
import { qs, formatMinutes } from './utils.js';

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
  if (!meta) { main.innerHTML = `<div class="lesson-page"><p style="color:var(--text-muted)">Lesson not found.</p></div>`; return; }

  setLastVisited(id);
  setActiveLesson(id);
  if (getLessonStatus(id) === 'not-started') setLessonStatus(id, 'in-progress');

  // Load lesson JSON
  let data;
  try {
    const res = await fetch(`data/lessons/part-${String(meta.partId).padStart(2,'0')}/${id}.json`);
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
  hljs.highlightAll();
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
        <a href="#/">Home</a>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <a href="#/">Part ${meta.partNumber}</a>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <span>${meta.title}</span>
      </nav>

      <header class="lesson-header">
        <div class="lesson-header-meta">
          <span class="badge badge-accent">Part ${meta.partNumber}</span>
          ${meta.estimatedMinutes ? `<span class="badge badge-muted">${icons.clock} ${formatMinutes(meta.estimatedMinutes)}</span>` : ''}
          ${status === 'complete' ? `<span class="badge badge-success">${icons.checkCircle} Complete</span>` : ''}
        </div>
        <h1 class="lesson-title">${data.title || meta.title}</h1>
      </header>

      <div class="lesson-content">
        ${sectionsHtml}
      </div>

      <nav class="lesson-nav">
        ${prevMeta ? `
          <div class="lesson-nav-prev">
            <a href="#/lesson/${prevMeta.id}">
              <span class="lesson-nav-label">${icons.arrowLeft} Previous</span>
              <span class="lesson-nav-title">${prevMeta.id} ${prevMeta.title}</span>
            </a>
          </div>` : '<div></div>'}
        ${nextMeta ? `
          <div class="lesson-nav-next">
            <a href="#/lesson/${nextMeta.id}">
              <span class="lesson-nav-label">Next ${icons.arrowRight}</span>
              <span class="lesson-nav-title">${nextMeta.id} ${nextMeta.title}</span>
            </a>
          </div>` : ''}
      </nav>
    </div>

    <div class="complete-bar">
      <p>${status === 'complete' ? 'You\'ve completed this lesson.' : 'When you\'re done with the workshop, mark this lesson complete.'}</p>
      <button class="btn btn-primary" id="mark-complete-btn">
        ${status === 'complete' ? `${icons.checkCircle} Completed` : `${icons.check} Mark Complete`}
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
            <button class="copy-btn" data-code="${encodeURIComponent(section.content || '')}">${icons.copy} Copy</button>
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
              <span class="workshop-label">Workshop</span>
              <span class="workshop-tag">${tagIcon} ${tag}</span>
            </div>
            <div class="workshop-title">${section.title || ''}</div>
          </div>
          <div>${DOMPurify.sanitize(marked.parse(section.content || ''))}</div>
        </div>`;
    }

    case 'quiz':
      return `
        <div class="quiz" data-correct="${section.correct}">
          <p class="quiz-question">${section.question}</p>
          <div class="quiz-options">
            ${(section.options || []).map((opt, i) => `
              <button class="quiz-option" data-idx="${i}">${String.fromCharCode(65+i)}. ${opt}</button>
            `).join('')}
          </div>
          <div class="quiz-explanation">${section.explanation || ''}</div>
        </div>`;

    case 'video':
      return `
        <div style="margin:var(--sp-6) 0">
          <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--border)">
            <iframe src="${section.url}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen loading="lazy"></iframe>
          </div>
          ${section.caption ? `<p style="margin-top:var(--sp-2);font-size:var(--text-sm);color:var(--text-faint);text-align:center">${section.caption}</p>` : ''}
        </div>`;

    default:
      return '';
  }
}

function buildComingSoon(meta) {
  return `
    <div id="scroll-progress"></div>
    <div class="lesson-page">
      <nav class="breadcrumb">
        <a href="#/">Home</a>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <span>Part ${meta.partNumber}</span>
        <span class="breadcrumb-sep">${icons.chevronRight}</span>
        <span>${meta.title}</span>
      </nav>
      <header class="lesson-header">
        <div class="lesson-header-meta">
          <span class="badge badge-accent">Part ${meta.partNumber}</span>
          ${meta.estimatedMinutes ? `<span class="badge badge-muted">${icons.clock} ${formatMinutes(meta.estimatedMinutes)}</span>` : ''}
        </div>
        <h1 class="lesson-title">${meta.title}</h1>
      </header>
      <div class="callout info">
        <span class="callout-icon">${icons.info}</span>
        <div class="callout-body">
          <strong>Content coming soon</strong>
          <p>This lesson's content is being written. Check back soon, or continue to the next lesson.</p>
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
        btn.innerHTML = `${icons.check} Copied!`;
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = `${icons.copy} Copy`; btn.classList.remove('copied'); }, 2000);
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
      btn.innerHTML = `${icons.check} Mark Complete`;
    } else {
      setLessonStatus(id, 'complete');
      btn.innerHTML = `${icons.checkCircle} Completed`;
      if (meta.nextLesson) {
        setTimeout(() => navigate(`/lesson/${meta.nextLesson}`), 800);
      }
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
