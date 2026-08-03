import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../services/tmdb";

function MovieDetail() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        document.body.classList.add("movie-detail-page");

        async function loadMovie() {
            const data = await getMovieDetails(id);
            setMovie(data);

            const actors = await getMovieCredits(id);
            setCast(actors);

            const videos = await getMovieVideos(id);
            const trailerVideo = videos.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer"
            );
            setTrailer(trailerVideo);
        }

        loadMovie();

        return () => {
            document.body.classList.remove("movie-detail-page");
        };
    }, [id]);

    if (!movie) {
        return <h2>Yükleniyor...</h2>;
    }

    return (
        <div
            className="detail-hero"
            style={{
                backgroundImage: `linear-gradient(
                    to top,
                    #111 10%,
                    rgba(17,17,17,.65),
                    rgba(17,17,17,.35)
                ),
                url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
            
        >
            <div className="detail-container">

                <div className="detail-top">

                    <img
                        className="detail-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div className="detail-info">

                        <h1>{movie.title}</h1>

                        <p><strong>IMDB:</strong> {movie.vote_average.toFixed(1)}</p>

                        <p><strong>Çıkış Tarihi:</strong> {movie.release_date}</p>

                        <p><strong>Süre:</strong> {movie.runtime} dk</p>

                        <p>
                            <strong>Tür:</strong>{" "}
                            {movie.genres.map((genre) => (
                                <span key={genre.id}>
                                    {genre.name}{" "}
                                </span>
                            ))}
                        </p>

                        {movie.tagline && (
                            <p className="tagline">
                                {movie.tagline}
                            </p>
                        )}

                        <p className="overview">
                            {movie.overview}
                        </p>

                        {trailer && (
                            <a
                                href={`htpps://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noreferrer"
                                className="watch-trailer-btn"
                            >
                                Fragmanı İzle 🎬
                            </a>
                        )}

                    </div>

                </div>

                <h2>Oyuncular</h2>

                <div className="cast-grid">
                    {cast.slice(0, 10).map((actor) => (
                        <div className="cast-card" key={actor.id}>
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : "/no-image.png"
                                }
                                alt={actor.name}
                            />

                            <h4>{actor.name}</h4>
                            <p>{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;