// Google Analytics 4, loaded once for the whole app from main.js. Only runs in
// production builds served from a real host, so local dev and `vite preview`
// never reach the real property. Every function is a no-op when analytics is
// off, and nothing here throws: if Google's script is blocked or fails to load,
// gtag() just queues into dataLayer and the app carries on.
//
// Only usage is measured — never resume content, file names or promo codes.

const MEASUREMENT_ID = 'G-J8L2DDYBKM';
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

let enabled = false;

export function initAnalytics() {
  if (enabled || !import.meta.env.PROD || LOCAL_HOSTS.includes(window.location.hostname)) return;
  enabled = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are sent by trackPageView on every hash-route render instead.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

// Hash routes ('#/builder?template=…') are reported as clean virtual paths under
// the site's base ('/resume-builder/builder'), without the query string.
export function trackPageView(routePath, pageTitle) {
  if (!enabled) return;
  const path = `${import.meta.env.BASE_URL}${routePath.replace(/^\//, '')}`;
  send('page_view', {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: pageTitle,
  });
}

export function trackEvent(name, params) {
  if (!enabled) return;
  send(name, params);
}

function send(name, params) {
  try {
    window.gtag('event', name, params);
  } catch {
    // Analytics must never affect the app.
  }
}
