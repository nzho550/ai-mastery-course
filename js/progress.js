const KEY = 'ai-mastery-progress';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getProgress() { return load(); }

export function getLessonStatus(id) {
  return load()[id]?.status || 'not-started';
}

export function setLessonStatus(id, status) {
  const data = load();
  data[id] = { ...data[id], status };
  if (status === 'complete' && !data[id].completedAt) {
    data[id].completedAt = new Date().toISOString();
  }
  if (status === 'in-progress' && !data[id].startedAt) {
    data[id].startedAt = new Date().toISOString();
  }
  save(data);
  window.dispatchEvent(new CustomEvent('progress-change', { detail: { id, status } }));
}

export function getLastVisited() { return load().__lastVisited || null; }

export function setLastVisited(id) {
  const data = load();
  data.__lastVisited = id;
  save(data);
}

export function getTheme() { return load().__theme || 'auto'; }

export function setTheme(theme) {
  const data = load();
  data.__theme = theme;
  save(data);
}

export function resetProgress() {
  const data = load();
  const theme = data.__theme;
  localStorage.removeItem(KEY);
  if (theme) { const d = {}; d.__theme = theme; save(d); }
  window.dispatchEvent(new CustomEvent('progress-reset'));
}

export function getPartStats(curriculum) {
  const data = load();
  return curriculum.parts.map(part => {
    const total = part.lessons.length;
    const done  = part.lessons.filter(l => data[l.id]?.status === 'complete').length;
    return { partId: part.id, total, done, pct: total ? Math.round(done / total * 100) : 0 };
  });
}

export function getTotalStats(curriculum) {
  const data = load();
  const total = curriculum.parts.reduce((s, p) => s + p.lessons.length, 0);
  const done  = curriculum.parts.reduce((s, p) =>
    s + p.lessons.filter(l => data[l.id]?.status === 'complete').length, 0);
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}
