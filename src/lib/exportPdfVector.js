// A from-scratch vector renderer for single-column templates, built straight from resume data
// using jsPDF's own text/line/rect primitives instead of html2canvas. Trades pixel-perfect
// fidelity with the on-screen preview for real selectable/searchable text, genuinely clickable
// links, and a much smaller file than a rasterized page.
//
// Each template supplies a theme (see src/templates/vectorThemes.js): fonts, colours, sizes, how
// the name/contact/headings look and how each entry's two rows are laid out. Sizes/spacing are a
// hand-tuned approximation of each template's CSS, not a derived conversion — jsPDF's core fonts
// (times/helvetica/courier) don't match the web fonts' metrics exactly.

import { JAKES_THEME } from '../templates/vectorThemes.js';

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const PT_TO_MM = 25.4 / 72;

// The active theme and the page geometry derived from it. Set at the start of each export (one
// export runs at a time, synchronously after the jsPDF import).
let T;
let CONTENT_LEFT_MM;
let CONTENT_RIGHT_MM;
let CONTENT_WIDTH_MM;
let PAGE_BOTTOM_MM;
let MARGIN_TOP_MM;

function useTheme(theme) {
  T = theme;
  MARGIN_TOP_MM = theme.margins.top;
  CONTENT_LEFT_MM = theme.margins.left;
  CONTENT_RIGHT_MM = PAGE_WIDTH_MM - theme.margins.right;
  CONTENT_WIDTH_MM = CONTENT_RIGHT_MM - CONTENT_LEFT_MM;
  PAGE_BOTTOM_MM = PAGE_HEIGHT_MM - theme.margins.bottom;
}

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
  doc.setFont(
    style.font || T.font,
    style.bold && style.italic ? 'bolditalic' : style.bold ? 'bold' : style.italic ? 'italic' : 'normal'
  );
  doc.setFontSize(style.size);
  doc.setTextColor(...(style.color || T.colors.ink));
}

// Draws one span of text at (xMm, baselineMm) and, if `url` is given, lays a
// clickable link box over it and underlines it in the link color.
function drawSpan(doc, text, xMm, baselineMm, style, url) {
  setStyle(doc, style);
  if (url) doc.setTextColor(...T.colors.link);
  doc.text(text, xMm, baselineMm);
  const width = doc.getTextWidth(text);
  if (url) {
    const boxTop = baselineMm - style.size * PT_TO_MM * 0.8;
    const boxHeight = style.size * PT_TO_MM * 1.05;
    doc.link(xMm, boxTop, width, boxHeight, { url });
    doc.setDrawColor(...T.colors.link);
    doc.setLineWidth(0.15);
    doc.line(xMm, baselineMm + 0.5, xMm + width, baselineMm + 0.5);
  }
  return width;
}

// Width of a run of spans, each in its own style.
function runWidth(doc, spans) {
  return spans.reduce((sum, span) => {
    setStyle(doc, span.style);
    return sum + doc.getTextWidth(span.text);
  }, 0);
}

function alignedX(width) {
  if (T.align === 'center') return CONTENT_LEFT_MM + (CONTENT_WIDTH_MM - width) / 2;
  return CONTENT_LEFT_MM;
}

function drawName(doc, cursor, name) {
  const style = T.style.name;
  ensureSpace(doc, cursor, style.lineMm);
  cursor.y += style.lineMm * 0.75;
  const text = name || 'Name Surname';
  if (T.name?.split) {
    // First name(s) in the light style, last name in bold.
    const parts = text.trim().split(/\s+/);
    const last = parts.length > 1 ? parts.pop() : '';
    const spans = [
      { text: parts.join(' ') + (last ? ' ' : ''), style: T.style.nameLight },
      { text: last, style },
    ].filter((s) => s.text);
    let x = alignedX(runWidth(doc, spans));
    spans.forEach((span) => {
      x += drawSpan(doc, span.text, x, cursor.y, span.style);
    });
  } else {
    const shown = T.name?.upper ? text.toUpperCase() : text;
    setStyle(doc, style);
    drawSpan(doc, shown, alignedX(doc.getTextWidth(shown)), cursor.y, style);
  }
  cursor.y += style.lineMm * 0.35;
}

