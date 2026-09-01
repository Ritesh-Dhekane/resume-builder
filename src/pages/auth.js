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

export function renderGate(container, onUnlock) {
  container.innerHTML = `
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <div class="card" style="max-width:360px;margin:60px auto;">
        <h2 style="margin-top:0;">Archive access</h2>
        <p class="page-subtitle">Enter the password to view saved drafts and uploaded PDFs.</p>
        <div class="field"><input type="password" id="gate-password" autofocus /></div>
        <button type="button" class="btn btn-primary" id="gate-submit">Unlock</button>
        <p id="gate-error" style="color:#b91c1c;font-size:12px;display:none;">Incorrect password.</p>
      </div>
    </div>
  `;

  const input = container.querySelector('#gate-password');
  const error = container.querySelector('#gate-error');

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
