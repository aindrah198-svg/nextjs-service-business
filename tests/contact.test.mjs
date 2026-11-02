import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "../lib/contact.mjs";
import { POST } from "../app/api/contact/route.js";
const valid = {
  name: "Alex Example",
  email: "alex@example.com",
  service: "Web design & development",
  message: "A fictional project for testing the contact form.",
  consent: true,
};
test("valid request and trimmed values", () => {
  const r = validateContact({ ...valid, name: " Alex Example " });
  assert.deepEqual(r.errors, {});
  assert.equal(r.values.name, "Alex Example");
});
test("all missing fields are rejected", () =>
  assert.equal(Object.keys(validateContact({}).errors).length, 5));
test("bad email and unrecognized service are rejected", () => {
  const r = validateContact({
    ...valid,
    email: "not-an-email",
    service: "Unknown",
  });
  assert.ok(r.errors.email);
  assert.ok(r.errors.service);
});
test("short and long names/messages are rejected", () => {
  for (const value of ["a", "x".repeat(81)])
    assert.ok(validateContact({ ...valid, name: value }).errors.name);
  for (const value of ["short", "x".repeat(2001)])
    assert.ok(validateContact({ ...valid, message: value }).errors.message);
});
test("consent must be a boolean true", () => {
  for (const consent of [false, "true", null])
    assert.ok(validateContact({ ...valid, consent }).errors.consent);
});
test("non-object and non-string fields do not crash", () => {
  for (const value of [null, [], 2, "bad"])
    assert.ok(validateContact(value).errors.form);
  assert.ok(validateContact({ ...valid, name: 42 }).errors.name);
});
const request = (data, headers = {}) =>
  new Request("http://localhost:3004/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
test("API accepts valid inquiry without claiming email delivery", async () => {
  const r = await POST(request(valid));
  assert.equal(r.status, 200);
  assert.match((await r.json()).message, /No email was sent/);
  assert.equal(r.headers.get("cache-control"), "no-store");
});
test("API rejects invalid inquiry", async () => {
  const r = await POST(request({}));
  assert.equal(r.status, 422);
  assert.ok((await r.json()).errors.email);
});
test("API rejects malformed JSON, wrong type, cross origin and oversize", async () => {
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal(
    (await POST(request(valid, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await POST(request(valid, { Origin: "http://other.example" }))).status,
    403,
  );
  assert.equal((await POST(request("x".repeat(12001)))).status, 413);
});

test('API accepts the browser Host when Next normalizes its internal URL', async () => {
  const response = await POST(request(valid, { Host: '127.0.0.1:3004', Origin: 'http://127.0.0.1:3004' }));
  assert.equal(response.status, 200);
});
