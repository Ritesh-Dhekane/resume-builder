// Light/dark theme for the app (not the resumes — those are always white paper). The choice is
// remembered in localStorage; until someone picks, it follows the system setting. index.html
// applies the saved theme before first paint so the page never flashes the wrong one.

const KEY = 'resume-builder:theme';
const media = window.matchMedia('(prefers-color-scheme: dark)');

function saved() {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function currentTheme() {
  return saved() || (media.matches ? 'dark' : 'light');
}

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('.theme-toggle').forEach(updateButton);
}

function setTheme(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Storage blocked: the theme still changes for this visit.
  }
  apply(theme);
}

// Follow the system setting while nothing has been picked.
media.addEventListener('change', () => {
  if (!saved()) apply(currentTheme());
});

const SUN =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const MOON =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

function updateButton(button) {
  const dark = currentTheme() === 'dark';
  // Show what you'd switch to.
  button.innerHTML = dark ? SUN : MOON;
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme';
  button.setAttribute('aria-label', label);
  button.title = label;
}

// Adds the toggle to the page's top bar (pages render their own; this runs after each render).
export function addThemeToggle(root) {
  const topbar = root.querySelector('.topbar');
  if (!topbar || topbar.querySelector('.theme-toggle')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  button.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  updateButton(button);
  topbar.appendChild(button);
}

apply(currentTheme());
