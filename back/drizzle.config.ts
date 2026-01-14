import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // <--- Указываем диалект
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});