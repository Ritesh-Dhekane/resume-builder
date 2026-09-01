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
- **`/archive`** (password-gated, not linked from the public pages) shows both: Saved Drafts (with an "Open in builder" link to reopen and tweak a past version for a different job) and Uploaded PDFs.

## Password gate — read this before relying on it

`/archive` is protected by a password whose **hash** (not the plaintext) is baked into the built JS bundle at build time (`vite.config.js`, `src/pages/auth.js`). This is **deterrence, not real security**: the repo and the deployed GitHub Pages site are both public, so `public/data/history.json` and `public/gallery/*.pdf` are directly fetchable by anyone who has (or guesses) the URL, regardless of whether they pass the password prompt. If you need real access control, make the repo private and use a hosting setup that actually restricts access to it (private GitHub Pages requires GitHub Pro/Team/Enterprise; Netlify has its own private-site options).

Set the password:
- **Locally**: `.env.local` (gitignored) → `VITE_ADMIN_PASSWORD=yourpassword`
- **In CI**: repo secret `ADMIN_PASSWORD` (see `.github/workflows/deploy.yml`) — never committed.

## Pro flag

`VITE_PRO_ENABLED` (in `.env`, not secret) gates the "Download as PDF" button — "Download as Image" is always available. Default `true` locally, `false` on the public GitHub Pages deploy (set in `deploy.yml`), so the public site ships as a free tier without touching code.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`. Requires:
1. Pages enabled for this repo (Settings → Pages → Source: GitHub Actions).
2. Repo secret `ADMIN_PASSWORD` set (Settings → Secrets and variables → Actions).

## Task tracking

See `tasks.md` for the build breakdown (`TASK-001`, `TASK-002`, ...) and the commit convention used in this repo's history.
