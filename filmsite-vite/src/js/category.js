import "../css/style.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

let kategori = "";

const genreMap = {
    aksiyon: 28,
    aile: 10751,
    animasyon: 16,
    belgesel: 99,
    "bilim-kurgu": 878,
    dram: 18,
    fantastik: 14,
    gerilim: 53,
    gizem: 9648,
    komedi: 35,
    korku: 27,
    macera: 12,
    polisiye: 80,
    romantik: 10749,
    savas: 10752,
    suc: 80,
    tarih: 36,
    western: 37
};


async function getCategoryContent() {

    const genreId = genreMap[kategori];

    const movieresponse = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&with_genres=${genreId}`
    );

    const tvresponse = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=tr-TR&with_genres=${genreId}`
    );

    const movieData = await movieresponse.json();
    const tvData = await tvresponse.json();

    const allContent = [...movieData.results,...tvData.results];

    displayContent(allContent);
    
}

function displayContent(contents) {

    const grid = document.getElementById("kategoriGrid");

    grid.innerHTML = "";

    contents.forEach(item => {

        const title = item.title || item.name;

        grid.innerHTML += `
            <article class="card category-card">
                <img
                    src="https://image.tmdb.org/t/p/w780${item.backdrop_path}"
                    alt="${title}"
                    class="card-image"
                >

                <div class="card-info">
                    <h3 class="card-title">${title}</h3>
                </div>
            </article>
        `;

    });

}

export function loadCategory(kategoriadi) {
    kategori = kategoriadi;

    document.getElementById("kategoriBaslik").textContent =
        kategori.charAt(0).toUpperCase() + kategori.slice(1);
    
    getCategoryContent();
}