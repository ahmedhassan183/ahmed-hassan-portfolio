import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content";
import { caseSlugs, isCaseSlug, casePath } from "@/content/cases";
import { FlagshipDetails } from "@/components/sections/FlagshipDetails";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BidiText } from "@/components/ui/BidiText";
import { absoluteUrl } from "@/lib/seo";
import { RestoreVisualState } from "@/components/layout/RestoreVisualState";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return caseSlugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseSlug(slug)) notFound();
  const project = getDictionary(locale).work.projects.find(p => p.id === slug)!;
  const url = absoluteUrl(`/${locale}${casePath(slug)}`);
  return { title: project.title, description: project.description, alternates: { canonical: url, languages: { en: absoluteUrl(`/en${casePath(slug)}`), ar: absoluteUrl(`/ar${casePath(slug)}`), "x-default": absoluteUrl(`/en${casePath(slug)}`) } }, openGraph: { type: "website", title: project.title, description: project.description, url, images: [absoluteUrl("/opengraph-image")] }, twitter: { card: "summary_large_image", title: project.title, description: project.description, images: [absoluteUrl("/opengraph-image")] } };
}
export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseSlug(slug)) notFound();
  const d = getDictionary(locale), p = d.work.projects.find(project => project.id === slug)!;
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: p.title, description: p.description, url: absoluteUrl(`/${locale}${casePath(slug)}`), inLanguage: locale, author: { "@type": "Person", name: d.name, "@id": absoluteUrl("/#ahmed-hassan") } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><main id="main" className="flagship-case" tabIndex={-1}>
    <header className="case-page-header"><Container><a className="case-back" href={`/${locale}#systems`}>{locale === "ar" ? "العودة إلى الأعمال" : "Back to Portfolio"}</a><p className="case-kicker"><BidiText>{p.category}</BidiText></p><h1><BidiText>{p.title}</BidiText></h1><p><BidiText>{p.description}</BidiText></p></Container></header>
    <FlagshipDetails d={d} locale={locale} caseId={slug} />
    <Container><div className="case-page-actions"><Button href={`/${locale}#contact`}>{d.hero.talk}</Button><Button href={`/${locale}#systems`} variant="secondary">{locale === "ar" ? "جميع الأعمال الرئيسية" : "All Flagship Cases"}</Button></div></Container>
  </main><Footer d={d} /><RestoreVisualState locale={locale} /></>;
}
