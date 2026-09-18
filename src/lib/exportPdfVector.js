import { isProEnabled } from './exportPdf.js';

// A from-scratch vector renderer for the Jake's Resume template, built
// straight from resume data using jsPDF's own text/line/rect primitives
// instead of html2canvas. Trades pixel-perfect fidelity with the on-screen
// preview (see jakes-resume/style.css) for real selectable/searchable text,
// genuinely clickable links, and a much smaller file than a rasterized page.
//
// Sizes/spacing below are a hand-tuned approximation of the CSS, not a
// derived conversion — jsPDF's core fonts (times/helvetica/courier) don't
// match Cambria/Georgia metrics exactly, so pixel math wouldn't be exact
// either. Tune the constants below if the output needs adjusting.

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const MARGIN_TOP_MM = 16;
const MARGIN_BOTTOM_MM = 16;
const MARGIN_LEFT_MM = 18;
const MARGIN_RIGHT_MM = 18;
const CONTENT_LEFT_MM = MARGIN_LEFT_MM;
const CONTENT_RIGHT_MM = PAGE_WIDTH_MM - MARGIN_RIGHT_MM;
const CONTENT_WIDTH_MM = CONTENT_RIGHT_MM - CONTENT_LEFT_MM;
const PAGE_BOTTOM_MM = PAGE_HEIGHT_MM - MARGIN_BOTTOM_MM;
const PT_TO_MM = 25.4 / 72;

const COLOR_INK = [31, 41, 51];
const COLOR_MUTED = [82, 96, 107];
const COLOR_HEADING = [71, 85, 105];
const COLOR_BORDER = [203, 213, 225];
const COLOR_CONTACT_BG = [238, 240, 244];
const COLOR_LINK = [37, 99, 235];

const FONT = 'times';

const STYLE = {
  name: { size: 20, bold: true, lineMm: 8 },
  contact: { size: 9, lineMm: 5 },
  h2: { size: 10.5, bold: true, color: COLOR_HEADING, lineMm: 4.6 },
  row: { size: 10, bold: true, lineMm: 4.6 },
  rowMuted: { size: 9.5, italic: true, color: COLOR_MUTED, lineMm: 4.3 },
  body: { size: 9.5, lineMm: 4.3 },
  bullet: { size: 9.5, lineMm: 4.1 },
  skillCategory: { size: 9.5, bold: true, lineMm: 4.6 },
};

function isEmpty(value) {
  return !value || !String(value).trim();
}

const URL_RE = /(https?:\/\/[^\s]+)/;

function normalizeUrl(value) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

// Splits bullet text around a bare URL so the link box can be placed at the
// exact substring, rather than over the whole line.
function splitUrl(text) {
  const match = URL_RE.exec(text);
  if (!match) return null;
  let url = match[1];
  const trailing = url.match(/[.,;:)]+$/)?.[0] || '';
  if (trailing) url = url.slice(0, -trailing.length);
  const start = match.index;
  return { pre: text.slice(0, start), url, post: text.slice(start + url.length) };
}

function createCursor() {
  return { y: MARGIN_TOP_MM };
}

function ensureSpace(doc, cursor, neededMm) {
  if (cursor.y + neededMm > PAGE_BOTTOM_MM) {
    doc.addPage();
    cursor.y = MARGIN_TOP_MM;
  }
}

function setStyle(doc, style) {
  doc.setFont(FONT, style.bold && style.italic ? 'bolditalic' : style.bold ? 'bold' : style.italic ? 'italic' : 'normal');
  doc.setFontSize(style.size);
  doc.setTextColor(...(style.color || COLOR_INK));
}

// Draws one span of text at (xMm, baselineMm) and, if `url` is given, lays a
// clickable link box over it and underlines it in the link color.
function drawSpan(doc, text, xMm, baselineMm, style, url) {
  setStyle(doc, style);
  if (url) doc.setTextColor(...COLOR_LINK);
  doc.text(text, xMm, baselineMm);
  const width = doc.getTextWidth(text);
  if (url) {
    const boxTop = baselineMm - style.size * PT_TO_MM * 0.8;
    const boxHeight = style.size * PT_TO_MM * 1.05;
    doc.link(xMm, boxTop, width, boxHeight, { url });
    doc.setDrawColor(...COLOR_LINK);
    doc.setLineWidth(0.15);
    doc.line(xMm, baselineMm + 0.5, xMm + width, baselineMm + 0.5);
  }
  return width;
}

function drawName(doc, cursor, name) {
  const style = STYLE.name;
  ensureSpace(doc, cursor, style.lineMm);
  cursor.y += style.lineMm * 0.75;
  drawSpan(doc, name || 'Name Surname', CONTENT_LEFT_MM, cursor.y, style);
  cursor.y += style.lineMm * 0.35;
}

