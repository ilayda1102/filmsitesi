import { Link } from "react-router-dom";



function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p className="movie-meta">
          ⭐ {movie.vote_average} • 🗓️ {movie.release_date?.split("-")[0]}
        </p>

        <p className="movie-genre"></p>
        
      </div>
    </Link>
  );
}

export default MovieCard;