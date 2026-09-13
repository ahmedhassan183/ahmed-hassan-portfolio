import { notFoundCopy } from "@/content/not-found";
import type { Locale } from "@/content/types";

export function NotFoundView({ locale }: { locale: Locale }) {
  const d = notFoundCopy[locale];
  return <main id="main" tabIndex={-1} className="not-found container"><p className="section-label">AH. / 404</p><h1>{d.title}</h1><p>{d.text}</p><a className="button button--primary" href={`/${locale}`}>{d.back}</a></main>;
}
