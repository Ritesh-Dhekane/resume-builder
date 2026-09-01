# Tasks

Build order for the resume-builder app. See the approved plan for full context. Each task may span multiple commits; commits use `TASK-XXX: <type>: <message>`.

- [ ] TASK-001: chore: scaffold Vite project (package.json, vite.config.js, .gitignore, deps: vite, html2canvas, html2pdf.js)
- [ ] TASK-002: chore: preserve current resume as 30AprilResume.html before overwriting index.html
- [ ] TASK-003: feat: resume data model (src/state/resumeSchema.js)
- [ ] TASK-004: feat: Jake's Resume template (src/templates/jakes-resume/template.js + style.css)
- [ ] TASK-005: feat: template registry (src/templates/registry.js)
- [ ] TASK-006: feat: app shell + hash router (index.html, src/main.js)
- [ ] TASK-007: feat: Template Gallery page (src/pages/gallery.js)
- [ ] TASK-008: feat: Builder page — form + live preview (src/pages/builder.js)
- [ ] TASK-009: feat: downloadAsImage + downloadAsPdf export functions, VITE_PRO_ENABLED gate (src/lib/exportImage.js, src/lib/exportPdf.js)
- [ ] TASK-010: feat: localStorage draft autosave (src/lib/storage.js)
- [ ] TASK-011: feat: dev-only history middleware + Save wiring (server/devMiddleware.js, data/history.json, src/lib/api.js)
- [ ] TASK-012: feat: gallery manifest generator + dev upload endpoint (scripts/generate-gallery-manifest.js, gallery/manifest.json)
- [ ] TASK-013: feat: password gate — build-time hash injection + client check (src/pages/auth.js)
- [ ] TASK-014: feat: Resume Archive page — Saved Drafts + Uploaded PDFs tabs (src/pages/archive.js)
- [ ] TASK-015: chore: GitHub Actions deploy.yml + .env.example + README notes on security tradeoff
