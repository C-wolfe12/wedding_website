import { createPool, type Pool } from 'mysql2/promise';

declare global {
  var __mysqlPool: Pool | undefined;
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

export function getMySqlPool(): Pool {
  if (global.__mysqlPool) {
    return global.__mysqlPool;
  }

  const databaseUrl = process.env.MYSQL_URL ?? process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Missing MYSQL_URL or DATABASE_URL environment variable');
  }

  const pool = createPool({
    uri: databaseUrl,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: getMySqlSslConfig(),
  });

  if (process.env.NODE_ENV !== 'production') {
    global.__mysqlPool = pool;
  }

  return pool;
}