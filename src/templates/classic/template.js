// Classic: a traditional resume in the Harvard career-office style — serif, centred name and
// contact line, uppercase headings over a full rule, organisation in bold with the place on the
// right, the role in italics with the dates on the right. Black only, one column (ATS-friendly).
//
// Structure (what lib/paginate.js relies on): header elements, then one <section> per part, each
// an <h2> followed by entries that can be moved to the next page whole.

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

function education(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (e) => `
      <div class="entry">
        ${row(`<strong>${escapeHtml(e.institution)}</strong>`, escapeHtml(e.location), ghostCls)}
        ${row(`<em>${escapeHtml(e.degree)}</em>`, `<em>${escapeHtml(e.year)}</em>`, ghostCls)}
      </div>`
    )
    .join('');
}

function experience(list, ph, ghost) {
  const { rows, ghostCls } = sectionRows(list, ph, ghost);
  return rows
    .map(
      (j) => `
      <div class="entry">
        ${row(`<strong>${escapeHtml(j.employer)}</strong>`, escapeHtml(j.location), ghostCls)}
        ${row(`<em>${escapeHtml(j.title)}</em>`, `<em>${dateRange(j.start, j.end)}</em>`, ghostCls)}
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
        ${row(`<strong>${escapeHtml(p.title)}</strong>`, dateRange(p.start, p.end), ghostCls)}
        ${p.skills ? row(`<em>${escapeHtml(p.skills)}</em>`, '', ghostCls) : ''}
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
        `<p class="skill-line${ghostCls}"><strong>${escapeHtml(g.category)}${g.category && g.items ? ':' : ''}</strong> ${escapeHtml(g.items)}</p>`
    )
    .join('');
}

// `placeholder` is passed only by the builder's live preview: empty fields and sections then
// show its example content as `.placeholder-text`.
export function render(resume, placeholder) {
  const ghost = Boolean(placeholder);
  const ph = placeholder || {};
  const phPersonal = ph.personal || {};
  const { personal } = resume;
  const show = visibleSections(resume, ph, ghost);

  const sections = [
    show.summary &&
      `<section><h2>Summary</h2><p class="summary">${renderField(resume.summary, ph.summary, ghost)}</p></section>`,
    show.education && `<section><h2>Education</h2>${education(resume.education, ph.education, ghost)}</section>`,
    show.experience &&
      `<section><h2>Experience</h2>${experience(resume.experience, ph.experience, ghost)}</section>`,
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
    <div class="tpl-classic">
      <h1>${name}</h1>
      ${headline ? `<p class="headline">${headline}</p>` : ''}
      <p class="contact">${contact.join('<span class="sep">&bull;</span>')}</p>
      ${sections}
    </div>`;
}
