import type { StaticImageData } from "next/image";

import herringboneLivingImg from "@/assets/photo/hero-slats.jpg";
import herringbonePortraitImg from "@/assets/photo/bedroom-herringbone.jpg";
import herringboneTimberCeilingImg from "@/assets/photo/herringbone-detail.jpg";
import herringboneStoolImg from "@/assets/photo/herringbone-stool.jpg";
import chevronKitchenImg from "@/assets/photo/kitchen-dining.jpg";
import oakQuietRoomImg from "@/assets/photo/living-minimal.jpg";
import oakDeskPlasterImg from "@/assets/photo/desk-lamp.jpg";
import oakSideboardImg from "@/assets/photo/finish-brush.jpg";
import darkPlanksImg from "@/assets/photo/dark-planks.jpg";
import deckAerialImg from "@/assets/photo/terrace-evening.jpg";
import indoorOutdoorDeckImg from "@/assets/photo/deck-chairs.jpg";
import glassPavilionImg from "@/assets/photo/living-dusk.jpg";
import carpetBoardroomImg from "@/assets/photo/boardroom.jpg";
import carpetLoungeImg from "@/assets/photo/corridor-carpet.jpg";
import resilientCorridorImg from "@/assets/photo/corridor-warm.jpg";
import vinylEmptyRoomImg from "@/assets/photo/living-window-grey.jpg";
import frontDoorFacadeImg from "@/assets/photo/timber-door.jpg";
import hallDoorImg from "@/assets/photo/black-door.jpg";
import darkDoorArmchairImg from "@/assets/photo/dark-curtain-room.jpg";
import officeWindowImg from "@/assets/photo/stone-wall-table.jpg";
import officeLoungeImg from "@/assets/photo/leather-sofa.jpg";
import lobbySlatsImg from "@/assets/photo/wood-ceiling.jpg";
import houseTimberNightImg from "@/assets/photo/house-night.jpg";
import houseDuskImg from "@/assets/photo/house-dusk.jpg";
import livingWoodWallImg from "@/assets/photo/wall-light.jpg";
import staircaseOakImg from "@/assets/photo/staircase.jpg";
import warmLivingImg from "@/assets/photo/living-wall-lights.jpg";

/**
 * Provenance of an image. The site must never present illustrative imagery as company work.
 *  - "illustrative": licensed stock (Unsplash) used as mood imagery, not Kuća Enterijera products or projects
 *  - "company":      authentic photography supplied by Kuća Enterijera (none available yet)
 *  - "manufacturer": manufacturer-approved product imagery (none available yet)
 *
 * Every photograph is colour-graded to one look (scripts/grade-photos.py): low-key exposure, warm shadows,
 * matte blacks, reduced saturation and a soft vignette, so stock from different photographers reads as one set.
 */
export type Provenance = "illustrative" | "company" | "manufacturer";

export type Media = {
  src: StaticImageData;
  alt: string;
  provenance: Provenance;
  source: string;
  license: string;
  credit: string;
  /** Focal point used for object-position on tight crops. */
  focus?: string;
};

const UNSPLASH_LICENSE = "Unsplash License (besplatna komercijalna upotreba)";

const m = (src: StaticImageData, alt: string, id: string, author: string, username: string, focus?: string): Media => ({
  src,
  alt,
  provenance: "illustrative",
  source: `https://unsplash.com/photos/${id}`,
  license: UNSPLASH_LICENSE,
  credit: `${author} (unsplash.com/@${username}), uz prilagođenu obradu boja`,
  focus,
});

