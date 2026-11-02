# Kuća Enterijera: content audit

_Re-audited 1 Nov 2026 from https://kuca-enterijera.ba (Naslovna, O nama, Ponuda, Klijenti, Kontakt).
The design reference analysis is in `docs/design-reference.md`, and image sources are in `docs/image-inventory.md`._

**Platform:** WordPress (BoldThemes theme), built by B-Tim d.o.o. The "Naši klijenti" portfolio is empty.

## Verified offering (page "Ponuda")
| Group | Verified details |
|---|---|
| Dvoslojni i troslojni parket | hrast, jasen, javor, bukva, bagrem, parena trešnja, parena kruška, pareni orah, kesten; exotic species too |
| Egzotični masivni parketi | jatoba, teak afrika, wenge kongo ("itd."); hard and resistant |
| Klasični masivni parketi | hrast, bukva, jasen; "razne dimenzije i klase" |
| Sigurnosna ulazna vrata | DIERRE Italija |
| Tekstilni podovi | many weights, weave densities, designs, colours; offices to hotel corridors |
| PVC podne obloge | "oko 20 godina" with the right quality grade and professional installation |
| Podovi za vanjsku upotrebu | WPC (Wood Polymer Composite) |
| Kancelarijski namještaj | wide choice of models and decors |
| Ljepila i lakovi | Chimiver: dispersion, 2K PU and silane adhesives; 1K/2K PU and water-based lacquers; oils; filler fluids; care products |

## Manufacturers
- **Logos on "O nama":** Scheucher, Notrax, M2 Carpets, Lamett, Forbo, STP, Dierre, ITLAS, Lano, Modulyss,
  BGP Trading, Chimiver, Mazzonetto, Lalegno (originals in `public/images/partners/original/`, monochrome
  renderings of the same marks in `public/images/partners/`).
- **Text list:** Dierre, Castro & filhos, Berti, Mafi, Cares, Mazzonetto, Požgaj, Alma floors, Bauwerk,
  Bembé parket, Magnum, Modalegno, Pios, Sihe woods, Wohngesund, Forbo, Loba, Galeković, Pana, Parador.

## Contact
+387 (0)61 221 173 · +387 (0)61 295 279 · +387 (0)33 21 45 03 · info@kuca-enterijera.ba · kuca.enterijera@bih.net.ba.
No opening hours and no social profiles are published.

## Open discrepancies (flagged, not silently resolved)
1. **Showroom address.** The Kontakt page ("U našem prodajnom salonu u ul. Hiseta 19") and the footer of
   every page say **Hiseta 19, 71000 Sarajevo**. Only the "O nama" text says the salon was opened at
   **Alipašina 55**. Web searches found no independent listing for either. The site uses Hiseta 19,
   the address the company itself gives for contact. **The company must confirm it.** It is a one-line
   change in `src/content/site.ts`.
2. **Certifications.** "ISO 9001/2008" (withdrawn in 2018) plus "FSC i ISO" are hidden until current certificates are supplied.
3. **Typos** in the legacy copy ("ptroizvode", "tehnolohije", "Vrunska", "Mazoneto") are corrected.
