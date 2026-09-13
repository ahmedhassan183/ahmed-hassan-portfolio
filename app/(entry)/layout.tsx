import type { Metadata } from "next";
import { siteOrigin } from "@/lib/seo";
export const metadata: Metadata = { metadataBase: new URL(siteOrigin) };

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
