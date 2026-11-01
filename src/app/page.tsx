import type { Metadata } from "next";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { FeaturedBoards } from "@/components/home/FeaturedBoards";
import { Hero } from "@/components/home/Hero";
import { InspirationTeaser } from "@/components/home/InspirationTeaser";
import { Intro } from "@/components/home/Intro";
import { MaterialStory } from "@/components/home/MaterialStory";
import { Partners } from "@/components/home/Partners";
import { ShowroomCta } from "@/components/home/ShowroomCta";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Kuća Enterijera: parketi, podne obloge i sigurnosna vrata, Sarajevo",
    description: site.description,
    path: "/",
  }),
  title: { absolute: "Kuća Enterijera: parketi, podne obloge i sigurnosna vrata, Sarajevo" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <CategoryIndex />
      <FeaturedBoards />
      <MaterialStory />
      <InspirationTeaser />
      <Partners index="07" />
      <ShowroomCta index="08" />
    </>
  );
}
