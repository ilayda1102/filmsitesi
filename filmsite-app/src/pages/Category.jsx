import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMoviesByGenre, getTVByGenre } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

function Category() {
    const { name } = useParams();

    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("all");
 
    const genres = {
        action: 28,
        adventure: 12,
        animation: 16,
        comedy: 35,
        crime: 80,
        documentary: 99,
        drama: 18,
        family: 10751,
        fantasy: 14,
        history: 36,
        horror: 27,
        mystery: 9648,
        romance: 10749,
        sciencefiction: 878,
        thriller: 53,
        war: 10752,
        western: 37,
    };

    const genreNames = {
        action: "Aksiyon",
        adventure: "Macera",
        animation: "Animasyon",
        comedy: "Komedi",
        crime: "Polisiye",
        documentary: "Belgesel",
        drama: "Dram",
        family: "Aile",
        fantasy: "Fantastik",
        history: "Tarih",
        horror: "Korku",
        mystery: "Gizem",
        romance: "Romantik",
        sciencefiction: "Bilim Kurgu",
        thriller: "Gerilim",
        war: "Savaş",
        western: "Western",
    };

    useEffect(() => {
        async function loadMovies() {
            const movieData = (await getMoviesByGenre(genres[name])).map(movie => ({
                ...movie,
                media_type: "movie",
            }));

            const tvData = (await getTVByGenre(genres[name])).map(tv => ({
                ...tv,
                media_type: "tv",
            }));

            setMovies([...movieData, ...tvData]);
        }

        loadMovies();
    }, [name]);

    const filteredMovies = movies.filter((movie) => {
        if (filter === "movie") return movie.media_type === "movie";
        if (filter === "tv") return movie.media_type === "tv";
        return true;
    });

    return (
        <>
            <section className="category-header">
                <div className="category-content">
                    <h1>{genreNames[name]}</h1>


                    <span className="category-count">
                        {filteredMovies.length} içerik bulundu
                    </span>

                    <div className="category-filter">
                        <button
                            className={filter === "all" ? "active" : ""}
                            onClick={() => setFilter("all")}
                        >
                            Tümü
                        </button>

                        <button
                            className={filter === "movie" ? "active" : ""}
                            onClick={() => setFilter("movie")}
                        >
                            Filmler
                        </button>

                        <button
                            className={filter === "tv" ? "active" : ""}
                            onClick={() => setFilter("tv")}
                        >
                            Diziler
                        </button>
                    </div>
                </div>
            </section>

            <section className="movie-grid">
                {filteredMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </section>

            <Footer />
        </>
    );
}

export default Category;