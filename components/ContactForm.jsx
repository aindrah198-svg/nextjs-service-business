"use client";
import { useState, useRef } from "react";
import { validateContact, serviceOptions } from "../lib/contact.mjs";
export default function ContactForm() {
  const [errors, setErrors] = useState({}),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState("");
  const lock = useRef(false);
  async function submit(e) {
    e.preventDefault();
    if (lock.current) return;
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data);
    values.consent = data.get("consent") === "on";
    const result = validateContact(values);
    setErrors(result.errors);
    setDone("");
    if (Object.keys(result.errors).length) return;
    lock.current = true;
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (!response.ok)
        setErrors(
          body.errors || { form: "Something went wrong. Please try again." },
        );
      else setDone(body.message);
    } catch {
      setErrors({ form: "Could not connect. Please try again." });
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} noValidate className="contact-form">
      {done ? (
        <div className="success" role="status">
          <span>✓</span>
          <h2>Thanks for trying it.</h2>
          <p>{done}</p>
          <button
            type="button"
            className="text-link"
            onClick={() => setDone("")}
          >
            Try another inquiry ↗
          </button>
        </div>
      ) : (
        <>
          {[
            ["name", "Your name", "text", "Alex Taylor"],
            ["email", "Email address", "email", "you@example.com"],
          ].map(([name, label, type, placeholder]) => (
            <div className="field" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={name === "name" ? "name" : "email"}
                maxLength={name === "name" ? 80 : 254}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? name + "-error" : undefined}
              />
              {errors[name] && (
                <p className="field-error" id={name + "-error"}>
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
          <div className="field">
            <label htmlFor="service">What can we help with?</label>
            <select
              id="service"
              name="service"
              defaultValue=""
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="field-error">
                {errors.service}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="message">A little about your project</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={2000}
              placeholder="What are you hoping to create or improve?"
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "message-error" : "message-help"
              }
            />
            <small id="message-help">
              20–2000 characters. Please use fictional details for this demo.
            </small>
            {errors.message && (
              <p id="message-error" className="field-error">
                {errors.message}
              </p>
            )}
          </div>
          <label className="checkbox">
            <input
              name="consent"
              type="checkbox"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            I understand this is a demo and no email will be sent.
          </label>
          {errors.consent && (
            <p id="consent-error" className="field-error">
              {errors.consent}
            </p>
          )}
          {Object.keys(errors).length > 0 && (
            <div role="alert" className="form-error">
              {errors.form || "Please check the highlighted fields."}
            </div>
          )}
          <button type="submit" className="button" disabled={busy}>
            {busy ? "Checking your inquiry…" : "Send demo inquiry"}{" "}
            <span>↗</span>
          </button>
        </>
      )}
    </form>
  );
}
