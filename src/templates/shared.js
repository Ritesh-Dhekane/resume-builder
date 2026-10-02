// Helpers every template shares: escaping, links, bullets, and the "ghost" placeholder logic used
// by the builder's live preview (empty fields show example text, styled as `.placeholder-text`).

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isEmpty(value) {
  return !value || !String(value).trim();
}

// Renders `real` if present; otherwise, in ghost mode, renders `placeholderVal`
// wrapped so it can be styled as an example rather than the user's content.
export function renderField(real, placeholderVal, ghost) {
  if (!isEmpty(real)) return escapeHtml(real);
  if (ghost && !isEmpty(placeholderVal)) {
    return `<span class="placeholder-text">${escapeHtml(placeholderVal)}</span>`;
  }
  return '';
}

// Turns any bare http(s) URL inside plain text into a clickable link,
// escaping everything else. Trailing punctuation (periods, commas, closing
// parens) is kept outside the <a> since it's almost always sentence
// punctuation rather than part of the URL.
export function linkifyText(text) {
  const raw = String(text ?? '');
  return raw
    .split(/(https?:\/\/[^\s]+)/g)
    .map((segment) => {
      if (!/^https?:\/\//i.test(segment)) return escapeHtml(segment);
      const trailing = segment.match(/[.,;:)]+$/)?.[0] || '';
      const url = trailing ? segment.slice(0, -trailing.length) : segment;
      return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>${escapeHtml(trailing)}`;
    })
    .join('');
}

export function renderBullets(bullets, ghostCls = '') {
  const items = (bullets || []).filter((b) => b && b.trim());
  if (!items.length) return '';
  const cls = ghostCls ? ` class="${ghostCls}"` : '';
  return `<ul${cls}>${items.map((b) => `<li>${linkifyText(b)}</li>`).join('')}</ul>`;
}

// linkedin/website are stored without a protocol (e.g. "linkedin.com/in/x"),
// so the href needs one added to actually navigate anywhere.
export function normalizeUrl(value) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function contactLink(href, label) {
  return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

// Contact details as HTML pieces (links where it makes sense), in the given order. Keys:
// phone, email, location, linkedin, website. In ghost mode, empty ones show the placeholder.
export function contactParts(personal, placeholderPersonal, ghost, keys) {
  return keys
    .map((key) => {
      const value = personal[key];
      if (isEmpty(value)) return ghost ? renderField('', placeholderPersonal[key], true) : '';
      if (key === 'phone') return contactLink(`tel:${value.replace(/[^\d+]/g, '')}`, value);
      if (key === 'email') return contactLink(`mailto:${value}`, value);
      if (key === 'linkedin' || key === 'website') return contactLink(normalizeUrl(value), value);
      return escapeHtml(value);
    })
    .filter(Boolean);
}

// Which rows a list section shows: the user's own, or — in the live preview when the section is
// still empty — the placeholder's, marked so the template can style them as examples.
export function sectionRows(real, placeholderRows, ghost) {
  const useGhost = ghost && !real?.length;
  return {
    rows: useGhost ? placeholderRows || [] : real || [],
    ghostCls: useGhost ? ' placeholder-text' : '',
  };
}

// Whether each section has anything to show (real content, or placeholder content in ghost mode).
export function visibleSections(resume, ph, ghost) {
  const has = (list) => Boolean(list?.length);
  return {
    summary: !isEmpty(resume.summary) || (ghost && !isEmpty(ph.summary)),
    education: has(resume.education) || (ghost && has(ph.education)),
    experience: has(resume.experience) || (ghost && has(ph.experience)),
    projects: has(resume.projects) || (ghost && has(ph.projects)),
    skills: has(resume.skills) || (ghost && has(ph.skills)),
  };
}

export function dateRange(start, end) {
  const a = String(start ?? '').trim();
  const b = String(end ?? '').trim();
  if (a && b) return `${escapeHtml(a)} &ndash; ${escapeHtml(b)}`;
  return escapeHtml(a || b);
}

// "Name Surname" → first name(s) and last name, for templates that style them differently.
export function splitName(name) {
  const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { first: parts[0] || '', last: '' };
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] };
}
