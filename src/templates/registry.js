import { render as renderJakesResume } from './jakes-resume/template.js';
import jakesResumeStyleUrl from './jakes-resume/style.css?url';
import { render as renderClassic } from './classic/template.js';
import classicStyleUrl from './classic/style.css?url';
import { render as renderTwoColumn } from './two-column/template.js';
import twoColumnStyleUrl from './two-column/style.css?url';
import { render as renderBold } from './bold/template.js';
import boldStyleUrl from './bold/style.css?url';
import { BOLD_THEME, CLASSIC_THEME, JAKES_THEME, MINIMAL_THEME } from './vectorThemes.js';
import config from './templates.json';

// CSS mm-to-px is a fixed, spec-defined ratio (96px/inch, 25.4mm/inch) — used
// to size gallery thumbnails without waiting on the template's stylesheet to
// load and without depending on live DOM measurement.
export const MM_TO_PX = 96 / 25.4;

// Every template the app knows. Which ones are offered, and in what order, comes from
// templates.json. Per template:
// - rootClass: the class on the template's root element (also used for each preview/PDF page);
// - pagePaddingMm: top + bottom padding of that root element (the pagination budget is A4 minus this);
// - layout: 'single' (header, then full-width sections) or 'sidebar' (see lib/paginate.js);
// - vectorTheme: look of the Super Premium text PDF, or null when the template has none;
// - placeholder: 'developer' or 'general' example content in the empty builder.
const DEFINITIONS = {
  'jakes-resume': {
    name: "Jake's Resume",
    description: 'Single-column, ATS-friendly layout. A favourite for software and tech roles.',
    render: renderJakesResume,
    styleUrl: jakesResumeStyleUrl,
    rootClass: 'jakes-resume',
    pagePaddingMm: 32,
    layout: 'single',
    vectorTheme: JAKES_THEME,
    placeholder: 'developer',
  },
  classic: {
    name: 'Classic',
    description:
      'Traditional serif layout in the Harvard style. For business, finance, law and first jobs.',
    render: renderClassic,
    styleUrl: classicStyleUrl,
    rootClass: 'tpl-classic',
    pagePaddingMm: 32,
    layout: 'single',
    vectorTheme: CLASSIC_THEME,
    placeholder: 'general',
  },
  'two-column': {
    name: 'Two-Column',
    description:
      'Modern layout with a sidebar for skills and education. Best when a person, not a screening tool, reads it first.',
    render: renderTwoColumn,
    styleUrl: twoColumnStyleUrl,
    rootClass: 'tpl-twocol',
    pagePaddingMm: 28,
    layout: 'sidebar',
    vectorTheme: null,
    placeholder: 'general',
  },
  bold: {
    name: 'Bold',
    description: 'Confident single column with a red accent and a big name. For experienced professionals.',
    render: renderBold,
    styleUrl: boldStyleUrl,
    rootClass: 'tpl-bold',
    pagePaddingMm: 28,
    layout: 'single',
    vectorTheme: BOLD_THEME,
    placeholder: 'general',
  },
};

function build() {
  const listed = config.templates.filter((entry) => {
    if (DEFINITIONS[entry.id]) return true;
    console.warn(`templates.json lists an unknown template "${entry.id}"`);
    return false;
  });
  // A template missing from the JSON is still offered (at the end), so a new one isn't hidden by
  // accident — add it to the JSON to set its place or hide it.
  const missing = Object.keys(DEFINITIONS)
    .filter((id) => !listed.some((entry) => entry.id === id))
    .map((id) => ({ id, visible: true }));
  return [...listed, ...missing].map((entry) => ({
    id: entry.id,
    pageWidthMm: 210,
    ...DEFINITIONS[entry.id],
    visible: entry.visible !== false,
  }));
}

export const allTemplates = build();

// The templates people can pick.
export const templates = allTemplates.filter((t) => t.visible);

// The template with this id if it's visible, otherwise the first visible one.
export function getTemplate(id) {
  return templates.find((t) => t.id === id) || templates[0] || allTemplates[0];
}

// Returns the <link> element (existing or newly created) so callers that
// need to know once it's actually loaded (e.g. before measuring rendered
// content) can check link.sheet / listen for its 'load' event.
export function loadTemplateStyles(template) {
  const linkId = `template-style-${template.id}`;
  const existing = document.getElementById(linkId);
  if (existing) return existing;
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = template.styleUrl;
  document.head.appendChild(link);
  return link;
}
