import { locale as rootLocale } from "next/root-params";
import { NotFoundView } from "@/components/layout/NotFoundView";

export default async function NotFound() {
  const locale = await rootLocale() === "ar" ? "ar" : "en";
  return <NotFoundView locale={locale} />;
}
