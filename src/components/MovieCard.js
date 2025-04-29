// src/components/MovieCard.jsx
import React from 'react';
import './MovieCard.css';

export default function MovieCard({ movie, toggleFavorite, favorites }) {
    const { Title, Year, imdbID, Poster, Type, Plot } = movie;

    const isFavorite = favorites.some((fav) => fav.imdbID === imdbID);

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                    alt={Title}
                />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{Title}</h3>
                <p className="movie-year">{Year} ({Type})</p>
                <p className="movie-description">{Plot && Plot.length > 120 ? `${Plot.substring(0, 120)}...` : Plot}</p>
                <button
                    className={`favorite-btn ${isFavorite ? 'remove' : 'add'}`}
                    onClick={() => toggleFavorite(movie)}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
}
