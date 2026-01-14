// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      authUrl: "https://api.gocyxapik.pp.ua" // Ваш адрес бэкенда
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
