import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Providers } from "@/components/layout/Providers";
import { BagDrawer } from "@/components/shop/BagDrawer";
import { SearchOverlay } from "@/components/shop/SearchOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { site } from "@/data/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Studio Babui — Contemporary unisex clothing",
    template: "%s — Studio Babui",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Studio Babui",
    description: site.description,
    images: [{ url: "/images/hero/hero-arch.jpg", width: 2000, height: 2500, alt: "Studio Babui campaign" }],
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${dmSans.variable} antialiased`}>
      <body>
        <Providers>
          <a
            href="#main"
            className="label sr-only z-[100] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Loader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileMenu />
          <SearchOverlay />
          <BagDrawer />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
