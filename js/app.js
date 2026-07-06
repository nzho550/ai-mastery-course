import { icons } from './icons.js';
import { onRouteChange, navigate, getRoute } from './router.js';
import { initSidebar, setActiveLesson } from './sidebar.js';
import { initLesson, renderLesson } from './lesson.js';
import { initSearch } from './search.js';
import { getProgress, getTotalStats, getPartStats, getLastVisited, getTheme, setTheme } from './progress.js';
import { qs } from './utils.js';
import { t, getLang, setLang, otherLang, curriculumPath } from './i18n.js';

let curriculum = null;

async function boot() {
  // Apply saved theme immediately
  applyTheme(getTheme());
  applyStaticStrings();

  // Inject header icons
  const logoIcon = qs('.logo-icon');
  if (logoIcon) logoIcon.innerHTML = icons.sparkles;
  const searchIcon = qs('.search-icon');
  if (searchIcon) searchIcon.innerHTML = icons.search;
  const menuBtn = qs('#sidebar-toggle');
  if (menuBtn) menuBtn.innerHTML = icons.menu;

  // Load curriculum
  try {
    const res = await fetch(curriculumPath());
    curriculum = await res.json();
  } catch (e) {
    document.body.innerHTML = `<div style="padding:2rem;color:#f87171">Failed to load curriculum: ${e.message}</div>`;
    return;
  }

  initSidebar(curriculum);
  initLesson(curriculum);
  initSearch(curriculum);

  // Route handler — register first, then fire for the current URL
  onRouteChange(handleRoute);
  handleRoute(getRoute());

  // Theme toggle
  const themeBtn = qs('#theme-toggle');
  if (themeBtn) {
    updateThemeIcon(themeBtn);
    themeBtn.addEventListener('click', () => {
      const current = getTheme();
      const next = current === 'dark' ? 'light' : current === 'light' ? 'auto' : 'dark';
      setTheme(next);
      applyTheme(next);
      updateThemeIcon(themeBtn);
    });
  }

  // Language toggle
  const langBtn = qs('#lang-toggle');
  if (langBtn) {
    updateLangButton(langBtn);
    langBtn.addEventListener('click', () => {
      setLang(otherLang());
      location.reload();
    });
  }

  // Sidebar toggle (mobile)
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      qs('#sidebar')?.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#sidebar') && !e.target.closest('#sidebar-toggle')) {
        qs('#sidebar')?.classList.remove('open');
      }
    });
  }
}

function applyStaticStrings() {
  document.documentElement.lang = getLang();
  document.title = t('meta.title');
  const logoText = qs('.logo-text');
  if (logoText) logoText.textContent = t('header.logo');
  const searchInput = qs('#search-input');
  if (searchInput) searchInput.placeholder = t('header.searchPlaceholder');
  const sidebarToggle = qs('#sidebar-toggle');
  if (sidebarToggle) sidebarToggle.setAttribute('aria-label', t('header.toggleSidebar'));
  const themeToggle = qs('#theme-toggle');
  if (themeToggle) themeToggle.setAttribute('aria-label', t('header.toggleTheme'));
  const langToggle = qs('#lang-toggle');
  if (langToggle) langToggle.setAttribute('aria-label', t('header.toggleLang'));
}

function updateLangButton(btn) {
  btn.textContent = t('header.langLabel');
  btn.title = t('header.toggleLang');
}

function handleRoute(route) {
  const lessonMatch = route.match(/^\/lesson\/(.+)$/);
  if (lessonMatch) {
    renderLesson(lessonMatch[1]);
  } else {
    renderDashboard();
  }
}

function renderDashboard() {
  const main = qs('#main');
  if (!main || !curriculum) return;

  const totalStats = getTotalStats(curriculum);
  const partStats  = getPartStats(curriculum);
  const lastVisited = getLastVisited();
  const lastMeta    = lastVisited ? findLesson(lastVisited) : null;

  const resumeHtml = lastMeta ? `
    <a href="#/lesson/${lastMeta.id}" class="btn btn-primary">
      ${icons.arrowRight} ${t('action.resume')}: ${lastMeta.id} ${lastMeta.title}
    </a>` : `
    <a href="#/lesson/1-1" class="btn btn-primary">
      ${icons.zap} ${t('action.startLearning')}
    </a>`;

  main.innerHTML = `
    <section class="hero">
      <h1>${t('hero.title.pre')}<span>${t('hero.title.highlight')}</span>${t('hero.title.post')}</h1>
      <p>${t('hero.subtitle', { parts: curriculum.parts.length, lessons: totalStats.total })}</p>
      <div class="stats-row">
        <div class="stat"><span class="stat-value">${totalStats.done}</span><span class="stat-label">${t('stat.lessonsDone')}</span></div>
        <div class="stat"><span class="stat-value">${totalStats.pct}%</span><span class="stat-label">${t('stat.complete')}</span></div>
        <div class="stat"><span class="stat-value">${totalStats.total}</span><span class="stat-label">${t('stat.totalLessons')}</span></div>
        <div class="stat"><span class="stat-value">${curriculum.parts.length}</span><span class="stat-label">${t('stat.parts')}</span></div>
      </div>
      <div class="hero-actions">
        ${resumeHtml}
        <a href="#/lesson/1-1" class="btn btn-ghost">${icons.bookOpen} ${t('action.browseCurriculum')}</a>
      </div>
    </section>

    <div style="padding:var(--sp-8)">
      ${totalStats.done > 0 ? `
        <div style="margin-bottom:var(--sp-8)">
          <div class="section-heading">${t('progress.overall')}</div>
          <div class="progress-bar" style="height:8px">
            <div class="progress-bar-fill" style="width:${totalStats.pct}%"></div>
          </div>
          <div style="font-size:var(--text-sm);color:var(--text-muted);margin-top:var(--sp-2)">${t('progress.lessonsComplete', { done: totalStats.done, total: totalStats.total })}</div>
        </div>` : ''}

      <div class="section-heading">${t('section.courseParts')}</div>
      <div class="card-grid">
        ${curriculum.parts.map((part, i) => {
          const stats = partStats[i];
          return `
            <a class="part-card" href="#/lesson/${part.lessons[0].id}">
              <div class="part-card-header">
                <span class="part-number">${t('part.label', { number: part.number })}</span>
                <h3>${part.title}</h3>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill" style="width:${stats.pct}%"></div>
              </div>
              <div class="part-card-meta">
                <span>${icons.bookOpen} ${t('part.lessonsCount', { count: part.lessons.length })}</span>
                <span>${icons.checkCircle} ${stats.done}/${stats.total}</span>
              </div>
            </a>`;
        }).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.part-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const href = card.getAttribute('href').replace('#', '');
      navigate(href);
    });
  });

  // Reset active sidebar item
  document.querySelectorAll('.lesson-link.active').forEach(el => el.classList.remove('active'));
}

function findLesson(id) {
  for (const part of curriculum.parts) {
    const lesson = part.lessons.find(l => l.id === id);
    if (lesson) return { ...lesson, partId: part.id, partNumber: part.number };
  }
  return null;
}

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove('theme-dark', 'theme-light');
  if (theme === 'dark')  body.classList.add('theme-dark');
  if (theme === 'light') body.classList.add('theme-light');
}

function updateThemeIcon(btn) {
  const theme = getTheme();
  btn.innerHTML = theme === 'light' ? icons.sun : theme === 'dark' ? icons.moon : icons.sun;
  btn.title = `${t('theme.label')}: ${theme}`;
}

boot();
