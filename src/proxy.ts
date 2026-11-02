import { NextResponse, type NextRequest } from "next/server";
import { categoryBySlug, productBySlug } from "@/content/catalog";

/**
 * Real 404 status for unknown catalogue URLs.
 * Dynamic catalogue pages stream a prerendered shell, so a notFound() inside the page could only
 * produce a 200 + noindex. Unknown slugs are rewritten to an unmatched path, which Next.js serves as 404.
 */
export function proxy(request: NextRequest) {
  const [, , cat, prod, extra] = request.nextUrl.pathname.split("/");
  const valid = !!cat && !!categoryBySlug[cat] && (!prod || productBySlug[prod]?.category === cat) && !extra;
  if (!valid) return NextResponse.rewrite(new URL("/__nije-pronadjeno", request.url));
}

export const config = {
  matcher: "/ponuda/:path+",
};
