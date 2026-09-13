import type { Metadata } from "next";
import { inter, arabic } from "@/lib/fonts";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/content";
import { Navbar } from "@/components/layout/Navbar";
import { themeBootstrap } from "@/lib/theme";
import { site } from "@/data/site";
import { publicAssetExists } from "@/lib/public-assets";
import { siteOrigin, languageAlternates, absoluteUrl, isPreview } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(siteOrigin),
    title: meta.title, description: meta.description,
    alternates: { canonical: `/${locale}`, languages: languageAlternates },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title: meta.title, description: meta.description, type: "website", url: `/${locale}`, locale: locale === "ar" ? "ar_EG" : "en_US", alternateLocale: locale === "ar" ? "en_US" : "ar_EG", images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Ahmed Hassan — Sales & Business Development" }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [{ url: absoluteUrl("/opengraph-image"), alt: "Ahmed Hassan — Sales & Business Development" }] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${inter.variable} ${arabic.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
    <body id="top"><a className="skip-link" href="#main">{d.nav.skip}</a><Navbar d={{ name: d.name, nav: d.nav, ui: d.ui }} locale={locale} resumeAvailable={publicAssetExists(site.resumeUrl)} />{children}</body>
  </html>;
}
