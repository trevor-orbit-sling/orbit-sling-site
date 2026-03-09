# Orbit Sling Website (Local-First)

This is a static-exportable Next.js site you can run and edit locally, then deploy to Vercel.

## Local development

From this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static build output

```bash
npm run build
```

This generates a static site in `out/` (configured via `output: "export"`).

## Preview static build locally

```bash
npm run preview
```

This serves the `out/` directory at `http://localhost:4173`.

## Key files

- `src/app/page.tsx`: homepage structure/content
- `src/app/globals.css`: Orbit Sling brand tokens and layout styles
- `src/app/layout.tsx`: metadata, fonts, and global shell
- `next.config.ts`: static export settings for local hosting and Vercel
- `public/assets/brand/*`: logo, favicon, and team assets

## Deploy to Vercel

This repo now deploys directly to `https://orbitsling.com`.

```bash
npm run deploy:prod
```

After deploy, verify both hosts:

```bash
npm run verify:prod
```

Notes:

- `orbitsling.com` is the primary host.
- `www.orbitsling.com` should stay attached in Vercel so TLS is valid there, but it should redirect to the apex host through `vercel.json`.
- The linked Vercel project is `orbit-sling-site`.
