import type { Metadata } from "next";
import { Doors } from "@/components/home/Doors";
import { Floors } from "@/components/home/Floors";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Marquee } from "@/components/home/Marquee";
import { Offer } from "@/components/home/Offer";
import { ParquetFeature } from "@/components/home/ParquetFeature";
import { Partners } from "@/components/home/Partners";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const title = "Kuća Enterijera: parketi, podne obloge i sigurnosna vrata, Sarajevo";

export const metadata: Metadata = {
  ...pageMetadata({ title, description: site.description, path: "/" }),
  title: { absolute: title },
};

/**
 * Customer journey: who we are → what we sell → parquet first → other floors → doors →
 * whose products → visit the showroom / ask for a quote (closing block in the footer).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Marquee />
      <Offer />
      <ParquetFeature />
      <Floors />
      <Doors />
      <Partners />
    </>
  );
}
