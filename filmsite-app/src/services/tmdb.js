const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"


/*=========================
           FILMS
==========================*/

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

export async function getTopRatedMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const data = await response.json();
    return data.results;
}

export async function getUpcomingMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const data = await response.json();
    return data.results;
}


/*=========================
    FILM KATEGORİLERİ
==========================*/

export async function getActionMovies() { 
    return getMoviesByGenre(28);}

export async function getComedyMovies() {
    return getMoviesByGenre(35);}

export async function getHorrorMovies() {
    return getMoviesByGenre(27);}

export async function getThrillerMovies() {
    return getMoviesByGenre(53);}

export async function getScienceFictionMovies() {
    return getMoviesByGenre(878);}

export async function getRomanceMovies() {
    return getMoviesByGenre(10749);}

export async function getAnimationMovies() {
    return getMoviesByGenre(16);}


/*=========================
    DİZİ KATEGORİLERİ
==========================*/


// ===================== DİZİLER =====================

export async function getPopularTV() {
    const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const data = await response.json();
    return data.results;
}

export async function getTopRatedTV() {
    const response = await fetch(
        `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const data = await response.json();
    return data.results;
}

export async function getOnTheAirTV() {
    const response = await fetch(
        `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const data = await response.json();
    return data.results;
}

export async function getTVByGenre(genreId) {
    const response = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=tr-TR&with_genres=${genreId}`
    );

    const data = await response.json();
    return data.results;
}

export async function getAiringTodayTV() {
    const response = await fetch(
        `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=tr-TR&page=1`
    );

    const data = await response.json();
    return data.results;
}


/*=========================
    DİZİ KATEGORİLERİ
==========================*/

export async function getActionTV() {
    return getTVByGenre(10759);}

export async function getComedyTV() {
    return getTVByGenre(35);}

export async function getHorrorTV() {
    return getTVByGenre(9648);}

export async function getThrillerTV() {
    return getTVByGenre(80);}

export async function getScienceFictionTV() {
    return getTVByGenre(10765);}

export async function getRomanceTV() {
    return getTVByGenre(10766);}

export async function getAnimationTV() {
    return getTVByGenre(16);}

/*=========================
          SEARCH
==========================*/

export async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    const text = query.toLowerCase().trim();

    return data.results
        .filter(
            (item) =>
                (item.media_type === "movie" || item.media_type === "tv") &&
                item.poster_path
        )
        .sort((a, b) => {
            const aName = (a.title || a.name || "").toLowerCase();
            const bName = (b.title || b.name || "").toLowerCase();

            const aStarts = aName.startsWith(text);
            const bStarts = bName.startsWith(text);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            const aContains = aName.includes(text);
            const bContains = bName.includes(text);

            if (aContains && !bContains) return -1;
            if (!aContains && bContains) return 1;

            return (b.popularity || 0) - (a.popularity || 0);
        });
}