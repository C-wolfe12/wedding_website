import { NextResponse } from 'next/server';
import { getPostgresPool } from '@/src/lib/postgres';
import type { RSVPFormData } from '@/src/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_DIETARY_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;

function normalizeNullableString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json.' },
        { status: 415 }
      );
    }

    let payload: Partial<RSVPFormData>;
    try {
      payload = (await request.json()) as Partial<RSVPFormData>;
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const guestName = normalizeNullableString(payload.guest_name);
    const email = normalizeNullableString(payload.email);
    const phone = normalizeNullableString(payload.phone);
    const dietaryRestrictions = normalizeNullableString(payload.dietary_restrictions);
    const message = normalizeNullableString(payload.message);
    const attending =
      payload.attending === true ? true : payload.attending === false ? false : null;

    if (!guestName || !email || attending === null) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (
      guestName.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      (phone && phone.length > MAX_PHONE_LENGTH) ||
      (dietaryRestrictions && dietaryRestrictions.length > MAX_DIETARY_LENGTH) ||
      (message && message.length > MAX_MESSAGE_LENGTH)
    ) {
      return NextResponse.json(
        { error: 'One or more fields exceed the allowed length.' },
        { status: 400 }
      );
    }

    const postgresPool = getPostgresPool();

    await postgresPool.query(
      `
        INSERT INTO rsvps (
          guest_name,
          email,
          phone,
          attending,
          dietary_restrictions,
          message
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [guestName, email, phone, attending, dietaryRestrictions, message]
    );

    const successMessage = attending
      ? "Thank you for your RSVP! We're so excited to celebrate with you."
      : "Thank you for letting us know. We'll miss you and appreciate your RSVP.";

    return NextResponse.json({ success: true, message: successMessage }, { status: 201 });
  } catch (error) {
    console.error('RSVP API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit RSVP. Please try again.' },
      { status: 500 }
    );
  }
}