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
