# Kuća Enterijera: website

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4.

## Local preview

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production preview
npm run typecheck && npm run lint
```

## Structure

- `src/content/`: typed content layer (single source of truth)
  - `site.ts`: contact, showroom, discrepancies, logo switch (`brandLogo`)
  - `catalog.ts`: categories, product lines, wood species, manufacturers (verified facts only)
  - `media.ts`: image registry with provenance (`illustrative` | `company` | `manufacturer`)
  - `inspiration.ts`: inspiration and project entries (`kind: "project"` for real projects)
- `src/app/`: routes: `/`, `/kolekcije`, `/kolekcije/[kategorija]`, `/kolekcije/[kategorija]/[proizvod]`,
  `/inspiracija`, `/o-nama`, `/kontakt`, `/brand` (logo proposal), `/napomene` (content/photo notes), `/api/upit`
- `src/proxy.ts`: real 404 status for unknown catalogue slugs
- `docs/research.md`: site audit and design-reference analysis

## Inquiry form

`POST /api/upit` delivers via **Resend** (`RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, optional `INQUIRY_FROM_EMAIL`)
or a generic **webhook** (`FORM_WEBHOOK_URL`). Without either it returns `503 not_configured`, and the form shows
an honest fallback: a pre-filled email and the phone number. It never shows a fake success message.

Set `NEXT_PUBLIC_SITE_URL` for canonical/OG URLs (default `https://kuca-enterijera.ba`).

## Before production

- Replace illustrative photos (Unsplash) with authentic product, showroom and project photography.
- Confirm the showroom address (Hiseta 19 vs Alipašina 55), opening hours, certificates and social profiles.
- Approve or reject the logo proposal (`site.brandLogo`); the original logo is preserved in `public/brand/original`.
- Configure inquiry delivery (see above).
- CMS: the content layer maps directly onto a headless CMS (e.g. Sanity or Payload) with collections for
  categories, products, manufacturers, media and inspiration. It is a typed file layer, not an admin CMS.
