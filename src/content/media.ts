import type { StaticImageData } from "next/image";

import carpetBoardroom from "@/assets/photo/carpet-boardroom.jpg";
import carpetLounge from "@/assets/photo/carpet-lounge.jpg";
import chevronKitchen from "@/assets/photo/chevron-kitchen.jpg";
import darkDoorArmchair from "@/assets/photo/dark-door-armchair.jpg";
import darkPlanks from "@/assets/photo/dark-planks.jpg";
import deckAerial from "@/assets/photo/deck-aerial.jpg";
import frontDoorFacade from "@/assets/photo/front-door-facade.jpg";
import glassPavilion from "@/assets/photo/glass-pavilion.jpg";
import hallDoor from "@/assets/photo/hall-door.jpg";
import herringboneLiving from "@/assets/photo/herringbone-living.jpg";
import herringbonePortrait from "@/assets/photo/herringbone-portrait.jpg";
import herringboneTimberCeiling from "@/assets/photo/herringbone-timber-ceiling.jpg";
import houseDusk from "@/assets/photo/house-dusk.jpg";
import houseTimberNight from "@/assets/photo/house-timber-night.jpg";
import indoorOutdoorDeck from "@/assets/photo/indoor-outdoor-deck.jpg";
import livingWoodWall from "@/assets/photo/living-wood-wall.jpg";
import lobbySlats from "@/assets/photo/lobby-slats.jpg";
import oakDeskPlaster from "@/assets/photo/oak-desk-plaster.jpg";
import oakQuietRoom from "@/assets/photo/oak-quiet-room.jpg";
import oakSideboard from "@/assets/photo/oak-sideboard.jpg";
import officeLounge from "@/assets/photo/office-lounge.jpg";
import officeWindow from "@/assets/photo/office-window.jpg";
import resilientCorridor from "@/assets/photo/resilient-corridor.jpg";
import staircaseOak from "@/assets/photo/staircase-oak.jpg";
import vinylEmptyRoom from "@/assets/photo/vinyl-empty-room.jpg";
import warmLiving from "@/assets/photo/warm-living.jpg";

/**
 * Provenance of an image. The site must never present illustrative imagery as company work.
 *  - "illustrative": licensed stock used temporarily (not Kuća Enterijera products/projects)
 *  - "company":      authentic photography supplied by Kuća Enterijera (none available yet)
 *  - "manufacturer": manufacturer-approved product imagery (none available yet)
 */
export type Provenance = "illustrative" | "company" | "manufacturer";

