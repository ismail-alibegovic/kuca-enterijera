# Kuća Enterijera — Audit & design-reference research

_Researched 31 Oct 2026. Sources: the live site https://kuca-enterijera.ba (all 5 public pages + the WordPress REST API), plus the design references listed below._

---

## 1. Audit of the current website

**Platform:** WordPress 6.1.1 with a BoldThemes interior-design theme, built by B-Tim d.o.o. (footer: "2022 Kuća Enterijer"). The REST API is public. It lists 6 pages (Naslovna, O Nama, Ponuda, Klijenti, Kontakt, Footer), **0 posts** and **0 media items** exposed. There's no product or catalogue CMS, so the new site doesn't need to stay compatible with a CMS.

**Positioning (verbatim on the site):** "Kuća Enterijera – Parketni centar Sarajevo. Prodajemo isključivo visoko kvalitetne proizvode svjetski priznatih proizvođača." DIERRE Italija is singled out as its partner for security doors.

### Verified offering (page "Ponuda")
| Group | Line on the site | Verified details |
|---|---|---|
| Parket | Dvoslojni i troslojni parket | Species: hrast, jasen, javor, bukva, bagrem, parena trešnja, parena kruška, pareni orah, kesten. Also exotic species |
| Parket | Egzotični masivni parketi | jatoba, teak afrika, wenge kongo ("itd."). Described as hard and resistant |
| Parket | Klasični masivni parketi | hrast, bukva, jasen. "Razne dimenzije i klase". Easy to maintain |
| Vrata | Sigurnosna ulazna vrata | DIERRE Italija, "lider u svijetu proizvodnje blindiranih vrata" |
| Podovi | Tekstilni podovi | Wide range of weights, weave densities, designs and colours. Used from offices to hotel corridors |
| Podovi | PVC podne obloge | Can last "oko 20 godina" with the right quality grade and professional installation |
| Vanjski | Podovi za vanjsku upotrebu | WPC (Wood Polymer Composite): wood flour bonded with environmentally harmless polymers |
| Namještaj | Kancelarijski namještaj | Wide choice of models and decors that can be adapted |
| Njega | Ljepila i lakovi | Supplier Chimiver. Dispersion, 2K PU and silane adhesives; 1K/2K PU and water-based lacquers; oils for indoor and outdoor wood floors; filler fluids; cleaning and maintenance products |

The homepage also mentions "Kancelarijski / Rezidencijalni / Komercijalni dizajn" and "Uređenje · Namještaj · Savjeti" as services. These are carried over as **service areas**, without inventing any projects.

### Manufacturers
- **Logos shown on "O nama"** (genuine assets, now in `public/images/partners/original/`): Scheucher, Notrax, M2 Carpets, Lamett, Forbo, STP, Dierre, ITLAS, Lano, Modulyss, BGP Trading, Chimiver, Mazzonetto, Lalegno.
- **Text list on "O nama"** ("samo neke od…"): Dierre, Castro & filhos, Berti, Mafi, Cares, Mazoneto [sic], Požgaj, Alma floors, Bauwerk, Bembe parket, Magnum, Modalegno, Pios, Sihe woods, Wohngesund, Forbo, Loba, Galeković, Pana, Parador.

### Contact (verified)
Hiseta 19, 71000 Sarajevo · +387 (0)61 221 173 · +387 (0)61 295 279 · +387 (0)33 21 45 03 · kuca.enterijera@bih.net.ba · info@kuca-enterijera.ba. The site doesn't list opening hours and has no links to social profiles (the "Soc. mreže" heading is empty).

### Discrepancies found → handled through configuration (`src/content/site.ts`)
1. **Showroom address.** "O nama" says the salon is in **Alipašina 55**. Kontakt and the footer on every page say **Hiseta 19**. OpenStreetMap now lists an unrelated car dealership at Alipašina 55. → The new site uses **Hiseta 19** as `showroom.address`, and `addressDiscrepancyNote` records the conflict. **To confirm with the client.**
2. **Certifications.** "Certifikat ISO 9001/2008" plus "FSC i ISO". ISO 9001:2008 was withdrawn in 2018, so the claim is at least out of date. → Kept in config with `display: false` until certificates are confirmed.
3. **Phone numbers.** The contact page shows one mobile number; the footer shows three. → All three are kept. The first is the primary CTA.
4. **Typos** in the existing copy ("ptroizvode", "tehnolohije", "Vrunska", "Mazoneto") are corrected in the new copy.

### Weaknesses of the current site
- **Imagery isn't authentic:** every photo is BoldThemes demo stock (2016/17: blue chairs, sofas against concrete walls) or a watermarked pencil sketch. None of it shows parquet, doors or the showroom. This is the biggest credibility gap.
- The hero slider promises "Saznaj više", but every slide links to the same generic page.
- "Naši klijenti / Portfolio" is **empty** (an "All" filter with no items).
- There are no product pages or filtering, so the catalogue is one long page of paragraphs.
- Generic copy that isn't about the products ("Ne vjerujemo u preseljenje…", "Biljke – da oživite vaš ambijent").
- No inquiry form, no structured data, a weak title ("KUĆA ENTERIJERA - PARKETNI CENTAR"), and duplicate H1/H2 patterns.
- The logo is only available as a 233×60 px PNG, which looks blurry on high-density screens.

