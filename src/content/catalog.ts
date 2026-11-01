import type { MediaKey } from "./media";

/* -------------------------------------------------------------------------------------------------
 * Typed catalogue. Source: "Ponuda" + "O nama" on kuca-enterijera.ba (audited 31 Oct 2026).
 * Rule: if the existing site doesn't state it, it isn't here. Unknown fields stay undefined
 * and the UI omits them. No dimensions, prices, or technical values were invented.
 * ---------------------------------------------------------------------------------------------- */

export type Application = "dom" | "poslovni" | "vanjski";
export const applicationLabels: Record<Application, string> = {
  dom: "Dom",
  poslovni: "Poslovni prostor",
  vanjski: "Vanjski prostor",
};

export type Construction = "dvoslojni" | "troslojni" | "masivni";
export const constructionLabels: Record<Construction, string> = {
  dvoslojni: "Dvoslojni",
  troslojni: "Troslojni",
  masivni: "Masivni",
};

export type Material = "drvo" | "pvc" | "tekstil" | "wpc" | "vrata" | "namjestaj" | "zavrsna-obrada";
export const materialLabels: Record<Material, string> = {
  drvo: "Drvo",
  pvc: "PVC",
  tekstil: "Tekstil",
  wpc: "WPC kompozit",
  vrata: "Blindirana vrata",
  namjestaj: "Namještaj",
  "zavrsna-obrada": "Ljepila, lakovi i ulja",
};

/* --- Wood species ------------------------------------------------------------------------------ */

export type Species = {
  slug: string;
  name: string;
  origin: "domace" | "egzoticno";
  /**
   * INDICATIVE tone for UI chips only. Real wood colour varies by grade, steaming and finish.
   * Always shown with a "provjerite uzorak u salonu" note.
   */
  tone: string;
};

export const species: Species[] = [
  { slug: "hrast", name: "Hrast", origin: "domace", tone: "#B08A62" },
  { slug: "jasen", name: "Jasen", origin: "domace", tone: "#D3C1A1" },
  { slug: "javor", name: "Javor", origin: "domace", tone: "#DED0B4" },
  { slug: "bukva", name: "Bukva", origin: "domace", tone: "#C9A584" },
  { slug: "bagrem", name: "Bagrem", origin: "domace", tone: "#B79C68" },
  { slug: "parena-tresnja", name: "Parena trešnja", origin: "domace", tone: "#9C6A4E" },
  { slug: "parena-kruska", name: "Parena kruška", origin: "domace", tone: "#A98066" },
  { slug: "pareni-orah", name: "Pareni orah", origin: "domace", tone: "#6B5140" },
  { slug: "kesten", name: "Kesten", origin: "domace", tone: "#957B5E" },
  { slug: "jatoba", name: "Jatoba", origin: "egzoticno", tone: "#7A4532" },
  { slug: "teak-afrika", name: "Teak Afrika", origin: "egzoticno", tone: "#8C7048" },
  { slug: "wenge-kongo", name: "Wenge Kongo", origin: "egzoticno", tone: "#3B302A" },
];

export const speciesBySlug = Object.fromEntries(species.map((s) => [s.slug, s])) as Record<string, Species>;

/* --- Manufacturers ----------------------------------------------------------------------------- */

export type Manufacturer = {
  slug: string;
  name: string;
  /** Monochrome, transparent logo derived from the genuine asset on the existing site. */
  logo?: { src: string; width: number; height: number };
  /** How the existing site presents the manufacturer. */
  listedAs: ("logo" | "tekst")[];
  /** Segment only where the existing site itself states it. */
  segment?: string;
};

const logo = (file: string, width: number, height: number) => ({
  src: `/images/partners/${file}.png`,
  width,
  height,
});

