import { expect, test } from "@playwright/test";
import { getDictionary } from "../content";
import { publicAssetExists } from "../lib/public-assets";
import { site } from "../data/site";
import { readFile } from "node:fs/promises";

const filename = "Ahmed-Hassan-Sales-Business-Development-Resume-V2.pdf";

for (const locale of ["en", "ar"] as const) for (const theme of ["light", "dark"] as const) for (const width of [375, 1440]) {
  test(`final contact and all resume placements: ${locale} ${theme} ${width}px`, async ({ page, request }) => {
    const d = getDictionary(locale);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const contact = page.locator("#contact");
    await expect(contact.getByRole("link", { name: d.contact.email, exact: true })).toHaveAttribute("href", "mailto:a7md07san@gmail.com");
    await expect(contact.getByRole("link", { name: d.contact.whatsapp, exact: true })).toHaveAttribute("href", "https://wa.me/201018797298");
    await expect(contact.getByRole("link", { name: `${d.contact.whatsapp} · ${d.contact.secondaryPhone}`, exact: true })).toHaveAttribute("href", "https://wa.me/201095638790");
    await expect(contact.getByRole("link", { name: new RegExp(d.contact.phone) })).toHaveAttribute("href", "tel:+201018797298");
    await expect(contact.getByRole("link", { name: new RegExp(`^${d.contact.secondaryPhone}`) })).toHaveAttribute("href", "tel:+201095638790");
    await expect(contact.locator(".contact-phone bdi")).toHaveText(["+20 101 879 7298", "+20 109 563 8790"]);
    for (const area of [contact, page.locator("footer")]) await expect(area.getByRole("link", { name: d.contact.linkedin, exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/ahmedhassan-growth");
    for (const link of await contact.locator('a[href^="https:"]').all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    await expect(page.locator('a[href*="wa.me/+"]')).toHaveCount(0);
    await expect(page.locator('a[href*="Ahmed_Hassan_Resume"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

    expect(publicAssetExists(site.resumeUrl), "The approved real resume is required").toBe(true);
    // Visit each actual placement and verify the downloaded bytes.
    for (const placement of ["navbar", "hero", "contact"] as const) {
      if (placement === "navbar" && width < 900) await page.getByRole("button", { name: d.nav.open }).click();
      const selector = placement === "navbar" ? (width < 900 ? ".mobile-nav" : ".desktop-resume") : placement === "hero" ? ".hero-actions" : ".contact-actions";
      const control = page.locator(`${selector} .resume-link`);
      if (publicAssetExists(site.resumeUrl)) {
        await expect(control).toHaveAttribute("href", `/${filename}`);
        await expect(control).toHaveAttribute("download", filename);
        const pending = page.waitForEvent("download");
        await control.click();
        const download = await pending;
        expect(download.suggestedFilename()).toBe(filename);
        expect(await download.failure()).toBeNull();
        const downloadedPath = await download.path();
        expect(downloadedPath).not.toBeNull();
        expect(await readFile(downloadedPath!)).toEqual(await readFile(`public/${filename}`));
      } else {
        await expect(control).toHaveAttribute("aria-disabled", "true");
        await expect(control).not.toHaveAttribute("href");
        await control.focus();
        await expect(page.locator(`${selector} .resume-tooltip`)).toHaveCSS("opacity", "1");
      }
      if (placement === "navbar" && width < 900) await page.keyboard.press("Escape");
    }
    if (publicAssetExists(site.resumeUrl)) {
      const pdf = await request.get(site.resumeUrl);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()["content-type"]).toContain("application/pdf");
      expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
      expect(await pdf.body()).toEqual(await readFile(`public/${filename}`));
    }
    expect(errors).toEqual([]);
  });
}