export type Media = {
  src: StaticImageData;
  alt: string;
  provenance: Provenance;
  source: string;
  license: string;
  /** Focal point used for object-position on tight crops. */
  focus?: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
const UNSPLASH_LICENSE = "Unsplash License (besplatna komercijalna upotreba)";

const m = (src: StaticImageData, alt: string, id: string, focus?: string): Media => ({
  src,
  alt,
  provenance: "illustrative",
  source: unsplash(id),
  license: UNSPLASH_LICENSE,
  focus,
});

export const media = {
  herringboneLiving: m(herringboneLiving, "Svijetli hrastov parket u uzorku riblje kosti ispod svijetle sofe", "1615800001964-5afd0ae8e49a", "50% 80%"),
  herringbonePortrait: m(herringbonePortrait, "Hrastov parket riblja kost u dnevnom boravku s tepihom i foteljom", "1615800002234-05c4d488696c", "50% 85%"),
  herringboneTimberCeiling: m(herringboneTimberCeiling, "Prostorija s drvenim stropom i podom u uzorku riblje kosti", "1618219908412-a29a1bb7b86e", "50% 85%"),
  chevronKitchen: m(chevronKitchen, "Kuhinja s drvenim zidnim oblogama i svijetlim podom u uzorku riblje kosti", "1622372738946-62e02505feb3", "50% 70%"),
  oakQuietRoom: m(oakQuietRoom, "Mirna, prazna prostorija s hrastovim podom od dugih dasaka", "1581858726788-75bc0f6a952d", "50% 80%"),
  oakDeskPlaster: m(oakDeskPlaster, "Drvena polica i radni stol uz zid od žbuke, iznad toplog drvenog poda", "1597072689227-8882273e8f6a", "50% 60%"),
  oakSideboard: m(oakSideboard, "Hrastova komoda uz toplo obojeni zid", "1616627781431-23b776aad6b2", "50% 60%"),
  darkPlanks: m(darkPlanks, "Detalj tamnih drvenih dasaka s izraženim godovima", "1546484396-fb3fc6f95f98", "50% 50%"),
  deckAerial: m(deckAerial, "Vanjska drvena terasa s vrtnim namještajem, pogled odozgo", "1617850687395-620757feb1f3", "50% 50%"),
  indoorOutdoorDeck: m(indoorOutdoorDeck, "Dnevni boravak koji se kroz staklene stijene nastavlja na drvenu terasu", "1604014237800-1c9102c219da", "50% 70%"),
  glassPavilion: m(glassPavilion, "Spavaća soba sa staklenim zidom i pogledom na terasu", "1600573472591-ee6b68d14c68", "60% 50%"),
  carpetBoardroom: m(carpetBoardroom, "Sala za sastanke s tekstilnom podnom oblogom i velikim prozorima", "1462826303086-329426d1aef5", "40% 60%"),
  carpetLounge: m(carpetLounge, "Siva sofa na tamnoj tekstilnoj podnoj oblozi", "1616627451515-cbc80e5ece35", "50% 75%"),
  resilientCorridor: m(resilientCorridor, "Dugi uredski hodnik s jednobojnom elastičnom podnom oblogom", "1497366216548-37526070297c", "50% 60%"),
  vinylEmptyRoom: m(vinylEmptyRoom, "Prazna svijetla prostorija s podnom oblogom u dekoru drveta", "1630699144867-37acec97df5a", "50% 70%"),
  frontDoorFacade: m(frontDoorFacade, "Ulaz u modernu kuću s drvenom fasadom i ulaznim vratima", "1628744448840-55bdb2497bd4", "50% 55%"),
  hallDoor: m(hallDoor, "Ulazni hodnik s okruglim ogledalom, klupom i vratima", "1618220252344-8ec99ec624b1", "50% 50%"),
  darkDoorArmchair: m(darkDoorArmchair, "Tamna vrata uz žutu fotelju na hrastovom podu", "1586023492125-27b2c045efd7", "20% 50%"),
  officeWindow: m(officeWindow, "Svijetli uredski prostor uz staklenu fasadu", "1497215728101-856f4ea42174", "50% 50%"),
  officeLounge: m(officeLounge, "Poslovni prostor s foteljama i radnim zonama", "1524758631624-e2822e304c36", "50% 60%"),
  lobbySlats: m(lobbySlats, "Predvorje s drvenim lamelama na zidu i toplim osvjetljenjem", "1621293954908-907159247fc8", "50% 50%"),
  houseTimberNight: m(houseTimberNight, "Moderna kuća s drvenom oblogom u sumrak", "1600585154340-be6161a56a0c", "50% 50%"),
  houseDusk: m(houseDusk, "Moderna kuća s tamnom fasadom i osvijetljenim prozorima", "1600585154363-67eb9e2e2099", "50% 50%"),
  livingWoodWall: m(livingWoodWall, "Dnevni boravak sa zidom od drveta i velikim kliznim stijenama", "1600585154084-4e5fe7c39198", "50% 60%"),
  staircaseOak: m(staircaseOak, "Drveno stubište i drveni pod u otvorenom dnevnom prostoru", "1600047508788-786f3865b4b9", "40% 60%"),
  warmLiving: m(warmLiving, "Topli dnevni boravak s drvenim podom i niskim prozorima", "1618221195710-dd6b41faaea6", "50% 60%"),
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

export const getMedia = (key: MediaKey) => media[key];
