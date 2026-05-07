"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";

import styles from "@/app/page.module.css";
import {
  extractFieldErrors,
  rsvpSchema,
  type RsvpFieldErrors,
  type RsvpSubmission,
} from "@/lib/rsvp-validation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  attendance: "attending" | "declining";
  dietaryRestrictions: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  attendance: "attending",
  dietaryRestrictions: "",
  message: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const validationResult = useMemo(
    () =>
      rsvpSchema.safeParse({
        ...form,
        guestCount: form.attendance === "declining" ? 0 : 1,
      }),
    [form],
  );
  const allErrors = validationResult.success ? {} : extractFieldErrors(validationResult.error);

  const visibleErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([field]) => submitted || touched[field as keyof FormState]),
  ) as RsvpFieldErrors;

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function markTouched(field: keyof FormState) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setNotice(null);

    if (!validationResult.success) {
      setNotice({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    startTransition(async () => {
      const payload: RsvpSubmission = validationResult.data;

      try {
        const response = await fetch("/api/rsvp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = (await response.json()) as
          | { message: string }
          | { message?: string; errors?: RsvpFieldErrors };

        if (!response.ok) {
          setNotice({
            type: "error",
            message: result.message ?? "We could not save your RSVP. Please try again.",
          });
          return;
        }

        setForm(initialFormState);
        setTouched({});
        setSubmitted(false);
        setNotice({
          type: "success",
          message: result.message ?? "Thank you. Your RSVP has been received.",
        });
      } catch {
        setNotice({
          type: "error",
          message: "There was a network issue while submitting your RSVP.",
        });
      }
    });
  }

  return (
    <form className={styles.travelPanel} onSubmit={handleSubmit} noValidate>
        {notice ? (
          <div
            className={styles.hotelCard}
            style={{
              background:
                notice.type === "success"
                  ? "rgba(100, 149, 237, 0.12)"
                  : "rgba(128, 70, 27, 0.1)",
            }}
          >
            <strong>{notice.type === "success" ? "RSVP saved" : "Please review"}</strong>
            <p>{notice.message}</p>
          </div>
        ) : null}

        <div className={styles.hotelList}>
          <label>
            <span>Name</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              onBlur={() => markTouched("name")}
              placeholder="Your full name"
            />
            {visibleErrors.name ? <small>{visibleErrors.name}</small> : null}
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={() => markTouched("email")}
              placeholder="name@example.com"
            />
            {visibleErrors.email ? <small>{visibleErrors.email}</small> : null}
          </label>

          <label>
            <span>Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              onBlur={() => markTouched("phone")}
              placeholder="(876) 000-0000"
            />
            {visibleErrors.phone ? <small>{visibleErrors.phone}</small> : null}
          </label>

          <label>
            <span>Attendance</span>
            <select
              value={form.attendance}
              onChange={(event) =>
                updateField("attendance", event.target.value as FormState["attendance"])
              }
              onBlur={() => markTouched("attendance")}
            >
              <option value="attending">Joyfully attending</option>
              <option value="declining">Regretfully declining</option>
            </select>
            {visibleErrors.attendance ? <small>{visibleErrors.attendance}</small> : null}
          </label>

          <label>
            <span>Dietary restrictions</span>
            <textarea
              value={form.dietaryRestrictions}
              onChange={(event) => updateField("dietaryRestrictions", event.target.value)}
              onBlur={() => markTouched("dietaryRestrictions")}
              rows={3}
              placeholder="Vegetarian, allergies, or other notes"
            />
            {visibleErrors.dietaryRestrictions ? (
              <small>{visibleErrors.dietaryRestrictions}</small>
            ) : null}
          </label>

          <label>
            <span>Message for the couple</span>
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              onBlur={() => markTouched("message")}
              rows={4}
              placeholder="Share a note, blessing, or excitement for the day"
            />
            {visibleErrors.message ? <small>{visibleErrors.message}</small> : null}
          </label>
        </div>

        <div className={styles.heroActions}>
          <button className={styles.primaryAction} type="submit" disabled={isPending}>
            {isPending ? "Saving RSVP..." : "Submit RSVP"}
          </button>
        </div>
      </form>
  );
}