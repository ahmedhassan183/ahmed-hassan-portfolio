import { expect, test } from "@playwright/test";
import { partnershipPath } from "../content/partnership";

test("mobile Growth Manager evidence remains complete and scan-friendly", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const locale of ["en", "ar"]) {
    await page.goto(`/${locale}#experience`);
    const growth = page.locator(".journey-step--solar");
    const evidence = growth.locator(".journey-evidence-list");

    await expect(evidence).toBeVisible();
    await expect(evidence.locator("li")).toHaveCount(6);
    await expect(evidence).toContainText("18");
    await expect(evidence).toContainText(/(120\+|أكثر من 120)/);
    await expect(evidence).toContainText(/7\s*(stations|محطات)/i);
    await expect(evidence).toContainText(/320\s*(kW|كيلووات)/i);
    await expect(evidence).toContainText(/CRM/i);
    await expect(evidence).toContainText(/(daily|يومي)/i);
    await expect(evidence).toContainText(/(2\s*trainees|متدربين اثنين)/i);
  }
});

test("mobile Sales Enablement preserves its three-step framework and hiring outcome", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en#training-heading");
  const training = page.locator(".training-note");

  await expect(training.locator(".enablement-steps > div")).toHaveCount(3);
  await expect(training.getByText("TRAIN", { exact: true })).toBeVisible();
  await expect(training.getByText("ASSESS", { exact: true })).toBeVisible();
  await expect(training.getByText("DEVELOP TALENT", { exact: true })).toBeVisible();
  await expect(training.locator(".enablement-outcome")).toContainText(/2 trainees hired/i);
});

test("mobile Institute Partnership preserves ownership, sequence, model and agreed execution status", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en#partnership-heading");
  const partnership = page.locator(".partnership-evidence");
  await expect(partnership).toContainText("Signed Cooperation Protocol");
  await expect(partnership).toContainText("Field execution commenced on 5 October 2026 with a completed first field activity involving 10 institute students.");
  expect((await partnership.boundingBox())!.height).toBeLessThan(400);
  await partnership.locator(".partnership-cta").click();
  await expect(page).toHaveURL(new RegExp(`${partnershipPath}$`));
  const sequence = page.locator("[data-case-timeline]");

  await expect(sequence).toBeVisible();
  await expect(sequence.locator("li")).toHaveCount(6);
  await expect(sequence).toContainText(/initiated/i);
  await expect(sequence).toContainText(/meetings/i);
  await expect(sequence).toContainText(/follow-up/i);
  await expect(sequence).toContainText(/cooperation framework/i);
  await expect(sequence).toContainText(/cooperation protocol signed/i);
  await expect(sequence).toContainText(/field execution.*completed activity #01/i);
  await expect(page.locator(".case-execution-summary")).toContainText("Field execution commenced on 5 October 2026 with a completed first field activity involving 10 institute students.");
  await expect(page.locator(".case-execution-stream")).toHaveCount(3);
  await expect(page.locator("[data-case-scope] li")).toHaveCount(6);
});

test("SELL BUILD and GROW remain visible without interaction across target mobile widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [320, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/en#sales");
    const framework = page.locator(".capability-grid");

    for (const label of ["SELL", "BUILD", "GROW"]) {
      await expect(framework.getByRole("heading", { level: 3, name: label, exact: true })).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => document.documentElement.clientWidth),
    );
  }
});
