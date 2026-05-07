import { NextRequest, NextResponse } from 'next/server';
import { getMySqlPool } from '@/src/lib/mysql';
import type { RSVPFormData } from '@/src/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_DIETARY_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var __rsvpRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

export const runtime = 'nodejs';

function getRateLimitStore(): Map<string, RateLimitEntry> {
  if (!global.__rsvpRateLimitStore) {
    global.__rsvpRateLimitStore = new Map<string, RateLimitEntry>();
  }

  return global.__rsvpRateLimitStore;
}

function jsonResponse(body: Record<string, string | boolean | number>, status: number, extraHeaders?: HeadersInit): Response {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function normalizeNullableString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getRequestOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin');
  if (origin) {
    return origin;
  }

  const referer = request.headers.get('referer');
  if (!referer) {
    return null;
  }

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

function isAllowedOrigin(request: NextRequest): boolean {
  const requestOrigin = getRequestOrigin(request);
  if (!requestOrigin) {
    return true;
  }

  const allowedOrigins = new Set([request.nextUrl.origin]);
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    try {
      allowedOrigins.add(new URL(configuredSiteUrl).origin);
    } catch {
      return false;
    }
  }

  return allowedOrigins.has(requestOrigin);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
}

function takeRateLimit(ipAddress: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const store = getRateLimitStore();

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }

  const current = store.get(ipAddress);
  if (!current || current.resetAt <= now) {
    store.set(ipAddress, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return { allowed: true, retryAfterSeconds: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  store.set(ipAddress, current);

  return {
    allowed: true,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    if (!isAllowedOrigin(request)) {
      return jsonResponse({ error: 'Invalid request origin.' }, 403);
    }

    const rateLimit = takeRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
      return jsonResponse(
        { error: 'Too many RSVP attempts. Please try again later.' },
        429,
        { 'Retry-After': String(rateLimit.retryAfterSeconds) }
      );
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonResponse(
        { error: 'Invalid content type. Expected application/json.' },
        415
      );
    }

    const contentLengthHeader = request.headers.get('content-length');
    const contentLength = Number(contentLengthHeader);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: 'Request body is too large.' }, 413);
    }

    let payload: Partial<RSVPFormData>;
    try {
      payload = (await request.json()) as Partial<RSVPFormData>;
    } catch {
      return jsonResponse(
        { error: 'Invalid JSON payload.' },
        400
      );
    }

    const guestName = normalizeNullableString(payload.guest_name);
    const email = normalizeNullableString(payload.email)?.toLowerCase();
    const phone = normalizeNullableString(payload.phone);
    const dietaryRestrictions = normalizeNullableString(payload.dietary_restrictions);
    const message = normalizeNullableString(payload.message);
    const attending =
      payload.attending === true ? true : payload.attending === false ? false : null;

    if (!guestName || !email || attending === null) {
      return jsonResponse(
        { error: 'Please fill in all required fields.' },
        400
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return jsonResponse(
        { error: 'Please enter a valid email address.' },
        400
      );
    }

    if (
      guestName.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      (phone && phone.length > MAX_PHONE_LENGTH) ||
      (dietaryRestrictions && dietaryRestrictions.length > MAX_DIETARY_LENGTH) ||
      (message && message.length > MAX_MESSAGE_LENGTH)
    ) {
      return jsonResponse(
        { error: 'One or more fields exceed the allowed length.' },
        400
      );
    }

    const mySqlPool = getMySqlPool();

    await mySqlPool.query(
      `
        INSERT INTO rsvps (
          guest_name,
          email,
          phone,
          attending,
          dietary_restrictions,
          message
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [guestName, email, phone, attending, dietaryRestrictions, message]
    );

    const successMessage = attending
      ? "Thank you for your RSVP! We're so excited to celebrate with you."
      : "Thank you for letting us know. We'll miss you and appreciate your RSVP.";

    return jsonResponse({ success: true, message: successMessage }, 201);
  } catch (error) {
    console.error('RSVP API Error:', error);
    return jsonResponse(
      { error: 'Failed to submit RSVP. Please try again.' },
      500
    );
  }
}