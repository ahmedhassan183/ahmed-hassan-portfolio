import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(scriptDirectory, "Ahmed-Hassan-Resume.html");
const output = path.resolve(
  scriptDirectory,
  "../public/Ahmed-Hassan-Sales-Business-Development-Resume.pdf",
);

const browser = await chromium.launch({
  channel: process.platform === "win32" ? "msedge" : undefined,
  headless: true,
});

try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(input).href);
  await page.pdf({
    path: output,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(output);
} finally {
  await browser.close();
}
