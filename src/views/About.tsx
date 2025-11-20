import React, { useState, useMemo } from 'react';

const types = ['Mountain', 'Ocean'];

const typeEmojis: Record<string, string> = {
  Mountain: '⛰️',
  Ocean: '🌊',
};

const typeData: Record<string, { image: string; recommended: string }> = {
  Mountain: {
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
    recommended: 'Groudon',
  },
  Ocean: {
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png',
    recommended: 'Kyogre',
  },
};

function About() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const displayName = useMemo(() => {
    const first = firstName.trim();
    const last = lastName.trim();
    return first || last ? `${first} ${last}`.trim() : 'Trainer';
  }, [firstName, lastName]);

  const typeImage = useMemo(() => {
    return typeData[selectedType]?.image || '';
  }, [selectedType]);

  const recommendedPokemon = useMemo(() => {
    return typeData[selectedType]?.recommended || '';
  }, [selectedType]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          <h1>About This App</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p>
            Welcome to the Hoenn Pokémon Selector! Enter your name and pick your
            side: Mountain or Ocean. We'll show you which legendary Pokémon
            matches you!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center gap-3 flex-wrap text-center">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="form-input w-auto"
              style={{ minWidth: '200px' }}
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="form-input w-auto"
              style={{ minWidth: '200px' }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="form-group d-flex justify-content-center gap-3 flex-wrap">
            <label>Select your favorite type:</label>
            <div className="radio-group">
              {types.map((type) => (
                <label
                  key={type}
                  className={`radio-option ${selectedType === type ? 'selected' : ''} ${type.toLowerCase()}`}
                >
                  <input
                    type="radio"
                    value={type}
                    checked={selectedType === type}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <span>{typeEmojis[type]} {type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedType && (
        <div className="row">
          <div className="col-12">
            <div className="result">
              <h3>
                Welcome, {displayName}! You chose <strong>{selectedType}</strong>.
              </h3>
              <p>
                You might like: <strong>{recommendedPokemon}</strong>
              </p>
              {typeImage && (
                <img
                  src={typeImage}
                  alt={`${selectedType} Pokémon`}
                  className="type-image"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
