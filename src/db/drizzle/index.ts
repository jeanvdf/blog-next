import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { resolve } from 'path';
import { postsTable } from './schemas';

// Em produção (Vercel), TURSO_DATABASE_URL/TURSO_AUTH_TOKEN vêm das env vars.
// Sem elas (dev local), cai para o arquivo SQLite local via protocolo file:.
const url = process.env.TURSO_DATABASE_URL ?? `file:${resolve(process.cwd(), 'db.sqlite3')}`;

const client = createClient({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const drizzleDb = drizzle(client, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