function drawHeadline(doc, cursor, title) {
  if (!T.style.headline || isEmpty(title)) return;
  const style = T.style.headline;
  const text = T.headlineUpper ? title.toUpperCase() : title;
  ensureSpace(doc, cursor, style.lineMm);
  cursor.y += style.lineMm * 0.8;
  setStyle(doc, style);
  drawSpan(doc, text, alignedX(doc.getTextWidth(text)), cursor.y, style);
  cursor.y += style.lineMm * 0.2;
}

function contactParts(personal) {
  const parts = [];
  for (const key of T.contactKeys) {
    const value = personal[key];
    if (isEmpty(value)) continue;
    if (key === 'phone') parts.push({ text: value, url: `tel:${value.replace(/[^\d+]/g, '')}` });
    else if (key === 'email') parts.push({ text: value, url: `mailto:${value}` });
    else if (key === 'linkedin' || key === 'website') parts.push({ text: value, url: normalizeUrl(value) });
    else parts.push({ text: value });
  }
  return parts;
}

// Contact details on one line: Jake's grey full-width bar, or plain text for other themes.
function drawContactLine(doc, cursor, personal) {
  const style = T.style.contact;
  const parts = contactParts(personal);
  const separator = T.contactSeparator;
  const sepStyle = T.style.contactSeparator || style;

  if (T.contactBar) {
    const barHeight = style.lineMm + 2;
    ensureSpace(doc, cursor, barHeight + 2);
    cursor.y += 1.5;
    doc.setFillColor(...T.colors.contactBg);
    doc.rect(0, cursor.y, PAGE_WIDTH_MM, barHeight, 'F');
    const baseline = cursor.y + barHeight / 2 + style.size * PT_TO_MM * 0.35;
    let x = CONTENT_LEFT_MM;
    parts.forEach((part, index) => {
      x += drawSpan(doc, part.text, x, baseline, style, part.url);
      if (index < parts.length - 1) {
        x += drawSpan(doc, separator, x, baseline, sepStyle);
      }
    });
    cursor.y += barHeight + 3.7;
    return;
  }

  if (!parts.length) {
    cursor.y += 2;
    return;
  }
  // Plain line(s): wrap onto a second line when the details don't fit.
  const lines = [[]];
  let width = 0;
  setStyle(doc, style);
  const sepWidth = runWidth(doc, [{ text: separator, style: sepStyle }]);
  parts.forEach((part) => {
    setStyle(doc, style);
    const w = doc.getTextWidth(part.text);
    const current = lines[lines.length - 1];
    if (current.length && width + sepWidth + w > CONTENT_WIDTH_MM) {
      lines.push([part]);
      width = w;
    } else {
      width += (current.length ? sepWidth : 0) + w;
      current.push(part);
    }
  });
  lines.forEach((line) => {
    ensureSpace(doc, cursor, style.lineMm);
    cursor.y += style.lineMm * 0.85;
    const spans = line.flatMap((part, i) => [
      ...(i ? [{ text: separator, style: sepStyle }] : []),
      { text: part.text, style, url: part.url },
    ]);
    let x = alignedX(runWidth(doc, spans));
    spans.forEach((span) => {
      x += drawSpan(doc, span.text, x, cursor.y, span.style, span.url);
    });
    cursor.y += style.lineMm * 0.15;
  });
  cursor.y += T.afterContactMm;
}

function headingHeight() {
  return (T.heading.spaceBeforeMm || 0) + T.style.h2.lineMm * 0.8 + 1.2 + 2.2;
}

