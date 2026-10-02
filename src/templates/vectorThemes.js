// Themes for the Super Premium (vector, text-based) PDF — one per single-column template.
// Sizes are in pt, line heights and margins in mm. See src/lib/exportPdfVector.js.

const SECTION_ORDER = ['summary', 'education', 'experience', 'projects', 'skills'];
const join = (...parts) => parts.filter(Boolean).join(' — ');
const dates = (a, b) => [a, b].filter(Boolean).join(' – ');

// Jake's Resume: the original values, unchanged.
const JAKE_INK = [31, 41, 51];
export const JAKES_THEME = {
  font: 'times',
  margins: { top: 16, bottom: 16, left: 18, right: 18 },
  align: 'left',
  colors: {
    ink: JAKE_INK,
    border: [203, 213, 225],
    contactBg: [238, 240, 244],
    link: [37, 99, 235],
  },
  style: {
    name: { size: 20, bold: true, lineMm: 8 },
    contact: { size: 9, lineMm: 5 },
    h2: { size: 10.5, bold: true, color: [71, 85, 105], lineMm: 4.6 },
    row: { size: 10, bold: true, lineMm: 4.6 },
    rowMuted: { size: 9.5, italic: true, color: [82, 96, 107], lineMm: 4.3 },
    body: { size: 9.5, lineMm: 4.3 },
    bullet: { size: 9.5, lineMm: 4.1 },
    skillCategory: { size: 9.5, bold: true, lineMm: 4.6 },
  },
  contactBar: true,
  contactKeys: ['phone', 'email', 'linkedin', 'website'],
  contactSeparator: ' | ',
  heading: { upper: true, rule: 'below' },
  bulletMark: '•',
  skills: { separator: ' | ' },
  order: SECTION_ORDER,
  titles: {
    summary: 'Professional Summary',
    education: 'Education',
    experience: 'Work Experience',
    projects: 'Projects',
    skills: 'Technical Skills',
  },
  entries: {
    education: (e) => ({
      top: { left: e.degree || '', right: e.year || '' },
      sub: { left: join(e.institution, e.location), leftStyle: 'rowMuted' },
    }),
    experience: (j) => ({
      top: { left: j.title || '', right: dates(j.start, j.end) },
      sub: { left: join(j.employer, j.location), leftStyle: 'rowMuted' },
    }),
    projects: (p) => ({
      top: { left: p.skills ? `${p.title || ''} | ${p.skills}` : p.title || '', right: dates(p.start, p.end) },
    }),
  },
};

const GENERAL_TITLES = {
  summary: 'Summary',
  education: 'Education',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
};

// Classic (Harvard style): serif, centred, black, organisation first.
const BLACK = [17, 17, 17];
export const CLASSIC_THEME = {
  font: 'times',
  margins: { top: 16, bottom: 16, left: 18, right: 18 },
  align: 'center',
  colors: { ink: BLACK, border: BLACK, link: BLACK },
  name: { upper: true },
  style: {
    name: { size: 18, bold: true, lineMm: 8 },
    headline: { size: 10, italic: true, lineMm: 5 },
    contact: { size: 9.5, lineMm: 4.6 },
    h2: { size: 10.5, bold: true, lineMm: 4.6 },
    row: { size: 10, bold: true, lineMm: 4.5 },
    rowPlain: { size: 10, lineMm: 4.5 },
    rowItalic: { size: 10, italic: true, lineMm: 4.4 },
    body: { size: 10, lineMm: 4.4 },
    bullet: { size: 10, lineMm: 4.2 },
    skillCategory: { size: 10, bold: true, lineMm: 4.6 },
  },
  contactBar: false,
  contactKeys: ['location', 'phone', 'email', 'linkedin', 'website'],
  contactSeparator: '  •  ',
  afterContactMm: 2,
  heading: { upper: true, rule: 'below', ruleWidth: 0.25, spaceBeforeMm: 2 },
  bulletMark: '•',
  skills: { separator: ': ' },
  order: ['summary', 'education', 'experience', 'projects', 'skills'],
  titles: GENERAL_TITLES,
  entries: {
    education: (e) => ({
      top: { left: e.institution || '', right: e.location || '', rightStyle: 'rowPlain' },
      sub: { left: e.degree || '', right: e.year || '', leftStyle: 'rowItalic' },
    }),
    experience: (j) => ({
      top: { left: j.employer || '', right: j.location || '', rightStyle: 'rowPlain' },
      sub: { left: j.title || '', right: dates(j.start, j.end), leftStyle: 'rowItalic' },
    }),
    projects: (p) => ({
      top: { left: p.title || '', right: dates(p.start, p.end), rightStyle: 'rowPlain' },
      sub: { left: p.skills || '', leftStyle: 'rowItalic' },
    }),
  },
};