export const media = {
  herringboneLiving: m(herringboneLivingImg, "Tamni dnevni boravak sa zidom od vertikalnih lamela i niskom sofom", "0Lmk3BC5GEE", "Levente Gyulai", "gyulailevi", "50% 60%"),
  herringbonePortrait: m(herringbonePortraitImg, "Spavaća soba s tamnim parketom u uzorku riblje kosti", "ccydTEH5x7E", "Ralph Darabos", "darabosralph", "50% 80%"),
  herringboneTimberCeiling: m(herringboneTimberCeilingImg, "Detalj hrastovog parketa u uzorku riblje kosti", "kS1UuxzkuJE", "DDP", "moino007", "50% 50%"),
  herringboneStool: m(herringboneStoolImg, "Svjetlo i sjena na hrastovom parketu, uz nogu tabureta", "Bh0zdFV1r_4", "Aurelien Thomas", "aurelienthms", "40% 60%"),
  chevronKitchen: m(chevronKitchenImg, "Tamna kuhinja i blagovaonica s drvenim podom", "3-GXEUE_sCc", "Kam Idris", "ka_idris", "50% 65%"),
  oakQuietRoom: m(oakQuietRoomImg, "Minimalistički dnevni boravak u tamnim tonovima", "4Q9aOJF-6vI", "Prydumano Design", "prydumanodesign", "50% 70%"),
  oakDeskPlaster: m(oakDeskPlasterImg, "Radni stol pod toplim svjetlom stolne lampe", "pEzzhBgPX60", "Julia Shvydka", "julia_shv", "50% 55%"),
  oakSideboard: m(oakSideboardImg, "Nanošenje zaštitnog premaza kistom na drvenu površinu", "rxorF_Bs0ak", "Doug Bagg", "dougbagg_", "50% 55%"),
  darkPlanks: m(darkPlanksImg, "Detalj tamnih drvenih dasaka s izraženim godovima", "NKz8DHaS_d0", "Sergey Kotenev", "sergeykotenev", "50% 50%"),
  deckAerial: m(deckAerialImg, "Drvena terasa u predvečerje s vanjskim namještajem", "5eW9AG8Me9o", "Jonathan Cooper", "theshuttervision", "50% 70%"),
  indoorOutdoorDeck: m(indoorOutdoorDeckImg, "Stolice i stol na vanjskoj drvenoj terasi", "RKMRBnyaxNs", "X F", "aizerd", "50% 60%"),
  glassPavilion: m(glassPavilionImg, "Dnevni boravak u sumrak, uz veliki prozor", "hlOpCML8twI", "Christian Lambert", "_christianlambert", "50% 60%"),
  carpetBoardroom: m(carpetBoardroomImg, "Sala za sastanke s kožnim stolicama u tamnom tonu", "Q31mm9jfUWU", "Caroline Badran", "___atmos", "50% 60%"),
  carpetLounge: m(carpetLoungeImg, "Dugi hodnik s tekstilnom podnom oblogom i linijskim svjetlom", "2vmX6WB90ss", "Jacques Isner", "jackodu38", "50% 70%"),
  resilientCorridor: m(resilientCorridorImg, "Hotelski hodnik s tepihom i toplim zidnim svjetlom", "IUi6KRavD3Q", "Nicolás Varela", "polygraph", "50% 60%"),
  vinylEmptyRoom: m(vinylEmptyRoomImg, "Dnevni boravak s jednoličnim podom i velikim prozorom", "6ybDmGNE2Yg", "Prydumano Design", "prydumanodesign", "50% 70%"),
  frontDoorFacade: m(frontDoorFacadeImg, "Ulazna vrata u tamnoj drvenoj fasadi", "SXNwtxhR3Zc", "Will Palmer", "willpalmer13", "50% 50%"),
  hallDoor: m(hallDoorImg, "Crna ulazna vrata u betonskom zidu", "nnzPkeAMAuU", "Eddie Hsu", "storyofeddie", "50% 55%"),
  darkDoorArmchair: m(darkDoorArmchairImg, "Tamna soba sa zavjesama i foteljom", "41CzsjzdkRQ", "Anton Sobotyak", "a_sobotyak", "50% 55%"),
  officeWindow: m(officeWindowImg, "Stol i stolice uz osvijetljeni kameni zid", "8og8EDtnc9w", "Anton Sobotyak", "a_sobotyak", "45% 60%"),
  officeLounge: m(officeLoungeImg, "Kožna fotelja u minimalističkom poslovnom prostoru", "gsZ5nKQI0EE", "Aliaksei Liohenki", "alexlightart", "40% 70%"),
  lobbySlats: m(lobbySlatsImg, "Zakrivljeni drveni strop s toplim indirektnim svjetlom", "JS3BH31COQg", "zai Dan", "danzai_ph", "50% 50%"),
  houseTimberNight: m(houseTimberNightImg, "Ulaz u kuću osvijetljen noću", "NZSo-R04jY4", "rawkkim", "rawkkim", "50% 60%"),
  houseDusk: m(houseDuskImg, "Moderna kuća s velikim staklenim stijenama u sumrak", "ePC_72F8kGU", "islam allam", "islam006", "50% 55%"),
  livingWoodWall: m(livingWoodWallImg, "Okrugla zidna svjetiljka na tamnom zidu iznad sofe", "toIoPAEVOJs", "Alessandro Guarino", "alessguarino", "50% 40%"),
  staircaseOak: m(staircaseOakImg, "Drveno stubište s toplim svjetlom", "bj_CONbJuYc", "Mavi Atlas", "maviatlas", "50% 50%"),
  warmLiving: m(warmLivingImg, "Tamni dnevni boravak sa zidnim svjetiljkama i niskom sofom", "7-9QPJAB6es", "Joao Vitor Torres", "torreszera", "50% 60%"),
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

export const getMedia = (key: MediaKey) => media[key];
