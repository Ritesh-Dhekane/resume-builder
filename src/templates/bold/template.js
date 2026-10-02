// Bold: in the spirit of Awesome-CV — a big centred name (first name light, last name bold), the
// headline and separators in a red accent, section titles whose first letters are red with a rule
// running to the edge, and skills as a two-column table. One column.
//
// Structure (lib/paginate.js): a <header>, then one <section> per part (<h2> + entries).

import {
  contactParts,
  dateRange,
  escapeHtml,
  renderBullets,
  renderField,
  sectionRows,
  splitName,
  visibleSections,
} from '../shared.js';

function heading(title) {
  return `<h2><span class="lead">${escapeHtml(title.slice(0, 3))}</span>${escapeHtml(title.slice(3))}<span class="rule"></span></h2>`;
}

function row(left, right, cls = '') {
  return `<div class="row${cls}"><span class="l">${left}</span><span class="r">${right}</span></div>`;
}

function experience(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (j) => `
      <div class="entry">
        ${row(`<strong>${escapeHtml(j.title)}</strong>`, `<span class="place">${escapeHtml(j.location)}</span>`, ghostCls)}
        ${row(`<span class="org">${escapeHtml(j.employer)}</span>`, `<span class="date">${dateRange(j.start, j.end)}</span>`, ghostCls)}
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
        ${row(`<strong>${escapeHtml(e.degree)}</strong>`, `<span class="place">${escapeHtml(e.location)}</span>`, ghostCls)}
        ${row(`<span class="org">${escapeHtml(e.institution)}</span>`, `<span class="date">${escapeHtml(e.year)}</span>`, ghostCls)}
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
        ${row(`<strong>${escapeHtml(p.title)}</strong>`, `<span class="date">${dateRange(p.start, p.end)}</span>`, ghostCls)}
        ${p.skills ? row(`<span class="org">${escapeHtml(p.skills)}</span>`, '', ghostCls) : ''}
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
        `<div class="skill${ghostCls}"><span class="cat">${escapeHtml(g.category)}</span><span class="items">${escapeHtml(g.items)}</span></div>`
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
      `<section>${heading('Summary')}<p class="summary">${renderField(resume.summary, ph.summary, ghost)}</p></section>`,
    show.experience && `<section>${heading('Experience')}${experience(resume.experience, ph.experience, ghost)}</section>`,
    show.education && `<section>${heading('Education')}${education(resume.education, ph.education, ghost)}</section>`,
    show.projects && `<section>${heading('Projects')}${projects(resume.projects, ph.projects, ghost)}</section>`,
    show.skills && `<section>${heading('Skills')}${skills(resume.skills, ph.skills, ghost)}</section>`,
  ]
    .filter(Boolean)
    .join('');

  const realName = String(personal.name || '').trim();
  const useGhostName = ghost && !realName;
  const { first, last } = splitName(realName || phPersonal.name || 'Name Surname');
  const nameHtml = `<span class="first">${escapeHtml(first)}</span>${last ? ` <span class="last">${escapeHtml(last)}</span>` : ''}`;
  const headline = renderField(personal.title, phPersonal.title, ghost);
  const contact = contactParts(personal, phPersonal, ghost, [
    'location',
    'phone',
    'email',
    'linkedin',
    'website',
  ]);

  return `
    <div class="tpl-bold">
      <header>
        <h1${useGhostName ? ' class="placeholder-text"' : ''}>${nameHtml}</h1>
        ${headline ? `<p class="headline">${headline}</p>` : ''}
        <p class="contact">${contact.join('<span class="sep">|</span>')}</p>
      </header>
      ${sections}
    </div>`;
}
