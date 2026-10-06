import { expect, test } from "@playwright/test";

for (const locale of ["en", "ar"] as const) {
  test(`approved commercial evidence and Sahara target safety in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const proof = page.locator(".commercial-proof");
    await expect(proof).toHaveAttribute("aria-label", locale === "en" ? "Commercial proof" : "دليل العمل التجاري");
    await expect(proof.locator("li")).toHaveCount(4);
    await expect(proof.locator("strong")).toHaveText(locale === "en" ? ["18", "120+", "7 stations", "320 kW"] : ["18", "120+", "7 محطات", "320 kW"]);
    await expect(proof).not.toContainText("25+");
    await expect(proof).not.toContainText("47");
    await expect(proof).not.toContainText("40");

    const detail = await page.context().newPage();
    await detail.goto(`/${locale}/cases/b2b-market-account-development`);
    const market = detail.locator(".system-entry").first();
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "47 mapped market entries · 20 prioritized accounts" : "47 جهة مسجلة في خريطة السوق · 20 حسابًا ذا أولوية");
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "updated daily for stages, follow-up dates and next actions" : "حدّثه أحمد يوميًا لمتابعة المراحل ومواعيد المتابعة والخطوات التالية");
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "7 solar stations totaling 320 kW" : "7 محطات شمسية بقدرة إجمالية 320 كيلووات");
    await expect(market.locator(".market-evidence")).toContainText(locale === "en" ? "approximately 7,000 feddans" : "نحو 7,000 فدان");

    await page.locator(".journey-step--solar .journey-full-detail summary").click();
    const growth = page.locator(".journey-step").nth(3);
    await expect(growth).toContainText(locale === "en" ? "Personally closed 18 solar installation opportunities" : "أغلقت بنفسي 18 فرصة");
    await expect(growth).toContainText(locale === "en" ? "120+ site surveys and customer visits" : "أكثر من 120 معاينة وزيارة");
    const sahara = page.locator('[data-supporting-id="sahara-2026"]');
    await expect(sahara).toContainText(locale === "en" ? "Sahara Expo 2026 — B2B Field Development" : "Sahara Expo 2026 — تطوير أعمال ميداني وشراكات B2B");
    await expect(sahara).toContainText(locale === "en" ? "20 prioritized accounts" : "20 جهة ذات أولوية");

    await detail.goto(`/${locale}/cases/solar-pv-engineering`);
    const flagship = detail.locator(".system-entry--solar");
    await expect(flagship).not.toContainText(locale === "en" ? "18 solar" : "18 فرصة");
    await expect(flagship).not.toContainText(locale === "en" ? "320 kW" : "320 كيلووات");
    await detail.close();
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/25\s*[–-]\s*30|8\s*[–-]\s*10|10\s*[–-]\s*12|6\s*[–-]\s*8|4\s*[–-]\s*6/);
    expect(text).not.toMatch(/7,000\s+feddans\s+(?:installed|completed)|7,000\s+فدان\s+(?:مُنفذ|منفذ|مركب)/i);
    expect(text).not.toMatch(/company-wide CRM|CRM adopted by the sales team/i);
  });
}
