import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicAssetExists } from "../lib/public-assets";
import { site } from "../data/site";

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`hero and navigation at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("I Develop B2B Opportunities — And Build the Sales Systems That Move Them Forward.");
    await expect(page.locator(".flow-stages > li")).toHaveCount(7);
    await expect(page.locator(".node-title")).toHaveText(["Prospecting", "Qualification", "Opportunity", "Proposal", "Follow-Up", "Closing", "Account Growth"]);
    await expect(page.getByRole("link", { name: "Explore My Commercial Work" })).toHaveAttribute("href", "#sales");
    await expect(page.getByRole("link", { name: "Contact Ahmed" })).toHaveAttribute("href", "#contact");
    await expect(page.locator("#flow-title")).toContainText("THE SALES SYSTEM");
    await expect(page.locator("#flow-title")).toBeVisible();
    await expect(page.locator(".portrait-frame")).toBeVisible();
    await expect(page.locator(".portrait-role")).toHaveText("Growth Manager · Sales & Marketing Lead");
    await expect(page.locator(".portrait-badge")).toHaveText("Solar Sales Instructor");
    await expect(page.locator(".hero-baseline p")).toHaveText("Prospect → Qualify → Develop → Close → Grow");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width < 900) {
      const toggle = page.getByRole("button", { name: /^(Open|Close) navigation$/ });
      await toggle.click();
      const menu = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(menu).toBeVisible();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
      await expect(toggle).toBeFocused();
      await toggle.press("Enter");
      await page.keyboard.press("Tab");
      await expect(menu.getByRole("link", { name: /Sales/ })).toBeFocused();
      await expect(menu.locator('a[href^="#"]')).toHaveText(["01Sales↗", "02Systems↗", "03Experience↗", "04Contact↗"]);
      await menu.getByRole("link", { name: /Sales/ }).click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(/#sales$/);
    } else {
      await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
    }
    // A short viewport exercises sticky behavior even when the refined hero fits on a laptop.
    await page.setViewportSize({ width, height: 550 });
    await page.locator(".hero-baseline").scrollIntoViewIfNeeded();
    await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
    await expect.poll(() => page.locator(".site-header").evaluate((element) => element.getBoundingClientRect().top)).toBe(0);
    await expect(page.locator(".flow-node").last()).toBeVisible();
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(async () => {
      await Promise.all(document.getAnimations().map((animation) => animation.finished));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.screenshot({ path: `test-results/hero-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("reduced motion shows content immediately and prevents animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator(".entrance, .flow-node, .node-marker, .flow-connector > span, .site-header").evaluateAll((elements) => elements.every((element) => {
    const styles = getComputedStyle(element);
    return styles.animationName === "none" && styles.transform === "none";
  }))).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("opacity", "1");
});

test("entrance and flow have finite staggered animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const timings = await page.locator(".flow-node").evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return { name: style.animationName, delay: parseFloat(style.animationDelay), iterations: style.animationIterationCount };
  }));
  expect(timings.every((item) => item.name === "node-enter" && item.iterations === "1")).toBe(true);
  expect(timings[6].delay).toBeGreaterThan(timings[0].delay);
  const activation = await page.locator(".node-marker").evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return { name: style.animationName, delay: parseFloat(style.animationDelay), iterations: style.animationIterationCount };
  }));
  expect(activation.every((item) => item.name === "stage-activate" && item.iterations === "1")).toBe(true);
  expect(activation.every((item, index) => index === 0 || item.delay > activation[index - 1].delay)).toBe(true);
  await expect(page.locator(".flow-node").last()).toHaveCSS("opacity", "1");
});

test("sales positioning and portrait composition fit a common laptop viewport", async ({ page }) => {
  const missingPortraitRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("ahmed-hassan-hero")) missingPortraitRequests.push(request.url());
  });
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page).toHaveTitle("Ahmed Hassan | Growth & Business Development | B2B Sales & Sales Operations");
  await expect(page.locator(".eyebrow")).toHaveText("Growth & Business Development · B2B Sales · Sales Operations");
  await expect(page.locator(".hero-description")).toHaveText("Growth Manager at Innovation for Solar System, combining hands-on consultative selling, B2B prospecting, qualification, proposals, follow-up and account development with CRM, pipeline management and commercial systems.");
  if (publicAssetExists(site.portrait.src)) {
    await expect(page.locator(".portrait-image")).toHaveAttribute("alt", site.portrait.alt);
  } else {
    await expect(page.locator(".portrait-placeholder")).toContainText("Ahmed’s photograph, coming soon.");
    await expect(page.locator(".portrait-image")).toHaveCount(0);
  }
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [".hero-actions", ".hero-visual"]) {
    expect(await page.locator(selector).evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(768);
  }
  if (!publicAssetExists(site.portrait.src)) expect(missingPortraitRequests).toEqual([]);
});

for (const width of [375, 1440]) {
  test(`accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    if (!publicAssetExists(site.resumeUrl)) {
      const resume = page.locator(".hero-actions").getByRole("button", { name: /Download Resume/ });
      await expect(resume).toHaveAttribute("aria-disabled", "true");
      await resume.focus();
      await expect(page.locator(".hero-actions .resume-tooltip")).toHaveCSS("opacity", "1");
    } else {
      await expect(page.locator(".hero-actions .resume-link")).toHaveAttribute("href", site.resumeUrl);
    }
    if (width < 900) await page.getByRole("button", { name: "Open navigation" }).click();
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations).toEqual([]);
  });
}
