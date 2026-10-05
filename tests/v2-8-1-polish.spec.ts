import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

test("V2.8.1 keeps approved content, routes, SEO, dependencies, assets and resume byte-identical", () => {
  const baseline = "9305f992ac0ddb07b50e47fb6bb54adae2b366fb";
  const files = execFileSync("git", ["ls-tree", "-r", "--name-only", baseline], { encoding: "utf8" }).trim().split("\n");
  const protectedFiles = files.filter(file => /^(content|data|resume|public)\//.test(file)
    || /^app\/.*\.tsx$/.test(file)
    || (/^components\/.*\.tsx$/.test(file) && file !== "components/sections/SupportingWork.tsx")
    || ["app/sitemap.ts", "app/robots.ts", "proxy.ts", "lib/seo.ts", "package.json", "package-lock.json", "next.config.ts"].includes(file));
  expect(protectedFiles).toContain("public/Ahmed-Hassan-Sales-Business-Development-Resume.pdf");
  for (const file of protectedFiles) {
    const original = execFileSync("git", ["show", `${baseline}:${file}`], { maxBuffer: 64 * 1024 * 1024 });
    const current = readFileSync(file);
    // Git normalizes text line endings on Windows; binary assets stay exact.
    if (/\.(?:tsx?|json|html|css|mjs|svg|xml|txt|md)$/.test(file)) {
      expect(current.toString("utf8").replace(/\r\n/g, "\n"), file).toBe(original.toString("utf8"));
    } else {
      expect(current.equals(original), `${file} must remain byte-identical`).toBe(true);
    }
  }
});

test("flagship category labels fit their cards on narrow English and Arabic screens", async ({ page }) => {
  for (const locale of ["en", "ar"]) for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    const labels = page.locator(".case-summary-copy .case-kicker");
    await expect(labels).toHaveCount(3);
    for (const label of await labels.all()) {
      expect(await label.evaluate(element => {
        const container = element.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(element);
        return element.scrollWidth <= element.clientWidth + 1
          && [...range.getClientRects()].every(bounds => bounds.left >= container.left - 1
            && bounds.right <= container.right + 1);
      }), `${locale} ${width}px category must not be clipped`).toBe(true);
    }
  }
});
