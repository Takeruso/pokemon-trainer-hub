import React, { useState, useMemo } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import PokemonForm from '../components/PokemonForm';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { Pokemon } from '../hooks/useDB';

function Dashboard() {
  const { pokemons, addPokemon, deletePokemon, editPokemon, likePokemon } =
    usePokemons();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [pokemons, searchQuery],
  );

  const handleAddPokemon = async (data: { name: string; comment: string }) => {
    await addPokemon(data);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Dashboard Hub</h1>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <PokemonForm
            initialData={{ name: '', comment: '' }}
            onSave={handleAddPokemon}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      <div className="row">
        {filteredPokemons.map((pokemon) => (
          <div className="col-12" key={pokemon._id}>
            <PokemonCard
              pokemon={pokemon}
              onLike={likePokemon}
              onDelete={deletePokemon}
              onEdit={editPokemon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
