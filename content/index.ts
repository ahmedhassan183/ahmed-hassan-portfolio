import { en } from "./en";
import { ar } from "./ar";
import type { Dictionary, Locale } from "./types";
export const locales = ["en", "ar"] as const;
export function isLocale(value: string): value is Locale { return locales.some((locale) => locale === value); }
export function getDictionary(locale: Locale): Dictionary { return { en, ar }[locale]; }
