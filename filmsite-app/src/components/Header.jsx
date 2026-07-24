import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          Film Sitesi
        </Link>
      </div>

      <nav>
        <Link to="/">Ana Sayfa</Link>

        <Link to="/movies">Filmler</Link>

        <Link to="/series">Diziler</Link>

        <Link to="/list">Listem</Link>

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

      <div className="header-right">
        <input
          type="text"
          placeholder="Film, Dizi ara..."
          id="arama"
        />

        <div className="account-dropdown">
          <Link to="#" className="account-link">
            Hesap
          </Link>

          <div className="account-menu">
            <Link to="#">Profil</Link>

            <Link to="#" id="language-toggle">
              Dil: Türkçe
            </Link>

            <Link to="#" id="theme-toggle">
              Tema: Koyu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;