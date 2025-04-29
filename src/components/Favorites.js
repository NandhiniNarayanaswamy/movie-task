// src/components/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Favorites({ favorites }) {
    if (favorites.length === 0) {
        return <div className="favorites-empty">No favorite movies yet!</div>;
    }

    return (
        <div className="favorites-page">
            <h1>Your Favorite Movies</h1>
            <div className="movie-grid">
                {favorites.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                            alt={movie.Title}
                            className="movie-poster"
                        />
                        <div className="movie-details">
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                            <Link to={`/movie/${movie.imdbID}`} className="view-details">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
