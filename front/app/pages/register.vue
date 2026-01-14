<script setup lang="ts">
import { signUp } from '~/lib/auth-client';

const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  await signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
    callbackURL: '/profile' // Куда редиректить после успеха
  }, {
    onRequest: () => { loading.value = true },
    onResponse: () => { loading.value = false },
    onError: (ctx) => { alert(ctx.error.message) }
  });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <div class="w-full max-w-md bg-gray-800 rounded-xl p-8 shadow-lg text-white">
      <h2 class="text-2xl font-bold mb-6 text-center">Регистрация</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm mb-1 text-gray-400">Имя</label>
          <input v-model="name" type="text" required 
            class="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" 
          />
        </div>
        
        <div>
          <label class="block text-sm mb-1 text-gray-400">Email</label>
          <input v-model="email" type="email" required 
            class="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" 
          />
        </div>
        
        <div>
          <label class="block text-sm mb-1 text-gray-400">Пароль</label>
          <input v-model="password" type="password" required 
            class="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" 
          />
        </div>

        <button 
          :disabled="loading"
          type="submit" 
          class="w-full py-3 bg-green-600 hover:bg-green-700 rounded font-bold transition disabled:opacity-50"
        >
          {{ loading ? 'Загрузка...' : 'Создать аккаунт' }}
        </button>
      </form>
      
      <p class="mt-4 text-center text-gray-400 text-sm">
        Уже есть аккаунт? <NuxtLink to="/login" class="text-blue-400 hover:underline">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>