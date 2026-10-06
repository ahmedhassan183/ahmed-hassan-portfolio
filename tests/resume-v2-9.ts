import { expect } from "@playwright/test";
import { createHash } from "node:crypto";

// Only these literal, authorized additions may be removed for older source locks.
const portfolioAddition = ' <span aria-hidden="true">|</span>\n            <a href="https://ahmed-hassan-portfolio-jj53.vercel.app/">Portfolio</a>';
const developmentAddition = `        <section class="professional-development" aria-labelledby="development-heading">
          <h2 id="development-heading">Professional Development &amp; Certifications</h2>
          <div class="development-item">
            <h3>Diploma in Business Administration &amp; Corporate Management</h3>
            <p>Alison | 2026 | 120+ Study Hours | Final Score: 91%</p>
          </div>
          <div class="development-item">
            <h3>Egypt Entrepreneurship &amp; Innovation Center (EEIC)</h3>
            <ul>
              <li>- Managing Growth Stages &amp; Company Development - Hassan Mensi</li>
              <li>- Sales Management for Startups - Khaled Said</li>
              <li>- Business Development in Startups - Tamer El Adly</li>
              <li>- Building a Business Model - Mohamed Gouda</li>
              <li>- Strategic Planning - Fady Ismail</li>
            </ul>
          </div>
        </section>

`;
const developmentStyles = `
/* Keep the added development evidence secondary and within the two-page layout. */
.page-two section { margin-top: 4mm; }
.page-two .system { margin-top: 2.5mm; }
.page-two .education-item + .education-item { margin-top: 2mm; }
.page-two .compact-section { margin-top: 3mm; }
.development-item { margin-top: 1.5mm; }
.development-item h3 { color: #1a3447; font-size: 9.5pt; line-height: 1.32; }
.development-item p { margin-top: .5mm; }
.development-item ul { margin-top: 1mm; }
.development-item li + li { margin-top: .25mm; }
`;

export function beforeResumeV29(path: string, text: string) {
  const source = text.replaceAll("\r\n", "\n");
  if (path === "resume/Ahmed-Hassan-Resume.html") {
    expect(source.split(portfolioAddition)).toHaveLength(2);
    expect(source.split(developmentAddition)).toHaveLength(2);
    return source.replace(portfolioAddition, "").replace(developmentAddition, "");
  }
  if (path === "resume/resume.css") {
    expect(source.split(developmentStyles)).toHaveLength(2);
    return source.replace(developmentStyles, "");
  }
  return source;
}

export function expectResumeV29Pdf(bytes: Buffer) {
  // Lock the visually reviewed, two-page V2.9 output rather than the superseded PDF.
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("24fcc2a810e27a3a9b6cb6ed73d6d7cb8ab6ff59eccda3f1849ba185aa5f3539");
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  for (const link of ["https://ahmed-hassan-portfolio-jj53.vercel.app/", "https://www.linkedin.com/in/ahmedhassan-growth", "mailto:a7md07san@gmail.com", "tel:+201018797298"]) {
    expect(bytes.toString("latin1")).toContain(`/URI (${link})`);
  }
}
