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
    <>
      <div className="bg-layer" />

      <div className="content-wrapper">
        <nav className="nav-bar">
          <div className="nav-links">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <span>|</span>
            <NavLink to="/news" className="nav-link">
              News
            </NavLink>
            <span>|</span>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>

            {isLoggedIn ? (
              <>
                <span>|</span>
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
                <span>|</span>
                <NavLink to="/pokemon" className="nav-link">
                  Pokemon
                </NavLink>
                <span>|</span>
                <button onClick={logout} className="nav-link nav-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <span>|</span>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <span>|</span>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </>
            )}
          </div>

          <div className="nav-user">
            {isLoggedIn && (
              <span className="nav-welcome">Welcome, {currentUser}</span>
            )}
          </div>
        </nav>
        <div className="main-content">
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
      </div>
    </>
  );
}

export default App;
