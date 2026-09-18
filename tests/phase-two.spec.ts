import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { salesCapabilities, salesSystems, supportingWork, flagshipSecondaryArtifacts } from "../data/sales";

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`Phase 2 navigation, content and system interaction at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Explore My Commercial Work" }).click();
    await expect(page).toHaveURL(/#sales$/);
    const authority = page.locator("#sales");
    await expect(authority.getByRole("heading", { level: 2 })).toHaveText("From the first conversation to the next opportunity.");
    await expect(authority.getByRole("article")).toHaveCount(3);
    for (const [index, capability] of salesCapabilities.entries()) {
      const block = authority.getByRole("article").nth(index);
      await expect(block.getByRole("heading", { level: 3 })).toHaveText(capability.title);
      await expect(block.locator("li")).toHaveText([...capability.skills]);
      await expect(block.locator(".capability-description")).toHaveText(capability.description);
    }
    // Native fragment targets stay below the sticky header once smooth scrolling settles.
    await expect.poll(() => authority.evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBe(110);
    if (width < 900) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Systems/ }).click();
    } else {
      await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Systems" }).click();
    }
    await expect(page).toHaveURL(/#systems$/);
    await expect(page.locator("#systems-heading")).toHaveText("BUILT, NOT JUST LEARNED.");
    await expect(page.locator("#systems .section-description")).toHaveText("Three cases show business development, solar commercial decision-making and a structured after-sales product.");
    const entries = page.locator(".system-entry");
    await expect(entries).toHaveCount(3);
    await expect(entries.locator(".flagship-badge")).toHaveText(["FLAGSHIP CASE", "FLAGSHIP CASE", "FLAGSHIP CASE"]);
    await expect(page.locator(".system-title")).toHaveText(salesSystems.map((system) => system.title));
    await expect(entries.nth(0)).toHaveAttribute("open", "");
    await expect(page.locator(".system-entry[open]")).toHaveCount(3);
    const artifacts = [...salesSystems.map((system) => system.artifact), supportingWork[0].artifact, ...flagshipSecondaryArtifacts];
    await expect(page.locator(".work-preview-placeholder")).toHaveCount(0);
    await expect(page.locator(".work-preview-image")).toHaveCount(artifacts.length);
    for (const [index, system] of salesSystems.entries()) {
      const entry = entries.nth(index);
      await expect(entry).toHaveAttribute("open", "");
      await expect(entry.locator(".system-problem dd")).toHaveText(system.problem);
      await expect(entry.locator(".system-role dd")).toHaveText(system.role);
      await expect(entry.locator(".system-built dd")).toHaveText(system.built);
      await expect(entry.locator(".system-adoption dd")).toHaveText(system.adoption);
      await expect(entry.locator(".system-purpose dd")).toHaveText(system.purpose);
      await expect(entry.locator(".system-details")).toBeVisible();
      await expect(entry.locator(".system-built dt")).toHaveText("Action / System");
      await expect(entry.getByAltText(system.artifact.alt, { exact: true })).toBeVisible();
      if (width < 900) {
        // Compare both rectangles in one frame while native anchor scrolling may be active.
        const stackedInOrder = await entry.evaluate((element) => {
          const preview = element.querySelector(".work-preview")!.getBoundingClientRect();
          const explanation = element.querySelector(".system-fields")!.getBoundingClientRect();
          return preview.bottom <= explanation.top;
        });
        expect(stackedInOrder).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
    // Keyboard users can collapse, open and move between each full-row disclosure.
    await expect(page.locator(".supporting-entry")).toHaveCount(3);
    await expect(page.locator(".supporting-entry").first().getByAltText(supportingWork[0].artifact.alt, { exact: true })).toBeVisible();
    await entries.nth(2).locator("summary").press("Enter");
    await expect(entries.nth(2)).not.toHaveAttribute("open");
    await entries.nth(2).locator("summary").press("Space");
    await expect(entries.nth(2)).toHaveAttribute("open", "");
    await expect(page.locator(".system-entry[open]")).toHaveCount(3);
    await page.locator("#systems").focus();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(document.getAnimations().map((animation) => animation.finished));
    });
    const captureStyle = ".site-header, .skip-link { visibility: hidden !important; }";
    await authority.screenshot({ path: `test-results/sales-authority-${width}.png`, style: captureStyle });
    await page.locator("#systems").screenshot({ path: `test-results/selected-systems-${width}.png`, style: captureStyle });
    await entries.nth(0).screenshot({ path: `test-results/first-project-${width}.png`, style: captureStyle });
    expect(errors).toEqual([]);
  });
}

for (const width of [375, 1440]) {
  test(`Phase 2 accessibility and reduced motion at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#systems");
    await page.locator(".system-summary").nth(2).press("Enter");
    await page.locator(".system-summary").nth(2).press("Enter");
    const panel = page.locator(".system-entry").nth(2).locator(".system-details");
    await expect(panel).toBeVisible();
    await expect(panel).toHaveCSS("animation-name", "none");
    await expect(panel).toHaveCSS("opacity", "1");
    await expect(page.locator(".system-summary").nth(2)).toBeFocused();
    const accessibility = await new AxeBuilder({ page }).include("#sales").include("#systems").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(accessibility.violations).toEqual([]);
  });
}

test.describe("Phase 2 without client JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("server-rendered content and native disclosures stay usable", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#sales .capability-block")).toHaveCount(3);
    await page.locator(".system-summary").nth(1).click();
    await expect(page.locator(".system-entry").nth(1)).not.toHaveAttribute("open");
    await page.locator(".system-summary").nth(1).click();
    await expect(page.locator(".system-entry").nth(1)).toHaveAttribute("open", "");
    await expect(page.locator(".system-entry").nth(1).locator(".system-built dd")).toBeVisible();
    await expect(page.locator(".system-entry[open]")).toHaveCount(3);
    await expect(page.locator(".supporting-entry")).toHaveCount(3);
    await expect(page.locator(".supporting-entry").first().getByAltText(supportingWork[0].artifact.alt, { exact: true })).toBeVisible();
  });
});
