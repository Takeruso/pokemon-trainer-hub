<template>
  <div class="about-content">
    <h1>About You</h1>

    <div>
      <label>Trainer Name:</label>
      <input
        v-model="name"
        placeholder="Enter your trainer name"
        class="form-input"
      />
    </div>

    <div>
      <label>Favorite Pokémon Type:</label>
      <select v-model="selectedType" class="form-input">
        <option disabled value="">Please select one</option>
        <option>Fire</option>
        <option>Water</option>
        <option>Grass</option>
        <option>Electric</option>
        <option>Psychic</option>
        <option>Rock</option>
        <option>Dragon</option>
      </select>
    </div>

    <div v-if="selectedType">
      <h3>{{ displayName }}, your favorite type is: {{ selectedType }}</h3>
      <img :src="typeImage" alt="Type image" class="type-image" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const name = ref('');
const selectedType = ref('');

// fallback if no name provided
const displayName = computed(() =>
  name.value.trim() !== '' ? name.value : 'Trainer'
);

const typeImage = computed(() => {
  const urls = {
    Fire: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    Water:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    Grass:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    Electric:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    Psychic:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    Rock: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png',
    Dragon:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  };
  return urls[selectedType.value] || '';
});
</script>

<style scoped>
.about-content {
  text-align: center;
}

/* reuse common form input style */
.form-input {
  margin: 10px 0;
  padding: 0.5em;
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  font-size: 1em;
  width: 60%;
}

.form-input:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 5px var(--secondary-color);
}

.type-image {
  width: 200px;
  height: auto;
  margin-top: 20px;
  transition: transform 0.3s;
}

.type-image:hover {
  transform: scale(1.1) rotate(5deg);
}
</style>
