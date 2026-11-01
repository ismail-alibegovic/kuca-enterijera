import type { StaticImageData } from "next/image";

import living from "@/assets/site/living-oak-floor.jpg";
import livingDark from "@/assets/site/living-dark-floor.jpg";
import bedroom from "@/assets/site/bedroom-oak-floor.jpg";
import corridor from "@/assets/site/corridor-black-doors.jpg";
import dining from "@/assets/site/dining-light-floor.jpg";
import lounge from "@/assets/site/lounge-wood-wall.jpg";
import conference from "@/assets/site/conference-room.jpg";
import officeChair from "@/assets/site/office-chair.jpg";
import sideboard from "@/assets/site/sideboard.jpg";
import sofa from "@/assets/site/sofa-white-floor.jpg";
import bathroom from "@/assets/site/bathroom.jpg";

/**
 * Provenance of an image.
 *  - "legacy":       photography taken from the client's current website (kuca-enterijera.ba), used for this demo
 *  - "illustrative": licensed stock used temporarily
 *  - "company":      authentic photography supplied by Kuća Enterijera
 *  - "manufacturer": manufacturer-approved product imagery
 * The 2022 category sketches on the old site carry stock watermarks and are deliberately not used.
 */
export type Provenance = "legacy" | "illustrative" | "company" | "manufacturer";

export type Media = {
  src: StaticImageData;
  alt: string;
  provenance: Provenance;
  source: string;
  license: string;
  /** Focal point used for object-position on tight crops. */
  focus?: string;
};

const SITE = "https://kuca-enterijera.ba";
const fileUrl: Record<string, string> = {
  living: `${SITE}/wp-content/uploads/2022/08/1d-1.jpg`,
  livingDark: `${SITE}/wp-content/uploads/2022/08/2d.jpg`,
  bedroom: `${SITE}/wp-content/uploads/2022/08/3d.jpg`,
  corridor: `${SITE}/wp-content/uploads/2022/08/4d.jpg`,
  dining: `${SITE}/wp-content/uploads/2017/05/image-interior-home.jpg`,
  lounge: `${SITE}/wp-content/uploads/2017/05/motive-slider-01.jpg`,
  conference: `${SITE}/wp-content/uploads/2017/05/image-office-chairs.jpg`,
  officeChair: `${SITE}/wp-content/uploads/2017/05/image-chair-blue-wall.jpg`,
  sideboard: `${SITE}/wp-content/uploads/2016/07/image-about-design-process.jpg`,
  sofa: `${SITE}/wp-content/uploads/2016/07/bg-clients.jpg`,
  bathroom: `${SITE}/wp-content/uploads/2016/07/bg-heading-01.jpg`,
};

const m = (src: StaticImageData, key: string, alt: string, focus?: string): Media => ({
  src,
  alt,
  provenance: "legacy",
  source: fileUrl[key],
  license: "S postojeće web stranice kuca-enterijera.ba (potrebna potvrda prava korištenja)",
  focus,
});

export const media = {
  herringboneLiving: m(living, "living", "Prostrani dnevni boravak s toplim drvenim podom", "45% 75%"),
  herringbonePortrait: m(dining, "dining", "Dnevni prostor sa svijetlim drvenim podom i blagovaonicom", "65% 80%"),
  herringboneTimberCeiling: m(livingDark, "livingDark", "Dnevni boravak s tamnim drvenim podom i pogledom na terasu", "40% 70%"),
  chevronKitchen: m(dining, "dining", "Otvoreni dnevni prostor sa svijetlim drvenim podom", "60% 75%"),
  oakQuietRoom: m(bedroom, "bedroom", "Spavaća soba s hrastovim podom od dugih dasaka", "25% 80%"),
  oakDeskPlaster: m(bedroom, "bedroom", "Hrastov pod u spavaćoj sobi uz biljku i fotelju", "28% 75%"),
  oakSideboard: m(sideboard, "sideboard", "Drvena komoda i fotelja na svijetlom drvenom podu", "25% 70%"),
  darkPlanks: m(lounge, "lounge", "Prostor s tamnom drvenom zidnom oblogom i foteljama", "70% 50%"),
  deckAerial: m(livingDark, "livingDark", "Dnevni boravak otvoren prema terasi", "15% 50%"),
  indoorOutdoorDeck: m(livingDark, "livingDark", "Dnevni boravak s drvenim podom koji vodi prema terasi", "30% 70%"),
  glassPavilion: m(bathroom, "bathroom", "Svijetla kupaonica uz velike prozore", "30% 50%"),
  carpetBoardroom: m(conference, "conference", "Sala za sastanke s drvenim podom i pogledom na grad", "50% 70%"),
  carpetLounge: m(lounge, "lounge", "Lounge prostor s foteljama i tamnim zidom", "55% 70%"),
  resilientCorridor: m(corridor, "corridor", "Dugi hodnik sa sjajnim podom i tamnim vratima", "50% 60%"),
  vinylEmptyRoom: m(living, "living", "Dnevni prostor s jednolično postavljenim podom", "30% 80%"),
  frontDoorFacade: m(corridor, "corridor", "Hodnik s tamnim ulaznim vratima", "88% 55%"),
  hallDoor: m(corridor, "corridor", "Tamna vrata u svijetlom hodniku", "45% 55%"),
  darkDoorArmchair: m(corridor, "corridor", "Tamna vrata u modernom interijeru", "70% 55%"),
  officeWindow: m(conference, "conference", "Sala za sastanke s velikim prozorima", "60% 50%"),
  officeLounge: m(officeChair, "officeChair", "Uredska fotelja i komoda", "70% 60%"),
  lobbySlats: m(lounge, "lounge", "Prostor s drvenom zidnom oblogom", "45% 50%"),
  houseTimberNight: m(living, "living", "Dnevni boravak s drvenim podom", "50% 70%"),
  houseDusk: m(livingDark, "livingDark", "Dnevni boravak s drvenim podom", "50% 70%"),
  livingWoodWall: m(dining, "dining", "Dnevni prostor sa zidnom oblogom i drvenim podom", "30% 70%"),
  staircaseOak: m(sofa, "sofa", "Sofa na svijetlom drvenom podu", "50% 80%"),
  warmLiving: m(livingDark, "livingDark", "Topli dnevni boravak s tamnim drvenim podom", "45% 70%"),
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

export const getMedia = (key: MediaKey) => media[key];
