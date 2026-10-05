import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { getGrowthCase, growthPath } from "@/content/growth";
import { GrowthCase } from "@/components/growth/GrowthCase";
import { Footer } from "@/components/layout/Footer";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getGrowthCase(locale), path = `/${locale}${growthPath}`;
  return {
    title: c.title, description: c.description,
    alternates: { canonical: path, languages: { en: absoluteUrl(`/en${growthPath}`), ar: absoluteUrl(`/ar${growthPath}`), "x-default": absoluteUrl(`/en${growthPath}`) } },
    openGraph: { type: "website", title: c.title, description: c.description, url: path, locale: locale === "ar" ? "ar_EG" : "en_US", alternateLocale: locale === "ar" ? "en_US" : "ar_EG", images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Ahmed Hassan — Growth & Business Development" }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: [absoluteUrl("/opengraph-image")] },
  };
}
export default async function GrowthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getGrowthCase(locale), d = getDictionary(locale), url = absoluteUrl(`/${locale}${growthPath}`);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", url, name: c.title, description: c.description, inLanguage: locale, author: { "@type": "Person", "@id": absoluteUrl("/#ahmed-hassan"), name: site.name }, about: { "@type": "Organization", name: "Innovation for Solar Systems" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: d.name, item: absoluteUrl(`/${locale}`) }, { "@type": "ListItem", position: 2, name: c.title, item: url }] },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><GrowthCase locale={locale} /><Footer d={d} /></>;
}
