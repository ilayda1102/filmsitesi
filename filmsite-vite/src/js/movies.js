import "../css/style.css";

const moviesGrid = document.getElementById("moviesGrid");
console.log(moviesGrid);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function createMovieCard(movie) {
    return `
        <div class="card portrait-card popular-movie-card">
            <img
                class="card-image"
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
            >

            <div class="card-info">
                <h3 class="card-title">${movie.title}</h3>
                
                <p class="card-description">
                    ⭐ ${movie.vote_average.toFixed(1)}
                </p>
            </div>
        </div>
    `;
}

async function getMovies() {
    const response2 = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=2`
    );

    const response3 = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=3`
    );

    const data2 = await response2.json();
    const data3 = await response3.json();

    const movies = [...data2.results, ...data3.results];

    movies
        .filter(movie => !movie.adult)
        .forEach(movie => {
            moviesGrid.innerHTML += createMovieCard(movie);
        });
}

getMovies();