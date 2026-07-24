import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

function Home({ movies }) {
  return (
    <>
      <Header />
      <Hero />

      <Slider
        title="İzlemeye Devam Et"
        movies={movies}
      />

      <Slider
        title="En Yeni Filmler"
        movies={movies}
      />

      <Slider
        title="Popüler Filmler"
        movies={movies}
      />

      <Slider
        title="Popüler Diziler"
        movies={movies}
      />

      <MovieModal />
      <Footer />
    </>
  );
}

export default Home;