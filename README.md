# Resume Builder

[![Live site](https://img.shields.io/badge/live-open%20the%20app-2ea44f?logo=googlechrome&logoColor=white)](https://ritesh-dhekane.github.io/resume-builder/)
[![Deploy](https://github.com/Ritesh-Dhekane/resume-builder/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ritesh-Dhekane/resume-builder/actions/workflows/deploy.yml)
[![License](https://img.shields.io/github/license/Ritesh-Dhekane/resume-builder)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/Ritesh-Dhekane/resume-builder)](https://github.com/Ritesh-Dhekane/resume-builder/commits)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white)

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

## Templates

Five templates: **Jake's Resume** (tech), **Classic** (Harvard style), **Two-Column** (sidebar),
**Bold** and **Minimal**. Your content stays when you switch templates in the builder.

Show, hide or reorder them in `src/templates/templates.json`:

```json
{ "id": "classic", "visible": false }
```

Hidden templates disappear from the gallery and the builder's template picker; a link to one opens
the first visible template instead. Rebuild/redeploy after editing.

Adding a template: create `src/templates/<id>/template.js` (exports `render(resume, placeholder)`)
and `style.css`, register it in `src/templates/registry.js` (root class, page padding, layout,
optional Super Premium theme in `vectorThemes.js`), and list it in `templates.json`.
Single-column templates render a header and then one `<section>` (`<h2>` + entries) per part, so
pages break between entries; see `src/lib/paginate.js` for the sidebar layout.

Super Premium (text-based PDF) is available for every template except Two-Column.

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

## License

[MIT](LICENSE) © 2026 Ritesh Dhekane
