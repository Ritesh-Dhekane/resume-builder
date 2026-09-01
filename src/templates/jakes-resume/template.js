function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmpty(value) {
  return !value || !String(value).trim();
}

// Renders `real` if present; otherwise, in ghost mode, renders `placeholderVal`
// wrapped so it can be styled as an example rather than the user's content.
function renderField(real, placeholderVal, ghost) {
  if (!isEmpty(real)) return escapeHtml(real);
  if (ghost && !isEmpty(placeholderVal)) {
    return `<span class="placeholder-text">${escapeHtml(placeholderVal)}</span>`;
  }
  return '';
}

function renderBullets(bullets, ghostCls = '') {
  const items = (bullets || []).filter((b) => b && b.trim());
  if (!items.length) return '';
  const cls = ghostCls ? ` class="${ghostCls}"` : '';
  return `<ul${cls}>${items.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`;
}

function renderContactLine(personal, placeholderPersonal, ghost) {
  if (!ghost) {
    const parts = [personal.phone, personal.email, personal.linkedin, personal.website].filter(
      (p) => p && p.trim()
    );
    return escapeHtml(parts.join(' | '));
  }
  return ['phone', 'email', 'linkedin', 'website']
    .map((key) => renderField(personal[key], placeholderPersonal[key], true))
    .join(' | ');
}

function renderEducation(education, placeholderEducation, ghost) {
  const useGhost = ghost && !education?.length;
  const rows = useGhost ? placeholderEducation || [] : education || [];
  const ghostCls = useGhost ? ' placeholder-text' : '';
  return rows
    .map(
      (edu) => `
      <div class="row${ghostCls}">
        <strong>${escapeHtml(edu.degree)}</strong>
        <strong>${escapeHtml(edu.year)}</strong>
      </div>
      <div class="row muted${ghostCls}">
        <span>${escapeHtml(edu.institution)}</span>
        <span>${escapeHtml(edu.location)}</span>
      </div>`
    )
    .join('');
}

function renderExperience(experience, placeholderExperience, ghost) {
  const useGhost = ghost && !experience?.length;
  const rows = useGhost ? placeholderExperience || [] : experience || [];
  const ghostCls = useGhost ? ' placeholder-text' : '';
  return rows
    .map(
      (job) => `
      <div class="row${ghostCls}">
        <strong>${escapeHtml(job.title)}</strong>
        <strong>${escapeHtml(job.start)} &ndash; ${escapeHtml(job.end)}</strong>
      </div>
      <div class="row muted${ghostCls}">
        <span>${escapeHtml(job.employer)}</span>
        <span>${escapeHtml(job.location)}</span>
      </div>
      ${renderBullets(job.bullets, ghostCls.trim())}`
    )
    .join('');
}

function renderProjects(projects, placeholderProjects, ghost) {
  const useGhost = ghost && !projects?.length;
  const rows = useGhost ? placeholderProjects || [] : projects || [];
  const ghostCls = useGhost ? ' placeholder-text' : '';
  return rows
    .map(
      (proj) => `
      <div class="row${ghostCls}">
        <strong>${escapeHtml(proj.title)}${proj.skills ? ` | ${escapeHtml(proj.skills)}` : ''}</strong>
        <strong>${escapeHtml(proj.start)} &ndash; ${escapeHtml(proj.end)}</strong>
      </div>
      ${renderBullets(proj.bullets, ghostCls.trim())}`
    )
    .join('');
}

function renderSkills(skills, placeholderSkills, ghost) {
  const useGhost = ghost && !skills?.length;
  const rows = useGhost ? placeholderSkills || [] : (skills || []).filter((g) => g.category || g.items);
  const ghostCls = useGhost ? ' placeholder-text' : '';
  return rows
    .map(
      (group) =>
        `<p class="skill-line${ghostCls}"><strong>${escapeHtml(group.category)}</strong> | ${escapeHtml(group.items)}</p>`
    )
    .join('');
}

// `placeholder` is optional. Omitted (gallery thumbnails, the preview modal,
// and the real content snapshotted for exports): renders only real data,
// empty sections included. Passed (the builder's live preview): empty
// fields/sections fall back to the placeholder's content, rendered as
// `.placeholder-text` so it reads as an example rather than the user's data.
export function render(resume, placeholder) {
  const ghost = Boolean(placeholder);
  const { personal, summary, education, experience, projects, skills } = resume;
  const ph = placeholder || {};
  const phPersonal = ph.personal || {};

  const showSummary = !isEmpty(summary) || (ghost && !isEmpty(ph.summary));
  const showEducation = Boolean(education?.length) || (ghost && Boolean(ph.education?.length));
  const showExperience = Boolean(experience?.length) || (ghost && Boolean(ph.experience?.length));
  const showProjects = Boolean(projects?.length) || (ghost && Boolean(ph.projects?.length));
  const showSkills = Boolean(skills?.length) || (ghost && Boolean(ph.skills?.length));

  const sections = [
    showSummary &&
      `<section>
        <h2>Professional Summary</h2>
        <p>${renderField(summary, ph.summary, ghost)}</p>
      </section>`,
    showEducation &&
      `<section>
        <h2>Education</h2>
        ${renderEducation(education, ph.education, ghost)}
      </section>`,
    showExperience &&
      `<section>
        <h2>Work Experience</h2>
        ${renderExperience(experience, ph.experience, ghost)}
      </section>`,
    showProjects &&
      `<section>
        <h2>Projects</h2>
        ${renderProjects(projects, ph.projects, ghost)}
      </section>`,
    showSkills &&
      `<section>
        <h2>Technical Skills</h2>
        ${renderSkills(skills, ph.skills, ghost)}
      </section>`,
  ]
    .filter(Boolean)
    .join('');

  const nameHtml = ghost
    ? renderField(personal.name, phPersonal.name || 'Name Surname', true)
    : escapeHtml(personal.name || 'Name Surname');

  return `
    <div class="jakes-resume">
      <h1>${nameHtml}</h1>
      <p class="contact">${renderContactLine(personal, phPersonal, ghost)}</p>
      ${sections}
    </div>`;
}