function drawContactLine(doc, cursor, personal) {
  const style = STYLE.contact;
  const barHeight = style.lineMm + 2;
  ensureSpace(doc, cursor, barHeight + 2);
  cursor.y += 1.5;
  doc.setFillColor(...COLOR_CONTACT_BG);
  doc.rect(0, cursor.y, PAGE_WIDTH_MM, barHeight, 'F');

  const parts = [];
  if (!isEmpty(personal.phone)) parts.push({ text: personal.phone, url: `tel:${personal.phone.replace(/[^\d+]/g, '')}` });
  if (!isEmpty(personal.email)) parts.push({ text: personal.email, url: `mailto:${personal.email}` });
  if (!isEmpty(personal.linkedin)) parts.push({ text: personal.linkedin, url: normalizeUrl(personal.linkedin) });
  if (!isEmpty(personal.website)) parts.push({ text: personal.website, url: normalizeUrl(personal.website) });

  const baseline = cursor.y + barHeight / 2 + style.size * PT_TO_MM * 0.35;
  let x = CONTENT_LEFT_MM;
  parts.forEach((part, index) => {
    x += drawSpan(doc, part.text, x, baseline, style, part.url);
    if (index < parts.length - 1) {
      x += drawSpan(doc, ' | ', x, baseline, style);
    }
  });

  cursor.y += barHeight + 3.7;
}

function drawSectionHeading(doc, cursor, title) {
  const style = STYLE.h2;
  ensureSpace(doc, cursor, style.lineMm + 3);
  cursor.y += style.lineMm * 0.8;
  drawSpan(doc, title.toUpperCase(), CONTENT_LEFT_MM, cursor.y, style);
  const underlineY = cursor.y + 1.2;
  doc.setDrawColor(...COLOR_BORDER);
  doc.setLineWidth(0.15);
  doc.line(CONTENT_LEFT_MM, underlineY, CONTENT_RIGHT_MM, underlineY);
  cursor.y = underlineY + 2.2;
}

// Pure layout computation for an entry header (title/skills left, date
// right, optional muted sub-row) — reused by both the measuring pass
// (placeSection, below) and the actual draw, so they can never drift apart.
//
// The left text (title, or "title | skills") wraps to leave room for the
// right-aligned date/status on its first line only — a long skills list
// would otherwise run straight into it. Later wrapped lines use the full
// width since the date has nowhere else to be by then.
function layoutEntryHeader(doc, leftText, rightText, subText) {
  const rowStyle = STYLE.row;
  const subStyle = STYLE.rowMuted;
  setStyle(doc, rowStyle);
  const rightWidth = rightText ? doc.getTextWidth(rightText) : 0;
  const gap = rightText ? 4 : 0;
  const firstLineMaxWidth = Math.max(CONTENT_WIDTH_MM - rightWidth - gap, CONTENT_WIDTH_MM * 0.35);
  const narrowLines = doc.splitTextToSize(leftText, firstLineMaxWidth);
  const leftLines =
    narrowLines.length > 1
      ? [narrowLines[0], ...doc.splitTextToSize(narrowLines.slice(1).join(' '), CONTENT_WIDTH_MM)]
      : narrowLines;
  const height = leftLines.length * rowStyle.lineMm + (subText ? subStyle.lineMm : 0);
  return { leftLines, height, rowStyle, subStyle };
}

// Title/skills on the left, dates on the right — mirrors `.row` (flex,
// justify-content:space-between) — followed by an optional muted sub-row.
function drawEntryHeader(doc, cursor, leftText, rightText, subText) {
  const { leftLines, height, rowStyle, subStyle } = layoutEntryHeader(doc, leftText, rightText, subText);
  ensureSpace(doc, cursor, height);

  leftLines.forEach((line, index) => {
    cursor.y += rowStyle.lineMm * 0.72;
    drawSpan(doc, line, CONTENT_LEFT_MM, cursor.y, rowStyle);
    if (index === 0 && rightText) {
      setStyle(doc, rowStyle);
      doc.text(rightText, CONTENT_RIGHT_MM, cursor.y, { align: 'right' });
    }
    cursor.y += rowStyle.lineMm * 0.28;
  });

  if (subText) {
    cursor.y += subStyle.lineMm * 0.72;
    drawSpan(doc, subText, CONTENT_LEFT_MM, cursor.y, subStyle);
    cursor.y += subStyle.lineMm * 0.28;
  }
}

