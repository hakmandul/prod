import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger"; // <--- Импорт логгера
import { auth } from "./lib/auth";
import { sessionMiddleware, Env } from "./middleware/auth";


const app = new Hono<Env>();
app.use(logger());


console.log(process.env.FRONTEND_URL);


// 1. CORS — Самое важное для связи Фронт <-> Бэк
app.use(
    "/api/*",
    cors({
        origin: [process.env.FRONTEND_URL!], // Разрешаем ТОЛЬКО нашему фронтенду
        allowHeaders: ["Content-Type", "Authorization", "Cookie"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true, // ОБЯЗАТЕЛЬНО true, иначе куки не пройдут
    })
);

// 2. Роуты авторизации (login, register, logout и т.д.)
app.on(["POST", "GET"], "/api/auth/**", (c) => {
    return auth.handler(c.req.raw);
});

// 3. Middleware сессии (навешиваем на все остальные API роуты)
app.use("/api/*", sessionMiddleware);

// 4. Пример защищенного роута
app.get("/api/me", (c) => {
    const user = c.get("user");
    if (!user) {
        return c.json({ error: "Не авторизован" }, 401);
    }
    return c.json({ 
        message: "Привет!", 
        user: user 
    });
});



export default {
    port: 3001, // Порт, который указан в upstream Nginx (backend_bun)
    fetch: app.fetch,
};