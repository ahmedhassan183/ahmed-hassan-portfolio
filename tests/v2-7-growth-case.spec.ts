import { expect, test } from "@playwright/test";
import { getGrowthCase, growthPath, growthReviews } from "../content/growth";
import { getDictionary } from "../content";
import { readFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { absoluteUrl } from "../lib/seo";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "ar"] as const) for (const width of [375, 768, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`growth case ${locale} ${width}px ${theme}: planned evidence, direction and contained flows`, async ({ page }) => {
    const c = getGrowthCase(locale), errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    expect((await page.goto(`/${locale}${growthPath}`))?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator("main h1")).toHaveText(c.title);
    await expect(page.locator("main h1")).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("#growth-role + p")).toHaveText(c.role);
    await expect(page.locator("[data-growth-scale] dd")).toHaveText(["15", locale === "en" ? "90 Days" : "90 يومًا", "67", "40", "14"]);
    await expect(page.locator("[data-growth-scale] dt")).toHaveText(c.scale.map(m => m.label));
    const planned = (await page.locator("[data-growth-scale] dt").allTextContents()).slice(2);
    for (const label of planned) expect(label).toMatch(locale === "en" ? /Planned/ : /مخطط/);
    await expect(page.locator("[data-growth-funnel] ol").first().locator("li > span:first-of-type")).toHaveText(c.attention);
    await expect(page.locator("[data-growth-funnel] ol").last().locator("li > span:first-of-type")).toHaveText(c.commercial);
    await expect(page.locator('ol[aria-label="' + c.productionHeading + '"] li')).toHaveCount(10);
    await expect(page.locator("[data-growth-kpis] article")).toHaveCount(4);
    await expect(page.locator("[data-growth-kpis]")).toContainText("CPQL");
    await expect(page.locator("[data-growth-handoff]")).toHaveText(c.handoff);
    await expect(page.locator("[data-growth-status] dt")).toHaveText(c.statuses.map(s => s.label));
    await expect(page.locator("[data-growth-status] dd")).toHaveText(c.statuses.map(s => s.value));
    await expect(page.locator("#growth-results, [data-growth-review]")).toHaveCount(0);
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/\b(?:generated|achieved|increased|improved)\s+(?:\d|leads|contracts|revenue|reach|followers)|\b0\s+(?:Leads|Contracts)|Completed Case Results/i);
    expect(text).not.toMatch(/حققنا|زيادة المتابعين|زيادة الوصول|عقود محققة|إيرادات محققة|0\s+(?:فرصة|تعاقد)/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (locale === "ar") await expect(page.locator("[data-growth-kpis] bdi").filter({ hasText: "CPQL" })).toHaveAttribute("dir", "ltr");
    if (width === 375 && theme === "light") {
      expect((await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      const workbook = page.locator("details").first();
      await workbook.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(workbook).toHaveAttribute("open", "");
      await expect(workbook.locator("li")).toHaveCount(15);
      await page.keyboard.press("Enter");
      await expect(workbook).not.toHaveAttribute("open");
    }
    expect(errors).toEqual([]);
  });
}

for (const locale of ["en", "ar"] as const) {
  test(`${locale} supporting growth entry preserves order, CTA and locale switching`, async ({ page }) => {
    const c = getGrowthCase(locale), d = getDictionary(locale), other = locale === "en" ? "ar" : "en";
    await page.goto(`/${locale}`);
    await expect(page.locator("#supporting .supporting-entry")).toHaveCount(4);
    expect(await page.locator("#supporting .supporting-entry").evaluateAll(nodes => nodes.map(n => n.getAttribute("data-supporting-id")))).toEqual(["90-day-sales-execution", "social-growth", "sahara-2026", "growth-playbook"]);
    const growth = page.locator('[data-supporting-id="social-growth"]');
    await expect(growth.locator("h3")).toHaveText(c.supportingTitle);
    await expect(growth.locator("p").first()).toHaveText(c.supportingDescription);
    await expect(growth.locator("li")).toHaveText(c.chips);
    await expect(growth.getByRole("link", { name: c.cta, exact: true })).toHaveAttribute("href", `/${locale}${growthPath}`);
    await expect(page.locator(".system-entry--flagship")).toHaveCount(3);
    const sahara = page.locator('[data-supporting-id="sahara-2026"]');
    await expect(sahara.locator("h3")).toHaveText(d.work.supporting.items[2].title);
    await expect(sahara.locator(".supporting-status")).toHaveText(d.work.supporting.items[2].status);
    await growth.getByRole("link", { name: c.cta, exact: true }).click();
    const switcher = page.locator(`.site-header .language-control a[lang="${other}"]`).first();
    await expect(switcher).toHaveAttribute("href", `/${other}${growthPath}`);
    await switcher.click();
    await expect(page).toHaveURL(new RegExp(`/${other}${growthPath}$`));
    await expect(page.locator("main h1")).toHaveText(getGrowthCase(other).title);
  });
  test(`${locale} growth metadata, canonical, hreflang, schema and sitemap`, async ({ page, request }) => {
    const c = getGrowthCase(locale);
    await page.goto(`/${locale}${growthPath}`);
    await expect(page).toHaveTitle(c.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", c.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl(`/${locale}${growthPath}`));
    for (const lang of ["en", "ar"]) await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute("href", absoluteUrl(`/${lang}${growthPath}`));
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", c.title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absoluteUrl(`/${locale}${growthPath}`));
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
    expect(schema["@graph"][0].inLanguage).toBe(locale);
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain(`<loc>${absoluteUrl(`/${locale}${growthPath}`)}</loc>`);
  });
}

test("resume micro-update and all protected source areas remain intact", async () => {
  const source = await readFile("resume/Ahmed-Hassan-Resume.html", "utf8");
  const previous = execFileSync("git", ["show", "138466602e1d448f9aff3b3b9b8dece873fb8c16:resume/Ahmed-Hassan-Resume.html"], { encoding: "utf8" });
  const old = "Designed a 90-day sales operating framework and a three-tier annual maintenance offering.";
  const current = "<strong>Growth systems:</strong> Developed and handed off a 90-day social-media growth and lead-generation system linking content to WhatsApp qualification, site visits, proposals and contracts.";
  expect(source).toContain(current);
  expect(source).not.toContain(old);
  expect(source.replace(current, old).replaceAll("\r\n", "\n")).toBe(previous.replaceAll("\r\n", "\n"));
  expect(source.match(/class="page page-/g)).toHaveLength(2);
  for (const path of ["content/partnership.ts", "components/partnership/PartnershipCase.tsx", "components/sections/Hero.tsx", "components/sections/Experience.tsx", "components/sections/SelectedSalesSystems.tsx", "components/sections/SalesAuthority.tsx", "components/sections/Contact.tsx", "components/layout/Footer.tsx", "app/globals.css", "resume/resume.css", "resume/generate.mjs"]) {
    const oldSource = execFileSync("git", ["show", `138466602e1d448f9aff3b3b9b8dece873fb8c16:${path}`], { encoding: "utf8" });
    expect((await readFile(path, "utf8")).replaceAll("\r\n", "\n"), path).toBe(oldSource.replaceAll("\r\n", "\n"));
  }
  expect(growthReviews.en).toEqual([]); expect(growthReviews.ar).toEqual([]);
  const sales = await readFile("data/sales.ts", "utf8");
  const previousSales = execFileSync("git", ["show", "138466602e1d448f9aff3b3b9b8dece873fb8c16:data/sales.ts"], { encoding: "utf8" });
  expect(sales.replace(/  \{\r?\n    id: "social-growth",[\s\S]*?    artifact: null,\r?\n  \},\r?\n/, "").replaceAll("\r\n", "\n")).toBe(previousSales.replaceAll("\r\n", "\n"));
});

test("no raw strategy workbook or document is publicly exposed", async () => {
  async function files(path: string): Promise<string[]> { const entries = await readdir(path, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? files(`${path}/${e.name}`) : [`${path}/${e.name}`]))).flat(); }
  expect((await files("public")).filter(path => /\.(?:xlsx|xls|docx|doc)$/i.test(path))).toEqual([]);
});
