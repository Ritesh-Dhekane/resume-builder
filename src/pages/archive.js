import { isUnlocked, renderGate } from './auth.js';
import { fetchHistory, fetchGalleryManifest } from '../lib/api.js';

function esc(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function formatDate(iso) {
  if (!iso) return 'not saved yet';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function formatSize(bytes) {
  if (!bytes) return '';
  const kb = bytes / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
}

function renderDraftsList(history) {
  if (!history.length) {
    return '<p class="page-subtitle">No saved drafts yet. Hit Save in the builder to add one.</p>';
  }
  return `<div class="grid">${history
    .slice()
    .reverse()
    .map((entry) => {
      const label = entry.meta?.label || entry.personal?.name || 'Untitled';
      const roleTag = [entry.meta?.targetRole, entry.meta?.jobDescriptionTag].filter(Boolean).join(' · ');
      return `
      <div class="card">
        <strong>${esc(label)}</strong>
        <p class="page-subtitle">
          ${roleTag ? `${esc(roleTag)}<br>` : ''}
          Saved ${esc(formatDate(entry.meta?.savedAt))} &middot; Template: ${esc(entry.templateId)}
        </p>
        <a class="btn" href="#/builder?template=${encodeURIComponent(entry.templateId)}&draftId=${encodeURIComponent(entry.id)}">Open in builder</a>
      </div>`;
    })
    .join('')}</div>`;
}

function renderPdfList(manifest) {
  if (!manifest.length) {
    return '<p class="page-subtitle">No uploaded PDFs yet. Drop files into public/gallery and run <code>npm run gallery:manifest</code>.</p>';
  }
  return `<div class="grid">${manifest
    .map(
      (entry) => `
      <div class="card">
        <strong>${esc(entry.label)}</strong>
        <p class="page-subtitle">${esc(formatSize(entry.sizeBytes))} &middot; Added ${esc(formatDate(entry.modifiedAt))}</p>
        <a class="btn" href="${import.meta.env.BASE_URL}gallery/${encodeURIComponent(entry.filename)}" target="_blank" rel="noopener">Open PDF</a>
      </div>`
    )
    .join('')}</div>`;
}

async function renderContent(container) {
  container.innerHTML = `
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <h1 class="page-title">Resume Archive</h1>
      <p class="page-subtitle">Saved drafts and uploaded PDFs. Not linked from the public pages.</p>
      <div class="actions">
        <button type="button" class="btn btn-primary" data-tab="drafts">Saved Drafts</button>
        <button type="button" class="btn" data-tab="pdfs">Uploaded PDFs</button>
      </div>
      <div id="archive-panel"><p class="page-subtitle">Loading&hellip;</p></div>
    </div>
  `;

  const [history, manifest] = await Promise.all([fetchHistory(), fetchGalleryManifest()]);

  const panel = container.querySelector('#archive-panel');
  const tabs = container.querySelectorAll('[data-tab]');

  function showTab(tab) {
    tabs.forEach((btn) => btn.classList.toggle('btn-primary', btn.dataset.tab === tab));
    panel.innerHTML = tab === 'drafts' ? renderDraftsList(history) : renderPdfList(manifest);
  }

  tabs.forEach((btn) => btn.addEventListener('click', () => showTab(btn.dataset.tab)));
  showTab('drafts');
}

export function mount(container) {
  if (isUnlocked()) {
    renderContent(container);
    return;
  }
  renderGate(container, () => renderContent(container));
}
