import { render as renderJakesResume } from './jakes-resume/template.js';
import jakesResumeStyleUrl from './jakes-resume/style.css?url';

export const templates = [
  {
    id: 'jakes-resume',
    name: "Jake's Resume",
    description: 'Single-column, ATS-friendly layout. Good default for most roles.',
    render: renderJakesResume,
    styleUrl: jakesResumeStyleUrl,
  },
];

export function getTemplate(id) {
  return templates.find((t) => t.id === id) || templates[0];
}
