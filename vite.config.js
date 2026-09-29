import { defineConfig, loadEnv } from 'vite';
import crypto from 'node:crypto';
import { rmSync } from 'node:fs';
import path from 'node:path';
import { devHistoryPlugin } from './server/devMiddleware.js';

// The plaintext admin password never ships to the client — only its SHA-256
// hash is embedded in the bundle (via __ADMIN_PASSWORD_HASH__), so the
// password gate isn't readable straight out of view-source. This is
// deterrence, not real security: the repo/site are public for now.
// The personal workspace (saved resume history, uploaded PDFs) lives in
// public/ so the dev server can serve it, but must never ship: production
// builds drop it after Vite copies public/ into the output folder.
function excludePersonalData() {
  let outDir;
  return {
    name: 'exclude-personal-data',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      for (const folder of ['data', 'gallery']) {
        rmSync(path.join(outDir, folder), { recursive: true, force: true });
      }
    },
  };
}

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
    plugins: [devHistoryPlugin(), excludePersonalData()],
    define: {
      __ADMIN_PASSWORD_HASH__: JSON.stringify(adminPasswordHash),
    },
  };
});
