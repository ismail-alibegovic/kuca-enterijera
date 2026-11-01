import { productBySlug } from "@/content/catalog";
import { inquiryToText, validateInquiry, type Inquiry } from "@/lib/inquiry";

/**
 * Inquiry endpoint.
 *
 * Delivery (first configured wins):
 *   1. Resend:   RESEND_API_KEY + INQUIRY_TO_EMAIL (+ optional INQUIRY_FROM_EMAIL, verified sender domain)
 *   2. Webhook:  FORM_WEBHOOK_URL (receives JSON; e.g. Make/Zapier/Formspree/CRM)
 * If neither is configured, it responds 503 { code: "not_configured" } and the client shows an honest
 * fallback (pre-filled email + phone). It never pretends that a message was delivered.
 */
export async function POST(req: Request) {
  let body: Partial<Inquiry>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot: quietly accept so bots get no signal, but deliver nothing.
  if (body.website) return Response.json({ ok: true, delivered: false }, { status: 200 });

  const errors = validateInquiry(body);
  if (Object.keys(errors).length) return Response.json({ ok: false, code: "invalid", errors }, { status: 422 });

  const data = body as Inquiry;
  const product = data.product ? productBySlug[data.product] : undefined;
  const subject = `${data.type === "ponuda" ? "Zahtjev za ponudu" : "Upit"}${product ? `: ${product.name}` : ""}, ${data.name}`;
  const text = inquiryToText(data, product?.name);

  const { RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL, FORM_WEBHOOK_URL } = process.env;

  try {
    if (RESEND_API_KEY && INQUIRY_TO_EMAIL) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: INQUIRY_FROM_EMAIL ?? "Kuća Enterijera web <onboarding@resend.dev>",
          to: INQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return Response.json({ ok: true, delivered: true });
    }
    if (FORM_WEBHOOK_URL) {
      const r = await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, ...data, productName: product?.name, receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return Response.json({ ok: true, delivered: true });
    }
  } catch (err) {
    console.error("[upit] delivery failed", err);
    return Response.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: false, code: "not_configured" }, { status: 503 });
}
