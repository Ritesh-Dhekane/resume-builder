// Talks to the dev-only history endpoint (server/devMiddleware.js). On the
// deployed static site there's no server, so this simply fails and callers
// fall back to a localStorage + JSON download flow.

export async function saveResumeToHistory(resume) {
  try {
    const res = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// public/data/history.json and public/gallery/manifest.json are static
// files: committed snapshots served as-is by both the dev server and the
// deployed build (files outside public/ don't survive `vite build`).

export async function fetchHistory() {
  try {
    const res = await fetch('/data/history.json');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchGalleryManifest() {
  try {
    const res = await fetch('/gallery/manifest.json');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
