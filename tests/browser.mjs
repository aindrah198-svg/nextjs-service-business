import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
  reducedMotion: "reduce",
});
const base = process.env.BASE_URL || "http://127.0.0.1:3004";
page.setDefaultTimeout(15000);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
mkdirSync("docs", { recursive: true });
try {
  await page.goto(base);
  await page.getByRole("heading", { name: /A little clarity/ }).waitFor();
  await page.locator(".hero-art img").evaluate((img) => img.decode());
  await page.screenshot({ path: "docs/desktop.png", fullPage: true });
  for (const path of [
    "/services",
    "/services/web-design",
    "/services/brand-identity",
    "/services/website-care",
    "/about",
    "/work",
  ]) {
    const r = await page.goto(base + path);
    assert.equal(r.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok((await page.title()).includes("Forma"));
  }
  const invalid = await page.goto(base + "/services/does-not-exist");
  assert.equal(invalid.status(), 404);
  await page.goto(base + "/contact");
  await page.getByRole("button", { name: /Send demo inquiry/ }).click();
  await page.locator(".contact-form").getByRole("alert").waitFor();
  await page.getByLabel("Your name", { exact: true }).fill("Alex Example");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("alex@example.com");
  await page
    .getByLabel("What can we help with?")
    .selectOption("Brand identity");
  await page
    .getByLabel("A little about your project")
    .fill("A fictional project for checking the portfolio form.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Send demo inquiry/ }).click();
  await page.getByRole("status").waitFor();
  assert.match(
    await page.getByRole("status").textContent(),
    /No email was sent/,
  );
  await page.getByRole("button", { name: /Try another inquiry/ }).click();
  await page.getByLabel("Your name", { exact: true }).waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator(".hero-art img").evaluate((img) => img.decode());
  await page.screenshot({ path: "docs/mobile.png", fullPage: true });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.getByRole("button", { name: /Menu/ }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await page.waitForURL("**/services");
  assert.equal(
    await page
      .getByRole("button", { name: /Menu/ })
      .getAttribute("aria-expanded"),
    "false",
  );
  for (const path of ["/contact", "/services/web-design", "/work", "/about"]) {
    await page.goto(base + path);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path + " has no overflow",
    );
  }
  const sitemap = await page.request.get(base + "/sitemap.xml");
  assert.equal(sitemap.status(), 200);
  assert.match(await sitemap.text(), /services\/web-design/);
  assert.deepEqual(errors, []);
  console.log(
    "Browser checks passed: 8 pages, unknown-service 404, form validation/success/reset, mobile menu, 5 mobile layouts, sitemap, no JS errors.",
  );
} finally {
  await browser.close();
}
