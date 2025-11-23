import SearchBar from '../components/SearchBar';
import React, { useState, useEffect, useMemo } from 'react';

interface PokemonData {
  name: string;
  image: string;
  type: string;
}

function Pokemon() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const itemsPerPage = 6;

  const fetchPokemonDetail = async (item: { name: string; url: string }) => {
    const res = await fetch(item.url);
    const details = await res.json();
    return {
      name: item.name,
      image: details.sprites.front_default,
      type: details.types.map((t: any) => t.type.name).join(', '),
    };
  };

  // ① Load all Pokémon once on mount
  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        setError('');

        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await res.json();

        const detailedData = await Promise.all(data.results.map(fetchPokemonDetail));

        setPokemons(detailedData);
      } catch (err) {
        console.error(err);
        setError('Failed to load Pokémon');
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  // ② Reset page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // ③ Search filter
  const filteredPokemons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return pokemons;

    return pokemons.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q),
    );
  }, [pokemons, searchQuery]);

  // ④ Total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPokemons.length / itemsPerPage),
  );

  // ⑤ Pagination (slice)
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPokemons.slice(start, start + itemsPerPage);
  }, [filteredPokemons, currentPage]);

  const getPrimaryType = (typeString: string) => {
    return typeString.split(', ')[0].toLowerCase();
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12 mt-3">Pokémon Spotlight</h1>
        <p className="text-muted">
          This page fetches data from the public PokéAPI and shows a list of
          Pokémon.
        </p>
      </div>

      <div className="row">
        <div className="col-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Pokémon..."
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {loading && <div>Loading Pokémon...</div>}
          {error && <div>{error}</div>}

          {!loading && !error && (
            <div>
              {paginated.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className={`pokemon-card border-${getPrimaryType(pokemon.type)}`}
                >
                  <h3>{capitalize(pokemon.name)}</h3>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <p className="pokemon-type">Type: {pokemon.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-12">
          <div className="pagination-container">
            <button
              className="pagination"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              aria-label="Previous page"
            >
              Prev
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="pagination"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
