<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h1>Dashboard Hub</h1>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        <PokemonForm :initial-data="newPokemon" @save="addPokemon" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        <SearchBar v-model="searchQuery" />
      </div>
    </div>

    <div class="row">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="col-12">
        <PokemonCard
          :pokemon="pokemon"
          @like="likePokemon"
          @delete="deletePokemon"
          @edit="editPokemon"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { useAuth } from '@/composables/useAuth';
import { usePokemons } from '@/composables/usePokemons';

import PokemonForm from '../components/PokemonForm.vue';
import PokemonCard from '../components/PokemonCard.vue';
import SearchBar from '../components/SearchBar.vue';

// const { currentUser } = useAuth(); // Unused variable

// const userId = currentUser.id; // Unused variable
const { pokemons, addPokemon, deletePokemon, editPokemon, likePokemon } =
  usePokemons();

const searchQuery = ref('');

const filteredPokemons = computed(() =>
  pokemons.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const newPokemon = ref({ name: '', comment: '', isFavorite: false });

// const startEdit = (pokemon) => {
//   newPokemon.value = { ...pokemon };
//   isEditing.value = true;
// };
</script>
