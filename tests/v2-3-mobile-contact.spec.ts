import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getDictionary } from "../content";
import { site } from "../data/site";

for (const locale of ["en", "ar"] as const) for (const width of [320, 375, 390, 430]) {
  test(`${locale} mobile contact hierarchy, targets and keyboard order at ${width}px`, async ({ page }) => {
    const d = getDictionary(locale);
    await page.setViewportSize({ width, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: width === 375 || width === 430 ? "dark" : "light" });
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    const contact = page.locator("#contact");
    const footer = page.locator(".site-footer");
    await expect(contact.locator("h2")).toHaveText(d.contact.heading);
    await expect(contact.locator(".contact-content > p")).toHaveText(d.contact.description);
    await expect(contact).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");
    await expect(footer).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");

    const actions = contact.locator(".contact-actions a");
    await expect(actions).toHaveCount(2);
    await expect(actions.first()).toHaveAccessibleName(d.contact.talk);
    await expect(actions.first()).toHaveClass(/button--primary/);
    await expect(actions.first()).toHaveAttribute("href", `mailto:${site.contact.email}`);
    await expect(actions.last()).toHaveAccessibleName(d.ui.resume);
    await expect(actions.last()).toHaveClass(/button--secondary/);
    await expect(actions.last()).toHaveAttribute("href", site.resumeUrl);
    await expect(actions.last()).toHaveAttribute("download", site.resumeFilename);
    const priority = contact.locator(".contact-method--priority");
    await expect(priority).toHaveCount(2);
    await expect(priority.nth(0)).toHaveAttribute("href", site.contact.whatsapp);
    await expect(priority.nth(0)).toContainText(d.contact.whatsappAction);
    await expect(priority.nth(1)).toHaveAttribute("href", `tel:${site.contact.phone}`);
    await expect(priority.nth(1)).toContainText(site.contact.phoneDisplay);
    const whatsappBox = (await priority.nth(0).boundingBox())!;
    const phoneBox = (await priority.nth(1).boundingBox())!;
    expect(Math.abs(whatsappBox.y - phoneBox.y)).toBeLessThan(1);
    expect(whatsappBox.x + whatsappBox.width <= phoneBox.x || phoneBox.x + phoneBox.width <= whatsappBox.x).toBe(true);

    const compact = contact.locator(".contact-method--compact");
    await expect(compact).toHaveCount(2);
    await expect(compact.nth(0)).toHaveAttribute("href", site.contact.linkedin);
    await expect(compact.nth(0)).toContainText(d.contact.linkedinValue);
    await expect(compact.nth(1)).toHaveAttribute("href", `mailto:${site.contact.email}`);
    await expect(compact.nth(1)).toContainText(site.contact.email);
    expect((await compact.first().boundingBox())!.height).toBeLessThan(whatsappBox.height);
    const alternate = contact.locator(".contact-method--alternate");
    await expect(alternate.locator(".contact-method__label")).toHaveText(d.contact.secondaryPhone);
    await expect(alternate.locator(".contact-phone")).toHaveAttribute("href", `tel:${site.contact.secondaryPhone}`);
    await expect(alternate.locator(".contact-phone")).toHaveText(site.contact.secondaryPhoneDisplay);
    await expect(alternate.locator(".contact-alternate-whatsapp")).toHaveAttribute("href", site.contact.secondaryWhatsapp);

    for (const isolated of await contact.locator(".contact-phone bdi, .contact-method--compact bdi").all()) {
      await expect(isolated).toHaveAttribute("dir", "ltr");
    }
    const contactLinks = await contact.locator("a").all();
    const footerLinks = await footer.locator("a").all();
    await expect(footer.locator(".footer-name")).toHaveText(d.name);
    await expect(footer.locator(".footer-row > div > p").last()).toHaveText(d.contact.role);
    await expect(footer.locator("small")).toContainText(`© ${new Date().getFullYear()} ${d.name}`);
    await expect(footerLinks[0]).toHaveAttribute("href", site.contact.linkedin);
    await expect(footerLinks[1]).toHaveAttribute("href", `mailto:${site.contact.email}`);

    for (const link of [...contactLinks, ...footerLinks]) {
      await expect(link).toBeVisible();
      const box = (await link.boundingBox())!;
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(24);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      const contained = await link.evaluate(element => {
        const parent = element.getBoundingClientRect();
        return [...element.querySelectorAll("strong, bdi")].every(child => {
          const range = document.createRange(); range.selectNodeContents(child);
          return [...range.getClientRects()].every(r => r.left >= parent.left - 1 && r.right <= parent.right + 1);
        });
      });
      expect(contained).toBe(true);
    }
    // Focus and tab through the real actions without opening destinations or sending messages.
    const order = [...contactLinks, ...footerLinks];
    await order[0].focus();
    for (const next of order.slice(1)) {
      await page.keyboard.press("Tab");
      await expect(next).toBeFocused();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    if (width === 375) {
      const axe = await new AxeBuilder({ page }).include("#contact").include(".site-footer")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(axe.violations).toEqual([]);
    }
  });
}
