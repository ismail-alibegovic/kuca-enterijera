import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealRoot } from "@/components/ui/RevealRoot";
import { site } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * TeX Gyre Heros (GUST Font License): a free Helvetica-style grotesk with full Latin Extended
 * (č ć đ š ž). Self-hosted and subset. See src/fonts/README.md.
 */
const grotesk = localFont({
  src: [
    { path: "../fonts/texgyreheros-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/texgyreheros-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-grotesk",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kuća Enterijera: parketi, podne obloge i sigurnosna vrata, Sarajevo",
    template: "%s · Kuća Enterijera",
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fef8ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bs" className={grotesk.variable} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#sadrzaj" className="sr-only-focusable fixed left-4 top-4 z-[100] bg-ink px-4 py-3 text-paper">
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="sadrzaj">{children}</main>
        <Footer />
        <RevealRoot />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
