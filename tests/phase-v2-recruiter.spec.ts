import { expect, test } from "@playwright/test";

for (const locale of ["en", "ar"] as const) {
  test(`${locale} recruiter narrative keeps proof before supporting work`, async ({ page }) => {
    await page.goto(`/${locale}`);

    const order = await page.locator("main > section").evaluateAll((sections) =>
      sections.map((section) => section.id || section.classList[0]),
    );
    expect(order).toEqual(["hero", "sales", "systems", "experience", "supporting", "contact"]);

    await expect(page.locator("#sales .capability-block")).toHaveCount(3);
    await expect(page.locator("#sales .capability-skills li")).toHaveCount(12);
    await expect(page.locator("#systems .system-entry--flagship")).toHaveCount(3);
    await expect(page.locator("#experience .sales-journey > li")).toHaveCount(4);
    await expect(page.locator("#experience .experience-periods bdi")).toHaveText(locale === "en"
      ? ["Kahla Optical", "2021–2025", "Innovation for Solar System", "2025–Present"]
      : ["Kahla Optical", "2021–2025", "Innovation for Solar System", "منذ 2025"]);
    await expect(page.locator("#experience .training-note")).toBeVisible();
    await expect(page.locator("#supporting .supporting-entry")).toHaveCount(3);
    await expect(page.locator("#supporting")).toContainText(locale === "en" ? "Sahara 2026 Field Execution System" : "نظام التنفيذ الميداني لمعرض Sahara 2026");

    const primaryContact = page.locator("#contact .contact-actions .button--primary");
    await expect(primaryContact).toHaveText(locale === "en" ? "Contact Ahmed" : "تواصل مع أحمد");
    await expect(primaryContact).toHaveAttribute("href", "mailto:a7md07san@gmail.com");
  });
}
