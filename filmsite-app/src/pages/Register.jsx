import { Link } from "react-router-dom";


function Login() {
    return (
            <div className="login-page">
                <div className="login-box">
                    <h1>Kayıt Ol</h1>

                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                    />

                    <input
                        type="email"
                        placeholder="E-posta"
                    />

                    <input
                        type="password"
                        placeholder="Şifre"
                    />

                    <input
                        type="password"
                        placeholder="Şifre Tekrar"
                    />

                    <button>Kayıt Ol</button>

                    <p>
                        Zaten hesabın var mı?{" "}
                        <Link to="/login" className="login-link">
                            Giriş Yap
                        </Link>
                    </p>

                </div>
                
            </div>
    )
}

export default Login;