import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const canonicalResume = "/Ahmed-Hassan-Sales-Business-Development-Resume.pdf";

for (const locale of ["en", "ar"] as const) {
  test(`${locale} keeps Sales Enablement and institute partnership as separate evidence`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const training = page.locator("#experience .training-note");
    const partnership = page.locator("#experience .partnership-evidence");

    await expect(training).toBeVisible();
    await expect(training.locator("h3")).toHaveText(locale === "en" ? "SALES ENABLEMENT & TALENT DEVELOPMENT" : "تمكين المبيعات وتطوير المواهب");
    await expect(training.locator(".enablement-steps > div")).toHaveCount(3);
    await expect(training.locator(".enablement-outcome")).toHaveText(locale === "en" ? "2 trainees hired after course completion" : "تم تعيين متدربين اثنين بعد انتهاء البرنامج");
    await expect(training).toContainText(locale === "en" ? "Selected two trainees who were hired into Innovation immediately after completing the program." : "اختار متدربين اثنين تم تعيينهما داخل Innovation فور انتهاء البرنامج.");
    await expect(training).not.toContainText(/%|cohort|دفعة|نسبة/);

    await expect(partnership).toBeVisible();
    await expect(partnership.locator(".evidence-label")).toHaveText(locale === "en" ? "INDUSTRY–ACADEMIC PARTNERSHIP DEVELOPMENT" : "تطوير شراكة بين القطاع الصناعي والتعليم");
    await expect(partnership).toContainText(locale === "en" ? "Ahmed initiated contact with the Technological Institute" : "بدأ أحمد التواصل مع المعهد التكنولوجي");
    await expect(partnership).toContainText(locale === "en" ? "Ahmed led direct communication and meetings, then continued follow-up until formal cooperation was established." : "أدار أحمد التواصل المباشر والاجتماعات، وواصل المتابعة حتى تم إرساء تعاون رسمي.");
    await expect(partnership).toContainText(locale === "en" ? "Formal cooperation established between Innovation and the Technological Institute." : "تم إرساء تعاون رسمي بين Innovation والمعهد التكنولوجي.");
    await expect(partnership).toContainText(locale === "en" ? "Pilot execution and applied outcomes remain pending." : "لا تزال نتائج التنفيذ والبرنامج التجريبي قيد الانتظار.");
    await expect(partnership.locator(".partnership-model li")).toHaveCount(6);

    expect(await training.evaluate((node) => node.nextElementSibling?.classList.contains("partnership-evidence"))).toBe(true);
    await expect(training).not.toContainText(locale === "en" ? "Technological Institute" : "المعهد التكنولوجي");
    await expect(partnership).not.toContainText(locale === "en" ? /trainees|hired|recruit/i : /متدرب|تعيين|توظيف/);
  });
}

test("evidence patch preserves hierarchy, flagship count and Sahara status", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator(".hero .commercial-proof")).not.toContainText(/trainee|hired/i);
  await expect(page.locator("#systems .system-entry--flagship")).toHaveCount(3);
  const sections = page.locator("main > section");
  await expect(sections).toHaveCount(6);
  await expect(sections.first()).toHaveClass(/\bhero\b/);
  expect(await sections.evaluateAll((nodes) => nodes.slice(1).map((section) => section.id))).toEqual([
    "sales",
    "systems",
    "experience",
    "supporting",
    "contact",
  ]);

  const sahara = page.locator("#supporting .supporting-entry").nth(1);
  await expect(sahara).toContainText("Current preparation; event targets are not achieved results.");
  await expect(sahara).not.toContainText(/meetings achieved|companies met|qualified leads achieved|RFQs generated|site visits generated|partnerships generated|deals|revenue|pipeline value/i);

  for (const locale of ["en", "ar"] as const) {
    await page.goto(`/${locale}`);
    await expect(page.locator(".hero .commercial-proof")).not.toContainText(/trainee|hired|متدرب|تعيين/i);
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/hiring conversion rate|company-wide CRM adoption|Head of Sales|Sales Director|engineering licen[cs]ure|university lecturer|academic professor|final executable design/i);
    expect(text).not.toMatch(/نسبة تحويل للتوظيف|اعتماد CRM على مستوى الشركة|رئيس المبيعات|مدير المبيعات|ترخيص هندسي|أستاذ جامعي|تصميم تنفيذي نهائي/);
  }
});

test("approved V3 resume is the canonical website resume", async ({ page, request }) => {
  await page.goto("/en");
  await expect(page.locator(".resume-link")).toHaveCount(4);
  for (const link of await page.locator(".resume-link").all()) await expect(link).toHaveAttribute("href", canonicalResume);

  const response = await request.get(canonicalResume);
  expect(response.status()).toBe(200);
  const canonicalPdf = await readFile(`public${canonicalResume}`);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  expect(await response.body()).toEqual(canonicalPdf);
});