// Pure layout computation for a bullet list — same reasoning as
// layoutEntryHeader above: one source of truth for both measuring and
// drawing.
function layoutBullets(doc, bullets) {
  const style = STYLE.bullet;
  const indent = 4;
  const maxWidth = CONTENT_WIDTH_MM - indent;
  setStyle(doc, style);
  const items = (bullets || [])
    .filter((b) => b && b.trim())
    .map((bullet) => {
      const lines = doc.splitTextToSize(bullet, maxWidth);
      return { lines, height: lines.length * style.lineMm + 0.8, linkInfo: splitUrl(bullet) };
    });
  const totalHeight = items.reduce((sum, item) => sum + item.height, 0);
  return { items, totalHeight, indent, style };
}

function drawBullets(doc, cursor, bullets) {
  const { items, indent, style } = layoutBullets(doc, bullets);
  items.forEach(({ lines, height, linkInfo }) => {
    // Keep a short bullet whole; only a bullet taller than a full page falls
    // through to per-line pagination below.
    if (height <= PAGE_BOTTOM_MM - MARGIN_TOP_MM) {
      ensureSpace(doc, cursor, height);
    }
    lines.forEach((line, index) => {
      ensureSpace(doc, cursor, style.lineMm);
      cursor.y += style.lineMm * 0.72;
      if (index === 0) {
        setStyle(doc, style);
        doc.text('•', CONTENT_LEFT_MM, cursor.y);
      }
      if (linkInfo && line.includes(linkInfo.url)) {
        const before = line.slice(0, line.indexOf(linkInfo.url));
        let x = CONTENT_LEFT_MM + indent;
        x += drawSpan(doc, before, x, cursor.y, style);
        x += drawSpan(doc, linkInfo.url, x, cursor.y, style, linkInfo.url);
        const after = line.slice(line.indexOf(linkInfo.url) + linkInfo.url.length);
        if (after) drawSpan(doc, after, x, cursor.y, style);
      } else {
        drawSpan(doc, line, CONTENT_LEFT_MM + indent, cursor.y, style);
      }
      cursor.y += style.lineMm * 0.28;
    });
  });
}

function drawEducation(doc, cursor, education) {
  education.forEach((edu) => {
    drawEntryHeader(
      doc,
      cursor,
      edu.degree || '',
      edu.year || '',
      [edu.institution, edu.location].filter(Boolean).join(' — ')
    );
    cursor.y += 1.5;
  });
}

function drawExperience(doc, cursor, experience) {
  experience.forEach((job) => {
    drawEntryHeader(
      doc,
      cursor,
      job.title || '',
      [job.start, job.end].filter(Boolean).join(' – '),
      [job.employer, job.location].filter(Boolean).join(' — ')
    );
    cursor.y += 0.8;
    drawBullets(doc, cursor, job.bullets);
    cursor.y += 1.5;
  });
}

function drawProjects(doc, cursor, projects) {
  projects.forEach((proj) => {
    const left = proj.skills ? `${proj.title || ''} | ${proj.skills}` : proj.title || '';
    drawEntryHeader(doc, cursor, left, [proj.start, proj.end].filter(Boolean).join(' – '));
    cursor.y += 0.8;
    drawBullets(doc, cursor, proj.bullets);
    cursor.y += 1.5;
  });
}

function drawSkills(doc, cursor, skills) {
  const style = STYLE.skillCategory;
  const itemsStyle = STYLE.body;
  skills
    .filter((group) => group.category || group.items)
    .forEach((group) => {
      ensureSpace(doc, cursor, style.lineMm);
      cursor.y += style.lineMm * 0.75;
      let x = CONTENT_LEFT_MM;
      x += drawSpan(doc, group.category || '', x, cursor.y, style);
      if (group.items) {
        x += drawSpan(doc, ' | ', x, cursor.y, style);
        const maxWidth = CONTENT_RIGHT_MM - x;
        const lines = doc.splitTextToSize(group.items, maxWidth);
        drawSpan(doc, lines[0], x, cursor.y, itemsStyle);
        for (let i = 1; i < lines.length; i++) {
          cursor.y += itemsStyle.lineMm;
          ensureSpace(doc, cursor, itemsStyle.lineMm);
          drawSpan(doc, lines[i], CONTENT_LEFT_MM, cursor.y, itemsStyle);
        }
      }
      cursor.y += style.lineMm * 0.25;
    });
}

function drawSummary(doc, cursor, summary) {
  const style = STYLE.body;
  setStyle(doc, style);
  const lines = doc.splitTextToSize(summary, CONTENT_WIDTH_MM);
  lines.forEach((line) => {
    ensureSpace(doc, cursor, style.lineMm);
    cursor.y += style.lineMm * 0.72;
    drawSpan(doc, line, CONTENT_LEFT_MM, cursor.y, style);
    cursor.y += style.lineMm * 0.28;
  });
}

