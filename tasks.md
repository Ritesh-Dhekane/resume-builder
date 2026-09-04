# Tasks

Build order for the resume-builder app. See the approved plan for full context. Each task may span multiple commits; commits use `TASK-XXX: <type>: <message>`.

- [x] TASK-001: chore: scaffold Vite project (package.json, vite.config.js, .gitignore, deps: vite, html2canvas, html2pdf.js)
- [x] TASK-002: chore: preserve current resume as 30AprilResume.html before overwriting index.html
- [x] TASK-003: feat: resume data model (src/state/resumeSchema.js)
- [x] TASK-004: feat: Jake's Resume template (src/templates/jakes-resume/template.js + style.css)
- [x] TASK-005: feat: template registry (src/templates/registry.js)
- [x] TASK-006: feat: app shell + hash router (index.html, src/main.js)
- [x] TASK-007: feat: Template Gallery page (src/pages/gallery.js)
- [x] TASK-008: feat: Builder page — form + live preview (src/pages/builder.js)
- [x] TASK-009: feat: downloadAsImage + downloadAsPdf export functions, VITE_PRO_ENABLED gate (src/lib/exportImage.js, src/lib/exportPdf.js)
- [x] TASK-010: feat: localStorage draft autosave (src/lib/storage.js)
- [x] TASK-011: feat: dev-only history middleware + Save wiring (server/devMiddleware.js, public/data/history.json, src/lib/api.js)
- [x] TASK-012: feat: gallery manifest generator + dev upload endpoint (scripts/generate-gallery-manifest.js, public/gallery/manifest.json)
- [x] TASK-013: feat: password gate — build-time hash injection + client check (src/pages/auth.js)
- [x] TASK-014: feat: Resume Archive page — Saved Drafts + Uploaded PDFs tabs (src/pages/archive.js)
- [x] TASK-015: chore: GitHub Actions deploy.yml + .env.example + README notes on security tradeoff
- [x] TASK-016: feat: larger gallery thumbnails + a "Preview" button showing the full template in a modal
- [x] TASK-017: feat: ghost/placeholder content in the builder's live preview
- [x] TASK-018: feat: widen the builder's form/preview layout
- [x] TASK-019: feat: hide Save Info fields on the deployed build (import.meta.env.DEV)
- [x] TASK-018b: fix: builder preview now scales to fit its column, form column widened for real
- [x] TASK-018c: fix: builder grid to 30/70 form/preview split on desktop
- [x] TASK-018d: fix: let builder preview scale up to fill wide column, capped at 1.6x
- [x] TASK-021: fix: mobile optimization pass across gallery, builder, archive, preview modal
- [x] TASK-022: feat: show/hide toggle on the archive password field
- [x] TASK-023: feat: paginate the builder's live preview into real A4 pages
- [ ] TASK-024: feat: make the exported PDF match the on-screen pages exactly

Note: TASK-011/TASK-012 originally targeted `data/history.json` and `gallery/manifest.json` at the repo root; both moved under `public/` during TASK-014 because Vite only ships `public/` into the production build.
