import { Link } from "react-router-dom";
import { FaUserCircle, FaCog } from "react-icons/fa";

function Profile() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-icon">
          <FaUserCircle />
        </div>

        <h1 className="profile-title">Profilim</h1>

        <div className="profile-section">
          <h2>Hesap Bilgileri</h2>

          <p className="profile-info">
            <strong>Kullanıcı Adı:</strong> {username}
          </p>

          <p className="profile-info">
            <strong>E-posta:</strong> {email}
          </p>
        </div>

        <div className="profile-section">
          <h2>
            <FaCog /> Hesap Ayarları
          </h2>

          <div className="profile-buttons">
            <Link to="/change-password">
              <button className="profile-btn">
                Şifre Değiştir
              </button>
            </Link>

            <Link to="/change-email">
              <button className="profile-btn">
                Mail Değiştir
              </button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;