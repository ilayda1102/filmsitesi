import MovieCard from "./MovieCard";


function Slider({ title, movies }) {
  return (
    <section className="slider-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="slider-container">
        <button className="slider-btn prev-btn">&#10094;</button>

        <div className="slider-track">
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                />
            ))}
        </div>

        <button className="slider-btn next-btn">&#10095;</button>
      </div>
    </section>
  );
}

export default Slider;