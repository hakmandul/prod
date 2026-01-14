import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // В SSR режиме нам нужно явно запросить сессию
    const { data: session } = await authClient.useSession(useFetch);
    
    if (!session.value) {
        return navigateTo('/login');
    }
});