function drawSectionHeading(doc, cursor, title) {
  const style = T.style.h2;
  ensureSpace(doc, cursor, style.lineMm + 3);
  // Breathing room above the heading, unless it's the first thing on a page.
  if (cursor.y > MARGIN_TOP_MM + 0.1) cursor.y += T.heading.spaceBeforeMm || 0;
  cursor.y += style.lineMm * 0.8;
  const text = T.heading.upper ? title.toUpperCase() : title;
  let x = CONTENT_LEFT_MM;
  if (T.heading.lead) {
    // The first few letters in the accent colour (Awesome-CV style).
    const n = T.heading.lead.chars;
    x += drawSpan(doc, text.slice(0, n), x, cursor.y, { ...style, color: T.heading.lead.color });
    x += drawSpan(doc, text.slice(n), x, cursor.y, style);
  } else {
    x += drawSpan(doc, text, x, cursor.y, style);
  }
  if (T.heading.rule === 'below') {
    const underlineY = cursor.y + 1.2;
    doc.setDrawColor(...T.colors.border);
    doc.setLineWidth(T.heading.ruleWidth ?? 0.15);
    doc.line(CONTENT_LEFT_MM, underlineY, CONTENT_RIGHT_MM, underlineY);
  } else if (T.heading.rule === 'after') {
    const midY = cursor.y - style.size * PT_TO_MM * 0.3;
    doc.setDrawColor(...T.colors.border);
    doc.setLineWidth(T.heading.ruleWidth ?? 0.2);
    doc.line(x + 2, midY, CONTENT_RIGHT_MM, midY);
  }
  cursor.y = cursor.y + 1.2 + 2.2;
}

// One row of an entry header: left text (wrapping to leave room for the right-aligned text on
// its first line only) and optional right text. Pure layout, shared by measuring and drawing.
function layoutRow(doc, row) {
  const leftStyle = T.style[row.leftStyle || 'row'];
  const rightStyle = T.style[row.rightStyle || row.leftStyle || 'row'];
  setStyle(doc, rightStyle);
  const rightWidth = row.right ? doc.getTextWidth(row.right) : 0;
  const gap = row.right ? 4 : 0;
  setStyle(doc, leftStyle);
  const firstLineMaxWidth = Math.max(CONTENT_WIDTH_MM - rightWidth - gap, CONTENT_WIDTH_MM * 0.35);
  const narrowLines = doc.splitTextToSize(row.left || '', firstLineMaxWidth);
  const lines =
    narrowLines.length > 1
      ? [narrowLines[0], ...doc.splitTextToSize(narrowLines.slice(1).join(' '), CONTENT_WIDTH_MM)]
      : narrowLines;
  return { lines, leftStyle, rightStyle, height: lines.length * leftStyle.lineMm };
}

// An entry's header is up to two rows (e.g. title + dates, then employer + place). Which text
// goes where comes from the theme.
function layoutEntryHeader(doc, spec) {
  const rows = [spec.top, spec.sub].filter((row) => row && (row.left || row.right));
  const layouts = rows.map((row) => ({ row, ...layoutRow(doc, row) }));
  return { layouts, height: layouts.reduce((sum, l) => sum + l.height, 0) };
}

function drawEntryHeader(doc, cursor, spec) {
  const { layouts, height } = layoutEntryHeader(doc, spec);
  ensureSpace(doc, cursor, height);
  layouts.forEach(({ row, lines, leftStyle, rightStyle }) => {
    lines.forEach((line, index) => {
      cursor.y += leftStyle.lineMm * 0.72;
      drawSpan(doc, line, CONTENT_LEFT_MM, cursor.y, leftStyle);
      if (index === 0 && row.right) {
        setStyle(doc, rightStyle);
        doc.text(row.right, CONTENT_RIGHT_MM, cursor.y, { align: 'right' });
      }
      cursor.y += leftStyle.lineMm * 0.28;
    });
  });
}

// Pure layout computation for a bullet list — same reasoning as
// layoutEntryHeader above: one source of truth for both measuring and
// drawing.
function layoutBullets(doc, bullets) {
  const style = T.style.bullet;
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
        setStyle(doc, T.style.bulletMark || style);
        doc.text(T.bulletMark, CONTENT_LEFT_MM, cursor.y);
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
    drawEntryHeader(doc, cursor, T.entries.education(edu));
    cursor.y += 1.5;
  });
}

function drawExperience(doc, cursor, experience) {
  experience.forEach((job) => {
    drawEntryHeader(doc, cursor, T.entries.experience(job));
    cursor.y += 0.8;
    drawBullets(doc, cursor, job.bullets);
    cursor.y += 1.5;
  });
}

