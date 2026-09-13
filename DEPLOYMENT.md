# Deployment checklist — GitHub and Vercel

## Owner inputs still required

- The real resume is integrated at `public/Ahmed-Hassan-Sales-Business-Development-Resume.pdf`. Every download control uses this file and the same professional download filename.
- Final contact details are configured in `data/site.ts`: a7md07san@gmail.com, primary +201018797298, secondary +201095638790, both WhatsApp links and the approved LinkedIn profile. Let’s Talk opens email. Structured data includes only the primary telephone.
- The first Vercel deployment will establish the real assigned HTTPS URL. Then set `NEXT_PUBLIC_SITE_URL` to that exact origin and redeploy before treating the public SEO configuration as final. Do not guess a domain.

The site requires no database, mail service, API keys or other application secrets. `VERCEL_ENV` is supplied by Vercel; Preview deployments receive noindex metadata and a disallow-all robots policy. Both environments use the same approved canonical origin.

## Exact Vercel steps (only when deployment is authorized)

1. Add the approved owner inputs above. From the project root, run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, then `npm run test:e2e`. Browser tests use port 3001; Windows uses Edge. On Linux, install Playwright Chromium with `npx playwright install --with-deps chromium` first.
2. Commit the reviewed source and `public/` assets on main, then create the approved public GitHub repository, preferably ahmed-hassan-portfolio, and push it. Do not include `.env.local`, `.next/`, `node_modules/`, local screenshots or browser traces. Keep all working code and tests.
3. In Vercel select **Add New → Project**, import that repository, and select the folder containing `package.json` as **Root Directory**.
4. Use the **Next.js** framework preset. Install command: `npm ci`. Build command: `npm run build`. Leave the Output Directory at the framework default. Use a supported Node.js version satisfying Next.js’s minimum of 20.9.
5. Use the free personal Hobby account and main as the production branch. Keep system environment variables enabled so `VERCEL_ENV` identifies previews. If the actual assigned URL is not yet known, obtain it from the first deployment.
6. Deployment is authorized by the final deployment brief. Use the already-authenticated CLI or select **Deploy** in the dashboard. If account authentication is needed, stop and request the user to authenticate. Never guess credentials.
7. Keep the actual assigned .vercel.app production domain for the free launch. A custom domain is optional; if explicitly requested later, add it under **Project → Settings → Domains** and follow Vercel’s displayed DNS records.
8. Set `NEXT_PUBLIC_SITE_URL` to the actual assigned production .vercel.app URL in Production and Preview, then **redeploy production**. Metadata, sitemap and robots are generated at build time. A custom domain is optional; if added later, update the origin and rebuild again.
9. Verify the public `/en`, `/ar`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`, resume download and a nonexistent route. Check canonical/hreflang and Person URLs use the final origin, Preview stays noindex, Production allows indexing, and social previews show the 1200 × 630 branded image. Check mobile contact links on a real device.

References: [Vercel deployments](https://vercel.com/docs/deployments), [environment variables](https://vercel.com/docs/environment-variables), [domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## Maintenance

- Rebuild when the resume, contact details or canonical origin change. There is one resume file, not one per locale.
- Keep sanitized evidence images in `public/work/`; original internal workbooks and private information must stay outside `public/`.
- Unknown page routes are rewritten by proxy.ts to the localized unavailable page with HTTP 404 and X-Robots-Tag: noindex. This keeps error HTML and the theme bootstrap available without client-side recovery. These internal error routes are excluded from the sitemap. The minimal global fallback uses Next.js’s documented experimental `globalNotFound` option because this project has multiple root layouts. Recheck 404 coverage when upgrading Next.js.
- Local browser checks are not field Core Web Vitals. Inspect real performance after an authorized deployment; no analytics or monitoring service was installed.
