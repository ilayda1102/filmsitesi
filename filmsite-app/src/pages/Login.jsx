import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);
            
            setErrorMessage("");

            navigate("/");

        } catch (error) {
            if (error.response?.tatus === 404) {
                setErrorMessage("Kullanıcı bulunamadı..");
            } else if (error.response?.status === 401) {
                setErrorMessage("Şifre yanlış.");
            } else {
                setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyiniz.");
            }

            setEmail("");
            setPassword("");
            
            console.error(error);
        }
    };


    return (
            <div className="login-page">
                <form className="login-box" onSubmit={handleLogin}>
                    <h1>Giriş Yap</h1>

                    <input
                        type="email"
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Giriş Yap
                    </button>

                    {errorMessage && (
                        <p className="login-error">
                            {errorMessage}
                        </p>
                    )}

                    <p>
                        Hesabın yok mu?{" "}
                        <Link to="/register" className="register-link">
                            Kayıt Ol
                        </Link>
                    </p>

                </form>
                
            </div>
        )
}

export default Login;