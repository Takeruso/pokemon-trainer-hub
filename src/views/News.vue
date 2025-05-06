<template>
  <div>
    <h2>Pokémon Spotlight</h2>

    <input v-model="searchQuery" placeholder="Search Pokémon..." />

    <div
      v-for="pokemon in paginatedPokemons"
      :key="pokemon.name"
      :class="[
        'pokemon-card',
        'border-' + pokemon.type.split(', ')[0].toLowerCase(),
      ]"
    >
      <h3>{{ pokemon.name }}</h3>
      <img :src="pokemon.image" alt="Pokemon image" class="pokemon-image" />
      <p class="pokemon-type">Type: {{ pokemon.type }}</p>
    </div>

    <!-- <div class="pokemon-card">
      <h3>{{ pokemon.name }}</h3>
      <img :src="pokemon.image" class="pokemon-image" />
      <p class="pokemon-type">Type: {{ pokemon.type }}</p>
    </div> -->

    <div>
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const pokemons = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 6;

onMounted(async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await res.json();

    const detailedData = await Promise.all(
      data.results.map(async (item) => {
        const res = await fetch(item.url);
        const details = await res.json();
        return {
          name: item.name,
          image: details.sprites.front_default,
          type: details.types.map((t) => t.type.name).join(', '),
        };
      })
    );

    pokemons.value = detailedData;
  } catch (error) {
    console.error('Failed to fetch Pokémon data:', error);
  }
});

const filteredPokemons = computed(() => {
  return pokemons.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredPokemons.value.length / itemsPerPage);
});

const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPokemons.value.slice(start, start + itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>

<style>
.news-card {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}
.news-image {
  max-width: 150px;
  height: auto;
  display: block;
  margin: 10px auto;
}
</style>
