/* eslint-disable @next/next/no-html-link-for-pages -- Full document navigation restores locale root and pre-paint theme from the global 404. */
import type { Metadata } from "next";
import { themeBootstrap } from "@/lib/theme";
import { inter, arabic } from "@/lib/fonts";
import "./globals.css";
import { siteOrigin } from "@/lib/seo";

export const metadata: Metadata = { metadataBase: new URL(siteOrigin), title: "Page not found | Ahmed Hassan", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return <html lang="en" dir="ltr" className={`${inter.variable} ${arabic.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head><body><main className="not-found container"><p className="section-label">AH. / 404</p><h1>This page couldn’t be found.</h1><p lang="ar" dir="rtl">هذه الصفحة غير موجودة. عُد إلى موقع أحمد حسن.</p><div className="contact-actions"><a className="button button--primary" href="/en">Back to portfolio</a><a className="button button--secondary" href="/ar" lang="ar" dir="rtl">العودة إلى الموقع</a></div></main></body></html>;
}