// Bold (Awesome-CV style): centred, red accent, light first name and bold last name.
const ACCENT_RED = [220, 53, 34];
const DARK = [51, 51, 51];
const GREY = [110, 110, 110];
export const BOLD_THEME = {
  font: 'helvetica',
  margins: { top: 14, bottom: 14, left: 16, right: 16 },
  align: 'center',
  colors: { ink: DARK, border: [180, 180, 180], link: DARK },
  name: { split: true },
  headlineUpper: true,
  style: {
    name: { size: 24, bold: true, lineMm: 10, color: [34, 34, 34] },
    nameLight: { size: 24, lineMm: 10, color: [90, 90, 90] },
    headline: { size: 9, color: ACCENT_RED, lineMm: 5 },
    contact: { size: 8.5, color: GREY, lineMm: 4.4 },
    contactSeparator: { size: 8.5, color: ACCENT_RED, lineMm: 4.4 },
    h2: { size: 13, bold: true, color: [34, 34, 34], lineMm: 6 },
    row: { size: 10, bold: true, lineMm: 4.5 },
    rowAccent: { size: 9, italic: true, color: ACCENT_RED, lineMm: 4.5 },
    rowGrey: { size: 8.5, color: GREY, lineMm: 4.2 },
    rowGreyItalic: { size: 8.5, italic: true, color: GREY, lineMm: 4.2 },
    body: { size: 9.5, lineMm: 4.3 },
    bullet: { size: 9.5, lineMm: 4.1 },
    bulletMark: { size: 9.5, color: ACCENT_RED, lineMm: 4.1 },
    skillCategory: { size: 9.5, bold: true, lineMm: 4.6 },
  },
  contactBar: false,
  contactKeys: ['location', 'phone', 'email', 'linkedin', 'website'],
  contactSeparator: '  |  ',
  afterContactMm: 2,
  heading: { upper: false, rule: 'after', lead: { chars: 3, color: ACCENT_RED }, spaceBeforeMm: 2 },
  bulletMark: '•',
  skills: { table: 38 },
  order: ['summary', 'experience', 'education', 'projects', 'skills'],
  titles: GENERAL_TITLES,
  entries: {
    education: (e) => ({
      top: { left: e.degree || '', right: e.location || '', rightStyle: 'rowAccent' },
      sub: { left: (e.institution || '').toUpperCase(), right: e.year || '', leftStyle: 'rowGrey', rightStyle: 'rowGreyItalic' },
    }),
    experience: (j) => ({
      top: { left: j.title || '', right: j.location || '', rightStyle: 'rowAccent' },
      sub: {
        left: (j.employer || '').toUpperCase(),
        right: dates(j.start, j.end),
        leftStyle: 'rowGrey',
        rightStyle: 'rowGreyItalic',
      },
    }),
    projects: (p) => ({
      top: { left: p.title || '', right: dates(p.start, p.end), rightStyle: 'rowGreyItalic' },
      sub: { left: p.skills || '', leftStyle: 'rowGrey' },
    }),
  },
};

// Minimal (Google Docs Swiss/Spearmint style): left-aligned, airy, green accent headings.
const ACCENT_GREEN = [31, 122, 94];
const MUTED = [107, 114, 128];
export const MINIMAL_THEME = {
  font: 'helvetica',
  margins: { top: 18, bottom: 18, left: 20, right: 20 },
  align: 'left',
  colors: { ink: [38, 38, 38], border: [255, 255, 255], link: [38, 38, 38] },
  style: {
    name: { size: 24, lineMm: 10, color: [17, 17, 17] },
    headline: { size: 10.5, color: ACCENT_GREEN, lineMm: 5.2 },
    contact: { size: 8.5, color: MUTED, lineMm: 4.4 },
    h2: { size: 8.5, bold: true, color: ACCENT_GREEN, lineMm: 6 },
    row: { size: 10, bold: true, lineMm: 4.6 },
    rowMuted: { size: 9, color: MUTED, lineMm: 4.2 },
    body: { size: 9.5, lineMm: 4.5 },
    bullet: { size: 9.5, lineMm: 4.3 },
    skillCategory: { size: 9.5, bold: true, lineMm: 4.8 },
  },
  contactBar: false,
  contactKeys: ['location', 'phone', 'email', 'linkedin', 'website'],
  contactSeparator: '   ·   ',
  afterContactMm: 3,
  heading: { upper: true, rule: 'none', spaceBeforeMm: 3 },
  bulletMark: '–',
  skills: { separator: '   ' },
  order: SECTION_ORDER,
  titles: GENERAL_TITLES,
  entries: {
    education: (e) => ({
      top: { left: e.degree || '', right: e.year || '', rightStyle: 'rowMuted' },
      sub: { left: [e.institution, e.location].filter(Boolean).join(', '), leftStyle: 'rowMuted' },
    }),
    experience: (j) => ({
      top: { left: [j.title, j.employer].filter(Boolean).join(', '), right: dates(j.start, j.end), rightStyle: 'rowMuted' },
      sub: { left: j.location || '', leftStyle: 'rowMuted' },
    }),
    projects: (p) => ({
      top: { left: p.title || '', right: dates(p.start, p.end), rightStyle: 'rowMuted' },
      sub: { left: p.skills || '', leftStyle: 'rowMuted' },
    }),
  },
};
