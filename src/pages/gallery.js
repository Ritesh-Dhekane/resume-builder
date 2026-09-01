import { templates } from '../templates/registry.js';
import { createPlaceholderResume } from '../state/resumeSchema.js';
import { navigate } from '../lib/router.js';

function ensureStylesLoaded(template) {
  const linkId = `template-style-${template.id}`;
  if (document.getElementById(linkId)) return;
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = template.styleUrl;
  document.head.appendChild(link);
}

export function mount(container) {
  container.innerHTML = `
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <h1 class="page-title">Template Gallery</h1>
      <p class="page-subtitle">Pick a template to start building your resume.</p>
      <div class="grid grid-2" id="template-grid"></div>
    </div>
  `;

  const grid = container.querySelector('#template-grid');

  templates.forEach((template) => {
    ensureStylesLoaded(template);
    const placeholder = createPlaceholderResume(template.id);

    const card = document.createElement('div');
    card.className = 'card template-card';
    card.innerHTML = `
      <div class="template-thumb"><div class="template-thumb-inner">${template.render(placeholder)}</div></div>
      <h3>${template.name}</h3>
      <p class="page-subtitle">${template.description}</p>
      <button type="button" class="btn btn-primary use-template">Use this template</button>
    `;
    card.querySelector('.use-template').addEventListener('click', () => {
      navigate(`/builder?template=${template.id}`);
    });
    grid.appendChild(card);
  });
}
