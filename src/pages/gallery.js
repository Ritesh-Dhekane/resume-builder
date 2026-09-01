import { templates, loadTemplateStyles, MM_TO_PX } from '../templates/registry.js';
import { createPlaceholderResume } from '../state/resumeSchema.js';
import { navigate } from '../lib/router.js';

function fitThumbnail(thumb, pageWidthPx) {
  const inner = thumb.querySelector('.template-thumb-inner');
  inner.style.width = `${pageWidthPx}px`;
  inner.style.transform = `scale(${thumb.clientWidth / pageWidthPx})`;
}

export function mount(container) {
  container.innerHTML = `
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <h1 class="page-title">Template Gallery</h1>
      <p class="page-subtitle">Pick a template to start building your resume.</p>
      <div class="template-grid" id="template-grid"></div>
    </div>
  `;

  const grid = container.querySelector('#template-grid');
  const thumbs = [];

  templates.forEach((template) => {
    loadTemplateStyles(template);
    const placeholder = createPlaceholderResume(template.id);
    const pageWidthPx = template.pageWidthMm * MM_TO_PX;

    const card = document.createElement('div');
    card.className = 'card template-card';
    card.innerHTML = `
      <div class="template-thumb">
        <div class="template-thumb-inner">${template.render(placeholder)}</div>
      </div>
      <h3>${template.name}</h3>
      <p class="page-subtitle">${template.description}</p>
      <button type="button" class="btn btn-primary use-template">Use this template</button>
    `;
    card.querySelector('.use-template').addEventListener('click', () => {
      navigate(`/builder?template=${template.id}`);
    });
    grid.appendChild(card);

    const thumb = card.querySelector('.template-thumb');
    thumbs.push({ thumb, pageWidthPx });
    fitThumbnail(thumb, pageWidthPx);
  });

  function refitAll() {
    thumbs.forEach(({ thumb, pageWidthPx }) => fitThumbnail(thumb, pageWidthPx));
  }
  window.addEventListener('resize', refitAll);
  window.addEventListener('hashchange', () => window.removeEventListener('resize', refitAll), {
    once: true,
  });
}
