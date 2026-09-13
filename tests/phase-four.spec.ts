import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getDictionary } from "../content";

for (const locale of ["en", "ar"] as const) {
  for (const theme of ["light", "dark"] as const) {
    for (const width of [320, 375, 768, 1024, 1440]) {
      test(`${locale} ${theme} responsive content and accessibility at ${width}px`, async ({ page }) => {
        const d = getDictionary(locale);
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(`/${locale}`);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(d.hero.before + d.hero.accent + d.hero.after);
        await expect(page.locator(".node-title")).toHaveText([...d.hero.stages]);
        await expect(page.locator(".capability-heading h3")).toHaveText(d.authority.capabilities.map((item) => item.title));
        await expect(page.locator(".system-title")).toHaveText(d.work.projects.map((item) => item.title));
        await expect(page.locator(".journey-role h3")).toHaveText(d.experience.journey.map((item) => item.title));
        await expect(page.locator(".solar-domain li")).toHaveText([...d.experience.domains]);
        await expect(page.locator(".flagship-proof strong")).toHaveText(d.work.proof.map((item) => item.value));
        for (const image of await page.locator(".portrait-image, .work-preview-image").all()) {
          const hiddenPanel = await image.evaluate((element) => !!element.closest("[hidden]"));
          if (hiddenPanel) continue;
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
          const determinant = await image.evaluate((element) => {
            const matrix = new DOMMatrix(getComputedStyle(element).transform);
            return matrix.a * matrix.d - matrix.b * matrix.c;
          });
          expect(determinant).toBeGreaterThan(0); // Scaling is allowed, mirroring is not.
        }
        const tabs = page.getByRole("tab");
        await tabs.first().press(locale === "ar" ? "ArrowLeft" : "ArrowRight");
        await expect(tabs.nth(1)).toBeFocused();
        await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
        await expect(page.getByRole("tabpanel").locator("img")).toHaveAttribute("alt", d.work.secondary[0].alt);
        await tabs.first().click();
        if (width < 900) {
          await page.getByRole("button", { name: d.nav.open }).click();
          const menu = page.getByRole("navigation", { name: d.nav.mobile });
          await expect(menu.getByRole("combobox", { name: d.nav.theme })).toBeVisible();
          await expect(menu.getByRole("group", { name: d.nav.language })).toBeVisible();
          await menu.getByRole("link", { name: new RegExp(d.nav.items[2].label) }).click();
          await expect(menu).toBeHidden();
        } else {
          await expect(page.locator(".desktop-preferences").getByRole("combobox", { name: d.nav.theme })).toBeVisible();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        await page.evaluate(() => document.fonts.ready);
        if (locale === "ar") {
          expect(await page.locator("body").evaluate((element) => getComputedStyle(element).fontFamily)).toContain("arabic");
          expect(await page.evaluate(() => Array.from(document.fonts).some((font) => font.family === "arabic" && font.status === "loaded"))).toBe(true);
        }
        const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(result.violations).toEqual([]);
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: `test-results/phase-4-${locale}-${theme}-${width}.png`, fullPage: true });
        await page.locator(".hero").screenshot({ path: `test-results/phase-4-hero-${locale}-${theme}-${width}.png`, style: ".site-header, .skip-link { visibility: hidden !important; }" });
        await page.locator("#contact").screenshot({ path: `test-results/phase-5-contact-${locale}-${theme}-${width}.png`, style: ".site-header, .skip-link { visibility: hidden !important; }" });
        expect(errors).toEqual([]);
      });
    }
  }
}

test("system theme, manual override, persistence and cross-tab synchronization", async ({ page, context }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const select = page.locator(".desktop-preferences select");
  await select.selectOption("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(select).toHaveValue("dark");
  const other = await context.newPage();
  await other.goto("/ar");
  await expect(other.locator("html")).toHaveAttribute("data-theme", "dark");
  await select.selectOption("light");
  await expect(other.locator("html")).toHaveAttribute("data-theme", "light");
  await select.selectOption("system");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

for (const width of [375, 1440]) {
  test(`language switch retains section, theme and project state at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en#systems");
    await page.locator(".system-summary").first().press("Enter");
    await page.getByRole("tab").nth(2).click();
    if (width < 900) await page.getByRole("button", { name: "Open navigation" }).click();
    const controls = page.locator(width < 900 ? ".mobile-nav .preferences" : ".desktop-preferences");
    await controls.getByRole("combobox").selectOption("dark");
    await controls.getByRole("link", { name: "AR", exact: true }).click();
    await expect(page).toHaveURL(/\/ar#systems$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator(".system-entry").first()).not.toHaveAttribute("open");
    await expect(page.getByRole("tab").last()).toHaveAttribute("aria-selected", "true");
    await page.goto("/");
    await expect(page).toHaveURL(/\/ar$/);
    expect(errors).toEqual([]);
  });
}

test("locale routes and metadata include canonicals and language alternates", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  for (const locale of ["en", "ar"] as const) {
    const d = getDictionary(locale);
    await page.goto(`/${locale}`);
    await expect(page).toHaveTitle(d.meta.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", d.meta.description);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", d.meta.title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", d.meta.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/${locale}$`));
    for (const alternate of ["en", "ar"]) await expect(page.locator(`link[hreflang="${alternate}"]`)).toHaveAttribute("href", new RegExp(`/${alternate}$`));
  }
  const response = await page.goto("/fr");
  expect(response?.status()).toBe(404);
});

test("saved theme is applied before the body appears", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-theme", "dark");
    const observer = new MutationObserver(() => {
      if (!document.body) return;
      document.body.dataset.firstTheme = document.documentElement.dataset.theme;
      observer.disconnect();
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/ar");
  await expect(page.locator("body")).toHaveAttribute("data-first-theme", "dark");
});

test("system dark colors remain available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/ar");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(13, 21, 36)");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await context.close();
});
