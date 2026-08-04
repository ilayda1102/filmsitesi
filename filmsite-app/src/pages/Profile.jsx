import { FaUserCircle, FaCog } from "react-icons/fa";
import { useState } from "react";


function Profile() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailPassword, setEmailPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Yeni şifreler eşleşmiyor.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

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

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setSuccessMessage("Şifre başarıyla değiştirildi.");
        setTimeout(() => {
          setSuccessMessage("");
          setShowPasswordModal(false);
        }, 2000);
      } 
      
      else {
        const data = await response.json();

        setErrorMessage(data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() =>{
          setErrorMessage("");
        }, 2000);
      }
    } 
    
    catch (err) {
      console.log(err);
    }

  };

    const handleChangeEmail = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/users/change-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: emailPassword,
          newEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("email", newEmail);

        setSuccessMessage("E-posta başarıyla değiştirildi.");

        setEmailPassword("");
        setNewEmail("");

        setTimeout(() => {
          setSuccessMessage("");
          setShowEmailModal(false);
        }, 2000);

      } else {
        setErrorMessage(data.message);

        setEmailPassword("");
        setNewEmail("");

        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
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
              {(successMessage || errorMessage) && (
                <div className={`modal-alert ${successMessage ? "success" : "error"}`}>
                  {successMessage || errorMessage}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangePassword();
                }}
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
                  <button type="submit" className="save-btn">
                    Kaydet
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    İptal
                  </button>
                </div>
              </form>
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
              {(successMessage || errorMessage) && (
                <div className={`modal-alert ${successMessage ? "success" : "error"}`}>
                  {successMessage || errorMessage}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangeEmail();
                }}
              >
                <h2>Gmail Değiştir</h2>

                <input
                  type="password"
                  placeholder="Şifreniz"
                  value={emailPassword}
                  onChange={(e) => setEmailPassword(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Yeni Gmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />

                <div className="modal-buttons">
                  <button
                    type="submit"
                    className="save-btn"
                  >
                    Kaydet
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowEmailModal(false)}
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
}

export default Profile;