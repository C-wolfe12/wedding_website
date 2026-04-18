import { NextResponse } from "next/server";

import { getRsvpStats, saveRsvp } from "@/lib/rsvp-store";
import { extractFieldErrors, rsvpSchema } from "@/lib/rsvp-validation";

export async function GET() {
  const stats = await getRsvpStats();
  return NextResponse.json(stats);
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "The RSVP payload could not be read." },
      { status: 400 },
    );
  }

  const parsed = rsvpSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please correct the invalid RSVP fields.",
        errors: extractFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  await saveRsvp(parsed.data);
  const stats = await getRsvpStats();

  return NextResponse.json(
    {
      message: "Thank you. Your RSVP has been received.",
      stats,
    },
    { status: 201 },
  );
}