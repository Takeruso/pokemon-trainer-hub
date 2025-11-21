import { useState, useEffect } from 'react';
import { getAllItems, addItem, updateItem, deleteItem, Pokemon } from './useDB';

export function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function initializeData() {
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
            comment:
              'What is your favourite UI framework? Bootstrap? Tailwind?',
            likes: 1,
          },
        ];

        for (const item of sampleData) {
          await addItem(item);
        }

        console.log('✅ Sample data injected into MongoDB.');
      }

      const refreshedItems = await getAllItems();
      setPokemons(refreshedItems);
    }

    initializeData();
  }, []);

  const addPokemon = async (pokemon: Omit<Pokemon, '_id' | 'likes'>) => {
    const newPokemon = {
      name: pokemon.name,
      comment: pokemon.comment,
      likes: 0,
    };

    await addItem(newPokemon);
    const refreshedItems = await getAllItems();
    setPokemons(refreshedItems);
  };

  const editPokemon = async (pokemon: Pokemon) => {
    await updateItem(pokemon);
    const refreshedItems = await getAllItems();
    setPokemons(refreshedItems);
  };

  const deletePokemon = async (id: string) => {
    await deleteItem(id);
    setPokemons((prev) => prev.filter((p) => p._id !== id));
  };

  const likePokemon = async (id: string) => {
    const target = pokemons.find((p) => p._id === id);
    if (target) {
      const updatedPokemon = { ...target, likes: target.likes + 1 };
      console.log('🧪 debug: Liked ID =', id);
      await updateItem(updatedPokemon);
      setPokemons((prev) =>
        prev.map((p) => (p._id === id ? updatedPokemon : p)),
      );
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
