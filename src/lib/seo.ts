import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { media, type MediaKey } from "@/content/media";
import { fullAddress, site } from "@/content/site";

export const absolute = (path: string) => new URL(path, site.url).toString();

export function pageMetadata({
  title,
  description,
  path,
  image = "oakFloorChair",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: MediaKey;
  noindex?: boolean;
}): Metadata {
  const img: StaticImageData = media[image].src;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [{ url: img.src, width: img.width, height: img.height, alt: media[image].alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img.src] },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "HomeAndConstructionBusiness"],
    "@id": absolute("/#business"),
    name: site.name,
    description: site.description,
    url: site.url,
    image: absolute(media.oakFloorChair.src.src),
    logo: absolute("/brand/original/ke-logo.png"),
    telephone: site.contact.phones.map((p) => p.href.replace("tel:", "")),
    email: site.contact.emails.map((e) => e.display),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.showroom.street,
      postalCode: site.showroom.postalCode,
      addressLocality: site.showroom.city,
      addressCountry: site.showroom.countryCode,
    },
    areaServed: { "@type": "City", name: "Sarajevo" },
    // openingHoursSpecification intentionally omitted: hours are not verified.
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}
