import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import MovieModal from "../components/MovieModal";

import {
  getUpcomingMovies,
  getPopularMovies,
  getAiringTodayTV,
  getPopularTV,
} from "../services/tmdb";

function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [airingTodayTV, setAiringTodayTV] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);

  useEffect(() => {
    getUpcomingMovies().then(setUpcomingMovies);

    getAiringTodayTV().then((data) =>
      setAiringTodayTV(
        data.map((item) => ({
          ...item,
          media_type: "tv",
        }))
      )
    );

    getPopularMovies().then(setPopularMovies);

    getPopularTV().then((data) =>
      setPopularTV(
        data.map((item) => ({
          ...item,
          media_type: "tv",
        }))
      )
    );
  }, []);

  useEffect(() => {
    document.body.classList.add("home-page");

    return () => {
        document.body.classList.remove("home-page");
    };
  }, []);

  
  return (
    <>
      <Hero 
        banners={[
          upcomingMovies[0],
          airingTodayTV[0],
          upcomingMovies[1],
          airingTodayTV[1],
        ].filter(Boolean)}
      />  
      
      {/* <Slider
        title="İzlemeye Devam Et"
        movies={movies}
      /> */}

      <Slider
        title="En Yeni Filmler"
        movies={upcomingMovies}
      />

      <Slider
        title="En Yeni Diziler"
        movies={airingTodayTV}
      />

      <Slider
        title="Popüler Filmler"
        movies={popularMovies}
      />

      <Slider
        title="Popüler Diziler"
        movies={popularTV}
      />

      <MovieModal />
    </>
  );
}

export default Home;