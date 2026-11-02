# Controlled image optimization study

Measured 2026-11-03, local Windows Chrome, Next.js production build on port 3004. Three Lighthouse runs per version, mobile screen 390 x 844, device scale factor 1, simulated throttling. Both versions use identical layout, content, fonts and server-component architecture. The only component difference is the hero image path and image implementation.

| Median metric | Original image baseline | Optimized homepage |
|---|---:|---:|
| Performance score | 75 | 100 |
| Largest Contentful Paint | 7.66 s | 1.59 s |
| Total page transfer | 1,327,815 bytes | 181,922 bytes |
| Cumulative Layout Shift | 0 | 0 |

Total transfer decreased by 86.3%. Median LCP decreased by 79.3%. Optimized performance scores were 100, 100, 99.

## The actual change

- Baseline: native img with the 2400 x 2400 original PNG, 1,157,794 bytes. Explicit dimensions preserve layout.
- Optimized: 1100 x 1100 WebP source, 31,154 bytes, responsive Next Image sizes and priority loading. The browser receives an appropriately sized image through the Next image pipeline.
- Original artwork is repository-owned. The baseline is intentionally retained for reproduction; this is not a historical client incident.
- Both pages already use static server-rendered content and small client islands (navigation and contact form). That architecture is not counted as a measured before/after change.

## Evidence and interpretation

Raw reports: performance/baseline-1.json through baseline-3.json and optimized-1.json through optimized-3.json. Compact values: performance/summary.json. Reproduce with node scripts/performance.mjs against npm start. The script configuration is part of the repository; Lighthouse and browser versions are recorded inside the raw reports.

Optimized-page SEO lab score: 100. Baseline SEO is intentionally lower because it is noindexed; this is not an SEO improvement experiment. Accessibility lab score: 96 on both versions; small low-contrast labels remain flagged, so no full accessibility conformance claim is made.

The server's image optimizer was warmed by functional browser checks before measurement. Each Lighthouse run uses its own navigation/storage reset, but host CPU, network simulation and browser caches can still affect results. These are local synthetic results, not real-user field data, a deployment benchmark or a guarantee for another machine.
