// src/components/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbApi';

export default function MovieDetail({ toggleFavorite, favorites }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchMovie();
    }, [id]);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!movie) return <div>Loading...</div>;

    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    return (
        <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{movie.Title} ({movie.Year})</h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} alt={movie.Title} style={{ width: '300px' }} />
                <div>
                    <p><strong>Genre:</strong> {movie.Genre || 'N/A'}</p>
                    <p><strong>Director:</strong> {movie.Director || 'N/A'}</p>
                    <p><strong>Writer:</strong> {movie.Writer || 'N/A'}</p>
                    <p><strong>Actors:</strong> {movie.Actors || 'N/A'}</p>
                    <p><strong>Plot:</strong> {movie.Plot || 'No plot available'}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime || 'N/A'}</p>
                    <p><strong>Language:</strong> {movie.Language || 'N/A'}</p>
                    <p><strong>Country:</strong> {movie.Country || 'N/A'}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating || 'N/A'}</p>

                    {movie.Ratings && movie.Ratings.length > 0 ? (
                        <div>
                            <strong>Ratings:</strong>
                            <ul>
                                {movie.Ratings.map((r, index) => (
                                    <li key={index}>{r.Source}: {r.Value}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No ratings available</p>
                    )}

                    <button onClick={() => toggleFavorite(movie)} style={{ marginTop: '1rem' }}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    );
}
