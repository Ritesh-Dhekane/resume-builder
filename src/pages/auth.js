const SESSION_KEY = 'resume-builder:archive-unlocked';

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function isUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

const EYE_ICON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_ICON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 1 12s4 8 11 8a9.26 9.26 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

export function renderGate(container, onUnlock) {
  container.innerHTML = `
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <div class="card" style="max-width:360px;margin:60px auto;">
        <h2 style="margin-top:0;">Archive access</h2>
        <p class="page-subtitle">Enter the password to view saved drafts and uploaded PDFs.</p>
        <div class="field">
          <div class="password-field">
            <input type="password" id="gate-password" autofocus />
            <button type="button" class="password-toggle" id="gate-toggle" aria-label="Show password">${EYE_ICON}</button>
          </div>
        </div>
        <button type="button" class="btn btn-primary" id="gate-submit">Unlock</button>
        <p id="gate-error" style="color:#b91c1c;font-size:12px;display:none;">Incorrect password.</p>
      </div>
    </div>
  `;

  const input = container.querySelector('#gate-password');
  const error = container.querySelector('#gate-error');
  const toggle = container.querySelector('#gate-toggle');

  toggle.addEventListener('click', () => {
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    toggle.innerHTML = showing ? EYE_ICON : EYE_OFF_ICON;
    toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    input.focus();
  });

  async function attempt() {
    const hash = await sha256Hex(input.value);
    if (__ADMIN_PASSWORD_HASH__ && hash === __ADMIN_PASSWORD_HASH__) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // best-effort; unlock still proceeds for this render
      }
      onUnlock();
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }

  container.querySelector('#gate-submit').addEventListener('click', attempt);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') attempt();
  });
}
