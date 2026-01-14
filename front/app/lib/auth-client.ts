import { createAuthClient } from "better-auth/vue"

export const authClient = createAuthClient({
    baseURL: "https://api.gocyxapik.pp.ua", // Адрес вашего Hono сервера
})

// Хелперы для удобного использования в компонентах
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession 
} = authClient;