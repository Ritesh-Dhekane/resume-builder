// Minimal: in the spirit of the Google Docs "Swiss" and "Spearmint" templates — left-aligned,
// a large light name, small letter-spaced headings in a green accent with no rules, lots of white
// space and muted dates. One column.
//
// Structure (lib/paginate.js): a <header>, then one <section> per part (<h2> + entries).

import {
  contactParts,
  dateRange,
  escapeHtml,
  renderBullets,
  renderField,
  sectionRows,
  visibleSections,
} from '../shared.js';

function row(left, right, cls = '') {
  return `<div class="row${cls}"><span class="l">${left}</span><span class="r">${right}</span></div>`;
}

const comma = (...parts) => parts.map((p) => String(p ?? '').trim()).filter(Boolean).map(escapeHtml).join(', ');

function experience(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (j) => `
      <div class="entry">
        ${row(`<strong>${escapeHtml(j.title)}</strong>${j.employer ? `, ${escapeHtml(j.employer)}` : ''}`, `<span class="muted">${dateRange(j.start, j.end)}</span>`, ghostCls)}
        ${j.location ? `<div class="muted small${ghostCls}">${escapeHtml(j.location)}</div>` : ''}
        ${renderBullets(j.bullets, ghostCls.trim())}
      </div>`
    )
    .join('');
}

function education(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (e) => `
      <div class="entry">
        ${row(`<strong>${escapeHtml(e.degree)}</strong>`, `<span class="muted">${escapeHtml(e.year)}</span>`, ghostCls)}
        <div class="muted small${ghostCls}">${comma(e.institution, e.location)}</div>
      </div>`
    )
    .join('');
}

function projects(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (p) => `
      <div class="entry">
        ${row(`<strong>${escapeHtml(p.title)}</strong>`, `<span class="muted">${dateRange(p.start, p.end)}</span>`, ghostCls)}
        ${p.skills ? `<div class="muted small${ghostCls}">${escapeHtml(p.skills)}</div>` : ''}
        ${renderBullets(p.bullets, ghostCls.trim())}
      </div>`
    )
    .join('');
}

function skills(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(
    (list || []).filter((g) => g.category || g.items),
    ph,
    ghost
  );
  return rows
    .map(
      (g) =>
        `<p class="skill-line${ghostCls}"><span class="cat">${escapeHtml(g.category)}</span>${escapeHtml(g.items)}</p>`
    )
    .join('');
}

export function render(resume, placeholder) {
  const ghost = Boolean(placeholder);
  const ph = placeholder || {};
  const phPersonal = ph.personal || {};
  const { personal } = resume;
  const show = visibleSections(resume, ph, ghost);

  const sections = [
    show.summary &&
      `<section><h2>Summary</h2><p class="summary">${renderField(resume.summary, ph.summary, ghost)}</p></section>`,
    show.experience && `<section><h2>Experience</h2>${experience(resume.experience, ph.experience, ghost)}</section>`,
    show.education && `<section><h2>Education</h2>${education(resume.education, ph.education, ghost)}</section>`,
    show.projects && `<section><h2>Projects</h2>${projects(resume.projects, ph.projects, ghost)}</section>`,
    show.skills && `<section><h2>Skills</h2>${skills(resume.skills, ph.skills, ghost)}</section>`,
  ]
    .filter(Boolean)
    .join('');

  const name = ghost
    ? renderField(personal.name, phPersonal.name || 'Name Surname', true)
    : escapeHtml(personal.name || 'Name Surname');
  const headline = renderField(personal.title, phPersonal.title, ghost);
  const contact = contactParts(personal, phPersonal, ghost, [
    'location',
    'phone',
    'email',
    'linkedin',
    'website',
  ]);

  return `
    <div class="tpl-minimal">
      <header>
        <h1>${name}</h1>
        ${headline ? `<p class="headline">${headline}</p>` : ''}
        <p class="contact">${contact.join('<span class="sep">&middot;</span>')}</p>
      </header>
      ${sections}
    </div>`;
}