function drawProjects(doc, cursor, projects) {
  projects.forEach((proj) => {
    drawEntryHeader(doc, cursor, T.entries.projects(proj));
    cursor.y += 0.8;
    drawBullets(doc, cursor, proj.bullets);
    cursor.y += 1.5;
  });
}

// Skills: "Category | items" on a line (wrapping under the line start), or a two-column table
// with the category in a fixed-width column.
function skillLayout(doc, group) {
  const style = T.style.skillCategory;
  const itemsStyle = T.style.body;
  setStyle(doc, style);
  if (T.skills.table) {
    const itemsX = CONTENT_LEFT_MM + T.skills.table;
    setStyle(doc, itemsStyle);
    const lines = group.items ? doc.splitTextToSize(group.items, CONTENT_RIGHT_MM - itemsX) : [''];
    return { table: true, itemsX, lines, height: style.lineMm + (lines.length - 1) * itemsStyle.lineMm };
  }
  const categoryWidth = doc.getTextWidth(group.category || '');
  setStyle(doc, T.style.skillSeparator || style);
  const sepWidth = group.items ? doc.getTextWidth(T.skills.separator) : 0;
  const x = CONTENT_LEFT_MM + categoryWidth + sepWidth;
  setStyle(doc, itemsStyle);
  const lines = group.items ? doc.splitTextToSize(group.items, CONTENT_RIGHT_MM - x) : [];
  return { table: false, lines, height: style.lineMm + Math.max(0, lines.length - 1) * itemsStyle.lineMm };
}

function drawSkills(doc, cursor, skills) {
  const style = T.style.skillCategory;
  const itemsStyle = T.style.body;
  skills
    .filter((group) => group.category || group.items)
    .forEach((group) => {
      const layout = skillLayout(doc, group);
      ensureSpace(doc, cursor, style.lineMm);
      cursor.y += style.lineMm * 0.75;
      if (layout.table) {
        setStyle(doc, style);
        doc.text(group.category || '', layout.itemsX - 3, cursor.y, { align: 'right' });
        layout.lines.forEach((line, i) => {
          if (i > 0) {
            cursor.y += itemsStyle.lineMm;
            ensureSpace(doc, cursor, itemsStyle.lineMm);
          }
          drawSpan(doc, line, layout.itemsX, cursor.y, itemsStyle);
        });
      } else {
        let x = CONTENT_LEFT_MM;
        x += drawSpan(doc, group.category || '', x, cursor.y, style);
        if (group.items) {
          x += drawSpan(doc, T.skills.separator, x, cursor.y, T.style.skillSeparator || style);
          drawSpan(doc, layout.lines[0], x, cursor.y, itemsStyle);
          for (let i = 1; i < layout.lines.length; i++) {
            cursor.y += itemsStyle.lineMm;
            ensureSpace(doc, cursor, itemsStyle.lineMm);
            drawSpan(doc, layout.lines[i], CONTENT_LEFT_MM, cursor.y, itemsStyle);
          }
        }
      }
      cursor.y += style.lineMm * 0.25;
    });
}

function drawSummary(doc, cursor, summary) {
  const style = T.style.body;
  setStyle(doc, style);
  const lines = doc.splitTextToSize(summary, CONTENT_WIDTH_MM);
  lines.forEach((line) => {
    ensureSpace(doc, cursor, style.lineMm);
    cursor.y += style.lineMm * 0.72;
    drawSpan(doc, line, CONTENT_LEFT_MM, cursor.y, style);
    cursor.y += style.lineMm * 0.28;
  });
}

function measureSummaryHeight(doc, summary) {
  const style = T.style.body;
  setStyle(doc, style);
  return doc.splitTextToSize(summary, CONTENT_WIDTH_MM).length * style.lineMm;
}

function measureEducationHeight(doc, education) {
  return education.reduce(
    (sum, edu) => sum + layoutEntryHeader(doc, T.entries.education(edu)).height + 1.5,
    0
  );
}

function measureWithBullets(doc, list, specFor) {
  return list.reduce((sum, item) => {
    const { height } = layoutEntryHeader(doc, specFor(item));
    const { totalHeight } = layoutBullets(doc, item.bullets);
    return sum + height + 0.8 + totalHeight + 1.5;
  }, 0);
}

