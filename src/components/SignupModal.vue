<template>
  <div class="modal">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useAuth } from '@/composables/useAuth';

const username = ref('');
const password = ref('');
const { login } = useAuth();

async function handleLogin() {
  const success = await login(username.value, password.value);
  alert(success ? 'Login successful!' : 'Login failed.');
}
</script>
