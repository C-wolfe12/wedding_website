# Deployment Guide

This document explains how to deploy this wedding website with MySQL.

Recommended production setup:
- Web app: Vercel
- Database: managed MySQL provider (PlanetScale, Railway MySQL, Aiven, DigitalOcean Managed MySQL, AWS RDS, etc.)

## 1. Prerequisites

- A GitHub repository with this project pushed
- A Vercel account
- A managed MySQL database
- Node.js 20 or newer locally

## 2. Prepare the MySQL Database

1. Create a MySQL database instance.
2. Create a database user with read/write permissions for the app database.
3. Note your connection string in this format:
   mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME

Optional SSL:
- Set MYSQL_SSL=true if your provider requires SSL/TLS.
- Set MYSQL_SSL=false if SSL is not required.
- MYSQL_SSL_REJECT_UNAUTHORIZED defaults to true when MYSQL_SSL=true. Only set it to false as a temporary compatibility fallback.
- If your provider requires a custom certificate authority, provide it with MYSQL_SSL_CA.

## 3. Environment Variables

In Vercel Project Settings -> Environment Variables, set:

- MYSQL_URL
- MYSQL_SSL
- NEXT_PUBLIC_SITE_URL

Example values:
- MYSQL_URL=mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME
- MYSQL_SSL=true
- MYSQL_SSL_REJECT_UNAUTHORIZED=true
- NEXT_PUBLIC_SITE_URL=https://your-production-domain.com

Notes:
- The app uses MYSQL_URL first, and falls back to DATABASE_URL if needed.
- Avoid committing real credentials into source control.

## 4. Deploy to Vercel

1. Import your GitHub repository into Vercel.
2. Set Framework Preset to Next.js (usually auto-detected).
3. Add the environment variables above.
4. Deploy.

Build behavior in this project:
- npm run build runs database migrations first (npm run db:migrate), then builds Next.js.

## 5. Verify Migrations

The migration runner is at scripts/run-migrations.mjs and executes SQL files in supabase/migrations.

On successful deploy, confirm:
- Table rsvps exists in your MySQL database.
- Table schema_migrations exists and includes applied migration IDs.

## 6. Post-Deployment Smoke Test

1. Open the deployed site URL.
2. Submit an RSVP in the form.
3. Confirm the record appears in the rsvps table.
4. Re-submit with same email only if your business logic allows duplicates.

## 7. Custom Domain

1. In Vercel, go to Project Settings -> Domains.
2. Add your custom domain.
3. Update DNS records as instructed by Vercel.
4. Update NEXT_PUBLIC_SITE_URL to your final domain.

## 8. CI/CD Flow

- Push to main -> Vercel auto-deploys.
- Pull requests can use Preview Deployments.
- Keep production and preview database credentials separate.

## 9. Rollback Plan

If a deployment fails:
1. Roll back to previous successful deployment in Vercel.
2. Check Vercel build logs for migration or database connection errors.
3. Fix env vars or DB permissions.
4. Redeploy.

## 10. Common Issues and Fixes

1. Build fails with database connection error:
- Verify MYSQL_URL host/user/password/database.
- Verify database allows incoming connections from your app host.
- Verify SSL requirement and MYSQL_SSL value.

2. Migrations are skipped:
- Ensure MYSQL_URL (or DATABASE_URL) is set in the deployment environment.

3. API returns 500 on RSVP submit:
- Check Vercel Function logs.
- Confirm rsvps table exists.
- Confirm DB user has INSERT permissions.

## 11. Alternative: Self-Hosted Node Server

If you do not want Vercel, deploy to a VPS or container platform:

1. Set environment variables on the server.
2. Install dependencies: npm ci
3. Run migrations: npm run db:migrate
4. Build app: npm run build
5. Start app: npm run start
6. Reverse-proxy with Nginx/Caddy and enable HTTPS.

## 12. Security Checklist

- Use a dedicated DB user with least privilege.
- Rotate DB password periodically.
- Keep secrets only in platform env vars.
- Enforce HTTPS.
- Restrict DB network access to trusted sources where possible.
