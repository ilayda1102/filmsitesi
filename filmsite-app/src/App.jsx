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
import Logout from "./pages/Logout";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/lists";

  return (
    <>
      {!hideHeader && <Header />}
      <ScrollToTop />


      <main 
        className={
            location.pathname === "/"
              ? "page-content home-content"
              : hideHeader
              ? "page-content no-header"
              : "page-content"
        }
      >
        
        <Routes>

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/logout"
            element={<Logout />}
          />

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
            path="/lists"
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
      <Footer/>
    </>
  );
}

export default App;