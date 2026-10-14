# appfros.ch

Personal website of Andreas Seeger, built with [Astro](https://astro.build).

## Licensing

This repository is **source-available** and split into two parts:

- **Code** — everything *except* the content/assets listed below (Astro
  components, layouts, styles, config, build scripts) is licensed under the
  **[MIT License](./LICENSE)**. You are welcome to reuse it.
- **Content & branding** — all site **content and creative assets are
  © 2026 Appfrosch, all rights reserved**, and are **not** covered by the
  MIT License. This includes:
  - written content (`src/content/**`, page copy, project write-ups such as
    RoadTrippin / Mäxle),
  - images, icons, logos, and the **appfros** / project names and marks.

  Do not copy, republish, or reuse the content or branding without permission.

Contributions are welcome via pull request; by submitting one you agree your
**code** contribution is provided under the MIT License above.

## Development & Deployment

### Workflow

1. Develop on the `dev` branch.
2. Start the dev server with `npm run dev` (reloads on file changes).
3. Commit on `dev`.
4. Merge into `main`.
5. Push `main` — the GitHub workflow
   [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) builds
   the site and deploys it to Cyon.

### Local setup

```sh
npm install
cp .env.example .env   # public Supabase config for the beta-signup form
npm run dev
```

### Deployment setup

The deploy workflow builds the site with `npm run build` and copies `dist/`
to the Cyon host with `rsync --delete` over SSH. It needs the following
repository settings in GitHub (*Settings → Secrets and variables → Actions*):

| Name                       | Type     | Purpose                                   |
| :------------------------- | :------- | :---------------------------------------- |
| `SSH_PRIVATE_KEY`          | Secret   | Private key authorized on the Cyon host   |
| `USERNAME`                 | Secret   | SSH user on the Cyon host                 |
| `HOST`                     | Secret   | Cyon SSH hostname                         |
| `DEPLOY_PATH`              | Secret   | Target directory (web root) on the host   |
| `PUBLIC_SUPABASE_URL`      | Variable | Supabase URL for the beta-signup form     |
| `PUBLIC_SUPABASE_ANON_KEY` | Variable | Publishable Supabase key (insert-only)    |

## Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Builds the production site to `./dist/`          |
| `npm run preview`         | Previews the build locally before deploying      |
| `npm run astro ...`       | Runs CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Shows help for the Astro CLI                     |

The site was bootstrapped from Astro's
[portfolio template](https://github.com/withastro/astro/tree/latest/examples/portfolio).
