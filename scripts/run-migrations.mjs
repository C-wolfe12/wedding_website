import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const migrationsDir = path.join(rootDir, 'supabase', 'migrations');

function stripWrappingQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

async function loadEnvFile(filePath) {
  let contents;
  try {
    contents = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return;
    }

    throw error;
  }

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

await loadEnvFile(path.join(rootDir, '.env.local'));
await loadEnvFile(path.join(rootDir, '.env'));

const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db:migrate] POSTGRES_URL/DATABASE_URL is not set. Skipping migrations.');
  process.exit(0);
}

const useSsl = process.env.POSTGRES_SSL !== 'false';
const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

async function getMigrationFiles() {
  const entries = await fs.readdir(migrationsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => entry.name)
    .sort();
}

async function alreadyApplied(client, migrationId) {
  const result = await client.query('SELECT 1 FROM schema_migrations WHERE id = $1', [migrationId]);
  return result.rowCount > 0;
}

async function applyMigration(client, migrationId) {
  const migrationPath = path.join(migrationsDir, migrationId);
  const sql = await fs.readFile(migrationPath, 'utf8');

  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (id) VALUES ($1)', [migrationId]);
    await client.query('COMMIT');
    console.log(`[db:migrate] Applied ${migrationId}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

async function run() {
  const client = await pool.connect();
  try {
    await ensureMigrationsTable(client);
    const migrationFiles = await getMigrationFiles();

    if (migrationFiles.length === 0) {
      console.log('[db:migrate] No migration files found.');
      return;
    }

    for (const migrationId of migrationFiles) {
      if (await alreadyApplied(client, migrationId)) {
        console.log(`[db:migrate] Skipping ${migrationId} (already applied)`);
        continue;
      }

      await applyMigration(client, migrationId);
    }

    console.log('[db:migrate] Migration step complete.');
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((error) => {
  console.error('[db:migrate] Failed to run migrations.');
  console.error(error);
  process.exit(1);
});
