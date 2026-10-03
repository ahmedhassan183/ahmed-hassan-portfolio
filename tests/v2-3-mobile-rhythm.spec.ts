import { expect, test } from "@playwright/test";

test("mobile header stays compact, sticky and accessible in both locales", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const locale of ["en", "ar"]) {
    await page.goto(`/${locale}`);
    const header = page.locator(".site-header");
    const toggle = page.locator(".menu-toggle");

    await expect(header).toBeVisible();
    await expect(header).toHaveCSS("position", "sticky");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    const geometry = await page.evaluate(() => {
      const headerRect = document.querySelector<HTMLElement>(".site-header")!.getBoundingClientRect();
      const toggleRect = document.querySelector<HTMLButtonElement>(".menu-toggle")!.getBoundingClientRect();
      return {
        headerHeight: headerRect.height,
        toggleWidth: toggleRect.width,
        toggleHeight: toggleRect.height,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    expect(geometry.headerHeight).toBeGreaterThanOrEqual(72);
    expect(geometry.headerHeight).toBeLessThanOrEqual(80);
    expect(geometry.toggleWidth).toBeGreaterThanOrEqual(48);
    expect(geometry.toggleWidth).toBeLessThanOrEqual(52);
    expect(geometry.toggleHeight).toBeGreaterThanOrEqual(48);
    expect(geometry.toggleHeight).toBeLessThanOrEqual(52);
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);

    await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
    await expect(header).toHaveClass(/is-scrolled/);
    await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().top)).toBe(0);
  }
});

test("mobile anchor targets clear the sticky header", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const target of ["systems", "experience", "training-heading", "partnership-heading", "contact"]) {
    await page.goto(`/ar#${target}`);
    const headerHeight = await page.locator(".site-header").evaluate((element) => element.getBoundingClientRect().height);
    await expect.poll(() => page.locator(`#${target}`).evaluate((element) => element.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(headerHeight);
  }
});

test("mobile hero and section headings remain contained from 320px through 430px", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const locale of ["en", "ar"]) {
    for (const width of [320, 375, 390, 430]) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);

      const geometry = await page.locator("#hero-heading, #sales-heading, #systems-heading, #experience-heading, #supporting-heading, #contact-heading")
        .evaluateAll((elements) => elements.map((element) => {
          const rect = element.getBoundingClientRect();
          const htmlWidth = document.documentElement.clientWidth;
          const node = element as HTMLElement;
          return {
            left: rect.left,
            right: rect.right,
            height: rect.height,
            clientWidth: node.clientWidth,
            scrollWidth: node.scrollWidth,
            htmlWidth,
          };
        }));

      expect(geometry).toHaveLength(6);
      for (const heading of geometry) {
        expect(heading.left).toBeGreaterThanOrEqual(-0.5);
        expect(heading.right).toBeLessThanOrEqual(heading.htmlWidth + 0.5);
        expect(heading.scrollWidth).toBeLessThanOrEqual(heading.clientWidth + 1);
        expect(heading.height).toBeGreaterThan(0);
      }
      expect(geometry[0].height).toBeLessThan(812 * 0.38);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        await page.evaluate(() => document.documentElement.clientWidth),
      );
    }
  }
});
