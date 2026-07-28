import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTVDetails, getTVCredits } from "../services/tmdb";

function TvDetail() {
    const { id } = useParams();

    const [tv, setTv] = useState(null);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        document.body.classList.add("movie-detail-page");

        async function loadTV() {
            const data = await getTVDetails(id);
            setTv(data);

            const actors = await getTVCredits(id);
            setCast(actors);
        }

        loadTV();

        return () => {
            document.body.classList.remove("movie-detail-page");
        };
    }, [id]);

    if (!tv) {
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
                url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
            }}
        >
            <div className="detail-container">

                <div className="detail-top">

                    <img
                        className="detail-poster"
                        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                        alt={tv.name}
                    />

                    <div className="detail-info">

                        <h1>{tv.name}</h1>

                        <p><strong>IMDB:</strong> {tv.vote_average.toFixed(1)}</p>

                        <p><strong>Yayın Yılları:</strong> {tv.first_air_date} - {tv.last_air_date} </p>

                        <p><strong>Sezon Sayısı:</strong> {tv.number_of_seasons}</p>

                        <p><strong>Bölüm Sayısı:</strong> {tv.number_of_episodes}</p>

                        <p>
                            <strong>Tür:</strong>{" "}
                            {tv.genres.map((genre) => (
                                <span key={genre.id}>
                                    {genre.name}{" "}
                                </span>
                            ))}
                        </p>

                        {tv.tagline && (
                            <p className="tagline">
                                {tv.tagline}
                            </p>
                        )}

                        <p className="overview">
                            {tv.overview}
                        </p>

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

export default TvDetail;