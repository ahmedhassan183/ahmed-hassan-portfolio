import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdir, readFile } from "node:fs/promises";
import { ar } from "../content/ar";
import { en } from "../content/en";

for (const locale of ["en", "ar"] as const) for (const width of [375, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`${locale} signed institute protocol preserves outcome and planned execution at ${width}px ${theme}`, async ({ page }) => {
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
      ? ["INITIATED", "MEETINGS", "FOLLOW-UP", "STRUCTURED", "SIGNED PROTOCOL"]
      : ["بدأ التواصل", "الاجتماعات", "المتابعة", "تطوير الإطار", "البروتوكول الموقّع"]);
    const status = block.locator(width === 375 ? ".partnership-mobile-secondary" : ".partnership-facts");
    await expect(status).toBeVisible();
    await expect(status).toContainText(locale === "en" ? "Field visits are scheduled to begin on 5 October 2026." : "من المقرر بدء الزيارات الميدانية في 5 أكتوبر 2026.");
    await expect(status).toContainText(locale === "en" ? "Pilot execution and applied outcomes remain pending." : "لا تزال نتائج التنفيذ والبرنامج التجريبي قيد الانتظار.");
    if (width === 375) for (const label of await status.locator("dt").all()) {
      expect(await label.evaluate(n => {
        const bounds = n.getBoundingClientRect(), range = document.createRange(); range.selectNodeContents(n);
        return [...range.getClientRects()].every(r => r.left >= bounds.left - 0.5 && r.right <= bounds.right + 0.5);
      })).toBe(true);
    }
    await expect(block.locator(".partnership-next h4")).toHaveText(locale === "en" ? "NEXT COOPERATION · PLANNED" : "المرحلة التالية من التعاون · مخططة");
    await expect(block.locator(".partnership-next li p")).toHaveText(locale === "en" ? [
      "Planned supply of a complete solar-energy training laboratory for the institute.",
      "Planned educational and introductory solar-energy seminar at the institute.",
      "Planned monthly technical sessions at the institute delivered by two Innovation engineers.",
    ] : [
      "مخطط لتوريد معمل متكامل للطاقة الشمسية للمعهد.",
      "مخطط لتنظيم ندوة تعليمية وتعريفية في مجال الطاقة الشمسية داخل المعهد.",
      "مخطط لتنظيم جلسات فنية شهرية داخل المعهد يقدمها مهندسان من Innovation.",
    ]);
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
