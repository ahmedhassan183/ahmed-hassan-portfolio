import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ar"].map((locale) => ({ url: absoluteUrl(`/${locale}`), alternates: { languages: languageAlternates } }));
}
