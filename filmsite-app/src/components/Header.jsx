import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { searchMovies } from "../services/tmdb";



function Header() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [lightMode, setLightMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const searchRef = useRef(null);
    const [user, setUser] = useState(null);
    const [language, setlanguage] = useState(
        localStorage.getItem("language") || "tr"
    );
    
    useEffect (() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        
        fetch("http://localhost:5000/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        .then((res) => res.json())
        .then((data) => {
            setUser(data.user);
        })
        .catch(() => {
            localStorage.removeItem("token");
        });
    }, []);


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
            setLightMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (lightMode) {
            document.body.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light");
        }

        setLightMode(!lightMode);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/";
    };

    const toggleLanguage = () => {
        const newLanguage = language === "tr" ? "en" : "tr";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };



    useEffect(() => {
        if (search.trim().length < 1) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            const data = await searchMovies(search);
            setResults(data);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    
    useEffect(() => {
        const handleScroll = () => {
            if (document.body.classList.contains("home-page")) {
                setScrolled(window.scrollY > 70);
            } else {
                setScrolled(false);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setResults([]);
            }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-left">
                <span
                    className="logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.location.reload()}
                >
                    Film Sitesi
                </span>
            </div>

            <nav>
                <Link to="/">Ana Sayfa</Link>

                <Link to="/movies">Filmler</Link>

                <Link to="/series">Diziler</Link>

                {user && <Link to="/list">Listem</Link>}

                <div className="dropdown">
                    <Link to="#" className="category-btn">
                        Kategoriler
                    </Link>

                    <div className="dropdown-menu">
                        <Link to="/category/action">Aksiyon</Link>
                        <Link to="/category/comedy">Komedi</Link>
                        <Link to="/category/horror">Korku</Link>
                        <Link to="/category/drama">Dram</Link>
                        <Link to="/category/animation">Animasyon</Link>
                        <Link to="/category/family">Aile</Link>
                        <Link to="/category/documentary">Belgesel</Link>
                        <Link to="/category/sciencefiction">Bilim Kurgu</Link>
                        <Link to="/category/fantasy">Fantastik</Link>
                        <Link to="/category/thriller">Gerilim</Link>
                        <Link to="/category/mystery">Gizem</Link>
                        <Link to="/category/adventure">Macera</Link>
                        <Link to="/category/crime">Polisiye</Link>
                        <Link to="/category/romance">Romantik</Link>
                        <Link to="/category/war">Savaş</Link>
                        <Link to="/category/history">Tarih</Link>
                        <Link to="/category/western">Western</Link>
                    </div>
                </div>
            </nav>

            <div className="header-right" ref={searchRef}>
                <input
                    type="text"
                    placeholder="Film, dizi ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {results.length > 0 && (
                    <div className="search-results">
                        {results.slice(0, 6).map((item) => (
                            <Link
                                key={`${item.media_type}-${item.id}`}
                                to={
                                    item.media_type === "movie"
                                        ? `/movie/${item.id}`
                                        : `/tv/${item.id}`
                                }
                                onClick={() => {
                                    setSearch("");
                                    setResults([]);
                                }}
                            >
                                <>
                                    <img
                                        src={
                                            item.poster_path? `https://image.tmdb.org/t/p/w92${item.poster_path}`: "/no-image.png"
                                        }
                                        alt={item.title || item.name}
                                        className="search-poster"
                                    />

                                    <div className="search-info">
                                        <h4>{item.title || item.name}</h4>

                                        <span>
                                            {item.media_type === "tv" ? "Dizi" : "Film"} •{" "}
                                            {(item.release_date || item.first_air_date)?.split("-")[0]}
                                        </span>
                                    </div>
                                </>
                            </Link>
                        ))}
                    </div>
                )}


               {user ? (
                    <div className="account-dropdown">
                        <button type="button" className="account-link">
                            {user.username}
                        </button>

                        <div className="account-menu">
                            <Link to="/profile">
                                Profilim
                            </Link>

                            <button
                                type="button"
                                className="theme-toggle"
                                onClick={toggleTheme}
                            >
                                Tema: {lightMode ? "Açık" : "Koyu"}
                            </button>

                            <button
                                type="button"
                                className="language-btn"
                                onClick={toggleLanguage}
                            >
                                Dil: {language === "tr" ? "Türkçe" : "English"}
                            </button>

                            <button
                                type="button"
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                ) : (
                    
                    <div className="auth-buttons">
                            <Link to="/login" className="login-btn">
                                Giriş Yap
                            </Link>

                            <Link to="/register" className="register-btn">
                                Kayıt Ol
                            </Link>

                        <div className="settings-dropdown">
                            <button
                                type="button"
                                className="settings-btn"
                            >
                                ⚙️
                            </button>

                            <div className="settings-menu">
                                <button
                                    type="button"
                                    className="theme-toggle"
                                    onClick={toggleTheme}
                                >
                                    Tema: {lightMode ? "Açık" : "Koyu"}
                                </button>

                                <button
                                    type="button"
                                    className="language-btn"
                                    onClick={toggleLanguage}
                                >
                                    Dil: {language === "tr" ? "Türkçe" : "English"}
                                </button>

                            </div>
                        </div>
                    </div>
                )}


                

                
            </div>
        </header>
    );
}

export default Header;