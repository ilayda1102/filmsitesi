const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"


/*=========================
           PAGES
==========================*/

async function fetchMultiplePages(endpoint, totalPages = 3) {
    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
        requests.push(
            fetch(
                `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=tr-TR&page=${page}`
            ).then((res) => res.json())
        );
    }

    const results = await Promise.all(requests);

    const allResults = results.flatMap((item) => item.results);
    return [
        ...new Map(allResults.map((item) => [item.id, item])).values()
    ];
}

/*=========================
           FILMS
==========================*/

export async function getPopularMovies() {
    return fetchMultiplePages("/movie/popular");
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
    return fetchMultiplePages("/movie/top_rated");
}

export async function getUpcomingMovies() {
    return fetchMultiplePages("/movie/upcoming");
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



// ===================== DİZİLER =====================

export async function getPopularTV() {
    return fetchMultiplePages("/tv/popular");
}

export async function getTopRatedTV() {
    return fetchMultiplePages("/tv/top_rated");
}

export async function getOnTheAirTV() {
    return fetchMultiplePages("/tv/on_the_air");
}

export async function getTVByGenre(genreId) {
    const response = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=tr-TR&with_genres=${genreId}`
    );

    const data = await response.json();
    return data.results;
}

export async function getAiringTodayTV() {
    return fetchMultiplePages("/tv/airing_today");
}


export async function getTVDetails(id) {
    const response = await fetch(
        `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=tr-TR`
    );

    const data = await response.json();
    return data;
}

export async function getTVCredits(id) {
    const response = await fetch(
        `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=tr-TR`
    );

    const data = await response.json();
    return data.cast;
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

