import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Search() {

    const [params] = useSearchParams();

    const query = params.get("q");

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        if (!query) return;

        searchMovies(query).then(setMovies);

    }, [query]);

    return (

        <div className="container">

            <h2>"{query}" için sonuçlar</h2>

            <div className="movie-grid">

                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}

            </div>

        </div>

    );

}

export default Search;