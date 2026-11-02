import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { writeFileSync, mkdirSync } from "node:fs";
const base = process.env.BASE_URL || "http://127.0.0.1:3004";
mkdirSync("docs/performance", { recursive: true });
const chrome = await launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
});
const results = [];
try {
  for (const mode of ["baseline", "optimized"])
    for (let i = 1; i <= 3; i++) {
      const url = base + (mode === "baseline" ? "/performance-baseline" : "/");
      const { lhr, report } = await lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttlingMethod: "simulate",
      });
      writeFileSync("docs/performance/" + mode + "-" + i + ".json", report);
      results.push({
        mode,
        run: i,
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        lcp: Math.round(lhr.audits["largest-contentful-paint"].numericValue),
        cls: lhr.audits["cumulative-layout-shift"].numericValue,
        bytes: lhr.audits["total-byte-weight"].numericValue,
      });
      console.log(results.at(-1));
    }
  writeFileSync(
    "docs/performance/summary.json",
    JSON.stringify(results, null, 2),
  );
} finally {
  await chrome.kill();
}
