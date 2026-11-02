import { validateContact } from "../../../lib/contact.mjs";
export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== (request.headers.get("host") || new URL(request.url).host))
    return Response.json(
      { errors: { form: "Please submit using this website." } },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { errors: { form: "JSON is required." } },
      { status: 415 },
    );
  const body = await request.text();
  if (new TextEncoder().encode(body).length > 12000)
    return Response.json(
      { errors: { form: "Request is too large." } },
      { status: 413 },
    );
  let input;
  try {
    input = JSON.parse(body);
  } catch {
    return Response.json(
      { errors: { form: "Invalid request." } },
      { status: 400 },
    );
  }
  const result = validateContact(input);
  if (Object.keys(result.errors).length)
    return Response.json({ errors: result.errors }, { status: 422 });
  return Response.json(
    {
      message:
        "Your demo inquiry passed validation. No email was sent and your details were not saved.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
