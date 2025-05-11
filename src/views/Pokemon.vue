<template>
  <div class="main-content--pokemon">
    <h1>Pokémon Spotlight</h1>

    <!-- Search input -->
    <input
      v-model="searchQuery"
      class="searchPokemon"
      placeholder="Search Pokémon..."
    />
    <button v-if="searchQuery" @click="clearSearch">Clear Search</button>

    <!-- Loading / error handling -->
    <div v-if="loading">Loading Pokémon...</div>
    <div v-else-if="error">{{ error }}</div>

    <!-- Pokémon list -->
    <div v-else>
      <div
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.name"
        :class="['pokemon-card', 'border-' + getPrimaryType(pokemon.type)]"
      >
        <h3>{{ capitalize(pokemon.name) }}</h3>
        <img
          :src="pokemon.image"
          :alt="`${pokemon.name} image`"
          class="pokemon-image"
        />
        <p class="pokemon-type">Type: {{ pokemon.type }}</p>
      </div>

      <!-- Pagination controls -->
      <div class="pagination-container">
        <button
          class="pagination"
          @click="prevPage"
          :disabled="currentPage === 1 || loading"
          aria-label="Previous page"
        >
          Prev
        </button>

        <span class="page-info"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >

        <button
          class="pagination"
          @click="nextPage"
          :disabled="currentPage === totalPages || loading"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const pokemons = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 6;
const loading = ref(false);
const error = ref('');
const totalPages = ref(100); // Currently hardcoded; ideally calculated dynamically

// Fetches a page of Pokémon (basic info + details)
async function fetchPokemonPage(offset, limit) {
  try {
    loading.value = true;
    error.value = '';

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
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
  } catch (err) {
    console.error('Failed to fetch Pokémon data:', err);
    error.value = 'Failed to load Pokémon. Please try again later.';
  } finally {
    loading.value = false;
  }
}

// React to page change
watch(currentPage, (newPage) => {
  const offset = (newPage - 1) * itemsPerPage;
  fetchPokemonPage(offset, itemsPerPage);
});

// React to search input change
watch(searchQuery, async (newQuery) => {
  if (newQuery.trim() === '') {
    const offset = (currentPage.value - 1) * itemsPerPage;
    fetchPokemonPage(offset, itemsPerPage);
  } else {
    // Load large batch only once for searching
    if (pokemons.value.length < 1000) {
      loading.value = true;
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
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
      } catch (err) {
        error.value = 'Failed to load Pokémon.';
      } finally {
        loading.value = false;
      }
    }
    currentPage.value = 1;
  }
});

// Initial load
onMounted(() => {
  fetchPokemonPage(0, itemsPerPage);
});

// Filter Pokémon by name or type
const filteredPokemons = computed(() => {
  return pokemons.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Pagination logic (note: filteredPokemons already provides search results)
const paginatedPokemons = computed(() => {
  return filteredPokemons.value;
});

// Utilities
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function getPrimaryType(typeString) {
  return typeString.split(', ')[0].toLowerCase();
}

function clearSearch() {
  searchQuery.value = '';
  currentPage.value = 1;
  const offset = (currentPage.value - 1) * itemsPerPage;
  fetchPokemonPage(offset, itemsPerPage);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<style scoped>
/* Special class to adjust max width only for the Pokémon page */
.main-content--pokemon {
  max-width: 1000px;
  margin: 0 auto;
}

/* Pokémon image style with hover effect */
.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

.pokemon-image:hover {
  transform: scale(1.1) rotate(5deg);
}

/* Layout for Pokémon cards: flexbox for horizontal alignment */
.pokemon-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100px;
}

.pokemon-card h3 {
  margin-right: 20px;
}

.pokemon-type {
  margin-left: 20px;
  text-align: center;
}

/* Responsive layout: stack vertically on small screens */
@media (max-width: 767px) {
  .pokemon-card {
    flex-direction: column;
    text-align: center;
  }

  .pokemon-image {
    margin-bottom: 10px;
  }

  .pokemon-card h3,
  .pokemon-type {
    margin: 5px 0;
  }
}

/* Responsive layout for tablets (optional) */
@media (min-width: 768px) and (max-width: 1024px) {
  .pokemon-card {
    padding: 15px;
  }

  .pokemon-card h3 {
    font-size: 1.2em;
  }

  .pokemon-type {
    font-size: 1em;
  }
}

/* Pagination button styling */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.pagination {
  background-color: var(--secondary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
}

.pagination:hover:not(:disabled) {
  background-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.pagination:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.page-info {
  font-size: 1em;
}
</style>
