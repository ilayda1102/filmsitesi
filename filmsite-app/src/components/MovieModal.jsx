function MovieModal() {
  return (
    <div id="movieModal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>

        <img id="modalImage" src="" alt="" />

        <div className="modal-info">
          <h2 id="modalTitle"></h2>

          <p className="movie-meta">
            ⭐ <span id="modalImdb"></span>
            &nbsp;&nbsp;
            🗓️ <span id="modalYear"></span>
            &nbsp;&nbsp;
            🎬 <span id="modalGenre"></span>
          </p>

          <a
            id="modalTrailer"
            href="#"
            target="_blank"
            rel="noreferrer"
            className="trailer-btn"
          >
            Fragmanı İzle
          </a>

          <p id="modalDescription"></p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;