# CLAUDE.md

Project guidance for Claude Code working in this repository (the appfros.ch website).

## Deployment rules (read before any git push)

**NEVER push to `main` without the maintainer's explicit, in-the-moment permission.**

- Pushing to `main` triggers the GitHub Actions deploy workflow (`.github/workflows/deploy.yml`),
  which builds the site and rsyncs it to the production server. A push to `main` **is** a production deploy.
- "Explicit permission" means the maintainer says so for *this* change. Prior approval of a change,
  approval to commit, or a green build does **not** imply approval to push `main`. Ask every time.
- The maintainer **always** wants to spin up and inspect a dev/preview version of changes first.
  Default workflow: commit to a feature branch → run the site locally (`npm run dev`) or otherwise
  preview it → let the maintainer inspect → only then, with explicit permission, push to `main`.
- Pushing feature branches (anything other than `main`) is fine and does not deploy.

## Build / preview

- Install: `npm ci`
- Dev server: `npm run dev`
- Production build (what CI runs): `npm run build` — output in `dist/`
