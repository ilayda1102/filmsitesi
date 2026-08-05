import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiPlus, HiCheck } from "react-icons/hi2";
import axios from "axios";

function MovieCard({ movie }) {
  const [isInList, setIsInList] = useState(false);
  const [lists, setLists] = useState([]);
  const [showListModal, setShowListModal] = useState(false);

  const [newListName, setNewListName] = useState("");
  const [showCreateList, setShowCreateList] = useState(false);

  useEffect(() => {
    const checkMovieInLists = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/lists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userLists = response.data;

        for (const list of userLists) {
          const movies = await axios.get(
            `http://localhost:5000/lists/${list.id}/items`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const exists = movies.data.some(
            (item) => item.tmdbId === movie.id
          );

          if (exists) {
            setIsInList(true);
            return;
          }
        }
        setIsInList(false);
      } catch (err) {
        console.error(err);
      }
    };

    checkMovieInLists();

  }, [movie.id]);

  const getLists = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:5000/lists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLists(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openListModal = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await getLists();
    setShowListModal(true);
  };

  const createList = async () => {
    if (!newListName.trim()) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/lists",
        {
          name: newListName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewListName("");
      setShowCreateList(false);

      await getLists();

    } catch (err) {
      console.error(err);
    }
  };

  const addMovieToList = async (listId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/lists/${listId}/items`,
        {
          tmdbId: movie.id,
          title: movie.title || movie.name,
          posterPath: movie.poster_path,
          mediaType:
            movie.media_type ||
            (movie.first_air_date ? "tv" : "movie"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsInList(true);
      setShowListModal(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
  <>
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
        className={`favorite-btn ${isInList ? "active" : ""}`}
        onClick={openListModal}
      >
        {isInList ? <HiCheck size={18} /> : <HiPlus size={18} />}
      </button>

      <div className="movie-info">
        <div className="movie-title-row">
          <h3>{movie.title || movie.name}</h3>

          <p>
            {(movie.release_date || movie.first_air_date)?.split("-")[0]}
          </p>
        </div>

        <p className="movie-meta">
          ⭐ {movie.vote_average}
        </p>

        <p className="movie-genre"></p>
      </div>
    </Link>

    {showListModal && (
      <div
        className="profile-overlay"
        onClick={() => setShowListModal(false)}
      >
        <div
          className="profile-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Listeye Kaydet</h2>

          <div className="list-items">
            {lists.length === 0 ? (
              <p>Henüz oluşturulmuş bir listeniz yok.</p>
            ) : (
              lists.map((list) => (
                <button
                  key={list.id}
                  className="list-item-btn"
                  onClick={() => addMovieToList(list.id)}
                >
                  {list.name}
                </button>
              ))
            )}
          </div>

          <hr />

          <div className="create-list">
            {!showCreateList ? (
              <button
                className="new-list-btn"
                onClick={() => setShowCreateList(true)}
              >
                + Yeni Liste
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Liste adı"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />

                <div className="create-list-buttons">
                  <button
                    className="save-btn"
                    onClick={createList}
                  >
                    Oluştur
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setShowCreateList(false);
                      setNewListName("");
                    }}
                  >
                    Vazgeç
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            className="close-panel-btn"
            onClick={() => setShowListModal(false)}
          >
            Kapat
          </button>
        </div>
      </div>
    )}
  </>
);
}

export default MovieCard;