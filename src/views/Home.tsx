import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12 mt-3">Pokémon Trainer Hub</h1>
      </div>

      <div className="row">
        <div className="col-12">
          <p>
            Welcome, Trainer! Here you can explore your favorite Pokémon, check
            their stats, and prepare for your next big battle.
          </p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="image-container">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pikachu"
              width="200"
            />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              alt="Bulbasaur"
              width="200"
            />
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12" style={{ marginTop: '20px' }}>
          <Link to="/login">
            <button>🔑 Log In</button>
          </Link>
          <Link to="/signup" style={{ marginLeft: '10px' }}>
            <button>📝 Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
