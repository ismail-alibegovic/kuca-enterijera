/**
 * Central business configuration.
 *
 * Every value comes from the existing website kuca-enterijera.ba (re-audited 1 Nov 2026).
 * Anything unverified is listed in `pendingVerification` and is not shown as fact.
 */

export const site = {
  name: "Kuća Enterijera",
  tagline: "Parketni centar Sarajevo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kuca-enterijera.ba",
  locale: "bs_BA",
  language: "bs",
  /** Static to keep pages fully prerenderable; update yearly. */
  copyrightYear: 2026,

  description:
    "Parketni centar u Sarajevu: dvoslojni, troslojni i masivni parketi, PVC i tekstilne podne obloge, WPC vanjski podovi, sigurnosna vrata Dierre, kancelarijski namještaj te ljepila i lakovi za drvene podove.",

  showroom: {
    /**
     * ADDRESS DISCREPANCY: still to be confirmed by the company.
     * kuca-enterijera.ba/kontakt ("U našem prodajnom salonu u ul. Hiseta 19") and the footer of every
     * page give Hiseta 19. Only the "O nama" text says the salon opened at Alipašina 55, which reads
     * as historical. No external listing could confirm either address. The site uses Hiseta 19,
     * the address the company currently gives for contact. Changing it is this one block.
     */
    street: "Hiseta 19",
    postalCode: "71000",
    city: "Sarajevo",
    country: "Bosna i Hercegovina",
    countryCode: "BA",
    /** Mentioned once on the legacy "O nama" page. Not displayed. */
    legacyAddressMention: "Alipašina 55",
    /** Not published on the existing website, so it stays null until confirmed. */
    openingHours: null as null | { days: string; hours: string }[],
    mapsQuery: "Hiseta 19, 71000 Sarajevo",
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
    /** The existing site shows an empty "Soc. mreže" heading and no profiles could be verified. */
    social: [] as { label: string; href: string }[],
  },

  /** Claimed on the legacy "O nama" page (ISO 9001:2008 was withdrawn in 2018). Hidden until confirmed. */
  certifications: {
    display: false,
    claimedOnLegacySite: ["ISO 9001:2008", "FSC", "ISO"],
  },

  pendingVerification: [
    "Adresa salona: Hiseta 19 (Kontakt i podnožje) ili Alipašina 55 (tekst O nama)",
    "Radno vrijeme salona",
    "Važeći certifikati (ISO / FSC)",
    "Profili na društvenim mrežama",
    "Vlastite fotografije salona i izvedenih radova",
    "Pravo korištenja fotografija proizvođača",
  ],
} as const;

export const primaryPhone = site.contact.phones[0];
export const primaryEmail = site.contact.emails[0];

export const fullAddress = `${site.showroom.street}, ${site.showroom.postalCode} ${site.showroom.city}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.showroom.mapsQuery)}`;
export const osmUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(site.showroom.mapsQuery)}`;

export const nav = [
  { href: "/", label: "Naslovna" },
  { href: "/ponuda", label: "Ponuda" },
  { href: "/o-nama", label: "O nama" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
