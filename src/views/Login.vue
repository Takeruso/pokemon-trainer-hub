<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button @click="handleLogin">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const username = ref('');
const password = ref('');
const error = ref('');
const { login } = useAuth();

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = 'Please enter username and password';
    return;
  }
  const ok = await login(username.value, password.value);
  error.value = ok ? 'Login successful' : 'Invalid username or password';
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
