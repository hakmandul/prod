import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {  
        enabled: true,
        autoSignIn: true // Рекомендую вернуть, чтобы сразу входить после регистрации
    },
    trustedOrigins: [
        // Исправлена синтаксическая ошибка (лишняя запятая и скобка)
        process.env.FRONTEND_URL!, // https://gocyxapik.pp.ua
        process.env.BETTER_AUTH_URL! // https://api.gocyxapik.pp.ua
    ],
    advanced: {
        // 1. Обязательно true, так как у вас HTTPS (Nginx)
        useSecureCookies: true,

        // 2. САМОЕ ВАЖНОЕ: Разрешаем куки для всех поддоменов
        // Без этого фронтенд не увидит сессию, созданную на api.
        crossSubDomainCookies: {
            enabled: true,
            domain: ".gocyxapik.pp.ua" // <--- Обратите внимание на ТОЧКУ в начале
        },
        
        // 3. Дополнительная страховка атрибутов куки
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true
        }
    }
});