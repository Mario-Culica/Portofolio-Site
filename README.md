# Portfolio — Mario Alexandru Culică

Personal portfolio built with React, TypeScript, Vite and Tailwind CSS. Animations use GSAP and
Framer Motion; the background video is an HLS stream played with hls.js.

## Run it locally

```bash
npm install
npm run dev
```

Production build: `npm run build` (output in `dist/`).

## Editing the content

- Contact details, links and the stats row: `src/data/site.ts`
- Project cards: the `PROJECTS` list at the top of `src/components/Works.tsx`
- Figma cards: the `DESIGNS` list in `src/components/FigmaWorks.tsx`
- Images live in `public/` (WebP, around 100 KB each)

## Deploy

The site is fully static. On Vercel it works with the default Vite settings. Security headers
(CSP and friends) are defined in `vercel.json`.
