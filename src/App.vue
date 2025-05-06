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

<style scoped>
/* nav {
  padding: 1em;
}
nav a {
  margin: 0 0.5em;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-exact-active {
  font-weight: bold;
} */
</style>

<!-- 7b5e2c4017154db19bf82d3581f02303 -->
