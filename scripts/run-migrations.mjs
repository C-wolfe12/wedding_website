import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

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

const connectionString = process.env.MYSQL_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db:migrate] MYSQL_URL/DATABASE_URL is not set. Skipping migrations.');
  process.exit(0);
}

function getMySqlSslConfig() {
  if (process.env.MYSQL_SSL !== 'true') {
    return undefined;
  }

  const ca = process.env.MYSQL_SSL_CA?.replace(/\\n/g, '\n');

  return {
    ca,
    rejectUnauthorized: process.env.MYSQL_SSL_REJECT_UNAUTHORIZED !== 'false',
  };
}

const pool = mysql.createPool({
  uri: connectionString,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
  ssl: getMySqlSslConfig(),
});

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  const [rows] = await client.query('SELECT 1 FROM schema_migrations WHERE id = ? LIMIT 1', [migrationId]);
  return Array.isArray(rows) && rows.length > 0;
}

async function applyMigration(client, migrationId) {
  const migrationPath = path.join(migrationsDir, migrationId);
  const sql = await fs.readFile(migrationPath, 'utf8');

  await client.beginTransaction();
  try {
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (id) VALUES (?)', [migrationId]);
    await client.commit();
    console.log(`[db:migrate] Applied ${migrationId}`);
  } catch (error) {
    await client.rollback();
    throw error;
  }
}

async function run() {
  const client = await pool.getConnection();
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
