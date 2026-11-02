export const serviceOptions = [
  "Web design & development",
  "Brand identity",
  "Website care & improvements",
  "Not sure yet",
];
export function validateContact(input) {
  const errors = {};
  const v = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return {
      errors: { form: "Please send a valid contact request." },
      values: {},
    };
  for (const key of ["name", "email", "service", "message"])
    v[key] = typeof input[key] === "string" ? input[key].trim() : "";
  if (v.name.length < 2 || v.name.length > 80)
    errors.name = "Enter a name between 2 and 80 characters.";
  if (v.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    errors.email = "Enter a valid email address.";
  if (!serviceOptions.includes(v.service)) errors.service = "Choose a service.";
  if (v.message.length < 20 || v.message.length > 2000)
    errors.message = "Tell us about your project in 20–2000 characters.";
  if (input.consent !== true)
    errors.consent = "Please agree before submitting.";
  return { errors, values: v };
}
