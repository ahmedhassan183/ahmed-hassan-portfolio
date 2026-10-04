import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdir, readFile } from "node:fs/promises";
import { ar } from "../content/ar";
import { en } from "../content/en";
import { getPartnershipCase, partnershipPath } from "../content/partnership";

for (const locale of ["en", "ar"] as const) for (const width of [375, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`${locale} signed institute protocol preserves outcome and agreed execution at ${width}px ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: theme });
    await page.goto(`/${locale}#partnership-heading`);
    await page.evaluate(() => document.fonts.ready);
    const d = locale === "en" ? en : ar, c = getPartnershipCase(locale);
    const snapshot = page.locator(".partnership-evidence"), training = page.locator(".training-note");
    await expect(snapshot.locator("h3")).toHaveText(c.title);
    await expect(snapshot.locator(".evidence-label")).toHaveText(d.experience.partnership.label);
    await expect(snapshot).toContainText(c.snapshot.signed);
    await expect(snapshot).toContainText(c.snapshot.execution);
    await expect(snapshot).not.toContainText(/2 trainees|two trainees|متدربين اثنين/);
    await expect(snapshot.locator(".partnership-cta")).toHaveText(c.snapshot.cta);
    expect(await training.evaluate(n => n.nextElementSibling?.classList.contains("partnership-evidence"))).toBe(true);
    await expect(training.locator(".enablement-outcome")).toHaveText(locale === "en" ? "2 trainees hired after course completion" : "تم تعيين متدربين اثنين بعد انتهاء البرنامج");
    await expect(page.locator(".system-entry--flagship")).toHaveCount(3);
    const sahara = page.locator("#supporting .supporting-entry").nth(1);
    await expect(sahara.locator("h3")).toHaveText(d.work.supporting.items[1].title);
    await expect(sahara.locator("p").first()).toHaveText(d.work.supporting.items[1].description);
    await expect(sahara.locator(".supporting-status")).toHaveText(locale === "en" ? "Current preparation; event targets are not achieved results." : "تحضير حالي؛ أهداف المعرض ليست نتائج محققة.");
    expect((await new AxeBuilder({ page }).include(".partnership-evidence").include(".training-note").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    await snapshot.locator(".partnership-cta").click();
    await expect(page).toHaveURL(new RegExp(`${partnershipPath}$`));
    const block = page.locator(".partnership-case");
    await expect(block.locator("h1")).toHaveText(c.title);
    await expect(block.locator(".case-summary")).toHaveText(c.summary);
    await expect(block).toContainText(locale === "en" ? "Ahmed initiated the relationship" : "بادرت بالتواصل");
    await expect(block).toContainText(locale === "en" ? "direct communication and follow-up meetings" : "التواصل المباشر والاجتماعات والمتابعة");
    await expect(block).toContainText(d.experience.partnership.developed);
    await expect(block).toContainText(d.experience.partnership.outcome);
    await expect(block.locator("[data-case-timeline] li h3")).toHaveText(c.timeline.map(s => s.title));
    await expect(block.locator(".case-execution-summary")).toHaveText(c.executionSummary);
    const streams = block.locator(".case-execution-stream");
    await expect(streams.locator("h4")).toHaveText(d.experience.partnership.next.slice(1).map(item => item.label));
    await expect(streams.locator("p:first-child")).toHaveText(locale === "en" ? ["DATE AGREED", "AGREED RECURRING ACTIVITY", "SUPPLY AGREED"] : ["الموعد متفق عليه", "نشاط دوري متفق عليه", "التوريد متفق عليه"]);
    await expect(streams.locator("p:last-child")).toHaveText(d.experience.partnership.next.slice(1).map(item => item.detail));
    for (const stream of await streams.all()) await expect(stream).toBeVisible();
    for (const stream of await streams.all()) await expect(stream).not.toContainText(/\d/);
    await expect(block).not.toContainText(/Pilot execution.*pending|planned|مخطط|قيد الانتظار|Ahmed (?:personally )?signed|legal signatory|visits commenced|visits completed|laboratory (?:supplied|installed|commissioned)|seminar delivered|sessions delivered|students will be hired|guarantees employment|completed Pilot|revenue|training hours|وقّعت البروتوكول|تم توريد|(?:^|\s)تم تركيب|ضمان التوظيف|سيتم توظيف|إيرادات/i);
    await expect(block.locator("img, a[download], a[href$='.pdf']")).toHaveCount(0);
    await expect(block).not.toContainText(/2 trainees|two trainees|متدربين اثنين/);
    await expect(block.locator("[data-case-scope] li")).toHaveCount(6);
    await expect(block).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");
    expect(await block.evaluate(n => [...n.querySelectorAll("h1,h2,h3,h4,p,li,dd")].filter(e => e.getClientRects().length).every(e => {
      const r = e.getBoundingClientRect(); return r.left >= -0.5 && r.right <= document.documentElement.clientWidth + 0.5;
    }))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  });
}

test("public assets contain no protocol document, signature pages or raw legal images", async ({ request }) => {
  const files = await readdir("public", { recursive: true });
  expect(files.filter(name => /protocol|signature|stamp|signed|بروتوكول|توقيع|ختم/i.test(name))).toEqual([]);
  expect(files.filter(name => /\.pdf$/i.test(name))).toEqual(["Ahmed-Hassan-Sales-Business-Development-Resume.pdf"]);
  for (const path of ["/work/institute-protocol.pdf", "/work/institute-protocol-signatures.webp", "/work/institute-protocol-raw.jpg"]) expect((await request.get(path)).status()).toBe(404);
});

test("editable resume prioritizes signed protocol without planned delivery or visit achievements", async () => {
  const source = await readFile("resume/Ahmed-Hassan-Resume.html", "utf8");
  expect(source).toContain("Initiated and developed the relationship with the Higher Technological Institute of Beni Suef, leading direct communication and follow-up meetings through to a formally signed cooperation protocol for applied renewable-energy training and industry collaboration.");
  expect(source).not.toMatch(/solar-energy training laboratory|monthly technical sessions|field visits commenced|field visits completed|students will be hired|Ahmed personally signed/i);
  expect(source.match(/class="page page-/g)).toHaveLength(2);
});
