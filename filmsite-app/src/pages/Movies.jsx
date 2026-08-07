import { useEffect, useState } from "react";
import Slider from "../components/Slider";

import {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getThrillerMovies,
  getScienceFictionMovies,
  getRomanceMovies,
  getAnimationMovies,
} from "../services/tmdb";

function Movies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [scienceMovies, setScienceMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);

  useEffect(() => {
    getUpcomingMovies().then(setUpcomingMovies);
    getPopularMovies().then(setPopularMovies);
    getTopRatedMovies().then(setTopRatedMovies);
    getActionMovies().then(setActionMovies);
    getComedyMovies().then(setComedyMovies);
    getHorrorMovies().then(setHorrorMovies);
    getThrillerMovies().then(setThrillerMovies);
    getScienceFictionMovies().then(setScienceMovies);
    getRomanceMovies().then(setRomanceMovies);
    getAnimationMovies().then(setAnimationMovies);
  }, []);

  return (
    <>
      <Slider title="Yeni Çıkanlar" movies={upcomingMovies}/>

      <Slider title="Popüler Filmler" movies={popularMovies}/>

      <Slider title="En Çok Oy Alanlar" movies={topRatedMovies}/>

      <Slider title="Aksiyon" movies={actionMovies}/>

      <Slider title="Komedi" movies={comedyMovies}/>

      <Slider title="Korku" movies={horrorMovies}/>

      <Slider title="Gerilim" movies={thrillerMovies}/>

      <Slider title="Bilim Kurgu" movies={scienceMovies}/>

      <Slider title="Romantik" movies={romanceMovies}/>

      <Slider title="Animasyon" movies={animationMovies}/>
      
    </>
  );
}

export default Movies;