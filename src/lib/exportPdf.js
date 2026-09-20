import { MM_TO_PX } from '../templates/registry.js';

export const isProEnabled = import.meta.env.VITE_PRO_ENABLED === 'true';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Takes one element per page (matching the builder's own paginate() output)
// and renders each as its own full PDF page — rather than handing html2pdf.js
// one tall element and letting its automatic canvas-splitting decide where
// pages break, which wouldn't reliably match what was just shown on screen.
export async function downloadAsPdf(pageElements, filename = 'resume.pdf') {
  if (!isProEnabled) {
    throw new Error('PDF export is a pro feature (set VITE_PRO_ENABLED=true to enable).');
  }
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  for (let i = 0; i < pageElements.length; i++) {
    const canvas = await html2canvas(pageElements[i], { scale: 2, useCORS: true });
    if (i > 0) pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
  }

  pdf.save(filename);
}

// Same raster capture as downloadAsPdf, plus a real clickable link
// annotation laid over every `<a href>` in the source DOM — position read
// from getBoundingClientRect() (the page element is unscaled/untransformed
// at capture time, same assumption html2canvas itself relies on) converted
// px->mm via MM_TO_PX. Visual output and file size are identical to
// downloadAsPdf; text still isn't selectable, since it's still a raster
// image underneath.
//
// Unlike downloadAsPdf/downloadAsPdfSuperPremium, this doesn't gate on
// isProEnabled itself — callers may also unlock it via a promo code, so
// authorization is entirely the caller's responsibility.
export async function downloadAsPdfPremium(pageElements, filename = 'resume.pdf') {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i];
    const canvas = await html2canvas(pageEl, { scale: 2, useCORS: true });
    if (i > 0) pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

    const pageRect = pageEl.getBoundingClientRect();
    pageEl.querySelectorAll('a[href]').forEach((anchor) => {
      const rect = anchor.getBoundingClientRect();
      pdf.link(
        (rect.left - pageRect.left) / MM_TO_PX,
        (rect.top - pageRect.top) / MM_TO_PX,
        rect.width / MM_TO_PX,
        rect.height / MM_TO_PX,
        { url: anchor.href }
      );
    });
  }

  pdf.save(filename);
}
