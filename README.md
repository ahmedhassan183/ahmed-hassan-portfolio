# Ahmed Hassan — Portfolio, Phase 5

Next.js App Router, TypeScript, Tailwind CSS and self-hosted Inter and IBM Plex Sans Arabic via next/font/local. The approved Hero, seven-stage sales animation, design system and SELL / BUILD / LEAD & TRAIN content remain intact.

## Run and validate

Node.js 20.9 or newer is required.

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The browser suite starts a production server on port 3001. Windows uses installed Microsoft Edge; other platforms use Playwright Chromium (`npx playwright install chromium`). Override with PLAYWRIGHT_CHANNEL if needed. Test screenshots and failure traces are written to ignored test-results/.

The browser checks cover 320, 375, 768, 1024 and 1440px, navigation, keyboard access, native project disclosures, console errors, overflow, reduced motion, finite animations, JavaScript-disabled operation, WCAG A/AA accessibility, flagship proof and workflow, the experience timeline and all real assets. Real portrait decoding is mandatory. Additional checks cover keyboard tab switching, full-size inspection, dialog focus restoration, zoom/panning, image decoding at every viewport, and direct asset access without JavaScript.

## Languages, direction and themes

- /en and /ar render the same sections from typed dictionaries in content/en.ts and content/ar.ts. Approved English data is reused from data/, and Arabic carries the same facts and metrics.
- Both locale pages are statically generated. The root redirects to English on first visit, or the language explicitly saved in the portfolio-locale cookie. Explicit locale URLs always take precedence.
- The locale root layout sets the document lang and dir attributes on the server. Arabic uses logical spacing and appropriate directional arrows; real images are never flipped.
- The Navbar offers Light, Dark and System plus EN/AR on desktop and in the mobile menu. Theme preference is saved in localStorage. System preference tracks live OS changes.
- A small validated inline script applies the theme before the body appears. CSS also follows system dark mode without JavaScript. Storage failures do not prevent theme selection or navigation.
- Language switching preserves the current hash, theme, collapsed projects and selected gallery tab. Native document navigation ensures the new root language/direction and pre-paint theme are applied together.
- Fonts are locally served. Inter retains the approved English typography; the Arabic font is IBM Plex Sans Arabic (400, 500, 600, 700). No visitor requests to a font CDN are required.

Locale metadata includes title, description, Open Graph, Twitter, canonical and en/ar/x-default language alternates. Set NEXT_PUBLIC_SITE_URL to the verified site origin before a future deployment; the development default is http://127.0.0.1:3000. Final SEO also includes verified Person structured data, a 1200 × 630 branded social image at /opengraph-image, sitemap.xml and robots.txt. The final canonical domain must still be supplied before deployment.

Phase 4 browser coverage adds the full 2-language × 2-theme × 5-width matrix, Arabic font loading, screenshot orientation, theme persistence and OS updates, first-body theme, cross-tab sync, RTL keyboard tabs, localized content/metadata, language state retention and JavaScript-disabled system colors. Existing image, motion, navigation and accessibility checks remain active.

## Homepage

Hero → Sales Authority → Built, Not Just Learned → Experience / Sales Journey → Contact → Footer.

The four selected projects are B2B Market Intelligence & Account Development; the flagship Solar PV Engineering, Costing & Quotation System; 90-Day Sales Execution Operating System; and Maintenance Revenue Product. Existing native disclosures remain independently collapsible and start open. Editorial preview/text alignment alternates on desktop and consistently puts visuals first on mobile. The flagship adds static supplied system proof points, grouped capabilities, a connected workflow and two secondary proof visuals in an accessible tabbed gallery. No animated counters are used. Phase 2B adds Ahmed-approved commercial results in a separate Hero proof strip and association case context; system counts are not presented as sales outcomes.

The five-step journey connects hands-on selling, coordination and branch management at Kahla Optical to Growth Manager at Innovation for Solar System. Solar Sales Instructor is explicitly a supporting responsibility within that role. A small current Business Development item describes the pre-event Sahara 2026 system without presenting target KPIs as achieved results. A concise solar-domain strip closes the section. The closing Contact section uses the approved Sales & Business Development positioning in both languages.

## Assets

All seven supplied, sanitized images are integrated at their requested paths and rendered through Next.js Image optimization. The original source files remain in the root images/ and work/ folders. No image contents, captions, metrics or project claims were invented.

