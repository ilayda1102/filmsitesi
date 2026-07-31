import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import List from "./pages/List";
import Category from "./pages/Category";
import Search from "./pages/Search";
import ScrollToTop from "./ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <ScrollToTop />
      <main 
        className={
            location.pathname === "/"
              ? "page-content home-content"
              : "page-content"
        }
      >
        
        <Routes>

          <Route
            path="/"
            element={<Home />}
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
            path="/tv/:id"
            element={<TvDetail />}
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

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Routes>
      </main>
    </>
  );
}

export default App;