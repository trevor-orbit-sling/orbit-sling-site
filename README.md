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

- Import this `site/` project into Vercel.
- Framework preset: Next.js.
- Build command: `npm run build`
- Output directory: `out`

Vercel can also auto-detect these settings.
