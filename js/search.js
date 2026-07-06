import { icons } from './icons.js';
import { navigate } from './router.js';
import { qs, debounce } from './utils.js';
import { t } from './i18n.js';

let fuse = null;

export function initSearch(curriculum) {
  const items = curriculum.parts.flatMap(part =>
    part.lessons.map(lesson => ({
      id:    lesson.id,
      title: lesson.title,
      part:  `${t('part.label', { number: part.number })}: ${part.title}`,
      tags:  (lesson.tags || []).join(' '),
    }))
  );

  fuse = new Fuse(items, {
    keys: ['title', 'tags', 'part'],
    threshold: 0.35,
    includeScore: true,
  });

  const input   = qs('#search-input');
  const results = qs('#search-results');
  if (!input || !results) return;

  let focusedIdx = -1;

  const doSearch = debounce(query => {
    if (!query.trim()) { results.classList.remove('open'); return; }
    const hits = fuse.search(query).slice(0, 8);
    if (!hits.length) {
      results.innerHTML = `<div style="padding:var(--sp-4);color:var(--text-faint);font-size:var(--text-sm)">${t('search.noResults')}</div>`;
    } else {
      results.innerHTML = hits.map((h, i) => `
        <a class="search-item" href="#/lesson/${h.item.id}" data-idx="${i}">
          <div class="search-item-title">${h.item.id} — ${h.item.title}</div>
          <div class="search-item-meta">${h.item.part}</div>
        </a>
      `).join('');
      results.querySelectorAll('.search-item').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          navigate(`/lesson/${a.getAttribute('href').replace('#/lesson/', '')}`);
          input.value = '';
          results.classList.remove('open');
        });
      });
    }
    focusedIdx = -1;
    results.classList.add('open');
  }, 200);

  input.addEventListener('input', e => doSearch(e.target.value));

  input.addEventListener('keydown', e => {
    const items = [...results.querySelectorAll('.search-item')];
    if (e.key === 'ArrowDown') { e.preventDefault(); focusedIdx = Math.min(focusedIdx + 1, items.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusedIdx = Math.max(focusedIdx - 1, 0); }
    else if (e.key === 'Enter' && focusedIdx >= 0) { items[focusedIdx]?.click(); return; }
    else if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); return; }
    items.forEach((item, i) => item.classList.toggle('focused', i === focusedIdx));
    items[focusedIdx]?.scrollIntoView({ block: 'nearest' });
  });

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault(); input.focus();
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#search-wrap')) results.classList.remove('open');
  });
}
