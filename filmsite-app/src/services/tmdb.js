const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies() {
    const response = await fetch (
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=1`
    );
    const data = await response.json();

    return data.results;
}

export async function getMovieDetails(id) {
    const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=tr-TR`
    );

    const data = await response.json();
    return data;
}

export async function getMovieCredits(id) {
    const response = await fetch(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=tr-TR`
    );

    const data = await response.json();
    return data.cast;
}

export async function getMoviesByGenre(genreId) {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&with_genres=${genreId}`
    )
    const data = await response.json();
    return data.results;
}

export async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    return data.results.filter(
        (item) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            item.poster_path
    );
}