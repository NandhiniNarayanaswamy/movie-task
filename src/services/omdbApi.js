// src/services/omdbApi.js

const API_KEY = 'ccea2ee5';
const BASE_URL = 'https://www.omdbapi.com/';

// Function to fetch movies based on the search query
export async function searchMovies(query, page = 1, type = '') {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}` + (type ? `&type=${type}` : '');

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            return {
                movies: data.Search,
                totalResults: parseInt(data.totalResults, 10)
            };
        } else {
            throw new Error(data.Error || "Unable to fetch movie results");
        }
    } catch (err) {
        throw new Error(err.message || "Unable to fetch movie results");
    }
}

// Function to fetch detailed movie data based on IMDB ID
export async function getMovieDetails(id) {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            return data;
        } else {
            throw new Error(data.Error || "Unable to fetch movie details");
        }
    } catch (err) {
        throw new Error(err.message || "Unable to fetch movie details");
    }
}
