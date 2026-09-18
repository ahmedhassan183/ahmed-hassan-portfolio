import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { flagshipSecondaryArtifacts, salesSystems, supportingWork } from "../data/sales";

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`Phase 3 evidence, journey and real assets at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const flagship = page.locator(".system-entry--solar");
    await expect(flagship.locator(".system-title")).toHaveText("Solar PV Engineering, Costing & Quotation System");
    await expect(flagship.locator(".flagship-badge")).toHaveText("FLAGSHIP CASE");
    await expect(flagship.locator(".flagship-proof li")).toHaveText(["40Interconnected Worksheets", "1,500+Formulas", "8Structured Data Tables", "4Charts", "NoMacros"]);
    await expect(flagship.locator(".flagship-capabilities h4")).toHaveText(["ENGINEERING", "COMMERCIAL", "FINANCIAL", "CONTROL & QA"]);
    await expect(flagship.locator(".engineering-workflow li")).toHaveText(["Customer Input", "Engineering Design", "BOQ", "Costing", "Pricing", "Client Quotation", "Financial Analysis", "Dashboard"]);
    await expect(flagship.locator(".flagship-assurance")).toContainText("The client-facing quotation is separated from internal purchase cost, margin and profit information.");
    await expect(page.locator(".maintenance-tiers li")).toHaveText(["Economic", "Advanced", "Premium"]);
    await flagship.locator(".system-summary").press("Enter");
    await expect(flagship.locator(".system-body")).toBeHidden();
    await flagship.locator(".system-summary").press("Space");
    await expect(flagship.locator(".system-body")).toBeVisible();

    for (const artifact of [...salesSystems.map((system) => system.artifact), supportingWork[0].artifact, ...flagshipSecondaryArtifacts]) {
        const secondaryIndex = flagshipSecondaryArtifacts.findIndex((item) => item.path === artifact.path);
        if (secondaryIndex >= 0) await flagship.getByRole("tab").nth(secondaryIndex + 1).click();
        const image = page.getByAltText(artifact.alt, { exact: true });
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
        await expect(image).toHaveAttribute("src", /\/_next\/image\?/);
    }
    await flagship.getByRole("tab").first().click();
    await expect(page.locator(".portrait-image")).toHaveCount(1);
    await expect(page.locator(".portrait-placeholder, .work-preview-placeholder")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width < 900) {
      const layout = await flagship.evaluate((element) => {
        const visual = element.querySelector(".system-visual")!.getBoundingClientRect();
        const scope = element.querySelector(".flagship-scope")!.getBoundingClientRect();
        return { stacked: visual.bottom <= scope.top, width: visual.width };
      });
      expect(layout.stacked).toBe(true);
      expect(layout.width).toBeGreaterThanOrEqual(width - 64);
    }
    if (width < 900) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Experience/ }).click();
    } else {
      await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Experience" }).click();
    }
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator("#experience-heading")).toHaveText("From Hands-On Selling to Growth & Business Development.");
    await expect(page.locator(".sales-journey > li")).toHaveCount(5);
    await expect(page.locator(".journey-role h3")).toHaveText(["Sales Representative", "Inventory / Sales Coordination", "Branch Management", "Growth Manager", "Solar Sales Instructor"]);
    await expect(page.locator(".journey-step").nth(3)).toContainText("Leading and coordinating Sales & Marketing activities.");
    await expect(page.locator(".journey-step").nth(4)).toContainText("Supporting responsibility within the Growth Manager role.");
    await expect(page.locator(".solar-domain li")).toHaveCount(8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => document.fonts.ready);
    const style = ".site-header, .skip-link { visibility: hidden !important; }";
    await flagship.screenshot({ path: `test-results/phase-3.1-flagship-${width}.png`, style });
    await page.locator("#experience").screenshot({ path: `test-results/phase-3.1-experience-${width}.png`, style });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `test-results/phase-3.1-home-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("real prepared portrait renders through next/image", async ({ page }) => {
  await page.goto("/");
  const portrait = page.getByAltText("Ahmed Hassan — Growth and Business Development professional", { exact: true });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("src", /\/_next\/image\?/);
  await expect.poll(() => portrait.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  await expect(page.locator(".portrait-placeholder")).toHaveCount(0);
});

test("flagship progression is finite and respects reduced motion", async ({ page }) => {
  await page.goto("/");
  const progress = page.locator(".build-progress");
  await progress.scrollIntoViewIfNeeded();
  await expect(progress).toHaveClass(/is-revealed/);
  const timing = await progress.locator("li").evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return { name: style.animationName, count: style.animationIterationCount, delay: parseFloat(style.animationDelay) };
  }));
  expect(timing.every((item) => item.name === "build-stage" && item.count === "1")).toBe(true);
  expect(timing[3].delay).toBeGreaterThan(timing[0].delay);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const item of await progress.locator("li").all()) await expect(item).toHaveCSS("animation-name", "none");
  await page.getByRole("tab", { name: "Engineering & Commercial Dashboard" }).click();
  const result = await new AxeBuilder({ page }).include("#systems").include("#experience").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
});