### Opportunities
- Make **parquet the protagonist**. The company calls itself "Parketni centar".
- Turn the paragraphs into a **browsable, filterable catalogue of product lines** with species/material metadata.
- Build in a **"sample-board" interaction model** that mirrors how people actually choose flooring in a showroom.
- Make the **inquiry/quote request the main conversion**: product-aware, with m², mobile-first, and one-tap call/email.
- Add local SEO foundations (LocalBusiness JSON-LD, clean URLs, a sitemap).

---

## 2. Design-reference study

**Access log (honest):**
| Reference | What I could inspect |
|---|---|
| Albed (Awwwards) | The Awwwards page returned **HTTP 502** to automated access. I inspected **albed.it** directly instead (homepage, scroll captures) |
| DI / Ditre Italia (Dribbble) | Shot page loaded; downloaded and studied full-resolution shot images |
| Floor website (Dribbble) | Shot page loaded; studied full-resolution shot images |
| Audo (Awwwards) | Awwwards **HTTP 502**. Inspected **audocph.com** directly (home, scroll captures, after dismissing the cookie dialog) |
| &Tradition (Dribbble) | Shot page loaded; studied full-resolution shot images |
| Casa Carigar (Dribbble) | Shot page loaded; studied full-resolution shot images |
| Dinesen | Inspected live (home + scroll) |
| Bauwerk | Inspected live (home + scroll) |
| Scheucher | Inspected live (home + scroll) |
| Listone Giordano | **Blocked by a Cloudflare challenge**. Not inspected; no claims made |

Motion and hover behaviour could only be inferred from scroll captures and static shots. No interaction recordings were available.

### What each reference does best, and what we take from it
**Albed (albed.it).** The brand name is broken into giant letters (A L B E D) placed asymmetrically *around* the imagery. Type and photography interlock like architectural elements, and the UI chrome is tiny and quiet (hairline menu icon, small caps nav).
→ *Take:* a headline that physically **interlocks with the photograph** (words placed above and below the image, not on top of it), and minimal chrome. *Don't copy:* scattered single letters, or a "letters as logo" hero.

**DI / Ditre Italia.** A warm ivory canvas, a light-weight sans headline ("Quiet Forms — Loud in Meaning") and **small images set off-grid** next to large ones. Short manifesto lines sit in a ruled table, and roman/italic contrast carries the editorial voice.
→ *Take:* the warm ivory base, the ruled "principles" table, images of very different scales side by side, and an italic serif for emphasis. *Don't copy:* the orbit line-drawings or the exact headline structure.

**Floor website (Sergio Tijera).** Wood species as **square swatches with names** ("Oak", "Teak", "Cherry Wood"), a product page with a "plan your floor" pattern picker (herringbone / chantilly / wood strip / normal), and spec lists.
→ *Take:* species and patterns as first-class browsing dimensions, and a clear spec hierarchy on product pages. *Don't copy:* the e-commerce cart and prices (we sell by inquiry), or the generic icon "principles" row.

**Audo Copenhagen.** Serif wordmark, full-bleed warm photography, a *very* restrained serif in the UI and category tiles that are just photos with a centred serif label.
→ *Take:* trust in photography, small serif labels and a thin top bar. *Don't copy:* the shop mechanics (favourites, cart, sales banner).

**&Tradition (Alex Butsko).** A white page with a **visible vertical hairline grid**, asymmetric image placement that floats off the grid with captions in tiny type, "scroll down" and "menu" as underlined text links, and a date on the right.
→ *Take:* the **visible hairline column grid**. In our case it reads as the joints between parquet planks, which makes it a meaningful motif rather than a decoration. We also take the text-only links. *Don't copy:* the strictly white palette.

**Casa Carigar (Orbix).** A **collage of product cut-outs** at different scales ("Not For Everyone / Just For You"), a terracotta colour-block "Shop the look" panel, and a serif + small caps pairing.
→ *Take:* a collage-like scattered composition for the "material library" moment, and one deep colour-block section for rhythm. *Don't copy:* the terracotta palette or the e-commerce grids.

**Dinesen / Bauwerk / Scheucher (industry).** Dinesen gives whole viewports to plank texture and offers a sample box. Bauwerk has a "Parquet Finder" filtered by ideas, a black USP strip and plank-angle product shots. Scheucher puts its own showrooms and a parquet finder in the main nav.
→ *Take:* product **finder/filtering** as a primary tool, **the showroom as a destination** in the nav, and the "come and see the sample" CTA. *Don't copy:* claims we can't back up (sustainability statements, visualisers).

### Combined direction: "Arhitektura materijala"
- **Plank-joint grid.** Hairline vertical rules on a 12-column grid, visible in key sections, like the joints of a laid floor.
- **Floor line.** A recurring horizontal rule, "the floor", on which headlines and images *stand*. Hero images rise from this line in a bottom-up mask reveal, like a board being laid.
- **Sample tags.** Product lines are shown as showroom sample boards: a tall material image with a small specimen label (Nº, line, construction, species). This is borrowed from the physical objects customers handle in a parquet showroom, so it is specific to this business, not a generic card.
- **Type.** Instrument Sans (architectural, precise, full Latin Extended: č ć đ š ž) paired with Newsreader (warm, literary serif, used in italics and for big material statements).
- **Palette.** Warm ivory paper, sand, natural oak, charcoal and near-black ink. Colour comes from the photographs, not from UI accents.
- **One dark chapter.** The material storytelling section runs on charcoal for rhythm (inspired by Casa Carigar's colour block, executed in our own palette).

### What we deliberately avoid
Rounded cards, icon-feature rows, glassmorphism, gradients, floating badges, carousels as primary content, cart mechanics, invented testimonials or projects, and scroll hijacking.
