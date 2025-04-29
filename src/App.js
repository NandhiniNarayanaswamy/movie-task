// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Favorites from './components/Favorites'; // New page for favorites
import './App.css';

export default function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || [] // Retrieve favorites from localStorage
  );

  // Toggle function to add or remove a movie from favorites
  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some(fav => fav.imdbID === movie.imdbID)
      ? favorites.filter(fav => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Store favorites in localStorage
  };

  return (
    <Router>
      <div className="app">
        {/* Navigation Header */}
        <header className="header">
          <Link to="/" className="logo">Movie Search</Link>
          <Link to="/favorites" className="favorites-link">Favorites</Link> {/* Link to favorites page */}
        </header>

        <Routes>
          <Route path="/" element={<Home toggleFavorite={toggleFavorite} favorites={favorites} />} />
          <Route path="/movie/:id" element={<MovieDetail toggleFavorite={toggleFavorite} favorites={favorites} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} /> {/* Favorites page route */}
        </Routes>
      </div>
    </Router>
  );
}
