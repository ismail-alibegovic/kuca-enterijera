/**
 * Central business configuration.
 *
 * Every value here comes from the existing website (kuca-enterijera.ba, audited 31 Oct 2026)
 * unless explicitly marked otherwise. Fields that need client confirmation are flagged
 * in `pendingVerification`. See docs/research.md §1 for the audit.
 */

export const site = {
  name: "Kuća Enterijera",
  legalDisplayName: "KUĆA ENTERIJERA",
  tagline: "Parketni centar Sarajevo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kuca-enterijera.ba",
  locale: "bs_BA",
  language: "bs",
  /** Static to keep pages fully prerenderable; update yearly. */
  copyrightYear: 2026,

  description:
    "Parketni centar u Sarajevu: dvoslojni, troslojni i masivni parketi, PVC i tekstilni podovi, WPC vanjske podne obloge, sigurnosna vrata Dierre, kancelarijski namještaj te ljepila i lakovi za drvene podove.",

  showroom: {
    /** Confirmed by the client (31 Oct 2026). */
    street: "Alipašina 55",
    postalCode: "71000",
    city: "Sarajevo",
    country: "Bosna i Hercegovina",
    countryCode: "BA",
    /** Previously listed on the contact page/footer of the old site; superseded by Alipašina 55. */
    previousAddress: "Hiseta 19",
    /** Opening hours are not published on the existing website, so leave this null until confirmed. */
    openingHours: null as null | { days: string; hours: string }[],
    /** Map links use an address search (no exact coordinates were verified). */
    mapsQuery: "Alipašina 55, 71000 Sarajevo",
  },

  contact: {
    phones: [
      { display: "+387 61 221 173", href: "tel:+38761221173", label: "Mobitel" },
      { display: "+387 61 295 279", href: "tel:+38761295279", label: "Mobitel" },
      { display: "+387 33 21 45 03", href: "tel:+38733214503", label: "Fiksni" },
    ],
    emails: [
      { display: "info@kuca-enterijera.ba", href: "mailto:info@kuca-enterijera.ba" },
      { display: "kuca.enterijera@bih.net.ba", href: "mailto:kuca.enterijera@bih.net.ba" },
    ],
    /** The existing site shows an empty "Soc. mreže" heading, so no verified profiles. */
    social: [] as { label: string; href: string }[],
  },

  /**
   * Claimed on the current "O nama" page. ISO 9001:2008 was withdrawn in 2018, so the claim
   * is at least out of date. It stays hidden until the client supplies current certificates.
   */
  certifications: {
    display: false,
    claimedOnLegacySite: ["ISO 9001:2008", "FSC", "ISO"],
  },

  /**
   * Brand presentation switch.
   *  - "proposal": modernised logo treatment (src/components/brand/Logo.tsx, public/brand/proposal)
   *  - "original": the existing logo (public/brand/original/ke-logo.png, 233×60 px raster)
   * The original asset is preserved untouched. Switching back is this one line.
   */
  brandLogo: "proposal" as "proposal" | "original",

  pendingVerification: [
    "Radno vrijeme salona",
    "Važeći certifikati (ISO / FSC)",
    "Profili na društvenim mrežama",
    "Fotografije salona, tima i realiziranih projekata",
    "Pojedinačni proizvodi, dimenzije i tehnički listovi po proizvođaču",
  ],
} as const;

export const primaryPhone = site.contact.phones[0];
export const primaryEmail = site.contact.emails[0];

export const fullAddress = `${site.showroom.street}, ${site.showroom.postalCode} ${site.showroom.city}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.showroom.mapsQuery,
)}`;
export const osmUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(
  site.showroom.mapsQuery,
)}`;

export const nav = [
  { href: "/kolekcije", label: "Kolekcije" },
  { href: "/inspiracija", label: "Inspiracija" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Salon i kontakt" },
] as const;
