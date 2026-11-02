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
  - `site.ts`: contact, showroom address (see discrepancy note), navigation
  - `catalog.ts`: categories, product lines, wood species, manufacturers (verified facts only)
  - `media.ts`: image registry with provenance (`company` | `manufacturer`) and source URLs
- `src/app/`: routes `/`, `/ponuda`, `/ponuda/[kategorija]`, `/ponuda/[kategorija]/[proizvod]`, `/o-nama`,
  `/kontakt`, `/api/upit`. Old demo URLs (`/kolekcije/*`, `/inspiracija`, `/brand`, `/napomene`) redirect.
- `src/components/home/`: homepage sections, one per section of the design reference
- `src/fonts/`: TeX Gyre Heros (GUST Font License), see `src/fonts/README.md`
- `docs/design-reference.md`: reference analysis and comparison passes
- `docs/image-inventory.md`: every image, its source, rejected images and gaps
- `docs/research.md`: content audit and open discrepancies

## Brand

The original logo (`public/brand/original/ke-logo.png`, identical to the live asset) is used unchanged
in the header, mobile menu and footer. No alternative logo exists in this project.

## Inquiry form

`POST /api/upit` delivers via **Resend** (`RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, optional `INQUIRY_FROM_EMAIL`)
or a generic **webhook** (`FORM_WEBHOOK_URL`). Without either it returns `503 not_configured`, and the form shows
an honest fallback: a pre-filled email and the phone number.

## Before production

- Confirm the showroom address (Hiseta 19 vs Alipašina 55), opening hours and certificates.
- Confirm dealer usage rights for manufacturer photography, or replace it with the company's own.
- Request a vector or high-resolution version of the logo (only 233 × 60 px is published).
- Commission photography of the showroom and completed work (none exists publicly).
- Configure inquiry delivery (see above).
