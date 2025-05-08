<template>
  <div>
    <h2>Sign Up</h2>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button @click="handleSignup">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const username = ref('');
const password = ref('');
const error = ref('');
const { register } = useAuth();

async function handleSignup() {
  if (!username.value || !password.value) {
    error.value = 'Please enter username and password';
    return;
  }
  try {
    await register(username.value, password.value);
    error.value = 'Signup successful. You can now log in.';
  } catch {
    error.value = 'User already exists';
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
