<template>
  <div>
    <h2>About You</h2>

    <div>
      <label>Trainer Name:</label>
      <input v-model="name" placeholder="Enter your trainer name" />
    </div>

    <div>
      <label>Favorite Pokémon Type:</label>
      <select v-model="selectedType">
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
      <h3>{{ name }}, your favorite type is: {{ selectedType }}</h3>
      <img :src="typeImage" alt="Type image" width="300" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const name = ref('');
const selectedType = ref('');

// const typeImage = computed(() => {
//   switch (selectedType.value) {
//     case 'Fire':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'; // ヒトカゲ
//     case 'Water':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png'; // ゼニガメ
//     case 'Grass':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'; // フシギダネ
//     case 'Electric':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'; // ピカチュウ
//     case 'Psychic':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'; // ミュウツー
//     case 'Rock':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png'; // イワーク
//     case 'Dragon':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png'; // カイリュー
//     default:
//       return '';
//   }
// });

// const typeImage = computed(() => {
//   switch (selectedType.value) {
//     case 'Fire':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'; // ヒトカゲ
//     case 'Water':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg'; // ゼニガメ
//     case 'Grass':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'; // フシギダネ
//     case 'Electric':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'; // ピカチュウ
//     case 'Psychic':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg'; // ミュウツー
//     case 'Rock':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/95.svg'; // イワーク
//     case 'Dragon':
//       return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/149.svg'; // カイリュー
//     default:
//       return '';
//   }
// });

const typeImage = computed(() => {
  switch (selectedType.value) {
    case 'Fire':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png';
    case 'Water':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png';
    case 'Grass':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
    case 'Electric':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
    case 'Psychic':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png';
    case 'Rock':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png';
    case 'Dragon':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png';
    default:
      return '';
  }
});
</script>
