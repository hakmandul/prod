import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // Postgres
    }),
    emailAndPassword: {  
        enabled: true,
    },
    // ВАЖНО: Защита от подмены домена.
    // Указываем и фронтенд (откуда запросы), и бэкенд (куда запросы)
    trustedOrigins: [
        process.env.FRONTEND_URL!, // https://gocyxapik.pp.ua
        process.env.BETTER_AUTH_URL! // https://api.gocyxapik.pp.ua),
    ],
    advanced: {
        // Гарантируем Secure cookie в проде (Nginx уже настроен передавать https)
        useSecureCookies: process.env.NODE_ENV === "production",
    }
});