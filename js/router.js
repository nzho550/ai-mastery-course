const listeners = [];

export function getRoute() {
  const hash = location.hash.slice(1) || '/';
  return hash;
}

export function navigate(path) {
  location.hash = path;
}

export function onRouteChange(fn) {
  listeners.push(fn);
}

window.addEventListener('hashchange', () => {
  const route = getRoute();
  listeners.forEach(fn => fn(route));
});

// Fire on initial load
window.addEventListener('DOMContentLoaded', () => {
  const route = getRoute();
  listeners.forEach(fn => fn(route));
});
