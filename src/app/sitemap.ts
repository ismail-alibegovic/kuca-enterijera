import type { MetadataRoute } from "next";
import { categories, categoryHref, productHref, products } from "@/content/catalog";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/kolekcije", "/inspiracija", "/o-nama", "/kontakt"].map((p) => ({
    url: absolute(p),
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...categories.map((c) => ({ url: absolute(categoryHref(c)), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: absolute(productHref(p)), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
