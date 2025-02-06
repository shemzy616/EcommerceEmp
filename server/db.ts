import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Test the connection immediately and log the result
pool.connect()
  .then(() => {
    console.log('Database connected successfully');
    // Test query to verify schema
    return db.select().from(schema.users).execute();
  })
  .then(() => {
    console.log('Database schema verified successfully');
  })
  .catch((err) => {
    console.error('Database connection/schema error:', err);
    process.exit(1);
  });