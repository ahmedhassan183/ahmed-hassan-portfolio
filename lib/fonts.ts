import localFont from "next/font/local";
export const inter = localFont({ src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
export const arabic = localFont({ src: [
  { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400" },
  { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500" },
  { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2", weight: "600" },
  { path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2", weight: "700" },
], variable: "--font-arabic", display: "swap", preload: false });