function measureSkillsHeight(doc, skills) {
  const style = T.style.skillCategory;
  return skills
    .filter((group) => group.category || group.items)
    .reduce((sum, group) => sum + skillLayout(doc, group).height + style.lineMm * 0.25, 0);
}

// Starts a section on this page or the next. A short section (a quarter page or less) is kept
// together; a longer one starts here as long as its heading and first entry fit — the rest then
// flows onto the next page entry by entry. Mirrors paginate.js, used for the on-screen preview.
function placeSection(doc, cursor, headingText, contentHeight, firstEntryHeight) {
  const remaining = PAGE_BOTTOM_MM - cursor.y;
  const pageHeight = PAGE_BOTTOM_MM - MARGIN_TOP_MM;
  const fullHeight = headingHeight() + contentHeight;
  const pageIsEmpty = cursor.y <= MARGIN_TOP_MM + 0.1;
  const needed = fullHeight <= pageHeight / 4 ? fullHeight : headingHeight() + firstEntryHeight;
  if (needed > remaining && !pageIsEmpty) {
    doc.addPage();
    cursor.y = MARGIN_TOP_MM;
  }
  drawSectionHeading(doc, cursor, headingText);
}

const SECTIONS = {
  summary: {
    present: (r) => !isEmpty(r.summary),
    measure: (doc, r) => measureSummaryHeight(doc, r.summary),
    first: (doc, r) => measureSummaryHeight(doc, r.summary),
    draw: (doc, cursor, r) => drawSummary(doc, cursor, r.summary),
  },
  education: {
    present: (r) => Boolean(r.education?.length),
    measure: (doc, r) => measureEducationHeight(doc, r.education),
    first: (doc, r) => measureEducationHeight(doc, r.education.slice(0, 1)),
    draw: (doc, cursor, r) => drawEducation(doc, cursor, r.education),
  },
  experience: {
    present: (r) => Boolean(r.experience?.length),
    measure: (doc, r) => measureWithBullets(doc, r.experience, T.entries.experience),
    first: (doc, r) => measureWithBullets(doc, r.experience.slice(0, 1), T.entries.experience),
    draw: (doc, cursor, r) => drawExperience(doc, cursor, r.experience),
  },
  projects: {
    present: (r) => Boolean(r.projects?.length),
    measure: (doc, r) => measureWithBullets(doc, r.projects, T.entries.projects),
    first: (doc, r) => measureWithBullets(doc, r.projects.slice(0, 1), T.entries.projects),
    draw: (doc, cursor, r) => drawProjects(doc, cursor, r.projects),
  },
  skills: {
    present: (r) => Boolean(r.skills?.length),
    measure: (doc, r) => measureSkillsHeight(doc, r.skills),
    first: (doc, r) => measureSkillsHeight(doc, r.skills.slice(0, 1)),
    draw: (doc, cursor, r) => drawSkills(doc, cursor, r.skills),
  },
};

// Builds the PDF for `resume` in the given theme and returns the jsPDF document.
export async function buildVectorPdf(resume, theme) {
  const { jsPDF } = await import('jspdf');
  useTheme(theme);
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const cursor = createCursor();
  const personal = resume.personal || {};

  drawName(doc, cursor, personal.name);
  drawHeadline(doc, cursor, personal.title);
  drawContactLine(doc, cursor, personal);

  for (const key of theme.order) {
    const section = SECTIONS[key];
    if (!section.present(resume)) continue;
    placeSection(
      doc,
      cursor,
      theme.titles[key],
      section.measure(doc, resume),
      section.first(doc, resume)
    );
    section.draw(doc, cursor, resume);
  }
  return doc;
}

// Doesn't gate on isProEnabled itself — callers may also unlock this via a
// promo code, so authorization is entirely the caller's responsibility.
export async function downloadAsPdfSuperPremium(resume, filename = 'resume.pdf', theme) {
  const doc = await buildVectorPdf(resume, theme || JAKES_THEME);
  doc.save(filename);
}
