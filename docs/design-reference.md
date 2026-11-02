# Design reference: DI / Ditre Italia (Dribbble)

Reference: https://dribbble.com/shots/26190118-DI-Warm-Elegant-Furniture-Website-Landing-Page-About-Us
Source used: the screenshot supplied with the brief (458 × 2000 px). Dribbble blocks automated
access, so no higher-resolution frames could be fetched. Measurements below are converted to a 1440px
canvas (factor ≈ 3.3 after removing the dark presentation frame, which is **not** part of the website).

## Step A: analysis

| Aspect | Reference | Implemented as |
|---|---|---|
| Canvas | Warm off-white (#FEF8ED family), one dark photographic band, no cards, no gradients | `--color-paper #FEF8ED`, ink `#130E0A`; brown/taupe/beige only as tints |
| Side margin | ≈ 40px | `--gutter: clamp(1rem, 2.8vw, 2.5rem)` |
| Grid | 12 columns; key x-positions at 0, ~43%, 50%, ~61%, ~78% | `grid-12`; nav at col 7, hero aside at col 8, tables from col 5–6 |
| Header | Logo left; small address/phone block; text nav columns at 50% / 61%; tiny icons right. ≈12–13px type, no borders, no buttons | Original logo; address + phone; one nav column at col 7 (4 items); "Zatražite ponudu" text link right. Static, not sticky |
| Hero | 2-line headline ≈ 78px / 86px, regular weight, em dash; small 3:2 photo + 2-line text at 61%; full-width photo ≈ 2.5:1; three captions under it (left / 61% / right) | Same: "Plemenito drvo — / Pod koji traje", thumbnail + text + two text links, 2.45:1 photo, three captions |
| Section 2 | Tall photo (≈ 43% wide, 7:8) left; indented statement ≈ 34px top-right; small paragraph + small photo bottom-right | `Intro.tsx` (identical arrangement, company photo) |
| Marquee | Hairline, oversized uppercase word line with tiny italic separators | `Marquee.tsx` ("Parket o Podovi o Vrata o Sarajevo"), CSS only, stops for reduced motion |
| Values | Indented statement left, huge italic figure right, ruled 2-column table from ~43% | `Offer.tsx`: the six real product groups as the ruled table, italic "6" |
| Lines & light | Statement + small text + round arrow button left; large photo right with a smaller photo set inside it | `ParquetFeature.tsx`: parquet lines + species, Chimiver photos |
| Dark band | Full-bleed photo, light text directly on the image | `Doors.tsx` (Dierre), flat 35% ink tint for legibility (no gradient) |
| Team | Indented statement + small text, row of equal portraits | `Partners.tsx`: 8 manufacturer logos in a hairline grid, others named in text |
| Get in touch | Giant uppercase line with one italic letter, email, address column, nav, small photo right, "CONTACT/", logo bottom-right | `Footer.tsx`: "POSJETITE SALON", "ZATRAŽITE PONUDU/", original logo bottom-right |
| Type | Swiss neo-grotesk (Helvetica Neue-like), regular weight only, tight tracking on large sizes, sentence-case small UI text, occasional italic accent | TeX Gyre Heros (free Helvetica-style grotesk), 400 only; display −0.028em; statements −0.018em; 13px UI text; italic for single accent words |
| Motion | Static presentation (none visible) | Short fade-up on scroll, slow marquee, slight image lean on hover. All off for reduced motion |

Deliberately **not** copied: the Ditre Italia logo, its photographs and wording, the orbit line
drawings, the overlapping glass card in the dark band, and shop icons (search / wishlist / cart).

## Step C/D: comparison passes (1440px and 390px, headless Chromium)

**Pass 1.** Structure, scale and rhythm matched. Fixed: the marquee used italic final letters, which
read as a glitch in a single-family setup, and was heavier than the reference. The weak hero thumbnail
became the oak plank close-up. The doors-band text collided with the door on phones, so it moved
to the top-left. The parquet inset image no longer overflows on phones.

**Pass 2.** The doors heading had collapsed to a very narrow column (`ch` resolved against the
wrapper's small font), so it now has a rem-based width. Brand names were lowercased in the CTA line.
The About page's full-width image (a company slide with a TV) was replaced with the company's oak
bedroom image.

**Remaining known differences.** The reference hero photo is a full room. Ours (Lalegno) is a calmer
floor-and-furniture detail, because no authentic wide room photo of comparable quality exists. The
original logo is a thin, 233 × 60 raster, visually lighter than the reference's bold wordmark.
