<script setup lang="ts">
import { useSession, signOut } from '~/lib/auth-client';

// Подключаем middleware для защиты
definePageMeta({
  middleware: 'auth'
});

const session = useSession();

const handleLogout = async () => {
  // 1. Первый аргумент — пустой объект (или fetchOptions)
  // 2. Второй аргумент — колбэки (onSuccess)
  await signOut({}, {
    onSuccess: async () => {
      // Используем роутер Nuxt для редиректа
      await navigateTo('/login');
    }
  });
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
    <div class="max-w-lg w-full bg-gray-800 rounded-xl p-8 shadow-lg text-center">
      
      <!-- Проверка session.data важна, т.к. данные загружаются асинхронно -->
      <div v-if="session.data" class="space-y-4">
        <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
          <!-- Безопасное получение первой буквы имени -->
          {{ session.data.user.name?.charAt(0).toUpperCase() || '?' }}
        </div>
        
        <h2 class="text-2xl font-bold">{{ session.data.user.name }}</h2>
        <p class="text-gray-400">{{ session.data.user.email }}</p>
        
        <div class="pt-6 border-t border-gray-700">
           <!-- Обратите внимание: TypeScript может ругаться на id, если его нет в типах, но обычно он есть -->
           <p class="text-xs text-gray-500 mb-4">ID: {{ session.data.user.id }}</p>
           
           <button 
             @click="handleLogout"
             class="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition cursor-pointer"
           >
             Выйти
           </button>
        </div>
      </div>
      
      <div v-else class="text-gray-500 animate-pulse">
        Загрузка профиля...
      </div>

      <div class="mt-6">
          <NuxtLink to="/" class="text-blue-400 hover:underline">← На главную</NuxtLink>
      </div>
    </div>
  </div>
</template>