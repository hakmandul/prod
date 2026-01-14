<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <h1 class="text-4xl font-bold mb-8">Better Auth + Nuxt</h1>
    
    <div class="space-x-4">
      <NuxtLink 
        to="/login" 
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
      >
        Войти
      </NuxtLink>
      
      <NuxtLink 
        to="/register" 
        class="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
      >
        Регистрация
      </NuxtLink>

      <NuxtLink 
        to="/profile" 
        class="px-6 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg font-semibold transition"
      >
        Профиль (Protected)
      </NuxtLink>
    </div>
  </div>
</template>