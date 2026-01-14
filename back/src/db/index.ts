import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Берет DATABASE_URL из .env
const connectionString = process.env.DATABASE_URL!;

// prepare: false — важно для совместимости с пулерами (Supabase/Neon и т.д.)
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });