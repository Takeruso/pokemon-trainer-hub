<template>
  <div class="container mt-4">
    <p>Welcome, {{ currentUser }}! This page is only for logged-in users.</p>

    <!-- ポケモン追加フォーム -->
    <PokemonForm :initial-data="newPokemon" @save="addPokemon" />

    <!-- 検索バー -->
    <SearchBar v-model="searchQuery" />

    <!-- ポケモン表示カード一覧 -->
    <div v-for="pokemon in filteredPokemons" :key="pokemon.id">
      <PokemonCard
        :pokemon="pokemon"
        @like="likePokemon"
        @delete="deletePokemon"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { usePokemons } from '@/composables/usePokemons'; // ← useLinks → usePokemons に修正

import PokemonForm from '../components/PokemonForm.vue';
import PokemonCard from '../components/PokemonCard.vue';
import SearchBar from '../components/SearchBar.vue';

const { currentUser } = useAuth();

// ← 必要ならログインユーザーIDを取得して使う
const userId = 'takeru'; // または currentUser.id
const {
  pokemons,
  addPokemon,
  deletePokemon,
  likePokemon, // ← これも解体しておく！
} = usePokemons();

// 検索バーの文字列
const searchQuery = ref('');

// ポケモンを検索してフィルタ
const filteredPokemons = computed(() =>
  pokemons.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// フォーム用の新規ポケモンデータ
const newPokemon = ref({ name: '', type: '', isFavorite: false });

// 編集機能を使いたいときに使う
const editPokemon = (pokemon) => {
  newPokemon.value = { ...pokemon };
};
</script>
