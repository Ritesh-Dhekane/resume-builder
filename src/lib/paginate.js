// Splits a rendered resume's content into an array of per-page HTML strings,
// breaking only at safe boundaries: between whole sections when possible,
// otherwise between a section's own entries (education/experience/project
// `.entry` groups, or a skills line) — never inside a bullet, row, or entry.
//
// `rootEl` must be a live, laid-out DOM node (heights are read directly) —
// the template's root element rendered at true, unscaled size.
// `pageContentHeightPx` is the content budget per page, i.e. the A4 page
// height minus the template's own top/bottom padding.
//
// Two layouts:
// - single column: header elements, then <section>s (each an <h2> plus entries);
// - sidebar (`.cols` with `.col-main` and `.col-side`): the header and the whole
//   sidebar stay on page one, and the main column's sections flow across pages.

// Height including vertical margins (sibling margins can collapse, so this errs on the safe side
// — a page is never overfilled).
function outerHeight(el) {
  const style = getComputedStyle(el);
  return el.offsetHeight + parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
}

// A section element's opening/closing tags with new inner content (keeps its class/attributes).
function withContent(section, innerHtml) {
  const shell = section.cloneNode(false);
  shell.innerHTML = innerHtml;
  return shell.outerHTML;
}

// Flows sections into pages. The first page has `firstBudget` px, later pages `budget` px.
// Returns one HTML string per page (sections only).
function flowSections(sections, firstBudget, budget) {
  const pages = [];
  // Page one already holds the header (when there is one), so it counts as started.
  let current = { html: '', height: 0, budget: firstBudget, started: firstBudget < budget };

  function pushCurrentAndReset() {
    pages.push(current.html);
    current = { html: '', height: 0, budget, started: false };
  }

  const pageIsEmpty = () => !current.html && !current.started;

  // Splits a section between its entries: as many as fit go on this page (with the heading), the
  // rest continue on the next page under a repeated heading. An entry is never split.
  function splitSectionAcrossPages(section) {
    const heading = section.querySelector(':scope > h2');
    const headingHtml = heading ? heading.outerHTML : '';
    const headingHeight = heading ? outerHeight(heading) : 0;
    const entries = Array.from(section.children).filter((el) => el !== heading);

    let index = 0;
    while (index < entries.length) {
      let chunkHtml = headingHtml;
      let chunkHeight = headingHeight;
      let placedCount = 0;

      while (index < entries.length) {
        const entry = entries[index];
        const entryHeight = outerHeight(entry);
        const spaceLeft = current.budget - current.height - chunkHeight;
        // On an empty page the first entry goes in even if it's taller than the page —
        // otherwise a single huge entry would loop forever.
        if (entryHeight <= spaceLeft || (placedCount === 0 && pageIsEmpty())) {
          chunkHtml += entry.outerHTML;
          chunkHeight += entryHeight;
          index += 1;
          placedCount += 1;
        } else {
          break;
        }
      }

      if (placedCount === 0) {
        // Not even the heading and the next entry fit here: continue on a fresh page (a heading
        // is never left alone at the bottom of a page).
        pushCurrentAndReset();
        continue;
      }

      current.html += withContent(section, chunkHtml);
      current.height += chunkHeight;

      if (index < entries.length) {
        pushCurrentAndReset();
      }
    }
  }

  // Short sections (a quarter page or less) move to the next page whole rather than being split.
  const SMALL_SECTION = budget / 4;

  function placeSection(section) {
    const sectionHeight = outerHeight(section);
    const remaining = current.budget - current.height;

    if (sectionHeight <= remaining) {
      current.html += section.outerHTML;
      current.height += sectionHeight;
      return;
    }

    if (sectionHeight <= SMALL_SECTION && !pageIsEmpty()) {
      pushCurrentAndReset();
      current.html += section.outerHTML;
      current.height += sectionHeight;
      return;
    }

    splitSectionAcrossPages(section);
  }

  sections.forEach(placeSection);
  pages.push(current.html);
  return pages;
}

function paginateSingle(rootEl, pageContentHeightPx) {
  const children = Array.from(rootEl.children);
  const header = children.filter((el) => el.tagName !== 'SECTION');
  const sections = children.filter((el) => el.tagName === 'SECTION');
  const headerHtml = header.map((el) => el.outerHTML).join('');
  const headerHeight = header.reduce((sum, el) => sum + outerHeight(el), 0);

  const pages = flowSections(sections, pageContentHeightPx - headerHeight, pageContentHeightPx);
  pages[0] = headerHtml + pages[0];
  return pages.filter((html) => html && html.trim());
}

function paginateSidebar(rootEl, pageContentHeightPx) {
  const cols = rootEl.querySelector(':scope > .cols');
  const main = cols.querySelector(':scope > .col-main');
  const side = cols.querySelector(':scope > .col-side');
  const header = Array.from(rootEl.children).filter((el) => el !== cols);
  const headerHtml = header.map((el) => el.outerHTML).join('');
  const headerHeight = header.reduce((sum, el) => sum + outerHeight(el), 0);
  const colsStyle = getComputedStyle(cols);
  const colsMargin = parseFloat(colsStyle.marginTop || 0) + parseFloat(colsStyle.marginBottom || 0);

  const sections = Array.from(main.children);
  // Every page repeats the column block (and its margin); page one also has the header.
  const pages = flowSections(
    sections,
    pageContentHeightPx - headerHeight - colsMargin,
    pageContentHeightPx - colsMargin
  );
  return pages.map(
    (html, i) =>
      (i === 0 ? headerHtml : '') +
      withContent(cols, withContent(main, html) + withContent(side, i === 0 ? side.innerHTML : ''))
  );
}

export function paginate(rootEl, pageContentHeightPx, layout = 'single') {
  return layout === 'sidebar'
    ? paginateSidebar(rootEl, pageContentHeightPx)
    : paginateSingle(rootEl, pageContentHeightPx);
}
