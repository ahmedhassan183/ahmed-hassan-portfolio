# V2.8 visual audit

Starting content: approved V2.7 `fd958e9528237c531313aafb80b4be01518eeffe`.
Production main already contains V2.7; this branch does not modify production.

| Current problem | Proposed solution | Scope |
| --- | --- | --- |
| Full case studies make the home page long | Three visual summaries with dedicated bilingual detail routes; retain approved methodology there | SelectedSalesSystems / cases |
| Evidence competes with long prose | Metric rails, status badges and restrained evidence surfaces | Hero, Experience, training, partnership |
| Supporting Work reads as a text list | Two-column project grid with value, evidence chips and status | SupportingWork |
| Flat navy and repetitive dividers | Distinct base, section, card and media surfaces; short accents | Shared styles and case modules |
| Arabic supporting text lacks presence | Contextual body/label size, contrast and line-height improvements | Arabic typography |
| Growth proof is buried | Compact homepage feature, distinct case-page sections; planned quantities remain explicit | Growth |
| Sahara still says preparation only | Before/during/after evidence and verified named companies, without outcome metrics | Sahara supporting card |
| Mobile rhythm is already useful | Preserve sticky navigation, accessible inspection, true RTL, reduced motion and touch targets | All widths |

No clean Sahara media exists in public at the start. Do not manufacture imagery.
Resume source and canonical PDF remain byte-identical to V2.7.

## Implementation scope

21 application/content/style files:

- app/[locale]/layout.tsx
- app/[locale]/page.tsx
- app/[locale]/cases/[slug]/page.tsx
- app/executive.css
- app/sitemap.ts
- components/growth/Growth.module.css
- components/partnership/Partnership.module.css
- components/sections/CaseSummaries.tsx
- components/sections/Experience.tsx
- components/sections/FlagshipDetails.tsx
- components/sections/GrowthFeature.tsx
- components/sections/Hero.tsx
- components/sections/SelectedSalesSystems.tsx
- components/sections/SupportingWork.tsx
- components/ui/MetricRail.tsx
- content/ar.ts
- content/en.ts
- content/cases.ts
- content/sahara.ts
- data/sales.ts
- proxy.ts

17 browser test files:

- tests/evidence-patch.spec.ts
- tests/phase-five.spec.ts
- tests/phase-four.spec.ts
- tests/phase-one.spec.ts
- tests/phase-three.spec.ts
- tests/phase-two.spec.ts
- tests/phase-v2-commercial.spec.ts
- tests/phase-v2-recruiter.spec.ts
- tests/real-assets.spec.ts
- tests/v2-2-contact-partnership.spec.ts
- tests/v2-3-mobile-cases.spec.ts
- tests/v2-3-mobile-density.spec.ts
- tests/v2-3-rtl.spec.ts
- tests/v2-4-institute-protocol.spec.ts
- tests/v2-5-partnership-case.spec.ts
- tests/v2-7-growth-case.spec.ts
- tests/v2-8-executive.spec.ts

This audit is the 39th file. No dependency, deployment configuration, resume or public asset changes.

## Coverage migration

All 158 pre-existing test cases are retained. Full case-field, artifact, inspection, workflow, commercial-evidence, native-disclosure and keyboard assertions moved to their dedicated public routes. Responsive detail pages explicitly inherit each tested viewport and theme. The homepage retains its navigation, evidence, accessibility, contact and resume checks.

Updated expectations reflect authorized changes: the primary CTA points to cases; proof has four entries; Supporting Work uses project cards; the sitemap includes six additional localized routes; training detail is opened before testing its original three steps. Layout assertions account for card padding and evidence metrics while still checking containment and readability. The original tablet artifact-width assertion is retained and the layout corrected to satisfy it.

Factual source locks now compare against the approved V2.7 baseline, rather than locking visual implementation that V2.8 explicitly permits changing. Resume source, canonical PDF, Growth and Institute factual content stay protected. Sahara is the sole permitted change in the commercial data file.

46 added tests cover the new routes and CTAs, all five homepage widths, both languages and themes, case accessibility, card hierarchy, planned Growth labels, completed Institute evidence, and Sahara companies, status and claim safety. Total: 204 tests, with no skipped or removed test cases.

## Visual verification

Reviewed 60 local screenshots: the homepage in EN/AR at 320, 375, 768, 1024 and 1440 pixels in both themes; all three flagship cases, Institute and Growth at 375 and 1440 pixels in both languages and themes. Images loaded, document direction and theme matched, and no horizontal overflow or application console/network errors were detected. Expanded Sahara evidence was also captured in all 20 homepage contexts.

Compared with the unchanged production homepage, measured page height decreased from 12,705 to 11,958 pixels for EN 375, from 11,573 to 11,364 for AR 375, from 9,153 to 7,860 for EN 1440, and from 8,957 to 7,796 for AR 1440. Arabic body text is larger while approved detail remains available on dedicated routes or native disclosures.

The original sticky-header geometry assertion remains intact. Navigation verification now waits for the first native anchor scroll to settle before requesting the second anchor, and checks both targets against the same header bounds.

## Local release gates

- Full browser suite: 204 passed, zero failed or skipped (6.6 minutes).
- Lint: passed.
- TypeScript and generated route types: passed.
- Production build: passed, including all six localized flagship routes.
- Git whitespace check: passed.
- Local visual QA: 60 contexts passed; 20 expanded Sahara captures reviewed.
- No changes to dependencies, deployment configuration, public assets or resume files.
- Production main and origin/main remain `564ced98b777611823d256bf87b7b5ed23a72191`.

This branch is approved for a protected Preview deployment only. Human visual approval is required before any later production release.
