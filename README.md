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

## Project layout

- `app/page.tsx`: the home page and inspection request form
- `app/layout.tsx`: page title, description and sharing tags
- `app/site.ts`: business name, phone, address and site URL in one place
- `app/structured-data.tsx`: business details for search engines (JSON-LD)
- `app/sitemap.ts`, `app/robots.ts`: generated `/sitemap.xml` and `/robots.txt`
- `public/images/`: logos and photos

## Working with Claude Code

See `CLAUDE.md` for the project's working rules. The codebase graph is built with `graphify .` (output in `graphify-out/`, not committed).
