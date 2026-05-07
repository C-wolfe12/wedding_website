import { mkdir } from "node:fs/promises";
import path from "node:path";

import Datastore from "nedb-promises";

import type { RsvpSubmission } from "@/lib/rsvp-validation";

type StoredRsvp = RsvpSubmission & {
  _id?: string;
  submittedAt: string;
};

let databasePromise: Promise<Datastore<StoredRsvp>> | null = null;

async function getDatabase() {
  if (!databasePromise) {
    databasePromise = (async () => {
      const dataDirectory = path.join(process.cwd(), "data");
      await mkdir(dataDirectory, { recursive: true });

      return Datastore.create({
        filename: path.join(dataDirectory, "rsvps.db"),
        autoload: true,
      }) as unknown as Datastore<StoredRsvp>;
    })();
  }

  return databasePromise;
}

export async function saveRsvp(entry: RsvpSubmission) {
  const database = await getDatabase();
  const submittedAt = new Date().toISOString();
  const payload: StoredRsvp = { ...entry, submittedAt };
  const existing = await database.findOne({ email: entry.email });

  if (existing?._id) {
    await database.update({ _id: existing._id }, { $set: payload });
    return { ...existing, ...payload };
  }

  return database.insert(payload);
}

export async function getRsvpStats() {
  const database = await getDatabase();
  const entries = await database.find({});

  return entries.reduce(
    (stats, entry) => {
      stats.totalResponses += 1;

      if (entry.attendance === "attending") {
        stats.attendingParties += 1;
        stats.confirmedGuests += entry.guestCount;
      } else {
        stats.declinedResponses += 1;
      }

      return stats;
    },
    {
      totalResponses: 0,
      attendingParties: 0,
      confirmedGuests: 0,
      declinedResponses: 0,
    },
  );
}