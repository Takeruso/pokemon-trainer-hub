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
        <button>Log In</button>
      </router-link>
      <router-link to="/signup" style="margin-left: 10px">
        <button>Sign Up</button>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
