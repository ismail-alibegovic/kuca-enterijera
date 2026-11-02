# Image inventory

Audited 1–2 Nov 2026. All images live in `src/assets/images/` and are registered with their source in
`src/content/media.ts`. Next.js serves them as AVIF/WebP in responsive sizes. Originals were re-encoded
as progressive JPEG (q86, max 2400px).

## 1. Logo

| File | Source | Notes |
|---|---|---|
| `src/assets/ke-logo.png` (= `public/brand/original/ke-logo.png`) | https://kuca-enterijera.ba/wp-content/uploads/2022/08/ke-logo.png | **Byte-identical** to the live asset. 233 × 60 px is the largest version the company publishes. `kucaenterijera-logo.png` on the same server is the same 233 × 60 file, and no SVG or `@2x` version exists. Served unoptimized, never redrawn |
| `src/app/icon.png` | https://kuca-enterijera.ba/wp-content/uploads/2022/08/cropped-kucaenterijera-logo-270x270.png | The company's current favicon, unchanged |

**Limitation:** at 186px display width the logo is rendered at ~1.25× density, so it is slightly soft on
retina screens. A vector or high-resolution original should be requested from the company.

## 2. Images in use

### From the company website (kuca-enterijera.ba, 2022 homepage slider)
These four are the only photographs on the company site that show floors. Their original
photographer is not stated; they are the company's own published material.

| Key | File | Source | Used on |
|---|---|---|---|
| `bedroomOak` | `company/bedroom-oak-floor.jpg` | /wp-content/uploads/2022/08/3d.jpg | Home intro, About (wide), parquet product |
| `livingDark` | `company/living-dark-floor.jpg` | /wp-content/uploads/2022/08/2d.jpg | Home intro (small), solid parquet product |
| `livingWide` | `company/living-wide-floor.jpg` | /wp-content/uploads/2022/08/1d-1.jpg | Parquet product (secondary) |
| `corridorDoors` | `company/corridor-doors.jpg` | /wp-content/uploads/2022/08/4d.jpg | About (thumbnail) |

### From partner manufacturers
Relationship verified: each manufacturer appears on kuca-enterijera.ba/o-nama (logo wall and/or
supplier list). The images come from the manufacturers' official websites and show those
manufacturers' own product categories. They are always captioned "Foto: <manufacturer>".

| Key | File | Manufacturer / source URL | Shows | Used on |
|---|---|---|---|---|
| `oakFloorChair` | `partners/lalegno/oak-floor-chair.jpg` | Lalegno, lalegno.com homepage banner | Light oak floor | Home hero, parquet product |
| `oakPlanks` | `partners/chimiver/oak-planks.jpg` | Chimiver, chimiver.com/wp-content/uploads/2022/12/Privati.jpg | Oak plank floor close-up | Home hero thumbnail, Parketi category |
| `adhesiveTrowel` | `partners/chimiver/adhesive-trowel.jpg` | Chimiver, …/2022/12/Professionisti.jpg | Parquet adhesive + planks | Home parquet feature, Ljepila category |
| `oiledFloor` | `partners/chimiver/oils-varnish-floor.jpg` | Chimiver, …/2023/11/Oli-e-Vernici_2560.jpg | Wood floor finished with oils/varnish | Home parquet feature, Chimiver product |
| `oakStudy` | `partners/itlas/oak-study.jpg` | ITLAS, itlas.com (home: "arredo metropolitan frames") | Oak floor + wood wall cladding | Footer, About, Parketi (thumbnail) |
| `doorInterior` | `partners/dierre/door-oak-interior.jpg` | Dierre, dierre.com/wp-content/uploads/2021/06/porte-blindate.jpg | Security door, oak finish | Sigurnosna vrata |
| `doorVilla` | `partners/dierre/door-villa-exterior.jpg` | Dierre, …/2026/10/Dierre_SynergieOut_Villa.webp | Entrance door on a villa | Home doors band, door product |
| `doorLock` | `partners/dierre/lock-detail.jpg` | Dierre, …/2021/06/ferramenta.jpg | Lock/bolt detail | Sigurnosna vrata (thumbnail) |
| `lvtRestaurant` | `partners/modulyss/lvt-restaurant.jpg` | Modulyss, "MODULYSS_Contextual_LVT" | Resilient (LVT) floor | Home floors, PVC category/product |
| `carpetOffice` | `partners/modulyss/carpet-office-haelo.jpg` | Modulyss, "Haelo Ray, office" | Textile floor tiles | Home floors, textile product |
| `carpetTweed` | `partners/modulyss/carpet-office-tweed.jpg` | Modulyss, "Habau offices, DSGN Tweed" | Textile floor tiles | Textile product |

**Before production:** confirm with each manufacturer (or via the company's dealer agreements) that
dealer use of these images is permitted, or replace them with the company's own photographs.

## 3. Rejected images

| Image | Reason |
|---|---|
| All Unsplash images from the first demo | Stock, not company material |
| 2016/07 & 2017/05 uploads on kuca-enterijera.ba (`bg-clients`, `image-about-*`, `image-office-chairs`, `image-chair-blue-wall`, `motive-slider-01`, …) | BoldThemes theme demo content, not the company's |
| 2022/09 category images (`kanc1`, `ljepila`, `pvc`, `sigur`, `tekst`, `vanjski`) | Pencil sketches carrying a stock-agency watermark |
| Ditre Italia reference images | Third-party proprietary photography |
| Scheucher website images | The site blocks automated download, so none was obtained |
| Forbo campaign images | Promotional artwork with text/purple backdrop; not a fit |
| ITLAS outdoor furniture, Chimiver "planning" photo, Dierre product renders/ads | Not representative of the product sold, or advertising artwork |

## 4. Gaps (no authentic image available, so none is shown)

- **WPC outdoor flooring:** no company or partner photograph found. The category is presented typographically.
- **Office furniture:** no authentic photograph. The category is presented typographically.
- **Exotic solid parquet** (jatoba, teak, wenge): no verified photo of these species.
- **Showroom, team and completed projects:** none published anywhere. No social profiles could be
  verified (the legacy site's "Soc. mreže" heading is empty). These are the most valuable photos to commission.
