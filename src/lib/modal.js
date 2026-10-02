// While a dialog is open, the page behind it is hidden from screen readers and can't be reached
// with Tab (inert), and the dialog closes if the page changes (e.g. the browser's Back button).

function page() {
  return document.getElementById('app');
}

// Shows `backdrop` (the dialog's overlay); `close` is called when the page navigates away.
export function showModal(backdrop, close) {
  document.body.appendChild(backdrop);
  const app = page();
  if (app) {
    app.inert = true;
    app.setAttribute('aria-hidden', 'true');
  }
  backdrop._onNavigate = () => close();
  window.addEventListener('hashchange', backdrop._onNavigate);
}

export function hideModal(backdrop) {
  backdrop.remove();
  window.removeEventListener('hashchange', backdrop._onNavigate);
  if (!document.querySelector('.preview-modal-backdrop')) {
    const app = page();
    if (app) {
      app.inert = false;
      app.removeAttribute('aria-hidden');
    }
  }
}
