import { icons } from './icons.js';
import { getLessonStatus } from './progress.js';
import { navigate } from './router.js';
import { qs } from './utils.js';
import { t } from './i18n.js';

let curriculum = null;
let currentId  = null;

export function initSidebar(curriculumData) {
  curriculum = curriculumData;
  render();

  // Update status icons when progress changes
  window.addEventListener('progress-change', ({ detail }) => {
    updateLessonIcon(detail.id, detail.status);
  });
}

export function setActiveLesson(id) {
  currentId = id;
  // Remove old active
  document.querySelectorAll('.lesson-link.active').forEach(el => el.classList.remove('active'));
  // Set new active
  const link = document.querySelector(`.lesson-link[data-id="${id}"]`);
  if (link) {
    link.classList.add('active');
    // Expand part if collapsed
    const partLessons = link.closest('.part-lessons');
    if (partLessons?.classList.contains('collapsed')) {
      partLessons.classList.remove('collapsed');
      partLessons.previousElementSibling?.classList.remove('collapsed');
    }
    // Scroll into view
    link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function statusIcon(status) {
  if (status === 'complete')    return `<span class="lesson-status complete" title="${t('lessonStatus.complete')}">${icons.check}</span>`;
  if (status === 'in-progress') return `<span class="lesson-status progress" title="${t('lessonStatus.inProgress')}">${icons.halfCircle}</span>`;
  return `<span class="lesson-status" title="${t('lessonStatus.notStarted')}">${icons.circle}</span>`;
}

function updateLessonIcon(id, status) {
  const link = document.querySelector(`.lesson-link[data-id="${id}"]`);
  if (!link) return;
  const existing = link.querySelector('.lesson-status');
  if (existing) existing.outerHTML = statusIcon(status);
}

function render() {
  const sidebar = qs('#sidebar');
  if (!sidebar || !curriculum) return;

  const nav = document.createElement('nav');
  nav.className = 'sidebar-section';

  curriculum.parts.forEach((part, idx) => {
    const isFirst = idx === 0;

    // Part header
    const header = document.createElement('div');
    header.className = 'part-header';
    header.innerHTML = `
      <span>${t('part.label', { number: part.number })} — ${part.title}</span>
      <span class="chevron">${icons.chevronDown}</span>
    `;
    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      lessons.classList.toggle('collapsed');
    });

    // Lessons list
    const lessons = document.createElement('div');
    lessons.className = 'part-lessons';
    if (!isFirst) {
      header.classList.add('collapsed');
      lessons.classList.add('collapsed');
    }

    part.lessons.forEach(lesson => {
      const status = getLessonStatus(lesson.id);
      const link = document.createElement('a');
      link.className = 'lesson-link';
      link.href = `#/lesson/${lesson.id}`;
      link.dataset.id = lesson.id;
      link.innerHTML = `
        ${statusIcon(status)}
        <span>${lesson.id} ${lesson.title}</span>
      `;
      link.addEventListener('click', e => {
        e.preventDefault();
        navigate(`/lesson/${lesson.id}`);
      });
      lessons.appendChild(link);
    });

    nav.appendChild(header);
    nav.appendChild(lessons);
  });

  sidebar.innerHTML = '';
  sidebar.appendChild(nav);
}
