import { render as renderJakesResume } from './jakes-resume/template.js';
import jakesResumeStyleUrl from './jakes-resume/style.css?url';

// CSS mm-to-px is a fixed, spec-defined ratio (96px/inch, 25.4mm/inch) — used
// to size gallery thumbnails without waiting on the template's stylesheet to
// load and without depending on live DOM measurement.
export const MM_TO_PX = 96 / 25.4;

export const templates = [
  {
    id: 'jakes-resume',
    name: "Jake's Resume",
    description: 'Single-column, ATS-friendly layout. Good default for most roles.',
    render: renderJakesResume,
    styleUrl: jakesResumeStyleUrl,
    pageWidthMm: 210,
  },
];

export function getTemplate(id) {
  return templates.find((t) => t.id === id) || templates[0];
}

export function loadTemplateStyles(template) {
  const linkId = `template-style-${template.id}`;
  if (document.getElementById(linkId)) return;
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = template.styleUrl;
  document.head.appendChild(link);
}
