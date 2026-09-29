import { getPath, getQuery } from './lib/router.js';
import { mount as mountGallery } from './pages/gallery.js';
import { mount as mountBuilder } from './pages/builder.js';

const routes = {
  '/': mountGallery,
  '/builder': mountBuilder,
};

// The archive (saved drafts + uploaded PDFs) is a local, dev-only workspace; it's
// left out of production builds entirely.
if (import.meta.env.DEV) {
  routes['/archive'] = (container, query) =>
    import('./pages/archive.js').then((page) => page.mount(container, query));
}

const app = document.getElementById('app');

function render() {
  const mountPage = routes[getPath()] || mountGallery;
  app.innerHTML = '';
  mountPage(app, getQuery());
}

window.addEventListener('hashchange', render);
render();
