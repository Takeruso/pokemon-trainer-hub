import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
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
    <BrowserRouter basename="/cos30043/s102784225/">
      <div className="main-content">
        <nav>
          <NavLink to="/" end>Home</NavLink> |{' '}
          <NavLink to="/news">News</NavLink> |{' '}
          <NavLink to="/about">About</NavLink>
          {isLoggedIn && (
            <span>
              {' '}| <NavLink to="/dashboard">Dashboard</NavLink> |{' '}
              <NavLink to="/pokemon">Pokemon</NavLink>
              {' '}| <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
            </span>
          )}
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
    </BrowserRouter>
  );
}

export default App;
