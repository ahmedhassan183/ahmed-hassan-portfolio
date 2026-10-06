import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getPartnershipCase, partnershipPath } from "../content/partnership";
import { getDictionary } from "../content";
import { absoluteUrl } from "../lib/seo";
import { readFile } from "node:fs/promises";

for (const locale of ["en", "ar"] as const) for (const width of [375, 768, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`${locale} partnership case and confirmed-only execution record at ${width}px ${theme}`, async ({ page }) => {
    const c = getPartnershipCase(locale), d = getDictionary(locale), errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    const home = page.locator(".partnership-evidence"), cta = home.locator(".partnership-cta");
    await expect(cta).toHaveText(c.snapshot.cta);
    await expect(cta).toHaveAttribute("href", `/${locale}${partnershipPath}`);
    expect((await cta.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await expect(home).toContainText(c.snapshot.execution);
    await cta.click();
    await expect(page).toHaveURL(new RegExp(`/${locale}${partnershipPath}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator("h1")).toHaveText(c.title);
    await expect(page.locator(".case-summary")).toHaveText(c.summary);
    await expect(page.locator("[data-case-role] li")).toHaveText(c.roles);
    await expect(page.locator("[data-case-timeline] li")).toHaveCount(6);
    await expect(page.locator("[data-case-timeline] li > bdi")).toHaveText(["01", "02", "03", "04", "05", "06"]);
    await expect(page.locator("[data-case-timeline] h3 bdi").filter({ hasText: "#01" })).toHaveAttribute("dir", "ltr");
    for (const number of await page.locator("[data-case-timeline] li > bdi").all()) {
      await expect(number).toHaveAttribute("dir", "ltr");
      expect(await number.evaluate(n => n.getBoundingClientRect().height / parseFloat(getComputedStyle(n).lineHeight))).toBeLessThan(1.1);
    }
    if (width === 375) {
      const positions = await page.locator("[data-case-timeline] li").evaluateAll(ns => ns.map(n => n.getBoundingClientRect().top));
      expect(positions.every((top, i) => !i || top > positions[i - 1])).toBe(true);
    }
    await expect(page.locator('[data-record="completed"] h3')).toHaveText(c.completedHeading);
    await expect(page.locator('[data-record="completed"]')).toContainText(c.activities[0].narrative);
    await expect(page.locator('[data-record="completed"] article')).toHaveCount(1);
    const visit = page.locator('[data-activity-status="completed"]');
    await expect(visit).toHaveCount(1);
    await expect(visit).toContainText(locale === "en" ? "Completed Field Activity #01" : "نشاط ميداني مكتمل #01");
    await expect(visit.locator("time")).toHaveAttribute("datetime", "2026-10-05");
    await expect(visit.locator("time")).toHaveText(locale === "en" ? "5 October 2026" : "5 أكتوبر 2026");
    await expect(visit).toContainText(c.activities[0].participants!);
    await expect(visit).toContainText(c.activities[0].locationType);
    await expect(visit).toContainText(c.activities[0].projectStage);
    await expect(visit).toContainText(c.activities[0].objective);
    await expect(visit).toContainText(c.activities[0].narrative);
    await expect(visit).toContainText(c.activities[0].status === "completed" ? c.activities[0].outcome : "");
    await expect(visit).toContainText(locale === "en" ? "students observed the early design, fabrication and assembly" : "تابع الطلاب المراحل الأولية لتصميم وتجهيز وتجميع");
    await expect(page.locator(".partnership-case")).not.toContainText(/scheduled to begin|expected to attend|expected 10 students|من المتوقع مشاركة|من المقرر بدء الزيارات|تم توريد|(?:^|\s)تم تركيب|Ahmed signed|legal signatory|guaranteed employment|Case 04/i);
    await expect(page.locator(".partnership-case img, .partnership-case a[href$='.pdf']")).toHaveCount(0);
    await expect(page.locator(".case-execution-stream")).toHaveCount(3);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl(`/${locale}${partnershipPath}`));
    await expect(page).toHaveTitle(c.meta.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", c.meta.description);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", c.meta.title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absoluteUrl(`/${locale}${partnershipPath}`));
    const schema = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
    expect(schema["@graph"][0]).toMatchObject({ "@type": "WebPage", inLanguage: locale, url: absoluteUrl(`/${locale}${partnershipPath}`) });
    expect(schema["@graph"].some((n: { "@type": string }) => n["@type"] === "Event")).toBe(false);
    await page.goto(`/${locale}${partnershipPath}#execution-record`);
    if (width < 900) await page.getByRole("button", { name: d.nav.open }).click();
    const controls = page.locator(width < 900 ? ".mobile-nav .preferences" : ".desktop-preferences");
    await controls.getByRole("combobox").selectOption(theme);
    const other = locale === "en" ? "ar" : "en";
    await expect(controls.getByRole("link", { name: other.toUpperCase(), exact: true })).toHaveAttribute("href", `/${other}${partnershipPath}`);
    await controls.getByRole("link", { name: other.toUpperCase(), exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${other}${partnershipPath}#execution-record$`));
    await expect(page.locator("html")).toHaveAttribute("dir", other === "ar" ? "rtl" : "ltr");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator("h1")).toHaveText(getPartnershipCase(other).title);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("case metadata, hreflang and sitemap expose exactly the two localized case routes", async ({ page, request }) => {
  for (const locale of ["en", "ar"] as const) {
    expect((await page.goto(`/${locale}${partnershipPath}`))!.status()).toBe(200);
    for (const language of ["en", "ar", "x-default"]) await expect(page.locator(`link[hreflang="${language}"]`)).toHaveAttribute("href", absoluteUrl(`/${language === "x-default" ? "en" : language}${partnershipPath}`));
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(12); // Six existing routes plus six localized flagship routes.
  for (const locale of ["en", "ar"]) expect(xml).toContain(`<loc>${absoluteUrl(`/${locale}${partnershipPath}`)}</loc>`);
  expect((await request.get(`/en/partnerships/nonexistent`)).status()).toBe(404);
});

test("evidence model keeps completion explicit and supplies no speculative completed activities or photos", async () => {
  for (const locale of ["en", "ar"] as const) {
    const activities = getPartnershipCase(locale).activities;
    expect(activities.filter(a => a.status === "completed")).toHaveLength(1);
    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject({ status: "completed", date: "2026-10-05", participantCount: 10, photos: [] });
    expect(activities[0]).toHaveProperty("outcome");
    expect(activities[0].observedActivities).toHaveLength(4);
  }
  const component = await readFile("components/partnership/PartnershipCase.tsx", "utf8");
  expect(component).toContain('activity.status === "completed"');
  expect(component).toContain("activity.outcome");
  expect(component).not.toMatch(/Date\.now|new Date\(/);
});
