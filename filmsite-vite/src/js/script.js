/*================
     ARAMA
=================*/
const arama = document.getElementById("arama");
arama.addEventListener("keyup", function() {
    const aranan = arama.value.toLowerCase();
    const kartlar = document.querySelectorAll(".card");
     kartlar.forEach(function(kart) {
        const isim = kart.querySelector(".card-title").textContent.toLowerCase();
        if(isim.includes(aranan)) {
            kart.style.display = "";
        } else {
            kart.style.display = "none";
        }
     });
});

const modal = document.getElementById("movieModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalImdb = document.getElementById("modalImdb");
const modalYear = document.getElementById("modalYear");
const modalGenre = document.getElementById("modalGenre");
const modalDescription = document.getElementById("modalDescription");
const modalTrailer = document.getElementById("modalTrailer");

document.querySelectorAll(".card").forEach(function(card) {
    card.addEventListener("click",function() {
        modal.style.display="flex";

        modalImage.src=this.dataset.image;
        modalTitle.textContent=this.dataset.title;
        modalImdb.textContent=this.dataset.imdb;
        modalYear.textContent=this.dataset.year;
        modalGenre.textContent=this.dataset.genre;
        modalDescription.textContent= this.dataset.description;

        modalTrailer.href=this.dataset.trailer;

    });
});

document.querySelector(".close").addEventListener("click",function() {
    modal.style.display="none";
});

window.addEventListener("click",function(e) {
    if (e.target == modal) {
        modal.style.display="none";
    }
});

/*================
     KATEGORİ
=================*/
const params = new URLSearchParams(window.location.search);
const tur = params.get("tur");

const kategoriBaslik = document.getElementById("kategoriBaslik");
const kategoriAdlari = {
    "aksiyon":"Aksiyon",
    "aile": "Aile",
    "animasyon": "Animasyon",
    "belgesel": "Belgesel",
    "biyografi": "Biyografi",
    "bilim-kurgu": "Bilim Kurgu",
    "cocuk": "Çocuk",
    "dram": "Dram",
    "fantastik": "Fantastik",
    "gerilim": "Gerilim",
    "komedi": "Komedi",
    "korku": "Korku",
    "muzikal": "Müzikal",
    "polisiye": "Polisiye",
    "romantik": "Romantik",
    "romantik-komedi": "Romantik Komedi",
    "suc": "Suç"
};
if (tur && kategoriBaslik) {
    kategoriBaslik.textContent = kategoriAdlari[tur];
}

/*================
     KATEGORİ
=================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/*================
     BANNER
=================*/

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const hero = document.getElementById("hero");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");

async function getHeroBanner() {

    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=Spider-Man`
    );

    const data = await response.json();

    const movie = data.results[0];

    hero.style.backgroundImage = `
        linear-gradient(
            rgba(0,0,0,.45),
            rgba(0,0,0,.75)
        ),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
    `;

    heroTitle.textContent = movie.title;
    heroDescription.textContent = movie.overview;
}

getHeroBanner();


/*================
     SLIDER
=================*/

function initSliders() {
document.querySelectorAll(".slider-section").forEach(section => {

    const track = section.querySelector(".slider-track");
    const cards = section.querySelectorAll(".card");

    if (cards.length === 0) return;

    const prevbtn = section.querySelector(".prev-btn");
    const nextbtn = section.querySelector(".next-btn");

    let index = 0;

    const visibleCards = cards[0].classList.contains("portrait-card") ? 5 : 4;
    const maxIndex = cards.length - visibleCards;

        function updateSlider() {
            const cardWidth = cards[0].offsetWidth + 20;
            track.style.transform =`translateX(-${index * cardWidth}px)`;
        }

    nextbtn.addEventListener("click", () => {
        index++;

            if (index > maxIndex) {
                index = 0;
            }

         updateSlider();
        });

    prevbtn.addEventListener("click", () => {
        index--;

        if (index < 0) {
                index = maxIndex;
            }

         updateSlider();
        });

    window.addEventListener("resize", updateSlider);
    });
}


/*==================
    LATEST MOVIES
===================*/

const latestMovieTrack = document.getElementById("latestMoviesTrack");

function createLastestMovieCard(movie) {
    return `
        <article class="card landscape-card latest-card">
            <img
                src="https://image.tmdb.org/t/p/w780${movie.backdrop_path}"
                alt="${movie.title}"
                class="card-image"
            >
            <div class="card-info">
                <h3 class="card-title">${movie.title}</h3>
            </div>
        </article>
    `;
}

async function getLastestMovies() {

    const response = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=tr-TR&page=1`
    );
    const data = await response.json();

    latestMovieTrack.innerHTML = data.results
        .filter(movie => movie.backdrop_path)
        .slice(0, 10)
        .map(createLastestMovieCard)
        .join("");
}

getLastestMovies();
initSliders();


/*==================
    POPULAR MOVIES
===================*/

const popularMovieTrack = document.getElementById("popularMovieTrack");

function createPopularMovieCard(movie) {
    return `
        <article class="card portrait-card movie-card">
            <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
                class="card-image"
            >
            <div class="card-info">
                <h3 class="card-title">${movie.title}</h3>
            </div>
        </article>
    `;
}

async function getPopularMovies() {

    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=2`
    );
    const data = await response.json();

    popularMovieTrack.innerHTML = data.results
        .filter(movie => movie.poster_path)
        .slice(0, 10)
        .map(createPopularMovieCard)
        .join("");
}

getPopularMovies();
initSliders();


/*==================
    POPULAR SERIES
===================*/

const popularSeriesTrack = document.getElementById("popularSeriesTrack");

function createPopularSeriesCard(series) {
    return `
        <article class="card portrait-card series-card">
            <img
                src="https://image.tmdb.org/t/p/w500${series.poster_path}"
                alt="${series.name}"
                class="card-image"
            >
            <div class="card-info">
                <h3 class="card-title">${series.name}</h3>
            </div>
        </article>
    `;
}

async function getPopularSeries() {

    const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=tr-TR&page=1`
    );
    const data = await response.json();

    popularSeriesTrack.innerHTML = data.results
        .filter(series => series.poster_path)
        .slice(0, 10)
        .map(createPopularSeriesCard)
        .join("");
}

getPopularSeries();
initSliders();