| Asset | Exact location |
| --- | --- |
| Prepared portrait | public/images/ahmed-hassan-hero.png |
| B2B workbook | public/work/crm-market-system.webp |
| Solar PV system | public/work/solar-pv-engineering-system.webp |
| Solar PV dashboard | public/work/solar-pv-dashboard.webp |
| Solar PV quotation | public/work/solar-pv-quotation.webp |
| 90-Day operating manual | public/work/90-day-sales-system.webp |
| Maintenance product | public/work/maintenance-product.webp |

Place prepared, sanitized images at these paths and rebuild. No availability flags need updating. lib/public-assets.ts checks files during server rendering; AssetImage uses Next.js optimization and handles loading failures. See public/images/README.md and public/work/README.md. Never put confidential originals in public/: every file there is publicly accessible. Exclude names, phone numbers, prices, internal costs, margins, private company information and identifying metadata from published screenshots.

Flagship worksheet/formula/table/chart counts and capabilities are supplied by Ahmed's Phase 3 brief. The supplied visuals are shown as provided; the workbook itself was not independently audited. The portfolio makes no time-saving, revenue or conversion claims.

The supplied two-page resume is integrated at public/Ahmed-Hassan-Sales-Business-Development-Resume.pdf. Every navbar, hero and contact download uses this single file and the same professional download filename. Its content is unchanged from the supplied Master CV.

## Structure and behavior

- data/site.ts, data/sales.ts, data/experience.ts: identity, content and artifact paths.
- components/sections/: server-rendered page sections.
- components/visuals/: portrait, sales flow, reusable image and work-preview frames.
- components/ui/RevealGroup.tsx: progressive enhancement using IntersectionObserver. Content stays visible without JavaScript, and entry animations run once.
- app/globals.css: approved tokens and responsive section styles.

Native project disclosures remain usable without JavaScript. Gallery tabs provide direct image links as a no-JavaScript fallback. A native modal dialog offers full-image or 1600px inspection, with keyboard-accessible scrolling and Escape/Close focus restoration. Mobile document previews focus on the central document area; the inspector preserves the entire asset at a readable scale. The portrait keeps the approved 4:3 composition with a 50% 16% focal position. Reduced motion disables animations and transitions, including the flagship's short engineering → costing → quotation → financial review sequence. No animation dependency was added.

ESLint stays pinned to 9.39.5 because the current Next.js React, import and accessibility plugins declare ESLint 9 compatibility. npm reports its upstream deprecation; upgrade to ESLint 10 when compatible plugin releases are available. Dependencies are pinned and locked.

The app is prepared for Vercel's Next.js preset. Production requires NEXT_PUBLIC_SITE_URL to contain the approved HTTPS origin. No deployment was made. See DEPLOYMENT.md for the exact checklist and remaining owner inputs.


## Phase 5 completion

- Contact and footer are server-rendered, localized and use the existing light/dark tokens. The verified LinkedIn URL is https://www.linkedin.com/in/ahmedhassan-growth. Email a7md07san@gmail.com, primary mobile/WhatsApp +201018797298 and secondary mobile/WhatsApp +201095638790 are approved and configured. Let’s Talk opens email; the main WhatsApp link uses the primary number. Numbers use spaced displays and bidirectional isolation. JSON-LD includes the email and only the primary telephone.
- Final bilingual titles, descriptions, canonical/hreflang, Open Graph, Twitter large-image metadata, Person JSON-LD, sitemap and robots share one canonical-origin helper. Structured data uses Growth Manager as the official role and includes only approved facts; no location, education or results were invented.
- The social image is generated at build time using next/og. No external font/image services or new production dependencies were added.
- Localized not-found pages and global recovery handle missing routes with real 404 status and noindex, including unsupported locales. Native recovery links load the correct locale root. Error-boundary recovery also restores saved theme preferences.
- Navbar receives only its own translated content. ResumeLink no longer imports the full English dictionary into the client bundle. Existing server sections, local optimized fonts, responsive Next.js images, lazy project visuals and finite CSS animation remain in place.
- Final test coverage includes contact links/fallbacks, all resume controls, footer, social PNG decoding, Person JSON-LD, sitemap/robots, no-JavaScript 404 and saved-theme recovery in addition to all previous tests. If the real PDF is supplied, the same suite tests the actual download event and filename.
- Local performance observations can be repeated with a production server running on port 3001 using `node scripts/measure-performance.mjs`. Results are stored in artifacts/phase-5/performance.json; these are initial-viewport lab observations, not field Web Vitals or a Lighthouse score.
