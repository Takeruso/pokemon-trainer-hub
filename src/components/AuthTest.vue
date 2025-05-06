<template>
  <div>
    <h2>Auth Test</h2>

    <div v-if="!isLoggedIn">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="handleLogin">Login</button>
      <button @click="handleRegister">Register</button>

      <p v-if="loginFailed" style="color: red">Login failed. Try again.</p>
      <p
        v-if="registerMessage"
        :style="{
          color: registerMessage.includes('success') ? 'green' : 'red',
        }"
      >
        {{ registerMessage }}
      </p>
    </div>

    <div v-else>
      <p>Welcome, {{ currentUser }}!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { isLoggedIn, currentUser, login, logout, register } = useAuth();

const username = ref('');
const password = ref('');
const loginFailed = ref(false);
const registerMessage = ref('');

async function handleLogin() {
  const success = await login(username.value, password.value);
  loginFailed.value = !success;
  if (success) {
    username.value = '';
    password.value = '';
    registerMessage.value = '';
  }
}

async function handleRegister() {
  try {
    await register(username.value, password.value);
    registerMessage.value = 'Registration successful! You can now log in.';
    username.value = '';
    password.value = '';
  } catch (error) {
    registerMessage.value = `Registration failed: ${error.message}`;
  }
}
</script>
