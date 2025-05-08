<script setup>
// import AuthTest from './components/AuthTest.vue';
// import { useAuth } from '@/composables/useAuth';
// const { isLoggedIn } = useAuth();
</script>

<template>
  <AuthTest />

  <div class="main-content">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link> |
      <router-link to="/about">About</router-link>
      <span v-if="isLoggedIn">
        | <router-link to="/dashboard">Dashboard</router-link>
      </span>
    </nav>

    <router-view />
  </div>
</template>

<style scoped></style>
