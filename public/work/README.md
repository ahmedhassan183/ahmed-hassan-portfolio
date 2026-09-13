# Real proof-of-work screenshots

Integrated, supplied assets:

- crm-market-system.webp — Ahmed's B2B market / CRM workbook.
- solar-pv-engineering-system.webp — primary screenshot of Ahmed's connected Excel system.
- solar-pv-dashboard.webp — focused dashboard screenshot.
- solar-pv-quotation.webp — focused client quotation screenshot, without real prices.
- 90-day-sales-system.webp — Ahmed's 90-Day Execution Operating Manual.
- maintenance-product.webp — Ahmed's annual maintenance agreement and three-tier service structure.

All six real work images are integrated. Files are copied unchanged from the supplied root work/ directory. No image contents or data were generated. The fallback is retained only for missing files or failed loads.

Before putting anything in public/, prepare a sanitized, flattened image outside the public directory. Remove customer names, phone numbers, pricing, internal purchase costs, margins, profit, private company data, internal contacts and identifying metadata. Never place confidential originals or unredacted files in public/ — they would be directly accessible.

Add only the sanitized final image at its reserved path, verify it visually, then rebuild (npm run build). No flags or code edits are needed: server-rendered file checks select the real image when present. During development, refresh the page after adding files. Keep descriptive alt text in data/sales.ts accurate. The preview uses object-fit: contain to preserve document content, and Next.js generates responsive image sizes. Prefer focused, legible excerpts rather than an entire workbook shrunk into one screenshot.

The flagship defaults to the Solar PV Engineering System overview, with smaller navigation tabs for Engineering & Commercial Dashboard and Client Quotation Preview. Arrow keys, Home and End select tabs. One full-width preview is displayed at a time, with a short reduced-motion-aware fade. Each image has an Inspect image action, opening a native modal dialog with fit/zoom modes, keyboard scrolling, Escape dismissal and focus restoration. Mobile inspection starts at 1600px for legible detail; ordinary document previews focus on the central document area. With JavaScript disabled, image inspection and gallery links open the original assets directly. Missing files show the project name, “Real project preview” and required filename. Failed image loads also fall back to this slot. No workbook, screenshot, sample data or measured outcome has been fabricated; proof counts and scope come from Ahmed's Phase 3 brief and have not been independently audited against the workbook.
