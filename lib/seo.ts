import { site } from "@/data/site";
import type { Locale } from "@/content/types";

// One canonical origin for metadata, structured data, robots and sitemap.
// Local fallback is for development only; set the final domain before deployment.
const configured = process.env.NEXT_PUBLIC_SITE_URL;
export const siteOrigin = new URL(configured || "http://127.0.0.1:3000").origin;
if (!/^https?:\/\//.test(siteOrigin)) throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL.");
export const absoluteUrl = (path: string) => new URL(path, siteOrigin).href;
export const languageAlternates = { en: absoluteUrl("/en"), ar: absoluteUrl("/ar"), "x-default": absoluteUrl("/en") };
export const isPreview = process.env.VERCEL_ENV === "preview";

export function personSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org", "@type": "Person", "@id": absoluteUrl("/#ahmed-hassan"),
    name: site.name, alternateName: "أحمد حسن", jobTitle: "Growth Manager", description,
    url: absoluteUrl(`/${locale}`), image: absoluteUrl(site.portrait.src), sameAs: [site.contact.linkedin],
    email: site.contact.email, telephone: site.contact.phone,
    worksFor: { "@type": "Organization", name: "Innovation for Solar System" },
    knowsAbout: ["B2B Sales", "Business Development", "CRM", "Pipeline Management", "Account Development", "Sales Operations", "Renewable Energy", "Solar Sales Training"],
  };
}
