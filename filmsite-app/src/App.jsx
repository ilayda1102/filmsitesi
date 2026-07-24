import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieModal from "./components/MovieModal";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import { getPopularMovies } from "./services/tmdb";
import { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import List from "./pages/List"
import Category from "./pages/Category";
import Search from "./pages/Search";



function App() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        async function loadMovies() {
            const data = await getPopularMovies();
            
            setMovies(data);
        }
        loadMovies();
    }, []);

  return (
    <>
    <Header />
        <Routes>
            <Route
                path="/"
                element={<Home movies={movies} />}
            />

            <Route
                path="/category/:name"
                element={<Category />}
            />           

            <Route
                path="/movie/:id"
                element={<MovieDetail />}
            />
            
            <Route
                path="/movies"
                element={<Movies />}
            />

            <Route
                path="/series"
                element={<Series />}
            />

            <Route
                path="/list"
                element={<List />}
            />

            <Route
                path="/search"
                element={<Search />}
            />

        </Routes>
        <footer />
    </>            
    );
}

export default App;