import { templates, loadTemplateStyles, MM_TO_PX } from '../templates/registry.js';
import { createPlaceholderResume } from '../state/resumeSchema.js';
import { navigate } from '../lib/router.js';

function fitThumbnail(thumb, pageWidthPx) {
  const inner = thumb.querySelector('.template-thumb-inner');
  inner.style.width = `${pageWidthPx}px`;
  inner.style.transform = `scale(${thumb.clientWidth / pageWidthPx})`;
}

// Scales down (never up) to fit the modal body's width — on a narrow
// (mobile) viewport the modal is much narrower than the resume's true
// 210mm width, and without this the template's own CSS (fixed-width rows,
// justify-content:space-between) reflows badly instead of just shrinking.
function fitModalPreview(outer, inner, pageWidthPx) {
  const scale = Math.min(1, outer.clientWidth / pageWidthPx);
  inner.style.transformOrigin = 'top left';
  inner.style.width = `${pageWidthPx}px`;
  inner.style.transform = `scale(${scale})`;
  const page = inner.firstElementChild;
  outer.style.height = page ? `${page.offsetHeight * scale}px` : '';
}

function openPreviewModal(template, placeholder) {
  const pageWidthPx = template.pageWidthMm * MM_TO_PX;
  const backdrop = document.createElement('div');
  backdrop.className = 'preview-modal-backdrop';
  backdrop.innerHTML = `
    <div class="preview-modal">
      <div class="preview-modal-header">
        <h3>${template.name} &mdash; full preview</h3>
        <div class="actions" style="margin:0;">
          <button type="button" class="btn btn-primary" id="preview-use-btn">Use this template</button>
          <button type="button" class="btn" id="preview-close-btn">Close</button>
        </div>
      </div>
      <div class="preview-modal-body">
        <div class="preview-scale-outer" id="modal-scale-outer">
          <div class="preview-frame" id="modal-scale-inner">${template.render(placeholder)}</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const outer = backdrop.querySelector('#modal-scale-outer');
  const inner = backdrop.querySelector('#modal-scale-inner');
  function refit() {
    fitModalPreview(outer, inner, pageWidthPx);
  }
  refit();
  window.addEventListener('resize', refit);

  function close() {
    backdrop.remove();
    window.removeEventListener('resize', refit);
    document.removeEventListener('keydown', onKeydown);
  }
  function onKeydown(event) {
    if (event.key === 'Escape') close();
  }

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) close();
  });
  backdrop.querySelector('#preview-close-btn').addEventListener('click', close);
  backdrop.querySelector('#preview-use-btn').addEventListener('click', () => {
    close();
    navigate(`/builder?template=${template.id}`);
  });
  document.addEventListener('keydown', onKeydown);
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
      <div class="actions" style="margin:0;">
        <button type="button" class="btn preview-template">Preview</button>
        <button type="button" class="btn btn-primary use-template">Use this template</button>
      </div>
    `;
    card.querySelector('.use-template').addEventListener('click', () => {
      navigate(`/builder?template=${template.id}`);
    });
    card.querySelector('.preview-template').addEventListener('click', () => {
      openPreviewModal(template, placeholder);
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
