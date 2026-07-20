const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

async function getPopularMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=1`
    );
    const data = await response.json();

    console.log(data.results);
}
getPopularMovies();

