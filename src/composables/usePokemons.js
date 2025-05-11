import { ref, onMounted } from 'vue';
import { getAllItems, addItem, updateItem, deleteItem } from './useDB';

export function usePokemons() {
  const pokemons = ref([]);

  onMounted(async () => {
    pokemons.value = await getAllItems();
  });

  const addPokemon = async (pokemon) => {
    const newPokemon = {
      ...pokemon,
      likes: 0,
    };

    const id = await addItem(newPokemon);
    pokemons.value = await getAllItems();
  };

  const deletePokemon = async (id) => {
    await deleteItem(id);
    pokemons.value = pokemons.value.filter((p) => p.id !== id);
  };

  const likePokemon = async (id) => {
    const target = pokemons.value.find((p) => p.id === id);
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
    deletePokemon,
    likePokemon,
  };
}
