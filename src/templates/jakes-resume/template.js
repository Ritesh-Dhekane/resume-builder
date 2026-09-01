function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBullets(bullets) {
  const items = (bullets || []).filter((b) => b && b.trim());
  if (!items.length) return '';
  return `<ul>${items.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`;
}

function renderContactLine(personal) {
  const parts = [personal.phone, personal.email, personal.linkedin, personal.website].filter(
    (p) => p && p.trim()
  );
  return escapeHtml(parts.join(' | '));
}

function renderEducation(education) {
  return (education || [])
    .map(
      (edu) => `
      <div class="row">
        <strong>${escapeHtml(edu.degree)}</strong>
        <strong>${escapeHtml(edu.year)}</strong>
      </div>
      <div class="row muted">
        <span>${escapeHtml(edu.institution)}</span>
        <span>${escapeHtml(edu.location)}</span>
      </div>`
    )
    .join('');
}

function renderExperience(experience) {
  return (experience || [])
    .map(
      (job) => `
      <div class="row">
        <strong>${escapeHtml(job.title)}</strong>
        <strong>${escapeHtml(job.start)} &ndash; ${escapeHtml(job.end)}</strong>
      </div>
      <div class="row muted">
        <span>${escapeHtml(job.employer)}</span>
        <span>${escapeHtml(job.location)}</span>
      </div>
      ${renderBullets(job.bullets)}`
    )
    .join('');
}

function renderProjects(projects) {
  return (projects || [])
    .map(
      (proj) => `
      <div class="row">
        <strong>${escapeHtml(proj.title)}${proj.skills ? ` | ${escapeHtml(proj.skills)}` : ''}</strong>
        <strong>${escapeHtml(proj.start)} &ndash; ${escapeHtml(proj.end)}</strong>
      </div>
      ${renderBullets(proj.bullets)}`
    )
    .join('');
}

function renderSkills(skills) {
  return (skills || [])
    .filter((group) => group.category || group.items)
    .map(
      (group) =>
        `<p class="skill-line"><strong>${escapeHtml(group.category)}</strong> | ${escapeHtml(group.items)}</p>`
    )
    .join('');
}

export function render(resume) {
  const { personal, summary, education, experience, projects, skills } = resume;

  const sections = [
    summary &&
      `<section>
        <h2>Professional Summary</h2>
        <p>${escapeHtml(summary)}</p>
      </section>`,
    education?.length &&
      `<section>
        <h2>Education</h2>
        ${renderEducation(education)}
      </section>`,
    experience?.length &&
      `<section>
        <h2>Work Experience</h2>
        ${renderExperience(experience)}
      </section>`,
    projects?.length &&
      `<section>
        <h2>Projects</h2>
        ${renderProjects(projects)}
      </section>`,
    skills?.length &&
      `<section>
        <h2>Technical Skills</h2>
        ${renderSkills(skills)}
      </section>`,
  ]
    .filter(Boolean)
    .join('');

  return `
    <div class="jakes-resume">
      <h1>${escapeHtml(personal.name || 'Name Surname')}</h1>
      <p class="contact">${renderContactLine(personal)}</p>
      ${sections}
    </div>`;
}
