import { getTemplate, loadTemplateStyles } from '../templates/registry.js';
import {
  createEmptyResume,
  createEmptyEducation,
  createEmptyExperience,
  createEmptyProject,
  createEmptySkillGroup,
} from '../state/resumeSchema.js';
import { downloadAsImage } from '../lib/exportImage.js';
import { downloadAsPdf, isProEnabled } from '../lib/exportPdf.js';
import { saveDraft, loadDraft, appendLocalHistory, downloadJson } from '../lib/storage.js';
import { saveResumeToHistory } from '../lib/api.js';

function filenameFor(resume, ext) {
  const base = (resume.personal.name || 'resume').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${base || 'resume'}.${ext}`;
}

const ROW_FACTORIES = {
  education: createEmptyEducation,
  experience: createEmptyExperience,
  projects: createEmptyProject,
  skills: createEmptySkillGroup,
};

function esc(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function setPath(obj, path, value) {
  const keys = path.split('.');
  let target = obj;
  for (let i = 0; i < keys.length - 1; i++) target = target[keys[i]];
  target[keys[keys.length - 1]] = value;
}

function findRow(list, id) {
  return list.find((row) => row.id === id);
}

function field(label, inputHtml) {
  return `<div class="field"><label>${label}</label>${inputHtml}</div>`;
}

function textInput(dataAttr, value) {
  return `<input type="text" ${dataAttr} value="${esc(value)}" />`;
}

function personalFields(personal) {
  const fields = [
    ['name', 'Full name'],
    ['title', 'Headline / target title'],
    ['phone', 'Phone'],
    ['email', 'Email'],
    ['location', 'Location'],
    ['linkedin', 'LinkedIn'],
    ['website', 'Website'],
  ];
  return fields
    .map(([key, label]) => field(label, textInput(`data-path="personal.${key}"`, personal[key])))
    .join('');
}

function removeButton(section, id) {
  return `<button type="button" class="btn remove-row" data-remove="${section}:${id}">Remove</button>`;
}

function educationRow(edu) {
  return `
    <div class="row-group" data-section="education" data-id="${edu.id}">
      ${removeButton('education', edu.id)}
      ${field('Degree', textInput('data-field="degree"', edu.degree))}
      ${field('Institution', textInput('data-field="institution"', edu.institution))}
      ${field('Location', textInput('data-field="location"', edu.location))}
      ${field('Year completed', textInput('data-field="year"', edu.year))}
    </div>`;
}

function experienceRow(job) {
  return `
    <div class="row-group" data-section="experience" data-id="${job.id}">
      ${removeButton('experience', job.id)}
      ${field('Position title', textInput('data-field="title"', job.title))}
      ${field('Employer', textInput('data-field="employer"', job.employer))}
      ${field('Location', textInput('data-field="location"', job.location))}
      <div class="grid grid-2">
        ${field('Start', textInput('data-field="start"', job.start))}
        ${field('End', textInput('data-field="end"', job.end))}
      </div>
      ${field('Bullets (one per line)', `<textarea data-field="bullets" rows="4">${esc((job.bullets || []).join('\n'))}</textarea>`)}
    </div>`;
}

function projectRow(proj) {
  return `
    <div class="row-group" data-section="projects" data-id="${proj.id}">
      ${removeButton('projects', proj.id)}
      ${field('Project title', textInput('data-field="title"', proj.title))}
      ${field('Skills used', textInput('data-field="skills"', proj.skills))}
      <div class="grid grid-2">
        ${field('Start', textInput('data-field="start"', proj.start))}
        ${field('End', textInput('data-field="end"', proj.end))}
      </div>
      ${field('Bullets (one per line)', `<textarea data-field="bullets" rows="4">${esc((proj.bullets || []).join('\n'))}</textarea>`)}
    </div>`;
}

function skillRow(group) {
  return `
    <div class="row-group" data-section="skills" data-id="${group.id}">
      ${removeButton('skills', group.id)}
      ${field('Category', textInput('data-field="category"', group.category))}
      ${field('Items (comma separated)', textInput('data-field="items"', group.items))}
    </div>`;
}

function addButton(section, label) {
  return `<button type="button" class="btn" data-add="${section}">${label}</button>`;
}

function saveInfoFields(meta) {
  const fields = [
    ['label', 'Label (for history)'],
    ['targetRole', 'Target role'],
    ['jobDescriptionTag', 'Job description tag'],
  ];
  return fields
    .map(([key, label]) => field(label, textInput(`data-path="meta.${key}"`, meta[key])))
    .join('');
}

function renderFormHTML(resume) {
  return `
    <h2>Save Info</h2>
    ${saveInfoFields(resume.meta)}

    <h2>Personal</h2>
    ${personalFields(resume.personal)}

    <h2>Summary</h2>
    <div class="field"><textarea data-path="summary" rows="4">${esc(resume.summary)}</textarea></div>

    <h2>Education</h2>
    <div id="education-list">${resume.education.map(educationRow).join('')}</div>
    ${addButton('education', '+ Add education')}

    <h2>Work Experience</h2>
    <div id="experience-list">${resume.experience.map(experienceRow).join('')}</div>
    ${addButton('experience', '+ Add experience')}

    <h2>Projects</h2>
    <div id="projects-list">${resume.projects.map(projectRow).join('')}</div>
    ${addButton('projects', '+ Add project')}

    <h2>Technical Skills</h2>
    <div id="skills-list">${resume.skills.map(skillRow).join('')}</div>
    ${addButton('skills', '+ Add skill group')}
  `;
}

export function mount(container, query) {
  const template = getTemplate(query.get('template'));
  loadTemplateStyles(template);

  const draft = loadDraft();
  const resume = draft && draft.templateId === template.id ? draft : createEmptyResume(template.id);

  container.innerHTML = `
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <h1 class="page-title">Builder</h1>
      <p class="page-subtitle">Template: ${esc(template.name)}</p>
      <div class="actions">
        <button type="button" class="btn" id="btn-image">Download as Image</button>
        <button type="button" class="btn btn-primary" id="btn-pdf">Download as PDF</button>
        <button type="button" class="btn" id="btn-save">Save</button>
      </div>
      <div class="grid grid-2">
        <div class="card" id="form-panel"></div>
        <div class="card">
          <div class="preview-frame" id="preview-content"></div>
        </div>
      </div>
    </div>
  `;

  const formPanel = container.querySelector('#form-panel');
  const previewContent = container.querySelector('#preview-content');
  const btnImage = container.querySelector('#btn-image');
  const btnPdf = container.querySelector('#btn-pdf');
  const btnSave = container.querySelector('#btn-save');

  btnImage.addEventListener('click', () => {
    downloadAsImage(previewContent, filenameFor(resume, 'png'));
  });

  btnSave.addEventListener('click', async () => {
    const result = await saveResumeToHistory(resume);
    if (result) {
      alert('Saved to local history (data/history.json).');
      return;
    }
    const snapshot = { ...resume, meta: { ...resume.meta, savedAt: new Date().toISOString() } };
    appendLocalHistory(snapshot);
    downloadJson(snapshot, filenameFor(resume, 'json'));
    alert(
      'No local dev server detected. Saved a copy in this browser and downloaded a JSON file — ' +
        'drop it into data/history.json if you want it in the shared archive.'
    );
  });

  if (isProEnabled) {
    btnPdf.addEventListener('click', () => {
      downloadAsPdf(previewContent, filenameFor(resume, 'pdf'));
    });
  } else {
    btnPdf.disabled = true;
    btnPdf.title = 'PDF export is a pro feature. Set VITE_PRO_ENABLED=true in .env to enable it locally.';
  }

  function renderPreview() {
    previewContent.innerHTML = template.render(resume);
    saveDraft(resume);
  }

  function renderForm() {
    formPanel.innerHTML = renderFormHTML(resume);
  }

  formPanel.addEventListener('input', (event) => {
    const target = event.target;
    if (target.dataset.path) {
      setPath(resume, target.dataset.path, target.value);
      renderPreview();
      return;
    }
    const rowGroup = target.closest('[data-section][data-id]');
    if (rowGroup && target.dataset.field) {
      const row = findRow(resume[rowGroup.dataset.section], rowGroup.dataset.id);
      if (!row) return;
      row[target.dataset.field] =
        target.dataset.field === 'bullets' ? target.value.split('\n') : target.value;
      renderPreview();
    }
  });

  formPanel.addEventListener('click', (event) => {
    const addBtn = event.target.closest('[data-add]');
    if (addBtn) {
      const section = addBtn.dataset.add;
      resume[section].push(ROW_FACTORIES[section]());
      renderForm();
      renderPreview();
      return;
    }
    const removeBtn = event.target.closest('[data-remove]');
    if (removeBtn) {
      const [section, id] = removeBtn.dataset.remove.split(':');
      resume[section] = resume[section].filter((row) => row.id !== id);
      renderForm();
      renderPreview();
    }
  });

  renderForm();
  renderPreview();
}
