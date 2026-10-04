import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { partnershipPath } from "@/content/partnership";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ar"].flatMap((locale) => [
    { url: absoluteUrl(`/${locale}`), alternates: { languages: languageAlternates } },
    { url: absoluteUrl(`/${locale}${partnershipPath}`), alternates: { languages: { en: absoluteUrl(`/en${partnershipPath}`), ar: absoluteUrl(`/ar${partnershipPath}`), "x-default": absoluteUrl(`/en${partnershipPath}`) } } },
  ]);
}
