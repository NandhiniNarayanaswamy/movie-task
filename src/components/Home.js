// src/components/Home.jsx
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { searchMovies } from '../services/omdbApi';

export default function Home({ toggleFavorite, favorites }) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const handleSearch = async (pageNumber = 1) => {
        try {
            const result = await searchMovies(query, pageNumber, type);
            setMovies(result.movies);
            setTotalResults(result.totalResults);
            setPage(pageNumber);
            setError(null);
        } catch (err) {
            setError(err.message);
            setMovies([]);
            setTotalResults(0);
        }
    };

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(1)}
                />
                <select value={type} onChange={(e) => setType(e.target.value)} className="dropdown">
                    <option value="">All Types</option>
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                    <option value="episode">Episodes</option>
                </select>
                <button onClick={() => handleSearch(1)} className="submit-btn">Search</button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} toggleFavorite={toggleFavorite} favorites={favorites} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => handleSearch(page - 1)} disabled={page === 1}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => handleSearch(page + 1)} disabled={page === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
}
