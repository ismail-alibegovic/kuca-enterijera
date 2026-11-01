"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocationSearch } from "@/lib/useLocationSearch";
import { categories, productBySlug, products } from "@/content/catalog";
import { primaryEmail, primaryPhone, site } from "@/content/site";
import { inquiryToText, validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "fallback"; reason: "not_configured" | "error" };

const empty: Inquiry = {
  type: "ponuda",
  name: "",
  email: "",
  phone: "",
  product: "",
  area: "",
  city: "",
  message: "",
  consent: false,
  website: "",
};

export function InquiryForm() {
  const [data, setData] = useState<Inquiry>(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Pre-select a product from ?proizvod=slug (links from product pages).
  const urlProduct = new URLSearchParams(useLocationSearch()).get("proizvod") ?? "";
  const [appliedUrlProduct, setAppliedUrlProduct] = useState("");
  if (urlProduct !== appliedUrlProduct) {
    setAppliedUrlProduct(urlProduct);
    if (productBySlug[urlProduct]) setData((d) => ({ ...d, product: urlProduct, type: "ponuda" }));
  }

  useEffect(() => {
    if (status.kind === "sent" || status.kind === "fallback") statusRef.current?.focus();
  }, [status.kind]);

  const set = <K extends keyof Inquiry>(k: K, v: Inquiry[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const product = data.product ? productBySlug[data.product] : undefined;
  const showArea = data.type === "ponuda" && (!product || product.askArea);

  const mailto = () => {
    const subject = `${data.type === "ponuda" ? "Zahtjev za ponudu" : "Upit"}${product ? `: ${product.name}` : ""}`;
    return `mailto:${primaryEmail.display}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      inquiryToText(data, product?.name),
    )}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateInquiry(data);
    setErrors(errs);
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/upit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: InquiryErrors };
      if (res.ok && json.ok) return setStatus({ kind: "sent" });
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return setStatus({ kind: "idle" });
      }
      setStatus({ kind: "fallback", reason: json.code === "not_configured" ? "not_configured" : "error" });
    } catch {
      setStatus({ kind: "fallback", reason: "error" });
    }
  }

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t border-ink py-12 outline-none">
        <p className="t-label text-mute">Upit je poslan</p>
        <p className="t-statement mt-4">
          Hvala, {data.name.split(" ")[0]}. <span className="t-serif-italic">Javit ćemo vam se uskoro.</span>
        </p>
        <p className="t-body mt-6 max-w-[52ch] text-mute">
          Odgovor stiže na {data.email}. Za hitna pitanja pozovite salon na{" "}
          <a className="link-line text-ink" href={primaryPhone.href}>
            {primaryPhone.display}
          </a>
          .
        </p>
        <button type="button" className="t-label link-line mt-8" onClick={() => { setData(empty); setStatus({ kind: "idle" }); }}>
          Pošaljite novi upit
        </button>
      </div>
    );
  }

  const field = (k: keyof Inquiry) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });
  const err = (k: keyof Inquiry) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="t-small mt-2 text-[#8a2f1f]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative" aria-describedby={`${uid}-req`}>
      <fieldset className="mb-10">
        <legend className="t-label mb-4 text-mute">Vrsta upita</legend>
        <div className="grid grid-cols-2 border border-ink">
          {(["ponuda", "upit"] as const).map((t) => (
            <label
              key={t}
              className={`t-label flex min-h-12 cursor-pointer items-center justify-center px-3 text-center text-[0.68rem] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-offset-2 ${
                data.type === t ? "bg-ink text-paper" : "hover:bg-paper-2"
              }`}
            >
              <input type="radio" name="type" value={t} checked={data.type === t} onChange={() => set("type", t)} className="sr-only" />
              {t === "ponuda" ? "Zahtjev za ponudu" : "Opće pitanje"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <div>
          <label className="field">
            <span className="field-label">Ime i prezime *</span>
            <input {...field("name")} className="field-input" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} required />
          </label>
          {err("name")}
        </div>
        <div>
          <label className="field">
            <span className="field-label">Email *</span>
            <input {...field("email")} type="email" inputMode="email" className="field-input" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} required />
          </label>
          {err("email")}
        </div>
        <div>
          <label className="field">
            <span className="field-label">Telefon</span>
            <input {...field("phone")} type="tel" inputMode="tel" className="field-input" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
          </label>
          {err("phone")}
        </div>
        <div>
          <label className="field">
            <span className="field-label">Proizvod</span>
            <select {...field("product")} className="field-input" value={data.product} onChange={(e) => set("product", e.target.value)}>
              <option value="">Još nisam odlučio/la</option>
              {categories.map((c) => (
                <optgroup key={c.slug} label={c.name}>
                  {products
                    .filter((p) => p.category === c.slug)
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
        </div>
        {showArea ? (
          <div>
            <label className="field">
              <span className="field-label">Približna površina (m²)</span>
              <input {...field("area")} inputMode="decimal" className="field-input" placeholder="npr. 45" value={data.area} onChange={(e) => set("area", e.target.value)} />
            </label>
            {err("area")}
          </div>
        ) : null}
        <div>
          <label className="field">
            <span className="field-label">Lokacija objekta</span>
            <input {...field("city")} className="field-input" autoComplete="address-level2" placeholder="npr. Sarajevo, Ilidža" value={data.city} onChange={(e) => set("city", e.target.value)} />
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="field">
            <span className="field-label">Poruka *</span>
            <textarea
              {...field("message")}
              className="field-input"
              rows={5}
              placeholder={data.type === "ponuda" ? "Prostor, željeni izgled, rok… Sve što nam pomaže pripremiti ponudu." : "Kako vam možemo pomoći?"}
              value={data.message}
              onChange={(e) => set("message", e.target.value)}
              required
            />
          </label>
          {err("message")}
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Web stranica
          <input tabIndex={-1} autoComplete="off" name="website" value={data.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            {...field("consent")}
            type="checkbox"
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-ink"
          />
          <span className="t-small text-ink/80">
            Saglasan/na sam da {site.name} koristi navedene podatke isključivo kako bi odgovorila na ovaj upit. *
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p id={`${uid}-req`} className="t-small text-mute">
          Polja označena sa * su obavezna.
        </p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="t-label inline-flex min-h-14 items-center justify-between gap-10 bg-ink px-7 text-[0.72rem] text-paper transition-colors duration-500 hover:bg-charcoal disabled:opacity-60"
        >
          {status.kind === "sending" ? "Šaljem…" : data.type === "ponuda" ? "Pošaljite zahtjev" : "Pošaljite upit"}
          <span aria-hidden className="arrow">→</span>
        </button>
      </div>

      {status.kind === "fallback" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-10 border border-ink bg-paper-2 p-6 outline-none md:p-8">
          <p className="t-label">{status.reason === "not_configured" ? "Online slanje još nije aktivirano" : "Slanje nije uspjelo"}</p>
          <p className="t-body mt-3 max-w-[60ch]">
            {status.reason === "not_configured"
              ? "Vaš upit nije poslan automatski. Pripremili smo ga za slanje emailom: otvorite poruku i samo je pošaljite. Ako vam je jednostavnije, nazovite nas."
              : "Došlo je do greške i upit nije poslan. Pošaljite ga emailom (tekst je već pripremljen) ili nas nazovite."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={mailto()} className="t-label inline-flex min-h-12 items-center gap-3 bg-ink px-5 text-[0.7rem] text-paper">
              Otvori email s upitom →
            </a>
            <a href={primaryPhone.href} className="t-label inline-flex min-h-12 items-center border border-ink px-5 text-[0.7rem]">
              Pozovi {primaryPhone.display}
            </a>
            <button
              type="button"
              className="t-label inline-flex min-h-12 items-center px-2 text-[0.7rem] link-line"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(inquiryToText(data, product?.name));
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Tekst kopiran ✓" : "Kopiraj tekst upita"}
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
