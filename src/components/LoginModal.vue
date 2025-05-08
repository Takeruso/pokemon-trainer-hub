<template>
  <div>
    <h2>Login Form</h2>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button @click="handleLogin">Login</button>
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
    error.value = 'Username and password are required.';
    return;
  }
  const success = await login(username.value, password.value);
  if (success) {
    alert('Login successful!');
    // オプション: 成功後にページ遷移やリセット処理を追加
  } else {
    error.value = 'Invalid username or password.';
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin: 0.5rem 0;
}
</style>
