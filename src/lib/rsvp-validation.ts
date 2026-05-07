import { z } from "zod";

const trimmedString = z.string().trim();

export const rsvpSchema = z
  .object({
    name: trimmedString.min(2, "Please enter your full name.").max(80),
    email: trimmedString.email("Please enter a valid email address.").max(120),
    phone: trimmedString
      .min(7, "Please enter a valid phone number.")
      .max(30)
      .regex(/^[0-9+()\-\s]+$/, "Phone number contains invalid characters."),
    attendance: z.enum(["attending", "declining"]),
    guestCount: z.coerce.number().int().min(0).max(6),
    dietaryRestrictions: trimmedString.max(250).optional().default(""),
    message: trimmedString.max(500).optional().default(""),
  })
  .superRefine((value, ctx) => {
    if (value.attendance === "attending" && value.guestCount < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: "Please select at least one guest if you are attending.",
      });
    }

    if (value.attendance === "declining" && value.guestCount !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: "Guest count must be 0 when declining.",
      });
    }
  });

export type RsvpSubmission = z.infer<typeof rsvpSchema>;

export type RsvpFieldErrors = Partial<Record<keyof RsvpSubmission, string>>;

export function extractFieldErrors(error: z.ZodError<RsvpSubmission>): RsvpFieldErrors {
  const flattened = error.flatten().fieldErrors;

  return {
    name: flattened.name?.[0],
    email: flattened.email?.[0],
    phone: flattened.phone?.[0],
    attendance: flattened.attendance?.[0],
    guestCount: flattened.guestCount?.[0],
    dietaryRestrictions: flattened.dietaryRestrictions?.[0],
    message: flattened.message?.[0],
  };
}