export const isProEnabled = import.meta.env.VITE_PRO_ENABLED === 'true';

export async function downloadAsPdf(element, filename = 'resume.pdf') {
  if (!isProEnabled) {
    throw new Error('PDF export is a pro feature (set VITE_PRO_ENABLED=true to enable).');
  }
  const { default: html2pdf } = await import('html2pdf.js');
  await html2pdf()
    .set({
      filename,
      margin: 0,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    })
    .from(element)
    .save();
}
