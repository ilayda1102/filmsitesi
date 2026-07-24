import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getMovieCredits} from "../services/tmdb";


function MovieDetail() {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);

        useEffect(() => {
            async function loadMovie() {
                const data = await getMovieDetails(id);
                console.log(data);
                setMovie(data);

                const actors = await getMovieCredits(id);
                console.log(actors);
                setCast(actors);

            }
            loadMovie();
        }, [id]);
        
        if (!movie) {
            return <h2>Yükleniyor...</h2>;
        }
        
    return (
        <>
            <h1>{movie.title}</h1>

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <p>IMDB: {movie.vote_average}</p>
            <p>Çıkış Tarihi: {movie.release_date}</p>
            
            <p>Süre: {movie.runtime} dk</p>

                <p>
                    Türler:

                    {movie.genres.map((genre) => (
                        <span key={genre.id}>
                            {" "}
                            {genre.name}
                        </span>
                    ))}
                </p>

                <p>
                    {movie.tagline}
                </p>

                <p>
                    {movie.overview}
                </p>

                <h3>Oyuncular</h3>

                <div>
                    {cast.slice(0,10).map((actor) => (
                        <div key={actor.id}>

                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name}
                            />
                            <h4>{actor.name}</h4>

                            <p>{actor.character}</p>
                        </div>
                    ))}
                </div>
    </>
    );
}

export default MovieDetail;