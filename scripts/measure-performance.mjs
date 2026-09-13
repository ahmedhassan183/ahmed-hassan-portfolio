import { chromium } from "playwright";
import fs from "node:fs/promises";

// Local production observations, not a Lighthouse score or field Web Vitals.
(async () => {
  const browser = await chromium.launch({ channel: process.platform === "win32" ? "msedge" : undefined });
  const results = [];
  try {
    for (const locale of ["en", "ar"]) for (const width of [375, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.observedLayoutShift = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.observedLayoutShift += entry.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(`http://127.0.0.1:3001/${locale}`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(document.getAnimations().map(animation => animation.finished));
      });
      results.push({ locale, width, ...await page.evaluate(() => {
        const resources = performance.getEntriesByType("resource");
        const bytes = pattern => resources.filter(resource => pattern.test(resource.name)).reduce((sum, resource) => sum + resource.encodedBodySize, 0);
        return { initialLayoutShift: window.observedLayoutShift, javascriptEncodedBytes: bytes(/\.js(?:\?|$)/), fontEncodedBytes: bytes(/\.woff2(?:\?|$)/), imageEncodedBytes: bytes(/\/_next\/image/), externalResourceOrigins: [...new Set(resources.map(resource => new URL(resource.name).origin).filter(origin => origin !== location.origin))] };
      }) });
      await context.close();
    }
    await fs.mkdir("artifacts/phase-5", { recursive: true });
    await fs.writeFile("artifacts/phase-5/performance.json", JSON.stringify({ environment: "Local production server, desktop Edge, no network throttling; initial viewport only", results }, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
