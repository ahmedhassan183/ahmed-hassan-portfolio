import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = new Set(["/", "/en", "/ar", "/opengraph-image", "/sitemap.xml", "/robots.txt", "/icon.svg", "/Ahmed-Hassan-Sales-Business-Development-Resume.pdf", "/Ahmed-Hassan-Sales-Business-Development-Resume-V2.pdf"]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/en/unavailable" || path === "/ar/unavailable") return NextResponse.next({ status: 404, headers: { "X-Robots-Tag": "noindex" } });
  if (publicRoutes.has(path) || path.startsWith("/work/") || path.startsWith("/images/")) return NextResponse.next();
  const locale = path.split("/")[1] === "ar" ? "ar" : "en";
  // In this Next.js version, throwing from a dynamic root can recover only
  // on the client. A rendered error route preserves HTML without JavaScript,
  // the pre-paint theme script, the original URL and an actual HTTP 404.
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}/unavailable`;
  destination.search = "";
  return NextResponse.rewrite(destination, { status: 404, headers: { "X-Robots-Tag": "noindex" } });
}

export const config = { matcher: ["/((?!_next/|__nextjs).*)"] };
