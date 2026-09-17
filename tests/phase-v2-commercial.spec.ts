import { expect, test } from "@playwright/test";

for (const locale of ["en", "ar"] as const) {
  test(`approved commercial evidence and Sahara target safety in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const proof = page.locator(".commercial-proof");
    await expect(proof).toHaveAttribute("aria-label", locale === "en" ? "Commercial proof" : "دليل العمل التجاري");
    await expect(proof.locator("li")).toHaveCount(3);
    await expect(proof.locator("strong")).toHaveText(locale === "en" ? ["18", "120+", "7 stations"] : ["18", "120+", "7 محطات"]);
    await expect(proof).not.toContainText("25+");
    await expect(proof).not.toContainText("47");
    await expect(proof).not.toContainText("40");

    const market = page.locator(".system-entry").first();
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "47 mapped market entries and 20 prioritized accounts" : "47 جهة في السوق وقائمة من 20 حسابًا ذا أولوية");
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "daily to track opportunities, follow-up dates and next actions" : "يوميًا لتتبع الفرص ومواعيد المتابعة والخطوات التالية");
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "7 solar stations totaling 320 kW" : "7 محطات شمسية بقدرة إجمالية 320 كيلووات");
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "approximately 7,000 feddans" : "نحو 7,000 فدان");

    const growth = page.locator(".journey-step").nth(3);
    await expect(growth).toContainText(locale === "en" ? "Personally closed 18 solar installation opportunities" : "أغلقت بنفسي 18 فرصة");
    await expect(growth).toContainText(locale === "en" ? "120+ site surveys and customer visits" : "أكثر من 120 معاينة وزيارة");
    await expect(page.locator(".current-bd")).toContainText(locale === "en" ? "Sahara 2026 Field Execution System" : "نظام تنفيذ ميداني لمعرض Sahara 2026");
    await expect(page.locator(".current-bd")).toContainText(locale === "en" ? "20 prioritized accounts" : "20 جهة ذات أولوية");

    const flagship = page.locator(".system-entry--flagship");
    await expect(flagship).not.toContainText(locale === "en" ? "18 solar" : "18 فرصة");
    await expect(flagship).not.toContainText(locale === "en" ? "320 kW" : "320 كيلووات");
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/25\s*[–-]\s*30|8\s*[–-]\s*10|10\s*[–-]\s*12|6\s*[–-]\s*8|4\s*[–-]\s*6/);
    expect(text).not.toMatch(/7,000\s+feddans\s+(?:installed|completed)|7,000\s+فدان\s+(?:مُنفذ|منفذ|مركب)/i);
    expect(text).not.toMatch(/company-wide CRM|CRM adopted by the sales team/i);
  });
}
