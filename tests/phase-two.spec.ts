import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { salesCapabilities, salesSystems, supportingWork } from "../data/sales";

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`Phase 2 navigation, content and system interaction at ${width}px`, async ({ page }) => {
    test.setTimeout(60_000); // This now visits three dedicated evidence pages, retaining all original assertions.
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "View Commercial Work" }).click();
    await expect(page).toHaveURL(/#systems$/);
    // Settle the primary CTA's native scroll before requesting another fragment.
    // Both targets must clear the sticky header; overlapping scroll requests are not a user navigation sequence.
    await expect.poll(() => page.locator("#systems").evaluate(element => { const top = element.getBoundingClientRect().top, bottom = document.querySelector(".site-header")!.getBoundingClientRect().bottom; return top >= bottom && top - bottom <= 40; })).toBe(true);
    await page.goto("/en#sales");
    const authority = page.locator("#sales");
    await expect(authority.getByRole("heading", { level: 2 })).toHaveText("From the first conversation to the next opportunity.");
    await expect(authority.getByRole("article")).toHaveCount(3);
    for (const [index, capability] of salesCapabilities.entries()) {
      const block = authority.getByRole("article").nth(index);
      await expect(block.getByRole("heading", { level: 3 })).toHaveText(capability.title);
      await expect(block.locator("li")).toHaveText([...capability.skills]);
      await expect(block.locator(".capability-description")).toHaveText(capability.description);
    }
    await expect.poll(() => authority.evaluate(element => { const top = element.getBoundingClientRect().top, bottom = document.querySelector(".site-header")!.getBoundingClientRect().bottom; return top >= bottom && top - bottom <= 40; })).toBe(true);
    if (width < 900) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Systems/ }).click();
    } else await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Systems" }).click();
    await expect(page).toHaveURL(/#systems$/);
    await expect(page.locator("#systems-heading")).toHaveText("BUILT, NOT JUST LEARNED.");
    await expect(page.locator("#systems .section-description")).toHaveText("Three cases show business development, solar commercial decision-making and a structured after-sales product.");
    await expect(page.locator("[data-case-summary]")).toHaveCount(3);
    await expect(page.locator(".case-summary-copy h3")).toHaveText(salesSystems.map(system => system.title));
    await expect(page.locator(".supporting-entry")).toHaveCount(4);
    await expect(page.locator(".supporting-entry").first().getByAltText(supportingWork[0].artifact.alt, { exact: true })).toBeVisible();
    await expect(page.locator(".work-preview-placeholder")).toHaveCount(0);
    await expect(page.locator(".work-preview-image")).toHaveCount(4);
    await page.locator("#systems").screenshot({ path: `test-results/selected-systems-${width}.png`, style: ".site-header,.skip-link{visibility:hidden!important}" });
    // The same detailed assertions now run at the actual public destination for each CTA.
    let detailedImages = 0;
    for (const system of salesSystems) {
      await page.locator(`[data-case-summary="${system.id}"] .button`).click();
      await expect(page).toHaveURL(new RegExp(`/en/cases/${system.id}$`));
      const entry = page.locator(".system-entry");
      await expect(entry).toHaveCount(1);
      await expect(entry).toHaveAttribute("open", "");
      await expect(entry.locator(".flagship-badge")).toHaveText("FLAGSHIP CASE");
      for (const [field, value] of Object.entries({ problem: system.problem, role: system.role, built: system.built, adoption: system.adoption, purpose: system.purpose })) await expect(entry.locator(`.system-${field} dd`)).toHaveText(value);
      await expect(entry.locator(".system-details")).toBeVisible();
      await expect(entry.locator(".system-built dt")).toHaveText("Action / System");
      await expect(entry.getByAltText(system.artifact.alt, { exact: true })).toBeVisible();
      detailedImages += await entry.locator(".work-preview-image").count();
      if (width < 900) expect(await entry.evaluate(element => element.querySelector(".work-preview")!.getBoundingClientRect().bottom <= element.querySelector(".system-fields")!.getBoundingClientRect().top)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await entry.locator("summary").press("Enter");
      await expect(entry).not.toHaveAttribute("open");
      await entry.locator("summary").press("Space");
      await expect(entry).toHaveAttribute("open", "");
      await page.goto("/en#systems");
    }
    expect(detailedImages).toBe(5); // All three primary artifacts plus both secondary Solar PV proofs.
    expect(errors).toEqual([]);
  });
}
for (const width of [375, 1440]) {
  test(`Phase 2 accessibility and reduced motion at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en#systems");
    expect((await new AxeBuilder({ page }).include("#sales").include("#systems").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    await page.goto("/en/cases/maintenance-revenue-product");
    const summary = page.locator(".system-summary");
    await summary.press("Enter"); await summary.press("Enter");
    const panel = page.locator(".system-details");
    await expect(panel).toBeVisible(); await expect(panel).toHaveCSS("animation-name", "none"); await expect(panel).toHaveCSS("opacity", "1"); await expect(summary).toBeFocused();
    expect((await new AxeBuilder({ page }).include("#systems").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  });
}
test.describe("Phase 2 without client JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("server-rendered content and native disclosures stay usable", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/");
    await expect(page.locator("#sales .capability-block")).toHaveCount(3);
    await expect(page.locator(".supporting-entry")).toHaveCount(4);
    await expect(page.locator(".supporting-entry").first().getByAltText(supportingWork[0].artifact.alt, { exact: true })).toBeVisible();
    for (const system of salesSystems) {
      await page.locator(`[data-case-summary="${system.id}"] .button`).press("Enter");
      const entry = page.locator(".system-entry");
      await entry.locator("summary").click(); await expect(entry).not.toHaveAttribute("open");
      await entry.locator("summary").click(); await expect(entry).toHaveAttribute("open", "");
      await expect(entry.locator(".system-built dd")).toHaveText(system.built);
      await expect(entry.locator(".system-built dd")).toBeVisible();
      await page.goto("/en#systems");
    }
  });
});
