# Resume Builder

A client-side resume builder: pick a template, fill in a form, get a live preview, download as an image or PDF. No backend — the deployed site is static.

## Setup

```bash
npm install
cp .env.example .env        # set VITE_PRO_ENABLED=true locally for PDF export
npm run dev
```

Visit `http://localhost:5173` (or the port Vite prints).

## Scripts

- `npm run dev` — local dev server. Also runs the dev-only middleware (`server/devMiddleware.js`) that backs the Save button and PDF uploads (see below) — this never runs against the deployed build.
- `npm run build` — production build to `dist/`, deployable as-is (GitHub Pages workflow below).
- `npm run preview` — serve the production build locally, to sanity-check it before pushing.
- `npm run gallery:manifest` — rescans `public/gallery/*.pdf` and regenerates `public/gallery/manifest.json`. Run this after manually adding/removing PDFs; the dev upload endpoint does it automatically.

## Personal workflow (local only)

- **Save** in the builder POSTs to a dev-only endpoint that appends the resume to `public/data/history.json` with a timestamp — a running history of every version you've saved, tagged with the target role/JD if you filled those in. Only works under `npm run dev`; on the deployed site, Save falls back to a browser-local copy + JSON download.
- **Uploaded PDFs**: drop old resume PDFs into `public/gallery/`, then run `npm run gallery:manifest` (or use the dev-only upload endpoint from the archive UI). These are your own reference copies — not linked from the public pages.
- **`/archive`** (password-gated) shows both: Saved Drafts (with an "Open in builder" link to reopen and tweak a past version for a different job) and Uploaded PDFs.
- **All of this is local only.** Production builds leave out `data/`, `gallery/` and the `/archive` page entirely (see `excludePersonalData` in `vite.config.js`), so the deployed site never serves your saved resumes or PDFs.

## Password gate — read this before relying on it

`/archive` only exists under `npm run dev`. It's protected by a password whose **hash** (not the plaintext) is baked into the dev bundle (`vite.config.js`, `src/pages/auth.js`) — deterrence against someone at your machine, not real security.

Note: the repo is public, so `public/data/history.json` and `public/gallery/` are still readable on GitHub itself (including their git history). Keeping them off the deployed site doesn't change that; making the repo private would.

Set the password locally in `.env.local` (gitignored): `VITE_ADMIN_PASSWORD=yourpassword`.

## Pro flag

`VITE_PRO_ENABLED` (in `.env`, not secret) gates the "Download as PDF" button — "Download as Image" is always available. Default `true` locally, `false` on the public GitHub Pages deploy (set in `deploy.yml`), so the public site ships as a free tier without touching code.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. Requires:
1. Pages enabled for this repo (Settings → Pages → Source: GitHub Actions).
