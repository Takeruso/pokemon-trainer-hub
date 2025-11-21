import React from 'react';
import {
  Routes,
  Route,
  NavLink,
  Link,
  // Navigate,
} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import Pokemon from './views/Pokemon';
import News from './views/News';
import About from './views/About';

function App() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="main-content">
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>{' '}
        |<NavLink to="/news">News</NavLink> |
        <NavLink to="/about">About</NavLink>
        {isLoggedIn ? (
          <>
            {' '}
            | <NavLink to="/dashboard">Dashboard</NavLink> |{' '}
            <NavLink to="/pokemon">Pokemon</NavLink> |{' '}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            {' '}
            | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/about" />}
          />
          <Route
            path="/pokemon"
            element={isLoggedIn ? <Pokemon /> : <Navigate to="/about" />}
          /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
