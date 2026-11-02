import type { StaticImageData } from "next/image";

import companyBedroom from "@/assets/images/company/bedroom-oak-floor.jpg";
import companyLivingDark from "@/assets/images/company/living-dark-floor.jpg";
import companyLivingWide from "@/assets/images/company/living-wide-floor.jpg";
import companyCorridor from "@/assets/images/company/corridor-doors.jpg";
import lalegnoOak from "@/assets/images/partners/lalegno/oak-floor-chair.jpg";
import chimiverPlanks from "@/assets/images/partners/chimiver/oak-planks.jpg";
import chimiverAdhesive from "@/assets/images/partners/chimiver/adhesive-trowel.jpg";
import chimiverOils from "@/assets/images/partners/chimiver/oils-varnish-floor.jpg";
import itlasStudy from "@/assets/images/partners/itlas/oak-study.jpg";
import dierreInterior from "@/assets/images/partners/dierre/door-oak-interior.jpg";
import dierreVilla from "@/assets/images/partners/dierre/door-villa-exterior.jpg";
import dierreLock from "@/assets/images/partners/dierre/lock-detail.jpg";
import modulyssLvt from "@/assets/images/partners/modulyss/lvt-restaurant.jpg";
import modulyssHaelo from "@/assets/images/partners/modulyss/carpet-office-haelo.jpg";
import modulyssTweed from "@/assets/images/partners/modulyss/carpet-office-tweed.jpg";

/**
 * Image registry. Every image is traceable to its source. See docs/image-inventory.md.
 *
 *  - "company":      published by Kuća Enterijera on kuca-enterijera.ba (2022 homepage slider)
 *  - "manufacturer": product imagery from a manufacturer the company lists as a partner
 *                    on kuca-enterijera.ba/o-nama (logo wall or supplier list)
 *
 * No stock, AI-generated or theme-demo images are used. Manufacturer images are shown with the
 * manufacturer's name in the caption; dealer usage rights must be confirmed before production.
 */
export type Provenance = "company" | "manufacturer";

export type Media = {
  src: StaticImageData;
  alt: string;
  provenance: Provenance;
  /** Who the image belongs to, shown in captions where useful. */
  credit: string;
  source: string;
  /** Focal point for object-position on tight crops. */
  focus?: string;
};

const company = (src: StaticImageData, file: string, alt: string, focus?: string): Media => ({
  src,
  alt,
  provenance: "company",
  credit: "Kuća Enterijera",
  source: `https://kuca-enterijera.ba/wp-content/uploads/2022/08/${file}`,
  focus,
});

const maker = (src: StaticImageData, credit: string, source: string, alt: string, focus?: string): Media => ({
  src,
  alt,
  provenance: "manufacturer",
  credit,
  source,
  focus,
});

export const media = {
  /* Kuća Enterijera website (2022 homepage slider) */
  bedroomOak: company(companyBedroom, "3d.jpg", "Spavaća soba s toplim drvenim podom od dugih dasaka", "62% 70%"),
  livingDark: company(companyLivingDark, "2d.jpg", "Dnevni boravak s tamnim drvenim podom", "40% 70%"),
  livingWide: company(companyLivingWide, "1d-1.jpg", "Prostran dnevni boravak s drvenim podom", "45% 75%"),
  corridorDoors: company(companyCorridor, "4d.jpg", "Hodnik s tamnim ulaznim vratima", "70% 55%"),

  /* Partner manufacturers */
  oakFloorChair: maker(
    lalegnoOak,
    "Lalegno",
    "https://www.lalegno.com/",
    "Svijetli hrastov parket uz drvenu stolicu i radni stol",
    "50% 70%",
  ),
  oakPlanks: maker(
    chimiverPlanks,
    "Chimiver",
    "https://chimiver.com/wp-content/uploads/2022/12/Privati.jpg",
    "Hrastov parket od širokih dasaka izbliza",
    "40% 55%",
  ),
  adhesiveTrowel: maker(
    chimiverAdhesive,
    "Chimiver",
    "https://chimiver.com/wp-content/uploads/2022/12/Professionisti.jpg",
    "Ljepilo za parket nanešeno nazubljenom gleterom i daske hrastovog parketa",
    "50% 50%",
  ),
  oiledFloor: maker(
    chimiverOils,
    "Chimiver",
    "https://chimiver.com/wp-content/uploads/2023/11/Oli-e-Vernici_2560.jpg",
    "Hodnik s drvenim podom zaštićenim uljem i lakom",
    "45% 60%",
  ),
  oakStudy: maker(
    itlasStudy,
    "ITLAS",
    "https://www.itlas.com/wp-content/themes/itlas-child/img/home/itlas-arredo-metropolitan-frames.jpg",
    "Radna soba s hrastovim podom i drvenom zidnom oblogom",
    "50% 60%",
  ),
  doorInterior: maker(
    dierreInterior,
    "Dierre",
    "https://www.dierre.com/wp-content/uploads/2021/06/porte-blindate.jpg",
    "Sigurnosna vrata s hrastovom oblogom u modernom interijeru",
    "48% 60%",
  ),
  doorVilla: maker(
    dierreVilla,
    "Dierre",
    "https://www.dierre.com/wp-content/uploads/2026/10/Dierre_SynergieOut_Villa.webp",
    "Ulazna sigurnosna vrata na vili uz bazen",
    "75% 55%",
  ),
  doorLock: maker(
    dierreLock,
    "Dierre",
    "https://www.dierre.com/wp-content/uploads/2021/06/ferramenta.jpg",
    "Detalj brave i zasuna sigurnosnih vrata",
    "45% 50%",
  ),
  lvtRestaurant: maker(
    modulyssLvt,
    "Modulyss",
    "https://www.modulyss.com/ (MODULYSS_Contextual_LVT.jpg)",
    "Restoran s elastičnom LVT podnom oblogom u toplim tonovima",
    "50% 65%",
  ),
  carpetOffice: maker(
    modulyssHaelo,
    "Modulyss",
    "https://www.modulyss.com/ (MODULYSS_Interior-Full_Haelo_Ray-651_Ray-950_Office_LR.jpg)",
    "Uredski prostor s tekstilnim podnim pločama",
    "40% 70%",
  ),
  carpetTweed: maker(
    modulyssTweed,
    "Modulyss",
    "https://www.modulyss.com/ (MODULYSS_Reference_HabauOffices_DSGNTweed)",
    "Poslovni prostor s tekstilnom podnom oblogom",
    "50% 70%",
  ),
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
