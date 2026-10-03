import { expect, test, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { en } from "../content/en";
import { ar } from "../content/ar";

async function expectSingleLine(locator: Locator) {
  const lines = await locator.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top))).size;
  });
  expect(lines).toBe(1);
}

for (const locale of ["en", "ar"] as const) {
  for (const width of [320, 375, 390, 430]) {
    test(`${locale} case headers, media and metric units stay contained at ${width}px`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      await page.setViewportSize({ width, height: 812 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      const cases = page.locator("#systems .system-entry");
      await expect(cases).toHaveCount(3);
      await expect(page.locator("#systems .system-number")).toHaveText(["01", "02", "03"]);

      for (const entry of await cases.all()) {
        await expect(entry).toHaveAttribute("open", "");
        const number = entry.locator(".system-number");
        await expectSingleLine(number.locator("bdi"));
        await expect(number).toHaveCSS("white-space", "nowrap");
        await expect(number.locator("bdi")).toHaveAttribute("dir", "ltr");
        await expect(entry.locator("h3")).toHaveCSS("direction", locale === "ar" ? "rtl" : "ltr");
        const bounds = await entry.evaluate((element) => {
          const header = element.querySelector(".system-summary")!.getBoundingClientRect();
          const index = element.querySelector(".system-number")!.getBoundingClientRect();
          const title = element.querySelector(".system-title")!.getBoundingClientRect();
          return { headerLeft: header.left, headerRight: header.right, headerHeight: header.height,
            indexWidth: index.width, titleWidth: title.width,
            separated: index.right <= title.left || title.right <= index.left,
            titleContained: title.left >= header.left && title.right <= header.right };
        });
        expect(bounds.headerLeft).toBeGreaterThanOrEqual(0);
        expect(bounds.headerRight).toBeLessThanOrEqual(width);
        expect(bounds.headerHeight).toBeGreaterThanOrEqual(44);
        expect(bounds.indexWidth).toBeGreaterThan(20);
        expect(bounds.titleWidth).toBeGreaterThan(width * .45);
        expect(bounds.separated).toBe(true);
        expect(bounds.titleContained).toBe(true);

        const media = entry.locator(".work-preview-media:visible");
        await media.scrollIntoViewIfNeeded();
        const image = media.locator("img");
        await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
        await expect(image).toHaveAttribute("src", /\/_next\/image\?/);
        await expect(image).toHaveAttribute("alt", /\S/);
        await expect(image).toHaveCSS("object-fit", "contain");
        await expect(image).toHaveCSS("transform", "none");
        const frame = await media.boundingBox();
        expect(frame!.height).toBeGreaterThan(120);
        expect(frame!.height).toBeLessThanOrEqual(240);
        expect(frame!.height / frame!.width).toBeLessThan(.6);
        const inspect = entry.locator(".artifact-inspect:visible");
        expect((await inspect.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }

      for (const metric of await page.locator(".commercial-proof li, #systems .flagship-proof li").all()) {
        await expect(metric.locator("strong")).toBeVisible();
        await expect(metric.locator("span")).toBeVisible();
        await expectSingleLine(metric.locator("strong"));
        const unit = await metric.evaluate((element) => {
          const parent = element.getBoundingClientRect();
          return { width: element.clientWidth, scrollWidth: element.scrollWidth,
            contained: [...element.children].every(child => {
              const r = child.getBoundingClientRect();
              return r.left >= parent.left - 1 && r.right <= parent.right + 1 && r.bottom <= parent.bottom + 1;
            }) };
        });
        expect(unit.scrollWidth).toBeLessThanOrEqual(unit.width);
        expect(unit.contained).toBe(true);
      }

      const supportingNumbers = page.locator("#supporting .supporting-number");
      await expect(supportingNumbers).toHaveText(["01", "02", "03"]);
      for (const number of await supportingNumbers.all()) {
        await expectSingleLine(number.locator("bdi"));
        await expect(number).toHaveCSS("white-space", "nowrap");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
      expect(errors).toEqual([]);
      if (width === 375) {
        const axe = await new AxeBuilder({ page }).include("#systems").include("#supporting").include(".commercial-proof")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(axe.violations).toEqual([]);
      }
    });
  }

  test(`${locale} mobile cases preserve all approved commercial facts and status`, async ({ page }) => {
    const d = locale === "ar" ? ar : en;
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/${locale}`);
    const cases = page.locator("#systems .system-entry");
    await expect(cases).toHaveCount(3);
    for (let i = 0; i < d.work.projects.length; i++) {
      const entry = cases.nth(i);
      const project = d.work.projects[i];
      await expect(entry.locator(".system-title")).toHaveText(project.title);
      await expect(entry.locator(".system-description")).toHaveText(project.description);
      await expect(entry.locator(".system-fields dd")).toHaveText([
        project.problem, project.role, project.built, project.adoption, project.purpose,
      ]);
    }
    const process = cases.first().locator(".market-evidence > div").first();
    const commercial = cases.first().locator(".market-evidence > div").last();
    await expect(process.locator("p")).toHaveText(d.work.marketProof.process);
    await expect(process).toContainText("47");
    await expect(process).toContainText("20");
    await expect(process).toContainText(/CRM/);
    await expect(process).toContainText(/daily|يومي/);
    await expect(commercial.locator("p")).toHaveText([
      d.work.marketProof.role, d.work.marketProof.model, d.work.marketProof.sales,
      d.work.marketProof.senour, d.work.marketProof.fayoum,
    ]);
    await expect(cases.nth(1).locator(".flagship-proof strong")).toHaveText(d.work.proof.map(p => p.value));
    await expect(cases.nth(1).locator(".flagship-proof span")).toHaveText(d.work.proof.map(p => p.label));
    await expect(cases.last().locator(".maintenance-tiers li")).toHaveText(d.work.tiers);
    await expect(page.locator(".commercial-proof strong")).toHaveText(d.hero.proof.map(p => p.value));
    await expect(page.locator(".commercial-proof span")).toHaveText(d.hero.proof.map(p => p.label));
  });
}
