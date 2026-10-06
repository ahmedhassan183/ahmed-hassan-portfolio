import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { partnershipPath } from "@/content/partnership";
import { growthPath } from "@/content/growth";
import { caseSlugs, casePath } from "@/content/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ar"].flatMap((locale) => [
    { url: absoluteUrl(`/${locale}`), alternates: { languages: languageAlternates } },
    { url: absoluteUrl(`/${locale}${partnershipPath}`), alternates: { languages: { en: absoluteUrl(`/en${partnershipPath}`), ar: absoluteUrl(`/ar${partnershipPath}`), "x-default": absoluteUrl(`/en${partnershipPath}`) } } },
    { url: absoluteUrl(`/${locale}${growthPath}`), alternates: { languages: { en: absoluteUrl(`/en${growthPath}`), ar: absoluteUrl(`/ar${growthPath}`), "x-default": absoluteUrl(`/en${growthPath}`) } } },
    ...caseSlugs.map(slug => ({ url: absoluteUrl(`/${locale}${casePath(slug)}`), alternates: { languages: { en: absoluteUrl(`/en${casePath(slug)}`), ar: absoluteUrl(`/ar${casePath(slug)}`), "x-default": absoluteUrl(`/en${casePath(slug)}`) } } })),
  ]);
}
