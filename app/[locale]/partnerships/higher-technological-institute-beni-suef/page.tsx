import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { getPartnershipCase, partnershipPath } from "@/content/partnership";
import { PartnershipCase } from "@/components/partnership/PartnershipCase";
import { Footer } from "@/components/layout/Footer";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/data/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { meta } = getPartnershipCase(locale), path = `/${locale}${partnershipPath}`;
  return {
    title: meta.title, description: meta.description,
    alternates: { canonical: path, languages: { en: absoluteUrl(`/en${partnershipPath}`), ar: absoluteUrl(`/ar${partnershipPath}`), "x-default": absoluteUrl(`/en${partnershipPath}`) } },
    openGraph: { type: "website", title: meta.title, description: meta.description, url: path, locale: locale === "ar" ? "ar_EG" : "en_US", alternateLocale: locale === "ar" ? "en_US" : "ar_EG", images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Ahmed Hassan — Growth & Business Development" }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [absoluteUrl("/opengraph-image")] },
  };
}

export default async function PartnershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getPartnershipCase(locale), d = getDictionary(locale), url = absoluteUrl(`/${locale}${partnershipPath}`);
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: c.meta.title, description: c.meta.description, inLanguage: locale,
        author: { "@type": "Person", "@id": absoluteUrl("/#ahmed-hassan"), name: site.name, url: absoluteUrl(`/${locale}`) },
        about: [{ "@type": "Organization", name: "Higher Technological Institute of Beni Suef" }, { "@type": "Organization", name: "Innovation for Solar Systems" }] },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: d.name, item: absoluteUrl(`/${locale}`) }, { "@type": "ListItem", position: 2, name: c.title, item: url }] },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><PartnershipCase d={d} locale={locale} /><Footer d={d} /></>;
}
