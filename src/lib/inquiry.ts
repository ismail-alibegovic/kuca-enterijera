/** Shared inquiry schema + validation (used by the client form and the API route). */

export type InquiryType = "ponuda" | "upit";

export type Inquiry = {
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  product: string;
  area: string;
  city: string;
  message: string;
  consent: boolean;
  /** Honeypot: must stay empty. */
  website?: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(d: Partial<Inquiry>): InquiryErrors {
  const e: InquiryErrors = {};
  const name = (d.name ?? "").trim();
  const email = (d.email ?? "").trim();
  const phone = (d.phone ?? "").trim();
  const message = (d.message ?? "").trim();
  const area = (d.area ?? "").trim().replace(",", ".");

  if (name.length < 2) e.name = "Upišite ime i prezime.";
  if (name.length > 120) e.name = "Ime je predugo.";
  if (!EMAIL.test(email)) e.email = "Upišite ispravnu email adresu.";
  if (phone && !/^[+()\d\s/-]{6,24}$/.test(phone)) e.phone = "Broj telefona smije sadržavati samo brojeve, razmake i znakove + ( ) / -.";
  if (area && (!/^\d+(\.\d+)?$/.test(area) || Number(area) <= 0 || Number(area) > 100000))
    e.area = "Površinu upišite kao broj, npr. 45 ili 45,5.";
  if (message.length < 10) e.message = "Napišite nekoliko riječi o upitu (najmanje 10 znakova).";
  if (message.length > 4000) e.message = "Poruka je preduga (najviše 4000 znakova).";
  if (!d.consent) e.consent = "Potrebna je vaša saglasnost kako bismo vas mogli kontaktirati.";
  return e;
}

export function inquiryToText(d: Inquiry, productName?: string) {
  const lines = [`Vrsta: ${d.type === "ponuda" ? "Zahtjev za ponudu" : "Opći upit"}`, `Ime i prezime: ${d.name}`, `Email: ${d.email}`];
  if (d.phone) lines.push(`Telefon: ${d.phone}`);
  if (productName) lines.push(`Proizvod: ${productName}`);
  if (d.area) lines.push(`Približna površina: ${d.area} m²`);
  if (d.city) lines.push(`Lokacija objekta: ${d.city}`);
  lines.push("", d.message);
  return lines.join("\n");
}
