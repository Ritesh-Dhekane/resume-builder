import { defineConfig, loadEnv } from 'vite';
import crypto from 'node:crypto';
import { devHistoryPlugin } from './server/devMiddleware.js';

// The plaintext admin password never ships to the client — only its SHA-256
// hash is embedded in the bundle (via __ADMIN_PASSWORD_HASH__), so the
// password gate isn't readable straight out of view-source. This is
// deterrence, not real security: the repo/site are public for now.
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const adminPassword = process.env.ADMIN_PASSWORD || env.VITE_ADMIN_PASSWORD || '';
  const adminPasswordHash = adminPassword
    ? crypto.createHash('sha256').update(adminPassword).digest('hex')
    : '';

  return {
    // GitHub Pages serves this as a project site at /resume-builder/, not
    // domain root, so the production build must emit asset URLs prefixed
    // accordingly. Dev server stays at root.
    base: command === 'build' ? '/resume-builder/' : '/',
    plugins: [devHistoryPlugin()],
    define: {
      __ADMIN_PASSWORD_HASH__: JSON.stringify(adminPasswordHash),
    },
  };
});
