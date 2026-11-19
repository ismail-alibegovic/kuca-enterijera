# Kuća Enterijera logo

- `original/ke-logo.png`: the client's logo as published on kuca-enterijera.ba (233×60 px raster). Untouched.
- `ke-logo.svg` / `ke-logo-inverse.svg` / `ke-mark.svg`: a vector redraw of that same logo, so it stays sharp on
  high-density screens. Geometry was traced from the source pixels; colours were sampled from it
  (roof `#F0941D`, house and leaf `#7AB648`, wordmark `#333333`).

The wordmark letterforms were rebuilt from Michroma (SIL Open Font License) as outlines, fitted to the
original's width, weight and spacing. The redraw is visually matched, not the original source file: if the
client still has the designer's vector file (AI/EPS/PDF), replace these SVGs with it.

The React component (`src/components/brand/Logo.tsx`) uses the same paths from `logoPaths.ts`.
