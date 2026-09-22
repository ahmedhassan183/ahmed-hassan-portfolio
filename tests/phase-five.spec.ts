import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getDictionary } from "../content";
import { site } from "../data/site";
import { publicAssetExists } from "../lib/public-assets";
import { absoluteUrl, isPreview } from "../lib/seo";

for (const locale of ["en", "ar"] as const) {
  test(`${locale} contact, approved links, footer and consistent resume behavior`, async ({ page }) => {
    const d = getDictionary(locale);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    await page.locator(".talk-link").click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact-heading")).toHaveText(d.contact.heading);
    await expect(page.locator(".contact-content > p")).toHaveText(d.contact.description);
    const contact = page.locator("#contact");
    await expect(contact.getByRole("link", { name: d.contact.talk, exact: true })).toHaveAttribute("href", site.contact.email ? `mailto:${site.contact.email}` : site.contact.linkedin);
    for (const area of [contact, page.locator("footer")]) {
      const linkedin = area.locator(`a[href="${site.contact.linkedin}"]`);
      await expect(linkedin).toContainText(d.contact.linkedin);
      await expect(linkedin).toHaveAttribute("href", site.contact.linkedin);
      await expect(linkedin).toHaveAttribute("target", "_blank");
      await expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
      if (site.contact.email) for (const emailLink of await area.locator('a[href^="mailto:"]').all()) await expect(emailLink).toHaveAttribute("href", `mailto:${site.contact.email}`);
      else await expect(area.locator('a[href^="mailto:"]')).toHaveCount(0);
    }
    if (site.contact.phone) {
      const primaryWhatsapp = contact.locator(`a[href="${site.contact.whatsapp}"]`);
      await expect(primaryWhatsapp).toContainText(d.contact.whatsapp);
      await expect(primaryWhatsapp).toContainText(d.contact.whatsappAction);
      await expect(contact.locator(`a[href="tel:${site.contact.phone}"]`)).toContainText(d.contact.phone);
      const alternate = contact.locator(".contact-method--alternate");
      await expect(alternate).toContainText(d.contact.secondaryPhone);
      await expect(alternate.locator(`a[href="tel:${site.contact.secondaryPhone}"]`)).toContainText(site.contact.secondaryPhoneDisplay);
    } else await expect(contact.locator('a[href^="tel:"], a[href^="https://wa.me/"]')).toHaveCount(0);
    await expect(page.locator("footer")).toContainText(d.name);
    await expect(page.locator("footer")).toContainText(d.contact.role);
    await expect(page.locator("footer small")).toContainText(String(new Date().getFullYear()));
    const controls = page.locator(".resume-link");
    await expect(controls).toHaveCount(4); // desktop/mobile navbar, hero and contact
    for (const control of await controls.all()) {
      if (publicAssetExists(site.resumeUrl)) {
        await expect(control).toHaveAttribute("href", site.resumeUrl);
        await expect(control).toHaveAttribute("download", site.resumeFilename);
      } else {
        await expect(control).toHaveAttribute("aria-disabled", "true");
        await expect(control).not.toHaveAttribute("href");
      }
    }
    if (publicAssetExists(site.resumeUrl)) {
      const download = page.waitForEvent("download");
      await contact.getByRole("link", { name: d.ui.resume }).click();
      expect((await download).suggestedFilename()).toBe(site.resumeFilename);
    } else {
      await contact.getByRole("button", { name: d.ui.resumeUnavailable }).focus();
      await expect(contact.getByRole("tooltip")).toHaveCSS("opacity", "1");
    }
  });

  test(`${locale} final SEO, sharing and verified Person structured data`, async ({ page, request }) => {
    await page.goto(`/${locale}`);
    const d = getDictionary(locale);
    await expect(page).toHaveTitle(d.meta.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl(`/${locale}`));
    for (const language of ["en", "ar", "x-default"]) await expect(page.locator(`link[hreflang="${language}"]`)).toHaveAttribute("href", absoluteUrl(`/${language === "x-default" ? "en" : language}`));
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const ogUrl = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(new URL(ogUrl!).origin).toBe(new URL(absoluteUrl("/")).origin);
    const image = await request.get(new URL(ogUrl!).pathname + new URL(ogUrl!).search);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    const png = await image.body();
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    const json = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
    expect(json).toMatchObject({ "@type": "Person", name: site.name, jobTitle: "Growth Manager", url: absoluteUrl(`/${locale}`), sameAs: [site.contact.linkedin], worksFor: { name: "Innovation for Solar System" } });
    expect(json).not.toHaveProperty("address");
    expect(json).not.toHaveProperty("alumniOf");
    expect(json).not.toHaveProperty("award");
    expect(json.email).toBe("a7md07san@gmail.com");
    expect(json.telephone).toBe("+201018797298");
    expect(JSON.stringify(json)).not.toContain("201095638790");
  });

  for (const theme of ["light", "dark"] as const) {
    test(`${locale} ${theme} branded 404 returns a real 404 and accessible recovery`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      const response = await page.goto(`/${locale}/missing-page`);
      expect(response?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(page.locator('meta[name="robots"][content*="noindex"]')).not.toHaveCount(0);
      await expect(page.locator(".not-found h1")).toHaveText(locale === "ar" ? "هذه الصفحة غير موجودة." : "This page couldn’t be found.");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
      expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      await page.locator("main a").click();
      await expect(page).toHaveURL(new RegExp(`/${locale}$`));
    });
  }
}

test("sitemap and robots expose only intended routes and canonical origin", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(2);
  for (const locale of ["en", "ar"]) expect(xml).toContain(`<loc>${absoluteUrl(`/${locale}`)}</loc>`);
  expect(xml).not.toMatch(/test-results|artifacts|localhost/);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${absoluteUrl("/sitemap.xml")}`);
  expect(await robots.text()).toContain(isPreview ? "Disallow: /" : "Allow: /");
});

test("global invalid locale has branded recovery, noindex and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto("/fr/unknown");
  expect(response?.status()).toBe(404);
  await expect(page.locator("main")).toContainText("404");
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).not.toHaveCount(0);
  await expect(page.locator('main a[href="/en"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test("localized 404 remains readable and recoverable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark", viewport: { width: 320, height: 812 } });
  const page = await context.newPage();
  for (const locale of ["en", "ar"]) {
    expect((await page.goto(`/${locale}/missing`))?.status()).toBe(404);
    await expect(page.locator(".not-found h1")).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(13, 21, 36)");
    await expect(page.locator("main a")).toHaveAttribute("href", `/${locale}`);
  }
  await context.close();
});

test("404 recovery honors a saved theme that differs from the operating system", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("portfolio-theme", "dark"));
  for (const path of ["/en/missing", "/ar/missing", "/unsupported"]) {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("main h1")).toBeVisible();
  }
});
