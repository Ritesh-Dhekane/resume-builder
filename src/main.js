import { getPath, getQuery } from './lib/router.js';
import { initAnalytics, trackPageView } from './lib/analytics.js';
import { mount as mountGallery } from './pages/gallery.js';
import { mount as mountBuilder } from './pages/builder.js';

const routes = {
  '/': mountGallery,
  '/builder': mountBuilder,
};

const PAGE_TITLES = {
  '/': 'Templates',
  '/builder': 'Builder',
  '/archive': 'Archive',
};

// The archive (saved drafts + uploaded PDFs) is a local, dev-only workspace; it's
// left out of production builds entirely.
if (import.meta.env.DEV) {
  routes['/archive'] = (container, query) =>
    import('./pages/archive.js').then((page) => page.mount(container, query));
}

const app = document.getElementById('app');

function render() {
  const path = routes[getPath()] ? getPath() : '/';
  app.innerHTML = '';
  routes[path](app, getQuery());
  trackPageView(path, PAGE_TITLES[path]);
}

initAnalytics();
window.addEventListener('hashchange', render);
render();
