import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { beforeResumeV29, expectResumeV29Pdf } from "./resume-v2-9";

test("V2.9 resume adds only the approved portfolio and development evidence", () => {
  for (const path of ["resume/Ahmed-Hassan-Resume.html", "resume/resume.css", "resume/generate.mjs"]) {
    const baseline = execFileSync("git", ["show", `cc836782f07ea05a9d4789b784915fc644d66e9d:${path}`], { encoding: "utf8" });
    expect(beforeResumeV29(path, readFileSync(path, "utf8"))).toBe(baseline.replaceAll("\r\n", "\n"));
  }
  expectResumeV29Pdf(readFileSync("public/Ahmed-Hassan-Sales-Business-Development-Resume.pdf"));
});

test("V2.9 print layout keeps two A4 pages, readable text and five exact EEIC courses", async ({ page }) => {
  await page.goto(pathToFileURL(process.cwd() + "/resume/Ahmed-Hassan-Resume.html").href);
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".page")).toHaveCount(2);
  await expect(page.locator(".contact a").last()).toHaveText("Portfolio");
  await expect(page.locator(".contact a").last()).toHaveAttribute("href", "https://ahmed-hassan-portfolio-jj53.vercel.app/");
  await expect(page.locator(".professional-development")).toHaveAttribute("aria-labelledby", "development-heading");
  await expect(page.locator(".professional-development .development-item p")).toHaveText("Alison | 2026 | 120+ Study Hours | Final Score: 91%");
  await expect(page.locator(".professional-development li")).toHaveText([
    "- Managing Growth Stages & Company Development - Hassan Mensi",
    "- Sales Management for Startups - Khaled Said",
    "- Business Development in Startups - Tamer El Adly",
    "- Building a Business Model - Mohamed Gouda",
    "- Strategic Planning - Fady Ismail",
  ]);
  expect(await page.locator(".page-two section h2").allTextContents()).toEqual(["Sales Enablement & Training", "Institutional Partnership Development", "Selected Commercial Systems", "Education", "Professional Development & Certifications", "Tools", "Languages"]);
  for (const article of await page.locator(".page").all()) {
    expect(await article.evaluate(element => {
      const box = element.getBoundingClientRect(), footer = element.querySelector("footer")!.getBoundingClientRect();
      const text = [...element.querySelectorAll("p,h1,h2,h3,li")].filter(e => !e.closest("footer"));
      return Math.abs(box.width - 210 * 96 / 25.4) < 1 && Math.abs(box.height - 297 * 96 / 25.4) < 1
        && element.scrollHeight <= element.clientHeight
        && text.every(e => {
          const bounds = e.getBoundingClientRect(), range = document.createRange(); range.selectNodeContents(e);
          return bounds.bottom <= footer.top - 8 && [...range.getClientRects()].every(r => r.left >= box.left && r.right <= box.right && r.bottom <= footer.top - 8);
        });
    }), "A4 content must fit without clipping or footer overlap").toBe(true);
  }
  await expect(page.locator(".page-one section > p").first()).toHaveCSS("font-size", "12.6667px");
  await expect(page.locator(".development-item li").first()).toHaveCSS("font-size", "12.6667px");
});
