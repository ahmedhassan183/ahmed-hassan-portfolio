import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";

export const metadata: Metadata = { title: "404 | Ahmed Hassan", robots: { index: false, follow: false }, alternates: { canonical: null, languages: {} } };

export default async function UnavailablePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <NotFoundView locale={locale === "ar" ? "ar" : "en"} />;
}
