// Splits a rendered resume's content into an array of per-page HTML strings,
// breaking only at safe boundaries: between whole sections when possible,
// otherwise between a section's own entries (education/experience/project
// `.entry` groups, or a skills `<p>`) — never inside a bullet, row, or entry.
//
// `rootEl` must be a live, laid-out DOM node (its children's offsetHeight is
// read directly) — typically the `.jakes-resume` element rendered at true,
// unscaled size. `pageContentHeightPx` is the content budget per page, i.e.
// the A4 page height minus whatever top/bottom padding the page chrome adds
// around each page later.
export function paginate(rootEl, pageContentHeightPx) {
  const children = Array.from(rootEl.children);
  const header = children.filter((el) => el.tagName !== 'SECTION');
  const sections = children.filter((el) => el.tagName === 'SECTION');

  const headerHtml = header.map((el) => el.outerHTML).join('');
  const headerHeight = header.reduce((sum, el) => sum + el.offsetHeight, 0);

  const pages = [];
  let current = { html: headerHtml, height: headerHeight };

  function pushCurrentAndReset() {
    pages.push(current.html);
    current = { html: '', height: 0 };
  }

  function splitSectionAcrossPages(section) {
    const heading = section.querySelector(':scope > h2');
    const headingHtml = heading ? heading.outerHTML : '';
    const headingHeight = heading ? heading.offsetHeight : 0;
    const entries = Array.from(section.children).filter((el) => el !== heading);

    // Never strand a heading alone at the bottom of a page with none of its
    // content — start fresh if even the heading itself won't fit here.
    if (current.html && pageContentHeightPx - current.height < headingHeight) {
      pushCurrentAndReset();
    }

    let index = 0;
    while (index < entries.length) {
      let chunkHtml = headingHtml;
      let chunkHeight = headingHeight;
      let placedCount = 0;

      while (index < entries.length) {
        const entry = entries[index];
        const entryHeight = entry.offsetHeight;
        const spaceLeft = pageContentHeightPx - current.height - chunkHeight;
        // Always place at least one entry per chunk, even if it overflows —
        // otherwise a single entry taller than a page would loop forever.
        if (entryHeight <= spaceLeft || placedCount === 0) {
          chunkHtml += entry.outerHTML;
          chunkHeight += entryHeight;
          index += 1;
          placedCount += 1;
        } else {
          break;
        }
      }

      current.html += `<section>${chunkHtml}</section>`;
      current.height += chunkHeight;

      if (index < entries.length) {
        pushCurrentAndReset();
      }
    }
  }

  function placeSection(section) {
    const sectionHeight = section.offsetHeight;
    const remaining = pageContentHeightPx - current.height;

    if (sectionHeight <= remaining) {
      current.html += section.outerHTML;
      current.height += sectionHeight;
      return;
    }

    if (sectionHeight <= pageContentHeightPx && current.html) {
      // Doesn't fit in what's left here, but fits whole on a fresh page —
      // move it rather than splitting it unnecessarily.
      pushCurrentAndReset();
      current.html += section.outerHTML;
      current.height += sectionHeight;
      return;
    }

    splitSectionAcrossPages(section);
  }

  sections.forEach(placeSection);
  pages.push(current.html);

  return pages.filter((html) => html && html.trim());
}
