# Hugeoleen & Carl Wedding Website

This is a Next.js wedding website for Hugeoleen and Carl with a full one-page experience, embedded directions, travel information, registry details, and a persistent RSVP system.

## Features

- Elegant hero section with countdown and animated reveal
- Story timeline, schedule, directions, travel details, registry, and FAQ
- RSVP form with live validation and local database storage
- Google Maps embed for venue directions
- Responsive layout tuned for mobile and desktop

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## RSVP Storage

RSVP entries are stored in MySQL via the `/api/rsvp` route.

Set either `MYSQL_URL` (recommended) or `DATABASE_URL`, then run migrations:

```bash
npm run db:migrate
```

## Main Stack

- Next.js App Router
- React 19
- TypeScript
- MySQL (`mysql2`)
