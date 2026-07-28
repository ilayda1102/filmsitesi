
function AuthModal() {
    return (
        <div className="modal-overlay">
            <div className="auth-modal">
                <h2>Giriş Yap</h2>

                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                />

                <input
                    type="password"
                    placeholder="Şifre"
                />

                <button>Giriş Yap</button>

                <p>
                    Hesabın yok mu? <span>Kayıt Ol</span>
                </p>

            </div>
        </div>
    )
}

export default AuthModal;