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
  const totalPages = 100;

  async function fetchPokemonPage(offset: number, limit: number) {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = await res.json();

      const detailedData = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const res = await fetch(item.url);
          const details = await res.json();
          return {
            name: item.name,
            image: details.sprites.front_default,
            type: details.types.map((t: any) => t.type.name).join(', '),
          };
        })
      );

      setPokemons(detailedData);
    } catch (err) {
      console.error('Failed to fetch Pokémon data:', err);
      setError('Failed to load Pokémon. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    fetchPokemonPage(offset, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    async function loadAllForSearch() {
      if (searchQuery.trim() === '') {
        const offset = (currentPage - 1) * itemsPerPage;
        fetchPokemonPage(offset, itemsPerPage);
      } else {
        if (pokemons.length < 100) {
          setLoading(true);
          try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
            const data = await res.json();
            const detailedData = await Promise.all(
              data.results.map(async (item: { name: string; url: string }) => {
                const res = await fetch(item.url);
                const details = await res.json();
                return {
                  name: item.name,
                  image: details.sprites.front_default,
                  type: details.types.map((t: any) => t.type.name).join(', '),
                };
              })
            );
            setPokemons(detailedData);
          } catch (err) {
            setError('Failed to load Pokémon.');
          } finally {
            setLoading(false);
          }
        }
        setCurrentPage(1);
      }
    }
    loadAllForSearch();
  }, [searchQuery]);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pokemons, searchQuery]);

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
      </div>

      <div className="row">
        <div className="col-12">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchPokemon col-12"
            placeholder="Search Pokémon..."
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>Clear Search</button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {loading && <div>Loading Pokémon...</div>}
          {error && <div>{error}</div>}

          {!loading && !error && (
            <div>
              {filteredPokemons.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className={`pokemon-card border-${getPrimaryType(pokemon.type)}`}
                >
                  <h3>{capitalize(pokemon.name)}</h3>
                  <img
                    src={pokemon.image}
                    alt={`${pokemon.name} image`}
                    className="pokemon-image"
                  />
                  <p className="pokemon-type">Type: {pokemon.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="row">
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
    </div>
  );
}

export default Pokemon;
