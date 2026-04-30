import { Pool } from 'pg';

declare global {
  var __postgresPool: Pool | undefined;
}

export function getPostgresPool(): Pool {
  if (global.__postgresPool) {
    return global.__postgresPool;
  }

  const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Missing POSTGRES_URL or DATABASE_URL environment variable');
  }

  const useSsl = process.env.POSTGRES_SSL !== 'false';
  const pool = new Pool({
    connectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  });

  if (process.env.NODE_ENV !== 'production') {
    global.__postgresPool = pool;
  }

  return pool;
}