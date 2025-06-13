import { ref, onMounted } from 'vue';
import { getAllItems, addItem, updateItem, deleteItem } from './useDB';

export function usePokemons() {
  const pokemons = ref([]);

  onMounted(async () => {
    const allItems = await getAllItems();

    if (allItems.length === 0) {
      const sampleData = [
        {
          name: 'Alice',
          comment: 'Vue 3 is amazing! Loving the Composition API.',
          likes: 4,
        },
        {
          name: 'Bob',
          comment: 'Anyone tried Pinia instead of Vuex?',
          likes: 2,
        },
        {
          name: 'Charlie',
          comment: 'What’s your favourite UI framework? Bootstrap? Tailwind?',
          likes: 1,
        },
      ];

      for (const item of sampleData) {
        await addItem(item);
      }

      console.log('✅ Sample data injected into MongoDB.');
    }

    pokemons.value = await getAllItems();
  });

  const addPokemon = async (pokemon) => {
    const newPokemon = {
      name: pokemon.name,
      comment: pokemon.comment,
      likes: 0,
    };

    await addItem(newPokemon);
    pokemons.value = await getAllItems();
  };

  const editPokemon = async (pokemon) => {
    const plain = JSON.parse(JSON.stringify(pokemon));
    await updateItem(plain);
    pokemons.value = await getAllItems();
  };

  const deletePokemon = async (id) => {
    await deleteItem(id);
    pokemons.value = pokemons.value.filter((p) => p._id !== id);
  };

  const likePokemon = async (id) => {
    const target = pokemons.value.find((p) => p._id === id);
    if (target) {
      target.likes++;
      console.log('🧪 debug: Liked ID =', id);
      const plain = JSON.parse(JSON.stringify(target));
      await updateItem(plain);
    }
  };
  return {
    pokemons,
    addPokemon,
    editPokemon,
    deletePokemon,
    likePokemon,
  };
}
