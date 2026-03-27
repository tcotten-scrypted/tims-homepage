# pretty

Tim’s personal site as a **Vite + React + TypeScript** app. The production build lives under `dist/` and is suitable for static hosting (S3 + CloudFront).

## Prerequisites

- **Node.js** (see your environment; this project uses React 19 and Vite 8)
- **AWS CLI v2** (for deploy only), configured with a **named profile** for the account that owns the site bucket—so your default `AWS_PROFILE` / `[default]` credentials can stay on another account

## Install

```bash
cd pretty
npm install
```

### Boardy intro button (`boardy-intro-react`)

The site embeds **[boardy-intro-react](https://github.com/tcotten-scrypted/boardyai-cta)** (from the [boardyai-cta](https://github.com/tcotten-scrypted/boardyai-cta) monorepo) for the “get an intro via Boardy” CTA under **What I’m Building**.

The package is wired as a **`file:`** dependency pointing at:

`vendor/boardyai-cta/packages/boardy-intro-react`

That vendor tree is **not** published to npm with a prebuilt `dist/`, so after cloning or updating the submodule/folder you need a build inside the monorepo:

```bash
cd vendor/boardyai-cta
npm install
npm run build
cd ../..
npm install
```

If `vendor/boardyai-cta` is missing, clone it:

```bash
mkdir -p vendor
git clone https://github.com/tcotten-scrypted/boardyai-cta.git vendor/boardyai-cta
# then build as above
```

### React 19 and Vite aliases

The linked package may install **React 18** under its own `node_modules`. Mixing that with the app’s **React 19** produces elements React 19’s DOM runtime rejects (**[minified error #525](https://react.dev/errors/525)**—legacy `react.element` vs `react.transitional.element`).

`vite.config.ts` therefore **aliases** `react`, `react/jsx-runtime`, `react-dom`, and `react-dom/client` to this app’s `node_modules` and **dedupes** `react` / `react-dom` so the bundle uses a single React 19.

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm run deploy` | Upload `dist/` to S3 and optionally invalidate CloudFront (no build) |
| `npm run deploy:prod` | `build` then `deploy` |

`vite.config.ts` sets `base: './'` so asset URLs are relative (works at domain root or in a subpath).

## Deploy (S3 + CloudFront)

Deploy uses **`scripts/deploy-s3.mjs`**, which:

1. Syncs **`dist/`** to **`s3://$DEPLOY_S3_BUCKET/$DEPLOY_S3_PREFIX`**
2. Uses **`aws s3 sync … --delete`**: objects in the bucket/prefix that are **not** in `dist/` are **removed** so the bucket matches the app. If you need to keep extra keys in that prefix, adjust the script or use a dedicated prefix for this site only.
3. Sets **cache-control**: long-lived immutable cache for everything except `index.html` (uploaded separately with `max-age=0,must-revalidate`).
4. If **`DEPLOY_CLOUDFRONT_DISTRIBUTION_ID`** is set, creates an invalidation for **`/*`**.

### Configuration

1. Copy the example env file and edit it:

   ```bash
   cp deploy.env.example .env.deploy
   ```

2. **`.env.deploy`** is **gitignored**. Set:

   - **`DEPLOY_AWS_PROFILE`** — AWS CLI profile name for this site’s account (required by the script if neither this nor `AWS_PROFILE` is set).
   - **`DEPLOY_S3_BUCKET`** — bucket name only (no `s3://`).
   - **`DEPLOY_S3_PREFIX`** — optional; leave empty for bucket root, or e.g. `site/` for a subfolder.
   - **`DEPLOY_CLOUDFRONT_DISTRIBUTION_ID`** — optional; omit to skip invalidation.

   You can also export the same variables in your shell instead of using `.env.deploy`.

3. Ensure the profile exists:

   ```bash
   aws configure --profile your-site-profile-name
   ```

   (Or use SSO / `aws sso login --profile …` if that’s how the profile is set up.)

### IAM (typical)

The profile needs permission to:

- **S3:** `PutObject`, `DeleteObject`, and `ListBucket` on the target bucket (and prefix, if you use one).
- **CloudFront:** `cloudfront:CreateInvalidation` on the distribution (if you use invalidation).

### One-shot production deploy

```bash
npm run deploy:prod
```

Requires **`aws`** on your `PATH` and a populated **`.env.deploy`** (or equivalent env vars).

## Project layout

- `src/App.tsx` — page content
- `src/site.css` — layout and typography
- `src/main.tsx` — React entry
- `index.html` — Vite shell
- `vendor/boardyai-cta/` — source for `boardy-intro-react` (build before relying on the package)
- `scripts/deploy-s3.mjs` — deploy automation
