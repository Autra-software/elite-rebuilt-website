# Elite Rebuilt Inspections website

Website for Elite Rebuilt Inspections, an FLHSMV-certified rebuilt title inspection office in Miami.
Live site: https://www.eliterebuilt.com

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.
The inspection request form posts to Formspree.

## Run locally

Requirements: Node.js 20.9 or newer (22 LTS recommended).

```powershell
npm ci          # install exact dependency versions from package-lock.json
npm run dev     # development server with hot reload
```

Open http://localhost:3000.

To check the production build before pushing:

```powershell
npm run lint
npm run build
npm run start   # serves the production build at http://localhost:3000
```

Useful URLs to check locally:

- http://localhost:3000/sitemap.xml
- http://localhost:3000/robots.txt
- View the page source and search for `application/ld+json` to see the business details Google reads.

## Languages

- English is served at `/` and Spanish at `/es`. The header and footer have a language switch.
- All page text lives in `app/i18n/en.ts` and `app/i18n/es.ts` (same structure). Edit text there, not in the components.
- Have a native Spanish speaker review `es.ts` before going live.

## Photos

The "Our Miami office" section has four photo slots. Drop real photos into `public/images/photos/`
with the file names listed in `public/images/photos/README.md` and they replace the placeholders
automatically.

## Content that needs confirmation

Some content is not confirmed by the business yet (what to bring, fee, inspection time, failed
inspections, Spanish service). It is marked `pending: true` in `app/i18n/*.ts`.

- `npm run dev` shows it with a yellow "Needs confirmation" tag, plus photo placeholders.
- `npm run build` (production) hides it, and hides the photo section until photos exist.
- To preview a production build with it visible: `$env:SHOW_PENDING="1"; npm run build` (PowerShell).

Once a fact is confirmed, update the text and set `pending: false`.

## Project layout

- `app/page.tsx`, `app/es/page.tsx`: English and Spanish home pages
- `app/components/`: page sections, booking form, photo slots and pending-content helpers
- `app/i18n/`: all page text in English and Spanish
- `app/layout.tsx`: page title, description and sharing tags
- `app/site.ts`: business name, phone, address and site URL in one place
- `app/structured-data.tsx`: business details for search engines (JSON-LD)
- `app/sitemap.ts`, `app/robots.ts`: generated `/sitemap.xml` and `/robots.txt`
- `public/images/`: logos and photos

## Working with Claude Code

See `CLAUDE.md` for the project's working rules. The codebase graph is built with `graphify .` (output in `graphify-out/`, not committed).
