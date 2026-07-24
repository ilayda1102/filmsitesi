import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Category() {
    const { name } = useParams();

    const [movies, setMovies] = useState([]);

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

    useEffect(() => {
        async function loadMovies() {
            const data = await getMoviesByGenre(genres[name]);
            setMovies(data);
        }

        loadMovies();
    }, [name]);

    console.log(movies);

    return (
        <section className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </section>
    );
}

export default Category;