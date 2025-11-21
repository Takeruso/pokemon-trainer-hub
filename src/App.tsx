import React from 'react';
import { Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import Pokemon from './views/Pokemon';
import News from './views/News';
import About from './views/About';

function App() {
  const { isLoggedIn, logout, currentUser } = useAuthContext();

  return (
    <div className="main-content">
      <nav className="nav-bar">
        {/* left side: links */}
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>{' '}
          | <NavLink to="/news">News</NavLink> |{' '}
          <NavLink to="/about">About</NavLink>
          {isLoggedIn ? (
            <>
              {' '}
              | <NavLink to="/dashboard">Dashboard</NavLink> |{' '}
              <NavLink to="/pokemon">Pokemon</NavLink>|{' '}
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              {' '}
              | <Link to="/login">Login</Link> |{' '}
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>

        {/* right side: Welcome (separate CSS target) */}
        <div className="nav-user">
          {isLoggedIn && (
            <>
              <span className="nav-welcome">Welcome, {currentUser}</span>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/about" />}
        />
        <Route
          path="/pokemon"
          element={isLoggedIn ? <Pokemon /> : <Navigate to="/about" />}
        />
      </Routes>
    </div>
  );
}

export default App;
