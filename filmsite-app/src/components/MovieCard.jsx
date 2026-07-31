import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";


function MovieCard({ movie }) {

  const [favorite, setFavorite] = useState(false);
  
  useEffect(() => {
  const checkFavorite = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await axios.get("http://localhost:5000/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const isFavorite = response.data.some(
        (fav) => fav.tmdbId === movie.id
      );

      setFavorite(isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

    checkFavorite();
  }, [movie.id]);


  const handleFavorite = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const token = localStorage.getItem("token");

  try {
    if (favorite) {
      await axios.delete(
        `http://localhost:5000/favorites/${movie.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorite(false);
    } else {
      await axios.post(
        "http://localhost:5000/favorites",
        {
          tmdbId: movie.id,
          title: movie.title || movie.name,
          posterPath: movie.poster_path,
          mediaType: movie.media_type || (movie.first_air_date ? "tv" : "movie"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorite(true);
    }
  } catch (error) {
    console.error(error);
  }
};


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


        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={handleFavorite}
        >
          {favorite ? <FaHeart /> : <FaRegHeart /> }
        </button>

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