import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdir, readFile } from "node:fs/promises";
import { ar } from "../content/ar";
import { en } from "../content/en";

for (const locale of ["en", "ar"] as const) for (const width of [375, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`${locale} signed institute protocol preserves outcome and agreed execution at ${width}px ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: theme });
    await page.goto(`/${locale}#partnership-heading`);
    await page.evaluate(() => document.fonts.ready);
    const block = page.locator(".partnership-evidence");
    const d = locale === "en" ? en : ar;
    await expect(block.locator("h3")).toHaveText(locale === "en" ? "Institutional Partnership Development" : "تطوير شراكة مؤسسية");
    await expect(block.locator(".evidence-label")).toHaveText(locale === "en" ? "Higher Technological Institute of Beni Suef" : "المعهد التكنولوجي العالي ببني سويف");
    await expect(block.locator(".evidence-intro > p").last()).toHaveText(d.experience.partnership.context);
    await expect(block).toContainText(locale === "en" ? "Ahmed initiated the relationship" : "بادرت بالتواصل");
    await expect(block).toContainText(locale === "en" ? "direct communication and follow-up meetings" : "التواصل المباشر والاجتماعات والمتابعة");
    await expect(block).toContainText(locale === "en" ? "Formal cooperation protocol signed between Innovation for Solar Systems and the Higher Technological Institute of Beni Suef." : "تم توقيع بروتوكول تعاون رسمي بين Innovation for Solar Systems والمعهد التكنولوجي العالي ببني سويف.");
    const journey = block.locator(width === 375 ? ".partnership-sequence" : ".partnership-journey ol");
    await expect(journey).toBeVisible();
    await expect(journey.locator(width === 375 ? "li strong" : "li")).toHaveText(locale === "en"
      ? ["INITIATED", "MEETINGS", "FOLLOW-UP", "STRUCTURED", "SIGNED PROTOCOL", "EXECUTION PHASE"]
      : ["بدأ التواصل", "الاجتماعات", "المتابعة", "تطوير الإطار", "البروتوكول الموقّع", "مرحلة التنفيذ"]);
    const status = block.locator(width === 375 ? ".partnership-mobile-secondary" : ".partnership-facts");
    await expect(status).toBeVisible();
    await expect(status.locator("dt").last()).toHaveText(locale === "en" ? "STATUS" : "الحالة");
    await expect(status.locator(".partnership-status-title")).toHaveText(locale === "en" ? "Signed Protocol — Execution Phase Starting" : "بروتوكول موقّع — بدء مرحلة التنفيذ");
    if (width === 1440) await expect(status).toContainText(locale === "en" ? "Protocol signed; execution activities are now scheduled and being prepared." : "تم توقيع البروتوكول، وتبدأ أنشطة التنفيذ وفق الجدول المتفق عليه.");
    if (width === 375) for (const label of await status.locator("dt").all()) {
      expect(await label.evaluate(n => {
        const bounds = n.getBoundingClientRect(), range = document.createRange(); range.selectNodeContents(n);
        return [...range.getClientRects()].every(r => r.left >= bounds.left - 0.5 && r.right <= bounds.right + 0.5);
      })).toBe(true);
    }
    const execution = block.locator(".partnership-next");
    await expect(execution.locator("h4")).toHaveText(locale === "en" ? "EXECUTION NOW" : "أنشطة التنفيذ");
    await expect(execution.locator("li > strong")).toHaveText(locale === "en" ? ["Field Visits", "Educational Seminar", "Monthly Technical Sessions", "Solar Energy Laboratory"] : ["زيارات ميدانية", "ندوة تعليمية", "جلسات فنية شهرية", "معمل الطاقة الشمسية"]);
    await expect(execution.locator(".partnership-execution-status")).toHaveText(locale === "en" ? ["SCHEDULED TO BEGIN", "DATE AGREED", "AGREED RECURRING ACTIVITY", "SUPPLY AGREED"] : ["مقررة للبدء", "الموعد متفق عليه", "نشاط دوري متفق عليه", "التوريد متفق عليه"]);
    const desktopDetails = execution.locator(".partnership-execution-desktop");
    await expect(desktopDetails).toHaveText(locale === "en" ? [
      "Field visits are scheduled to begin on 5 October 2026.",
      "An educational and introductory seminar has been agreed with the institute.",
      "Monthly technical sessions have been agreed, with two Innovation engineers scheduled to deliver sessions at the institute.",
      "Supply of a complete solar-energy training laboratory has been agreed. The next step is submission of the formal technical and financial proposal covering the laboratory requirements.",
    ] : [
      "من المقرر بدء الزيارات الميدانية في 5 أكتوبر 2026.",
      "تم الاتفاق على تنظيم ندوة تعليمية وتعريفية داخل المعهد.",
      "تم الاتفاق على تنظيم جلسات فنية شهرية داخل المعهد يقدمها مهندسان من Innovation.",
      "تم الاتفاق على توريد معمل متكامل للطاقة الشمسية للمعهد، والخطوة التالية هي تقديم عرض رسمي بالمواصفات والمتطلبات الفنية والمالية للمعمل.",
    ]);
    const mobileDetails = execution.locator(".partnership-execution-mobile");
    await expect(mobileDetails).toHaveText(locale === "en" ? [
      "Field visits are scheduled to begin on 5 October 2026.",
      "Seminar date agreed with the institute.",
      "Two Innovation engineers scheduled each month.",
      "Formal technical and financial proposal next.",
    ] : [
      "من المقرر بدء الزيارات الميدانية في 5 أكتوبر 2026.",
      "تم الاتفاق على موعد الندوة داخل المعهد.",
      "جلسات شهرية يقدمها مهندسان من Innovation.",
      "الخطوة التالية: عرض رسمي بالمواصفات والمتطلبات الفنية والمالية.",
    ]);
    for (const detail of await (width === 375 ? mobileDetails : desktopDetails).all()) await expect(detail).toBeVisible();
    for (const detail of await (width === 375 ? desktopDetails : mobileDetails).all()) await expect(detail).toBeHidden();
    await expect(block).not.toContainText(/Pilot execution.*pending|planned|مخطط|قيد الانتظار/i);
    // Only the verified field-visit row carries a date; no seminar/lab/session dates or counts are invented.
    for (const row of (await execution.locator("li").all()).slice(1)) await expect(row).not.toContainText(/\d/);
    if (width === 375) for (const detail of await mobileDetails.all()) {
      expect(await detail.evaluate(n => n.getBoundingClientRect().height / parseFloat(getComputedStyle(n).lineHeight))).toBeLessThanOrEqual(3.1);
    }
    await expect(block).not.toContainText(/Ahmed (?:personally )?signed|legal signatory|visits commenced|visits completed|laboratory (?:supplied|installed|commissioned)|seminar delivered|sessions delivered|students will be hired|guarantees employment|completed Pilot|revenue|training hours|وقّعت البروتوكول|تم توريد|تم تركيب|ضمان التوظيف|سيتم توظيف|إيرادات/i);
    // No documentary asset is published when no sanitized cover has been supplied.
    await expect(block.locator("img, a[download], a[href$='.pdf']")).toHaveCount(0);
    const training = page.locator(".training-note");
    expect(await training.evaluate(n => n.nextElementSibling?.classList.contains("partnership-evidence"))).toBe(true);
    await expect(training.locator(".enablement-outcome")).toHaveText(locale === "en" ? "2 trainees hired after course completion" : "تم تعيين متدربين اثنين بعد انتهاء البرنامج");
    await expect(block).not.toContainText(/2 trainees|two trainees|متدربين اثنين/);
    await expect(page.locator(".system-entry--flagship")).toHaveCount(3);
    const sahara = page.locator("#supporting .supporting-entry").nth(1);
    await expect(sahara.locator("h3")).toHaveText(d.work.supporting.items[1].title);
    await expect(sahara.locator("p").first()).toHaveText(d.work.supporting.items[1].description);
    await expect(sahara.locator(".supporting-status")).toHaveText(locale === "en" ? "Current preparation; event targets are not achieved results." : "تحضير حالي؛ أهداف المعرض ليست نتائج محققة.");
    await expect(block).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");
    expect(await block.evaluate(n => [...n.querySelectorAll("h3, h4, p, li, dd")].filter(e => e.getClientRects().length).every(e => {
      const r = e.getBoundingClientRect(); return r.left >= -0.5 && r.right <= document.documentElement.clientWidth + 0.5;
    }))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    expect((await new AxeBuilder({ page }).include(".partnership-evidence").include(".training-note")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  });
}

test("public assets contain no protocol document, signature pages or raw legal images", async ({ request }) => {
  const files = await readdir("public", { recursive: true });
  expect(files.filter(name => /protocol|signature|stamp|signed|بروتوكول|توقيع|ختم/i.test(name))).toEqual([]);
  expect(files.filter(name => /\.pdf$/i.test(name))).toEqual(["Ahmed-Hassan-Sales-Business-Development-Resume.pdf"]);
  for (const path of ["/work/institute-protocol.pdf", "/work/institute-protocol-signatures.webp", "/work/institute-protocol-raw.jpg"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test("editable resume prioritizes signed protocol without planned delivery or visit achievements", async () => {
  const source = await readFile("resume/Ahmed-Hassan-Resume.html", "utf8");
  expect(source).toContain("Initiated and developed the relationship with the Higher Technological Institute of Beni Suef, leading direct communication and follow-up meetings through to a formally signed cooperation protocol for applied renewable-energy training and industry collaboration.");
  expect(source).not.toMatch(/solar-energy training laboratory|monthly technical sessions|field visits commenced|field visits completed|students will be hired|Ahmed personally signed/i);
  expect(source.match(/class="page page-/g)).toHaveLength(2);
});
