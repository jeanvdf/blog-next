import { defineConfig } from 'drizzle-kit';

// Carrega TURSO_DATABASE_URL / TURSO_AUTH_TOKEN do .env para os comandos de CLI.
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('.env');
  } catch {}
}

export default defineConfig({
  out: './src/db/drizzle/migrations.ts',
  schema: './src/db/drizzle/schemas.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
