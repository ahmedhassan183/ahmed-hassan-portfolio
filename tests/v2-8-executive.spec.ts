import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getDictionary } from "../content";
import { caseSlugs, casePath } from "../content/cases";
import { getSahara } from "../content/sahara";
import { getGrowthCase } from "../content/growth";
import { absoluteUrl } from "../lib/seo";

for (const locale of ["en", "ar"] as const) for (const width of [320, 375, 768, 1024, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`V2.8 home ${locale} ${width} ${theme}: summaries, evidence and compact hierarchy`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.emulateMedia({ reducedMotion: "reduce", colorScheme: theme });
    const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    const d = getDictionary(locale), growth = getGrowthCase(locale);
    expect((await page.goto(`/${locale}`))?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale); await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator(".case-summary-card")).toHaveCount(3);
    await expect(page.locator("#systems .system-fields, #systems .engineering-workflow")).toHaveCount(0);
    await expect(page.locator(".case-summary-copy h3")).toHaveText(d.work.projects.map(p => p.title));
    for (const slug of caseSlugs) {
      const card = page.locator(`[data-case-summary="${slug}"]`);
      await expect(card.locator(".button")).toHaveAttribute("href", `/${locale}${casePath(slug)}`);
      expect((await card.locator(".button").boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await expect(page.locator(".commercial-proof strong")).toHaveText(["18", "120+", locale === "ar" ? "7 محطات" : "7 stations", "320 kW"]);
    if (width <= 600) for (const item of await page.locator(".commercial-proof li").all()) {
      await expect(item).toHaveCSS("display", "flex");
      await expect(item).toHaveCSS("flex-direction", "column");
    }
    await expect(page.locator(".enablement-process li")).toHaveText(locale === "ar" ? ["تدريب", "تقييم", "اختيار", "توظيف"] : ["TRAIN", "ASSESS", "SELECT", "HIRE"]);
    await expect(page.locator(".enablement-outcome")).toHaveText(d.experience.training.outcome);
    await expect(page.locator(".partnership-evidence")).toContainText("10");
    await expect(page.locator(".partnership-evidence")).toContainText(locale === "ar" ? "5 أكتوبر 2026" : "5 Oct 2026");
    await expect(page.locator(".partnership-evidence")).not.toContainText(locale === "ar" ? /تعيين|توظيف/ : /hired|trainees/i);
    await expect(page.locator("#growth-feature .metric-rail dt")).toHaveText([growth.scale[1].label, growth.scale[0].label, growth.scale[2].label, growth.scale[3].label]);
    await expect(page.locator("#growth-feature .feature-status strong")).toHaveText([growth.statuses[2].value, growth.statuses[3].value]);
    await expect(page.locator("#growth-feature .compact-process li")).toHaveText(growth.commercial);
    await expect(page.locator(".supporting-entry")).toHaveCount(4);
    const columns = await page.locator(".supporting-list").evaluate(e => getComputedStyle(e).gridTemplateColumns.split(" ").length);
    expect(columns).toBe(width <= 600 ? 1 : 2);
    for (const image of await page.locator("main img").all()) { await image.scrollIntoViewIfNeeded(); await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true); }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    expect(errors).toEqual([]);
  });
}
for (const locale of ["en", "ar"] as const) for (const slug of caseSlugs) for (const width of [375, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`V2.8 ${locale} ${slug} ${width} ${theme}: navigation, full approved detail and SEO`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.emulateMedia({ reducedMotion: "reduce", colorScheme: theme });
    const d = getDictionary(locale), p = d.work.projects.find(project => project.id === slug)!;
    await page.goto(`/${locale}`); await page.locator(`[data-case-summary="${slug}"] .button`).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}${casePath(slug)}$`));
    await expect(page.locator("main h1")).toHaveText(p.title);
    await expect(page.locator("main h1")).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator(".system-fields dd")).toHaveText([p.problem, p.role, p.built, p.adoption, p.purpose]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl(`/${locale}${casePath(slug)}`));
    for (const lang of ["en", "ar"]) await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute("href", absoluteUrl(`/${lang}${casePath(slug)}`));
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}"); expect(schema.inLanguage).toBe(locale); expect(schema.name).toBe(p.title);
    if (slug === caseSlugs[0]) await expect(page.locator(".market-evidence")).toContainText(d.work.marketProof.senour);
    if (slug === caseSlugs[1]) { await expect(page.locator(".flagship-proof strong")).toHaveText(d.work.proof.map(m => m.value)); await expect(page.locator(".flagship-intent")).toHaveText(d.work.intent); }
    if (slug === caseSlugs[2]) await expect(page.locator(".maintenance-tiers li")).toHaveText(d.work.tiers);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect((await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  });
}
for (const locale of ["en", "ar"] as const) {
  test(`V2.8 ${locale} Sahara verified companies, field execution and claim safety`, async ({ page }) => {
    const c = getSahara(locale), d = getDictionary(locale);
    await page.goto(`/${locale}`);
    const card = page.locator('[data-supporting-id="sahara-2026"]');
    await expect(card.locator("h3")).toHaveText(d.work.supporting.items[2].title);
    await expect(card.locator(".supporting-status")).toHaveText(d.work.supporting.items[2].status);
    await card.locator("summary").focus(); await page.keyboard.press("Enter");
    await expect(card.locator("details")).toHaveAttribute("open", "");
    await expect(card.locator(".sahara-journey strong")).toHaveText(c.stages.map(s => s.label));
    await expect(card.locator(".sahara-journey p")).toHaveText(c.stages.map(s => s.detail));
    await expect(card.locator(".sahara-companies dt")).toHaveText(c.companies.map(company => company.name));
    await expect(card.locator(".sahara-companies dd")).toHaveText(c.companies.map(company => company.context));
    await expect(card.locator(".proof-chips li")).toHaveText(c.chips);
    await expect(card).toContainText(c.safety);
    const text = await card.innerText();
    expect(text).not.toMatch(/25\s*[–-]\s*30|8\s*[–-]\s*10|10\s*[–-]\s*12|6\s*[–-]\s*8|4\s*[–-]\s*6|\d+\s+(?:deals|contracts|RFQs|qualified leads|meetings achieved)/i);
    expect(text).not.toMatch(/إيرادات محققة|صفقات مغلقة|شراكات موقعة|قيمة مسار المبيعات/);
  });
}
