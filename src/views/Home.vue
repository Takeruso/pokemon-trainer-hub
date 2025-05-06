<template>
  <div>
    <h1>Pokémon Trainer Hub</h1>
    <p>
      Welcome, Trainer! Here you can explore your favorite Pokémon, check their
      stats, and prepare for your next big battle.
    </p>
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      alt="Pikachu"
      width="200"
    />
    <div style="margin-top: 20px">
      <router-link to="/login">
        <button>🔑 Log In</button>
      </router-link>
      <router-link to="/signup" style="margin-left: 10px">
        <button>📝 Sign Up</button>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.main-content {
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%);
  border-radius: 12px;
  padding: 40px;
  max-width: 800px;
  margin: 50px auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 3px solid #1e3a8a;
}
</style>
