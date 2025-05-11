<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3">
        <h2>Login</h2>
      </div>
      <div class="col-12 mb-3">
        <input class="form-input" v-model="username" placeholder="Username" />
      </div>
      <div class="col-12 mb-3">
        <input
          class="form-input"
          type="password"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <div class="col-12">
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>

    <div class="col-12">
      <button @click="handleLogin">Submit</button>
    </div>
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
