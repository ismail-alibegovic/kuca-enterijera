import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { RevealRoot } from "@/components/ui/RevealRoot";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
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
  themeColor: "#f4f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bs" className={`${instrument.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#sadrzaj" className="sr-only-focusable fixed left-4 top-4 z-[100] bg-ink px-4 py-3 text-paper">
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="sadrzaj" className="pt-[var(--header-h)]">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <RevealRoot />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
