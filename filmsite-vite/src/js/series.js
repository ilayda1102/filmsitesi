import "../css/style.css";

const seriesGrid = document.getElementById("seriesGrid");
console.log(seriesGrid);

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function createSeriesCard(series) {
    return `
        <div class="card portrait-card popular-series-card">
            <img
                class="card-image"
                src="https://image.tmdb.org/t/p/w500${series.poster_path}"
                alt="${series.name}"
            >

            <div class="card-info">
                <h3 class="card-title">${series.name}</h3>
                
                <p class="card-description">
                    ⭐ ${series.vote_average.toFixed(1)}
                </p>
            </div>
        </div>
    `;
}

async function getSeries() {
    const response1 = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const response2 = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=tr-TR&page=2`
    );

    const data1 = await response1.json();
    const data2 = await response2.json();

    const series = [...data1.results, ...data2.results];

    series
        .filter(series => !series.adult)
        .forEach(series => {
            seriesGrid.innerHTML += createSeriesCard(series);
        });
}
 
getSeries();