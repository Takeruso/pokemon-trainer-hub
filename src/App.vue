<script setup></script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/dashboard">Dashboard</router-link> | -->
      <router-link to="/news">News</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

    <!-- ページコンポーネントを表示する場所 -->
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 1em;
}
nav a {
  margin: 0 0.5em;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
