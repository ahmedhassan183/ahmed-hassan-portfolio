import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { SalesAuthority } from "@/components/sections/SalesAuthority";
import { SelectedSalesSystems } from "@/components/sections/SelectedSalesSystems";
import { Experience } from "@/components/sections/Experience";
import { SupportingWork } from "@/components/sections/SupportingWork";
import { RestoreVisualState } from "@/components/layout/RestoreVisualState";
import { getDictionary, isLocale } from "@/content";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { personSchema } from "@/lib/seo";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale, d.meta.description)).replace(/</g, "\\u003c") }} /><main id="main" tabIndex={-1}><Hero d={d} /><SalesAuthority d={d} /><SelectedSalesSystems d={d} locale={locale} /><Experience d={d} /><SupportingWork d={d} /><Contact d={d} /></main><Footer d={d} /><RestoreVisualState locale={locale} /></>;
}
