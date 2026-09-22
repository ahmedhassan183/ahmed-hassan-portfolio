import { expect, test } from "@playwright/test";
import { getDictionary } from "../content";
import { site } from "../data/site";

for (const locale of ["en", "ar"] as const) {
  test(`${locale} V2.2 contact hierarchy and partnership ownership`, async ({ page }) => {
    const d = getDictionary(locale);
    await page.goto(`/${locale}`);

    const contact = page.locator("#contact");
    await expect(contact.locator("#contact-heading")).toHaveText(d.contact.heading);
    await expect(contact.locator(".contact-content > p")).toHaveText(d.contact.description);

    const primaryCta = contact.getByRole("link", { name: d.contact.talk, exact: true });
    await expect(primaryCta).toHaveClass(/\bbutton--primary\b/);
    await expect(primaryCta).toHaveAttribute("href", `mailto:${site.contact.email}`);
    await expect(contact.locator(".contact-actions .resume-link")).toHaveClass(/\bbutton--secondary\b/);

    const priorityMethods = contact.locator(".contact-method--priority");
    await expect(priorityMethods).toHaveCount(2);
    await expect(priorityMethods.nth(0)).toHaveAttribute("href", site.contact.whatsapp);
    await expect(priorityMethods.nth(0)).toContainText(d.contact.whatsappAction);
    await expect(priorityMethods.nth(1)).toHaveAttribute("href", `tel:${site.contact.phone}`);
    await expect(priorityMethods.nth(1)).toContainText(site.contact.phoneDisplay);
    await expect(contact.locator(".contact-method--compact")).toHaveCount(2);
    await expect(contact.locator(`a[href="${site.contact.linkedin}"]`)).toContainText(d.contact.linkedinValue);
    await expect(contact.locator(`a[href="mailto:${site.contact.email}"]`)).toHaveCount(2);
    await expect(contact.locator(`a[href="tel:${site.contact.secondaryPhone}"]`)).toContainText(site.contact.secondaryPhoneDisplay);
    await expect(contact.locator(`a[href="${site.contact.secondaryWhatsapp}"]`)).toContainText(d.contact.whatsapp);
    expect(await contact.locator(".contact-lead").evaluate(node => node.nextElementSibling?.classList.contains("contact-methods"))).toBe(true);

    const partnership = page.locator("#experience .partnership-evidence");
    await expect(partnership.locator("h3")).toHaveText(d.experience.partnership.heading);
    await expect(partnership).toContainText(d.experience.partnership.context);
    await expect(partnership).toContainText(d.experience.partnership.developed);
    await expect(partnership).toContainText(d.experience.partnership.outcome);
    await expect(partnership).toContainText(d.experience.partnership.status);
    expect(await page.locator("#experience .training-note").evaluate(node => node.nextElementSibling?.classList.contains("partnership-evidence"))).toBe(true);
    await expect(partnership).not.toContainText(locale === "en" ? /completed pilot|revenue|student outcomes|engineering results/i : /برنامج تجريبي مكتمل|إيرادات|نتائج الطلاب|نتائج هندسية/);
  });

  test(`${locale} V2.2 contact and partnership remain readable at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: locale === "en" ? "light" : "dark" });
    await page.goto(`/${locale}`);

    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    await expect(page.locator("#contact .contact-method--priority")).toHaveCount(2);
    await expect(page.locator("#contact .contact-method--alternate")).toBeVisible();
    await expect(page.locator("#experience .partnership-evidence")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    for (const evidence of [page.locator("#experience .enablement-steps"), page.locator("#experience .partnership-facts")]) {
      const box = await evidence.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(300);
    }
    for (const phone of await page.locator("#contact .contact-phone").all()) {
      const box = await phone.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(375);
    }
  });
}
