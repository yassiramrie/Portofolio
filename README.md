# web-yassir

Cloud / DevOps journey portfolio — Next.js 15 + React 19 + Tailwind CSS v4 + React Three Fiber.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## What's implemented

- **Phase 1** — Next.js 15 scaffold (App Router, TypeScript, Tailwind v4).
- **Phase 2** — Root layout, navbar with mobile menu, footer, page routes.
- **Phase 3** — 3D Stellar Card Gallery hero, wired to project data in
  `src/content/projects/projects.ts`. Clicking a card opens a modal with the
  project's description, tags, highlights, and links to its detail page.

## What's stubbed

`/about`, `/skills`, `/blog`, and `/contact` render placeholder pages flagged with
the plan phase that fills them in. `/projects` lists everything and
`/projects/[slug]` renders the detail page from the project data.

## Placeholders to replace

Edit `src/lib/constants.ts` and set:

- `SITE.name` — your name
- `SITE.email` — contact email
- `SITE.social.github` / `linkedin` / `twitter`
- `SITE.url` — production URL (used for OG metadata)

## Project structure

```
src/
├── app/                   # App Router pages
├── components/
│   ├── 3d/                # Stellar Card Gallery
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero
│   └── ui/                # shadcn-style primitives
├── content/projects/      # Project catalog (single source of truth)
├── lib/                   # Utilities, site constants
└── types/                 # Shared TypeScript types
```
