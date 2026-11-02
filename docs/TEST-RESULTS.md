# Verification record

Verified on 2026-11-03 (Asia/Jakarta), Node 26.13.0, Next.js 16.4.4, local Chrome.

- 10 unit/API tests passed: valid/trimmed input, missing fields, malformed email, unrecognized service, name/message bounds, consent, input types, API JSON/status checks, cross-origin rejection, request-size checks and Host normalization regression.
- Next.js production build passed. Home and service pages are statically rendered; contact API is dynamic.
- Browser checks passed: eight pages; three service details; unknown-service 404; invalid form errors; valid form demo success; reset; mobile navigation; five mobile routes without document overflow; sitemap response; no JavaScript exceptions.
- Desktop and mobile screenshots inspected. Main illustration is original SVG with generated raster variants.
- npm audit --omit=dev: zero known production dependency vulnerabilities reported.
- Three baseline and three optimized Lighthouse reports are committed. See PERFORMANCE.md for measured results and limitations.

During functional testing a same-origin check incorrectly compared the browser address with Next.js's normalized internal URL. The route now checks against the incoming Host header, with request URL fallback. A regression test covers the original localhost/127.0.0.1 mismatch.

Contact submission confirms validation only. No messages are sent or stored. Browser checks cover Chrome, not every browser/device. Lighthouse scores do not establish full accessibility compliance or real-user performance.
