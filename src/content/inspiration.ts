import type { MediaKey } from "./media";

/**
 * Projects & inspiration.
 *
 * The existing site's "Naši klijenti" portfolio is EMPTY, so no verified Kuća Enterijera projects
 * exist yet. Every entry below is `kind: "inspiration"` with illustrative imagery and is labelled as such.
 * When real projects are supplied, add entries with `kind: "project"` plus `client`, `location`, `year`.
 * The UI already separates the two kinds.
 */

export type Space = "rezidencijalni" | "poslovni" | "komercijalni";

export const spaceLabels: Record<Space, string> = {
  rezidencijalni: "Rezidencijalni",
  poslovni: "Poslovni",
  komercijalni: "Komercijalni",
};

export type InspirationEntry = {
  id: string;
  kind: "inspiration" | "project";
  title: string;
  note: string;
  space: Space;
  image: MediaKey;
  /** Product lines that fit the mood. Not a claim that they were used. */
  relatedProducts: string[];
  client?: string;
  location?: string;
  year?: number;
};

export const inspiration: InspirationEntry[] = [
  {
    id: "riblja-kost-svjetlo",
    kind: "inspiration",
    title: "Riblja kost u punom svjetlu",
    note: "Svijetli hrast složen u riblju kost daje prostoru ritam, ali ga ne opterećuje.",
    space: "rezidencijalni",
    image: "herringboneLiving",
    relatedProducts: ["dvoslojni-i-troslojni-parket"],
  },
  {
    id: "drvo-od-poda-do-stropa",
    kind: "inspiration",
    title: "Drvo od poda do stropa",
    note: "Kada se pod i strop sretnu u istom materijalu, prostor se doima kao jedna cjelina.",
    space: "rezidencijalni",
    image: "herringboneTimberCeiling",
    relatedProducts: ["dvoslojni-i-troslojni-parket", "klasicni-masivni-parket"],
  },
  {
    id: "tiha-soba",
    kind: "inspiration",
    title: "Tiha soba, duge daske",
    note: "Prazan prostor i dugi formati dasaka ističu prirodni crtež drveta.",
    space: "rezidencijalni",
    image: "oakQuietRoom",
    relatedProducts: ["klasicni-masivni-parket"],
  },
  {
    id: "terasa-iznad-vrta",
    kind: "inspiration",
    title: "Terasa kao vanjska soba",
    note: "Vanjski pod koji nastavlja liniju unutrašnjeg prostora.",
    space: "rezidencijalni",
    image: "deckAerial",
    relatedProducts: ["wpc-vanjski-podovi"],
  },
  {
    id: "sala-za-sastanke",
    kind: "inspiration",
    title: "Sala za sastanke",
    note: "Tekstilna obloga smiruje akustiku i zvuk koraka u prometnom poslovnom prostoru.",
    space: "poslovni",
    image: "carpetBoardroom",
    relatedProducts: ["tekstilni-podovi", "kancelarijski-namjestaj"],
  },
  {
    id: "otvoreni-ured",
    kind: "inspiration",
    title: "Otvoreni ured",
    note: "Zone za rad i odmor povezane jednim, mirnim podom.",
    space: "poslovni",
    image: "officeLounge",
    relatedProducts: ["kancelarijski-namjestaj", "pvc-podne-obloge"],
  },
  {
    id: "predvorje-lamele",
    kind: "inspiration",
    title: "Predvorje s drvenim lamelama",
    note: "Topli materijali u prostoru kroz koji prolaze mnogi.",
    space: "komercijalni",
    image: "lobbySlats",
    relatedProducts: ["tekstilni-podovi", "egzoticni-masivni-parket"],
  },
  {
    id: "hodnik",
    kind: "inspiration",
    title: "Dugi hodnik",
    note: "Jednobojna elastična obloga za prostore s puno prometa.",
    space: "komercijalni",
    image: "resilientCorridor",
    relatedProducts: ["pvc-podne-obloge"],
  },
  {
    id: "ulaz",
    kind: "inspiration",
    title: "Ulaz kao prvi utisak",
    note: "Ulazna vrata su prvo što gost vidi i posljednje što zaključate.",
    space: "rezidencijalni",
    image: "frontDoorFacade",
    relatedProducts: ["dierre-sigurnosna-vrata"],
  },
  {
    id: "kuhinja-chevron",
    kind: "inspiration",
    title: "Kuhinja i drvo",
    note: "Svijetli pod uz tamne drvene fronte stvara kontrast bez buke.",
    space: "rezidencijalni",
    image: "chevronKitchen",
    relatedProducts: ["dvoslojni-i-troslojni-parket"],
  },
  {
    id: "unutra-van",
    kind: "inspiration",
    title: "Unutra i vani",
    note: "Kada se dnevni boravak otvori prema terasi, granicu čine samo materijali.",
    space: "rezidencijalni",
    image: "indoorOutdoorDeck",
    relatedProducts: ["wpc-vanjski-podovi", "klasicni-masivni-parket"],
  },
  {
    id: "radni-prostor-svjetlo",
    kind: "inspiration",
    title: "Radni prostor uz staklo",
    note: "Kancelarija u kojoj svjetlo radi pola posla.",
    space: "poslovni",
    image: "officeWindow",
    relatedProducts: ["kancelarijski-namjestaj"],
  },
];

export const realProjects = inspiration.filter((i) => i.kind === "project");