export const manufacturers: Manufacturer[] = [
  { slug: "dierre", name: "Dierre", logo: logo("dierre", 245, 122), listedAs: ["logo", "tekst"], segment: "Sigurnosna ulazna vrata · Italija" },
  { slug: "scheucher", name: "Scheucher", logo: logo("scheucher", 158, 124), listedAs: ["logo"] },
  { slug: "chimiver", name: "Chimiver", logo: logo("chimiver", 280, 84), listedAs: ["logo"], segment: "Ljepila, lakovi i ulja za drvene podove" },
  { slug: "forbo", name: "Forbo", logo: logo("forbo", 273, 98), listedAs: ["logo", "tekst"] },
  { slug: "mazzonetto", name: "Mazzonetto", logo: logo("mazzonetto", 218, 53), listedAs: ["logo", "tekst"] },
  { slug: "itlas", name: "ITLAS", logo: logo("itlas", 220, 93), listedAs: ["logo"] },
  { slug: "lamett", name: "Lamett", logo: logo("lamett", 261, 91), listedAs: ["logo"] },
  { slug: "modulyss", name: "Modulyss", logo: logo("modulyss", 172, 122), listedAs: ["logo"] },
  { slug: "lano", name: "Lano", logo: logo("lano", 182, 101), listedAs: ["logo"] },
  { slug: "m2-carpets", name: "M2 Carpets", logo: logo("m2-carpets", 153, 86), listedAs: ["logo"] },
  { slug: "notrax", name: "Notrax", logo: logo("notrax", 284, 89), listedAs: ["logo"] },
  { slug: "lalegno", name: "Lalegno", logo: logo("lalegno", 269, 47), listedAs: ["logo"] },
  { slug: "bgp-trading", name: "BGP Trading", logo: logo("bgp-trading", 260, 92), listedAs: ["logo"] },
  { slug: "stp", name: "STP", logo: logo("stp", 135, 141), listedAs: ["logo"] },
  // Named in the text list on "O nama" (no logo asset on the existing site):
  ...[
    "Castro & Filhos", "Berti", "Mafi", "Cares", "Požgaj", "Alma Floors", "Bauwerk", "Bembé Parkett",
    "Magnum", "Modalegno", "Pios", "Sihe Woods", "Wohngesund", "Loba", "Galeković", "Pana", "Parador",
  ].map((name) => ({
    slug: name.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9čćžšđé]+/g, "-").replace(/-+/g, "-"),
    name,
    listedAs: ["tekst"] as ("logo" | "tekst")[],
  })),
];

export const manufacturerBySlug = Object.fromEntries(manufacturers.map((x) => [x.slug, x])) as Record<
  string,
  Manufacturer
>;

/* --- Categories -------------------------------------------------------------------------------- */

export type Category = {
  slug: string;
  index: string;
  name: string;
  /** Short name for tight UI (index lists, tags). */
  short: string;
  kicker: string;
  intro: string;
  /** Long-form, category-specific editorial copy. Kept factual. */
  body: string[];
  hero: MediaKey;
  heroAlt?: MediaKey;
  materials: string;
  seoTitle: string;
  seoDescription: string;
};

