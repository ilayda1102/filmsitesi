import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setErrorMessage("Şifreler eşleşmiyor.");
            setPassword("");
            setPassword2("");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/users/register", {
                username,
                email,
                password,
            });

            navigate("/login");

        }  
        
        catch (err) {
            console.error(err);

            if (err.response?.status === 409) {
                setErrorMessage("Bu e-posta ile zaten bir hesap var.");
            } else {
                setErrorMessage("Kayıt başarısız.");
            }
            setUsername("");
            setEmail("");
            setPassword("");
            setPassword2("");
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleRegister}>
                <h1>Kayıt Ol</h1>

                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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

                <input
                    type="password"
                    placeholder="Şifre Tekrar"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />

                <button type="submit">Kayıt Ol</button>

                {errorMessage && (
                    <p className="login-error">
                        {errorMessage}
                    </p>
                )}

                <p>
                    Zaten hesabın var mı?{" "}
                    <Link to="/login" className="login-link">
                        Giriş Yap
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;