const DRAFT_KEY = 'resume-builder:draft';
const LOCAL_HISTORY_KEY = 'resume-builder:local-history';

export function saveDraft(resume) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(resume));
  } catch {
    // localStorage unavailable (private browsing, blocked storage) — draft recovery is best-effort.
  }
}

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // best-effort
  }
}

export function appendLocalHistory(entry) {
  try {
    const list = getLocalHistory();
    list.push(entry);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(list));
  } catch {
    // best-effort
  }
}

export function getLocalHistory() {
  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
