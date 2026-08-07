import { useEffect, useState } from "react";
import Slider from "../components/Slider";


import {
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
  getActionTV,
  getComedyTV,
  getHorrorTV,
  getThrillerTV,
  getScienceFictionTV,
  getRomanceTV,
  getAnimationTV,
} from "../services/tmdb";

function Series() {
  const [onTheAirTV, setOnTheAirTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [actionTV, setActionTV] = useState([]);
  const [comedyTV, setComedyTV] = useState([]);
  const [horrorTV, setHorrorTV] = useState([]);
  const [thrillerTV, setThrillerTV] = useState([]);
  const [scienceTV, setScienceTV] = useState([]);
  const [romanceTV, setRomanceTV] = useState([]);
  const [animationTV, setAnimationTV] = useState([]);

  useEffect(() => {
    getOnTheAirTV().then(data =>
      setOnTheAirTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getPopularTV().then(data =>
      setPopularTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getTopRatedTV().then(data =>
      setTopRatedTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getActionTV().then(data =>
      setActionTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getComedyTV().then(data =>
      setComedyTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getHorrorTV().then(data =>
      setHorrorTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getThrillerTV().then(data =>
      setThrillerTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getScienceFictionTV().then(data =>
      setScienceTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getRomanceTV().then(data =>
      setRomanceTV(data.map(item => ({ ...item, media_type: "tv" })))
    );

    getAnimationTV().then(data =>
      setAnimationTV(data.map(item => ({ ...item, media_type: "tv" })))
    );
  }, []);

  return (
    <>
      <Slider title="Yayındaki Diziler" movies={onTheAirTV} />

      <Slider title="Popüler Diziler" movies={popularTV} />

      <Slider title="En Çok Oy Alan Diziler" movies={topRatedTV} />

      <Slider title="Aksiyon Dizileri" movies={actionTV} />

      <Slider title="Komedi Dizileri" movies={comedyTV} />

      <Slider title="Korku Dizileri" movies={horrorTV} />

      <Slider title="Gerilim Dizileri" movies={thrillerTV} />

      <Slider title="Bilim Kurgu Dizileri" movies={scienceTV} />

      <Slider title="Romantik Diziler" movies={romanceTV} />

      <Slider title="Animasyon Dizileri" movies={animationTV} />

    </>
  );
}

export default Series;