// Total height a section's own heading consumes (drawSectionHeading's
// cursor advancement, kept in one place so placeSection's pre-check below
// stays exactly in sync with what actually gets drawn).
const HEADING_HEIGHT_MM = STYLE.h2.lineMm * 0.8 + 1.2 + 2.2;

function measureSummaryHeight(doc, summary) {
  const style = STYLE.body;
  setStyle(doc, style);
  return doc.splitTextToSize(summary, CONTENT_WIDTH_MM).length * style.lineMm;
}

function measureEducationHeight(doc, education) {
  return education.reduce((sum, edu) => {
    const { height } = layoutEntryHeader(
      doc,
      edu.degree || '',
      edu.year || '',
      [edu.institution, edu.location].filter(Boolean).join(' — ')
    );
    return sum + height + 1.5;
  }, 0);
}

function measureExperienceHeight(doc, experience) {
  return experience.reduce((sum, job) => {
    const { height } = layoutEntryHeader(
      doc,
      job.title || '',
      [job.start, job.end].filter(Boolean).join(' – '),
      [job.employer, job.location].filter(Boolean).join(' — ')
    );
    const { totalHeight } = layoutBullets(doc, job.bullets);
    return sum + height + 0.8 + totalHeight + 1.5;
  }, 0);
}

function measureProjectsHeight(doc, projects) {
  return projects.reduce((sum, proj) => {
    const left = proj.skills ? `${proj.title || ''} | ${proj.skills}` : proj.title || '';
    const { height } = layoutEntryHeader(doc, left, [proj.start, proj.end].filter(Boolean).join(' – '));
    const { totalHeight } = layoutBullets(doc, proj.bullets);
    return sum + height + 0.8 + totalHeight + 1.5;
  }, 0);
}

function measureSkillsHeight(doc, skills) {
  const style = STYLE.skillCategory;
  const itemsStyle = STYLE.body;
  return skills
    .filter((group) => group.category || group.items)
    .reduce((sum, group) => {
      setStyle(doc, style);
      const x = CONTENT_LEFT_MM + doc.getTextWidth(group.category || '') + (group.items ? doc.getTextWidth(' | ') : 0);
      let height = style.lineMm;
      if (group.items) {
        setStyle(doc, itemsStyle);
        const lines = doc.splitTextToSize(group.items, CONTENT_RIGHT_MM - x);
        height += (lines.length - 1) * itemsStyle.lineMm;
      }
      return sum + height + style.lineMm * 0.25;
    }, 0);
}

// Places a section's heading either right where the cursor is, or — if the
// whole section (heading + content) doesn't fit what's left on this page but
// does fit a full fresh page — pushes a page break first, so a section never
// gets split across pages when it could have started clean on the next one.
// Mirrors paginate.js's placeSection() used for the on-screen preview/PDF.
function placeSection(doc, cursor, headingText, contentHeight) {
  const remaining = PAGE_BOTTOM_MM - cursor.y;
  const fullHeight = HEADING_HEIGHT_MM + contentHeight;
  const pageIsEmpty = cursor.y <= MARGIN_TOP_MM + 0.1;
  if (fullHeight > remaining && fullHeight <= PAGE_BOTTOM_MM - MARGIN_TOP_MM && !pageIsEmpty) {
    doc.addPage();
    cursor.y = MARGIN_TOP_MM;
  }
  drawSectionHeading(doc, cursor, headingText);
}

export async function downloadAsPdfSuperPremium(resume, filename = 'resume.pdf') {
  if (!isProEnabled) {
    throw new Error('PDF export is a pro feature (set VITE_PRO_ENABLED=true to enable).');
  }
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const cursor = createCursor();

  const { personal, summary, education, experience, projects, skills } = resume;

  drawName(doc, cursor, personal?.name);
  drawContactLine(doc, cursor, personal || {});

  if (!isEmpty(summary)) {
    placeSection(doc, cursor, 'Professional Summary', measureSummaryHeight(doc, summary));
    drawSummary(doc, cursor, summary);
  }
  if (education?.length) {
    placeSection(doc, cursor, 'Education', measureEducationHeight(doc, education));
    drawEducation(doc, cursor, education);
  }
  if (experience?.length) {
    placeSection(doc, cursor, 'Work Experience', measureExperienceHeight(doc, experience));
    drawExperience(doc, cursor, experience);
  }
  if (projects?.length) {
    placeSection(doc, cursor, 'Projects', measureProjectsHeight(doc, projects));
    drawProjects(doc, cursor, projects);
  }
  if (skills?.length) {
    placeSection(doc, cursor, 'Technical Skills', measureSkillsHeight(doc, skills));
    drawSkills(doc, cursor, skills);
  }

  doc.save(filename);
}
