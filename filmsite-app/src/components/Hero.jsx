import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero({ banners }) {
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!banners || banners.length === 0) return;

        if (paused) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [banners, paused]);

    if (!banners || banners.length === 0) return null;

    const movie = banners[current];

    const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    const title = movie.title || movie.name;

    const year =
        movie.release_date?.split("-")[0] ||
        movie.first_air_date?.split("-")[0] ||
        "";

    const rating = movie.vote_average?.toFixed(1);

    const mediaType =
        movie.media_type === "tv" ? "Dizi" : "Film";


    function goDetail() {
        navigate(
            movie.media_type === "tv"
                ? `/tv/${movie.id}`
                : `/movie/${movie.id}`
        );
    }

    return (
    <section
        className="hero"
        style={{
            backgroundImage: `url(${backdrop})`,
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
    >
        <div className="hero-overlay"></div>

        <div className="hero-content">

            <span className="hero-tag">
                {mediaType} • ⭐ {rating} • 🗓️ {year}
            </span>

            <h1>{title}</h1>

            <p>
                {movie.overview?.length > 220
                    ? movie.overview.substring(0, 220) + "..."
                    : movie.overview}
            </p>

            <div className="hero-buttons">
                <button
                    className="detail-btn"
                    onClick={goDetail}
                >
                    Detay →
                </button>
            </div>
        </div>

        <div className="hero-dots">
            {banners.map((_, index) => (
                <span
                    key={index}
                    className={
                        index === current
                            ? "hero-dot active"
                            : "hero-dot"
                    }
                    onClick={() => setCurrent(index)}
                />
            ))}
        </div>
    </section>
);
}

export default Hero;