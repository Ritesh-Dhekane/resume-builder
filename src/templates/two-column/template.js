// Two-Column: in the spirit of AltaCV — a header with the name, an accent-coloured headline and
// contact details, then a main column (summary, experience, projects) and a sidebar (skills as
// tags, education).
//
// Structure (lib/paginate.js, "sidebar" layout): <header>, then <div class="cols"> holding
// <main class="col-main"> and <aside class="col-side">, each a list of <section>s (<h2> + entries).
// The header and sidebar stay on page one; the main column flows across pages.

import {
  contactParts,
  dateRange,
  escapeHtml,
  renderBullets,
  renderField,
  sectionRows,
  visibleSections,
} from '../shared.js';

function experience(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (j) => `
      <div class="entry">
        <div class="title${ghostCls}">${escapeHtml(j.title)}</div>
        <div class="org${ghostCls}">${escapeHtml(j.employer)}</div>
        <div class="meta${ghostCls}"><span>${dateRange(j.start, j.end)}</span>${j.location ? `<span>${escapeHtml(j.location)}</span>` : ''}</div>
        ${renderBullets(j.bullets, ghostCls.trim())}
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
        <div class="title${ghostCls}">${escapeHtml(p.title)}</div>
        <div class="meta${ghostCls}"><span>${dateRange(p.start, p.end)}</span>${p.skills ? `<span>${escapeHtml(p.skills)}</span>` : ''}</div>
        ${renderBullets(p.bullets, ghostCls.trim())}
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
        <div class="title${ghostCls}">${escapeHtml(e.degree)}</div>
        <div class="org${ghostCls}">${escapeHtml(e.institution)}</div>
        <div class="meta${ghostCls}"><span>${escapeHtml(e.year)}</span>${e.location ? `<span>${escapeHtml(e.location)}</span>` : ''}</div>
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
    .map((g) => {
      const tags = String(g.items || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join('');
      return `<div class="skill-group${ghostCls}">${g.category ? `<h3>${escapeHtml(g.category)}</h3>` : ''}<div class="tags">${tags}</div></div>`;
    })
    .join('');
}

export function render(resume, placeholder) {
  const ghost = Boolean(placeholder);
  const ph = placeholder || {};
  const phPersonal = ph.personal || {};
  const { personal } = resume;
  const show = visibleSections(resume, ph, ghost);

  const main = [
    show.summary &&
      `<section><h2>Summary</h2><p class="summary">${renderField(resume.summary, ph.summary, ghost)}</p></section>`,
    show.experience && `<section><h2>Experience</h2>${experience(resume.experience, ph.experience, ghost)}</section>`,
    show.projects && `<section><h2>Projects</h2>${projects(resume.projects, ph.projects, ghost)}</section>`,
  ]
    .filter(Boolean)
    .join('');
  const side = [
    show.skills && `<section><h2>Skills</h2>${skills(resume.skills, ph.skills, ghost)}</section>`,
    show.education && `<section><h2>Education</h2>${education(resume.education, ph.education, ghost)}</section>`,
  ]
    .filter(Boolean)
    .join('');

  const name = ghost
    ? renderField(personal.name, phPersonal.name || 'Name Surname', true)
    : escapeHtml(personal.name || 'Name Surname');
  const headline = renderField(personal.title, phPersonal.title, ghost);
  const contact = contactParts(personal, phPersonal, ghost, [
    'email',
    'phone',
    'location',
    'linkedin',
    'website',
  ]);

  return `
    <div class="tpl-twocol">
      <header>
        <h1>${name}</h1>
        ${headline ? `<p class="headline">${headline}</p>` : ''}
        <p class="contact">${contact.map((c) => `<span class="item">${c}</span>`).join('')}</p>
      </header>
      <div class="cols">
        <main class="col-main">${main}</main>
        <aside class="col-side">${side}</aside>
      </div>
    </div>`;
}
