import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`asset tabs, inspection and framing at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const portrait = page.locator(".portrait-image");
    await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(portrait).toHaveCSS("object-fit", "cover");
    await expect(portrait).toHaveCSS("object-position", "50% 16%");
    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(3);
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await tabs.first().focus();
    await tabs.first().press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    const panel = page.getByRole("tabpanel");
    await expect(panel).toHaveCount(1);
    await expect(panel).toHaveAttribute("aria-labelledby", "solar-artifact-tab-1");
    await expect(panel).toHaveCSS("animation-name", "none");
    await tabs.nth(1).press("End");
    await expect(tabs.last()).toBeFocused();
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await tabs.last().press("Home");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await tabs.first().press("ArrowLeft");
    await expect(tabs.last()).toBeFocused();

    const inspect = panel.getByRole("link", { name: /Inspect image/ });
    await inspect.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close image preview" })).toBeFocused();
    await expect(dialog).toContainText("Client Quotation Preview");
    const largeImage = dialog.locator("img");
    await expect.poll(() => largeImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    if (width < 900) {
      await expect(dialog.getByRole("button", { name: "Fit image" })).toHaveAttribute("aria-pressed", "true");
      expect(await largeImage.evaluate((image) => image.getBoundingClientRect().width)).toBe(1600);
      const region = dialog.getByRole("region", { name: "Scrollable image preview" });
      await region.focus();
      await region.press("ArrowRight");
      await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
      await dialog.getByRole("button", { name: "Fit image" }).click();
      expect(await largeImage.evaluate((image) => image.getBoundingClientRect().width)).toBeLessThan(width);
    } else {
      await dialog.getByRole("button", { name: "Zoom in" }).click();
      expect(await largeImage.evaluate((image) => image.getBoundingClientRect().width)).toBe(1600);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width === 375 || width === 1440) {
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(axe.violations).toEqual([]);
      await dialog.screenshot({ path: `test-results/phase-3.1-inspection-${width}.png` });
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(inspect).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await tabs.first().click();
    await page.locator(".hero").screenshot({ path: `test-results/phase-3.1-hero-${width}.png`, style: ".site-header, .skip-link { visibility: hidden !important; }" });
  });
}

test("image inspection and secondary artifacts remain accessible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".portrait-image")).toBeVisible();
  await expect(page.getByRole("link", { name: /Inspect image/ })).toHaveCount(4);
  const directLinks = page.locator(".artifact-direct-links").getByRole("link");
  await directLinks.first().focus();
  await page.keyboard.press("Tab");
  await expect(directLinks.nth(1)).toBeFocused();
  const popupPromise = context.waitForEvent("page");
  // Exercise the real anchor with the keyboard, without pointer stability
  // polling or a dependency on the opener relationship (rel=noreferrer).
  await page.keyboard.press("Enter");
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/\/work\/solar-pv-dashboard.webp$/);
  await expect.poll(() => popup.locator("img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await context.close();
});
