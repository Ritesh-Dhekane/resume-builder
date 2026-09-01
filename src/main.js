import { getPath, getQuery } from './lib/router.js';
import { mount as mountGallery } from './pages/gallery.js';
import { mount as mountBuilder } from './pages/builder.js';
import { mount as mountArchive } from './pages/archive.js';

const routes = {
  '/': mountGallery,
  '/builder': mountBuilder,
  '/archive': mountArchive,
};

const app = document.getElementById('app');

function render() {
  const mountPage = routes[getPath()] || mountGallery;
  app.innerHTML = '';
  mountPage(app, getQuery());
}

window.addEventListener('hashchange', render);
render();
