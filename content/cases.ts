import type { Dictionary, Locale } from "./types";

export const caseSlugs = ["b2b-market-account-development", "solar-pv-engineering", "maintenance-revenue-product"] as const;
export type CaseSlug = typeof caseSlugs[number];
export function isCaseSlug(value: string): value is CaseSlug { return caseSlugs.some(slug => slug === value); }
export function casePath(slug: CaseSlug) { return `/cases/${slug}`; }
export function summaryMetrics(index: number, d: Dictionary, locale: Locale) {
  const ar = locale === "ar";
  if (index === 0) return [
    { value: "47", label: ar ? "جهة في خريطة السوق" : "Market entries" },
    { value: "20", label: ar ? "حسابًا ذا أولوية" : "Priority accounts" },
    { value: ar ? "7 محطات" : "7 stations", label: ar ? "قناة سنور · 320 kW حتى الآن" : "Senour channel · 320 kW to date" },
    { value: "CRM", label: ar ? "تحديث شخصي يومي" : "Personally maintained daily" },
  ];
  if (index === 1) return d.work.proof.slice(0, 4);
  return [
    { value: "3", label: ar ? "باقات خدمة" : "Service tiers" },
    { value: ar ? "سنوي" : "Annual", label: ar ? "نموذج صيانة" : "Maintenance model" },
    { value: ar ? "التجديد" : "Renewal", label: ar ? "مسار مصمّم" : "Designed journey" },
  ];
}
