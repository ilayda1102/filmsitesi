import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link
      to={
        movie.media_type === "tv"
          ? `/tv/${movie.id}`
          : `/movie/${movie.id}`
      }
      className="movie-card"
    >
      <img
        className="movie-poster"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png"
        }
        alt={movie.title || movie.name}
      />

      <div className="movie-overlay"></div>

      <div className="movie-info">
        <div className="movie-title-row">
          <h3>{movie.title || movie.name}</h3>

          <span
            className={`media-badge ${
              movie.media_type === "tv" ? "tv" : "movie"
            }`}
          >
            {movie.media_type === "tv" ? "Dizi" : "Film"}
          </span>
        </div>

        <p className="movie-meta">
          ⭐ {movie.vote_average} • 🗓️{" "}
          {(movie.release_date || movie.first_air_date)?.split("-")[0]}
        </p>

        <p className="movie-genre"></p>
      </div>
    </Link>
  );
}

export default MovieCard;