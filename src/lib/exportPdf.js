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