export const categories: Category[] = [
  {
    slug: "parketi",
    index: "01",
    name: "Parketi",
    short: "Parketi",
    kicker: "Dvoslojni, troslojni i masivni",
    intro:
      "Srce naše ponude. Parketi od domaćih i egzotičnih vrsta drveta, u dvoslojnoj, troslojnoj i masivnoj izvedbi.",
    body: [
      "Kod višeslojnog parketa gornji sloj je od plemenitog drveta: hrasta, jasena, javora, bukve, bagrema, parene trešnje, parene kruške, parenog oraha ili kestena. Klasični masivni parket izrađuje se od hrasta, bukve i jasena, u raznim dimenzijama i klasama.",
      "Za prostore s izraženijim karakterom nudimo i masivne parkete od egzotičnih vrsta, poput jatobe, afričkog teaka i wengea iz Konga. Ove vrste odlikuju tvrdoća i otpornost.",
    ],
    hero: "herringboneTimberCeiling",
    heroAlt: "herringbonePortrait",
    materials: "Hrast · Jasen · Orah · Jatoba · Wenge",
    seoTitle: "Parketi Sarajevo: troslojni, dvoslojni i masivni parket",
    seoDescription:
      "Troslojni, dvoslojni i masivni parket od hrasta, jasena, oraha i egzotičnih vrsta. Pogledajte uzorke u salonu Kuća Enterijera, Alipašina 55, Sarajevo.",
  },
  {
    slug: "pvc-i-tekstilni-podovi",
    index: "02",
    name: "PVC i tekstilni podovi",
    short: "PVC i tekstil",
    kicker: "Elastične i tekstilne podne obloge",
    intro:
      "Podne obloge za stanove, urede i hotele. Kod PVC-a je ključna trajnost, a tekstilne obloge prostoru daju toplinu.",
    body: [
      "PVC podne obloge mogu trajati oko dvadeset godina. Pritom je važno odabrati kvalitetu prema namjeni prostora, profesionalno pripremiti podlogu i stručno postaviti pod.",
      "Tekstilne podne obloge dolaze u velikom izboru gramatura, gustoća tkanja, dizajna i boja. Zato se koriste svugdje, od ureda do najprometnijih hotelskih hodnika.",
    ],
    hero: "carpetBoardroom",
    heroAlt: "vinylEmptyRoom",
    materials: "PVC · Tekstil",
    seoTitle: "PVC podne obloge i tekstilni podovi Sarajevo",
    seoDescription:
      "PVC podne obloge i tekstilni podovi za stambene i poslovne prostore. Savjet o odabiru kvalitete prema namjeni, salon u Sarajevu.",
  },
  {
    slug: "vanjske-podne-obloge",
    index: "03",
    name: "Vanjske podne obloge",
    short: "Vanjski podovi",
    kicker: "WPC terase i otvoreni prostori",
    intro: "Podovi za terase i otvorene prostore od WPC kompozita, mješavine drvene piljevine i polimera.",
    body: [
      "WPC je kratica za Wood Polymer Composite. To je materijal od drvene piljevine uprešane s polimerima koji ne štete okolišu, a u Sjevernoj Americi se uspješno proizvodi više od dvadeset godina.",
      "Najčešće se koristi na otvorenom: na terasama, uz bazene i na balkonima.",
    ],
    hero: "deckAerial",
    heroAlt: "indoorOutdoorDeck",
    materials: "WPC kompozit",
    seoTitle: "WPC vanjske podne obloge i terase, Sarajevo",
    seoDescription:
      "WPC (Wood Polymer Composite) podovi za terase i vanjske prostore. Savjet i ponuda u salonu Kuća Enterijera u Sarajevu.",
  },
  {
    slug: "sigurnosna-vrata",
    index: "04",
    name: "Sigurnosna vrata",
    short: "Sigurnosna vrata",
    kicker: "Dierre Italija",
    intro:
      "Široka paleta sigurnosnih ulaznih vrata talijanske kompanije Dierre, jednog od svjetskih lidera u proizvodnji blindiranih vrata.",
    body: [
      "Ulazna vrata su granica između vašeg doma i ostatka svijeta, ali i prvo što gost vidi. Zato pri odabiru jednako važe sigurnost i izgled.",
      "U salonu vam pomažemo odabrati model iz ponude kompanije Dierre i pripremiti ponudu prema vašem prostoru.",
    ],
    hero: "frontDoorFacade",
    heroAlt: "hallDoor",
    materials: "Blindirana vrata",
    seoTitle: "Sigurnosna vrata Sarajevo: Dierre blindirana ulazna vrata",
    seoDescription:
      "Sigurnosna ulazna vrata talijanske kompanije Dierre. Savjet, odabir modela i ponuda u salonu Kuća Enterijera, Sarajevo.",
  },
  {
    slug: "kancelarijski-namjestaj",
    index: "05",
    name: "Kancelarijski namještaj",
    short: "Kancelarije",
    kicker: "Poslovni interijeri",
    intro:
      "Kancelarijski namještaj koji se prilagođava prostoru i načinu rada, s bogatim izborom modela i dekora.",
    body: [
      "Ponudu kancelarijskog namještaja prilagođavamo potrebama različitih kupaca. Uz veliki izbor modela i dekora, svaka kancelarija može biti privlačna, ugodna za rad i usklađena s vašim zahtjevima za dizajn i funkcionalnost.",
    ],
    hero: "officeLounge",
    heroAlt: "officeWindow",
    materials: "Modeli i dekori po izboru",
    seoTitle: "Kancelarijski namještaj Sarajevo",
    seoDescription:
      "Kancelarijski namještaj s bogatim izborom modela i dekora, prilagođen vašem poslovnom prostoru. Kuća Enterijera, Sarajevo.",
  },
  {
    slug: "ljepila-lakovi-i-njega",
    index: "06",
    name: "Ljepila, lakovi i njega",
    short: "Ljepila i lakovi",
    kicker: "Chimiver: završna obrada i održavanje",
    intro:
      "Sve za postavljanje, završnu obradu i dugotrajnu njegu drvenih podova, od proizvođača Chimiver.",
    body: [
      "Asortiman obuhvata ljepila za drvene podove, temeljne i završne lakove, ulja za unutarnje i vanjske drvene podove, tekućine za kitanje te sredstva za čišćenje i održavanje.",
    ],
    hero: "oakSideboard",
    heroAlt: "darkPlanks",
    materials: "Ljepila · Lakovi · Ulja",
    seoTitle: "Ljepila, lakovi i ulja za parket: Chimiver, Sarajevo",
    seoDescription:
      "Chimiver ljepila za drvene podove, poliuretanski i vodeni lakovi, ulja i sredstva za održavanje parketa. Kuća Enterijera, Sarajevo.",
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<string, Category>;

/* --- Product lines ----------------------------------------------------------------------------- */

export type SpecRow = { label: string; value: string };

export type Product = {
  slug: string;
  category: string;
  name: string;
  /** Short line shown on sample tags. */
  tagline: string;
  summary: string;
  description: string[];
  images: MediaKey[];
  material: Material;
  applications: Application[];
  constructions?: Construction[];
  species?: string[];
  manufacturers?: string[];
  /** Additional verified attributes. Rows without a verified value are not created at all. */
  specs?: SpecRow[];
  /** Range lists (e.g. adhesive types) shown as a structured list. */
  range?: { title: string; items: string[] }[];
  downloads?: { label: string; href: string }[];
  related: string[];
  /** Whether the inquiry form should ask for an approximate area. */
  askArea: boolean;
};

export const products: Product[] = [
  {
    slug: "dvoslojni-i-troslojni-parket",
    category: "parketi",
    name: "Dvoslojni i troslojni parket",
    tagline: "Višeslojni parket, plemeniti gornji sloj",
    summary:
      "Vrhunska kvaliteta i dugotrajnost. Gornji sloj je od visokovrijednog drveta, od hrasta do parenog oraha, a dostupne su i egzotične vrste.",
    description: [
      "Višeslojni parket spaja izgled punog drveta s konstrukcijom u dva ili tri sloja. Osnovni, vidljivi materijal je visokovrijedno drvo.",
      "U ponudi su hrast, jasen, javor, bukva, bagrem, parena trešnja, parena kruška, pareni orah i kesten. Imamo i parkete od egzotičnog drveta.",
    ],
    images: ["herringboneLiving", "herringbonePortrait", "oakQuietRoom"],
    material: "drvo",
    applications: ["dom", "poslovni"],
    constructions: ["dvoslojni", "troslojni"],
    species: ["hrast", "jasen", "javor", "bukva", "bagrem", "parena-tresnja", "parena-kruska", "pareni-orah", "kesten"],
    related: ["klasicni-masivni-parket", "egzoticni-masivni-parket", "chimiver-ljepila-lakovi-i-ulja"],
    askArea: true,
  },
  {
    slug: "klasicni-masivni-parket",
    category: "parketi",
    name: "Klasični masivni parket",
    tagline: "Domaće vrste, razne dimenzije i klase",
    summary:
      "Parket od domaćih vrsta drveta, hrasta, bukve i jasena, u raznim dimenzijama i klasama. Daje domu topliji izgled i lako se održava.",
    description: [
      "Klasični masivni parket izrađuje se od punog drveta domaćih vrsta. Nudimo kvalitetne parkete od hrasta, bukve i jasena u raznim dimenzijama i klasama.",
      "Daje prostoru topao, prirodan izgled i jednostavno se održava.",
    ],
    images: ["oakQuietRoom", "staircaseOak", "oakDeskPlaster"],
    material: "drvo",
    applications: ["dom", "poslovni"],
    constructions: ["masivni"],
    species: ["hrast", "bukva", "jasen"],
    specs: [{ label: "Dimenzije i klase", value: "Razne, prema dostupnosti. Pitajte u salonu" }],
    related: ["dvoslojni-i-troslojni-parket", "egzoticni-masivni-parket", "chimiver-ljepila-lakovi-i-ulja"],
    askArea: true,
  },
  {
    slug: "egzoticni-masivni-parket",
    category: "parketi",
    name: "Egzotični masivni parket",
    tagline: "Tvrde vrste iz cijelog svijeta",
    summary:
      "Masivni parket od egzotičnih vrsta drveta, poput jatobe, afričkog teaka i wengea iz Konga. Odlikuju ga tvrdoća i otpornost.",
    description: [
      "Egzotične vrste drveta dolaze iz svih krajeva svijeta i odlikuju se tvrdoćom i otpornošću.",
      "U ponudi su, među ostalim, jatoba, teak Afrika i wenge Kongo. Raspoložive vrste provjerite u salonu.",
    ],
    images: ["darkPlanks", "warmLiving", "livingWoodWall"],
    material: "drvo",
    applications: ["dom", "poslovni"],
    constructions: ["masivni"],
    species: ["jatoba", "teak-afrika", "wenge-kongo"],
    related: ["klasicni-masivni-parket", "dvoslojni-i-troslojni-parket", "chimiver-ljepila-lakovi-i-ulja"],
    askArea: true,
  },
  {
    slug: "pvc-podne-obloge",
    category: "pvc-i-tekstilni-podovi",
    name: "PVC podne obloge",
    tagline: "Dugotrajne elastične obloge",
    summary:
      "PVC podovi mogu trajati oko 20 godina, uz kvalitetu odabranu prema namjeni prostora i stručnu ugradnju.",
    description: [
      "PVC podovi mogu biti iznimno dugotrajni, oko dvadeset godina.",
      "Za takvu trajnost važno je odabrati kvalitetu primjerenu prostoru, profesionalno pripremiti podlogu i stručno postaviti pod. U tome vam pomažemo od prvog razgovora.",
    ],
    images: ["vinylEmptyRoom", "resilientCorridor"],
    material: "pvc",
    applications: ["dom", "poslovni"],
    specs: [
      { label: "Trajnost", value: "Oko 20 godina, uz odgovarajuću kvalitetu i stručnu ugradnju" },
      { label: "Ključno za trajnost", value: "Kvaliteta prema namjeni, priprema podloge, stručna ugradnja" },
    ],
    related: ["tekstilni-podovi", "dvoslojni-i-troslojni-parket"],
    askArea: true,
  },
  {
    slug: "tekstilni-podovi",
    category: "pvc-i-tekstilni-podovi",
    name: "Tekstilni podovi",
    tagline: "Toplina, tekstura i akustika",
    summary:
      "Dekorativna podna obloga koja bojom, tkanjem i uzorkom povezuje prostor u cjelinu, od ureda do hotelskih hodnika.",
    description: [
      "Tekstilna podna obloga je dekorativni element interijera. Bojom, tkanjem, strukturom ili uzorkom povezuje ostale elemente u skladnu cjelinu i prostoru daje toplinu.",
      "Veliki izbor gramatura, gustoća tkanja, dizajna i boja omogućava primjenu u svim prostorima, od poslovnih prostora i ureda do najprometnijih hodnika velikih hotela. Cijena je povoljna, niža nego kod drugih podnih obloga.",
    ],
    images: ["carpetBoardroom", "carpetLounge"],
    material: "tekstil",
    applications: ["poslovni", "dom"],
    specs: [
      { label: "Izbor", value: "Gramature, gustoće tkanja, dizajni i boje" },
      { label: "Cijena", value: "Niža u odnosu na ostale podne obloge" },
    ],
    related: ["pvc-podne-obloge", "kancelarijski-namjestaj"],
    askArea: true,
  },
  {
    slug: "wpc-vanjski-podovi",
    category: "vanjske-podne-obloge",
    name: "WPC vanjski podovi",
    tagline: "Wood Polymer Composite",
    summary:
      "Mješavina drvene piljevine i polimera koji ne štete okolišu, namijenjena prije svega otvorenim prostorima.",
    description: [
      "WPC (Wood Polymer Composite) materijal se uspješno proizvodi više od dvadeset godina u Sjevernoj Americi i najviše se ugrađuje na otvorenim prostorima.",
      "Sastoji se od drvene piljevine uprešane s polimerima koji ne štete okolišu.",
    ],
    images: ["deckAerial", "indoorOutdoorDeck", "glassPavilion"],
    material: "wpc",
    applications: ["vanjski"],
    specs: [{ label: "Sastav", value: "Drvena piljevina uprešana s polimerima koji ne štete okolišu" }],
    related: ["chimiver-ljepila-lakovi-i-ulja", "dierre-sigurnosna-vrata"],
    askArea: true,
  },
  {
    slug: "dierre-sigurnosna-vrata",
    category: "sigurnosna-vrata",
    name: "Dierre sigurnosna ulazna vrata",
    tagline: "Blindirana vrata, Italija",
    summary:
      "Široka paleta sigurnosnih ulaznih vrata kompanije Dierre iz Italije, jednog od svjetskih lidera u proizvodnji blindiranih vrata.",
    description: [
      "Ulazna vrata su granica između vašeg doma i cijelog svijeta i prvi znak vaše osobnosti.",
      "Nudimo široku paletu sigurnosnih ulaznih vrata kompanije Dierre iz Italije, koja je među vodećim svjetskim proizvođačima blindiranih vrata.",
    ],
    images: ["frontDoorFacade", "darkDoorArmchair", "hallDoor"],
    material: "vrata",
    applications: ["dom", "poslovni"],
    manufacturers: ["dierre"],
    specs: [{ label: "Tip", value: "Sigurnosna (blindirana) ulazna vrata" }],
    related: ["dvoslojni-i-troslojni-parket", "klasicni-masivni-parket"],
    askArea: false,
  },
  {
    slug: "kancelarijski-namjestaj",
    category: "kancelarijski-namjestaj",
    name: "Kancelarijski namještaj",
    tagline: "Modeli i dekori po mjeri prostora",
    summary:
      "Bogat izbor modela, uz mogućnost odabira dekora, za kancelarije koje su privlačne i ugodne za rad.",
    description: [
      "Ponuda kancelarijskog namještaja namijenjena je širokom krugu kupaca i može se prilagoditi vašim potrebama.",
      "Uz bogat izbor modela i mogućnost odabira dekora, svaka kancelarija može biti privlačna i ugodna za rad te ispuniti vaše kriterije dizajna i funkcionalnosti.",
    ],
    images: ["officeLounge", "officeWindow", "lobbySlats"],
    material: "namjestaj",
    applications: ["poslovni"],
    specs: [{ label: "Prilagodba", value: "Izbor modela i dekora" }],
    related: ["tekstilni-podovi", "pvc-podne-obloge"],
    askArea: false,
  },
  {
    slug: "chimiver-ljepila-lakovi-i-ulja",
    category: "ljepila-lakovi-i-njega",
    name: "Chimiver ljepila, lakovi i ulja",
    tagline: "Postavljanje, zaštita, održavanje",
    summary:
      "Ljepila, lakovi, ulja i sredstva za održavanje drvenih podova talijanskog proizvođača Chimiver.",
    description: [
      "Chimiver stalno proširuje asortiman, a danas obuhvata sve što je potrebno za postavljanje, završnu obradu i njegu drvenih podova.",
    ],
    images: ["oakSideboard", "darkPlanks"],
    material: "zavrsna-obrada",
    applications: ["dom", "poslovni", "vanjski"],
    manufacturers: ["chimiver"],
    range: [
      {
        title: "Ljepila za drvene podove",
        items: ["Disperzivna ljepila", "Dvokomponentna PU ljepila", "Trajnoelastična jednokomponentna ljepila na bazi silana"],
      },
      {
        title: "Temeljni i završni lakovi",
        items: [
          "Klasični jedno- i dvokomponentni poliuretanski lakovi",
          "Ekološki jedno- i dvokomponentni vodeni lakovi",
        ],
      },
      { title: "Ulja", items: ["Za unutarnje i vanjske drvene podove, u širokom izboru boja"] },
      { title: "Priprema i njega", items: ["Tekućine za kitanje", "Sredstva za čišćenje i održavanje drvenih podova"] },
    ],
    related: ["dvoslojni-i-troslojni-parket", "klasicni-masivni-parket", "wpc-vanjski-podovi"],
    askArea: false,
  },
];

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<string, Product>;

export const productsInCategory = (slug: string) => products.filter((p) => p.category === slug);

export const productHref = (p: Product) => `/kolekcije/${p.category}/${p.slug}`;
export const categoryHref = (c: Category | string) => `/kolekcije/${typeof c === "string" ? c : c.slug}`;

/** Service areas named on the current homepage. */
export const serviceAreas = [
  { name: "Rezidencijalni prostori", text: "Stanovi i kuće: podovi, ulazna vrata i završna obrada." },
  { name: "Poslovni prostori", text: "Uredi i kancelarije: podne obloge i kancelarijski namještaj." },
  { name: "Komercijalni prostori", text: "Hoteli i javni prostori: obloge za veliko opterećenje." },
] as const;
