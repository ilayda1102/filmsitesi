import { useRef } from "react";
import MovieCard from "./MovieCard";

function Slider({ title, movies }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  return (
    <section className="slider-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="slider-container">
        <button
          className="slider-btn prev-btn"
          onClick={scrollLeft}
        >
          &#10094;
        </button>

        <div
          className="slider-track"
          ref={sliderRef}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>

        <button
          className="slider-btn next-btn"
          onClick={scrollRight}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default Slider;