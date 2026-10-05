import { expect, test } from "@playwright/test";

test("Arabic document and representative content inherit true RTL direction", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  for (const selector of [
    "html",
    "body",
    "main",
    "#hero-heading",
    ".hero-description",
    "#experience",
    ".journey-step--solar .journey-focus",
    "#contact",
    ".contact-content > p",
  ]) {
    await expect(page.locator(selector).first()).toHaveCSS("direction", "rtl");
  }

  await expect(page.locator("#hero-heading")).toHaveCSS("text-align", "start");
  await expect(page.locator(".hero-description")).toHaveCSS("text-align", "start");
  await expect(page.locator(".journey-step--solar .journey-focus")).toHaveCSS("text-align", "start");
  await expect(page.locator(".contact-content > p")).toHaveCSS("text-align", "start");

  await expect(page.locator(".hero-description bdi[dir='ltr']")).toContainText(["Growth Manager", "Innovation for Solar System", "B2B", "CRM"]);
  await page.locator(".journey-step--solar .journey-full-detail summary").click();
  const experiencePeriods = page.locator(".experience-periods bdi");
  await expect(experiencePeriods).toHaveText(["Kahla Optical", "2021–2025", "Innovation for Solar System", "منذ 2025"]);
  await expect(experiencePeriods.nth(0)).toHaveAttribute("dir", "ltr");
  await expect(experiencePeriods.nth(1)).toHaveAttribute("dir", "ltr");
  await expect(experiencePeriods.nth(2)).toHaveAttribute("dir", "ltr");
  await expect(experiencePeriods.nth(3)).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".journey-step--solar .journey-focus bdi[dir='ltr']")).toContainText(["18", "120", "B2B", "CRM", "Innovation"]);
  await expect(page.locator(".contact-methods bdi[dir='ltr']")).toContainText(["+20 101 879 7298", "ahmedhassan-growth", "a7md07san@gmail.com", "+20 109 563 8790"]);
});

test("Arabic mobile keeps RTL flow, isolated mixed content and zero overflow at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ar");

  for (const selector of [
    ".hero-content",
    ".capability-grid",
    ".case-summary-grid",
    ".sales-journey",
    ".training-note",
    ".partnership-evidence",
    ".supporting-list",
    ".contact-methods",
    ".site-footer",
  ]) {
    await expect(page.locator(selector)).toHaveCSS("direction", "rtl");
  }

  const casePage = await page.context().newPage();
  await casePage.setViewportSize({ width: 375, height: 812 });
  await casePage.emulateMedia({ reducedMotion: "reduce" });
  await casePage.goto("/ar/cases/solar-pv-engineering");
  for (const selector of [".flagship-scope", ".system-fields"]) await expect(casePage.locator(selector)).toHaveCSS("direction", "rtl");
  expect(await casePage.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await casePage.goto("/ar/cases/b2b-market-account-development");
  await expect(casePage.locator(".market-evidence")).toHaveCSS("direction", "rtl");
  await casePage.close();
  const mixedBlocks = page.locator([
    ".hero-description",
    ".market-evidence",
    ".flagship-scope",
    ".journey-step--solar .journey-focus",
    '[data-supporting-id="sahara-2026"] .supporting-copy',
    ".contact-methods",
  ].join(","));
  for (const block of await mixedBlocks.all()) {
    const contained = await block.evaluate((element) => {
      const viewportWidth = document.documentElement.clientWidth;
      return Array.from(element.querySelectorAll("bdi[dir='ltr']")).every((token) => {
        const rect = token.getBoundingClientRect();
        return rect.left >= -0.5 && rect.right <= viewportWidth + 0.5;
      });
    });
    expect(contained).toBe(true);
  }

  await page.getByRole("button", { name: "فتح قائمة التنقل" }).click();
  await expect(page.locator(".mobile-nav")).toHaveCSS("direction", "rtl");
  await expect(page.locator(".mobile-nav a").first()).toHaveCSS("text-align", "start");

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});
