
function Login() {
    return (
            <div className="login-page">
                <div className="login-box">
                    <h1>Giriş Yap</h1>

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

export default Login;