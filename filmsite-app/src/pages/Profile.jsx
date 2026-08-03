import { FaUserCircle, FaCog } from "react-icons/fa";
import { useState } from "react";

function Profile() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setShowPasswordModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
              <button
                className="profile-btn"
                onClick={() => setShowPasswordModal(true)}
              >
                Şifre Değiştir
              </button>

              <button
                className="profile-btn"
                onClick={() => setShowEmailModal(true)}
              >
                Gmail Değiştir
              </button>
            </div>
          </div>

        </div>
      </div>

      {showPasswordModal && (
        <div
          className="profile-overlay"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="profile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Şifre Değiştir</h2>

            <input
              type="password"
              placeholder="Mevcut Şifre"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Yeni Şifre"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Yeni Şifre Tekrar"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="modal-buttons">
              <button 
                className="save-btn"
                onClick={handleChangePassword}
              >
                Kaydet
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowPasswordModal(false)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div
          className="profile-overlay"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="profile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Gmail Değiştir</h2>

            <input
              type="password"
              placeholder="Şifreniz"
            />

            <input
              type="email"
              placeholder="Yeni Gmail"
            />

            <div className="modal-buttons">
              <button className="save-btn">
                Kaydet
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowEmailModal(false)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;